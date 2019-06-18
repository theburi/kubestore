angular.
  module('store')
  .component('products', {
    templateUrl: 'states/products.template.html',
    bindings: {
      filters: '<?'
    },
    controller: [ '$http', '$scope', '$window', function ($http, $scope, $window) {
      var $ctrl = this;

      $http.get('https://world-demo.westus.cloudapp.azure.com/api/products?all=1').then((data, status) => {
        console.log(data.data)
        $scope.data = data.data
      }, err => {
        console.log('Error with NODE SERVICE');
      });
      this.$onChanges =  function (changes) {
        console.log("Test", changes.filters.currentValue)
        let checked = "all=1"
        if (changes.filters) {
          $scope.filters = $window.angular.copy(changes.filters.currentValue); 
          if ($scope.filters[0]) {
            if ($scope.filters[0].filter[0].checked)
              checked = "brand=Amazon"
          }
        }
        //make API call

          $http.get('https://world-demo.westus.cloudapp.azure.com/api/products/?'+ checked).then((data, status) => {

            $scope.data = data.data
          }, err => {
            console.log('Error with NODE SERVICE');
          });

      }

    }]
  })
