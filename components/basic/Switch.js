'use strict';

export default ({ Component0, Component1, props0, props1, value }) => {
  if (value) return <Component1 {...props1} />;
  else return <Component0 {...props0} />;
};
