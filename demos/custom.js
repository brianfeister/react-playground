

// Passed in "value" for previous level. Returns value for this level.

function getNextField (value, names) {
  const name = names[0];
  const next = names.slice(1);

  if (null) {
    if (name === 'GOES TO ARRAY') {
      const l = 5;
      return getNextField({
        value: null,
        metadata: null
      }, next);
    } else {
      return getState(names.slice(1), {
        [name]: {
          value: null,
          metadata: null
        }
      });
    }
  } else {
    if (name === 'GOES TO ARRAY')


    return { ...state }
  }

}
