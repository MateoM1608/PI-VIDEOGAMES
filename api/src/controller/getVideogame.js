const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env

const getVideogame = async (req, res, next) =>{

    const { id } = req.params;
    let videogame;

    try{
        if(id[0] === 'i'){
            videogame = await Videogame.findByPk(id ,{
                include: Genre,
            });
    
            videogame = JSON.parse(JSON.stringify(videogame));
            videogame.Genres = videogame.Genres.map(g => g.name);

            return videogame ? res.json(videogame) : res.status(404).send('Error no se encontro el id')
            
        }else{
            let idApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

            let videogamesDAta = {
                id: idApi.data.id,
                name:idApi.data.name,
                description: idApi.data.description_raw,
                image: idApi.data.background_image,
                released: idApi.data.released,
                rating: idApi.data.rating,
                platforms: idApi.data.platforms.map(p => p.platform.name),
                Genres: idApi.data.genres.map(g => g.name)
            }
            return res.json(videogamesDAta)
        };
    }catch(err){
        next(err);
    }
}



module.exports = {getVideogame}