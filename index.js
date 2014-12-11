var midpoint = require('turf-midpoint');
var point = require('turf-point');
var distance = require('turf-distance');

module.exports = function(bbox){
  var squareBbox = [0,0,0,0];
  var lowLeft = point(bbox[0], bbox[1]);
  var topLeft = point(bbox[0], bbox[3]);
  var topRight = point(bbox[2], bbox[3]);
  var lowRight = point(bbox[2], bbox[1]);

  var horizontalDistance = distance(lowLeft, lowRight, 'miles');
  var verticalDistance = distance(lowLeft, topLeft, 'miles');
  if(horizontalDistance >= verticalDistance){
    squareBbox[0] = bbox[0];
    squareBbox[2] = bbox[2];
    var verticalMidpoint = midpoint(lowLeft, topLeft);
    squareBbox[1] = verticalMidpoint.geometry.coordinates[1] - ((bbox[2] - bbox[0]) / 2);
    squareBbox[3] = verticalMidpoint.geometry.coordinates[1] + ((bbox[2] - bbox[0]) / 2);
    return squareBbox;
  }
  else {
    squareBbox[1] = bbox[1];
    squareBbox[3] = bbox[3];
    var horzontalMidpoint = midpoint(lowLeft, lowRight);
    squareBbox[0] = horzontalMidpoint.geometry.coordinates[0] - ((bbox[3] - bbox[1]) / 2);
    squareBbox[2] = horzontalMidpoint.geometry.coordinates[0] + ((bbox[3] - bbox[1]) / 2);
    return squareBbox;
  }
}

