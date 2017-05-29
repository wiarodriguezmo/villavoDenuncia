/*global angular:true*/
/*global mainRef:true*/

var contentFact = function($q, $firebaseArray,$firebaseObject) {
    var responseContentFact = {
      getComplaintsLimit : () => $q((resolve, reject) => {
          $firebaseArray(
            mainRef.child("content/")
            .orderByKey()
            .limitToLast(6)
          ).$loaded(function (data) {
                if (data) {
                    resolve(data);
                } else {
                    reject("Error load Data");
                }
            });
      }),
      getComplaintsLimitKey: (key) => $q((resolve, reject) => {
          $firebaseArray(
              mainRef.child("content/")
              .orderByKey()
              .limitToLast(6)
              .endAt(key)
          ).$loaded(function (data) {
              if (data) {
                  resolve(data);
              } else {
                  reject("Error load Data");
              }
          });
      }),
      saveVisit: (idContent) => $q((resolve, reject) => {
            var result = null;
            mainRef.child("visits/" + idContent).transaction(
                function (num) {
                    result = num + 1;
                    return result;
                },
                function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        }),
        saveContent : (data) => $q((resolve) => {
          var key = mainRef.child("content/").push(data).key;
          resolve(key);
        })
    };
    return responseContentFact;
};
contentFact.$inject = ["$q","$firebaseArray","$firebaseObject"];
angular.module("home").factory("contentFact",contentFact);
