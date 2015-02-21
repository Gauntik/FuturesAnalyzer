var barchartDataService = require('cloud/services/barchart-data-service.js');
var barchartDataParser = require('cloud/services/barchart-data-parser.js');

Parse.Cloud.job('DataFeed', function (request, status) {    
    barchartDataService
        .getData('ZC', '2014')
        .then(function (data) {
            var parsedData = barchartDataParser.parse(data, 'ZS');
            console.log('Number of parsed objects: ' + parsedData.length);
            barchartDataService.saveData(parsedData);
            status.success('Data updated successfully.');
        },
        function (data) {
            status.error('There was an error.');
        });
});
