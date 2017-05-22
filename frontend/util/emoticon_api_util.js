export const addEmojiToMessage = emoticon => {
  return $.ajax({
    method: 'POST',
    url: `/api/emoticons`,
    data: {emoticon}
  });
};
