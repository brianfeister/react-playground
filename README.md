

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

// common module
common.lib.fetch.decorators
{ toJson }, { withJson }, { toApi }, { trapStatus }



common.lib.fetch.errors

common.lib.api
common.lib.auth

// auth module
auth.errors
auth.selectors.getToken()

// api module

api.lib.http.send
api.lib.http.errors
api.lib.auth
api.lib.auth.login
api.lib.errors

api.selectors.getToken
api.lib.

api.lib.errors
api.lib.send(state, request)
api.lib.sign(state, request)
api.selectors.getToken




# Application Structure

# Base Folders

`activities`: TBD.
`auth`: All things auth.
`collections`: Related to managing collections of resources.
`common`: Common operations with no concept of state. Vanilla javascript.
`containers`: General connected UI components.
`core`: Generic operations  that know about state.
`forms`: All things related to forms/fields.
`resources`: All things related to managing resources.

Each of the base folders has/can have the following folders:

`actions`: A module that exports named action creators.
`lib`: A folder that contains modules that export supporting libraries.
`components`: A folder that contains modules that export components.
`selectors`: A module that exports named selectors.


# Seperation of Concerns

## The Ground Floor: Actions and Selectors

The only pieces that know how the state is stored are selectors and
actions. Only actions know how to transform one state to the next.

No component, library, or any other logic ever needs to know how the
state is encoded or how to change the state.

# Connected Components Stay in Their Slice

A connected component uses selectors and actions to get the piece of state its managing and to change the piece of state its managing. Generally, a component shouldn't care about anything but its slice of state.


## Special Actions

There will be cases where we want to connect a component to state outside of its purposed slice. For each case that arises for cross component state sharing, we need to consider if the concern is generic enough to use the generic methods.

If its something that involves making an assumption about how a component internally stores its state its NOT generic. If its something core to the UI like submitting a form or reading a text field, its pretty generic.

For cases that aren't generic, special actions and selectors should be created for use case, especially if its going to be replicated.

Consider the example of setting breadcrumb text from somewhere deep in the DOM. Only the navbar should be in charge of how that text is stored, so a special selector and action for managing the breadcrumb text would be in order.:

```

// outside of navbar component noone should no how navbar bread crumbs work


// NO!!!

import { getValue } from 'containers/selectors';
import { setValue } from 'containers/actions';

dispatch(setValue({
  namespace: 'navbar',
  path: 'subnav.breadcrumb.text',
  value: getValue({
    namespace: 'navbar'
  }).subnav.breadcrumb.text; + 'Some Text'
}));



// YES!!! A new generic action/selector.

import { getBreadCrumbText } from 'core/selectors';
import { setBreadCrumbText } from 'core/actions';


dispatch(setBreadCrumbText(getBreadCrumbText() + 'Some Text'));


```








# Common vs Core


### Token Signing as an Example

`common/lib/auth { sign }`: Sign a request with the PROVIDED API token. This method encapsulates the business logic of signing a request, with no awareness of where the token comes from. If we change from `Authorization: Bearer` to a custom header its a one line change for the whole UI.


`core/lib/auth { sign }`: This method uses a selector to get the token and hands the token and the request off to the signing method. It marries the `state` to the `business`. 


The implementation details are stored in common. The common signing method can be used to sign a token taken from any part of the state.

The core signing method USES the token stored in state to sign the request.


### Why Seperate Concerns? 

Take the example of the `common/lib/api { send }` method. This method takes a request, sends it off to the `common/lib/http { send }` method to get the response, but then formats the JSON document response or error.

Now consider the `core/lib/api { send }` method which is state aware and uses other modules to sign all outgoing requests and then PASSES OFF a signed request to `common/lib/api { send }`.

So, pretty much all API calls use the `core/lib/api { send }`.

But, what about logging in... this is an exception to the "MUST SIGN TOKEN" flow, but we expect the same JSON response/error schema. Using the `core/lib/api` api module would fail any login request with a "NotLoggedIn" error, but we can use the `common/lib/api { send }` method to send the request out unsigned without writing a new line of code for this special case.

These modules wern't designed for this paticular exception, but by seperating concerns we can use the pieces we need to get the job done.







# Style Guide

## Coding Style

### Strict

- All files should start with the "use strict" pragma followed by an empty line.

We should discuss this as it may no longer be necessary - JD

### Imports and Exports

#### Style

- All imports and exports should only contain a single statement

```
// yes
import { blah1 } from './thing';
import { blah2 } from './thing';

export { blah as blah2 }
export { blah 3}

// no
import { blah1, blah2 } from './thing';
export { blah as blah2, blah3 }
```

- Prefer export inline over end of file i.e.: ```export const a = 1```


#### Order

- 1) node_module imports followed by an empty line: ```lodash```
- 2) application base imports ```core/blah``` + empty line
- 3) relative imports: ```./blah``` + empty line
- 4) Two empty lines between the last import and the module


### Line Breaks and Line Length

- Implicit fat arrow returns can be broken into multiple lines.
- Prefer breaks on object properties over arrays and function arguments.
- Double line break between multi-line statements (not including comments). Single line otherwise
- Use line comments (//) before the statement. Use block comments for
  debugging and commenting out code blocks.



## Module Structure

### Public, Supporting, and Transparent Modules

- Public Modules
  - Are used by more than one unrelated module.
  - Are imported from the application root: `import core/blah`.
  - Favor named exports with the exception of components, which favor default exports.
  - Require unit tests.

- Supporting Modules
  - Are singly purposed to support another parent module.
  - Are imported with relative imports.
  - Are only imported from the directory they are location in.*
  - Default exports are ok.
  - Do not require unit tests.**

- Transparent Modules
  - Are always named `index.js`.
  - Contain no business logic, only import/export.
  - Do not require unit tests.

- For nested folders, the FIRST occurence of an `index.js` indicates the breakpoint between public and supporting modules. In other words, there should be no imports from the application root that PASS OVER an `index.js`.

*See the section on breaking modules into multiple files. This means a module would never import a supporting module like `import ./blah/module2`. `blah` should re-export `module2`,  `import { module2 } from './blah'`.

**The behavior of the private module should be covered in the public module's tests. If that is unreasonable, that is likely hinting that the public module is too complex and should be normalized into multiple public modules.



### Breaking a Module into Multiple Files

If a module warrants being broken into several files, Structure multi-file modules like below:

```
module1
module1/index.js
module1/module1.js
module1/moduledep1.js
module1/moduledep2/
module1/moduledep2/index.js
module1/moduledep2/moduledep2.js
```

- When applicable, use a file that backs to module the same as the parent folder for the primary entry point.
