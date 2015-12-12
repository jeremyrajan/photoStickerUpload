/*globals angular, Materialize */
'use strict';

/**
 * @ngdoc function
 * @name photoStickerAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the photoStickerAppApp
 */
angular.module('photoStickerAppApp')
  .controller('MainCtrl', function ($scope) {
    
    //init the modal for materialize
    angular.element(document).ready(function () {
      angular.element('.modal-trigger').leanModal();
    });
        
    
    //save the photo and display
    $scope.uploadPhoto = function (event) {
      var input = event.target;

      var reader = new FileReader();
      reader.onload = function () {
        var dataURL = reader.result;
        var output = '<div class="photo" style="background-image:url(' + dataURL + ')"></div>';
        angular.element('#photos').append(output);
        angular.element('.file-path').val('');
        Materialize.toast('Photo Uploaded!', 4000);
        angular.element('#start_over').removeClass('disabled');
        $scope.attachHoverDelete('.photo');
        $scope.attachDragEvent();
      };
      //set the image
      reader.readAsDataURL(input.files[0]);
    }
    
    
    //start over
    $scope.startOver = function () {
      angular.element('#photos').find('div').remove();
      angular.element('#stickers').find('li').remove();
      Materialize.toast('All reset!', 4000);
      angular.element('#start_over').addClass('disabled');
    }
    
    //validate btn upload for sticker
    $scope.validate = function () {
      var filePath = angular.element('#upload_form_st input[type=file]')[0].files.length;
      var title = angular.element('#sticker_title').val();
      if (title != '' && filePath != 0) {
        angular.element('#btn-sticker').removeClass('disabled');
      } else {
        angular.element('#btn-sticker').addClass('disabled');
      }

      $scope.errorMsg(title, filePath);
    }
    
    //save the sticker and display
    $scope.uploadSticker = function () {
      var filePath = angular.element('#upload_form_st input[type=file]')[0].files.length;
      var title = angular.element('#sticker_title').val();
      if (title == '' || filePath == 0) {
        $scope.errorMsg(title, filePath);
        return false;
      }
      var input = angular.element('#upload_form_st input[type=file]')[0];

      var reader = new FileReader();
      reader.onload = function () {
        var dataURL = reader.result;
        var output = '<li class="sticker"><img class="draggable" src="' + dataURL + '"/><p class="title">' + title + '</p><span class="delete" onclick="deleteItem(event)"><i class="fa fa-times"></i></span></li>';
        angular.element('#stickers').append(output);
        angular.element('.file-path').val('');
        angular.element('#sticker_title').val('');
        Materialize.toast('Sticker Uploaded!', 4000);
        angular.element('#start_over').removeClass('disabled');
        $scope.attachHoverDelete('.sticker');
        $scope.attachDragEvent();
      };
      //set the image
      reader.readAsDataURL(input.files[0]);
      //close the modal
      angular.element('#upload_sticker').closeModal();

    }

    $scope.attachHoverDelete = function (elem) {
      //hover methods for delete
      angular.element(elem).hover(function () {
        angular.element(this).find('.delete').fadeIn();
      }, function () {
        angular.element(this).find('.delete').fadeOut();
      });
    }

    $scope.errorMsg = function (title, filePath) {
      title == '' ? document.getElementsByClassName('error')[1].innerHTML = 'Value required!' : document.getElementsByClassName('error')[1].innerHTML = '';
      filePath == 0 ? document.getElementsByClassName('error')[0].innerHTML = 'Value required!' : document.getElementsByClassName('error')[0].innerHTML = '';
    }
    
    $scope.attachDragEvent = function () {
      angular.element(".draggable").draggable({
        // appendTo: "body",
        helper: "clone",
        revert: "invalid" 
      });
      angular.element(".photo").droppable({
        activeClass: "sticker_img",
        hoverClass: "sticker_img",
        accept: ".draggable",
        drop: function (event, ui) {
          var wrapper = angular.element('<div></div>');
          var delSticker = angular.element('<span class="delete" onclick="deleteItem(event)"><i class="fa fa-times"></i></span>');
          var elem = ui.helper[0].cloneNode();
          var elemStyle = angular.element(elem).attr('style');
          angular.element(elem).attr('style', '');
          angular.element(elem).addClass('sticker_img');
          wrapper.attr('style', elemStyle);
          wrapper.append(elem);
          wrapper.append(delSticker);
          this.appendChild(wrapper[0]);
        }
      });
    }
  });
  
  
//non-angular deletion of item
function deleteItem(event) {
  if (window.confirm("Do you really want to delete?")) {
    event.target.parentNode.parentNode.remove();
    Materialize.toast('Sticker deleted!', 4000);
  }
}

