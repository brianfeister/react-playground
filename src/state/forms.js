'use strict';

// FORM NAME
// FIELD PATH

import _ from 'lodash';

import { operate } from 'state/generic';
import { serialize } from 'lib/errors';



export const submit = (form, action) => dispatch => {
  dispatch(operate(
    ['set', ['forms', form, 'status', 'submitting'], true],
    ['set', ['forms', form, 'status', 'active'], true]
  ));
  return Promise.resolve().then(() => dispatch(action({
    getValue: state => getFormValue(form, state)
  }))).then(result => {
    dispatch(operate(
      ['set', ['forms', form, 'status', 'submitting'], false],
      ['set', ['forms', form, 'status', 'active'], false],
      ['set', ['forms', form, 'status', 'submitted'], true],
      ['set', ['forms', form, 'status', 'result'], result]
    ));
    return result;
  }, error => {
    dispatch(operate(
      ['set', ['forms', form, 'status', 'submitting'], false],
      ['set', ['forms', form, 'status', 'active'], false],
      ['set', ['forms', form, 'status', 'error'], serialize(error)]
    ));
    throw error;
  });
}

// TODO: Validation.
export const setFieldValue = (form, field, value) => operate(
  ['set', ['forms', form, 'fields', field, 'status', 'dirty'], true],
  ['set', ['forms', form, 'fields', field, 'status', 'error'], null],
  ['set', ['forms', form, 'fields', field, 'status', 'touched'], true],
  ['set', ['forms', form, 'status', 'dirty'], true],
  ['set', ['forms', form, 'status', 'error'], null],
  ['set', ['forms', form, 'status', 'touched'], true],
  ['set', ['forms', form, 'value', _.toPath(field)], value],
);

export const touchField = (form, field) => operate(
  ['set', ['forms', form, 'fields', field, 'status', 'touched'], true],
  ['set', ['forms', form, 'status', 'touched'], true]
);


export const getFormValue = (form, state) => {
  return _.get(state, ['forms', form, 'value']);
};

export const getFormStatus = (form, state) => {
  return _.get(state, ['forms', form, 'status']);
};

export const getFormState = (form, state) => {
  return _.get(state, ['forms', form, 'state']);
};

export const setFormState = (form, state) => {
  return operate(
    ['set', ['forms', form, 'state'], state]
  );
};

export const getFormOptions = (form, state) => {
  return _.get(state, ['forms', form, 'options']);
};

export const getFieldValue = (form, field, state) => {
  return _.get(state, ['forms', form, 'value', ..._.toPath(field)]);
};

export const getFieldStatus = (form, field, state) => {
  return _.get(state, ['forms', form, 'fields', field, 'status']);
};

export const getFieldState = (form, field, state) => {
  return _.get(state, ['forms', form, 'fields', field, 'state']);
};

export const setFieldState = (form, field, state) => {
  return operate(
    ['set', ['forms', form, 'fields', field, 'state'], state]
  );
};

export const getFieldOptions = (form, field, state) => {
  return _.get(state, ['forms', form, 'fields', field, 'options']);
};
