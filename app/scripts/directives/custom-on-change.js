'use strict';

/**
 * @ngdoc directive
 * @name photoStickerAppApp.directive:customOnChange
 * @description
 * # customOnChange
 */
angular.module('photoStickerAppApp')
  .directive('customOnChange', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeHandler);
      }
    };
  });
