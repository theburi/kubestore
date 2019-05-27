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
        
      }
    }
  });
