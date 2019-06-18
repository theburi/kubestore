
'use strict';

angular.module('store', [
  'ui.router',
  'ngMaterial'
]).controller('main', function ($scope) {

  $scope.data = {
    filters: [
      { name: 'brand',
        filter: [
        { name: 'Amazon', checked: false },
        { name: 'Nike', checked: false }] },
      {filter: [
        { name: 'Price 0-10', checked: false },
        { name: 'Price 10-100', checked: false }] }
    ]
  }
  $scope.filters = {};

  $scope.callback = function(newFilters){

    $scope.filters = newFilters;
  }

});




