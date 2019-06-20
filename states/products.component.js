angular.
  module('store')
  .component('products', {
    templateUrl: 'states/products.template.html',
    bindings: {
      filters: '<?'
    },
    controller: ['$http', '$scope', '$window', function ($http, $scope, $window) {
      var $ctrl = this;
      $scope.loadingstate=true
      $http.get('https://world-demo.westus.cloudapp.azure.com/api/products?all=1').then((data, status) => {
        console.log(data.data)
        $scope.data = data.data
        $scope.loadingstate=false
      }, err => {
        console.log('Error with NODE SERVICE');
        $scope.loadingstate = false
      });
      this.$onChanges = function (changes) {
        console.log("Test", changes.filters.currentValue)
        let checked = "all=1"
        if (changes.filters) {
          $scope.filters = $window.angular.copy(changes.filters.currentValue);
          if ($scope.filters[0]) {
            var first=true
            for (var i = 0; i < $scope.filters[0].filter.length; i++) {
              if ($scope.filters[0].filter[i].checked)
                if (first) { 
                   checked = $scope.filters[0].name.toLowerCase() + '=' + $scope.filters[0].filter[i].name
                   first=false
                } else {
                  checked = checked + ',' + $scope.filters[0].filter[i].name
                }

            }
          }
        }
        //make API call
        $scope.loadingstate = true
        $http.get('https://world-demo.westus.cloudapp.azure.com/api/products/?' + checked).then((data, status) => {

          console.log(data.data)
          $scope.data = data.data
          $scope.loadingstate = false
        }, err => {
          console.log('Error with NODE SERVICE');
          $scope.loadingstate = false
        });

      }

      $scope.getFilterString = function(filter) {
        var filterstring = ''
        if ($scope.filters) {
          if ($scope.filters[0]) {
            var triggered = false
            for (var i = 0; i < $scope.filters[0].filter.length; i++) {
              if ($scope.filters[0].filter[i].checked) {
                
                if (!triggered) { 
                  filterstring = (filterstring==='' ? '' : filterstring + '; ') + $scope.filters[0].name.toLowerCase()
                  triggered = true
                }
                filterstring =  filterstring + ', ' + $scope.filters[0].filter[i].name
              }
            }
          }
        }
        if (filterstring === '') filterstring = 'All'
        return filterstring
      }

    }]
  })
