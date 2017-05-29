'use strict';

import { serialize } from 'lib/errors';
import { generic } from 'lib/actions'

import { getValue } from 'common/forms/selectors';
import { getMetadata } from 'common/forms/selectors';
import { getOptions } from 'common/forms/selectors';


export const createSubmitter = action => name => {
  return async (dispatch) => {
    console.debug('Starting form submissions.');
    dispatch(generic([
      ['set', ['forms', name, 'metadata', 'submitting'], true]
    ]));
    let result;
    try {
      console.debug('Submitting form.');
      result = await dispatch(action({
        getValue: getValue({ name }),
        getMetadata: getMetadata({ name }),
        getOptions: getOptions({ name })
      }));
    } catch (error) {
      console.log('UPDATING THING!');
      dispatch(generic([
        ['set', ['forms', name, 'metadata', 'submitting'], false],
        ['set', ['forms', name, 'metadata', 'error'], serialize(error)]
      ]));
      console.log('FINISHED UPDATING... THROWING!');
      throw error;
    }
    dispatch(generic([
      ['set', ['forms', name, 'metadata', 'submitting'], false],
      ['set', ['forms', name, 'metadata', 'submitted'], true],
      ['set', ['forms', name, 'metadata', 'result'], result]
    ]));
  };
}
