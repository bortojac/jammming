import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { fetchSearchResults } from '@@store/actions';
import { getFetchingFlag } from '@@store/selectors';


const mapStateToProps = state => ({
  isFetching: getFetchingFlag(state)
})

const mapDispatchToProps = dispatch => {
  return {
    onSearch: term =>
      dispatch(fetchSearchResults(term))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
