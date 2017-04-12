// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('desaparecidos_app', ['ionic']);

//ESTADOS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state("lista", {
    url:"/lista",
    templateUrl: "templates/lista.html"
  });

  $stateProvider.state("novo", {
    url:"/novo",
    templateUrl: "templates/novo.html"
  });
  //os dois pontos indice é dado para indicar substituição na barra de tarefas. Passa um indice.
  $stateProvider.state("editar", {
    url:"/editar:indice",
    templateUrl: "templates/novo.html"
  });
  $urlRouterProvider.otherwise("/lista");

});



//MAIN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


//CONTROLLERS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



var tarefas =[]; //descobrir como tirar isso depois

// controler é o responsável por ter os métodos utilizados nas views - O scope permite que haja troca de info automatica entre a view e o controller
app.controller("ListaCtrl", function($scope, $state){
  $scope.tarefas =tarefas;

  $scope.concluir = function(indice){
    $scope.tarefas[indice].feita=true;
  };

  $scope.apagar = function(indice){
    $scope.tarefas.splice(indice, 1); //ele apaga um elemento do json
  };

  $scope.editar = function(indice){
    $state.go("editar", {indice:indice});
  }

});


app.controller("NovoControle", function($scope, $state){

      $scope.tarefa= {
        "texto":'',
        "data": new Date(),
        "feita":false
      };


  $scope.salvar = function(){
    tarefas.push($scope.tarefa);
    $state.go("lista");
  }

    $scope.cancelar = function(){
    $state.go("lista");

  }
});

app.controller("EditCtrl", function($scope, $state, $stateParams){

  $scope.indice= $stateParams.indice;
});
