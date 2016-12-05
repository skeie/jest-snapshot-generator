const mkdirp = require('mkdirp'),
    createJestFile = require('./createJestTest'),
    fs = require('fs');

const generateFile = (filePath, filename, startPath) => {
    return new Promise((resolve, reject) => {
        checkIfReactFile(filePath)
            .then(({isReactFile, filePath}) => {
                if (isReactFile) {
                    const testPath = `${startPath}/__tests__`;
                    findTestFolder(testPath);
                    const testFileName = `${filename.replace(/\.[^/.]+$/, "")}-test.js`
                    const fileContent = createJestFile.createJestTest(filename);
                    createTestFile(`${testPath}/${testFileName}`, fileContent);
                    resolve();
                }
            })
            .catch(reject);
    });
}



function createTestFile(filename, content) {
    fs.open(filename, 'r', function (err, fd) {
        if (err) {
            fs.writeFile(filename, content, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            console.log("The file exists!");
        }
    });
}

function findTestFolder(path) {
    mkdirp(path, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log(`created test folder: ${path}`);
        }
    });
}


function checkIfReactFile(filePath) {
    if (filePath.indexOf('-test.js') > 0) {
        return Promise.resolve(false);
    }

    return new Promise((resolve, reject) => {
        fs.readFile(`./${filePath}`, function (err1, data) {
            if (err1) {
                console.error(err1);
                reject();
            } else {
                const res = {
                    filePath,
                    isReactFile: func(data)
                };
                resolve(res);
            }
        });
    });
}


function func(data) {

    console.log(data.indexOf('import React'), ' sap');


    // naive way of trying to check if the file contains jsx
    if (data.indexOf('import React') >= 0) {
        return true;
    } else {
        return false;
    }


}


module.exports = { generateFile };