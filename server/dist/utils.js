"use strict";

function hasPermission(user, permissionsNeeded) {
  var matchedPermissions = user.permissions.filter(function (permissionTheyHave) {
    return permissionsNeeded.includes(permissionTheyHave);
  });

  if (!matchedPermissions.length) {
    throw new Error("You do not have sufficient permissions\n\n      : ".concat(permissionsNeeded, "\n\n      You Have:\n\n      ").concat(user.permissions, "\n      "));
  }
}

exports.hasPermission = hasPermission;
//# sourceMappingURL=utils.js.map