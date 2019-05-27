angular.
  module('store')
  .component('products', {
    templateUrl: 'states/products.template.html',
      bindings: {
        filters: '<?'
    },
    controller: function($window) {
      var $ctrl = this; 
      
    }
  });
