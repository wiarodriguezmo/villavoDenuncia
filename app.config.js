/*global firebase:true*/
/*global angular:true*/
/*global localStorage:true*/

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAbLgiE10gjDNC1djKxR5i8X3tmXiP37Mg",
    authDomain: "pjafirebase.firebaseapp.com",
    databaseURL: "https://pjafirebase.firebaseio.com",
    projectId: "pjafirebase",
    storageBucket: "pjafirebase.appspot.com",
    messagingSenderId: "51843425341"
  };
  firebase.initializeApp(config);

const mainRef = firebase.database().ref();
const headerTemplate = "app/modules/home/views/header.html";

(function() {

	var vdRun = function($rootScope, $state, $firebaseAuth) {
		const listenRootScope = $rootScope.$on("$stateChangeStart", function(event, toState) {

		});
	};
	vdRun.$inject = ["$rootScope", "$state", "$firebaseAuth"];
	angular
		.module("vd", ["ui.router",
			"firebase",
			"ui.bootstrap",
      "common",
			"check",
			"home"
		])
		.run(vdRun);
})();
