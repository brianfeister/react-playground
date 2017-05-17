'use strict';

export default (Component1, Component2) => ({ props1, props2, value }) => {
  if (!value) return <Component1 {...props1} />;
  else return <Component2 {...props2} />;
};
