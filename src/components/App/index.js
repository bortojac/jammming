import { connect } from 'react-redux';
import App from './App';
import { getAccessToken } from '../../store/actions';
import { isTokenGranted } from '../../store/selectors';


const mapStateToProps = state => ({ tokenGranted: isTokenGranted(state) })

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
