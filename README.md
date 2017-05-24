

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

Context

containerType
(ui, form, null)




(form, presentational, naked -> Field)


(form, dynamic, container, naked)


Dynamic -> Presentational






# Presentational Components presentational

These are reusable components that are hooked up to material UI and
are purely presentational. They generally should NOT wrap container or
dynamic components as they do not have the context to do so.


# Connected Components: containers

These are reusable components that are bound to the redux store with
redux middleware or wrapped redux-form middleware. They typically wrap presentational
components.



# Field Componenents: fields


These are components that track user entry, which is bound into the
redux store via redux-form. They typically wrap presentational
components and must have a Form entry point as a parent.


# Dynamic Components: dynamic

These components are used to drive dynamic UI. All take {options} as
props. Dynamic components are generally wrapped field components.


# Core components: core

These components are the core components that power the UI.


# Utilitys: utils

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







