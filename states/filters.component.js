angular.
  module('store')
  .component('filters', {
    templateUrl: 'states/filters.template.html',
    bindings: {
      filters: '<',
      callback: '<'
    },
    controller: function($scope, $window) {
      var $ctrl = this;

      $ctrl.$onInit = function () {
        if ($ctrl.filters) {
          $ctrl.filters = $window.angular.copy($ctrl.filters);
        }
      } 

      $ctrl.$onChanges = function (changes) { 
        if (changes.filters) {
          $ctrl.filters = $window.angular.copy(changes.filters.currentValue); 
        } 
      } 

      $scope.checked = function(val) {
        $ctrl.callback($ctrl.filters.filters)
      }

    }
  });
