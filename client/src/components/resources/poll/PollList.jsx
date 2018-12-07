import { connect } from 'react-redux';
import { getPolls } from '../../../store/resources/polls/selectors';
import { List } from '../../styles/List.jsx';
import PollCard from './PollCard.jsx';
import { fetchPolls } from '../../../store/resources/polls/actions';
import { Fetch } from '../../lib/Fetch.jsx';

const mapStateToProps = state => ({
  list: getPolls(state)
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchPolls())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Fetch(
    List(
      PollCard,
      { idKey: '_id', spread: true }
    ),
    { dataKey: 'polls', defaultValue: [] }
  )
);
