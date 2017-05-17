import { withRouter } from 'react-router';
import MainHeader from './main_header';
import { selectChannelById } from '../../../reducers/selectors/channel_selectors';

const mapStateToProps = (state, { match }) => {
  let channelId = match.params.channelId;
  return {
    channel: state.channels.channels[channelId]
  };

};

export default withRouter(MainHeader);
