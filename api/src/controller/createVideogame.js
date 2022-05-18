const { Genre, Videogame } = require('../db.js');


//   CREAR VIDEOJUEGO

const createVideogame = async (req, res) =>{
    const { name, description, released, rating, platforms, image, Genres } = req.body;

    const getIdGenres = await Genre.findAll({
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
        await videogameCreated.addGenres(getIdGenres);
        return res.send('Videogame was created correctly')
    }else{
        return res.send("There are missing data ")
    }
}

function deleteVideogame  (req, res) {

    const { id } = req.params;

    Videogame.destroy({
        where:{
            id: id
        }
    }).then(data => res.send('videogame is deleted')).catch(err => res.status(500).send(err))
    

}


module.exports = {createVideogame, deleteVideogame};