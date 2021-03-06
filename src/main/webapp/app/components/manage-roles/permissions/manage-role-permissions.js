(function() {
    'use strict';

    var components = angular.module('lavagna.components');

    components.component('lvgManageRolePermissions', {
        bindings: {
            roleName: '<',
            roleDesc: '<',
            permissionsByCategory: '<permissions',
            project: '<',
            submit: '&', // $permissionsToEnable
            cancel: '&' // 
        },
        controller: [ManageRolePermissionsController],
        templateUrl: 'app/components/manage-roles/permissions/manage-role-permissions.html'
    });

    function ManageRolePermissionsController() {
        var ctrl = this;
        
        //
        ctrl.save = save;
        ctrl.hasChanged = hasChanged;
        ctrl.hasPermission = hasPermission;
        ctrl.hasCategory = hasCategory;
        //
        
        ctrl.$onInit = function() {
        	ctrl.assignStatus = {};
        }

        function save() {
            var permissionsToEnable = [];
            angular.forEach(ctrl.assignStatus, function(value, key) {
                if(value.checked) {
                    permissionsToEnable.push(key);
                }
            });
            ctrl.submit({$permissionsToEnable: permissionsToEnable});
        }

        function hasChanges() {
            var result = false;

            //perhaps slower than foreach probably, but avoid traversing the entire object
            for(var key in ctrl.assignStatus) {
                var value = ctrl.assignStatus[key];
                var change = (value.checked != ctrl.hasPermission(key, ctrl.roleDesc.roleAndPermissions));
                if(change) { return true; }
            }
            return false;
        }

        function hasChanged(permission, assignedPermissions, currentStatus) {
            var status = ctrl.hasPermission(permission, assignedPermissions);
            return status != currentStatus;
        }

        /* TODO could remove the linear probe... */
        function hasPermission(permission, assignedPermissions) {
            if(permission == undefined || assignedPermissions == undefined) {
                return;
            }

            for(var i = 0; i<assignedPermissions.length;i++) {
                if(assignedPermissions[i].permission === permission) {
                    return true;
                }
            }
            return false;
        }

        function hasCategory(categoryName) {
            for(var p in ctrl.permissionsByCategory) {
                if(p == categoryName) {
                    return true;
                }
            }
            return false;
        }
    };
})();
