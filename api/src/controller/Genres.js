const { Genre } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env


// GUARDAR GENEROS DE LA API EN DB

const apiGenres = async () =>{

    const genres = []
    const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    genreApi.data.results.forEach(genre => {
        genres.push({
            name: genre.name
        })
    });

    genres.forEach(gen => {
        Genre.findOrCreate({
            where: {
                name: gen.name
            }
        })
    })
}

// RUTA PARA TRAER LOS GENEROS 

const getGenres = async (req, res) =>{

    await apiGenres();
    const getAllGenres = await Genre.findAll();
    res.send(getAllGenres);
}




module.exports = {getGenres};