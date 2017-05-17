

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




# Presentational Components exp/components/common/presentational

These are reusable components that are hooked up to material UI and
are purely presentational. They generally should NOT wrap container or
dynamic components as they do not have the context to do so.


# Container Components: exp/components/common/containers

These are reusable components that are bound to the redux store. They
typically wrap presentational components.


# Field Componenents: exp/components/common/fields

These are components that track user entry, which is bound into the
redux store via redux-form. They typically wrap presentational
components and must have a Form entry point as a parent.


# Dynamic Components: exp/components/common/dynamic

These components are used to drive dynamic UI. All take {name,
options} as props. IO components are generally wrapped form
components.


# Core components: exp/components/core

These components are the core components that power the UI.


# Utilitys: exp/components/common/utils

These are higher order components or general utilities for components.



# Actions
actions.auth.login()
actions.auth.refresh()
actions.auth.logout();
actions.devices.create(document);
actions.devices.read(uuid)
actions.devices.update(uuid, document)
actions.devices.delete(uuid);
actions.activities.activate(uuid);


# State

## Resource Schema

```
{
  status: { busy: Boolean, deleted: Boolean }
  document: {}
}
```
  
## Resource Namespaces

state.resources.auth
state.resources.devices
state.resources.activities
state.resources.experiences



# Reducers


## exp/actions/auth
## exp/actions/resource







