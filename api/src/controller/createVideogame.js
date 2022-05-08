const { Genre, Videogame } = require('../db.js');


//   CREAR VIDEOJUEGO

const createVideogame = async (req, res) =>{
    const { name, description, released, rating, platforms, image, Genres } = req.body;

    console.log('genres', Genres)
    let getIdGenres = await Genre.findAll({
        where:{
            name: Genres
        }
    });

    if(name && description && platforms){
       const videogameCreated = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            image
        })
        console.log(getIdGenres)
        console.log('es el creado',videogameCreated)
        await videogameCreated.addGenres(getIdGenres);
        return res.send('Videogame was created correctly')
    }else{
        return "There are missing data "
    }
}

// ELIMINAR VIDEOJUEGO

module.exports = {createVideogame};