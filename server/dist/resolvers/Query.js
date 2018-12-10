"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('prisma-binding'),
    forwardTo = _require.forwardTo;

var _require2 = require('../utils'),
    hasPermission = _require2.hasPermission;

var Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me: function me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user({
      where: {
        id: ctx.request.userId
      }
    }, info);
  },
  users: function () {
    var _users = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(parent, args, ctx, info) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (ctx.request.userId) {
                _context.next = 2;
                break;
              }

              throw new Error('You must be logged in!');

            case 2:
              console.log(ctx.request.userId); // 2. Check if the user has the permissions to query all the users

              hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']); // 2. if they do, query all the users!

              return _context.abrupt("return", ctx.db.query.users({}, info));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function users(_x, _x2, _x3, _x4) {
      return _users.apply(this, arguments);
    }

    return users;
  }(),
  order: function () {
    var _order = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(parent, args, ctx, info) {
      var order, ownsOrder, hasPermissionToSeeOrder;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (ctx.request.userId) {
                _context2.next = 2;
                break;
              }

              throw new Error('You arent logged in!');

            case 2:
              _context2.next = 4;
              return ctx.db.query.order({
                where: {
                  id: args.id
                }
              }, info);

            case 4:
              order = _context2.sent;
              // 3. Check if the have the permissions to see this order
              ownsOrder = order.user.id === ctx.request.userId;
              hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');

              if (!(!ownsOrder && !hasPermissionToSeeOrder)) {
                _context2.next = 9;
                break;
              }

              throw new Error('You cant see this buddd');

            case 9:
              return _context2.abrupt("return", order);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function order(_x5, _x6, _x7, _x8) {
      return _order.apply(this, arguments);
    }

    return order;
  }(),
  orders: function () {
    var _orders = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(parent, args, ctx, info) {
      var userId;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = ctx.request.userId;

              if (userId) {
                _context3.next = 3;
                break;
              }

              throw new Error('you must be signed in!');

            case 3:
              return _context3.abrupt("return", ctx.db.query.orders({
                where: {
                  user: {
                    id: userId
                  }
                }
              }, info));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function orders(_x9, _x10, _x11, _x12) {
      return _orders.apply(this, arguments);
    }

    return orders;
  }()
};
module.exports = Query;
//# sourceMappingURL=Query.js.map