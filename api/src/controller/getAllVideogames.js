const axios = require('axios');
const{ Videogame, Genre} = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env

const getAllVideogames = async (req,res,next) =>{

    const { name } = req.query;
    
    if(name){
        try{
            const dataBaseVideogames = await Videogame.findAll({
                where :{
                    name :{
                        [Op.iLike] : `%${name}%`
                    }
                }
            });
    
            let resultVideogames = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);

            const APIVIdeogames = resultVideogames.data.results.length > 0
            ? resultVideogames.data.results.map(e =>{
                return {
                    id: e.id,
                    name: e.name,
                    image: e.background_image,
                    rating: e.rating,
                    Genres: e.genres.map(g => g.name)
                }
            }): [];
            
            const allVideogames = dataBaseVideogames.concat(APIVIdeogames)
            console.log('todos los juegos', allVideogames)
            if(allVideogames.length === 0){
                return res.send("videogame not found")
            }
            if(allVideogames.length <= 15){
                return res.json(allVideogames)
            }else{
                allVideogames.splice(15-allVideogames.length)
                return res.json(allVideogames)
            }
        }catch(err){
            next(err);
        }
    }else{
        try{
            
            let API_Videogames = [];
            let apiURL = "";
            for( let i=1; i < 6 ; i++ ){
                apiURL = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
                
                let API_map = apiURL.data.results.map(e => {
                    return {
                        id: e.id,
                        name: e.name,
                        rating: e.rating,
                        image: e.background_image,
                        Genres: e.genres.map(g=> g.name),
                    }
                });
    
                API_Videogames = API_Videogames.concat(API_map)
               
            }
           

            const DBVideogames = await Videogame.findAll({
                include:{
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })
            
            const DB_Videogames = JSON.parse(JSON.stringify(DBVideogames));
            DB_Videogames.map(v => v.Genres= v.Genres.map(g=> g.name))
            const allVideogames = DB_Videogames.concat(API_Videogames)
            res.send(allVideogames)
        }catch(err){
            next(err)
        }
    }
};



module.exports = { getAllVideogames };