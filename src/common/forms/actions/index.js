'use strict';

// FORM NAME
// FIELD PATH

import { generic } from 'lib/actions';


export const updateField = ({ form, field }) => {
  console.log('___');
  console.log(form);
  console.log(field);
  const arrPath = _.toPath(field);
  return value => {

    const action = generic([
      ['set', ['forms', form, 'value', ...arrPath], value],
      ['set', ['forms', form, 'metadata', ...arrPath, 'dirty'], true],
      ['set', ['forms', form, 'metadata', 'error'], null]
    ]);
    console.log(action);
    return action;
  };
};
