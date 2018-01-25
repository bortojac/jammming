import { connect } from 'react-redux';
import SearchResults from './SearchResults';



const mapStateToProps = state => {
  return { searchResults: state.searchResults.tracks };
}

export default connect(mapStateToProps)(SearchResults);
