/*global angular:true*/

var createContentCtrl = function (contentSrv,commonImageSrv,$state,$stateParams,$toastr){
  var vm = this;
  vm.content = {};
  vm.activeAbstract = (option) => {
    vm.addAbstract = option;
    vm.addAbstractButtonSelected = true;
    if(option)
    $toastr.info("Resumen habilitado");
  }

  vm.activeImage = (option) => {
    vm.addImageButtonSelected = true;
    vm.addImage = option;
    if(option)
    $toastr.info("Adjuntar imagen habilitado");
  }

  vm.activeVideo = (option) => {
    vm.addVideo = option;
    vm.addVideoButtonSelected = true;
    if(option)
    $toastr.info("Video habilitado, recuerde que el vídeo debe estar embebido");
  }

  vm.openImage = (file) => {
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

  vm.crop = () => {
    vm.initialImage= null;
    vm.image = vm.imageCropped;
    vm.alertContent = {
      type: "success",
      message: "Imagen seleccionada correctamente"
    };
    vm.newImage = true;
  };

  vm.saveContent = () => {
    contentSrv.saveContent(vm.content,vm.image)
    .then(() => {
      $toastr.success("¡Denuncia publicada!");
    })
    .catch(() => {
      vm.alertContent = {
        type: "danger",
        message: "No se guardaron los datos, inténtelo en unos minutos"
      };
    });
  };
};
createContentCtrl.$inject = ["contentSrv","commonImageSrv","$state","$stateParams","toastr"];

angular.module("home").controller("createContentCtrl",createContentCtrl);
