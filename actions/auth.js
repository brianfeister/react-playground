'use strict';

import * as apifetch_ from 'common/fetch';
import { sign } from 'common/auth';

export const login = createAsyncAction('AUTH.LOGIN', async (state, formName, options) => {

  const selector = {};
  selector(state, 'username');
  selector(state, 'blah');
  selector(state, 'blah');

  const { username, password, organization } = state.auth.credentials;

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const request = new Request({
    url: '/api/auth/login',
    method: 'POST',
    headers,
    body: JSON.stringify({ username, password, organization })
  });

  return await fetchJson(request);

});



export const logout = createAsyncAction('AUTH.LOGOUT', () => {});

export const refresh = createAsyncAction('AUTH.REFRESH', async (organization, group, activity) => {

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const request = new Request({
    url: '/api/auth/login',
    method: 'POST',
    headers,
    body: JSON.stringify({ username, password, organization })
  });

  return await fetchWithAuth(dispatch, state, request)


});

export function refresh () {}
/*

 *user* - An end user. A user is a member of many _group activities_ and _resource activities_.

 *group* - Contains a list of named references to _group activities_. Empty when created unless we decide to create some presets. _Group activities_ must be added to the group. There may be a default "organization" group with stock activities.

 *group activity* - UI entry point and permission set for working with a _group_ of _resources_. Built in.
 *resource activity* - UI entry point and permission set for working with a single _resource_. Built in.

 *resource* - The actual data. Contains a list of groups that it belongs to and a reference to its template.
 *resource template* - List of _resource activities_ .
