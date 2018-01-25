import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { fetchSearchResults } from '../../../actions';


const mapStateToProps = state => ({
  searchResults: state.searchResults.tracks
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
