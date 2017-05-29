/*global headerTemplate:true*/
/*global angular:true*/

var homeConfig = function($stateProvider,$validationProvider,toastrConfig){
  $stateProvider
  .state("home",{
    url: "/home",
    requireAuth : false,
    cache: true,
    views: {
      "header": {
        templateUrl: headerTemplate
      },
      "container@": {
        templateUrl: "app/modules/home/views/home.html"
      }
    }
  });
  angular.extend($validationProvider, {
    validCallback: function(element) {
      angular.element(element).parents(".form-group:first").removeClass("has-error");
    },
    invalidCallback: function(element) {
      angular.element(element).parents(".form-group:first").addClass("has-error");
    },
    resetCallback: function(element) {
      angular.element(element).parents(".form-group:first").removeClass("has-error");
    }
  });
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: "toast-container",
    maxOpened: 0,
    newestOnTop: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: "body"
  });
};
homeConfig.$inject = ["$stateProvider", "$validationProvider","toastrConfig"];
angular.module("home",[
    "ui.bootstrap",
    "ngFileUpload",
    "angular-img-cropper",
    "validation",
    "validation.rule",
    "toastr"
  ])
.config(homeConfig);
