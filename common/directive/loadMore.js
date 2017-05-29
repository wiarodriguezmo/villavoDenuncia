/*global angular:true*/

angular.module("common").directive("loadMore", function () {
  var directive = {
    restrict: "A",
    link: function (scope, element, attr) {
      var $wind = element[0];
      element.bind("scroll", () => {
        if ($wind.scrollTop + $wind.offsetHeight + 100 >= $wind.scrollHeight) {
          if (!scope.$apply(attr.loadMore))
            $wind.scrollTop -= $wind.offsetHeight;
        }
      });
    }
  };
  return directive;
});
