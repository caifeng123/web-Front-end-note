import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'

// import Usestate from './Usestate';
// import UseEffect from './UseEffect';
// import Usecontext from './Usecontext'
// import UseRef from './UseRef'
// import Usememo from './Usememo-Usecallback'
// import Usereducer from './Usereducer'
import Usedispatch from './UseSelector-Usedispatch'

import store from './store'

ReactDOM.render(
  <Provider store={store}>
    {/* <Usestate/>
    <UseEffect/> 
    <Usecontext/>
    <UseRef/>
    <Usememo/>
    <Usereducer/> */}
    <Usedispatch/>
  </Provider>,
  document.getElementById('root')
);