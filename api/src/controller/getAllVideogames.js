const axios = require('axios');
const{ Videogame, Genre} = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env

const getAllVideogames = async (req,res,next) =>{
    
    const { name } = req.query;
    let dataBaseVideogames;
    let APIVIdeogames;
    
    if(name){
        try{
            dataBaseVideogames = await Videogame.findAll({
                where :{
                    name :{
                        [Op.iLike] : `%${name}%`
                    }
                }
            });
    
            let resultVideogames = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);

            APIVIdeogames = resultVideogames.data.results.length > 0
            ? resultVideogames.data.results.map(e =>{
                return {
                    id: e.id,
                    name: e.name,
                    image: e.background_image,
                    rating: e.rating,
                    platforms:e.platforms ? e.platforms.map(p => p.platform.name) : "Sorry, there are no platforms",
                    Genres: e.genres.map(g => g.name)
                }
            }): [];
            
            const allVideogames = [...dataBaseVideogames, ... APIVIdeogames];
            if(allVideogames.length === 0){
                return res.send("Videogame has not found")
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
            
            let allInfo = [];
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
                        platforms:e.platforms ? e.platforms.map(p => p.platform.name) : "Sorry, there are no platforms",
                    }
                });
    
                allInfo = allInfo.concat(API_map)
               
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
         
            const DBVideogamett = JSON.parse(JSON.stringify(DBVideogames));
            // console.log('el PArse', DBVideogamett)
            // const DBVideogamespp = DBVideogamett.reverse()
            DBVideogamett.map(v => {
                v.Genres= v.Genres.map(g=> g.name)
            })
            // console.log('juegos creados',DBVideogamett)
          
            const allVideogames = DBVideogamett.concat(allInfo)

            console.log('aca el get de los juegos',allVideogames)
            res.send(allVideogames)
        }catch(err){
            next(err)
        }
    }
};

module.exports = { getAllVideogames };