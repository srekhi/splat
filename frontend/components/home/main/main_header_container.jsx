import { withRouter } from 'react-router-dom';
import MainHeaderContainer from './main_header_container';
import { selectChannelById } from '../../../reducers/selectors/channel_selectors';

const mapStateToProps = (state) => (
  channelId = match.params[channelId];
  return {
    channel: state.channels.channels[channelId];
  }
);

export default withRouter(MainHeaderContainer);
