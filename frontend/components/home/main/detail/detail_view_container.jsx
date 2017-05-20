import { connect } from 'react-redux';
import DetailView from './detail_view';

const mapStateToProps = (state, { match }) => {
    const channelId = match.params.channelId;
    return {
      channel: state.channels.channels[channelId]
    };
};


export default connect(mapStateToProps, null)(DetailView);
