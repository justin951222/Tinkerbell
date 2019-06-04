'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _club = require('./club');

var _club2 = _interopRequireDefault(_club);

var _equipment = require('./equipment');

var _equipment2 = _interopRequireDefault(_equipment);

var _inventory = require('./inventory');

var _inventory2 = _interopRequireDefault(_inventory);

var _finance = require('./finance');

var _finance2 = _interopRequireDefault(_finance);

var _member = require('./member');

var _member2 = _interopRequireDefault(_member);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use('/account', _account2.default);
router.use('/club', _club2.default);
router.use('/equipment', _equipment2.default);
router.use('/inventory', _inventory2.default);
router.use('/finance', _finance2.default);
router.use('/member', _member2.default);
router.use('/calendar', _calendar2.default);

exports.default = router;