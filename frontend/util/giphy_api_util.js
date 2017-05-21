export const fetchSearchGiphys = (searchTerm) => (
  $.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=18`
  })
);

export const fetchSingleGiphy = (searchTerm) => (
  $.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=1`
  })
);
