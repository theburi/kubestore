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
        let checked
        if (changes.filters) {
          $scope.filters = $window.angular.copy(changes.filters.currentValue); 

        }
        //make API call

          $http.get(`https://world-demo.westus.cloudapp.azure.com/api/products/?{checked}\=Amazon`).then((data, status) => {

            $scope.data = data.data
          }, err => {
            console.log('Error with NODE SERVICE');
          });

      }

    }]
  })
