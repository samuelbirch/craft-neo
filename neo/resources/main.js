/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Configurator = __webpack_require__(1);
	
	var _Configurator2 = _interopRequireDefault(_Configurator);
	
	var _Input = __webpack_require__(30);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Neo = {
		Configurator: _Configurator2.default,
		Input: _Input2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(3);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _namespace = __webpack_require__(6);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	var _BlockType = __webpack_require__(7);
	
	var _BlockType2 = _interopRequireDefault(_BlockType);
	
	var _BlockTypeSettings = __webpack_require__(9);
	
	var _BlockTypeSettings2 = _interopRequireDefault(_BlockTypeSettings);
	
	var _BlockTypeFieldLayout = __webpack_require__(19);
	
	var _BlockTypeFieldLayout2 = _interopRequireDefault(_BlockTypeFieldLayout);
	
	var _Group = __webpack_require__(21);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _GroupSettings = __webpack_require__(22);
	
	var _GroupSettings2 = _interopRequireDefault(_GroupSettings);
	
	var _configurator = __webpack_require__(25);
	
	var _configurator2 = _interopRequireDefault(_configurator);
	
	__webpack_require__(18);
	
	__webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var _defaults = {
		namespace: [],
		blockTypes: [],
		groups: [],
		fieldLayoutHtml: ''
	};
	
	exports.default = _garnish2.default.Base.extend({
	
		_templateNs: [],
		_items: [],
	
		init: function init() {
			var _this = this;
	
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			var inputIdPrefix = _craft2.default.formatInputId(settings.namespace);
			var $field = (0, _jquery2.default)('#' + inputIdPrefix + '-neo-configurator');
			var $input = $field.children('.field').children('.input');
	
			this._templateNs = _namespace2.default.parse(settings.namespace);
			this._fieldLayoutHtml = settings.fieldLayoutHtml;
			this._items = [];
	
			_namespace2.default.enter(this._templateNs);
	
			this.$container = (0, _jquery2.default)((0, _configurator2.default)());
			$input.append(this.$container);
	
			_namespace2.default.leave();
	
			var $neo = this.$container.find('[data-neo]');
			this.$mainContainer = $neo.filter('[data-neo="container.main"]');
			this.$sidebarContainer = $neo.filter('[data-neo="container.sidebar"]');
			this.$blockTypesContainer = $neo.filter('[data-neo="container.blockTypes"]');
			this.$settingsContainer = $neo.filter('[data-neo="container.settings"]');
			this.$fieldLayoutContainer = $neo.filter('[data-neo="container.fieldLayout"]');
			this.$blockTypeButton = $neo.filter('[data-neo="button.blockType"]');
			this.$groupButton = $neo.filter('[data-neo="button.group"]');
			this.$settingsButton = $neo.filter('[data-neo="button.settings"]');
			this.$fieldLayoutButton = $neo.filter('[data-neo="button.fieldLayout"]');
	
			this._itemSort = new _garnish2.default.DragSort(null, {
				container: this.$blockTypeItemsContainer,
				handle: '[data-neo-bt="button.move"], [data-neo-g="button.move"]',
				axis: 'y',
				onSortChange: function onSortChange() {
					return _this._updateItemOrder();
				}
			});
	
			// Add the existing block types and groups
			var existingItems = [];
			var btNamespace = [].concat(_toConsumableArray(this._templateNs), ['blockTypes']);
			var gNamespace = [].concat(_toConsumableArray(this._templateNs), ['groups']);
	
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = settings.blockTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var btInfo = _step.value;
	
					var btSettings = new _BlockTypeSettings2.default({
						namespace: [].concat(_toConsumableArray(btNamespace), [btInfo.id]),
						sortOrder: btInfo.sortOrder,
						id: btInfo.id,
						name: btInfo.name,
						handle: btInfo.handle,
						maxBlocks: btInfo.maxBlocks,
						errors: btInfo.errors
					});
	
					var btFieldLayout = new _BlockTypeFieldLayout2.default({
						namespace: [].concat(_toConsumableArray(btNamespace), [btInfo.id]),
						html: this._fieldLayoutHtml,
						layout: btInfo.fieldLayout
					});
	
					var blockType = new _BlockType2.default({
						namespace: btNamespace,
						settings: btSettings,
						fieldLayout: btFieldLayout
					});
	
					existingItems.push(blockType);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;
	
			try {
				for (var _iterator2 = settings.groups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var gInfo = _step2.value;
	
					var gSettings = new _GroupSettings2.default({
						namespace: gNamespace,
						sortOrder: gInfo.sortOrder,
						name: gInfo.name
					});
	
					var group = new _Group2.default({
						namespace: gNamespace,
						settings: gSettings
					});
	
					existingItems.push(group);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
	
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;
	
			try {
				for (var _iterator3 = existingItems.sort(function (a, b) {
					return a.getSettings().getSortOrder() - b.getSettings().getSortOrder();
				})[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var item = _step3.value;
	
					this.addItem(item);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
	
			this.selectTab('settings');
	
			this.addListener(this.$blockTypeButton, 'click', '@newBlockType');
			this.addListener(this.$groupButton, 'click', '@newGroup');
			this.addListener(this.$settingsButton, 'click', function () {
				return _this.selectTab('settings');
			});
			this.addListener(this.$fieldLayoutButton, 'click', function () {
				return _this.selectTab('fieldLayout');
			});
		},
		addItem: function addItem(item) {
			var _this2 = this;
	
			var index = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];
	
			var settings = item.getSettings();
	
			if (index >= 0 && index < this._items.length) {
				item.$container.insertAt(index, this.$blockTypesContainer);
			} else {
				this.$blockTypesContainer.append(item.$container);
			}
	
			this._itemSort.addItems(item.$container);
	
			if (settings) this.$settingsContainer.append(settings.$container);
	
			this.$mainContainer.removeClass('hidden');
	
			this.addListener(item.$container, 'click', '@selectItem');
			item.on('destroy.configurator', function () {
				return _this2.removeItem(item, item instanceof _BlockType2.default);
			});
	
			if (item instanceof _BlockType2.default) {
				var fieldLayout = item.getFieldLayout();
				if (fieldLayout) this.$fieldLayoutContainer.append(fieldLayout.$container);
			}
	
			this._items.push(item);
			this._updateItemOrder();
	
			this.trigger('addItem', {
				item: item,
				index: index
			});
		},
		removeItem: function removeItem(item, showConfirm) {
			showConfirm = typeof showConfirm === 'boolean' ? showConfirm : false;
	
			if (showConfirm) {
				var message = _craft2.default.t('Are you sure you want to delete this {type}?', { type: item instanceof _BlockType2.default ? 'block type' : item instanceof _Group2.default ? 'group' : 'item'
				});
	
				if (confirm(message)) {
					this.removeItem(item, false);
				}
			} else {
				var settings = item.getSettings();
	
				this._itemSort.removeItems(item.$container);
	
				item.$container.remove();
				if (settings) settings.$container.remove();
	
				if (item instanceof _BlockType2.default) {
					var fieldLayout = item.getFieldLayout();
					if (fieldLayout) fieldLayout.$container.remove();
				}
	
				this.removeListener(item.$container, 'click');
				item.off('.configurator');
	
				this._updateItemOrder();
	
				if (this._items.length === 0) {
					this.$mainContainer.addClass('hidden');
				}
	
				this.trigger('removeItem', {
					item: item
				});
			}
		},
		getItems: function getItems() {
			return Array.from(this._items);
		},
		getItemByElement: function getItemByElement($element) {
			return this._items.find(function (item) {
				return item.$container.is($element);
			});
		},
		selectItem: function selectItem(item, focusInput) {
			focusInput = typeof focusInput === 'boolean' ? focusInput : true;
	
			var settings = item ? item.getSettings() : null;
	
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;
	
			try {
				for (var _iterator4 = this._items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var i = _step4.value;
	
					i.toggleSelect(i === item);
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
	
			if (focusInput && settings && !_garnish2.default.isMobileBrowser()) {
				setTimeout(function () {
					return settings.getFocusInput().focus();
				}, 100);
			}
		},
		getBlockTypes: function getBlockTypes() {
			return this._items.filter(function (item) {
				return item instanceof _BlockType2.default;
			});
		},
		getGroups: function getGroups() {
			return this._items.filter(function (item) {
				return item instanceof _Group2.default;
			});
		},
		selectTab: function selectTab(tab) {
			this.$settingsContainer.toggleClass('hidden', tab !== 'settings');
			this.$fieldLayoutContainer.toggleClass('hidden', tab !== 'fieldLayout');
	
			this.$settingsButton.toggleClass('is-selected', tab === 'settings');
			this.$fieldLayoutButton.toggleClass('is-selected', tab === 'fieldLayout');
		},
		_updateItemOrder: function _updateItemOrder() {
			var _this3 = this;
	
			var items = [];
	
			this._itemSort.$items.each(function (index, element) {
				var item = _this3.getItemByElement(element);
	
				if (item) {
					var settings = item.getSettings();
					if (settings) settings.setSortOrder(index + 1);
	
					items.push(item);
				}
			});
	
			this._items = items;
		},
		'@newBlockType': function newBlockType() {
			var namespace = [].concat(_toConsumableArray(this._templateNs), ['blockTypes']);
			var id = _BlockTypeSettings2.default.getNewId();
	
			var settings = new _BlockTypeSettings2.default({
				namespace: [].concat(_toConsumableArray(namespace), [id]),
				sortOrder: this._items.length,
				id: id
			});
	
			var fieldLayout = new _BlockTypeFieldLayout2.default({
				namespace: [].concat(_toConsumableArray(namespace), [id]),
				html: this._fieldLayoutHtml
			});
	
			var blockType = new _BlockType2.default({
				namespace: namespace,
				settings: settings,
				fieldLayout: fieldLayout
			});
	
			this.addItem(blockType);
			this.selectItem(blockType);
		},
		'@newGroup': function newGroup() {
			var namespace = [].concat(_toConsumableArray(this._templateNs), ['groups']);
	
			var settings = new _GroupSettings2.default({
				namespace: namespace,
				sortOrder: this._items.length
			});
	
			var group = new _Group2.default({
				namespace: namespace,
				settings: settings
			});
	
			this.addItem(group);
			this.selectItem(group);
		},
		'@selectItem': function selectItem(e) {
			var item = this.getItemByElement(e.currentTarget);
	
			this.selectItem(item);
		}
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// @see http://stackoverflow.com/a/12903503/556609
	_jquery2.default.fn.insertAt = function (index, $parent) {
		return this.each(function () {
			if (index === 0) {
				$parent.prepend(this);
			} else {
				$parent.children().eq(index - 1).after(this);
			}
		});
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Garnish;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = Craft;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var NS = _garnish2.default.Base.extend({
	
		_stack: [[]],
	
		enter: function enter(segments) {
			var join = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
			if (typeof segments === 'string') {
				segments = this.fromFieldName(segments);
			}
	
			if (join) {
				var joined = this.getNamespace();
				joined.push.apply(joined, _toConsumableArray(segments));
	
				segments = joined;
			}
	
			this._stack.push(segments);
		},
		enterByFieldName: function enterByFieldName(fieldName) {
			var join = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
			this.enter(this.fromFieldName(fieldName), join);
		},
		leave: function leave() {
			return this._stack.length > 1 ? this._stack.pop() : this.getNamespace();
		},
		getNamespace: function getNamespace() {
			return Array.from(this._stack[this._stack.length - 1]);
		},
		parse: function parse(value) {
			if (typeof value === 'string') {
				if (value.indexOf('[') > -1) {
					return this.fromFieldName(value);
				}
	
				if (value.indexOf('-') > -1) {
					return value.split('-');
				}
	
				if (value.indexOf('.') > -1) {
					return value.split('.');
				}
	
				return value;
			}
	
			return Array.from(value);
		},
		value: function value(_value) {
			var separator = arguments.length <= 1 || arguments[1] === undefined ? '-' : arguments[1];
	
			var segments = this.getNamespace();
			segments.push(_value);
	
			return segments.join(separator);
		},
		fieldName: function fieldName() {
			var _fieldName = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
			var prefix = this.toFieldName();
	
			if (prefix) {
				return prefix + _fieldName.replace(/([^'"\[\]]+)([^'"]*)/, '[$1]$2');
			}
	
			return _fieldName;
		},
		toString: function toString() {
			var separator = arguments.length <= 0 || arguments[0] === undefined ? '-' : arguments[0];
	
			return this.getNamespace().join(separator);
		},
		toFieldName: function toFieldName() {
			var segments = this.getNamespace();
	
			switch (segments.length) {
				case 0:
					return '';
				case 1:
					return segments[0];
			}
	
			return segments[0] + '[' + segments.slice(1).join('][') + ']';
		},
		fromFieldName: function fromFieldName(fieldName) {
			return fieldName.match(/[^\[\]\s]+/g) || [];
		}
	});
	
	exports.default = new NS();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _namespace = __webpack_require__(6);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	var _Item = __webpack_require__(8);
	
	var _Item2 = _interopRequireDefault(_Item);
	
	var _BlockTypeSettings = __webpack_require__(9);
	
	var _BlockTypeSettings2 = _interopRequireDefault(_BlockTypeSettings);
	
	var _BlockTypeFieldLayout = __webpack_require__(19);
	
	var _BlockTypeFieldLayout2 = _interopRequireDefault(_BlockTypeFieldLayout);
	
	var _blocktype = __webpack_require__(20);
	
	var _blocktype2 = _interopRequireDefault(_blocktype);
	
	__webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		namespace: [],
		fieldLayout: null
	};
	
	exports.default = _Item2.default.extend({
	
		_templateNs: [],
	
		init: function init() {
			var _this = this;
	
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			this.base(settings);
	
			var settingsObj = this.getSettings();
			settings = Object.assign({}, _defaults, settings);
	
			this._templateNs = _namespace2.default.parse(settings.namespace);
			this._fieldLayout = settings.fieldLayout;
	
			_namespace2.default.enter(this._templateNs);
	
			this.$container = (0, _jquery2.default)((0, _blocktype2.default)({
				settings: settingsObj,
				fieldLayout: this._fieldLayout
			}));
	
			_namespace2.default.leave();
	
			var $neo = this.$container.find('[data-neo-bt]');
			this.$nameText = $neo.filter('[data-neo-bt="text.name"]');
			this.$moveButton = $neo.filter('[data-neo-bt="button.move"]');
	
			if (settingsObj) {
				settingsObj.on('change', function () {
					return _this._updateTemplate();
				});
				settingsObj.on('destroy', function () {
					return _this.trigger('destroy');
				});
			}
	
			this.deselect();
		},
		getFieldLayout: function getFieldLayout() {
			return this._fieldLayout;
		},
	
	
		toggleSelect: function toggleSelect(select) {
			this.base(select);
	
			var settings = this.getSettings();
			var fieldLayout = this.getFieldLayout();
			var selected = this.isSelected();
	
			if (settings) {
				settings.$container.toggleClass('hidden', !selected);
			}
	
			if (fieldLayout) {
				fieldLayout.$container.toggleClass('hidden', !selected);
			}
	
			this.$container.toggleClass('is-selected', selected);
		},
	
		_updateTemplate: function _updateTemplate() {
			var settings = this.getSettings();
			var fieldLayout = this.getFieldLayout();
	
			if (settings) {
				this.$nameText.text(settings.getName());
	
				if (fieldLayout) {
					fieldLayout.setBlockName(settings.getName());
				}
			}
		}
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		settings: null
	};
	
	exports.default = _garnish2.default.Base.extend({
	
		_selected: false,
	
		init: function init() {
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._settings = settings.settings;
		},
		getSettings: function getSettings() {
			return this._settings;
		},
		select: function select() {
			this.toggleSelect(true);
		},
		deselect: function deselect() {
			this.toggleSelect(false);
		},
	
	
		toggleSelect: function toggleSelect(select) {
			this._selected = typeof select === 'boolean' ? select : !this._selected;
	
			this.trigger('toggleSelect', {
				selected: this._selected
			});
		},
	
		isSelected: function isSelected() {
			return this._selected;
		}
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _namespace = __webpack_require__(6);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	var _Settings = __webpack_require__(10);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _blocktype_settings = __webpack_require__(11);
	
	var _blocktype_settings2 = _interopRequireDefault(_blocktype_settings);
	
	__webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		namespace: [],
		id: null,
		sortOrder: 0,
		name: '',
		handle: '',
		maxBlocks: 0,
		childBlocks: null,
		errors: {}
	};
	
	exports.default = _Settings2.default.extend({
	
		_templateNs: [],
	
		$sortOrderInput: new _jquery2.default(),
		$nameInput: new _jquery2.default(),
		$handleInput: new _jquery2.default(),
		$maxBlocksInput: new _jquery2.default(),
	
		init: function init() {
			var _this = this;
	
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._templateNs = _namespace2.default.parse(settings.namespace);
			this._id = settings.id;
			this._errors = settings.errors;
	
			this.setSortOrder(settings.sortOrder);
			this.setName(settings.name);
			this.setHandle(settings.handle);
			this.setMaxBlocks(settings.maxBlocks);
	
			_namespace2.default.enter(this._templateNs);
	
			this.$container = (0, _jquery2.default)((0, _blocktype_settings2.default)({
				id: this.getId(),
				sortOrder: this.getSortOrder(),
				name: this.getName(),
				handle: this.getHandle(),
				maxBlocks: this.getMaxBlocks(),
				errors: this.getErrors()
			}));
	
			_namespace2.default.leave();
	
			var $neo = this.$container.find('[data-neo-bts]');
			this.$sortOrderInput = $neo.filter('[data-neo-bts="input.sortOrder"]');
			this.$nameInput = $neo.filter('[data-neo-bts="input.name"]');
			this.$handleInput = $neo.filter('[data-neo-bts="input.handle"]');
			this.$maxBlocksInput = $neo.filter('[data-neo-bts="input.maxBlocks"]');
			this.$deleteButton = $neo.filter('[data-neo-bts="button.delete"]');
	
			this._handleGenerator = new _craft2.default.HandleGenerator(this.$nameInput, this.$handleInput);
	
			this.addListener(this.$nameInput, 'keyup change', function () {
				return _this.setName(_this.$nameInput.val());
			});
			this.addListener(this.$handleInput, 'keyup change', function () {
				return _this.setHandle(_this.$handleInput.val());
			});
			this.addListener(this.$maxBlocksInput, 'keyup change', function () {
				return _this.setMaxBlocks(_this.$maxBlocksInput.val());
			});
			this.addListener(this.$deleteButton, 'click', function () {
				return _this.destroy();
			});
		},
		getFocusInput: function getFocusInput() {
			return this.$nameInput;
		},
		getId: function getId() {
			return this._id;
		},
		isNew: function isNew() {
			return (/^new/.test(this.getId())
			);
		},
		getErrors: function getErrors() {
			return this._errors;
		},
		setSortOrder: function setSortOrder(sortOrder) {
			this.base(sortOrder);
	
			this.$sortOrderInput.val(this.getSortOrder());
		},
		getName: function getName() {
			return this._name;
		},
		setName: function setName(name) {
			var oldName = this._name;
			this._name = name;
	
			this.$nameInput.val(this._name);
	
			this.trigger('change', {
				property: 'name',
				oldValue: oldName,
				newValue: this._name
			});
		},
		getHandle: function getHandle() {
			return this._handle;
		},
		setHandle: function setHandle(handle) {
			var oldHandle = this._handle;
			this._handle = handle;
	
			this.$handleInput.val(this._handle);
	
			this.trigger('change', {
				property: 'handle',
				oldValue: oldHandle,
				newValue: this._handle
			});
		},
		getMaxBlocks: function getMaxBlocks() {
			return this._maxBlocks;
		},
		setMaxBlocks: function setMaxBlocks(maxBlocks) {
			var oldMaxBlocks = this._maxBlocks;
			this._maxBlocks = Math.max(0, maxBlocks | 0);
	
			this.$maxBlocksInput.val(this._maxBlocks > 0 ? this._maxBlocks : null);
	
			this.trigger('change', {
				property: 'maxBlocks',
				oldValue: oldMaxBlocks,
				newValue: this._maxBlocks
			});
		}
	}, {
		_totalNewBlockTypes: 0,
	
		getNewId: function getNewId() {
			return 'new' + this._totalNewBlockTypes++;
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _garnish2.default.Base.extend({
	
		$container: new _jquery2.default(),
		_sortOrder: 0,
	
		getSortOrder: function getSortOrder() {
			return this._sortOrder;
		},
		setSortOrder: function setSortOrder(sortOrder) {
			var oldSortOrder = this._sortOrder;
			this._sortOrder = sortOrder | 0;
	
			this.trigger('change', {
				property: 'sortOrder',
				oldValue: oldSortOrder,
				newValue: this._sortOrder
			});
		},
		getFocusElement: function getFocusElement() {
			return new _jquery2.default();
		},
		destroy: function destroy() {
			this.trigger('destroy');
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	
	var twig = __webpack_require__(13).twig,
	    template = twig({id:"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\configurator\\templates\\blocktype_settings.twig", data:[{"type":"logic","token":{"type":"Twig.logic.type.import","expression":"'../../macros.twig'","contextName":"macros","stack":[{"type":"Twig.expression.type.string","value":"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\macros.twig"}]}},{"type":"raw","value":"\r\n\r\n<div>\r\n\t<input type=\"hidden\" name=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"sortOrder"},{"type":"Twig.expression.type.filter","value":"ns","match":["|ns","ns"]}]},{"type":"raw","value":"\" value=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"sortOrder","match":["sortOrder"]}]},{"type":"raw","value":"\" data-neo-bts=\"input.sortOrder\">\r\n\r\n\t<div>\r\n\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"macros","match":["macros"]},{"type":"Twig.expression.type.key.period","key":"input","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"type"},{"type":"Twig.expression.type.string","value":"text"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"name"},{"type":"Twig.expression.type.string","value":"name"},{"type":"Twig.expression.type.filter","value":"ns","match":["|ns","ns"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"label"},{"type":"Twig.expression.type.string","value":"Name"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"instructions"},{"type":"Twig.expression.type.string","value":"What this block type will be called in the CP."},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"required"},{"type":"Twig.expression.type.bool","value":true},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"value"},{"type":"Twig.expression.type.variable","value":"name","match":["name"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"errors"},{"type":"Twig.expression.type.variable","value":"errors","match":["errors"]},{"type":"Twig.expression.type.key.period","key":"name"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"attributes"},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"data-neo-bts"},{"type":"Twig.expression.type.string","value":"input.name"},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n\r\n\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"macros","match":["macros"]},{"type":"Twig.expression.type.key.period","key":"input","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"type"},{"type":"Twig.expression.type.string","value":"text"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"name"},{"type":"Twig.expression.type.string","value":"handle"},{"type":"Twig.expression.type.filter","value":"ns","match":["|ns","ns"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"label"},{"type":"Twig.expression.type.string","value":"Handle"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"instructions"},{"type":"Twig.expression.type.string","value":"How you'll refer to this block type in the templates."},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"required"},{"type":"Twig.expression.type.bool","value":true},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"class"},{"type":"Twig.expression.type.string","value":"code"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"value"},{"type":"Twig.expression.type.variable","value":"handle","match":["handle"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"errors"},{"type":"Twig.expression.type.variable","value":"errors","match":["errors"]},{"type":"Twig.expression.type.key.period","key":"handle"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"attributes"},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"data-neo-bts"},{"type":"Twig.expression.type.string","value":"input.handle"},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n\r\n\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"macros","match":["macros"]},{"type":"Twig.expression.type.key.period","key":"input","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"type"},{"type":"Twig.expression.type.string","value":"number"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"name"},{"type":"Twig.expression.type.string","value":"maxBlocks"},{"type":"Twig.expression.type.filter","value":"ns","match":["|ns","ns"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"label"},{"type":"Twig.expression.type.string","value":"Max Blocks"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"instructions"},{"type":"Twig.expression.type.string","value":"The maximum number of blocks of this type the field is allowed to have."},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"fullWidth"},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"value"},{"type":"Twig.expression.type.variable","value":"maxBlocks","match":["maxBlocks"]},{"type":"Twig.expression.type.number","value":0,"match":["0",null]},{"type":"Twig.expression.type.operator.binary","value":">","precidence":8,"associativity":"leftToRight","operator":">"},{"type":"Twig.expression.type.variable","value":"maxBlocks","match":["maxBlocks"]},{"type":"Twig.expression.type.null","value":null},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"errors"},{"type":"Twig.expression.type.variable","value":"errors","match":["errors"]},{"type":"Twig.expression.type.key.period","key":"maxBlocks"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"attributes"},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"min"},{"type":"Twig.expression.type.number","value":0,"match":["0",null]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"style"},{"type":"Twig.expression.type.string","value":"width: 80px;"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"data-neo-bts"},{"type":"Twig.expression.type.string","value":"input.maxBlocks"},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n\t</div>\r\n\r\n\t<hr>\r\n\r\n\t<a class=\"error delete\" data-neo-bts=\"button.delete\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Delete block type"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a>\r\n</div>\r\n"}], allowInlineIncludes: true});
	
	module.exports = function(context) { return template.render(context); }

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var twig = __webpack_require__(13).twig,
	    template = twig({id:"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\macros.twig", data:[{"type":"logic","token":{"type":"Twig.logic.type.macro","macroName":"field","parameters":["settings"],"output":[{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"settings","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"id","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"id"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"label","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"label"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"instructions","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"instructions"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"required","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"required"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"locale","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"locale"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"input","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"input"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"warning","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"warning"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"errors","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"errors"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\r\n\t<div class=\"field\">\r\n\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"label","match":["label"]},{"type":"Twig.expression.type.variable","value":"instructions","match":["instructions"]},{"type":"Twig.expression.type.operator.binary","value":"or","precidence":14,"associativity":"leftToRight","operator":"or"}],"output":[{"type":"raw","value":"\r\n\t\t\t<div class=\"heading\">\r\n\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"label","match":["label"]}],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t<label"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"required","match":["required"]}],"output":[{"type":"raw","value":" class=\"required\""}]}},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"id","match":["id"]}],"output":[{"type":"raw","value":" for=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"id","match":["id"]}]},{"type":"raw","value":"\""}]}},{"type":"raw","value":">\r\n\t\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"label","match":["label"]},{"type":"Twig.expression.type.filter","value":"raw","match":["|raw","raw"]}]},{"type":"raw","value":"\r\n\t\t\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"locale","match":["locale"]}],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t\t\t<span class=\"locale\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"locale","match":["locale"]}]},{"type":"raw","value":"</span>\r\n\t\t\t\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t\t\t\t</label>\r\n\t\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"instructions","match":["instructions"]}],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t<div class=\"instructions\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"instructions","match":["instructions"]},{"type":"Twig.expression.type.filter","value":"raw","match":["|raw","raw"]}]},{"type":"raw","value":"</div>\r\n\t\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t\t</div>\r\n\t\t"}]}},{"type":"raw","value":"\r\n\t\t<div class=\"input "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"orientation","match":["orientation"]}]},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"errors","match":["errors"]}],"output":[{"type":"raw","value":" errors"}]}},{"type":"raw","value":"\">\r\n\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"input","match":["input"]},{"type":"Twig.expression.type.filter","value":"raw","match":["|raw","raw"]}]},{"type":"raw","value":"\r\n\t\t</div>\r\n\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"warning","match":["warning"]}],"output":[{"type":"raw","value":"\r\n\t\t\t<p class=\"warning\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"warning","match":["warning"]}]},{"type":"raw","value":"</p>\r\n\t\t"}]}},{"type":"raw","value":"\r\n\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"errors","match":["errors"]}],"output":[{"type":"raw","value":"\r\n\t\t\t<ul class=\"errors\">\r\n\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.for","key_var":null,"value_var":"error","expression":[{"type":"Twig.expression.type.variable","value":"errors","match":["errors"]}],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t<li>"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"error","match":["error"]}]},{"type":"raw","value":"</li>\r\n\t\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t\t</ul>\r\n\t\t"}]}},{"type":"raw","value":"\r\n\t</div>\r\n"}]}},{"type":"raw","value":"\r\n\r\n"},{"type":"logic","token":{"type":"Twig.logic.type.macro","macroName":"input","parameters":["settings"],"output":[{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.from","expression":"_self","macroNames":{"field":"field"},"stack":[{"type":"Twig.expression.type.variable","value":"_self","match":["_self"]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"settings","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"type","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"type"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.string","value":"text"},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"attributes","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"attributes"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"id","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"id"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"name","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"name"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"value","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"value"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"class","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"class"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"fullWidth","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"fullWidth"},{"type":"Twig.expression.type.filter","value":"default","match":["|default","default"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.bool","value":true},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\r\n\t"},{"type":"logic","token":{"type":"Twig.logic.type.setcapture","key":"input","output":[{"type":"raw","value":"\r\n\t\t<input class=\"text "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"fullWidth","match":["fullWidth"]},{"type":"Twig.expression.type.string","value":"fullwidth"},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]},{"type":"raw","value":" "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"class","match":["class"]}]},{"type":"raw","value":"\"\r\n\t\t\t   type=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]}]},{"type":"raw","value":"\"\r\n\t\t\t   id=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"id","match":["id"]}]},{"type":"raw","value":"\"\r\n\t\t\t   name=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"name","match":["name"]}]},{"type":"raw","value":"\"\r\n\t\t\t   value=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"value","match":["value"]}]},{"type":"raw","value":"\"\r\n\t\t\t   "},{"type":"logic","token":{"type":"Twig.logic.type.for","key_var":"attrName","value_var":"attrValue","expression":[{"type":"Twig.expression.type.variable","value":"attributes","match":["attributes"]}],"output":[{"type":"raw","value":"\r\n\t\t           "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"attrName","match":["attrName"]}]},{"type":"raw","value":"=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"attrValue","match":["attrValue"]}]},{"type":"raw","value":"\"\r\n\t\t       "}]}},{"type":"raw","value":"\r\n\t\t\t   autocomplete=\"off\">\r\n\t"}]}},{"type":"raw","value":"\r\n\r\n\t"},{"type":"output","stack":[{"type":"Twig.expression.type._function","fn":"field","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.filter","value":"merge","match":["|merge","merge"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"input"},{"type":"Twig.expression.type.variable","value":"input","match":["input"]},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n"}]}},{"type":"raw","value":"\r\n"}], allowInlineIncludes: true});
	
	module.exports = function(context) { return template.render(context); }

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
	 * Twig.js 0.8.8
	 *
	 * @copyright 2011-2015 John Roepke and the Twig.js Contributors
	 * @license   Available under the BSD 2-Clause License
	 * @link      https://github.com/justjohn/twig.js
	 */
	var Twig=function(Twig){Twig.VERSION="0.8.8";return Twig}(Twig||{});var Twig=function(Twig){"use strict";Twig.trace=false;Twig.debug=false;Twig.cache=true;Twig.placeholders={parent:"{{|PARENT|}}"};Twig.indexOf=function(arr,searchElement){if(Array.prototype.hasOwnProperty("indexOf")){return arr.indexOf(searchElement)}if(arr===void 0||arr===null){throw new TypeError}var t=Object(arr);var len=t.length>>>0;if(len===0){return-1}var n=0;if(arguments.length>0){n=Number(arguments[1]);if(n!==n){n=0}else if(n!==0&&n!==Infinity&&n!==-Infinity){n=(n>0||-1)*Math.floor(Math.abs(n))}}if(n>=len){return-1}var k=n>=0?n:Math.max(len-Math.abs(n),0);for(;k<len;k++){if(k in t&&t[k]===searchElement){return k}}if(arr==searchElement){return 0}return-1};Twig.forEach=function(arr,callback,thisArg){if(Array.prototype.forEach){return arr.forEach(callback,thisArg)}var T,k;if(arr==null){throw new TypeError(" this is null or not defined")}var O=Object(arr);var len=O.length>>>0;if({}.toString.call(callback)!="[object Function]"){throw new TypeError(callback+" is not a function")}if(thisArg){T=thisArg}k=0;while(k<len){var kValue;if(k in O){kValue=O[k];callback.call(T,kValue,k,O)}k++}};Twig.merge=function(target,source,onlyChanged){Twig.forEach(Object.keys(source),function(key){if(onlyChanged&&!(key in target)){return}target[key]=source[key]});return target};Twig.Error=function(message){this.message=message;this.name="TwigException";this.type="TwigException"};Twig.Error.prototype.toString=function(){var output=this.name+": "+this.message;return output};Twig.log={trace:function(){if(Twig.trace&&console){console.log(Array.prototype.slice.call(arguments))}},debug:function(){if(Twig.debug&&console){console.log(Array.prototype.slice.call(arguments))}}};if(typeof console!=="undefined"){if(typeof console.error!=="undefined"){Twig.log.error=function(){console.error.apply(console,arguments)}}else if(typeof console.log!=="undefined"){Twig.log.error=function(){console.log.apply(console,arguments)}}}else{Twig.log.error=function(){}}Twig.ChildContext=function(context){var ChildContext=function ChildContext(){};ChildContext.prototype=context;return new ChildContext};Twig.token={};Twig.token.type={output:"output",logic:"logic",comment:"comment",raw:"raw",output_whitespace_pre:"output_whitespace_pre",output_whitespace_post:"output_whitespace_post",output_whitespace_both:"output_whitespace_both",logic_whitespace_pre:"logic_whitespace_pre",logic_whitespace_post:"logic_whitespace_post",logic_whitespace_both:"logic_whitespace_both"};Twig.token.definitions=[{type:Twig.token.type.raw,open:"{% raw %}",close:"{% endraw %}"},{type:Twig.token.type.raw,open:"{% verbatim %}",close:"{% endverbatim %}"},{type:Twig.token.type.output_whitespace_pre,open:"{{-",close:"}}"},{type:Twig.token.type.output_whitespace_post,open:"{{",close:"-}}"},{type:Twig.token.type.output_whitespace_both,open:"{{-",close:"-}}"},{type:Twig.token.type.logic_whitespace_pre,open:"{%-",close:"%}"},{type:Twig.token.type.logic_whitespace_post,open:"{%",close:"-%}"},{type:Twig.token.type.logic_whitespace_both,open:"{%-",close:"-%}"},{type:Twig.token.type.output,open:"{{",close:"}}"},{type:Twig.token.type.logic,open:"{%",close:"%}"},{type:Twig.token.type.comment,open:"{#",close:"#}"}];Twig.token.strings=['"',"'"];Twig.token.findStart=function(template){var output={position:null,close_position:null,def:null},i,token_template,first_key_position,close_key_position;for(i=0;i<Twig.token.definitions.length;i++){token_template=Twig.token.definitions[i];first_key_position=template.indexOf(token_template.open);close_key_position=template.indexOf(token_template.close);Twig.log.trace("Twig.token.findStart: ","Searching for ",token_template.open," found at ",first_key_position);if(first_key_position>=0){if(token_template.open.length!==token_template.close.length){if(close_key_position<0){continue}}}if(first_key_position>=0&&(output.position===null||first_key_position<output.position)){output.position=first_key_position;output.def=token_template;output.close_position=close_key_position}else if(first_key_position>=0&&output.position!==null&&first_key_position===output.position){if(token_template.open.length>output.def.open.length){output.position=first_key_position;output.def=token_template;output.close_position=close_key_position}else if(token_template.open.length===output.def.open.length){if(token_template.close.length>output.def.close.length){if(close_key_position>=0&&close_key_position<output.close_position){output.position=first_key_position;output.def=token_template;output.close_position=close_key_position}}else if(close_key_position>=0&&close_key_position<output.close_position){output.position=first_key_position;output.def=token_template;output.close_position=close_key_position}}}}delete output["close_position"];return output};Twig.token.findEnd=function(template,token_def,start){var end=null,found=false,offset=0,str_pos=null,str_found=null,pos=null,end_offset=null,this_str_pos=null,end_str_pos=null,i,l;while(!found){str_pos=null;str_found=null;pos=template.indexOf(token_def.close,offset);if(pos>=0){end=pos;found=true}else{throw new Twig.Error("Unable to find closing bracket '"+token_def.close+"'"+" opened near template position "+start)}if(token_def.type===Twig.token.type.comment){break}if(token_def.type===Twig.token.type.raw){break}l=Twig.token.strings.length;for(i=0;i<l;i+=1){this_str_pos=template.indexOf(Twig.token.strings[i],offset);if(this_str_pos>0&&this_str_pos<pos&&(str_pos===null||this_str_pos<str_pos)){str_pos=this_str_pos;str_found=Twig.token.strings[i]}}if(str_pos!==null){end_offset=str_pos+1;end=null;found=false;while(true){end_str_pos=template.indexOf(str_found,end_offset);if(end_str_pos<0){throw"Unclosed string in template"}if(template.substr(end_str_pos-1,1)!=="\\"){offset=end_str_pos+1;break}else{end_offset=end_str_pos+1}}}}return end};Twig.tokenize=function(template){var tokens=[],error_offset=0,found_token=null,end=null;while(template.length>0){found_token=Twig.token.findStart(template);Twig.log.trace("Twig.tokenize: ","Found token: ",found_token);if(found_token.position!==null){if(found_token.position>0){tokens.push({type:Twig.token.type.raw,value:template.substring(0,found_token.position)})}template=template.substr(found_token.position+found_token.def.open.length);error_offset+=found_token.position+found_token.def.open.length;end=Twig.token.findEnd(template,found_token.def,error_offset);Twig.log.trace("Twig.tokenize: ","Token ends at ",end);tokens.push({type:found_token.def.type,value:template.substring(0,end).trim()});if(template.substr(end+found_token.def.close.length,1)==="\n"){switch(found_token.def.type){case"logic_whitespace_pre":case"logic_whitespace_post":case"logic_whitespace_both":case"logic":end+=1;break}}template=template.substr(end+found_token.def.close.length);error_offset+=end+found_token.def.close.length}else{tokens.push({type:Twig.token.type.raw,value:template});template=""}}return tokens};Twig.compile=function(tokens){try{var output=[],stack=[],intermediate_output=[],token=null,logic_token=null,unclosed_token=null,prev_token=null,prev_output=null,prev_intermediate_output=null,prev_template=null,next_token=null,tok_output=null,type=null,open=null,next=null;var compile_output=function(token){Twig.expression.compile.apply(this,[token]);if(stack.length>0){intermediate_output.push(token)}else{output.push(token)}};var compile_logic=function(token){logic_token=Twig.logic.compile.apply(this,[token]);type=logic_token.type;open=Twig.logic.handler[type].open;next=Twig.logic.handler[type].next;Twig.log.trace("Twig.compile: ","Compiled logic token to ",logic_token," next is: ",next," open is : ",open);if(open!==undefined&&!open){prev_token=stack.pop();prev_template=Twig.logic.handler[prev_token.type];if(Twig.indexOf(prev_template.next,type)<0){throw new Error(type+" not expected after a "+prev_token.type)}prev_token.output=prev_token.output||[];prev_token.output=prev_token.output.concat(intermediate_output);intermediate_output=[];tok_output={type:Twig.token.type.logic,token:prev_token};if(stack.length>0){intermediate_output.push(tok_output)}else{output.push(tok_output)}}if(next!==undefined&&next.length>0){Twig.log.trace("Twig.compile: ","Pushing ",logic_token," to logic stack.");if(stack.length>0){prev_token=stack.pop();prev_token.output=prev_token.output||[];prev_token.output=prev_token.output.concat(intermediate_output);stack.push(prev_token);intermediate_output=[]}stack.push(logic_token)}else if(open!==undefined&&open){tok_output={type:Twig.token.type.logic,token:logic_token};if(stack.length>0){intermediate_output.push(tok_output)}else{output.push(tok_output)}}};while(tokens.length>0){token=tokens.shift();prev_output=output[output.length-1];prev_intermediate_output=intermediate_output[intermediate_output.length-1];next_token=tokens[0];Twig.log.trace("Compiling token ",token);switch(token.type){case Twig.token.type.raw:if(stack.length>0){intermediate_output.push(token)}else{output.push(token)}break;case Twig.token.type.logic:compile_logic.call(this,token);break;case Twig.token.type.comment:break;case Twig.token.type.output:compile_output.call(this,token);break;case Twig.token.type.logic_whitespace_pre:case Twig.token.type.logic_whitespace_post:case Twig.token.type.logic_whitespace_both:case Twig.token.type.output_whitespace_pre:case Twig.token.type.output_whitespace_post:case Twig.token.type.output_whitespace_both:if(token.type!==Twig.token.type.output_whitespace_post&&token.type!==Twig.token.type.logic_whitespace_post){if(prev_output){if(prev_output.type===Twig.token.type.raw){output.pop();if(prev_output.value.match(/^\s*$/)===null){prev_output.value=prev_output.value.trim();output.push(prev_output)}}}if(prev_intermediate_output){if(prev_intermediate_output.type===Twig.token.type.raw){intermediate_output.pop();if(prev_intermediate_output.value.match(/^\s*$/)===null){prev_intermediate_output.value=prev_intermediate_output.value.trim();intermediate_output.push(prev_intermediate_output)}}}}switch(token.type){case Twig.token.type.output_whitespace_pre:case Twig.token.type.output_whitespace_post:case Twig.token.type.output_whitespace_both:compile_output.call(this,token);break;case Twig.token.type.logic_whitespace_pre:case Twig.token.type.logic_whitespace_post:case Twig.token.type.logic_whitespace_both:compile_logic.call(this,token);break}if(token.type!==Twig.token.type.output_whitespace_pre&&token.type!==Twig.token.type.logic_whitespace_pre){if(next_token){if(next_token.type===Twig.token.type.raw){tokens.shift();if(next_token.value.match(/^\s*$/)===null){next_token.value=next_token.value.trim();tokens.unshift(next_token)}}}}break}Twig.log.trace("Twig.compile: "," Output: ",output," Logic Stack: ",stack," Pending Output: ",intermediate_output)}if(stack.length>0){unclosed_token=stack.pop();throw new Error("Unable to find an end tag for "+unclosed_token.type+", expecting one of "+unclosed_token.next)}return output}catch(ex){Twig.log.error("Error compiling twig template "+this.id+": ");if(ex.stack){Twig.log.error(ex.stack)}else{Twig.log.error(ex.toString())}if(this.options.rethrow)throw ex}};Twig.parse=function(tokens,context){try{var output=[],chain=true,that=this;Twig.forEach(tokens,function parseToken(token){Twig.log.debug("Twig.parse: ","Parsing token: ",token);switch(token.type){case Twig.token.type.raw:output.push(Twig.filters.raw(token.value));break;case Twig.token.type.logic:var logic_token=token.token,logic=Twig.logic.parse.apply(that,[logic_token,context,chain]);if(logic.chain!==undefined){chain=logic.chain}if(logic.context!==undefined){context=logic.context}if(logic.output!==undefined){output.push(logic.output)}break;case Twig.token.type.comment:break;case Twig.token.type.output_whitespace_pre:case Twig.token.type.output_whitespace_post:case Twig.token.type.output_whitespace_both:case Twig.token.type.output:Twig.log.debug("Twig.parse: ","Output token: ",token.stack);output.push(Twig.expression.parse.apply(that,[token.stack,context]));break}});return Twig.output.apply(this,[output])}catch(ex){Twig.log.error("Error parsing twig template "+this.id+": ");if(ex.stack){Twig.log.error(ex.stack)}else{Twig.log.error(ex.toString())}if(this.options.rethrow)throw ex;if(Twig.debug){return ex.toString()}}};Twig.prepare=function(data){var tokens,raw_tokens;Twig.log.debug("Twig.prepare: ","Tokenizing ",data);raw_tokens=Twig.tokenize.apply(this,[data]);Twig.log.debug("Twig.prepare: ","Compiling ",raw_tokens);tokens=Twig.compile.apply(this,[raw_tokens]);Twig.log.debug("Twig.prepare: ","Compiled ",tokens);return tokens};Twig.output=function(output){if(!this.options.autoescape){return output.join("")}var strategy="html";if(typeof this.options.autoescape=="string")strategy=this.options.autoescape;var escaped_output=[];Twig.forEach(output,function(str){if(str&&(str.twig_markup!==true&&str.twig_markup!=strategy)){str=Twig.filters.escape(str,[strategy])}escaped_output.push(str)});return Twig.Markup(escaped_output.join(""))};Twig.Templates={loaders:{},registry:{}};Twig.validateId=function(id){if(id==="prototype"){throw new Twig.Error(id+" is not a valid twig identifier")}else if(Twig.cache&&Twig.Templates.registry.hasOwnProperty(id)){throw new Twig.Error("There is already a template with the ID "+id)}return true};Twig.Templates.registerLoader=function(method_name,func,scope){if(typeof func!=="function"){throw new Twig.Error("Unable to add loader for "+method_name+": Invalid function reference given.")}if(scope){func=func.bind(scope)}this.loaders[method_name]=func};Twig.Templates.unRegisterLoader=function(method_name){if(this.isRegisteredLoader(method_name)){delete this.loaders[method_name]}};Twig.Templates.isRegisteredLoader=function(method_name){return this.loaders.hasOwnProperty(method_name)};Twig.Templates.save=function(template){if(template.id===undefined){throw new Twig.Error("Unable to save template with no id")}Twig.Templates.registry[template.id]=template};Twig.Templates.load=function(id){if(!Twig.Templates.registry.hasOwnProperty(id)){return null}return Twig.Templates.registry[id]};Twig.Templates.loadRemote=function(location,params,callback,error_callback){var loader;if(params.async===undefined){params.async=true}if(params.id===undefined){params.id=location}if(Twig.cache&&Twig.Templates.registry.hasOwnProperty(params.id)){if(typeof callback==="function"){callback(Twig.Templates.registry[params.id])}return Twig.Templates.registry[params.id]}loader=this.loaders[params.method]||this.loaders.fs;return loader.apply(null,arguments)};function is(type,obj){var clas=Object.prototype.toString.call(obj).slice(8,-1);return obj!==undefined&&obj!==null&&clas===type}Twig.Template=function(params){var data=params.data,id=params.id,blocks=params.blocks,macros=params.macros||{},base=params.base,path=params.path,url=params.url,name=params.name,method=params.method,options=params.options;this.id=id;this.method=method;this.base=base;this.path=path;this.url=url;this.name=name;this.macros=macros;this.options=options;this.reset(blocks);if(is("String",data)){this.tokens=Twig.prepare.apply(this,[data])}else{this.tokens=data}if(id!==undefined){Twig.Templates.save(this)}};Twig.Template.prototype.reset=function(blocks){Twig.log.debug("Twig.Template.reset","Reseting template "+this.id);this.blocks={};this.importedBlocks=[];this.originalBlockTokens={};this.child={blocks:blocks||{}};this.extend=null};Twig.Template.prototype.render=function(context,params){params=params||{};var output,url;this.context=context||{};this.reset();if(params.blocks){this.blocks=params.blocks}if(params.macros){this.macros=params.macros}output=Twig.parse.apply(this,[this.tokens,this.context]);if(this.extend){var ext_template;if(this.options.allowInlineIncludes){ext_template=Twig.Templates.load(this.extend);if(ext_template){ext_template.options=this.options}}if(!ext_template){url=parsePath(this,this.extend);ext_template=Twig.Templates.loadRemote(url,{method:this.getLoaderMethod(),base:this.base,async:false,id:url,options:this.options})}this.parent=ext_template;return this.parent.render(this.context,{blocks:this.blocks})}if(params.output=="blocks"){return this.blocks}else if(params.output=="macros"){return this.macros}else{return output}};Twig.Template.prototype.importFile=function(file){var url,sub_template;if(!this.url&&this.options.allowInlineIncludes){file=this.path?this.path+"/"+file:file;sub_template=Twig.Templates.load(file);if(!sub_template){sub_template=Twig.Templates.loadRemote(url,{id:file,method:this.getLoaderMethod(),async:false,options:this.options});if(!sub_template){throw new Twig.Error("Unable to find the template "+file)}}sub_template.options=this.options;return sub_template}url=parsePath(this,file);sub_template=Twig.Templates.loadRemote(url,{method:this.getLoaderMethod(),base:this.base,async:false,options:this.options,id:url});return sub_template};Twig.Template.prototype.importBlocks=function(file,override){var sub_template=this.importFile(file),context=this.context,that=this,key;override=override||false;sub_template.render(context);Twig.forEach(Object.keys(sub_template.blocks),function(key){if(override||that.blocks[key]===undefined){that.blocks[key]=sub_template.blocks[key];that.importedBlocks.push(key)}})};Twig.Template.prototype.importMacros=function(file){var url=parsePath(this,file);var remoteTemplate=Twig.Templates.loadRemote(url,{method:this.getLoaderMethod(),async:false,id:url});return remoteTemplate};Twig.Template.prototype.getLoaderMethod=function(){if(this.path){return"fs"}if(this.url){return"ajax"}return this.method||"fs"};Twig.Template.prototype.compile=function(options){return Twig.compiler.compile(this,options)};Twig.Markup=function(content,strategy){if(typeof strategy=="undefined"){strategy=true}if(typeof content==="string"&&content.length>0){content=new String(content);content.twig_markup=strategy}return content};function parsePath(template,file){var namespaces=null;if(typeof template==="object"&&typeof template.options==="object"){namespaces=template.options.namespaces}if(typeof namespaces==="object"&&file.indexOf("::")>0){for(var k in namespaces){if(namespaces.hasOwnProperty(k)){file=file.replace(k+"::",namespaces[k])}}return file}return relativePath(template,file)}function relativePath(template,file){var base,base_path,sep_chr="/",new_path=[],val;if(template.url){if(typeof template.base!=="undefined"){base=template.base+(template.base.charAt(template.base.length-1)==="/"?"":"/")}else{base=template.url}}else if(template.path){var path=__webpack_require__(15),sep=path.sep||sep_chr,relative=new RegExp("^\\.{1,2}"+sep.replace("\\","\\\\"));file=file.replace(/\//g,sep);if(template.base!==undefined&&file.match(relative)==null){file=file.replace(template.base,"");base=template.base+sep}else{base=path.normalize(template.path)}base=base.replace(sep+sep,sep);sep_chr=sep}else if((template.name||template.id)&&template.method&&template.method!=="fs"&&template.method!=="ajax"){base=template.base||template.name||template.id}else{throw new Twig.Error("Cannot extend an inline template.")}base_path=base.split(sep_chr);base_path.pop();base_path=base_path.concat(file.split(sep_chr));while(base_path.length>0){val=base_path.shift();if(val=="."){}else if(val==".."&&new_path.length>0&&new_path[new_path.length-1]!=".."){new_path.pop()}else{new_path.push(val)}}return new_path.join(sep_chr)}return Twig}(Twig||{});(function(Twig){"use strict";Twig.Templates.registerLoader("ajax",function(location,params,callback,error_callback){var template,xmlhttp,precompiled=params.precompiled;if(typeof XMLHttpRequest==="undefined"){throw new Twig.Error("Unsupported platform: Unable to do ajax requests "+'because there is no "XMLHTTPRequest" implementation')}xmlhttp=new XMLHttpRequest;xmlhttp.onreadystatechange=function(){var data=null;if(xmlhttp.readyState===4){if(xmlhttp.status===200||window.cordova&&xmlhttp.status==0){Twig.log.debug("Got template ",xmlhttp.responseText);if(precompiled===true){data=JSON.parse(xmlhttp.responseText)}else{data=xmlhttp.responseText}params.url=location;params.data=data;template=new Twig.Template(params);if(typeof callback==="function"){callback(template)}}else{if(typeof error_callback==="function"){error_callback(xmlhttp)}}}};xmlhttp.open("GET",location,!!params.async);xmlhttp.send();if(params.async){return true}else{return template}})})(Twig);(function(Twig){"use strict";var fs,path;try{fs=__webpack_require__(17);path=__webpack_require__(15)}catch(e){}Twig.Templates.registerLoader("fs",function(location,params,callback,error_callback){var template,data=null,precompiled=params.precompiled;if(!fs||!path){throw new Twig.Error("Unsupported platform: Unable to load from file "+'because there is no "fs" or "path" implementation')}var loadTemplateFn=function(err,data){if(err){if(typeof error_callback==="function"){error_callback(err)}return}if(precompiled===true){data=JSON.parse(data)}params.data=data;params.path=location;template=new Twig.Template(params);if(typeof callback==="function"){callback(template)}};if(params.async){fs.stat(location,function(err,stats){if(err||!stats.isFile()){throw new Twig.Error("Unable to find template file "+location)}fs.readFile(location,"utf8",loadTemplateFn)});return true}else{if(!fs.statSync(location).isFile()){throw new Twig.Error("Unable to find template file "+location)}data=fs.readFileSync(location,"utf8");loadTemplateFn(undefined,data);return template}})})(Twig);(function(){"use strict";if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}if(!Object.keys)Object.keys=function(o){if(o!==Object(o)){throw new TypeError("Object.keys called on non-object")}var ret=[],p;for(p in o)if(Object.prototype.hasOwnProperty.call(o,p))ret.push(p);return ret}})();var Twig=function(Twig){Twig.lib={};var sprintfLib=function(){var re={not_string:/[^s]/,number:/[diefg]/,json:/[j]/,not_json:/[^j]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[\+\-]/};function sprintf(){var key=arguments[0],cache=sprintf.cache;if(!(cache[key]&&cache.hasOwnProperty(key))){cache[key]=sprintf.parse(key)}return sprintf.format.call(null,cache[key],arguments)}sprintf.format=function(parse_tree,argv){var cursor=1,tree_length=parse_tree.length,node_type="",arg,output=[],i,k,match,pad,pad_character,pad_length,is_positive=true,sign="";for(i=0;i<tree_length;i++){node_type=get_type(parse_tree[i]);if(node_type==="string"){output[output.length]=parse_tree[i]}else if(node_type==="array"){match=parse_tree[i];if(match[2]){arg=argv[cursor];for(k=0;k<match[2].length;k++){if(!arg.hasOwnProperty(match[2][k])){throw new Error(sprintf("[sprintf] property '%s' does not exist",match[2][k]))}arg=arg[match[2][k]]}}else if(match[1]){arg=argv[match[1]]}else{arg=argv[cursor++]}if(get_type(arg)=="function"){arg=arg()}if(re.not_string.test(match[8])&&re.not_json.test(match[8])&&(get_type(arg)!="number"&&isNaN(arg))){throw new TypeError(sprintf("[sprintf] expecting number but found %s",get_type(arg)))}if(re.number.test(match[8])){is_positive=arg>=0}switch(match[8]){case"b":arg=arg.toString(2);break;case"c":arg=String.fromCharCode(arg);break;case"d":case"i":arg=parseInt(arg,10);break;case"j":arg=JSON.stringify(arg,null,match[6]?parseInt(match[6]):0);break;case"e":arg=match[7]?arg.toExponential(match[7]):arg.toExponential();break;case"f":arg=match[7]?parseFloat(arg).toFixed(match[7]):parseFloat(arg);break;case"g":arg=match[7]?parseFloat(arg).toPrecision(match[7]):parseFloat(arg);break;case"o":arg=arg.toString(8);break;case"s":arg=(arg=String(arg))&&match[7]?arg.substring(0,match[7]):arg;break;case"u":arg=arg>>>0;break;case"x":arg=arg.toString(16);break;case"X":arg=arg.toString(16).toUpperCase();break}if(re.json.test(match[8])){output[output.length]=arg}else{if(re.number.test(match[8])&&(!is_positive||match[3])){sign=is_positive?"+":"-";arg=arg.toString().replace(re.sign,"")}else{sign=""}pad_character=match[4]?match[4]==="0"?"0":match[4].charAt(1):" ";pad_length=match[6]-(sign+arg).length;pad=match[6]?pad_length>0?str_repeat(pad_character,pad_length):"":"";output[output.length]=match[5]?sign+arg+pad:pad_character==="0"?sign+pad+arg:pad+sign+arg}}}return output.join("")};sprintf.cache={};sprintf.parse=function(fmt){var _fmt=fmt,match=[],parse_tree=[],arg_names=0;while(_fmt){if((match=re.text.exec(_fmt))!==null){parse_tree[parse_tree.length]=match[0]}else if((match=re.modulo.exec(_fmt))!==null){parse_tree[parse_tree.length]="%"}else if((match=re.placeholder.exec(_fmt))!==null){if(match[2]){arg_names|=1;var field_list=[],replacement_field=match[2],field_match=[];if((field_match=re.key.exec(replacement_field))!==null){field_list[field_list.length]=field_match[1];while((replacement_field=replacement_field.substring(field_match[0].length))!==""){if((field_match=re.key_access.exec(replacement_field))!==null){field_list[field_list.length]=field_match[1]}else if((field_match=re.index_access.exec(replacement_field))!==null){field_list[field_list.length]=field_match[1]}else{throw new SyntaxError("[sprintf] failed to parse named argument key")}}}else{throw new SyntaxError("[sprintf] failed to parse named argument key")}match[2]=field_list}else{arg_names|=2}if(arg_names===3){throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")}parse_tree[parse_tree.length]=match}else{throw new SyntaxError("[sprintf] unexpected placeholder")}_fmt=_fmt.substring(match[0].length)}return parse_tree};var vsprintf=function(fmt,argv,_argv){_argv=(argv||[]).slice(0);_argv.splice(0,0,fmt);return sprintf.apply(null,_argv)};function get_type(variable){return Object.prototype.toString.call(variable).slice(8,-1).toLowerCase()}function str_repeat(input,multiplier){return Array(multiplier+1).join(input)}return{sprintf:sprintf,vsprintf:vsprintf}}();var sprintf=sprintfLib.sprintf;var vsprintf=sprintfLib.vsprintf;Twig.lib.sprintf=sprintf;Twig.lib.vsprintf=vsprintf;(function(){var shortDays="Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",");var fullDays="Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",");var shortMonths="Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");var fullMonths="January,February,March,April,May,June,July,August,September,October,November,December".split(",");function getOrdinalFor(intNum){return(intNum=Math.abs(intNum)%100)%10==1&&intNum!=11?"st":intNum%10==2&&intNum!=12?"nd":intNum%10==3&&intNum!=13?"rd":"th"}function getISO8601Year(aDate){var d=new Date(aDate.getFullYear()+1,0,4);if((d-aDate)/864e5<7&&(aDate.getDay()+6)%7<(d.getDay()+6)%7)return d.getFullYear();if(aDate.getMonth()>0||aDate.getDate()>=4)return aDate.getFullYear();return aDate.getFullYear()-((aDate.getDay()+6)%7-aDate.getDate()>2?1:0)}function getISO8601Week(aDate){var d=new Date(getISO8601Year(aDate),0,4);d.setDate(d.getDate()-(d.getDay()+6)%7);return parseInt((aDate-d)/6048e5)+1}Twig.lib.formatDate=function(date,format){if(typeof format!=="string"||/^\s*$/.test(format))return date+"";var jan1st=new Date(date.getFullYear(),0,1);var me=date;return format.replace(/[dDjlNSwzWFmMntLoYyaABgGhHisuU]/g,function(option){switch(option){case"d":return("0"+me.getDate()).replace(/^.+(..)$/,"$1");case"D":return shortDays[me.getDay()];case"j":return me.getDate();case"l":return fullDays[me.getDay()];case"N":return(me.getDay()+6)%7+1;case"S":return getOrdinalFor(me.getDate());case"w":return me.getDay();case"z":return Math.ceil((jan1st-me)/864e5);case"W":return("0"+getISO8601Week(me)).replace(/^.(..)$/,"$1");case"F":return fullMonths[me.getMonth()];case"m":return("0"+(me.getMonth()+1)).replace(/^.+(..)$/,"$1");case"M":return shortMonths[me.getMonth()];case"n":return me.getMonth()+1;case"t":return new Date(me.getFullYear(),me.getMonth()+1,-1).getDate();case"L":return new Date(me.getFullYear(),1,29).getDate()==29?1:0;case"o":return getISO8601Year(me);case"Y":return me.getFullYear();case"y":return(me.getFullYear()+"").replace(/^.+(..)$/,"$1");case"a":return me.getHours()<12?"am":"pm";case"A":return me.getHours()<12?"AM":"PM";case"B":return Math.floor(((me.getUTCHours()+1)%24+me.getUTCMinutes()/60+me.getUTCSeconds()/3600)*1e3/24);case"g":return me.getHours()%12!=0?me.getHours()%12:12;case"G":return me.getHours();case"h":return("0"+(me.getHours()%12!=0?me.getHours()%12:12)).replace(/^.+(..)$/,"$1");case"H":return("0"+me.getHours()).replace(/^.+(..)$/,"$1");case"i":return("0"+me.getMinutes()).replace(/^.+(..)$/,"$1");case"s":return("0"+me.getSeconds()).replace(/^.+(..)$/,"$1");case"u":return me.getMilliseconds();case"U":return me.getTime()/1e3}})}})();Twig.lib.strip_tags=function(input,allowed){allowed=(((allowed||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join("");var tags=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags=/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;return input.replace(commentsAndPhpTags,"").replace(tags,function($0,$1){return allowed.indexOf("<"+$1.toLowerCase()+">")>-1?$0:""})};Twig.lib.parseISO8601Date=function(s){var re=/(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?(Z|([+-])(\d\d):(\d\d))/;var d=[];d=s.match(re);if(!d){throw"Couldn't parse ISO 8601 date string '"+s+"'"}var a=[1,2,3,4,5,6,10,11];for(var i in a){d[a[i]]=parseInt(d[a[i]],10)}d[7]=parseFloat(d[7]);var ms=Date.UTC(d[1],d[2]-1,d[3],d[4],d[5],d[6]);if(d[7]>0){ms+=Math.round(d[7]*1e3)}if(d[8]!="Z"&&d[10]){var offset=d[10]*60*60*1e3;if(d[11]){offset+=d[11]*60*1e3}if(d[9]=="-"){ms-=offset}else{ms+=offset}}return new Date(ms)};Twig.lib.strtotime=function(text,now){var parsed,match,today,year,date,days,ranges,len,times,regex,i,fail=false;if(!text){return fail}text=text.replace(/^\s+|\s+$/g,"").replace(/\s{2,}/g," ").replace(/[\t\r\n]/g,"").toLowerCase();match=text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);if(match&&match[2]===match[4]){if(match[1]>1901){switch(match[2]){case"-":{if(match[3]>12||match[5]>31){return fail}return new Date(match[1],parseInt(match[3],10)-1,match[5],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1e3}case".":{return fail}case"/":{if(match[3]>12||match[5]>31){return fail}return new Date(match[1],parseInt(match[3],10)-1,match[5],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1e3}}}else if(match[5]>1901){switch(match[2]){case"-":{if(match[3]>12||match[1]>31){return fail}return new Date(match[5],parseInt(match[3],10)-1,match[1],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1e3}case".":{if(match[3]>12||match[1]>31){return fail}return new Date(match[5],parseInt(match[3],10)-1,match[1],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1e3}case"/":{if(match[1]>12||match[3]>31){return fail}return new Date(match[5],parseInt(match[1],10)-1,match[3],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1e3}}}else{switch(match[2]){case"-":{if(match[3]>12||match[5]>31||match[1]<70&&match[1]>38){return fail}year=match[1]>=0&&match[1]<=38?+match[1]+2e3:match[1];return new Date(year,parseInt(match[3],10)-1,match[5],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1e3}case".":{if(match[5]>=70){if(match[3]>12||match[1]>31){return fail}return new Date(match[5],parseInt(match[3],10)-1,match[1],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1e3}if(match[5]<60&&!match[6]){if(match[1]>23||match[3]>59){return fail}today=new Date;return new Date(today.getFullYear(),today.getMonth(),today.getDate(),match[1]||0,match[3]||0,match[5]||0,match[9]||0)/1e3}return fail}case"/":{if(match[1]>12||match[3]>31||match[5]<70&&match[5]>38){return fail}year=match[5]>=0&&match[5]<=38?+match[5]+2e3:match[5];return new Date(year,parseInt(match[1],10)-1,match[3],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1e3}case":":{if(match[1]>23||match[3]>59||match[5]>59){return fail}today=new Date;return new Date(today.getFullYear(),today.getMonth(),today.getDate(),match[1]||0,match[3]||0,match[5]||0)/1e3}}}}if(text==="now"){return now===null||isNaN(now)?(new Date).getTime()/1e3|0:now|0}if(!isNaN(parsed=Date.parse(text))){return parsed/1e3|0;
	}if(match=text.match(/^([0-9]{4}-[0-9]{2}-[0-9]{2})[ t]([0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?)([\+-][0-9]{2}(:[0-9]{2})?|z)/)){if(match[4]=="z"){match[4]="Z"}else if(match[4].match(/^([\+-][0-9]{2})$/)){match[4]=match[4]+":00"}if(!isNaN(parsed=Date.parse(match[1]+"T"+match[2]+match[4]))){return parsed/1e3|0}}date=now?new Date(now*1e3):new Date;days={sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};ranges={yea:"FullYear",mon:"Month",day:"Date",hou:"Hours",min:"Minutes",sec:"Seconds"};function lastNext(type,range,modifier){var diff,day=days[range];if(typeof day!=="undefined"){diff=day-date.getDay();if(diff===0){diff=7*modifier}else if(diff>0&&type==="last"){diff-=7}else if(diff<0&&type==="next"){diff+=7}date.setDate(date.getDate()+diff)}}function process(val){var splt=val.split(" "),type=splt[0],range=splt[1].substring(0,3),typeIsNumber=/\d+/.test(type),ago=splt[2]==="ago",num=(type==="last"?-1:1)*(ago?-1:1);if(typeIsNumber){num*=parseInt(type,10)}if(ranges.hasOwnProperty(range)&&!splt[1].match(/^mon(day|\.)?$/i)){return date["set"+ranges[range]](date["get"+ranges[range]]()+num)}if(range==="wee"){return date.setDate(date.getDate()+num*7)}if(type==="next"||type==="last"){lastNext(type,range,num)}else if(!typeIsNumber){return false}return true}times="(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec"+"|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?"+"|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)";regex="([+-]?\\d+\\s"+times+"|"+"(last|next)\\s"+times+")(\\sago)?";match=text.match(new RegExp(regex,"gi"));if(!match){return fail}for(i=0,len=match.length;i<len;i++){if(!process(match[i])){return fail}}return date.getTime()/1e3};Twig.lib.is=function(type,obj){var clas=Object.prototype.toString.call(obj).slice(8,-1);return obj!==undefined&&obj!==null&&clas===type};Twig.lib.copy=function(src){var target={},key;for(key in src)target[key]=src[key];return target};Twig.lib.replaceAll=function(string,search,replace){return string.split(search).join(replace)};Twig.lib.chunkArray=function(arr,size){var returnVal=[],x=0,len=arr.length;if(size<1||!Twig.lib.is("Array",arr)){return[]}while(x<len){returnVal.push(arr.slice(x,x+=size))}return returnVal};Twig.lib.round=function round(value,precision,mode){var m,f,isHalf,sgn;precision|=0;m=Math.pow(10,precision);value*=m;sgn=value>0|-(value<0);isHalf=value%1===.5*sgn;f=Math.floor(value);if(isHalf){switch(mode){case"PHP_ROUND_HALF_DOWN":value=f+(sgn<0);break;case"PHP_ROUND_HALF_EVEN":value=f+f%2*sgn;break;case"PHP_ROUND_HALF_ODD":value=f+!(f%2);break;default:value=f+(sgn>0)}}return(isHalf?value:Math.round(value))/m};Twig.lib.max=function max(){var ar,retVal,i=0,n=0,argv=arguments,argc=argv.length,_obj2Array=function(obj){if(Object.prototype.toString.call(obj)==="[object Array]"){return obj}else{var ar=[];for(var i in obj){if(obj.hasOwnProperty(i)){ar.push(obj[i])}}return ar}},_compare=function(current,next){var i=0,n=0,tmp=0,nl=0,cl=0;if(current===next){return 0}else if(typeof current==="object"){if(typeof next==="object"){current=_obj2Array(current);next=_obj2Array(next);cl=current.length;nl=next.length;if(nl>cl){return 1}else if(nl<cl){return-1}for(i=0,n=cl;i<n;++i){tmp=_compare(current[i],next[i]);if(tmp==1){return 1}else if(tmp==-1){return-1}}return 0}return-1}else if(typeof next==="object"){return 1}else if(isNaN(next)&&!isNaN(current)){if(current==0){return 0}return current<0?1:-1}else if(isNaN(current)&&!isNaN(next)){if(next==0){return 0}return next>0?1:-1}if(next==current){return 0}return next>current?1:-1};if(argc===0){throw new Error("At least one value should be passed to max()")}else if(argc===1){if(typeof argv[0]==="object"){ar=_obj2Array(argv[0])}else{throw new Error("Wrong parameter count for max()")}if(ar.length===0){throw new Error("Array must contain at least one element for max()")}}else{ar=argv}retVal=ar[0];for(i=1,n=ar.length;i<n;++i){if(_compare(retVal,ar[i])==1){retVal=ar[i]}}return retVal};Twig.lib.min=function min(){var ar,retVal,i=0,n=0,argv=arguments,argc=argv.length,_obj2Array=function(obj){if(Object.prototype.toString.call(obj)==="[object Array]"){return obj}var ar=[];for(var i in obj){if(obj.hasOwnProperty(i)){ar.push(obj[i])}}return ar},_compare=function(current,next){var i=0,n=0,tmp=0,nl=0,cl=0;if(current===next){return 0}else if(typeof current==="object"){if(typeof next==="object"){current=_obj2Array(current);next=_obj2Array(next);cl=current.length;nl=next.length;if(nl>cl){return 1}else if(nl<cl){return-1}for(i=0,n=cl;i<n;++i){tmp=_compare(current[i],next[i]);if(tmp==1){return 1}else if(tmp==-1){return-1}}return 0}return-1}else if(typeof next==="object"){return 1}else if(isNaN(next)&&!isNaN(current)){if(current==0){return 0}return current<0?1:-1}else if(isNaN(current)&&!isNaN(next)){if(next==0){return 0}return next>0?1:-1}if(next==current){return 0}return next>current?1:-1};if(argc===0){throw new Error("At least one value should be passed to min()")}else if(argc===1){if(typeof argv[0]==="object"){ar=_obj2Array(argv[0])}else{throw new Error("Wrong parameter count for min()")}if(ar.length===0){throw new Error("Array must contain at least one element for min()")}}else{ar=argv}retVal=ar[0];for(i=1,n=ar.length;i<n;++i){if(_compare(retVal,ar[i])==-1){retVal=ar[i]}}return retVal};return Twig}(Twig||{});var Twig=function(Twig){"use strict";Twig.logic={};Twig.logic.type={if_:"Twig.logic.type.if",endif:"Twig.logic.type.endif",for_:"Twig.logic.type.for",endfor:"Twig.logic.type.endfor",else_:"Twig.logic.type.else",elseif:"Twig.logic.type.elseif",set:"Twig.logic.type.set",setcapture:"Twig.logic.type.setcapture",endset:"Twig.logic.type.endset",filter:"Twig.logic.type.filter",endfilter:"Twig.logic.type.endfilter",shortblock:"Twig.logic.type.shortblock",block:"Twig.logic.type.block",endblock:"Twig.logic.type.endblock",extends_:"Twig.logic.type.extends",use:"Twig.logic.type.use",include:"Twig.logic.type.include",spaceless:"Twig.logic.type.spaceless",endspaceless:"Twig.logic.type.endspaceless",macro:"Twig.logic.type.macro",endmacro:"Twig.logic.type.endmacro",import_:"Twig.logic.type.import",from:"Twig.logic.type.from",embed:"Twig.logic.type.embed",endembed:"Twig.logic.type.endembed"};Twig.logic.definitions=[{type:Twig.logic.type.if_,regex:/^if\s+([\s\S]+)$/,next:[Twig.logic.type.else_,Twig.logic.type.elseif,Twig.logic.type.endif],open:true,compile:function(token){var expression=token.match[1];token.stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;delete token.match;return token},parse:function(token,context,chain){var output="",result=Twig.expression.parse.apply(this,[token.stack,context]);chain=true;if(result){chain=false;output=Twig.parse.apply(this,[token.output,context])}return{chain:chain,output:output}}},{type:Twig.logic.type.elseif,regex:/^elseif\s+([^\s].*)$/,next:[Twig.logic.type.else_,Twig.logic.type.elseif,Twig.logic.type.endif],open:false,compile:function(token){var expression=token.match[1];token.stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;delete token.match;return token},parse:function(token,context,chain){var output="";if(chain&&Twig.expression.parse.apply(this,[token.stack,context])===true){chain=false;output=Twig.parse.apply(this,[token.output,context])}return{chain:chain,output:output}}},{type:Twig.logic.type.else_,regex:/^else$/,next:[Twig.logic.type.endif,Twig.logic.type.endfor],open:false,parse:function(token,context,chain){var output="";if(chain){output=Twig.parse.apply(this,[token.output,context])}return{chain:chain,output:output}}},{type:Twig.logic.type.endif,regex:/^endif$/,next:[],open:false},{type:Twig.logic.type.for_,regex:/^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+([^\s].*?)(?:\s+if\s+([^\s].*))?$/,next:[Twig.logic.type.else_,Twig.logic.type.endfor],open:true,compile:function(token){var key_value=token.match[1],expression=token.match[2],conditional=token.match[3],kv_split=null;token.key_var=null;token.value_var=null;if(key_value.indexOf(",")>=0){kv_split=key_value.split(",");if(kv_split.length===2){token.key_var=kv_split[0].trim();token.value_var=kv_split[1].trim()}else{throw new Twig.Error("Invalid expression in for loop: "+key_value)}}else{token.value_var=key_value}token.expression=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;if(conditional){token.conditional=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:conditional}]).stack}delete token.match;return token},parse:function(token,context,continue_chain){var result=Twig.expression.parse.apply(this,[token.expression,context]),output=[],len,index=0,keyset,that=this,conditional=token.conditional,buildLoop=function(index,len){var isConditional=conditional!==undefined;return{index:index+1,index0:index,revindex:isConditional?undefined:len-index,revindex0:isConditional?undefined:len-index-1,first:index===0,last:isConditional?undefined:index===len-1,length:isConditional?undefined:len,parent:context}},loop=function(key,value){var inner_context=Twig.ChildContext(context);inner_context[token.value_var]=value;if(token.key_var){inner_context[token.key_var]=key}inner_context.loop=buildLoop(index,len);if(conditional===undefined||Twig.expression.parse.apply(that,[conditional,inner_context])){output.push(Twig.parse.apply(that,[token.output,inner_context]));index+=1}delete inner_context["loop"];delete inner_context[token.value_var];delete inner_context[token.key_var];Twig.merge(context,inner_context,true)};if(Twig.lib.is("Array",result)){len=result.length;Twig.forEach(result,function(value){var key=index;loop(key,value)})}else if(Twig.lib.is("Object",result)){if(result._keys!==undefined){keyset=result._keys}else{keyset=Object.keys(result)}len=keyset.length;Twig.forEach(keyset,function(key){if(key==="_keys")return;loop(key,result[key])})}continue_chain=output.length===0;return{chain:continue_chain,output:Twig.output.apply(this,[output])}}},{type:Twig.logic.type.endfor,regex:/^endfor$/,next:[],open:false},{type:Twig.logic.type.set,regex:/^set\s+([a-zA-Z0-9_,\s]+)\s*=\s*([\s\S]+)$/,next:[],open:true,compile:function(token){var key=token.match[1].trim(),expression=token.match[2],expression_stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;token.key=key;token.expression=expression_stack;delete token.match;return token},parse:function(token,context,continue_chain){var value=Twig.expression.parse.apply(this,[token.expression,context]),key=token.key;context[key]=value;return{chain:continue_chain,context:context}}},{type:Twig.logic.type.setcapture,regex:/^set\s+([a-zA-Z0-9_,\s]+)$/,next:[Twig.logic.type.endset],open:true,compile:function(token){var key=token.match[1].trim();token.key=key;delete token.match;return token},parse:function(token,context,continue_chain){var value=Twig.parse.apply(this,[token.output,context]),key=token.key;this.context[key]=value;context[key]=value;return{chain:continue_chain,context:context}}},{type:Twig.logic.type.endset,regex:/^endset$/,next:[],open:false},{type:Twig.logic.type.filter,regex:/^filter\s+(.+)$/,next:[Twig.logic.type.endfilter],open:true,compile:function(token){var expression="|"+token.match[1].trim();token.stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;delete token.match;return token},parse:function(token,context,chain){var unfiltered=Twig.parse.apply(this,[token.output,context]),stack=[{type:Twig.expression.type.string,value:unfiltered}].concat(token.stack);var output=Twig.expression.parse.apply(this,[stack,context]);return{chain:chain,output:output}}},{type:Twig.logic.type.endfilter,regex:/^endfilter$/,next:[],open:false},{type:Twig.logic.type.block,regex:/^block\s+([a-zA-Z0-9_]+)$/,next:[Twig.logic.type.endblock],open:true,compile:function(token){token.block=token.match[1].trim();delete token.match;return token},parse:function(token,context,chain){var block_output,output,isImported=this.importedBlocks.indexOf(token.block)>-1,hasParent=this.blocks[token.block]&&this.blocks[token.block].indexOf(Twig.placeholders.parent)>-1;if(this.blocks[token.block]===undefined||isImported||hasParent||context.loop||token.overwrite){if(token.expression){block_output=Twig.expression.parse.apply(this,[{type:Twig.expression.type.string,value:Twig.expression.parse.apply(this,[token.output,context])},context])}else{block_output=Twig.expression.parse.apply(this,[{type:Twig.expression.type.string,value:Twig.parse.apply(this,[token.output,context])},context])}if(isImported){this.importedBlocks.splice(this.importedBlocks.indexOf(token.block),1)}if(hasParent){this.blocks[token.block]=Twig.Markup(this.blocks[token.block].replace(Twig.placeholders.parent,block_output))}else{this.blocks[token.block]=block_output}this.originalBlockTokens[token.block]={type:token.type,block:token.block,output:token.output,overwrite:true}}if(this.child.blocks[token.block]){output=this.child.blocks[token.block]}else{output=this.blocks[token.block]}return{chain:chain,output:output}}},{type:Twig.logic.type.shortblock,regex:/^block\s+([a-zA-Z0-9_]+)\s+(.+)$/,next:[],open:true,compile:function(token){token.expression=token.match[2].trim();token.output=Twig.expression.compile({type:Twig.expression.type.expression,value:token.expression}).stack;token.block=token.match[1].trim();delete token.match;return token},parse:function(token,context,chain){return Twig.logic.handler[Twig.logic.type.block].parse.apply(this,arguments)}},{type:Twig.logic.type.endblock,regex:/^endblock(?:\s+([a-zA-Z0-9_]+))?$/,next:[],open:false},{type:Twig.logic.type.extends_,regex:/^extends\s+(.+)$/,next:[],open:true,compile:function(token){var expression=token.match[1].trim();delete token.match;token.stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;return token},parse:function(token,context,chain){var file=Twig.expression.parse.apply(this,[token.stack,context]);this.extend=file;return{chain:chain,output:""}}},{type:Twig.logic.type.use,regex:/^use\s+(.+)$/,next:[],open:true,compile:function(token){var expression=token.match[1].trim();delete token.match;token.stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;return token},parse:function(token,context,chain){var file=Twig.expression.parse.apply(this,[token.stack,context]);this.importBlocks(file);return{chain:chain,output:""}}},{type:Twig.logic.type.include,regex:/^include\s+(ignore missing\s+)?(.+?)\s*(?:with\s+([\S\s]+?))?\s*(only)?$/,next:[],open:true,compile:function(token){var match=token.match,includeMissing=match[1]!==undefined,expression=match[2].trim(),withContext=match[3],only=match[4]!==undefined&&match[4].length;delete token.match;token.only=only;token.includeMissing=includeMissing;token.stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;if(withContext!==undefined){token.withStack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:withContext.trim()}]).stack}return token},parse:function(token,context,chain){var innerContext={},withContext,i,template;if(!token.only){innerContext=Twig.ChildContext(context)}if(token.withStack!==undefined){withContext=Twig.expression.parse.apply(this,[token.withStack,context]);for(i in withContext){if(withContext.hasOwnProperty(i))innerContext[i]=withContext[i]}}var file=Twig.expression.parse.apply(this,[token.stack,innerContext]);if(file instanceof Twig.Template){template=file}else{template=this.importFile(file)}return{chain:chain,output:template.render(innerContext)}}},{type:Twig.logic.type.spaceless,regex:/^spaceless$/,next:[Twig.logic.type.endspaceless],open:true,parse:function(token,context,chain){var unfiltered=Twig.parse.apply(this,[token.output,context]),rBetweenTagSpaces=/>\s+</g,output=unfiltered.replace(rBetweenTagSpaces,"><").trim();return{chain:chain,output:output}}},{type:Twig.logic.type.endspaceless,regex:/^endspaceless$/,next:[],open:false},{type:Twig.logic.type.macro,regex:/^macro\s+([a-zA-Z0-9_]+)\s*\(\s*((?:[a-zA-Z0-9_]+(?:,\s*)?)*)\s*\)$/,next:[Twig.logic.type.endmacro],open:true,compile:function(token){var macroName=token.match[1],parameters=token.match[2].split(/[\s,]+/);for(var i=0;i<parameters.length;i++){for(var j=0;j<parameters.length;j++){if(parameters[i]===parameters[j]&&i!==j){throw new Twig.Error("Duplicate arguments for parameter: "+parameters[i])}}}token.macroName=macroName;token.parameters=parameters;delete token.match;return token},parse:function(token,context,chain){var template=this;this.macros[token.macroName]=function(){var macroContext={_self:template.macros};for(var i=0;i<token.parameters.length;i++){var prop=token.parameters[i];if(typeof arguments[i]!=="undefined"){macroContext[prop]=arguments[i]}else{macroContext[prop]=undefined}}return Twig.parse.apply(template,[token.output,macroContext])};return{chain:chain,output:""}}},{type:Twig.logic.type.endmacro,regex:/^endmacro$/,next:[],open:false},{type:Twig.logic.type.import_,regex:/^import\s+(.+)\s+as\s+([a-zA-Z0-9_]+)$/,next:[],open:true,compile:function(token){var expression=token.match[1].trim(),contextName=token.match[2].trim();delete token.match;token.expression=expression;token.contextName=contextName;token.stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;return token},parse:function(token,context,chain){if(token.expression!=="_self"){var file=Twig.expression.parse.apply(this,[token.stack,context]);var template=this.importFile(file||token.expression);context[token.contextName]=template.render({},{output:"macros"})}else{context[token.contextName]=this.macros}return{chain:chain,output:""}}},{type:Twig.logic.type.from,regex:/^from\s+(.+)\s+import\s+([a-zA-Z0-9_, ]+)$/,next:[],open:true,compile:function(token){var expression=token.match[1].trim(),macroExpressions=token.match[2].trim().split(/[ ,]+/),macroNames={};for(var i=0;i<macroExpressions.length;i++){var res=macroExpressions[i];var macroMatch=res.match(/^([a-zA-Z0-9_]+)\s+(.+)\s+as\s+([a-zA-Z0-9_]+)$/);if(macroMatch){macroNames[macroMatch[1].trim()]=macroMatch[2].trim()}else if(res.match(/^([a-zA-Z0-9_]+)$/)){macroNames[res]=res}else{}}delete token.match;token.expression=expression;token.macroNames=macroNames;token.stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;return token},parse:function(token,context,chain){var macros;if(token.expression!=="_self"){var file=Twig.expression.parse.apply(this,[token.stack,context]);var template=this.importFile(file||token.expression);macros=template.render({},{output:"macros"})}else{macros=this.macros}for(var macroName in token.macroNames){if(macros.hasOwnProperty(macroName)){context[token.macroNames[macroName]]=macros[macroName]}}return{chain:chain,output:""}}},{type:Twig.logic.type.embed,regex:/^embed\s+(ignore missing\s+)?(.+?)\s*(?:with\s+(.+?))?\s*(only)?$/,next:[Twig.logic.type.endembed],open:true,compile:function(token){var match=token.match,includeMissing=match[1]!==undefined,expression=match[2].trim(),withContext=match[3],only=match[4]!==undefined&&match[4].length;delete token.match;token.only=only;token.includeMissing=includeMissing;token.stack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:expression}]).stack;if(withContext!==undefined){token.withStack=Twig.expression.compile.apply(this,[{type:Twig.expression.type.expression,value:withContext.trim()}]).stack}return token},parse:function(token,context,chain){var innerContext={},withContext,i,template;if(!token.only){for(i in context){if(context.hasOwnProperty(i))innerContext[i]=context[i]}}if(token.withStack!==undefined){withContext=Twig.expression.parse.apply(this,[token.withStack,context]);for(i in withContext){if(withContext.hasOwnProperty(i))innerContext[i]=withContext[i]}}var file=Twig.expression.parse.apply(this,[token.stack,innerContext]);if(file instanceof Twig.Template){template=file}else{template=this.importFile(file)}this.blocks={};var output=Twig.parse.apply(this,[token.output,innerContext]);return{chain:chain,output:template.render(innerContext,{blocks:this.blocks})}}},{type:Twig.logic.type.endembed,regex:/^endembed$/,next:[],open:false}];Twig.logic.handler={};Twig.logic.extendType=function(type,value){value=value||"Twig.logic.type"+type;Twig.logic.type[type]=value};Twig.logic.extend=function(definition){if(!definition.type){throw new Twig.Error("Unable to extend logic definition. No type provided for "+definition)}else{Twig.logic.extendType(definition.type)}Twig.logic.handler[definition.type]=definition};while(Twig.logic.definitions.length>0){Twig.logic.extend(Twig.logic.definitions.shift())}Twig.logic.compile=function(raw_token){var expression=raw_token.value.trim(),token=Twig.logic.tokenize.apply(this,[expression]),token_template=Twig.logic.handler[token.type];if(token_template.compile){token=token_template.compile.apply(this,[token]);Twig.log.trace("Twig.logic.compile: ","Compiled logic token to ",token)}return token};Twig.logic.tokenize=function(expression){var token={},token_template_type=null,token_type=null,token_regex=null,regex_array=null,regex=null,match=null;expression=expression.trim();for(token_template_type in Twig.logic.handler){if(Twig.logic.handler.hasOwnProperty(token_template_type)){token_type=Twig.logic.handler[token_template_type].type;token_regex=Twig.logic.handler[token_template_type].regex;regex_array=[];if(token_regex instanceof Array){regex_array=token_regex}else{regex_array.push(token_regex)}while(regex_array.length>0){regex=regex_array.shift();match=regex.exec(expression.trim());if(match!==null){token.type=token_type;token.match=match;Twig.log.trace("Twig.logic.tokenize: ","Matched a ",token_type," regular expression of ",match);return token}}}}throw new Twig.Error("Unable to parse '"+expression.trim()+"'")};Twig.logic.parse=function(token,context,chain){var output="",token_template;context=context||{};Twig.log.debug("Twig.logic.parse: ","Parsing logic token ",token);token_template=Twig.logic.handler[token.type];if(token_template.parse){output=token_template.parse.apply(this,[token,context,chain])}return output};return Twig}(Twig||{});var Twig=function(Twig){"use strict";Twig.expression={};Twig.expression.reservedWords=["true","false","null","TRUE","FALSE","NULL","_context"];Twig.expression.type={comma:"Twig.expression.type.comma",operator:{unary:"Twig.expression.type.operator.unary",binary:"Twig.expression.type.operator.binary"},string:"Twig.expression.type.string",bool:"Twig.expression.type.bool",array:{start:"Twig.expression.type.array.start",end:"Twig.expression.type.array.end"},object:{start:"Twig.expression.type.object.start",end:"Twig.expression.type.object.end"},parameter:{start:"Twig.expression.type.parameter.start",end:"Twig.expression.type.parameter.end"},key:{period:"Twig.expression.type.key.period",brackets:"Twig.expression.type.key.brackets"},filter:"Twig.expression.type.filter",_function:"Twig.expression.type._function",variable:"Twig.expression.type.variable",number:"Twig.expression.type.number",_null:"Twig.expression.type.null",context:"Twig.expression.type.context",test:"Twig.expression.type.test"};Twig.expression.set={operations:[Twig.expression.type.filter,Twig.expression.type.operator.unary,Twig.expression.type.operator.binary,Twig.expression.type.array.end,Twig.expression.type.object.end,Twig.expression.type.parameter.end,Twig.expression.type.comma,Twig.expression.type.test],expressions:[Twig.expression.type._function,Twig.expression.type.bool,Twig.expression.type.string,Twig.expression.type.variable,Twig.expression.type.number,Twig.expression.type._null,Twig.expression.type.context,Twig.expression.type.parameter.start,Twig.expression.type.array.start,Twig.expression.type.object.start]};Twig.expression.set.operations_extended=Twig.expression.set.operations.concat([Twig.expression.type.key.period,Twig.expression.type.key.brackets]);Twig.expression.fn={compile:{push:function(token,stack,output){output.push(token)},push_both:function(token,stack,output){output.push(token);stack.push(token)}},parse:{push:function(token,stack,context){stack.push(token)},push_value:function(token,stack,context){stack.push(token.value)}}};Twig.expression.definitions=[{type:Twig.expression.type.test,regex:/^is\s+(not)?\s*([a-zA-Z_][a-zA-Z0-9_]*)/,next:Twig.expression.set.operations.concat([Twig.expression.type.parameter.start]),compile:function(token,stack,output){token.filter=token.match[2];token.modifier=token.match[1];delete token.match;delete token.value;output.push(token)},parse:function(token,stack,context){var value=stack.pop(),params=token.params&&Twig.expression.parse.apply(this,[token.params,context]),result=Twig.test(token.filter,value,params);if(token.modifier=="not"){stack.push(!result)}else{stack.push(result)}}},{type:Twig.expression.type.comma,regex:/^,/,next:Twig.expression.set.expressions.concat([Twig.expression.type.array.end,Twig.expression.type.object.end]),compile:function(token,stack,output){var i=stack.length-1,stack_token;delete token.match;delete token.value;for(;i>=0;i--){stack_token=stack.pop();if(stack_token.type===Twig.expression.type.object.start||stack_token.type===Twig.expression.type.parameter.start||stack_token.type===Twig.expression.type.array.start){stack.push(stack_token);break}output.push(stack_token)}output.push(token)}},{type:Twig.expression.type.operator.binary,regex:/(^[\+\-~%\?\:]|^[!=]==?|^[!<>]=?|^\*\*?|^\/\/?|^and\s+|^or\s+|^in\s+|^not in\s+|^\.\.)/,next:Twig.expression.set.expressions.concat([Twig.expression.type.operator.unary]),compile:function(token,stack,output){delete token.match;token.value=token.value.trim();var value=token.value,operator=Twig.expression.operator.lookup(value,token);Twig.log.trace("Twig.expression.compile: ","Operator: ",operator," from ",value);while(stack.length>0&&(stack[stack.length-1].type==Twig.expression.type.operator.unary||stack[stack.length-1].type==Twig.expression.type.operator.binary)&&(operator.associativity===Twig.expression.operator.leftToRight&&operator.precidence>=stack[stack.length-1].precidence||operator.associativity===Twig.expression.operator.rightToLeft&&operator.precidence>stack[stack.length-1].precidence)){var temp=stack.pop();output.push(temp)}if(value===":"){if(stack[stack.length-1]&&stack[stack.length-1].value==="?"){}else{var key_token=output.pop();if(key_token.type===Twig.expression.type.string||key_token.type===Twig.expression.type.variable){token.key=key_token.value}else if(key_token.type===Twig.expression.type.number){token.key=key_token.value.toString()}else if(key_token.type===Twig.expression.type.parameter.end&&key_token.expression){token.params=key_token.params}else{throw new Twig.Error("Unexpected value before ':' of "+key_token.type+" = "+key_token.value)}output.push(token);return}}else{stack.push(operator)}},parse:function(token,stack,context){if(token.key){stack.push(token)}else if(token.params){token.key=Twig.expression.parse.apply(this,[token.params,context]);stack.push(token);delete token.params}else{Twig.expression.operator.parse(token.value,stack)}}},{type:Twig.expression.type.operator.unary,regex:/(^not\s+)/,next:Twig.expression.set.expressions,compile:function(token,stack,output){delete token.match;token.value=token.value.trim();var value=token.value,operator=Twig.expression.operator.lookup(value,token);Twig.log.trace("Twig.expression.compile: ","Operator: ",operator," from ",value);while(stack.length>0&&(stack[stack.length-1].type==Twig.expression.type.operator.unary||stack[stack.length-1].type==Twig.expression.type.operator.binary)&&(operator.associativity===Twig.expression.operator.leftToRight&&operator.precidence>=stack[stack.length-1].precidence||operator.associativity===Twig.expression.operator.rightToLeft&&operator.precidence>stack[stack.length-1].precidence)){var temp=stack.pop();output.push(temp)}stack.push(operator)},parse:function(token,stack,context){Twig.expression.operator.parse(token.value,stack)}},{type:Twig.expression.type.string,regex:/^(["'])(?:(?=(\\?))\2[\s\S])*?\1/,next:Twig.expression.set.operations,compile:function(token,stack,output){var value=token.value;delete token.match;if(value.substring(0,1)==='"'){value=value.replace('\\"','"')}else{value=value.replace("\\'","'")}token.value=value.substring(1,value.length-1).replace(/\\n/g,"\n").replace(/\\r/g,"\r");Twig.log.trace("Twig.expression.compile: ","String value: ",token.value);output.push(token)},parse:Twig.expression.fn.parse.push_value},{type:Twig.expression.type.parameter.start,regex:/^\(/,next:Twig.expression.set.expressions.concat([Twig.expression.type.parameter.end]),compile:Twig.expression.fn.compile.push_both,parse:Twig.expression.fn.parse.push},{type:Twig.expression.type.parameter.end,regex:/^\)/,next:Twig.expression.set.operations_extended,compile:function(token,stack,output){var stack_token,end_token=token;stack_token=stack.pop();while(stack.length>0&&stack_token.type!=Twig.expression.type.parameter.start){output.push(stack_token);stack_token=stack.pop()}var param_stack=[];while(token.type!==Twig.expression.type.parameter.start){param_stack.unshift(token);token=output.pop()}param_stack.unshift(token);var is_expression=false;token=output[output.length-1];if(token===undefined||token.type!==Twig.expression.type._function&&token.type!==Twig.expression.type.filter&&token.type!==Twig.expression.type.test&&token.type!==Twig.expression.type.key.brackets&&token.type!==Twig.expression.type.key.period){end_token.expression=true;param_stack.pop();param_stack.shift();end_token.params=param_stack;output.push(end_token)}else{end_token.expression=false;token.params=param_stack}},parse:function(token,stack,context){var new_array=[],array_ended=false,value=null;if(token.expression){value=Twig.expression.parse.apply(this,[token.params,context]);stack.push(value)}else{while(stack.length>0){value=stack.pop();if(value&&value.type&&value.type==Twig.expression.type.parameter.start){array_ended=true;break}new_array.unshift(value)}if(!array_ended){throw new Twig.Error("Expected end of parameter set.")}stack.push(new_array)}}},{type:Twig.expression.type.array.start,regex:/^\[/,next:Twig.expression.set.expressions.concat([Twig.expression.type.array.end]),compile:Twig.expression.fn.compile.push_both,parse:Twig.expression.fn.parse.push},{type:Twig.expression.type.array.end,regex:/^\]/,next:Twig.expression.set.operations_extended,compile:function(token,stack,output){var i=stack.length-1,stack_token;for(;i>=0;i--){stack_token=stack.pop();if(stack_token.type===Twig.expression.type.array.start){break}output.push(stack_token)}output.push(token)},parse:function(token,stack,context){var new_array=[],array_ended=false,value=null;while(stack.length>0){value=stack.pop();if(value.type&&value.type==Twig.expression.type.array.start){array_ended=true;break}new_array.unshift(value)}if(!array_ended){throw new Twig.Error("Expected end of array.")}stack.push(new_array)}},{type:Twig.expression.type.object.start,regex:/^\{/,next:Twig.expression.set.expressions.concat([Twig.expression.type.object.end]),compile:Twig.expression.fn.compile.push_both,parse:Twig.expression.fn.parse.push},{type:Twig.expression.type.object.end,regex:/^\}/,next:Twig.expression.set.operations_extended,compile:function(token,stack,output){var i=stack.length-1,stack_token;for(;i>=0;i--){stack_token=stack.pop();if(stack_token&&stack_token.type===Twig.expression.type.object.start){break}output.push(stack_token)}output.push(token)},parse:function(end_token,stack,context){var new_object={},object_ended=false,token=null,token_key=null,has_value=false,value=null;while(stack.length>0){token=stack.pop();if(token&&token.type&&token.type===Twig.expression.type.object.start){object_ended=true;break}if(token&&token.type&&(token.type===Twig.expression.type.operator.binary||token.type===Twig.expression.type.operator.unary)&&token.key){if(!has_value){throw new Twig.Error("Missing value for key '"+token.key+"' in object definition.");
	}new_object[token.key]=value;if(new_object._keys===undefined)new_object._keys=[];new_object._keys.unshift(token.key);value=null;has_value=false}else{has_value=true;value=token}}if(!object_ended){throw new Twig.Error("Unexpected end of object.")}stack.push(new_object)}},{type:Twig.expression.type.filter,regex:/^\|\s?([a-zA-Z_][a-zA-Z0-9_\-]*)/,next:Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]),compile:function(token,stack,output){token.value=token.match[1];output.push(token)},parse:function(token,stack,context){var input=stack.pop(),params=token.params&&Twig.expression.parse.apply(this,[token.params,context]);stack.push(Twig.filter.apply(this,[token.value,input,params]))}},{type:Twig.expression.type._function,regex:/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/,next:Twig.expression.type.parameter.start,transform:function(match,tokens){return"("},compile:function(token,stack,output){var fn=token.match[1];token.fn=fn;delete token.match;delete token.value;output.push(token)},parse:function(token,stack,context){var params=token.params&&Twig.expression.parse.apply(this,[token.params,context]),fn=token.fn,value;if(Twig.functions[fn]){value=Twig.functions[fn].apply(this,params)}else if(typeof context[fn]=="function"){value=context[fn].apply(context,params)}else{throw new Twig.Error(fn+" function does not exist and is not defined in the context")}stack.push(value)}},{type:Twig.expression.type.variable,regex:/^[a-zA-Z_][a-zA-Z0-9_]*/,next:Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]),compile:Twig.expression.fn.compile.push,validate:function(match,tokens){return Twig.indexOf(Twig.expression.reservedWords,match[0])<0},parse:function(token,stack,context){var value=Twig.expression.resolve(context[token.value],context);stack.push(value)}},{type:Twig.expression.type.key.period,regex:/^\.([a-zA-Z0-9_]+)/,next:Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]),compile:function(token,stack,output){token.key=token.match[1];delete token.match;delete token.value;output.push(token)},parse:function(token,stack,context){var params=token.params&&Twig.expression.parse.apply(this,[token.params,context]),key=token.key,object=stack.pop(),value;if(object===null||object===undefined){if(this.options.strict_variables){throw new Twig.Error("Can't access a key "+key+" on an null or undefined object.")}else{return null}}var capitalize=function(value){return value.substr(0,1).toUpperCase()+value.substr(1)};if(typeof object==="object"&&key in object){value=object[key]}else if(object["get"+capitalize(key)]!==undefined){value=object["get"+capitalize(key)]}else if(object["is"+capitalize(key)]!==undefined){value=object["is"+capitalize(key)]}else{value=null}stack.push(Twig.expression.resolve(value,object,params))}},{type:Twig.expression.type.key.brackets,regex:/^\[([^\]]*)\]/,next:Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]),compile:function(token,stack,output){var match=token.match[1];delete token.value;delete token.match;token.stack=Twig.expression.compile({value:match}).stack;output.push(token)},parse:function(token,stack,context){var params=token.params&&Twig.expression.parse.apply(this,[token.params,context]),key=Twig.expression.parse.apply(this,[token.stack,context]),object=stack.pop(),value;if(object===null||object===undefined){if(this.options.strict_variables){throw new Twig.Error("Can't access a key "+key+" on an null or undefined object.")}else{return null}}if(typeof object==="object"&&key in object){value=object[key]}else{value=null}stack.push(Twig.expression.resolve(value,object,params))}},{type:Twig.expression.type._null,regex:/^(null|NULL|none|NONE)/,next:Twig.expression.set.operations,compile:function(token,stack,output){delete token.match;token.value=null;output.push(token)},parse:Twig.expression.fn.parse.push_value},{type:Twig.expression.type.context,regex:/^_context/,next:Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]),compile:Twig.expression.fn.compile.push,parse:function(token,stack,context){stack.push(context)}},{type:Twig.expression.type.number,regex:/^\-?\d+(\.\d+)?/,next:Twig.expression.set.operations,compile:function(token,stack,output){token.value=Number(token.value);output.push(token)},parse:Twig.expression.fn.parse.push_value},{type:Twig.expression.type.bool,regex:/^(true|TRUE|false|FALSE)/,next:Twig.expression.set.operations,compile:function(token,stack,output){token.value=token.match[0].toLowerCase()==="true";delete token.match;output.push(token)},parse:Twig.expression.fn.parse.push_value}];Twig.expression.resolve=function(value,context,params){if(typeof value=="function"){return value.apply(context,params||[])}else{return value}};Twig.expression.handler={};Twig.expression.extendType=function(type){Twig.expression.type[type]="Twig.expression.type."+type};Twig.expression.extend=function(definition){if(!definition.type){throw new Twig.Error("Unable to extend logic definition. No type provided for "+definition)}Twig.expression.handler[definition.type]=definition};while(Twig.expression.definitions.length>0){Twig.expression.extend(Twig.expression.definitions.shift())}Twig.expression.tokenize=function(expression){var tokens=[],exp_offset=0,next=null,type,regex,regex_array,token_next,match_found,invalid_matches=[],match_function;match_function=function(){var match=Array.prototype.slice.apply(arguments),string=match.pop(),offset=match.pop();Twig.log.trace("Twig.expression.tokenize","Matched a ",type," regular expression of ",match);if(next&&Twig.indexOf(next,type)<0){invalid_matches.push(type+" cannot follow a "+tokens[tokens.length-1].type+" at template:"+exp_offset+" near '"+match[0].substring(0,20)+"...'");return match[0]}if(Twig.expression.handler[type].validate&&!Twig.expression.handler[type].validate(match,tokens)){return match[0]}invalid_matches=[];tokens.push({type:type,value:match[0],match:match});match_found=true;next=token_next;exp_offset+=match[0].length;if(Twig.expression.handler[type].transform){return Twig.expression.handler[type].transform(match,tokens)}return""};Twig.log.debug("Twig.expression.tokenize","Tokenizing expression ",expression);while(expression.length>0){expression=expression.trim();for(type in Twig.expression.handler){if(Twig.expression.handler.hasOwnProperty(type)){token_next=Twig.expression.handler[type].next;regex=Twig.expression.handler[type].regex;if(regex instanceof Array){regex_array=regex}else{regex_array=[regex]}match_found=false;while(regex_array.length>0){regex=regex_array.pop();expression=expression.replace(regex,match_function)}if(match_found){break}}}if(!match_found){if(invalid_matches.length>0){throw new Twig.Error(invalid_matches.join(" OR "))}else{throw new Twig.Error("Unable to parse '"+expression+"' at template position"+exp_offset)}}}Twig.log.trace("Twig.expression.tokenize","Tokenized to ",tokens);return tokens};Twig.expression.compile=function(raw_token){var expression=raw_token.value,tokens=Twig.expression.tokenize(expression),token=null,output=[],stack=[],token_template=null;Twig.log.trace("Twig.expression.compile: ","Compiling ",expression);while(tokens.length>0){token=tokens.shift();token_template=Twig.expression.handler[token.type];Twig.log.trace("Twig.expression.compile: ","Compiling ",token);token_template.compile&&token_template.compile(token,stack,output);Twig.log.trace("Twig.expression.compile: ","Stack is",stack);Twig.log.trace("Twig.expression.compile: ","Output is",output)}while(stack.length>0){output.push(stack.pop())}Twig.log.trace("Twig.expression.compile: ","Final output is",output);raw_token.stack=output;delete raw_token.value;return raw_token};Twig.expression.parse=function(tokens,context){var that=this;if(!(tokens instanceof Array)){tokens=[tokens]}var stack=[],token_template=null;Twig.forEach(tokens,function(token){token_template=Twig.expression.handler[token.type];token_template.parse&&token_template.parse.apply(that,[token,stack,context])});return stack.pop()};return Twig}(Twig||{});var Twig=function(Twig){"use strict";Twig.expression.operator={leftToRight:"leftToRight",rightToLeft:"rightToLeft"};var containment=function(a,b){if(b.indexOf!==undefined){return a===b||a!==""&&b.indexOf(a)>-1}else{var el;for(el in b){if(b.hasOwnProperty(el)&&b[el]===a){return true}}return false}};Twig.expression.operator.lookup=function(operator,token){switch(operator){case"..":case"not in":case"in":token.precidence=20;token.associativity=Twig.expression.operator.leftToRight;break;case",":token.precidence=18;token.associativity=Twig.expression.operator.leftToRight;break;case"?":case":":token.precidence=16;token.associativity=Twig.expression.operator.rightToLeft;break;case"or":token.precidence=14;token.associativity=Twig.expression.operator.leftToRight;break;case"and":token.precidence=13;token.associativity=Twig.expression.operator.leftToRight;break;case"==":case"!=":token.precidence=9;token.associativity=Twig.expression.operator.leftToRight;break;case"<":case"<=":case">":case">=":token.precidence=8;token.associativity=Twig.expression.operator.leftToRight;break;case"~":case"+":case"-":token.precidence=6;token.associativity=Twig.expression.operator.leftToRight;break;case"//":case"**":case"*":case"/":case"%":token.precidence=5;token.associativity=Twig.expression.operator.leftToRight;break;case"not":token.precidence=3;token.associativity=Twig.expression.operator.rightToLeft;break;default:throw new Twig.Error(operator+" is an unknown operator.")}token.operator=operator;return token};Twig.expression.operator.parse=function(operator,stack){Twig.log.trace("Twig.expression.operator.parse: ","Handling ",operator);var a,b,c;switch(operator){case":":break;case"?":c=stack.pop();b=stack.pop();a=stack.pop();if(a){stack.push(b)}else{stack.push(c)}break;case"+":b=parseFloat(stack.pop());a=parseFloat(stack.pop());stack.push(a+b);break;case"-":b=parseFloat(stack.pop());a=parseFloat(stack.pop());stack.push(a-b);break;case"*":b=parseFloat(stack.pop());a=parseFloat(stack.pop());stack.push(a*b);break;case"/":b=parseFloat(stack.pop());a=parseFloat(stack.pop());stack.push(a/b);break;case"//":b=parseFloat(stack.pop());a=parseFloat(stack.pop());stack.push(parseInt(a/b));break;case"%":b=parseFloat(stack.pop());a=parseFloat(stack.pop());stack.push(a%b);break;case"~":b=stack.pop();a=stack.pop();stack.push((a!=null?a.toString():"")+(b!=null?b.toString():""));break;case"not":case"!":stack.push(!stack.pop());break;case"<":b=stack.pop();a=stack.pop();stack.push(a<b);break;case"<=":b=stack.pop();a=stack.pop();stack.push(a<=b);break;case">":b=stack.pop();a=stack.pop();stack.push(a>b);break;case">=":b=stack.pop();a=stack.pop();stack.push(a>=b);break;case"===":b=stack.pop();a=stack.pop();stack.push(a===b);break;case"==":b=stack.pop();a=stack.pop();stack.push(a==b);break;case"!==":b=stack.pop();a=stack.pop();stack.push(a!==b);break;case"!=":b=stack.pop();a=stack.pop();stack.push(a!=b);break;case"or":b=stack.pop();a=stack.pop();stack.push(a||b);break;case"and":b=stack.pop();a=stack.pop();stack.push(a&&b);break;case"**":b=stack.pop();a=stack.pop();stack.push(Math.pow(a,b));break;case"not in":b=stack.pop();a=stack.pop();stack.push(!containment(a,b));break;case"in":b=stack.pop();a=stack.pop();stack.push(containment(a,b));break;case"..":b=stack.pop();a=stack.pop();stack.push(Twig.functions.range(a,b));break;default:throw new Twig.Error(operator+" is an unknown operator.")}};return Twig}(Twig||{});var Twig=function(Twig){function is(type,obj){var clas=Object.prototype.toString.call(obj).slice(8,-1);return obj!==undefined&&obj!==null&&clas===type}Twig.filters={upper:function(value){if(typeof value!=="string"){return value}return value.toUpperCase()},lower:function(value){if(typeof value!=="string"){return value}return value.toLowerCase()},capitalize:function(value){if(typeof value!=="string"){return value}return value.substr(0,1).toUpperCase()+value.toLowerCase().substr(1)},title:function(value){if(typeof value!=="string"){return value}return value.toLowerCase().replace(/(^|\s)([a-z])/g,function(m,p1,p2){return p1+p2.toUpperCase()})},length:function(value){if(Twig.lib.is("Array",value)||typeof value==="string"){return value.length}else if(Twig.lib.is("Object",value)){if(value._keys===undefined){return Object.keys(value).length}else{return value._keys.length}}else{return 0}},reverse:function(value){if(is("Array",value)){return value.reverse()}else if(is("String",value)){return value.split("").reverse().join("")}else if(is("Object",value)){var keys=value._keys||Object.keys(value).reverse();value._keys=keys;return value}},sort:function(value){if(is("Array",value)){return value.sort()}else if(is("Object",value)){delete value._keys;var keys=Object.keys(value),sorted_keys=keys.sort(function(a,b){var a1,a2;if(value[a]>value[b]==!(value[a]<=value[b])){return value[a]>value[b]?1:value[a]<value[b]?-1:0}else if(!isNaN(a1=parseFloat(value[a]))&&!isNaN(b1=parseFloat(value[b]))){return a1>b1?1:a1<b1?-1:0}else if(typeof value[a]=="string"){return value[a]>value[b].toString()?1:value[a]<value[b].toString()?-1:0}else if(typeof value[b]=="string"){return value[a].toString()>value[b]?1:value[a].toString()<value[b]?-1:0}else{return null}});value._keys=sorted_keys;return value}},keys:function(value){if(value===undefined||value===null){return}var keyset=value._keys||Object.keys(value),output=[];Twig.forEach(keyset,function(key){if(key==="_keys")return;if(value.hasOwnProperty(key)){output.push(key)}});return output},url_encode:function(value){if(value===undefined||value===null){return}var result=encodeURIComponent(value);result=result.replace("'","%27");return result},join:function(value,params){if(value===undefined||value===null){return}var join_str="",output=[],keyset=null;if(params&&params[0]){join_str=params[0]}if(is("Array",value)){output=value}else{keyset=value._keys||Object.keys(value);Twig.forEach(keyset,function(key){if(key==="_keys")return;if(value.hasOwnProperty(key)){output.push(value[key])}})}return output.join(join_str)},"default":function(value,params){if(params!==undefined&&params.length>1){throw new Twig.Error("default filter expects one argument")}if(value===undefined||value===null||value===""){if(params===undefined){return""}return params[0]}else{return value}},json_encode:function(value){if(value===undefined||value===null){return"null"}else if(typeof value=="object"&&is("Array",value)){output=[];Twig.forEach(value,function(v){output.push(Twig.filters.json_encode(v))});return"["+output.join(",")+"]"}else if(typeof value=="object"){var keyset=value._keys||Object.keys(value),output=[];Twig.forEach(keyset,function(key){output.push(JSON.stringify(key)+":"+Twig.filters.json_encode(value[key]))});return"{"+output.join(",")+"}"}else{return JSON.stringify(value)}},merge:function(value,params){var obj=[],arr_index=0,keyset=[];if(!is("Array",value)){obj={}}else{Twig.forEach(params,function(param){if(!is("Array",param)){obj={}}})}if(!is("Array",obj)){obj._keys=[]}if(is("Array",value)){Twig.forEach(value,function(val){if(obj._keys)obj._keys.push(arr_index);obj[arr_index]=val;arr_index++})}else{keyset=value._keys||Object.keys(value);Twig.forEach(keyset,function(key){obj[key]=value[key];obj._keys.push(key);var int_key=parseInt(key,10);if(!isNaN(int_key)&&int_key>=arr_index){arr_index=int_key+1}})}Twig.forEach(params,function(param){if(is("Array",param)){Twig.forEach(param,function(val){if(obj._keys)obj._keys.push(arr_index);obj[arr_index]=val;arr_index++})}else{keyset=param._keys||Object.keys(param);Twig.forEach(keyset,function(key){if(!obj[key])obj._keys.push(key);obj[key]=param[key];var int_key=parseInt(key,10);if(!isNaN(int_key)&&int_key>=arr_index){arr_index=int_key+1}})}});if(params.length===0){throw new Twig.Error("Filter merge expects at least one parameter")}return obj},date:function(value,params){var date=Twig.functions.date(value);var format=params&&params.length?params[0]:"F j, Y H:i";return Twig.lib.formatDate(date,format)},date_modify:function(value,params){if(value===undefined||value===null){return}if(params===undefined||params.length!==1){throw new Twig.Error("date_modify filter expects 1 argument")}var modifyText=params[0],time;if(Twig.lib.is("Date",value)){time=Twig.lib.strtotime(modifyText,value.getTime()/1e3)}if(Twig.lib.is("String",value)){time=Twig.lib.strtotime(modifyText,Twig.lib.strtotime(value))}if(Twig.lib.is("Number",value)){time=Twig.lib.strtotime(modifyText,value)}return new Date(time*1e3)},replace:function(value,params){if(value===undefined||value===null){return}var pairs=params[0],tag;for(tag in pairs){if(pairs.hasOwnProperty(tag)&&tag!=="_keys"){value=Twig.lib.replaceAll(value,tag,pairs[tag])}}return value},format:function(value,params){if(value===undefined||value===null){return}return Twig.lib.vsprintf(value,params)},striptags:function(value){if(value===undefined||value===null){return}return Twig.lib.strip_tags(value)},escape:function(value,params){if(value===undefined||value===null){return}var strategy="html";if(params&&params.length&&params[0]!==true)strategy=params[0];if(strategy=="html"){var raw_value=value.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");return Twig.Markup(raw_value,"html")}else if(strategy=="js"){var raw_value=value.toString();var result="";for(var i=0;i<raw_value.length;i++){if(raw_value[i].match(/^[a-zA-Z0-9,\._]$/))result+=raw_value[i];else{var char_code=raw_value.charCodeAt(i);if(char_code<128)result+="\\x"+char_code.toString(16).toUpperCase();else result+=Twig.lib.sprintf("\\u%04s",char_code.toString(16).toUpperCase())}}return Twig.Markup(result,"js")}else if(strategy=="css"){var raw_value=value.toString();var result="";for(var i=0;i<raw_value.length;i++){if(raw_value[i].match(/^[a-zA-Z0-9]$/))result+=raw_value[i];else{var char_code=raw_value.charCodeAt(i);result+="\\"+char_code.toString(16).toUpperCase()+" "}}return Twig.Markup(result,"css")}else if(strategy=="url"){var result=Twig.filters.url_encode(value);return Twig.Markup(result,"url")}else if(strategy=="html_attr"){var raw_value=value.toString();var result="";for(var i=0;i<raw_value.length;i++){if(raw_value[i].match(/^[a-zA-Z0-9,\.\-_]$/))result+=raw_value[i];else if(raw_value[i].match(/^[&<>"]$/))result+=raw_value[i].replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");else{var char_code=raw_value.charCodeAt(i);if(char_code<=31&&char_code!=9&&char_code!=10&&char_code!=13)result+="&#xFFFD;";else if(char_code<128)result+=Twig.lib.sprintf("&#x%02s;",char_code.toString(16).toUpperCase());else result+=Twig.lib.sprintf("&#x%04s;",char_code.toString(16).toUpperCase())}}return Twig.Markup(result,"html_attr")}else{throw new Twig.Error("escape strategy unsupported")}},e:function(value,params){return Twig.filters.escape(value,params)},nl2br:function(value){if(value===undefined||value===null){return}var linebreak_tag="BACKSLASH_n_replace",br="<br />"+linebreak_tag;value=Twig.filters.escape(value).replace(/\r\n/g,br).replace(/\r/g,br).replace(/\n/g,br);value=Twig.lib.replaceAll(value,linebreak_tag,"\n");return Twig.Markup(value)},number_format:function(value,params){var number=value,decimals=params&&params[0]?params[0]:undefined,dec=params&&params[1]!==undefined?params[1]:".",sep=params&&params[2]!==undefined?params[2]:",";number=(number+"").replace(/[^0-9+\-Ee.]/g,"");var n=!isFinite(+number)?0:+number,prec=!isFinite(+decimals)?0:Math.abs(decimals),s="",toFixedFix=function(n,prec){var k=Math.pow(10,prec);return""+Math.round(n*k)/k};s=(prec?toFixedFix(n,prec):""+Math.round(n)).split(".");if(s[0].length>3){s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep)}if((s[1]||"").length<prec){s[1]=s[1]||"";s[1]+=new Array(prec-s[1].length+1).join("0")}return s.join(dec)},trim:function(value,params){if(value===undefined||value===null){return}var str=Twig.filters.escape(""+value),whitespace;if(params&&params[0]){whitespace=""+params[0]}else{whitespace=" \n\r	\f            ​\u2028\u2029　"}for(var i=0;i<str.length;i++){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(i);break}}for(i=str.length-1;i>=0;i--){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(0,i+1);break}}return whitespace.indexOf(str.charAt(0))===-1?str:""},truncate:function(value,params){var length=30,preserve=false,separator="...";value=value+"";if(params){if(params[0]){length=params[0]}if(params[1]){preserve=params[1]}if(params[2]){separator=params[2]}}if(value.length>length){if(preserve){length=value.indexOf(" ",length);if(length===-1){return value}}value=value.substr(0,length)+separator}return value},slice:function(value,params){if(value===undefined||value===null){return}if(params===undefined||params.length<1){throw new Twig.Error("slice filter expects at least 1 argument")}var start=params[0]||0;var length=params.length>1?params[1]:value.length;var startIndex=start>=0?start:Math.max(value.length+start,0);if(Twig.lib.is("Array",value)){var output=[];for(var i=startIndex;i<startIndex+length&&i<value.length;i++){output.push(value[i])}return output}else if(Twig.lib.is("String",value)){return value.substr(startIndex,length)}else{throw new Twig.Error("slice filter expects value to be an array or string")}},abs:function(value){if(value===undefined||value===null){return}return Math.abs(value)},first:function(value){if(is("Array",value)){return value[0]}else if(is("Object",value)){if("_keys"in value){return value[value._keys[0]]}}else if(typeof value==="string"){return value.substr(0,1)}return},split:function(value,params){if(value===undefined||value===null){return}if(params===undefined||params.length<1||params.length>2){throw new Twig.Error("split filter expects 1 or 2 argument")}if(Twig.lib.is("String",value)){var delimiter=params[0],limit=params[1],split=value.split(delimiter);if(limit===undefined){return split}else if(limit<0){return value.split(delimiter,split.length+limit)}else{var limitedSplit=[];if(delimiter==""){while(split.length>0){var temp="";for(var i=0;i<limit&&split.length>0;i++){temp+=split.shift()}limitedSplit.push(temp)}}else{for(var i=0;i<limit-1&&split.length>0;i++){limitedSplit.push(split.shift())}if(split.length>0){limitedSplit.push(split.join(delimiter))}}return limitedSplit}}else{throw new Twig.Error("split filter expects value to be a string")}},last:function(value){if(Twig.lib.is("Object",value)){var keys;if(value._keys===undefined){keys=Object.keys(value)}else{keys=value._keys}return value[keys[keys.length-1]]}return value[value.length-1]},raw:function(value){return Twig.Markup(value)},batch:function(items,params){var size=params.shift(),fill=params.shift(),result,last,missing;if(!Twig.lib.is("Array",items)){throw new Twig.Error("batch filter expects items to be an array")}if(!Twig.lib.is("Number",size)){throw new Twig.Error("batch filter expects size to be a number")}size=Math.ceil(size);result=Twig.lib.chunkArray(items,size);if(fill&&items.length%size!=0){last=result.pop();missing=size-last.length;while(missing--){last.push(fill)}result.push(last)}return result},round:function(value,params){params=params||[];var precision=params.length>0?params[0]:0,method=params.length>1?params[1]:"common";value=parseFloat(value);if(precision&&!Twig.lib.is("Number",precision)){throw new Twig.Error("round filter expects precision to be a number")}if(method==="common"){return Twig.lib.round(value,precision)}if(!Twig.lib.is("Function",Math[method])){throw new Twig.Error("round filter expects method to be 'floor', 'ceil', or 'common'")}return Math[method](value*Math.pow(10,precision))/Math.pow(10,precision)}};Twig.filter=function(filter,value,params){if(!Twig.filters[filter]){throw"Unable to find filter "+filter}return Twig.filters[filter].apply(this,[value,params])};Twig.filter.extend=function(filter,definition){Twig.filters[filter]=definition};return Twig}(Twig||{});var Twig=function(Twig){function is(type,obj){var clas=Object.prototype.toString.call(obj).slice(8,-1);return obj!==undefined&&obj!==null&&clas===type}Twig.functions={range:function(low,high,step){var matrix=[];var inival,endval,plus;var walker=step||1;var chars=false;if(!isNaN(low)&&!isNaN(high)){inival=parseInt(low,10);endval=parseInt(high,10)}else if(isNaN(low)&&isNaN(high)){chars=true;inival=low.charCodeAt(0);endval=high.charCodeAt(0)}else{inival=isNaN(low)?0:low;endval=isNaN(high)?0:high}plus=inival>endval?false:true;if(plus){while(inival<=endval){matrix.push(chars?String.fromCharCode(inival):inival);inival+=walker}}else{while(inival>=endval){matrix.push(chars?String.fromCharCode(inival):inival);inival-=walker}}return matrix},cycle:function(arr,i){var pos=i%arr.length;return arr[pos]},dump:function(){var EOL="\n",indentChar="  ",indentTimes=0,out="",args=Array.prototype.slice.call(arguments),indent=function(times){var ind="";while(times>0){times--;ind+=indentChar}return ind},displayVar=function(variable){out+=indent(indentTimes);if(typeof variable==="object"){dumpVar(variable)}else if(typeof variable==="function"){out+="function()"+EOL}else if(typeof variable==="string"){out+="string("+variable.length+') "'+variable+'"'+EOL}else if(typeof variable==="number"){out+="number("+variable+")"+EOL}else if(typeof variable==="boolean"){out+="bool("+variable+")"+EOL}},dumpVar=function(variable){var i;if(variable===null){out+="NULL"+EOL}else if(variable===undefined){out+="undefined"+EOL}else if(typeof variable==="object"){out+=indent(indentTimes)+typeof variable;indentTimes++;out+="("+function(obj){var size=0,key;for(key in obj){if(obj.hasOwnProperty(key)){size++}}return size}(variable)+") {"+EOL;for(i in variable){out+=indent(indentTimes)+"["+i+"]=> "+EOL;displayVar(variable[i])}indentTimes--;out+=indent(indentTimes)+"}"+EOL}else{displayVar(variable)}};if(args.length==0)args.push(this.context);Twig.forEach(args,function(variable){dumpVar(variable)});return out},date:function(date,time){var dateObj;if(date===undefined){dateObj=new Date}else if(Twig.lib.is("Date",date)){dateObj=date}else if(Twig.lib.is("String",date)){if(date.match(/^[0-9]+$/)){dateObj=new Date(date*1e3)}else{dateObj=new Date(Twig.lib.strtotime(date)*1e3)}}else if(Twig.lib.is("Number",date)){dateObj=new Date(date*1e3)}else{throw new Twig.Error("Unable to parse date "+date)}return dateObj},block:function(block){if(this.originalBlockTokens[block]){return Twig.logic.parse.apply(this,[this.originalBlockTokens[block],this.context]).output}else{return this.blocks[block]}},parent:function(){return Twig.placeholders.parent},attribute:function(object,method,params){if(Twig.lib.is("Object",object)){if(object.hasOwnProperty(method)){if(typeof object[method]==="function"){return object[method].apply(undefined,params)}else{return object[method]}}}return object[method]||undefined},max:function(values){if(Twig.lib.is("Object",values)){delete values["_keys"];return Twig.lib.max(values)}return Twig.lib.max.apply(null,arguments)},min:function(values){if(Twig.lib.is("Object",values)){delete values["_keys"];return Twig.lib.min(values)}return Twig.lib.min.apply(null,arguments)},template_from_string:function(template){if(template===undefined){template=""}return new Twig.Template({options:this.options,data:template})},random:function(value){var LIMIT_INT31=2147483648;function getRandomNumber(n){var random=Math.floor(Math.random()*LIMIT_INT31);var limits=[0,n];var min=Math.min.apply(null,limits),max=Math.max.apply(null,limits);return min+Math.floor((max-min+1)*random/LIMIT_INT31)}if(Twig.lib.is("Number",value)){return getRandomNumber(value)}if(Twig.lib.is("String",value)){return value.charAt(getRandomNumber(value.length-1))}if(Twig.lib.is("Array",value)){return value[getRandomNumber(value.length-1)]}if(Twig.lib.is("Object",value)){var keys=Object.keys(value);return value[keys[getRandomNumber(keys.length-1)]]}return getRandomNumber(LIMIT_INT31-1)}};Twig._function=function(_function,value,params){if(!Twig.functions[_function]){throw"Unable to find function "+_function}return Twig.functions[_function](value,params)};Twig._function.extend=function(_function,definition){Twig.functions[_function]=definition};return Twig}(Twig||{});var Twig=function(Twig){"use strict";Twig.tests={empty:function(value){if(value===null||value===undefined)return true;if(typeof value==="number")return false;if(value.length&&value.length>0)return false;for(var key in value){if(value.hasOwnProperty(key))return false}return true},odd:function(value){return value%2===1},even:function(value){return value%2===0},divisibleby:function(value,params){return value%params[0]===0},defined:function(value){return value!==undefined},none:function(value){return value===null},"null":function(value){return this.none(value)},sameas:function(value,params){return value===params[0]},iterable:function(value){return value&&(Twig.lib.is("Array",value)||Twig.lib.is("Object",value))}};Twig.test=function(test,value,params){if(!Twig.tests[test]){throw"Test "+test+" is not defined."}return Twig.tests[test](value,params)};Twig.test.extend=function(test,definition){Twig.tests[test]=definition};return Twig}(Twig||{});var Twig=function(Twig){"use strict";Twig.exports={VERSION:Twig.VERSION};Twig.exports.twig=function twig(params){"use strict";var id=params.id,options={strict_variables:params.strict_variables||false,autoescape:params.autoescape!=null&&params.autoescape||false,allowInlineIncludes:params.allowInlineIncludes||false,rethrow:params.rethrow||false,namespaces:params.namespaces};if(Twig.cache&&id){Twig.validateId(id)}if(params.debug!==undefined){Twig.debug=params.debug}if(params.trace!==undefined){Twig.trace=params.trace}if(params.data!==undefined){return new Twig.Template({data:params.data,path:params.hasOwnProperty("path")?params.path:undefined,module:params.module,id:id,options:options})}else if(params.ref!==undefined){if(params.id!==undefined){throw new Twig.Error("Both ref and id cannot be set on a twig.js template.")}return Twig.Templates.load(params.ref)}else if(params.method!==undefined){if(!Twig.Templates.isRegisteredLoader(params.method)){throw new Twig.Error('Loader for "'+params.method+'" is not defined.')}return Twig.Templates.loadRemote(params.name||params.href||params.path||id||undefined,{id:id,method:params.method,base:params.base,module:params.module,precompiled:params.precompiled,async:params.async,options:options},params.load,params.error)}else if(params.href!==undefined){return Twig.Templates.loadRemote(params.href,{id:id,method:"ajax",base:params.base,module:params.module,precompiled:params.precompiled,async:params.async,options:options},params.load,params.error)}else if(params.path!==undefined){return Twig.Templates.loadRemote(params.path,{id:id,method:"fs",base:params.base,module:params.module,precompiled:params.precompiled,async:params.async,options:options},params.load,params.error)}};Twig.exports.extendFilter=function(filter,definition){Twig.filter.extend(filter,definition)};Twig.exports.extendFunction=function(fn,definition){Twig._function.extend(fn,definition)};Twig.exports.extendTest=function(test,definition){Twig.test.extend(test,definition)};Twig.exports.extendTag=function(definition){Twig.logic.extend(definition)};Twig.exports.extend=function(fn){fn(Twig)};Twig.exports.compile=function(markup,options){var id=options.filename,path=options.filename,template;template=new Twig.Template({data:markup,path:path,id:id,options:options.settings["twig options"]});return function(context){return template.render(context)}};Twig.exports.renderFile=function(path,options,fn){if(typeof options==="function"){fn=options;options={}}options=options||{};var settings=options.settings||{};var params={path:path,base:settings.views,load:function(template){fn(null,template.render(options))}};var view_options=settings["twig options"];if(view_options){for(var option in view_options){if(view_options.hasOwnProperty(option)){params[option]=view_options[option]}}}Twig.exports.twig(params)};Twig.exports.__express=Twig.exports.renderFile;Twig.exports.cache=function(cache){Twig.cache=cache};return Twig}(Twig||{});
	var Twig=function(Twig){Twig.compiler={module:{}};Twig.compiler.compile=function(template,options){var tokens=JSON.stringify(template.tokens),id=template.id,output;if(options.module){if(Twig.compiler.module[options.module]===undefined){throw new Twig.Error("Unable to find module type "+options.module)}output=Twig.compiler.module[options.module](id,tokens,options.twig)}else{output=Twig.compiler.wrap(id,tokens)}return output};Twig.compiler.module={amd:function(id,tokens,pathToTwig){return'define(["'+pathToTwig+'"], function (Twig) {\n	var twig, templates;\ntwig = Twig.twig;\ntemplates = '+Twig.compiler.wrap(id,tokens)+"\n	return templates;\n});"},node:function(id,tokens){return'var twig = require("twig").twig;\n'+"exports.template = "+Twig.compiler.wrap(id,tokens)},cjs2:function(id,tokens,pathToTwig){return'module.declare([{ twig: "'+pathToTwig+'" }], function (require, exports, module) {\n'+'	var twig = require("twig").twig;\n'+"	exports.template = "+Twig.compiler.wrap(id,tokens)+"\n});"}};Twig.compiler.wrap=function(id,tokens){return'twig({id:"'+id.replace('"','\\"')+'", data:'+tokens+", precompiled: true});\n"};return Twig}(Twig||{});if(typeof module!=="undefined"&&module.declare){module.declare([],function(require,exports,module){for(key in Twig.exports){if(Twig.exports.hasOwnProperty(key)){exports[key]=Twig.exports[key]}}})}else if(true){!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return Twig.exports}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}else if(typeof module!=="undefined"&&module.exports){module.exports=Twig.exports}else{window.twig=Twig.exports.twig;window.Twig=Twig.exports}
	//# sourceMappingURL=twig.min.js.map
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 17 */
/***/ function(module, exports) {



/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _twig = __webpack_require__(13);
	
	var _twig2 = _interopRequireDefault(_twig);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _namespace = __webpack_require__(6);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_twig2.default.extendFilter('t', function (label, placeholders) {
		return _craft2.default.t(label, placeholders);
	});
	
	_twig2.default.extendFilter('ns', function (value) {
		var type = arguments.length <= 1 || arguments[1] === undefined ? 'field' : arguments[1];
	
		switch (type) {
			case 'input':
			case 'field':
				return _namespace2.default.fieldName(value);
			case 'id':
				return _namespace2.default.value(value, '-');
			case 'js':
				return _namespace2.default.value(value, '.');
		}
	
		return _namespace2.default.value(value, '-');
	});
	
	var id = 0;
	_twig2.default.extendFunction('uniqueId', function () {
		return 'uid' + id++;
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _namespace = __webpack_require__(6);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		namespace: [],
		html: '',
		layout: [],
		blockId: null,
		blockName: ''
	};
	
	exports.default = _garnish2.default.Base.extend({
	
		_templateNs: [],
		_blockName: '',
	
		init: function init() {
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._templateNs = _namespace2.default.parse(settings.namespace);
	
			this.setBlockName(settings.blockName);
	
			this.$container = (0, _jquery2.default)(settings.html);
			this.$container.removeAttr('id');
	
			_namespace2.default.enter(this._templateNs);
	
			this._fld = new _craft2.default.FieldLayoutDesigner(this.$container, {
				customizableTabs: true,
				fieldInputName: _namespace2.default.fieldName('fieldLayout[__TAB_NAME__][]'),
				requiredFieldInputName: _namespace2.default.fieldName('requiredFields[]')
			});
	
			_namespace2.default.leave();
	
			this.$instructions = this.$container.find('.instructions');
	
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = settings.layout[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var tab = _step.value;
	
					var $tab = this.addTab(tab.name);
	
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = tab.fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var field = _step2.value;
	
							this.addFieldToTab($tab, field.id, field.required == 1);
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			this._updateInstructions();
		},
		getBlockName: function getBlockName() {
			return this._blockName;
		},
		setBlockName: function setBlockName(name) {
			this._blockName = name;
	
			this._updateInstructions();
		},
	
	
		/**
	  * @see Craft.FieldLayoutDesigner.addTab
	  */
		addTab: function addTab() {
			var name = arguments.length <= 0 || arguments[0] === undefined ? 'Tab' + (this._fld.tabGrid.$items.length + 1) : arguments[0];
	
			var fld = this._fld;
			var $tab = (0, _jquery2.default)('\n\t\t\t<div class="fld-tab">\n\t\t\t\t<div class="tabs">\n\t\t\t\t\t<div class="tab sel draggable">\n\t\t\t\t\t\t<span>' + name + '</span>\n\t\t\t\t\t\t<a class="settings icon" title="' + _craft2.default.t('Rename') + '"></a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="fld-tabcontent"></div>\n\t\t\t</div>\n\t\t').appendTo(fld.$tabContainer);
	
			fld.tabGrid.addItems($tab);
			fld.tabDrag.addItems($tab);
	
			// In order for tabs to be added to the FLD, the FLD must be visible in the DOM.
			// To ensure this, the FLD is momentarily placed in the root body element, then after the tab has been added,
			// it is placed back in the same position it was.
	
			var $containerNext = this.$container.next();
			var $containerParent = this.$container.parent();
	
			this.$container.appendTo(document.body);
	
			fld.initTab($tab);
	
			if ($containerNext.length > 0) {
				$containerNext.before(this.$container);
			} else {
				$containerParent.append(this.$container);
			}
	
			return $tab;
		},
	
	
		/**
	  * @see Craft.FieldLayoutDesigner.FieldDrag.onDragStop
	  */
		addFieldToTab: function addFieldToTab($tab, fieldId) {
			var required = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
			required = !!required;
	
			var $unusedField = this._fld.$allFields.filter('[data-id="' + fieldId + '"]');
			var $unusedGroup = $unusedField.closest('.fld-tab');
			var $field = $unusedField.clone().removeClass('unused');
			var $fieldContainer = $tab.find('.fld-tabcontent');
	
			$unusedField.addClass('hidden');
			if ($unusedField.siblings(':not(.hidden)').length === 0) {
				$unusedGroup.addClass('hidden');
				this._fld.unusedFieldGrid.removeItems($unusedGroup);
			}
	
			var $fieldInput = $field.find('.id-input');
			if ($fieldInput.length === 0) {
				var tabName = $tab.find('.tab > span').text();
				var inputName = this._fld.getFieldInputName(tabName);
	
				$fieldInput = (0, _jquery2.default)('<input class="id-input" type="hidden" name="' + inputName + '" value="' + fieldId + '">');
				$field.append($fieldInput);
			}
	
			$field.prepend('<a class="settings icon" title="' + _craft2.default.t('Edit') + '"></a>');
			$fieldContainer.append($field);
			this._fld.initField($field);
			this._fld.fieldDrag.addItems($field);
	
			this.toggleFieldRequire(fieldId, required);
		},
		toggleFieldRequire: function toggleFieldRequire(fieldId) {
			var required = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
			var $field = this._fld.$tabContainer.find('[data-id="' + fieldId + '"]');
			var isRequired = $field.hasClass('fld-required');
	
			if (required === null || required !== isRequired) {
				var $editButton = $field.find('.settings');
				var menuButton = $editButton.data('menubtn');
				var menu = menuButton.menu;
				var $options = menu.$options;
				var $requiredOption = $options.filter('.toggle-required');
	
				this._fld.toggleRequiredField($field, $requiredOption);
			}
		},
		_updateInstructions: function _updateInstructions() {
			if (this.$instructions) {
				this.$instructions.html(_craft2.default.t("For block type {blockType}", { blockType: this.getBlockName() || '&hellip;' }));
			}
		}
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var twig = __webpack_require__(13).twig,
	    template = twig({id:"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\configurator\\templates\\blocktype.twig", data:[{"type":"logic","token":{"type":"Twig.logic.type.set","key":"id","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"getId","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"name","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"getName","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"errors","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"getErrors","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\r\n<div class=\"nc_sidebar_list_item "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"errors","match":["errors"]},{"type":"Twig.expression.type.test","filter":"empty","modifier":"not"},{"type":"Twig.expression.type.string","value":"has-errors"},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]},{"type":"raw","value":"\">\r\n\t<div class=\"label\" data-neo-bt=\"text.name\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"name","match":["name"]},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</div>\r\n\t<a class=\"move icon\" title=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Reorder"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"\" role=\"button\" data-neo-bt=\"button.move\"></a>\r\n</div>\r\n"}], allowInlineIncludes: true});
	
	module.exports = function(context) { return template.render(context); }

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _namespace = __webpack_require__(6);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	var _Item = __webpack_require__(8);
	
	var _Item2 = _interopRequireDefault(_Item);
	
	var _GroupSettings = __webpack_require__(22);
	
	var _GroupSettings2 = _interopRequireDefault(_GroupSettings);
	
	var _group = __webpack_require__(24);
	
	var _group2 = _interopRequireDefault(_group);
	
	__webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		namespace: []
	};
	
	exports.default = _Item2.default.extend({
	
		_templateNs: [],
	
		init: function init() {
			var _this = this;
	
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			this.base(settings);
	
			settings = Object.assign({}, _defaults, settings);
	
			var settingsObj = this.getSettings();
			this._templateNs = _namespace2.default.parse(settings.namespace);
	
			_namespace2.default.enter(this._templateNs);
	
			this.$container = (0, _jquery2.default)((0, _group2.default)({
				settings: settingsObj
			}));
	
			_namespace2.default.leave();
	
			var $neo = this.$container.find('[data-neo-g]');
			this.$nameText = $neo.filter('[data-neo-g="text.name"]');
			this.$moveButton = $neo.filter('[data-neo-g="button.move"]');
	
			if (settingsObj) {
				settingsObj.on('change', function () {
					return _this._updateTemplate();
				});
				settingsObj.on('destroy', function () {
					return _this.trigger('destroy');
				});
			}
	
			this.deselect();
		},
	
	
		toggleSelect: function toggleSelect(select) {
			this.base(select);
	
			var settings = this.getSettings();
			var selected = this.isSelected();
	
			if (settings) {
				settings.$container.toggleClass('hidden', !selected);
			}
	
			this.$container.toggleClass('is-selected', selected);
		},
	
		_updateTemplate: function _updateTemplate() {
			var settings = this.getSettings();
	
			if (settings) {
				this.$nameText.text(settings.getName());
			}
		}
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _namespace = __webpack_require__(6);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	var _Settings = __webpack_require__(10);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _group_settings = __webpack_require__(23);
	
	var _group_settings2 = _interopRequireDefault(_group_settings);
	
	__webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		namespace: [],
		sortOrder: 0,
		name: ''
	};
	
	exports.default = _Settings2.default.extend({
	
		_templateNs: [],
	
		$sortOrderInput: new _jquery2.default(),
		$nameInput: new _jquery2.default(),
		$handleInput: new _jquery2.default(),
		$maxBlocksInput: new _jquery2.default(),
	
		init: function init() {
			var _this = this;
	
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._templateNs = _namespace2.default.parse(settings.namespace);
	
			this.setSortOrder(settings.sortOrder);
			this.setName(settings.name);
	
			_namespace2.default.enter(this._templateNs);
	
			this.$container = (0, _jquery2.default)((0, _group_settings2.default)({
				sortOrder: this.getSortOrder(),
				name: this.getName()
			}));
	
			_namespace2.default.leave();
	
			var $neo = this.$container.find('[data-neo-gs]');
			this.$sortOrderInput = $neo.filter('[data-neo-gs="input.sortOrder"]');
			this.$nameInput = $neo.filter('[data-neo-gs="input.name"]');
			this.$deleteButton = $neo.filter('[data-neo-gs="button.delete"]');
	
			this.addListener(this.$nameInput, 'keyup change', function () {
				return _this.setName(_this.$nameInput.val());
			});
			this.addListener(this.$deleteButton, 'click', function () {
				return _this.destroy();
			});
		},
		getFocusInput: function getFocusInput() {
			return this.$nameInput;
		},
		setSortOrder: function setSortOrder(sortOrder) {
			this.base(sortOrder);
	
			this.$sortOrderInput.val(this.getSortOrder());
		},
		getName: function getName() {
			return this._name;
		},
		setName: function setName(name) {
			var oldName = this._name;
			this._name = name;
	
			this.$nameInput.val(this._name);
	
			this.trigger('change', {
				property: 'name',
				oldValue: oldName,
				newValue: this._name
			});
		}
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	
	var twig = __webpack_require__(13).twig,
	    template = twig({id:"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\configurator\\templates\\group_settings.twig", data:[{"type":"logic","token":{"type":"Twig.logic.type.import","expression":"'../../macros.twig'","contextName":"macros","stack":[{"type":"Twig.expression.type.string","value":"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\macros.twig"}]}},{"type":"raw","value":"\r\n\r\n<div>\r\n\t<input type=\"hidden\" name=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"sortOrder"},{"type":"Twig.expression.type.filter","value":"ns","match":["|ns","ns"]},{"type":"Twig.expression.type.string","value":"[]"},{"type":"Twig.expression.type.operator.binary","value":"~","precidence":6,"associativity":"leftToRight","operator":"~"}]},{"type":"raw","value":"\" value=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"sortOrder","match":["sortOrder"]}]},{"type":"raw","value":"\" data-neo-gs=\"input.sortOrder\">\r\n\r\n\t<div>\r\n\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"macros","match":["macros"]},{"type":"Twig.expression.type.key.period","key":"input","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"type"},{"type":"Twig.expression.type.string","value":"text"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"name"},{"type":"Twig.expression.type.string","value":"name"},{"type":"Twig.expression.type.filter","value":"ns","match":["|ns","ns"]},{"type":"Twig.expression.type.string","value":"[]"},{"type":"Twig.expression.type.operator.binary","value":"~","precidence":6,"associativity":"leftToRight","operator":"~"},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"label"},{"type":"Twig.expression.type.string","value":"Name"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"instructions"},{"type":"Twig.expression.type.string","value":"This can be left blank if you just want an unlabeled separator."},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"value"},{"type":"Twig.expression.type.variable","value":"name","match":["name"]},{"type":"Twig.expression.type.comma"},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"attributes"},{"type":"Twig.expression.type.object.start","value":"{","match":["{"]},{"type":"Twig.expression.type.operator.binary","value":":","precidence":16,"associativity":"rightToLeft","operator":":","key":"data-neo-gs"},{"type":"Twig.expression.type.string","value":"input.name"},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.object.end","value":"}","match":["}"]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n\t</div>\r\n\r\n\t<hr>\r\n\r\n\t<a class=\"error delete\" data-neo-gs=\"button.delete\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Delete group"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a>\r\n</div>\r\n"}], allowInlineIncludes: true});
	
	module.exports = function(context) { return template.render(context); }

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var twig = __webpack_require__(13).twig,
	    template = twig({id:"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\configurator\\templates\\group.twig", data:[{"type":"logic","token":{"type":"Twig.logic.type.set","key":"name","expression":[{"type":"Twig.expression.type.variable","value":"settings","match":["settings"]},{"type":"Twig.expression.type.key.period","key":"getName","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\r\n<div class=\"nc_sidebar_list_item type-heading\">\r\n\t<div class=\"label\" data-neo-g=\"text.name\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"name","match":["name"]},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</div>\r\n\t<a class=\"move icon\" title=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Reorder"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"\" role=\"button\" data-neo-g=\"button.move\"></a>\r\n</div>\r\n"}], allowInlineIncludes: true});
	
	module.exports = function(context) { return template.render(context); }

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var twig = __webpack_require__(13).twig,
	    template = twig({id:"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\configurator\\templates\\configurator.twig", data:[{"type":"raw","value":"<div class=\"nc_sidebar\" data-neo=\"container.sidebar\">\r\n\t<div class=\"nc_sidebar_title\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Block types"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</div>\r\n\t<div class=\"nc_sidebar_list\" data-neo=\"container.blockTypes\"></div>\r\n\t<div class=\"nc_sidebar_buttons btngroup\">\r\n\t\t<a class=\"btn add icon\" role=\"button\" data-neo=\"button.blockType\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Block type"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a>\r\n\t\t<a class=\"btn type-heading\" role=\"button\" data-neo=\"button.group\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Group"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a>\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"nc_main\" data-neo=\"container.main\">\r\n\t<div class=\"nc_main_tabs\">\r\n\t\t<a class=\"nc_main_tabs_tab is-selected\" role=\"button\" data-neo=\"button.settings\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Settings"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a>\r\n\t\t<a class=\"nc_main_tabs_tab\" role=\"button\" data-neo=\"button.fieldLayout\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Field Layout"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a>\r\n\t</div>\r\n\t<div class=\"nc_main_content\" data-neo=\"container.settings\"></div>\r\n\t<div class=\"nc_main_content\" data-neo=\"container.fieldLayout\"></div>\r\n</div>\r\n"}], allowInlineIncludes: true});
	
	module.exports = function(context) { return template.render(context); }

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(29)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./configurator.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./configurator.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".neo-configurator > .field > .input {\n  display: flex;\n  min-height: 400px; }\n\n[data-neo='template.fld'] {\n  display: none; }\n\n.nc_sidebar {\n  width: 200px;\n  border-top-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n  border: 1px solid #ebebeb;\n  background-color: #fafafa; }\n  .nc_sidebar_title {\n    padding: 10px 24px;\n    border-top-left-radius: 3px;\n    border-bottom: 1px solid #ebebeb;\n    background-image: linear-gradient(#f7f7f8, #f4f5f6);\n    color: #8f98a3; }\n  .nc_sidebar_list {\n    margin: 0 -1px; }\n    .nc_sidebar_list:not(:empty) {\n      padding-top: 10px; }\n    .nc_sidebar_list_item {\n      cursor: default;\n      position: relative;\n      margin-top: -1px;\n      padding: 10px 14px 10px 40px;\n      border: 1px solid #ebebeb;\n      background-color: #fcfcfc; }\n      .nc_sidebar_list_item > .label {\n        color: #29323d; }\n        .nc_sidebar_list_item > .label:empty {\n          font-style: italic;\n          color: #8f98a3; }\n          .nc_sidebar_list_item > .label:empty::before {\n            content: \"(blank)\"; }\n      .nc_sidebar_list_item > .move {\n        display: block;\n        position: absolute;\n        top: 11px;\n        left: 7px;\n        width: 24px;\n        text-align: center; }\n      .nc_sidebar_list_item.is-selected {\n        z-index: 1;\n        border-color: #dedede;\n        background-color: #ececec; }\n      .nc_sidebar_list_item.has-errors {\n        z-index: 2;\n        border-color: #efc7c7;\n        background-color: #f9e0e0; }\n        .nc_sidebar_list_item.has-errors > .label {\n          color: #da5a47; }\n        .nc_sidebar_list_item.has-errors.is-selected {\n          border-color: #e1bbbb;\n          background-color: #efc7c7; }\n      .nc_sidebar_list_item.type-heading {\n        margin-top: 9px; }\n        .nc_sidebar_list_item.type-heading:first-child {\n          margin-top: 0; }\n        .nc_sidebar_list_item.type-heading > .label {\n          font-size: 11px;\n          font-weight: bold;\n          text-transform: uppercase;\n          color: #b9bfc6; }\n          .nc_sidebar_list_item.type-heading > .label:empty {\n            font-weight: normal;\n            color: #8f98a3; }\n  .nc_sidebar_buttons {\n    padding: 14px; }\n    .nc_sidebar_buttons > .btn.type-heading {\n      font-size: 11px;\n      font-weight: bold;\n      text-transform: uppercase;\n      color: #b9bfc6; }\n\n.nc_main {\n  flex-grow: 1;\n  flex-shrink: 20;\n  border-top-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n  border: 1px solid #ebebeb;\n  border-left: 0; }\n  .nc_main_tabs {\n    display: flex;\n    border-top-right-radius: 3px;\n    border-bottom: 1px solid #ebebeb;\n    background-image: linear-gradient(#f7f7f8, #f4f5f6); }\n    .nc_main_tabs_tab {\n      display: block;\n      padding: 10px 24px;\n      color: #555; }\n      .nc_main_tabs_tab:hover {\n        text-decoration: none;\n        color: #0d78f2; }\n      .nc_main_tabs_tab.is-selected {\n        margin-bottom: -1px;\n        padding-bottom: 11px;\n        border-left: 1px solid #ebebeb;\n        border-right: 1px solid #ebebeb;\n        background-color: #fff;\n        color: #29323d; }\n        .nc_main_tabs_tab.is-selected:first-child {\n          border-left: 0; }\n  .nc_main_content {\n    padding: 24px; }\n    .nc_main_content .fieldlayoutform .tab {\n      background: transparent;\n      box-shadow: none; }\n    .nc_main_content .fieldlayoutform .fld-field {\n      margin-top: 7px; }\n    .nc_main_content .fieldlayoutform .fld-tabcontent:not(:empty) {\n      padding-top: 6px; }\n", ""]);
	
	// exports


/***/ },
/* 28 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(3);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _namespace = __webpack_require__(6);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	var _BlockType = __webpack_require__(31);
	
	var _BlockType2 = _interopRequireDefault(_BlockType);
	
	var _Group = __webpack_require__(33);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _Block = __webpack_require__(34);
	
	var _Block2 = _interopRequireDefault(_Block);
	
	var _Buttons = __webpack_require__(36);
	
	var _Buttons2 = _interopRequireDefault(_Buttons);
	
	var _input = __webpack_require__(38);
	
	var _input2 = _interopRequireDefault(_input);
	
	__webpack_require__(18);
	
	__webpack_require__(39);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var _defaults = {
		namespace: [],
		blockTypes: [],
		groups: [],
		blocks: [],
		inputId: null,
		maxBlocks: 0
	};
	
	exports.default = _garnish2.default.Base.extend({
	
		_templateNs: [],
	
		init: function init() {
			var _this = this;
	
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._templateNs = _namespace2.default.parse(settings.namespace);
			this._blockTypes = [];
			this._groups = [];
			this._blocks = [];
			this._maxBlocks = settings.maxBlocks;
	
			_namespace2.default.enter(this._templateNs);
	
			this.$container = (0, _jquery2.default)('#' + settings.inputId).append((0, _input2.default)({
				blockTypes: settings.blockTypes
			}));
	
			_namespace2.default.leave();
	
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = settings.blockTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var btInfo = _step.value;
	
					var blockType = new _BlockType2.default(btInfo);
	
					this._blockTypes.push(blockType);
					this._blockTypes[blockType.getHandle()] = blockType;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;
	
			try {
				for (var _iterator2 = settings.groups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var gInfo = _step2.value;
	
					var group = new _Group2.default(gInfo);
	
					this._groups.push(group);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
	
			var $neo = this.$container.find('[data-neo]');
			this.$blocksContainer = $neo.filter('[data-neo="container.blocks"]');
			this.$buttonsContainer = $neo.filter('[data-neo="container.buttons"]');
	
			this._buttons = new _Buttons2.default({
				blockTypes: this.getBlockTypes(),
				groups: this.getGroups(),
				maxBlocks: this.getMaxBlocks()
			});
	
			this.$buttonsContainer.append(this._buttons.$container);
			this._buttons.on('newBlock', function (e) {
				return _this['@newBlock'](e);
			});
			this._buttons.initUi();
	
			this._blockSort = new _garnish2.default.DragSort(null, {
				container: this.$blocksContainer,
				handle: '[data-neo-b="button.move"]',
				axis: 'y',
				filter: function filter() {
					// Only return all the selected items if the target item is selected
					if (_this._blockSort.$targetItem.hasClass('is-selected')) {
						return _this._blockSelect.getSelectedItems();
					} else {
						return _this._blockSort.$targetItem;
					}
				},
				collapseDraggees: true,
				magnetStrength: 4,
				helperLagBase: 1.5,
				helperOpacity: 0.9,
				onSortChange: function onSortChange() {
					return _this._updateBlockOrder();
				}
			});
	
			this._blockSelect = new _garnish2.default.Select(this.$blocksContainer, null, {
				multi: true,
				vertical: true,
				handle: '[data-neo-b="select"], [data-neo-b="button.toggler"]',
				checkboxMode: true,
				selectedClass: 'is-selected sel'
			});
	
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;
	
			try {
				for (var _iterator3 = settings.blocks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var bInfo = _step3.value;
	
					var _blockType = this._blockTypes[bInfo.blockType];
	
					bInfo.namespace = [].concat(_toConsumableArray(this._templateNs), [bInfo.id]);
					bInfo.blockType = new _BlockType2.default({
						name: _blockType.getName(),
						handle: _blockType.getHandle(),
						maxBlocks: _blockType.getMaxBlocks(),
						tabs: bInfo.tabs
					});
	
					var block = new _Block2.default(bInfo);
					this.addBlock(block);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
		},
		addBlock: function addBlock(block) {
			var _this2 = this;
	
			var index = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];
	
			if (index >= 0 && index < this._blocks.length) {
				this._blocks[index].$container.before(block.$container);
				this._blocks.splice(index, 0, block);
			} else {
				this.$blocksContainer.append(block.$container);
				this._blocks.push(block);
			}
	
			this._blockSort.addItems(block.$container);
			this._blockSelect.addItems(block.$container);
	
			block.initUi();
			block.on('destroy.input', function (e) {
				return _this2._blockBatch(block, function (b) {
					return _this2.removeBlock(b);
				});
			});
			block.on('toggleEnabled.input', function (e) {
				return _this2._blockBatch(block, function (b) {
					return b.toggleEnabled(e.enabled);
				});
			});
			block.on('toggleExpansion.input', function (e) {
				return _this2._blockBatch(block, function (b) {
					return b.toggleExpansion(e.expanded);
				});
			});
			block.on('addBlockAbove.input', function (e) {
				return _this2['@addBlockAbove'](e);
			});
	
			this._destroyTempButtons();
			this._updateButtons();
			this._updateBlockOrder();
	
			this.trigger('addBlock', {
				block: block,
				index: index
			});
		},
		removeBlock: function removeBlock(block) {
			block.$container.remove();
			block.off('.input');
	
			this._blocks = this._blocks.filter(function (b) {
				return b !== block;
			});
			this._blockSort.removeItems(block.$container);
			this._blockSelect.removeItems(block.$container);
	
			this._destroyTempButtons();
			this._updateButtons();
	
			this.trigger('removeBlock', {
				block: block
			});
		},
		getBlockByElement: function getBlockByElement($block) {
			return this._blocks.find(function (block) {
				return block.$container.is($block);
			});
		},
		getBlocks: function getBlocks() {
			return Array.from(this._blocks);
		},
		getBlockTypes: function getBlockTypes() {
			return Array.from(this._blockTypes);
		},
		getGroups: function getGroups() {
			return Array.from(this._groups);
		},
		getMaxBlocks: function getMaxBlocks() {
			return this._maxBlocks;
		},
		getSelectedBlocks: function getSelectedBlocks() {
			var $selectedBlocks = this._blockSelect.getSelectedItems();
	
			return this._blocks.filter(function (block) {
				return block.$container.is($selectedBlocks);
			});
		},
		_updateBlockOrder: function _updateBlockOrder() {
			var _this3 = this;
	
			var blocks = [];
	
			this._blockSort.$items.each(function (index, element) {
				var block = _this3.getBlockByElement(element);
	
				blocks.push(block);
			});
	
			this._blocks = blocks;
		},
		_updateButtons: function _updateButtons() {
			var blocks = this.getBlocks();
	
			this._buttons.updateButtonStates(blocks);
	
			if (this._tempButtons) {
				this._tempButtons.updateButtonStates(blocks);
			}
		},
		_blockBatch: function _blockBatch(block, callback) {
			var blocks = block.isSelected() ? this.getSelectedBlocks() : [block];
	
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;
	
			try {
				for (var _iterator4 = blocks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var b = _step4.value;
	
					callback(b);
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		},
		_destroyTempButtons: function _destroyTempButtons() {
			if (this._tempButtons) {
				this._tempButtons.off('newBlock');
				this._tempButtons.$container.remove();
				this._tempButtons = null;
			}
		},
		'@newBlock': function newBlock(e) {
			var blockId = _Block2.default.getNewId();
			var block = new _Block2.default({
				namespace: [].concat(_toConsumableArray(this._templateNs), [blockId]),
				blockType: e.blockType,
				id: blockId
			});
	
			this.addBlock(block, e.index);
		},
		'@addBlockAbove': function addBlockAbove(e) {
			var _this4 = this;
	
			this._destroyTempButtons();
	
			var block = e.block;
			var buttons = new _Buttons2.default({
				blockTypes: this.getBlockTypes(),
				groups: this.getGroups(),
				maxBlocks: this.getMaxBlocks(),
				blocks: this.getBlocks()
			});
	
			block.$container.before(buttons.$container);
			buttons.on('newBlock', function (e) {
				_this4['@newBlock']({
					blockType: e.blockType,
					index: _this4._blocks.indexOf(block)
				});
			});
	
			buttons.initUi();
	
			this._tempButtons = buttons;
		}
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _BlockTypeTab = __webpack_require__(32);
	
	var _BlockTypeTab2 = _interopRequireDefault(_BlockTypeTab);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		sortOrder: 0,
		name: '',
		handle: '',
		maxBlocks: 0,
		tabs: []
	};
	
	exports.default = _garnish2.default.Base.extend({
		init: function init() {
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._sortOrder = settings.sortOrder | 0;
			this._name = settings.name;
			this._handle = settings.handle;
			this._maxBlocks = settings.maxBlocks | 0;
			this._tabs = settings.tabs.map(function (tab) {
				return new _BlockTypeTab2.default(tab);
			});
		},
		getType: function getType() {
			return 'blockType';
		},
		getSortOrder: function getSortOrder() {
			return this._sortOrder;
		},
		getName: function getName() {
			return this._name;
		},
		getHandle: function getHandle() {
			return this._handle;
		},
		getMaxBlocks: function getMaxBlocks() {
			return this._maxBlocks;
		},
		getTabs: function getTabs() {
			return Array.from(this._tabs);
		}
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		name: '',
		bodyHtml: '',
		footHtml: '',
		errors: []
	};
	
	exports.default = _garnish2.default.Base.extend({
		init: function init() {
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._name = settings.name;
			this._bodyHtml = settings.bodyHtml || '';
			this._footHtml = settings.footHtml || '';
			this._errors = settings.errors;
		},
		getErrors: function getErrors() {
			return Array.from(this._errors);
		},
		getName: function getName() {
			return this._name;
		},
		getBodyHtml: function getBodyHtml() {
			var blockId = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
			if (blockId !== null) {
				return this._bodyHtml.replace(/__NEOBLOCK__/g, blockId);
			}
	
			return this._bodyHtml;
		},
		getFootHtml: function getFootHtml() {
			var blockId = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
			if (blockId !== null) {
				return this._footHtml.replace(/__NEOBLOCK__/g, blockId);
			}
	
			return this._footHtml;
		}
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		sortOrder: 0,
		name: ''
	};
	
	exports.default = _garnish2.default.Base.extend({
		init: function init() {
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._sortOrder = settings.sortOrder | 0;
			this._name = settings.name;
		},
		getType: function getType() {
			return 'group';
		},
		getSortOrder: function getSortOrder() {
			return this._sortOrder;
		},
		getName: function getName() {
			return this._name;
		},
		isBlank: function isBlank() {
			return !this._name;
		}
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(3);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _namespace = __webpack_require__(6);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	var _block = __webpack_require__(35);
	
	var _block2 = _interopRequireDefault(_block);
	
	__webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _defaults = {
		namespace: [],
		blockType: null,
		id: null,
		enabled: true,
		collapsed: false
	};
	
	exports.default = _garnish2.default.Base.extend({
	
		_templateNs: [],
		_blockType: null,
		_initialised: false,
		_expanded: true,
		_enabled: true,
	
		init: function init() {
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._templateNs = _namespace2.default.parse(settings.namespace);
			this._blockType = settings.blockType;
			this._id = settings.id;
	
			_namespace2.default.enter(this._templateNs);
	
			this.$container = (0, _jquery2.default)((0, _block2.default)({
				type: this._blockType,
				id: this._id,
				enabled: !!settings.enabled,
				collapsed: !!settings.collapsed
			}));
	
			_namespace2.default.leave();
	
			var $neo = this.$container.find('[data-neo-b]');
			this.$contentContainer = $neo.filter('[data-neo-b="container.content"]');
			this.$tabContainer = $neo.filter('[data-neo-b="container.tab"]');
			this.$menuContainer = $neo.filter('[data-neo-b="container.menu"]');
			this.$tabButton = $neo.filter('[data-neo-b="button.tab"]');
			this.$settingsButton = $neo.filter('[data-neo-b="button.actions"]');
			this.$togglerButton = $neo.filter('[data-neo-b="button.toggler"]');
			this.$enabledInput = $neo.filter('[data-neo-b="input.enabled"]');
			this.$collapsedInput = $neo.filter('[data-neo-b="input.collapsed"]');
			this.$status = $neo.filter('[data-neo-b="status"]');
	
			this.toggleEnabled(settings.enabled);
			this.toggleExpansion(!settings.collapsed);
	
			this.addListener(this.$togglerButton, 'dblclick', '@doubleClickTitle');
			this.addListener(this.$tabButton, 'click', '@setTab');
		},
		initUi: function initUi() {
			var _this = this;
	
			if (!this._initialised) {
				var tabs = this._blockType.getTabs();
	
				var footList = tabs.map(function (tab) {
					return tab.getFootHtml(_this._id);
				});
				this.$foot = (0, _jquery2.default)(footList.join(''));
	
				_garnish2.default.$bod.append(this.$foot);
				_craft2.default.initUiElements(this.$contentContainer);
	
				this._settingsMenu = new _garnish2.default.MenuBtn(this.$settingsButton);
				this._settingsMenu.on('optionSelect', function (e) {
					return _this['@settingSelect'](e);
				});
	
				this._initialised = true;
	
				this.trigger('initUi');
			}
		},
		destroy: function destroy() {
			if (this._initialised) {
				this.$container.remove();
				this.$foot.remove();
	
				this.trigger('destroy');
			}
		},
		getBlockType: function getBlockType() {
			return this._blockType;
		},
		getId: function getId() {
			return this._id;
		},
		isNew: function isNew() {
			return (/^new/.test(this.getId())
			);
		},
		isSelected: function isSelected() {
			return this.$container.hasClass('is-selected');
		},
		collapse: function collapse() {
			var save = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
			this.toggleExpansion(false, save);
		},
		expand: function expand() {
			var save = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
			this.toggleExpansion(true, save);
		},
		toggleExpansion: function toggleExpansion() {
			var expand = arguments.length <= 0 || arguments[0] === undefined ? !this._expanded : arguments[0];
			var save = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
			if (expand !== this._expanded) {
				this._expanded = expand;
	
				var expandContainer = this.$menuContainer.find('[data-action="expand"]').parent();
				var collapseContainer = this.$menuContainer.find('[data-action="collapse"]').parent();
	
				this.$container.toggleClass('is-expanded', this._expanded).toggleClass('is-contracted', !this._expanded);
	
				expandContainer.toggleClass('hidden', this._expanded);
				collapseContainer.toggleClass('hidden', !this._expanded);
	
				this.$collapsedInput.val(this._expanded ? 0 : 1);
	
				if (save) {
					this.saveExpansion();
				}
	
				this.trigger('toggleExpansion', {
					expanded: this._expanded
				});
			}
		},
		isExpanded: function isExpanded() {
			return this._expanded;
		},
		saveExpansion: function saveExpansion() {
			if (!this.isNew()) {
				_craft2.default.queueActionRequest('neo/saveExpansion', {
					expanded: this.isExpanded(),
					blockId: this.getId()
				});
			}
		},
		disable: function disable() {
			this.toggleEnabled(false);
		},
		enable: function enable() {
			this.toggleEnabled(true);
		},
		toggleEnabled: function toggleEnabled() {
			var enable = arguments.length <= 0 || arguments[0] === undefined ? !this._enabled : arguments[0];
	
			if (enable !== this._enabled) {
				this._enabled = enable;
	
				var enableContainer = this.$menuContainer.find('[data-action="enable"]').parent();
				var disableContainer = this.$menuContainer.find('[data-action="disable"]').parent();
	
				this.$container.toggleClass('is-enabled', this._enabled).toggleClass('is-disabled', !this._enabled);
	
				this.$status.toggleClass('hidden', this._enabled);
	
				enableContainer.toggleClass('hidden', this._enabled);
				disableContainer.toggleClass('hidden', !this._enabled);
	
				this.$enabledInput.val(this._enabled ? 1 : 0);
	
				this.trigger('toggleEnabled', {
					enabled: this._enabled
				});
			}
		},
		isEnabled: function isEnabled() {
			return this._enabled;
		},
		selectTab: function selectTab(name) {
			var $tabs = (0, _jquery2.default)().add(this.$tabButton).add(this.$tabContainer);
	
			$tabs.removeClass('is-selected');
	
			var $tab = $tabs.filter('[data-neo-b-info="' + name + '"]').addClass('is-selected');
	
			this.trigger('selectTab', {
				tabName: name,
				$tabButton: $tab.filter('[data-neo-b="button.tab"]'),
				$tabContainer: $tab.filter('[data-neo-b="container.tab"]')
			});
		},
		'@settingSelect': function settingSelect(e) {
			var $option = (0, _jquery2.default)(e.option);
	
			switch ($option.attr('data-action')) {
				case 'collapse':
					this.collapse();break;
				case 'expand':
					this.expand();break;
				case 'disable':
					this.disable();
					this.collapse();break;
				case 'enable':
					this.enable();break;
				case 'delete':
					this.destroy();break;
	
				case 'add':
					this.trigger('addBlockAbove', {
						block: this
					});
					break;
			}
		},
		'@doubleClickTitle': function doubleClickTitle(e) {
			e.preventDefault();
	
			this.toggleExpansion();
		},
		'@setTab': function setTab(e) {
			e.preventDefault();
	
			var $tab = (0, _jquery2.default)(e.currentTarget);
			var tabName = $tab.attr('data-neo-b-info');
	
			this.selectTab(tabName);
		}
	}, {
		_totalNewBlocks: 0,
	
		getNewId: function getNewId() {
			return 'new' + this._totalNewBlocks++;
		}
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var twig = __webpack_require__(13).twig,
	    template = twig({id:"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\input\\templates\\block.twig", data:[{"type":"raw","value":"<div class=\"ni_block\">\r\n\t<input type=\"hidden\" name=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"type"},{"type":"Twig.expression.type.filter","value":"ns","match":["|ns","ns"]}]},{"type":"raw","value":"\" value=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]},{"type":"Twig.expression.type.key.period","key":"getHandle","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\">\r\n\t<input type=\"hidden\" name=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"enabled"},{"type":"Twig.expression.type.filter","value":"ns","match":["|ns","ns"]}]},{"type":"raw","value":"\" value=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"enabled","match":["enabled"]},{"type":"Twig.expression.type.number","value":1,"match":["1",null]},{"type":"Twig.expression.type.number","value":0,"match":["0",null]},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]},{"type":"raw","value":"\" data-neo-b=\"input.enabled\">\r\n\t<input type=\"hidden\" name=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"collapsed"},{"type":"Twig.expression.type.filter","value":"ns","match":["|ns","ns"]}]},{"type":"raw","value":"\" value=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"collapsed","match":["collapsed"]},{"type":"Twig.expression.type.number","value":1,"match":["1",null]},{"type":"Twig.expression.type.number","value":0,"match":["0",null]},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]},{"type":"raw","value":"\" data-neo-b=\"input.collapsed\">\r\n\t<div class=\"ni_block_topbar\">\r\n\t\t<div class=\"ni_block_topbar_item\" data-neo-b=\"select\">\r\n\t\t\t<div class=\"checkbox\" title=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Select"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"\"></div>\r\n\t\t</div>\r\n\t\t<div class=\"ni_block_topbar_item\" data-neo-b=\"button.toggler\">\r\n\t\t\t<span>"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]},{"type":"Twig.expression.type.key.period","key":"getName","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</span>\r\n\t\t</div>\r\n\t\t<div class=\"ni_block_topbar_item size-full\" data-neo-b=\"button.toggler\">\r\n\t\t\t<span data-neo-b=\"text.content\"></span>\r\n\t\t</div>\r\n\t\t<div class=\"ni_block_topbar_item tabs "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]},{"type":"Twig.expression.type.key.period","key":"getTabs","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]},{"type":"Twig.expression.type.filter","value":"length","match":["|length","length"]},{"type":"Twig.expression.type.number","value":1,"match":["1",null]},{"type":"Twig.expression.type.operator.binary","value":">","precidence":8,"associativity":"leftToRight","operator":">"},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.string","value":"hidden"},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]},{"type":"raw","value":"\">\r\n\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.for","key_var":null,"value_var":"tab","expression":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]},{"type":"Twig.expression.type.key.period","key":"getTabs","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}],"output":[{"type":"raw","value":"\r\n\t\t\t\t<a class=\"tab "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"loop","match":["loop"]},{"type":"Twig.expression.type.key.period","key":"first"},{"type":"Twig.expression.type.string","value":"is-selected"},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]},{"type":"raw","value":" "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"tab","match":["tab"]},{"type":"Twig.expression.type.key.period","key":"getErrors","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]},{"type":"Twig.expression.type.filter","value":"length","match":["|length","length"]},{"type":"Twig.expression.type.number","value":0,"match":["0",null]},{"type":"Twig.expression.type.operator.binary","value":">","precidence":8,"associativity":"leftToRight","operator":">"},{"type":"Twig.expression.type.string","value":"has-errors"},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]},{"type":"raw","value":"\"\r\n\t\t\t\t   data-neo-b=\"button.tab\"\r\n\t\t\t\t   data-neo-b-info=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"tab","match":["tab"]},{"type":"Twig.expression.type.key.period","key":"name"}]},{"type":"raw","value":"\">\r\n\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"tab","match":["tab"]},{"type":"Twig.expression.type.key.period","key":"name"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"\r\n\t\t\t\t</a>\r\n\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t</div>\r\n\t\t<div class=\"ni_block_topbar_item hidden\" data-neo-b=\"status\">\r\n\t\t\t<div class=\"status off\" title=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Disabled"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"\"></div>\r\n\t\t</div>\r\n\t\t<div class=\"ni_block_topbar_item\">\r\n\t\t\t<a class=\"settings icon menubtn\" title=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Actions"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"\" role=\"button\" data-neo-b=\"button.actions\"></a>\r\n\t\t\t<div class=\"menu\" data-neo-b=\"container.menu\">\r\n\t\t\t\t<ul class=\"padded\">\r\n\t\t\t\t\t<li><a data-icon=\"collapse\" data-action=\"collapse\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Collapse"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a></li>\r\n\t\t\t\t\t<li class=\"hidden\"><a data-icon=\"expand\" data-action=\"expand\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Expand"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a></li>\r\n\t\t\t\t\t<li><a data-icon=\"disabled\" data-action=\"disable\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Disable"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a></li>\r\n\t\t\t\t\t<li class=\"hidden\"><a data-icon=\"enabled\" data-action=\"enable\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Enable"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a></li>\r\n\t\t\t\t</ul>\r\n\t\t\t\t<hr class=\"padded\">\r\n\t\t\t\t<ul class=\"padded\">\r\n\t\t\t\t\t<li><a data-icon=\"+\" data-action=\"add\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Add block above"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a></li>\r\n\t\t\t\t</ul>\r\n\t\t\t\t<hr class=\"padded\">\r\n\t\t\t\t<ul class=\"padded\">\r\n\t\t\t\t\t<li><a data-icon=\"remove\" data-action=\"delete\">"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Delete"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"</a></li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"ni_block_topbar_item\">\r\n\t\t\t<a class=\"move icon\" title=\""},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Reorder"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"\" role=\"button\" data-neo-b=\"button.move\"></a>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"ni_block_content\" data-neo-b=\"container.content\">\r\n\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.for","key_var":null,"value_var":"tab","expression":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]},{"type":"Twig.expression.type.key.period","key":"getTabs","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}],"output":[{"type":"raw","value":"\r\n\t\t\t<div class=\"ni_block_content_tab "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"loop","match":["loop"]},{"type":"Twig.expression.type.key.period","key":"first"},{"type":"Twig.expression.type.string","value":"is-selected"},{"type":"Twig.expression.type.string","value":""},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]},{"type":"raw","value":"\"\r\n\t\t\t\t data-neo-b=\"container.tab\"\r\n\t\t\t\t data-neo-b-info=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"tab","match":["tab"]},{"type":"Twig.expression.type.key.period","key":"name"}]},{"type":"raw","value":"\">\r\n\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"tab","match":["tab"]},{"type":"Twig.expression.type.key.period","key":"getBodyHtml","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.variable","value":"id","match":["id"]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n\t\t\t</div>\r\n\t\t"}]}},{"type":"raw","value":"\r\n\t</div>\r\n</div>\r\n"}], allowInlineIncludes: true});
	
	module.exports = function(context) { return template.render(context); }

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(3);
	
	var _garnish = __webpack_require__(4);
	
	var _garnish2 = _interopRequireDefault(_garnish);
	
	var _craft = __webpack_require__(5);
	
	var _craft2 = _interopRequireDefault(_craft);
	
	var _buttons = __webpack_require__(37);
	
	var _buttons2 = _interopRequireDefault(_buttons);
	
	__webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var _defaults = {
		blockTypes: [],
		groups: [],
		maxBlocks: 0,
		blocks: null
	};
	
	exports.default = _garnish2.default.Base.extend({
	
		_blockTypes: [],
		_groups: [],
		_maxBlocks: 0,
	
		init: function init() {
			var _this = this;
	
			var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			settings = Object.assign({}, _defaults, settings);
	
			this._blockTypes = Array.from(settings.blockTypes);
			this._groups = Array.from(settings.groups);
			this._maxBlocks = settings.maxBlocks;
	
			var items = [].concat(_toConsumableArray(this._blockTypes), _toConsumableArray(this._groups)).sort(function (a, b) {
				return a.getSortOrder() - b.getSortOrder();
			});
	
			this.$container = (0, _jquery2.default)((0, _buttons2.default)({
				blockTypes: this._blockTypes,
				groups: this._groups,
				items: items,
				maxBlocks: this._maxBlocks
			}));
	
			var $neo = this.$container.find('[data-neo-bn]');
			this.$buttonsContainer = $neo.filter('[data-neo-bn="container.buttons"]');
			this.$menuContainer = $neo.filter('[data-neo-bn="container.menu"]');
			this.$blockButtons = $neo.filter('[data-neo-bn="button.addBlock"]');
	
			if (settings.blocks) {
				this.updateButtonStates(settings.blocks);
			}
	
			this.addListener(this.$blockButtons, 'activate', '@newBlock');
			this.addListener(this.$container, 'resize', function () {
				return _this.updateResponsiveness();
			});
		},
		initUi: function initUi() {
			_craft2.default.initUiElements(this.$container);
			this.updateResponsiveness();
		},
		updateButtonStates: function updateButtonStates() {
			var blocks = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
			var that = this;
			var allDisabled = this._maxBlocks > 0 && blocks.length >= this._maxBlocks;
	
			this.$blockButtons.each(function () {
				var $button = (0, _jquery2.default)(this);
				var disabled = allDisabled;
	
				if (!disabled) {
					(function () {
						var blockType = that.getBlockTypeByButton($button);
						var blocksOfType = blocks.filter(function (b) {
							return b.getBlockType().getHandle() === blockType.getHandle();
						});
						var maxBlockTypes = blockType.getMaxBlocks();
	
						disabled = maxBlockTypes > 0 && blocksOfType.length >= maxBlockTypes;
					})();
				}
	
				$button.toggleClass('disabled', disabled);
			});
		},
		updateResponsiveness: function updateResponsiveness() {
			if (!this._buttonsContainerWidth) {
				this._buttonsContainerWidth = this.$buttonsContainer.width();
			}
	
			var isMobile = this.$container.width() < this._buttonsContainerWidth;
	
			this.$buttonsContainer.toggleClass('hidden', isMobile);
			this.$menuContainer.toggleClass('hidden', !isMobile);
		},
		getBlockTypeByButton: function getBlockTypeByButton($button) {
			var btHandle = $button.attr('data-neo-bn-info');
	
			return this._blockTypes.find(function (bt) {
				return bt.getHandle() === btHandle;
			});
		},
		'@newBlock': function newBlock(e) {
			var $button = (0, _jquery2.default)(e.currentTarget);
			var blockTypeHandle = $button.attr('data-neo-bn-info');
			var blockType = this._blockTypes.find(function (bt) {
				return bt.getHandle() === blockTypeHandle;
			});
	
			this.trigger('newBlock', {
				blockType: blockType
			});
		}
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var twig = __webpack_require__(13).twig,
	    template = twig({id:"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\input\\templates\\buttons.twig", data:[{"type":"raw","value":"<div class=\"ni_buttons\">\r\n\t<div class=\"btngroup\"\r\n\t     data-neo-bn=\"container.buttons\">\r\n\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"currentGroup","expression":[{"type":"Twig.expression.type.bool","value":false}]}},{"type":"raw","value":"\r\n\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.for","key_var":null,"value_var":"item","expression":[{"type":"Twig.expression.type.variable","value":"items","match":["items"]}],"output":[{"type":"raw","value":"\r\n\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"type","expression":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getType","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]},{"type":"Twig.expression.type.string","value":"blockType"},{"type":"Twig.expression.type.operator.binary","value":"==","precidence":9,"associativity":"leftToRight","operator":"=="}],"output":[{"type":"raw","value":"\r\n\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"currentGroup","match":["currentGroup"]}],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t\t<a data-neo-bn=\"button.addBlock\"\r\n\t\t\t\t\t\t   data-neo-bn-info=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getHandle","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\">\r\n\t\t\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getName","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t"}]}},{"type":"logic","token":{"type":"Twig.logic.type.else","match":["else"],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t<div class=\"btn"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"loop","match":["loop"]},{"type":"Twig.expression.type.key.period","key":"first"}],"output":[{"type":"raw","value":" add icon"}]}},{"type":"raw","value":"\"\r\n\t\t\t\t\t\t data-neo-bn=\"button.addBlock\"\r\n\t\t\t\t\t\t data-neo-bn-info=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getHandle","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\">\r\n\t\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getName","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n\t\t\t\t\t</div>\r\n\t\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t\t"}]}},{"type":"logic","token":{"type":"Twig.logic.type.elseif","stack":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]},{"type":"Twig.expression.type.string","value":"group"},{"type":"Twig.expression.type.operator.binary","value":"==","precidence":9,"associativity":"leftToRight","operator":"=="}],"output":[{"type":"raw","value":"\r\n\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"currentGroup","match":["currentGroup"]}],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"</ul></div>"}]},{"type":"raw","value":"\r\n\t\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"currentGroup","expression":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"isBlank","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]}},{"type":"raw","value":"\r\n\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"currentGroup","match":["currentGroup"]}],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t<div class=\"btn"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"loop","match":["loop"]},{"type":"Twig.expression.type.key.period","key":"first"}],"output":[{"type":"raw","value":" add icon"}]}},{"type":"raw","value":" menubtn\">\r\n\t\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getName","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"<div class=\"menu\"><ul>"}]},{"type":"raw","value":"\r\n\t\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t"}]}},{"type":"raw","value":"\r\n\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"currentGroup","match":["currentGroup"]}],"output":[{"type":"raw","value":"\r\n\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"</ul></div>"}]},{"type":"raw","value":"\r\n\t\t"}]}},{"type":"raw","value":"\r\n\t</div>\r\n\t<div class=\"btn add icon menubtn hidden\"\r\n\t     data-neo-bn=\"container.menu\">\r\n\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"Add a block"},{"type":"Twig.expression.type.filter","value":"t","match":["|t","t"]}]},{"type":"raw","value":"\r\n\t</div>\r\n\t<div class=\"menu\">\r\n\t\t<ul>\r\n\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"currentGroup","expression":[{"type":"Twig.expression.type.bool","value":false}]}},{"type":"raw","value":"\r\n\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.for","key_var":null,"value_var":"item","expression":[{"type":"Twig.expression.type.variable","value":"items","match":["items"]}],"output":[{"type":"raw","value":"\r\n\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"type","expression":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getType","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]}},{"type":"raw","value":"\r\n\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]},{"type":"Twig.expression.type.string","value":"blockType"},{"type":"Twig.expression.type.operator.binary","value":"==","precidence":9,"associativity":"leftToRight","operator":"=="}],"output":[{"type":"raw","value":"\r\n\t\t\t\t<li>\r\n\t\t\t\t\t<a data-neo-bn=\"button.addBlock\"\r\n\t\t\t\t\t   data-neo-bn-info=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getHandle","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\">\r\n\t\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getName","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</li>\r\n\t\t\t"}]}},{"type":"logic","token":{"type":"Twig.logic.type.elseif","stack":[{"type":"Twig.expression.type.variable","value":"type","match":["type"]},{"type":"Twig.expression.type.string","value":"group"},{"type":"Twig.expression.type.operator.binary","value":"==","precidence":9,"associativity":"leftToRight","operator":"=="}],"output":[{"type":"raw","value":"\r\n\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"</ul>"}]},{"type":"raw","value":"\r\n\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.set","key":"currentGroup","expression":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"isBlank","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]},{"type":"Twig.expression.type.bool","value":false},{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.operator.binary","value":"?","precidence":16,"associativity":"rightToLeft","operator":"?"}]}},{"type":"raw","value":"\r\n\t\t\t\t"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"currentGroup","match":["currentGroup"]}],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t<h6>"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"getName","params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"</h6>\r\n\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"<ul class=\"padded\">"}]},{"type":"raw","value":"\r\n\t\t\t\t"}]}},{"type":"logic","token":{"type":"Twig.logic.type.else","match":["else"],"output":[{"type":"raw","value":"\r\n\t\t\t\t\t"},{"type":"output","stack":[{"type":"Twig.expression.type.string","value":"<ul>"}]},{"type":"raw","value":"\r\n\t\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t\t"}]}},{"type":"raw","value":"\r\n\t\t"}]}},{"type":"raw","value":"\r\n\t\t</ul>\r\n\t</div>\r\n</div>\r\n"}], allowInlineIncludes: true});
	
	module.exports = function(context) { return template.render(context); }

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var twig = __webpack_require__(13).twig,
	    template = twig({id:"C:\\Users\\Benjamin\\Documents\\Web\\craft-neo\\craft\\plugins\\src\\input\\templates\\input.twig", data:[{"type":"raw","value":"<div class=\"ni_blocks\" data-neo=\"container.blocks\"></div>\r\n<div data-neo=\"container.buttons\"></div>\r\n"}], allowInlineIncludes: true});
	
	module.exports = function(context) { return template.render(context); }

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(29)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./input.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./input.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".ni_buttons {\n  position: relative;\n  height: 30px; }\n  .ni_buttons > .btngroup,\n  .ni_buttons > .menubtn {\n    position: absolute;\n    top: 0; }\n    body.ltr .ni_buttons > .btngroup, body.ltr\n    .ni_buttons > .menubtn {\n      left: 0; }\n    body.rtl .ni_buttons > .btngroup, body.rtl\n    .ni_buttons > .menubtn {\n      right: 0; }\n\n.ni_blocks > .ni_buttons {\n  margin-bottom: 10px; }\n\n.ni_block {\n  margin-bottom: 10px;\n  border-radius: 3px;\n  border: 1px solid #e3e5e8;\n  overflow: hidden; }\n  .ni_block:focus {\n    outline: 0; }\n  .ni_block_topbar {\n    display: flex;\n    height: 30px;\n    line-height: 30px;\n    background-color: #eef0f1;\n    color: #8f98a3; }\n    .ni_block_topbar_item {\n      cursor: default;\n      padding: 0 8px;\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      user-select: none; }\n      body.ltr .ni_block_topbar_item:not(:first-child),\n      body.rtl .ni_block_topbar_item:not(:last-child) {\n        padding-left: 0; }\n      .ni_block_topbar_item.size-full {\n        flex-grow: 1; }\n      .ni_block_topbar_item.tabs .tab {\n        display: block;\n        height: 30px;\n        padding: 0 10px;\n        color: rgba(41, 50, 61, 0.5); }\n        body.ltr .ni_block_topbar_item.tabs .tab {\n          float: left; }\n        body.rtl .ni_block_topbar_item.tabs .tab {\n          float: right; }\n        .ni_block_topbar_item.tabs .tab:hover {\n          color: #0d78f2; }\n        .ni_block_topbar_item.tabs .tab.is-selected {\n          cursor: default;\n          padding: 0 9px;\n          border: 1px solid #e3e5e8;\n          border-top: 0;\n          border-bottom-color: #fafafa;\n          margin-bottom: -1px;\n          background-color: #fafafa;\n          color: #576575; }\n        .ni_block_topbar_item.tabs .tab.has-errors {\n          color: #da5a47; }\n      .ni_block_topbar_item > .checkbox {\n        color: #29323d; }\n      .ni_block_topbar_item > .status {\n        margin: 10px 5px 0 0; }\n      .ni_block_topbar_item > a {\n        color: rgba(41, 50, 61, 0.25); }\n        .ni_block_topbar_item > a:hover {\n          color: #0d78f2; }\n  .ni_block_content {\n    padding: 14px;\n    border-top: 1px solid #e3e5e8;\n    background-color: #fafafa; }\n    .ni_block_content_tab {\n      display: none; }\n      .ni_block_content_tab.is-selected {\n        display: block; }\n      .ni_block_content_tab > .field {\n        margin: 18px 0; }\n  .ni_block.is-contracted .ni_block_topbar_item.tabs {\n    display: none; }\n  .ni_block.is-contracted .ni_block_content {\n    display: none; }\n  .ni_block.is-disabled .ni_block_content_tab {\n    pointer-events: none;\n    opacity: 0.5;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    user-select: none; }\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map