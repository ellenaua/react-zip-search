class Searcher{

  findPlace(zipCode) {
    return fetch(`https://api.zippopotam.us/us/${zipCode}`)
      .then(res => res.json())
      .then(res => {
        if (res.places && res.places.length > 0) {
          return res.places[0];
        } else {
          return Promise.reject(new Error(`Zip code ${zipCode} is not found`));
        }
      })
  }
}

export default Searcher;
