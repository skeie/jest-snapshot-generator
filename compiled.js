'use strict';

var _reactRenderToJson = require('react-render-to-json');

var _reactRenderToJson2 = _interopRequireDefault(_reactRenderToJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path'),
    fs = require('fs');


function fromDir(startPath, filter) {

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            readFile(filename);
            // isReactFile(filename);
            console.log('-- found: ', filename);
        };
    };
};

function isReactFile(filename) {
    console.log('filename', require('./' + filename).render);

    // require()
}

function readFile(filename) {
    var file = './td-callcall-new/src/getStarted.js';
    console.log('yolo', (0, _reactRenderToJson2.default)(require(file)));

    // if(renderToJSon(require(`./${filename}`))) {

    // } else {

    // }

    // console.log(renderToJSon(require(`./${filename}`)));

    // const input = fs.createReadStream(`./${filename}`);
    // readLines(input, func);
}

function func(data) {
    // if(data.contains('render')) 
    console.log('Line: ' + data);
}

function readLines(input, func) {
    var remaining = '';

    input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
        }
    });

    input.on('end', function () {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}

fromDir('./td-callcall-new/src', '.js');
