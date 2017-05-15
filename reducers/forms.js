
export default (state, action) {

  if (action.type === 'FORM.CREATE') {
    const { id, config } = action;
    return Object.assign({}, state, { id: { config, values: {} } });
  }

  if (action.type === 'FORM.VALIDATE.START') {}



  if (action.type === 'FORM.VALIDATE.ERROR') {}


  if (action.type === 'FORMS.UPDATE') {

    const { values } = action;

    // Go through values item and update

    // UPDATE AND VALIDATE ENTIRE FORM

  }


  return state;

}
