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
                  //make API call
        $http.get('https://world-demo.westus.cloudapp.azure.com/api/filters').then((data, status) => {

          $ctrl.filters = data
                }, err => {
                  console.log('Error with NODE SERVICE');
                });
        } 
      } 

      $scope.checked = function(val) {
        $ctrl.callback($ctrl.filters.filters)
      }

    }
  });
