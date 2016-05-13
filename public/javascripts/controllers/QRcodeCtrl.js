angular.module('app')
  .controller('QRcodeController', function($scope,QRcodeService) {
    var qr = this;
    
    var onStart = function() {
      QRcodeService.getQRcodes().then(function(data) {
        qr.qrcodes = data.data;
      });
    };

    onStart();

  });
