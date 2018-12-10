"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var _require = require('crypto'),
    randomBytes = _require.randomBytes;

var _require2 = require('util'),
    promisify = _require2.promisify;

var _require3 = require('../mail'),
    transport = _require3.transport,
    makeANiceEmail = _require3.makeANiceEmail;

var _require4 = require('../utils'),
    hasPermission = _require4.hasPermission;

var stripe = require('../stripe');

var Mutations = {
  createItem: function () {
    var _createItem = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(parent, args, ctx, info) {
      var item;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (ctx.request.userId) {
                _context.next = 2;
                break;
              }

              throw new Error('You must be logged in to do that!');

            case 2:
              _context.next = 4;
              return ctx.db.mutation.createItem({
                data: _objectSpread({
                  // This is how to create a relationship between the Item and the User
                  user: {
                    connect: {
                      id: ctx.request.userId
                    }
                  }
                }, args)
              }, info);

            case 4:
              item = _context.sent;
              console.log(item);
              return _context.abrupt("return", item);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createItem(_x, _x2, _x3, _x4) {
      return _createItem.apply(this, arguments);
    }

    return createItem;
  }(),
  updateItem: function updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    var updates = _objectSpread({}, args); // remove the ID from the updates


    delete updates.id; // run the update method

    return ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id
      }
    }, info);
  },
  deleteItem: function () {
    var _deleteItem = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(parent, args, ctx, info) {
      var where, item, ownsItem, hasPermissions;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              where = {
                id: args.id
              }; // 1. find the item

              _context2.next = 3;
              return ctx.db.query.item({
                where: where
              }, "{ id title user { id }}");

            case 3:
              item = _context2.sent;
              // 2. Check if they own that item, or have the permissions
              ownsItem = item.user.id === ctx.request.userId;
              hasPermissions = ctx.request.user.permissions.some(function (permission) {
                return ['ADMIN', 'ITEMDELETE'].includes(permission);
              });

              if (!(!ownsItem && !hasPermissions)) {
                _context2.next = 8;
                break;
              }

              throw new Error("You don't have permission to do that!");

            case 8:
              return _context2.abrupt("return", ctx.db.mutation.deleteItem({
                where: where
              }, info));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function deleteItem(_x5, _x6, _x7, _x8) {
      return _deleteItem.apply(this, arguments);
    }

    return deleteItem;
  }(),
  signup: function () {
    var _signup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(parent, args, ctx, info) {
      var password, user, token;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // lowercase their email
              args.email = args.email.toLowerCase(); // hash their password

              _context3.next = 3;
              return bcrypt.hash(args.password, 10);

            case 3:
              password = _context3.sent;
              _context3.next = 6;
              return ctx.db.mutation.createUser({
                data: _objectSpread({}, args, {
                  password: password,
                  permissions: {
                    set: ['USER']
                  }
                })
              }, info);

            case 6:
              user = _context3.sent;
              // create the JWT token for them
              token = jwt.sign({
                userId: user.id
              }, process.env.APP_SECRET); // We set the jwt as a cookie on the response

              ctx.response.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie

              }); // Finalllllly we return the user to the browser

              return _context3.abrupt("return", user);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function signup(_x9, _x10, _x11, _x12) {
      return _signup.apply(this, arguments);
    }

    return signup;
  }(),
  signin: function () {
    var _signin = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(parent, _ref, ctx, info) {
      var email, password, user, valid, token;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              email = _ref.email, password = _ref.password;
              _context4.next = 3;
              return ctx.db.query.user({
                where: {
                  email: email
                }
              });

            case 3:
              user = _context4.sent;

              if (user) {
                _context4.next = 6;
                break;
              }

              throw new Error("No such user found for email ".concat(email));

            case 6:
              _context4.next = 8;
              return bcrypt.compare(password, user.password);

            case 8:
              valid = _context4.sent;

              if (valid) {
                _context4.next = 11;
                break;
              }

              throw new Error('Invalid Password!');

            case 11:
              // 3. generate the JWT Token
              token = jwt.sign({
                userId: user.id
              }, process.env.APP_SECRET); // 4. Set the cookie with the token

              ctx.response.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 365
              }); // 5. Return the user

              return _context4.abrupt("return", user);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function signin(_x13, _x14, _x15, _x16) {
      return _signin.apply(this, arguments);
    }

    return signin;
  }(),
  signout: function signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return {
      message: 'Goodbye!'
    };
  },
  requestReset: function () {
    var _requestReset = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(parent, args, ctx, info) {
      var user, randomBytesPromiseified, resetToken, resetTokenExpiry, res, mailRes;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return ctx.db.query.user({
                where: {
                  email: args.email
                }
              });

            case 2:
              user = _context5.sent;

              if (user) {
                _context5.next = 5;
                break;
              }

              throw new Error("No such user found for email ".concat(args.email));

            case 5:
              // 2. Set a reset token and expiry on that user
              randomBytesPromiseified = promisify(randomBytes);
              _context5.next = 8;
              return randomBytesPromiseified(20);

            case 8:
              resetToken = _context5.sent.toString('hex');
              resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

              _context5.next = 12;
              return ctx.db.mutation.updateUser({
                where: {
                  email: args.email
                },
                data: {
                  resetToken: resetToken,
                  resetTokenExpiry: resetTokenExpiry
                }
              });

            case 12:
              res = _context5.sent;
              _context5.next = 15;
              return transport.sendMail({
                from: 'wes@wesbos.com',
                to: user.email,
                subject: 'Your Password Reset Token',
                html: makeANiceEmail("Your Password Reset Token is here!\n      \n\n\n      <a href=\"".concat(process.env.FRONTEND_URL, "/reset?resetToken=").concat(resetToken, "\">Click Here to Reset</a>"))
              });

            case 15:
              mailRes = _context5.sent;
              return _context5.abrupt("return", {
                message: 'Thanks!'
              });

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function requestReset(_x17, _x18, _x19, _x20) {
      return _requestReset.apply(this, arguments);
    }

    return requestReset;
  }(),
  resetPassword: function () {
    var _resetPassword = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(parent, args, ctx, info) {
      var _ref2, _ref3, user, password, updatedUser, token;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(args.password !== args.confirmPassword)) {
                _context6.next = 2;
                break;
              }

              throw new Error("Yo Passwords don't match!");

            case 2:
              _context6.next = 4;
              return ctx.db.query.users({
                where: {
                  resetToken: args.resetToken,
                  resetTokenExpiry_gte: Date.now() - 3600000
                }
              });

            case 4:
              _ref2 = _context6.sent;
              _ref3 = _slicedToArray(_ref2, 1);
              user = _ref3[0];

              if (user) {
                _context6.next = 9;
                break;
              }

              throw new Error('This token is either invalid or expired!');

            case 9:
              _context6.next = 11;
              return bcrypt.hash(args.password, 10);

            case 11:
              password = _context6.sent;
              _context6.next = 14;
              return ctx.db.mutation.updateUser({
                where: {
                  email: user.email
                },
                data: {
                  password: password,
                  resetToken: null,
                  resetTokenExpiry: null
                }
              });

            case 14:
              updatedUser = _context6.sent;
              // 6. Generate JWT
              token = jwt.sign({
                userId: updatedUser.id
              }, process.env.APP_SECRET); // 7. Set the JWT cookie

              ctx.response.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 365
              }); // 8. return the new user

              return _context6.abrupt("return", updatedUser);

            case 18:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function resetPassword(_x21, _x22, _x23, _x24) {
      return _resetPassword.apply(this, arguments);
    }

    return resetPassword;
  }(),
  updatePermissions: function () {
    var _updatePermissions = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(parent, args, ctx, info) {
      var currentUser;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (ctx.request.userId) {
                _context7.next = 2;
                break;
              }

              throw new Error('You must be logged in!');

            case 2:
              _context7.next = 4;
              return ctx.db.query.user({
                where: {
                  id: ctx.request.userId
                }
              }, info);

            case 4:
              currentUser = _context7.sent;
              // 3. Check if they have permissions to do this
              hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']); // 4. Update the permissions

              return _context7.abrupt("return", ctx.db.mutation.updateUser({
                data: {
                  permissions: {
                    set: args.permissions
                  }
                },
                where: {
                  id: args.userId
                }
              }, info));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function updatePermissions(_x25, _x26, _x27, _x28) {
      return _updatePermissions.apply(this, arguments);
    }

    return updatePermissions;
  }(),
  addToCart: function () {
    var _addToCart = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(parent, args, ctx, info) {
      var userId, _ref4, _ref5, existingCartItem;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              // 1. Make sure they are signed in
              userId = ctx.request.userId;

              if (userId) {
                _context8.next = 3;
                break;
              }

              throw new Error('You must be signed in soooon');

            case 3:
              _context8.next = 5;
              return ctx.db.query.cartItems({
                where: {
                  user: {
                    id: userId
                  },
                  item: {
                    id: args.id
                  }
                }
              });

            case 5:
              _ref4 = _context8.sent;
              _ref5 = _slicedToArray(_ref4, 1);
              existingCartItem = _ref5[0];

              if (!existingCartItem) {
                _context8.next = 11;
                break;
              }

              console.log('This item is already in their cart');
              return _context8.abrupt("return", ctx.db.mutation.updateCartItem({
                where: {
                  id: existingCartItem.id
                },
                data: {
                  quantity: existingCartItem.quantity + 1
                }
              }, info));

            case 11:
              return _context8.abrupt("return", ctx.db.mutation.createCartItem({
                data: {
                  user: {
                    connect: {
                      id: userId
                    }
                  },
                  item: {
                    connect: {
                      id: args.id
                    }
                  }
                }
              }, info));

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function addToCart(_x29, _x30, _x31, _x32) {
      return _addToCart.apply(this, arguments);
    }

    return addToCart;
  }(),
  removeFromCart: function () {
    var _removeFromCart = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(parent, args, ctx, info) {
      var cartItem;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return ctx.db.query.cartItem({
                where: {
                  id: args.id
                }
              }, "{ id, user { id }}");

            case 2:
              cartItem = _context9.sent;

              if (cartItem) {
                _context9.next = 5;
                break;
              }

              throw new Error('No CartItem Found!');

            case 5:
              if (!(cartItem.user.id !== ctx.request.userId)) {
                _context9.next = 7;
                break;
              }

              throw new Error('Cheatin huhhhh');

            case 7:
              return _context9.abrupt("return", ctx.db.mutation.deleteCartItem({
                where: {
                  id: args.id
                }
              }, info));

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function removeFromCart(_x33, _x34, _x35, _x36) {
      return _removeFromCart.apply(this, arguments);
    }

    return removeFromCart;
  }(),
  createOrder: function () {
    var _createOrder = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(parent, args, ctx, info) {
      var userId, user, amount, charge, orderItems, order, cartItemIds;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              // 1. Query the current user and make sure they are signed in
              userId = ctx.request.userId;

              if (userId) {
                _context10.next = 3;
                break;
              }

              throw new Error('You must be signed in to complete this order.');

            case 3:
              _context10.next = 5;
              return ctx.db.query.user({
                where: {
                  id: userId
                }
              }, "{\n      id\n      name\n      email\n      cart {\n        id\n        quantity\n        item { title price id description image largeImage }\n      }}");

            case 5:
              user = _context10.sent;
              // 2. recalculate the total for the price
              amount = user.cart.reduce(function (tally, cartItem) {
                return tally + cartItem.item.price * cartItem.quantity;
              }, 0);
              console.log("Going to charge for a total of ".concat(amount)); // 3. Create the stripe charge (turn token into $$$)

              _context10.next = 10;
              return stripe.charges.create({
                amount: amount,
                currency: 'USD',
                source: args.token
              });

            case 10:
              charge = _context10.sent;
              // 4. Convert the CartItems to OrderItems
              orderItems = user.cart.map(function (cartItem) {
                var orderItem = _objectSpread({}, cartItem.item, {
                  quantity: cartItem.quantity,
                  user: {
                    connect: {
                      id: userId
                    }
                  }
                });

                delete orderItem.id;
                return orderItem;
              }); // 5. create the Order

              _context10.next = 14;
              return ctx.db.mutation.createOrder({
                data: {
                  total: charge.amount,
                  charge: charge.id,
                  items: {
                    create: orderItems
                  },
                  user: {
                    connect: {
                      id: userId
                    }
                  }
                }
              });

            case 14:
              order = _context10.sent;
              // 6. Clean up - clear the users cart, delete cartItems
              cartItemIds = user.cart.map(function (cartItem) {
                return cartItem.id;
              });
              _context10.next = 18;
              return ctx.db.mutation.deleteManyCartItems({
                where: {
                  id_in: cartItemIds
                }
              });

            case 18:
              return _context10.abrupt("return", order);

            case 19:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function createOrder(_x37, _x38, _x39, _x40) {
      return _createOrder.apply(this, arguments);
    }

    return createOrder;
  }()
};
module.exports = Mutations;
//# sourceMappingURL=Mutation.js.map