'use strict';

export default (state) => {
  if (!state) return {
    manifests: {},
    forms: {},
    resources: {},

    auth: {
      form: {
        manifest: {}

      },
      document: null
    }
  };
  return state;
}


// ACTION
// Populate form manifest.
// Populate form values.

// auth.login([args], { form })


// Validation via manifest


// operation must populate form shit!

// manifests.create(id, manifest);
// manifests.destroy(id);

// forms.create(id, manifestId)
// forms.update(id, key, value);
// forms.destroy(id);



// Set form manifest.


// RESOURCE.UUID.ADD
// RESOURCE.UUID.SAVE()
