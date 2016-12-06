const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should()
chai.use(chaiAsPromised)

const { generateFile } = require('../generateFile');

it('should return 0 if the file is not a React component', () => {
    return generateFile('./test/notReactComp.js', 'filename', 'filename').should.eventually.equal(0);
});

it('should return 1 if the file is a React component', () => {
    return generateFile('./test/reactComp.js', 'filename', 'filename').should.eventually.equal(1);
});