"use strict";var easyCards=angular.module("easycardsApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.router","firebase"]).factory("$auth",["$firebaseAuth","$backendUrl",function(a,b){return a(new Firebase(b))}]).factory("$backendUrl",function(){return"https://easycards.firebaseio.com"}).config(["$locationProvider","$routeProvider","$stateProvider","$urlRouterProvider",function(a,b,c,d){d.otherwise("/"),c.state("home",{url:"/",templateUrl:"views/main.html",controller:"MainController"}).state("logIn",{url:"/login",templateUrl:"views/security/login.html",controller:"SecurityController"}).state("logOut",{url:"/logout",controller:["$auth","$state",function(a,b){a.$logout(),b.go("logIn")}]}).state("home.userBooks",{url:"user/{userId}/books",controller:"BookController",templateUrl:"views/vocabulary/list.html"})}]);!function(a){function b(a,b){a.href=b.href,this.$scope=a,this.init()}b.prototype={init:function(){var a=new Firebase("https://easycards.firebaseio.com/"),b=this;new FirebaseSimpleLogin(a,function(a,c){b.$scope.$apply(function(){b.$scope.user=c,c||b.$state.go("logIn")})})}},b.$inject=["$scope","$state"],a.controller("MainController",b)}(easyCards),function(a){function b(a,b,c,d){return b.vm=this,this.$scope=b,this.$rootScope=a,this.auth=c,this.$state=d,this}b.prototype={logIn:function(a){var b=this;a&&this.auth.$login("password",a).then(function(a){localStorage.setItem("user",JSON.stringify(a)),b.$state.go("home.userBooks",{userId:a.id})},function(a){console.error("Login failed: ",a)})}},b.$inject=["$rootScope","$scope","$auth","$state"],a.controller("SecurityController",b)}(easyCards),function(a){function b(a,b){this._firebase=a,this.url=b}b.prototype={list:function(a){return this._firebase(new Firebase(this.url+"/user/"+a+"/_vocabularies"))}},b.$inject=["$firebase","$backendUrl"],a.service("BookService",b)}(easyCards),function(a){function b(a,b){return this._bookService=b,this.$scope=a,this.init(),this}b.prototype={loadItems:function(){this.$scope.items=this._bookService.list(this.$scope.user.id)},init:function(){this.$scope.user=JSON.parse(localStorage.getItem("user")),this.$scope.user&&this.loadItems()}},b.$inject=["$scope","BookService"],a.controller("BookController",b)}(easyCards);