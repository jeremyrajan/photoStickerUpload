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
        var output = '<div class="photo"><img src="' + dataURL + '"/><span class="delete" onclick="deleteItem(event)"><i class="fa fa-times"></i></span></div>';
        angular.element('#photos').append(output);
        angular.element('.file-path').val('');
        Materialize.toast('Photo Uploaded!', 4000);
        angular.element('#start_over').removeClass('disabled');
        $scope.attachHoverDelete('.photo');
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
      var filePath = angular.element('#upload_form_st').find('.file-path').val();
      var title = angular.element('#sticker_title').val();
      if (title != '' && filePath != '') {
        angular.element('#btn-sticker').removeClass('disabled');
        angular.element('#btn-sticker').attr('data-ng-click', 'uploadSticker()');
      } else {
        angular.element('#btn-sticker').addClass('disabled');
      }
      
      $scope.errorMsg(title, filePath);
    }
    
    //save the sticker and display
    $scope.uploadSticker = function () {
      var filePath = angular.element('#upload_form_st').find('.file-path').val();
      var title = angular.element('#sticker_title').val();
      if (title == '' || filePath == '') {
        $scope.errorMsg(title, filePath);
        return false;
      }
      var input = angular.element('#upload_form_st input[type=file]')[0];

      var reader = new FileReader();
      reader.onload = function () {
        var dataURL = reader.result;
        var output = '<li class="draggable"><img src="' + dataURL + '"/><p class="title">' + title + '</p><span class="delete" onclick="deleteItem(event)"><i class="fa fa-times"></i></span></li>';
        angular.element('#stickers').append(output);
        angular.element('.file-path').val('');
        angular.element('#sticker_title').val('');
        Materialize.toast('Sticker Uploaded!', 4000);
        angular.element('#start_over').removeClass('disabled');
        $scope.attachHoverDelete('.draggable');
      };
      //set the image
      reader.readAsDataURL(input.files[0]);
      //close the modal
      angular.element('#upload_sticker').closeModal();

    }
    
    //drag and drop function start
    var dragged;
    angular.element(document).bind("dragstart", function (event) {
      // store a ref. on the dragged elem
      dragged = angular.element(event.target.parentNode.outerHTML.replace('li', 'div'))[0];
      angular.element(dragged).addClass('photo');
      // make it half transparent
      event.target.style.opacity = .5;
    });

    angular.element(document).bind("dragend", function (event) {
      // reset the transparency
      event.target.style.opacity = "";
    });

    /* events fired on the drop targets */
    angular.element(document).bind("dragover", function (event) {
      // prevent default to allow drop
      event.preventDefault();
    });

    angular.element(document).bind("dragenter", function (event) {
      // highlight potential drop target when the draggable element enters it
      if (event.target.className == "droppable") {
        event.target.style.background = "whitesmoke";
      }
    });

    angular.element(document).bind("dragleave", function (event) {
      // reset background of potential drop target when the draggable element leaves it
      if (event.target.className == "droppable") {
        event.target.style.background = "";
      }
    });

    angular.element(document).bind("drop", function (event) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if (event.target.className == "droppable") {
        event.target.style.background = "";
        event.target.appendChild(dragged);
        angular.element(event.target).find('.delete').remove();
      }
    });
    //drag drop end 
    
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
      filePath == '' ? document.getElementsByClassName('error')[0].innerHTML = 'Value required!' : document.getElementsByClassName('error')[0].innerHTML = '';
    }
  });
  
  
//non-angular deletion of item
function deleteItem(event) {
  if (window.confirm("Do you really want to delete?")) {
    event.target.parentNode.parentNode.remove();
    Materialize.toast('Sticker deleted!', 4000);
  }
}

