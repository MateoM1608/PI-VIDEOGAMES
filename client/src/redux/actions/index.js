import axios from "axios"

export const getVideogames = () => dispatch =>{
    axios.get("http://localhost:3001/videogames")
    .then(res =>dispatch({ type: "GET_VIDEOGAMES",payload: res.data}))
}

export const getVideogamesByName = (query) => dispatch => {
    axios.get(`http://localhost:3001/videogames?name=${query}`)
    .then(res => dispatch({type: "GET_VIDEOGAMES_NAME", payload: res.data}))
}

export const getVideogameById =(id) => dispatch =>{
    axios.get(`http://localhost:3001/videogame/${id}`)
    .then(res => dispatch({type: "GET_VIDEOGAME_ID", payload: res.data}))
}

export const createVideogame = (body) => () =>{
    axios.post(`http://localhost:3001/videogame`, body)
    .then(res => res)
}

export const getGenres = () => dispatch =>{
    axios.get("http://localhost:3001/genres")
    .then(res => dispatch({type: "GET_GENRES", payload: res.data}))
}

export const  filterByGenres = (payload) =>{
    return {
        type:"FILTER_BYGENRES",
        payload
    }
}

export const filterByVieogame = (payload) =>{
    return{
        type: "FILTER_BYVIDEOGAME",
        payload
    }
}

export const orderByRating = (payload) =>{
    return {
        type: "ORDER_RATING",
        payload
    }
}

export const orderByAlphabet = (payload) =>{
    return {
        type: "ORDER_ALPHABET",
        payload
    }
}

export const clearDetails = () =>{
    return{
        type: "CLEAR_DETAIL",
    }
}

export const reload = () =>{
    return{
        type:"RELOAD"
    }
}