//This parser supposes the data in the following format: 02/07/13,H13,1488.5,1497,1478,1486.75,131635,202169
var moment = require('moment');

var parse = function (data, symbol) {
    var parsedArray = [];
    var dataString = data.replace(/\r/g, '');
    var splitLines = dataString.split('\n');
    splitLines.forEach(function (line) {
        var splitValues = line.split(',');
        if (splitValues[0]) {
            var lineObject = {};
            lineObject.date = moment(splitValues[0], 'MM/DD/YY').toDate();
            lineObject.symbol = symbol + splitValues[1];
            lineObject.open = parseFloat(splitValues[2]);
            lineObject.max = parseFloat(splitValues[3]);
            lineObject.min = parseFloat(splitValues[4]);
            lineObject.close = parseFloat(splitValues[5]);
            lineObject.volume = parseInt(splitValues[6]);
            lineObject.openInterest = parseInt(splitValues[7]);
            parsedArray.push(lineObject);
        }
    });

    return parsedArray;
};

exports.parse = parse;