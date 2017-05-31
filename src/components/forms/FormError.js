'use strict';
import { connect } from 'react-redux';



import { getFormStatus } from 'state/forms';


export default connect(
  (state, { form }) => {
    const status = getFormStatus(form, state);
    return {
      message: status && status.error && status.error.message
    };
  }
)(({ message }) => (
  <div style={ { visibility: message ? 'visible' : 'hidden', color: 'red' } }>
    { message }
  </div>
));
