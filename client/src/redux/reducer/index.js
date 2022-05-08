const initialState = {
  allVideogames: [],
  videogames: [],
  genres: [],
  videogameDetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        allVideogames: action.payload,
        videogames: action.payload
      };
    case "GET_VIDEOGAMES_NAME":
      if(action.payload === "Videogame has not found"){
        alert("videogame not found")
      }else{
        return {
          ...state,
          videogames: action.payload,
        }
      }
    case "GET_VIDEOGAME_ID":
      console.log('detalle', action.payload)
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "FILTER_BYGENRES":
      const videogamesGenres = state.allVideogames;
      const filterByGenres = action.payload === "All genres" 
      ? state.allVideogames : videogamesGenres.filter((g) => g.Genres.find((e) => e === action.payload));
      // console.log('filter genres', filterByGenres)
      if(filterByGenres.length === 0){
        alert("No game found")
      }else{
        return {
          ...state,
          videogames: filterByGenres,
        }
      }
    case "FILTER_BYVIDEOGAME":
      const videogameCreated = state.allVideogames;
      const filterByvideogame = action.payload === "Created"
          ? videogameCreated.filter((g) => g.createdInDb === true)
          : videogameCreated.filter((g) => !g.createdInDb);
      // console.log('created', filterByvideogame)
      if(filterByvideogame.length === 0){
        alert("There are not videogames created")
      }else{
        return {
          ...state,
          videogames: filterByvideogame,
        }
      }
    case "ORDER_ALPHABET":
        const orderAlphabet = state.videogames.slice().sort((a,b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1;
            }
            return 0
        });
      return {
        ...state,
        videogames: action.payload === 'abc' ? orderAlphabet : orderAlphabet.reverse()
      };
    case "ORDER_RATING":
        const  orderRating= state.videogames.slice().sort((a,b)=>a.rating - b.rating)
      return {
        ...state,
        videogames: action.payload === 'menor' ? orderRating : orderRating.reverse()
      };
    case "CLEAR_DETAIL":
      return{
        ...state,
        videogameDetail: []
      };
    case "RELOAD":
      
      return{
        ...state,
        videogames: state.allVideogames
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
