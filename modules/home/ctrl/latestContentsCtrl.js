/*global angular:true*/

var latestContentsCtrl = function (contentSrv,contentFact){
  var vm = this;
  vm.inProcess = true;
  vm.lastestArticle = "";
  vm.complaints = [];
  vm.busy = false;

  vm.moreContents = function () {
      if (vm.busy) return vm.busy;
      vm.busy = true;
      if (vm.complaints.length == 0) {
        contentFact.getComplaintsLimit()
          .then((data) => {
            vm.complaints = data;
            if (!data.length == 0) vm.busy = false;
            else vm.completed = true;
            vm.lastestArticle = data[0].$id;
            vm.inProcess = false;
          });
      } else {
        contentFact.getComplaintsLimitKey(vm.lastestArticle)
          .then((data) => {
            vm.lastestArticle = data[0].$id;
            data.splice(data.length - 1);
            vm.complaints = vm.complaints.concat(data);
            if (!data.length == 0) vm.busy = false;
            else vm.completed = true;
            vm.inProcess = false;
          });
      }
      return vm.busy;
    };
    vm.moreContents();
};
latestContentsCtrl.$inject = ["contentSrv", "contentFact"];

angular.module("home").controller("latestContentsCtrl",latestContentsCtrl);
