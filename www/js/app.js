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
    templateUrl: "templates/novo.html",
    controller : "NovoControle"

  });
  //os dois pontos indice é dado para indicar substituição na barra de tarefas. Passa um indice.
  $stateProvider.state("editar", {
    url:"/editar:indice",
    templateUrl: "templates/novo.html",
    controller: "EditCtrl"
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




// controler é o responsável por ter os métodos utilizados nas views - O scope permite que haja troca de info automatica entre a view e o controller
app.controller("ListaCtrl", function($scope, $state, TarefaService){

  $scope.tarefas = TarefaService.lista();

  $scope.concluir = function(indice){
    TarefaService.concluir(indice);
  };

  $scope.apagar = function(indice){
    TarefaService.apagar(indice);
  };

  $scope.editar = function(indice){
    $state.go("editar", {indice:indice});
  }

});


app.controller("NovoControle", function($scope, $state, TarefaService){

      $scope.tarefa= {
        "texto":'',
        "data": new Date(),
        "feita":false
      };


  $scope.salvar = function(){
    TarefaService.inserir($scope.tarefa);
    $state.go("lista");
  }

    $scope.cancelar = function(){
    $state.go("lista");

  }
});

app.controller("EditCtrl", function($scope, $state, $stateParams, TarefaService){

  $scope.indice= $stateParams.indice;
  //o angular copy é usado abaixo para evitar que as alterções, mesmo que não salvas, sejam de fato efetuadas.
  //Passagem por referencia (sem o copy) x Passagem por valor (com Copy)
  $scope.tarefa= angular.copy(TarefaService.obtem($scope.indice));
  //Por ele ter feito uma cópia do valor e atribuido à variável. Ela só será modificada após apertarem no botão salvar.
  $scope.salvar = function(){
    TarefaService.alterar($scope.indice, $scope.tarefa);
    $state.go("lista");
  };

  $scope.cancelar = function(){
    $state.go("lista");

  };
});




//SERVIÇOS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.factory("TarefaService", function(){

  //Transforma string em JSON ou vetor JSON vazio
  var tarefas = JSON.parse(window.localStorage.getItem("db_tarefas") || "[]");

  //Transforma JSON em string
  function persistencia(){
    window.localStorage.setItem("db_tarefas", JSON.stringify(tarefas));
  }
  return{
    lista: function(){
      return tarefas;
    },
    obtem: function(indice){
      return tarefas[indice];
    },
    inserir: function(tarefa){
      tarefas.push(tarefa);
      persistencia();
    },
    alterar: function(indice, tarefa){
      tarefas[indice] = tarefa;
      persistencia();
    },
    concluir: function(indice){
      tarefas[indice].feita = true;
      persistencia();

    },
    apagar: function(indice){
      tarefas.splice(indice, 1);
      persistencia();
    }
  }
});
