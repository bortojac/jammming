import { connect } from 'react-redux';
import SearchResults from './SearchResults';
import { getSearchResults } from '@@store/selectors';


const mapStateToProps = state => {
  return { searchResults: getSearchResults(state) };
}

export default connect(mapStateToProps)(SearchResults);
