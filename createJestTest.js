function createJestTest(filename) {
    const fileWithOutExt = filename.replace(/\.[^/.]+$/, "");
    const readableFilename = capitalizeFirstLetter(fileWithOutExt);
    return (
`import React from 'react';
import renderer from 'react-test-renderer';
import ${readableFilename} from '../${readableFilename}';
test('Should render ${fileWithOutExt} correctly', () => {
    const tree = renderer.create(
        <${fileWithOutExt} /> 
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
    `
    );

}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)


module.exports = { createJestTest };