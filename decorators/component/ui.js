'use strict';


export const Namespace = class extends React.Component {

  // Bind expNamespace to context

}


export const bindToField = ({ namespace, fieldname }) => {
  // map to "value" and "onChange" props
}


export default ({ namespace='default', name }) => {

};


export const bindToUiState (options) => {
  return (target, key, descriptor) => {

    const original = descriptor.value;


    descriptor.value = function () {
      const output = original.apply(this, arguments);
    };

  };
};



// Define form context
// Define form reader

// Render with form read props.
// Render with form read/write props.

// Map field value.
