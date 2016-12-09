const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs');
const del = require('del');

chai.should()
chai.use(chaiAsPromised)

const TEST_PATH = '__tests__';
const REACT_COMP = 'reactComp'
const { generateFile } = require('../generateFile');
describe('Test that it only generates snapshots for react files', function () {

    after((done) => {
        del(`${__dirname}/${TEST_PATH}`).then(paths => {
            done();
        });
    });

    it('should return 0 if the file is not a React component', () => {
        return generateFile(`${__dirname}/notReactComp.js`, 'notReactComp', __dirname).should.eventually.equal(0);
    });

    it('should return 1 if the file is a React component', () => {
        return generateFile(`${__dirname}/${REACT_COMP}.js`, REACT_COMP, __dirname).should.eventually.equal(1);
    });

    it('should contain a snapshot test file', () => {
        chai.expect(fs.existsSync(`${__dirname}/${TEST_PATH}/${REACT_COMP}-test.js`)).to.be.true;
    })

});