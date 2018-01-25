import { connect } from 'react-redux';
import App from './App';
import { getAccessToken } from '../../actions';


const mapStateToProps = state => ({ tokenGranted: state.token.tokenGranted })

const mapDispatchToProps = dispatch => {
  return {
    getAccessToken: () => {
      dispatch(getAccessToken())
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(App);
