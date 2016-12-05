const path = require('path'), fs = require('fs');
const { generateFile } = require('./generateFile');

let counter = 0;
function fromDir(startPath, fileExt) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    const result = Promise.all(files.map(file => {
        const filename = file;
        const filePath = path.join(startPath, file);
        const stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            fromDir(filePath, fileExt); //recurse
        }
        else if (filename.indexOf(fileExt) >= 0) {
            return generateFile(filePath, filename, startPath)
                .then(() => counter++)
                .catch(err => console.error(err));
        };
    })
    );

    result.then((list) => {
        console.log(`Finished with creating ${counter} snapshot files ${list.length}`);
    })


};


const projectPath = process.argv[2];

if (!projectPath) {
    throw Error("Not path given");
}
const ext = process.argv[3] || '.js';

fromDir(projectPath, ext);
