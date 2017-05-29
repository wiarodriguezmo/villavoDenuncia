/*global angular:true*/
/*global firebase:true*/

var contentSrv = function($q, contentFact, commonImageSrv) {
  var responseContentSrv = {
    saveContent: function(content,image) {
      return $q((resolve, reject) => {
        $.getJSON('//freegeoip.net/json/?callback=?')
        .then((data) => {
          content.ip = data.ip;
          content.creationDate = firebase.database.ServerValue.TIMESTAMP;
          content.state = 1;
          content.nVisits = 0;
          if(image){
            content.typeContent=1;
            if(content.video)
              content.typeContent=3;
          } else {
            if(content.video)
              content.typeContent=2;
          }
          return contentFact.saveContent(content);
        })
        .then((key) => {
          if (image){
            commonImageSrv.saveImageBase64(key + ".png", image, "complaints");
          }
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
  };
  return responseContentSrv;
};
contentSrv.$inject = ["$q", "contentFact", "commonImageSrv"];
angular.module("home").factory("contentSrv", contentSrv);
