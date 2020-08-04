import {connect} from 'react-redux'
import App from './App.js'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increase: who=>dispatch({type:"increase",who}),
    decrease: who=>dispatch({type:"decrease",who})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)