var myApps = angular.module('collection', ['ngRoute']);

myApps.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/',
        {
            controller: "ListCtrl"
        }
    )
        .when('/wine/:id',
        {
            templateUrl: 'views/wine.html',
            controller: "DetailCtrl"
        }
    )
        .otherwise({redirectTo: '/'})
}]);

myApps.controller('ListCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('/cellar/rest/wines/').success(function(data, options) {
        var wines_list = [];
        $scope.winesObj = data;
        var numberOfWines = $scope.winesObj.length;
        for (var i = 0; i < numberOfWines; i++) {
            wines_list.push({
                wine: $scope.winesObj[i]
            });
        }

        $scope.wineNames = wines_list;
    });
}]);

myApps.controller('DetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.wineNumber = $routeParams.id-1;

    $http.get('/cellar/rest/wines').success(function(data, options) {
        var wines_list = [];
        $scope.winesObj = data;
        var numberOfWines = $scope.winesObj.length;
        for (var i = 0; i < numberOfWines; i++) {
            wines_list.push({
                wine: $scope.winesObj[i]
            });
        }

        $scope.wines_list = wines_list;

        console.log($scope.wines_list[$scope.wineNumber]);
    });
}]);
