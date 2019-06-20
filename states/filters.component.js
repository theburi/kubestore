angular.
  module('store')
  .component('filters', {
    templateUrl: 'states/filters.template.html',
    bindings: {
      filters: '<',
      callback: '<'
    },
    controller: function($scope, $window, $http) {
      var $ctrl = this;

      $http.get('https://world-demo.westus.cloudapp.azure.com/api/products?filter=1').then((data, status) => {
        console.log("Data ",data.data)
        $ctrl.filters = data.data.filters
        $ctrl.filters[0].name="Brand"
        $ctrl.filters[1].name="Category"
      }, err => {
        console.log('Error with NODE SERVICE');
      });

      $ctrl.$onInit = function () {
        if ($ctrl.filters) {
          $ctrl.filters = $window.angular.copy($ctrl.filters);
        }
      } 

      $ctrl.$onChanges = function (changes) { 
        if (changes.filters) {
          $ctrl.filters = $window.angular.copy(changes.filters.currentValue); 
                  //make API call

            // $http.get('https://world-demo.westus.cloudapp.azure.com/api/products?filter=1').then((data, status) => {
            //   console.log("Data ",data)
            //   $ctrl.filters = data.data.filters
            // }, err => {
            //   console.log('Error with NODE SERVICE');
            // });
        }
      } 

      $scope.checked = function(val) {
        $ctrl.callback($window.angular.copy($ctrl.filters))
      }

    }
  });
