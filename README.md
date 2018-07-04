# A jest snapshot generator script

This script runs through all of the files in a given path and creates a `/__tests__` folder containing jest snapshots if it thinks the file is a react component. It works with both React and React-native

## Installation

To get started, use yarn or npm to install the package:

`npm i jest-snapshot-generate -D` or `yarn add jest-snapshot-generate -D`

## use

`jest-snapshot-generate [your top - level react folder] [file extension, .js by default]`

If a file named `yourComponent-test.js` exists in your **tests** folder, the script will not do anything, just move along to the next file.

## Output

The output of the generated test files looks like this

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import NameOfYourComponent from '../NameOfYourComponent';
test('Should render NameOfYourComponent correctly', () => {
  const tree = renderer.create(<NameOfYourComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

## API

### First parameter is the path you want the script to search for react components.

The script also targets sub-folders by running recursively through them all.

### The second parameter is the file extension. By default its `.js`.

## Example

![Example](https://cl.ly/1I0p393i2611/Dec-09-2016%2011-28-37.gif)

## Tests

`npm test`

## Contributing

Feel free to improve :-)
