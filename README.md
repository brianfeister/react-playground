

# Setting Up

```
# Set the proper node version in your terminal
nvm install
nvm use

# Install yarn
npm install -g yarn

# Install dependencies
yarn install

```


# Running

```
npm start
```


# Directory Structure

**src/actions** - Dispatchable actions (including thunks and thunk logic).
**src/components** - React components.
**src/connectors** - HOCs that connect a component to the store.
**src/selectors** - Selectors to slice the store and memoize it.
**src/store** - The redux store.


# Style Guide


# Actions


# Redux and State

## High Level

The general approach to state binding is to build components with
standard connect middleware using specialized bundles of selectors and
actions creators.

For example (syntax TBD):

```javascript
'use strict';

import { connect } from 'react-redux';
import { reselect } from 'reselect';

import { fieldValueSelector } from 'selectors/forms';
import { fieldMetadataSelector } from 'selectors/forms';

export default connect((state, { formName, fieldName }) => {
  return {
    value: fieldValueSelector({ formName, fieldName }),
    metadata: fieldMetadataSelect({ formName, fieldName })
  }
}, (dispatch, { formName }) => {
  return {
    onChange: value => fieldActions.setValue({ formName, fieldName, value })
  };
})(({ value, onChange }) => (<input value={value} onChange={onChange}>))


```



## Low Level

### Store Setup and the Generic Action Type

There is a single reducer and action type, the "generic" action type. All actions that are dispatched to the reducer (non IOC/non thunk actions) are of this type. The generic action type is a list of low-level "operations" to be performed on the store. These operations are as follows:

**set** - Set a value at a path.
**merge** - Merge in a value at a path.
**swap** - Swap the value of two paths.
**splice** - Perform a splice operation (standard javascript splice) on an array at a path.

Action creators generate a list of operations. For example, a form field "changeValue" action might set the value of the form field and set the field metadata to dirty.
