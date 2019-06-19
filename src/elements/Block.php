<?php
namespace benf\neo\elements;

use yii\base\Exception;
use yii\base\InvalidConfigException;

use Craft;
use craft\base\Element;
use craft\base\ElementInterface;
use craft\elements\db\ElementQueryInterface;
use craft\helpers\ArrayHelper;
use craft\helpers\ElementHelper;
use craft\validators\SiteIdValidator;

use benf\neo\Plugin as Neo;
use benf\neo\elements\db\BlockQuery;
use benf\neo\models\BlockType;
use benf\neo\records\Block as BlockRecord;

/**
 * Class Block
 *
 * @package benf\neo\elements
 * @author Spicy Web <craft@spicyweb.com.au>
 * @author Benjamin Fleming
 * @since 2.0.0
 */
class Block extends Element
{
	/**
	 * @inheritdoc
	 */
	public static function displayName(): string
	{
		return Craft::t('neo', "Neo Block");
	}

	/**
	 * @inheritdoc
	 */
	public static function refHandle(): string
	{
		return 'neoblock';
	}

	/**
	 * @inheritdoc
	 */
	public static function hasContent(): bool
	{
		return true;
	}

	/**
	 * @inheritdoc
	 */
	public static function isLocalized(): bool
	{
		return true;
	}

	/**
	 * @inheritdoc
	 */
	public static function hasStatuses(): bool
	{
		return true;
	}

	/**
	 * @inheritdoc
	 * @return BlockQuery
	 */
	public static function find(): ElementQueryInterface
	{
		return new BlockQuery(static::class);
	}

	/**
	 * @inheritdoc
	 */
	public static function eagerLoadingMap(array $sourceElements, string $handle)
	{
		$map = false;
		$separatedHandle = explode(':', $handle);

		if (count($separatedHandle) === 2)
		{
			$fieldHandle = $separatedHandle[1];
			$map = parent::eagerLoadingMap($sourceElements, $fieldHandle);
		}

		return $map;
	}

	/**
	 * @var int|null The field ID.
	 */
	public $fieldId;

	/**
	 * @var int|null The owner ID.
	 */
	public $ownerId;

	/**
	 * @var int|null The owner site ID.
	 */
	public $ownerSiteId;

	/**
	 * @var int|null The block type ID.
	 */
	public $typeId;

	/**
	 * @var bool
	 */
	public $deletedWithOwner = false;

	/**
	 * @var ElementInterface|null The owner.
	 */
	private $_owner;

	/**
	 * @var array|null Any eager-loaded elements for this block type.
	 */
	private $_eagerLoadedBlockTypeElements;

	/**
	 * @var bool|null Whether this block should display as collapsed.
	 */
	public $_collapsed;

	/**
	 * @var bool|null Whether this block has been modified.
	 */
	private $_modified;

	/**
	 * @var array|null All blocks belonging to the same field as this one.
	 */
	private $_allElements;

	/**
	 * @var array|null Live queries for relatives of this block in live preview mode.
	 */
	private $_liveQueries = [];

	/**
	 * @var bool Whether to operate on a memoized data set.
	 */
	private $_useMemoized = false;

	/**
	 * @inheritdoc
	 */
	public function extraFields(): array
	{
		$names = parent::extraFields();
		$names[] = 'owner';
		$names[] = 'type';

		return $names;
	}

	/**
	 * @inheritdoc
	 */
	public function rules(): array
	{
		$rules = parent::rules();
		$rules[] = [['fieldId', 'ownerId', 'typeId'], 'number', 'integerOnly' => true];
		$rules[] = [['ownerSiteId'], SiteIdValidator::class];

		return $rules;
	}

	/**
	 * @inheritdoc
	 */
	public function getSupportedSites(): array
	{
		$siteIds = [];

		if ($this->ownerSiteId !== null)
		{
			$siteIds[] = $this->ownerSiteId;
		}
		else
		{
			$owner = $this->getOwner();

			if ($owner || $this->duplicateOf)
			{
				foreach (ElementHelper::supportedSitesForElement($owner ?? $this->duplicateOf) as $siteInfo)
				{
					$siteIds[] = $siteInfo['siteId'];
				}
			}
			else
			{
				$siteIds[] = Craft::$app->getSites()->getPrimarySite()->id;
			}
		}

		return $siteIds;
	}

	/**
	 * @inheritdoc
	 */
	public function getFieldLayout()
	{
		return parent::getFieldLayout() ?? $this->getType()->getFieldLayout();
	}

	/**
	 * Returns this block's type.
	 *
	 * @return BlockType
	 * @throws InvalidConfigException if this block's block type ID is invalid.
	 */
	public function getType(): BlockType
	{
		if ($this->typeId === null)
		{
			throw new InvalidConfigException("Neo block is missing its type ID");
		}

		$blockType = Neo::$plugin->blockTypes->getById($this->typeId);

		if (!$blockType)
		{
			throw new InvalidConfigException("Invalid Neo block ID: $this->typeId");
		}

		return $blockType;
	}

	/**
	 * Returns this block's owner, if it has one.
	 *
	 * @return ElementInterface|null
	 */
	public function getOwner()
	{
		$owner = $this->_owner;

		if ($owner !== null)
		{
			if ($owner === false)
			{
				$owner = null;
			}
		}
		elseif ($this->ownerId !== null)
		{
			$owner = Craft::$app->getElements()->getElementById($this->ownerId, null, $this->siteId);
			$this->_owner = $owner ?? false;
		}

		return $owner;
	}

	/**
	 * Sets this block's owner.
	 *
	 * @param ElementInterface|null $owner
	 */
	public function setOwner(ElementInterface $owner = null)
	{
		$this->_owner = $owner;
	}

	/**
	 * Returns whether this block is collapsed.
	 *
	 * @return bool|null
	 */
	public function getCollapsed()
	{
		$cacheService = Craft::$app->getCache();

		$collapsed = $this->_collapsed;

		if (!is_bool($collapsed))
		{
			if ($this->id)
			{
				$cacheKey = "neoblock-$this->id-collapsed";
				$collapsed = $cacheService->exists($cacheKey);
				$this->_collapsed = $collapsed;
			}
			else
			{
				$collapsed = false;
			}
		}

		return $collapsed;
	}

	/**
	 * Sets this block's collapsed state.
	 *
	 * @param bool $value Whether or not this block should be collapsed.
	 */
	public function setCollapsed(bool $value)
	{
		$this->_collapsed = $value;
	}

	/**
	 * Sets this block's collapsed state in the Craft CMS cache.
	 */
	public function cacheCollapsed()
	{
		$cacheService = Craft::$app->getCache();

		if (is_bool($this->_collapsed) && $this->id)
		{
			$cacheKey = "neoblock-$this->id-collapsed";

			if ($this->_collapsed)
			{
				$cacheService->add($cacheKey, 1);
			}
			else
			{
				$cacheService->delete($cacheKey);
			}
		}
	}

	/**
	 * Removes this block's collapsed state from the Craft CMS cache.
	 */
	public function forgetCollapsed()
	{
		$cacheService = Craft::$app->getCache();

		if ($this->id)
		{
			$cacheKey = "neoblock-$this->id-collapsed";
			$cacheService->delete($cacheKey);
		}
	}

	/**
	 * Returns whether this block has been modified.
	 * 
	 * @return bool|null
	 */
	public function getModified()
	{
		return $this->_modified;
	}

	/**
	 * Sets whether this block has been modified.
	 * 
	 * @param bool $value
	 */
	public function setModified(bool $value = true)
	{
		$this->_modified = $value;
	}

	/**
	 * @inheritdoc
	 */
	public function hasEagerLoadedElements(string $handle): bool
	{
		$typeHandlePrefix = $this->_getTypeHandlePrefix();
		$typeElementHandle = $typeHandlePrefix . $handle;
		$hasEagerLoadedElements = isset($this->_eagerLoadedBlockTypeElements[$typeElementHandle]);

		if ($hasEagerLoadedElements)
		{
			return true;
		}

		return parent::hasEagerLoadedElements($handle);
	}

	/**
	 * @inheritdoc
	 */
	public function getEagerLoadedElements(string $handle)
	{
		$typeHandlePrefix = $this->_getTypeHandlePrefix();
		$typeElementHandle = $typeHandlePrefix . $handle;
		$hasEagerLoadedBlockTypeElements = isset($this->_eagerLoadedBlockTypeElements[$typeElementHandle]);

		if ($hasEagerLoadedBlockTypeElements)
		{
			return $this->_eagerLoadedBlockTypeElements[$typeElementHandle];
		}

		return parent::getEagerLoadedElements($handle);
	}

	/**
	 * @inheritdoc
	 */
	public function setEagerLoadedElements(string $handle, array $elements)
	{
		$typeHandlePrefix = $this->_getTypeHandlePrefix();
		$hasMatchingHandlePrefix = strpos($handle, $typeHandlePrefix) === 0;

		if ($hasMatchingHandlePrefix)
		{
			$this->_eagerLoadedBlockTypeElements[$handle] = $elements;
		}
		else
		{
			parent::setEagerLoadedElements($handle, $elements);
		}
	}

	/**
	 * @inheritdoc
	 */
	public function getHasFreshContent(): bool
	{
		$owner = $this->getOwner();

		return $owner ? $owner->getHasFreshContent() : false;
	}

	/**
	 * @inheritdoc
	 * @throws Exception if the block ID is invalid.
	 */
	public function afterSave(bool $isNew)
	{
		$record = null;

		if ($isNew)
		{
			$record = new BlockRecord();
			$record->id = $this->id;
		}
		else
		{
			$record = BlockRecord::findOne($this->id);

			if (!$record)
			{
				throw new Exception("Invalid Neo block ID: $this->id");
			}
		}

		$record->fieldId = $this->fieldId;
		$record->ownerId = $this->ownerId;
		$record->ownerSiteId = $this->ownerSiteId;
		$record->typeId = $this->typeId;
		$record->save(false);

		parent::afterSave($isNew);
	}

	/**
	 * @inheritdoc
	 */
	public function beforeDelete(): bool
	{
		if (!parent::beforeDelete())
		{
			return false;
		}

		// Update this block's DB row with whether it was deleted with its owner element
		Craft::$app->getDb()
			->createCommand()
			->update('{{%neoblocks}}', [
				'deletedWithOwner' => $this->deletedWithOwner,
			], ['id' => $this->id], [], false)
			->execute();

		return true;
	}

	/**
	 * @inheritdoc
	 */
	public function afterDelete()
	{
		// Remove this block's collapsed state from the cache
		$this->forgetCollapsed();

		parent::afterDelete();
	}

	/**
	 * Allows memoizing all blocks (including this one) for a particular field.
	 * This is used for Live Preview mode, where certain methods, like `getAncestors`, create block queries which need
	 * a local set of blocks to query against.
	 *
	 * @param array $elements
	 */
	public function setAllElements($elements)
	{
		$this->_allElements = $elements;

		// Update the elements across any memoized block queries
		foreach ($this->_liveQueries as $name => $query)
		{
			$query->useMemoized($this->isUsingMemoized());
			$query->setAllElements($this->_allElements);
		}
	}

	/**
	 * Whether block queries operate on a memoized data set.
	 *
	 * @return bool
	 */
	public function isUsingMemoized()
	{
		return $this->_useMemoized;
	}

	/**
	 * Sets whether block queries operate on a memoized data set.
	 *
	 * @param bool|array $use - Either a boolean to enable/disable, or a dataset to use (which results in enabling)
	 */
	public function useMemoized($use = true)
	{
		if (is_array($use))
		{
			$this->setAllElements($use);
			$use = true;
		}

		$this->_useMemoized = $use;
	}

	/**
	 * Whether current view is a draft or not
	 *
	 * @return bool
	 */
	public function isDraftPreview()
	{
		// get token
		$token = Craft::$app->request->getParam('token');

		if(!empty($token)) 
		{
			// get the route of the token
			$route = Craft::$app->tokens->getTokenRoute($token);

			// check it's a shared entry
			if($route && $route[0] == 'entries/view-shared-entry')
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * @inheritdoc
	 */
	public function getAncestors(int $dist = null)
	{
		// If the request is in Live Preview mode, use the Neo-extended block query, which supports Live Preview mode
		$isLivePreview = Craft::$app->getRequest()->getIsLivePreview();
		$hasLocalElements = isset($this->_allElements);
		$isUsingMemoized = $this->isUsingMemoized();
		$isDraftPreview = $this->isDraftPreview();

		if (($isLivePreview && $hasLocalElements) || $isUsingMemoized || $isDraftPreview)
		{
			if (!isset($this->_liveQueries['ancestors']))
			{
				$query = $this->_getBaseRelativeQuery();
				$query->ancestorOf = $this;
				$query->useMemoized($this->_allElements);

				$this->_liveQueries['ancestors'] = $query;
			}

			if ($dist)
			{
				$query = $this->_liveQueries['ancestors']->ancestorDist($dist);
				$query->useMemoized($this->_allElements);

				return $query;
			}

			return $this->_liveQueries['ancestors'];
		}

		return parent::getAncestors($dist);
	}

	/**
	 * @inheritdoc
	 */
	public function getParent()
	{
		// If the request is in Live Preview mode, use the Neo-extended block query, which supports Live Preview mode
		$isLivePreview = Craft::$app->getRequest()->getIsLivePreview();
		$hasLocalElements = isset($this->_allElements);
		$isUsingMemoized = $this->isUsingMemoized();
		$isDraftPreview = $this->isDraftPreview();

		if (($isLivePreview && $hasLocalElements) || $isUsingMemoized || $isDraftPreview)
		{
			if (!isset($this->_liveQueries['parent']))
			{
				$query = $this->_getBaseRelativeQuery();
				$query->ancestorOf = $this;
				$query->ancestorDist = 1;
				$query->useMemoized($this->_allElements);

				$this->_liveQueries['parent'] = $query;
			}

			return $this->_liveQueries['parent']->one();
		}

		return parent::getParent();
	}

	/**
	 * @inheritdoc
	 */
	public function getDescendants(int $dist = null)
	{
		// If the request is in Live Preview mode, use the Neo-extended block query, which supports Live Preview mode
		$isLivePreview = Craft::$app->getRequest()->getIsLivePreview();
		$hasLocalElements = isset($this->_allElements);
		$isUsingMemoized = $this->isUsingMemoized();
		$isDraftPreview = $this->isDraftPreview();

		if (($isLivePreview && $hasLocalElements) || $isUsingMemoized || $isDraftPreview)
		{
			if (!isset($this->_liveQueries['descendants']))
			{
				$query = $this->_getBaseRelativeQuery();
				$query->descendantOf = $this;
				$query->useMemoized($this->_allElements);

				$this->_liveQueries['descendants'] = $query;
			}

			if ($dist)
			{
				$query = $this->_liveQueries['descendants']->descendantDist($dist);
				$query->useMemoized($this->_allElements);

				return $query;
			}

			return $this->_liveQueries['descendants'];
		}

		return parent::getDescendants($dist);
	}

	/**
	 * @inheritdoc
	 */
	public function getChildren()
	{
		// If the request is in Live Preview mode, use the Neo-extended block query, which supports Live Preview mode
		$isLivePreview = Craft::$app->getRequest()->getIsLivePreview();
		$hasLocalElements = isset($this->_allElements);
		$isUsingMemoized = $this->isUsingMemoized();
		$isDraftPreview = $this->isDraftPreview();

		if (($isLivePreview && $hasLocalElements) || $isUsingMemoized || $isDraftPreview)
		{
			if (!isset($this->_liveQueries['children']))
			{
				$query = $this->_getBaseRelativeQuery();
				$query->descendantOf = $this;
				$query->descendantDist = 1;
				$query->useMemoized($this->_allElements);

				$this->_liveQueries['children'] = $query;
			}

			return $this->_liveQueries['children'];
		}

		return parent::getChildren();
	}

	/**
	 * @inheritdoc
	 */
	public function getSiblings()
	{
		// If the request is in Live Preview mode, use the Neo-extended block query, which supports Live Preview mode
		$isLivePreview = Craft::$app->getRequest()->getIsLivePreview();
		$hasLocalElements = isset($this->_allElements);
		$isUsingMemoized = $this->isUsingMemoized();
		$isDraftPreview = $this->isDraftPreview();

		if (($isLivePreview && $hasLocalElements) || $isUsingMemoized || $isDraftPreview)
		{
			if (!isset($this->_liveQueries['siblings']))
			{
				$query = $this->_getBaseRelativeQuery();
				$query->siblingOf = $this;
				$query->useMemoized($this->_allElements);

				$this->_liveQueries['siblings'] = $query;
			}

			return $this->_liveQueries['siblings'];
		}

		return parent::getSiblings();
	}

	/**
	 * @inheritdoc
	 */
	public function getPrevSibling()
	{
		// If the request is in Live Preview mode, use the Neo-extended block query, which supports Live Preview mode
		$isLivePreview = Craft::$app->getRequest()->getIsLivePreview();
		$hasLocalElements = isset($this->_allElements);
		$isUsingMemoized = $this->isUsingMemoized();
		$isDraftPreview = $this->isDraftPreview();

		if (($isLivePreview && $hasLocalElements) || $isUsingMemoized || $isDraftPreview)
		{
			if (!isset($this->_liveQueries['prevSibling']))
			{
				$query = $this->_getBaseRelativeQuery();
				$query->prevSiblingOf = $this;
				$query->useMemoized($this->_allElements);

				$this->_liveQueries['prevSibling'] = $query;
			}

			return $this->_liveQueries['prevSibling']->one();
		}

		return parent::getPrevSibling();
	}

	/**
	 * @inheritdoc
	 */
	public function getNextSibling()
	{
		// If the request is in Live Preview mode, use the Neo-extended block query, which supports Live Preview mode
		$isLivePreview = Craft::$app->getRequest()->getIsLivePreview();
		$hasLocalElements = isset($this->_allElements);
		$isUsingMemoized = $this->isUsingMemoized();
		$isDraftPreview = $this->isDraftPreview();

		if (($isLivePreview && $hasLocalElements) || $isUsingMemoized || $isDraftPreview)
		{
			if (!isset($this->_liveQueries['nextSibling']))
			{
				$query = $this->_getBaseRelativeQuery();
				$query->nextSiblingOf = $this;
				$query->useMemoized($this->_allElements);

				$this->_liveQueries['nextSibling'] = $query;
			}

			return $this->_liveQueries['nextSibling']->one();
		}

		return parent::getNextSibling();
	}

	/**
	 * Returns a basic query for any blocks that are relatives of this block.
	 *
	 * @return BlockQuery
	 */
	private function _getBaseRelativeQuery(): BlockQuery
	{
		$query = Block::find();
		$query->fieldId($this->fieldId);
		$query->ownerId($this->ownerId);
		$query->siteId($this->siteId);
		$query->limit(null);
		$query->status('enabled');
		$query->indexBy('id');

		return $query;
	}

	/**
	 * Returns the block type handle in the form of a prefix for finding fields belonging to this block's type.
	 *
	 * @return string
	 */
	private function _getTypeHandlePrefix(): string
	{
		$type = $this->getType();
		$typeHandlePrefix = $type->handle . ':';

		return $typeHandlePrefix;
	}
}
