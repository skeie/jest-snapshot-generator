# A jest snapshot script

## Installation

### This script runs through all of the files in a given path and creates a `/__tests__` folder containg jest snapshots if it thinks the files is a react component. It works with both React and React-native

## use
`jest-snapshot-generate [your top - level react folder] [file extension, .js by default]`

## Output

The output of the generated test files looks like this

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import NameOfYourComponent from '../NameOfYourComponent';
test('Should render NameOfYourComponent correctly', () => {
    const tree = renderer.create(
        <NameOfYourComponent /> 
    ).toJSON();
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



## TODO
* Add linting
* Add Example

