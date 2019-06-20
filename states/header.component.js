angular.
  module('store')
  .component('headersection', {
    template: '<h2 flex style="padding-left: 20px">Kube Store</h2> \
     <div style="padding-right: 20px"></div>',
    controller: function() {
      this.user = 'world';
    }
  });
