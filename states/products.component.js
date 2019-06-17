angular.
  module('store')
  .component('products', {
    templateUrl: 'states/products.template.html',
      bindings: {
        filters: '<?'
    },
    controller: function($window) {
      var $ctrl = this; 
      this.$onChanges = function (changes) { 
        console.log(changes.filters.currentValue)

        //make API call
        $http.get('https://world-demo.westus.cloudapp.azure.com/api/product').then((data, status) => {

        $ctrl.data = data
              }, err => {
                console.log('Error with NODE SERVICE');
              });
        
      }
    }
  });
