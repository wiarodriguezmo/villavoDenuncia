/*global angular:true*/

var createContentCtrl = function (contentSrv,commonImageSrv,$state,$stateParams){
    var vm = this;

   vm.openImage = function(file) {
        if(file){
            if(file.type.indexOf("image") < 0){
                vm.alertContent = {
                    type: "danger",
                    message: "No es un formato de imagen válido"
                };
                return;
            }
            commonImageSrv.getFileReader(file)
            .then((dataImage) => {
                vm.file = file;
                vm.initialImage = dataImage;
            })
            .catch(() => {
                vm.alertContent = {
                    type: "danger",
                    message: "No se cargo la imagen"
                };
            });
        }
    };

   vm.crop = function() {
        vm.initialImage= null;
        vm.image = vm.imageCropped;
        vm.alertContent = {
            type: "success",
            message: "Imagen seleccionada correctamente"
        };
        vm.newImage = true;
    };

    vm.saveContent = function (){
        if(vm.id){
            vm.content.template.texto = vm.htmlContent;
            vm.content.approvalDate = "Pendiente";
            vm.content.state = 1;
            vm.content.$save().then(() => {
                vm.alertContent = {
                    type: "success",
                    message: "Contenido guardado exitosamente"
                };
                $state.go("publisher.list", {}, {location: "replace"});
            }, function() {
                vm.alertContent = {
                    type: "danger",
                    message: "No se guardaron los datos, inténtelo en unos minutos"
                };
            });
            if(vm.newImage){
               commonImageSrv.saveImageBase64(vm.id + ".png", vm.image, "publisher");
            }
        } else {
            contentSrv.saveContent(3,vm.content,vm.htmlContent,vm.imageCropped)
            .then(() => {
                vm.alertContent = {
                    type: "success",
                    message: "Contenido enviado para publicación"
                };
                $state.go("publisher.list", {}, {location: "replace"});
            })
            .catch(() => {
                vm.alertContent = {
                    type: "danger",
                    message: "No se guardaron los datos, inténtelo en unos minutos"
                };
            });
        }
    };
    vm.loadContents();
};
createContentCtrl.$inject = ["contentSrv","commonImageSrv","$state","$stateParams"];

angular.module("home").controller("createContentCtrl",createContentCtrl);
