const mapStateToProps = (state, ownProps) => ({
  messageId: ownProps.message.id,
  userId: state.session.currentUser.id,
  emoticonPicker: state.modal.emoticonPicker,
  pickerMsgId: state.modal.messageId,
});

const mapDispatchToProps = (dispatch) => ({
  addEmoticon: (icon) => dispatch(addEmoticon(icon)),
  closeEmoticonPicker: () => dispatch(closeEmoticonPicker()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmoticonPicker);
