var serviceUrl = 'http://customer1.barchart.com/cgi-bin/mri/webplt.exe?data=a?page=chart&sym=ZS&cc=DX&mon=&year=&data=A&date=022015&size=e&den=med&jav=asc&expm=0&sly=N&ivol=I&ch1=011&arga=&argb=&argc=&ov1=&argd=&arge=&argf=&ch2=&argg=&argh=&argi=&ov2=&argj=&argk=&argl=&code=xman&org=com&crea=';

var getData = function (symbol, year) {
    return Parse.Cloud.httpRequest({
        url: serviceUrl,
        followRedirects: true
    })
    .then(function (httpResponse) {        
        return httpResponse.text;
    },
    function (httpResponse) {
        console.error('Request failed with response code: ' + httpResponse.status);
        return '';
    });
}

var saveData = function (dataArray) {
    var FuturesContract = Parse.Object.extend('FuturesContract');
    dataArray.forEach(function (object) {
        var futuresContract = new FuturesContract();
        futuresContract.set('date', object.date);
        futuresContract.set('symbol', object.symbol);
        futuresContract.set('open', object.open);
        futuresContract.set('max', object.max);
        futuresContract.set('min', object.min);
        futuresContract.set('close', object.close);
        futuresContract.set('volume', object.volume);
        futuresContract.set('openInterest', object.openInterest);

        futuresContract.save(null, 
            function (futuresContract) {
                console.log('New object created with id: ' + futuresContract.id);
            },
            function (futuresContract, error) {
                console.log('Failed to create new object with error code: ' + error.message);
            });
    });
};

exports.getData = getData;
exports.saveData = saveData;