'use strict';

import { connect } from 'react-redux';


export default ([
  getSliceData,
  getSliceActions,
  getNamespaceData,
  getNamespaceActions
]) => ([
  mapSliceDataToProps=()=>({}),
  mapSliceActionsToProps=()=>({}),
  mapNamespaceDataToProps=()=>({}),
  mapNamespaceActionsToProps=()=>({}),
  mergeProps
]) => connect(
  (state, props) => ({
    ...mapSliceDataToProps(getSliceData(props, state), props),
    ...mapNamespaceDataToProps(getNamespaceData(props, state), props)
  }),
  (dispatch, props) => ({
    ...mapSliceActionsToProps(getSliceActions(props), props),
    ...mapNamespaceActionsToProps(getNamespaceActions(props), props)
  })
);
