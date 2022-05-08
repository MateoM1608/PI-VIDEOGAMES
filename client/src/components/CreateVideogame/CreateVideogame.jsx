import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createVideogame, getGenres} from '../../redux/actions'
import './CreateVideogame.css'



const CreateVideogame = () => {

  const dispatch = useDispatch()
  const AllGenres = useSelector(state => state.genres)
  const [errorUrl, setErrorUrl] = useState("");
  const [errorRating, setErrorRating] = useState("");
  const[errorName, setErrorName] = useState("")
  const [estado, setEstado] = useState({
    name:"",
    released:"",
    description: "",
    rating:0,
    platforms: [],
    Genres: [],
    image: ""
  })

  useEffect(()=>{
    dispatch(getGenres())
  },[dispatch])
  

  const Allplatforms = [
    "PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox",
    "Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "iOS", "Android", "macOS", "Linux"
  ]
  const validateName = (e) => {
    !/^[a-z0-9 ,.'-]+$/i.test(e)
    ? setErrorName('That name is invalid')
    : setErrorName("");
    setEstado({
      ...estado,
      name: e})
  }
  const validateUrl = (e) => {
    !/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/.test(e)
    ? setErrorUrl('The URL is not valid')
    : setErrorUrl("");
    setEstado({
      ...estado,
      image: e
    });
  }
  const validateRating = (e) => {
    e < 0 || e > 5
    ? setErrorRating('The rating is from 0 to 5')
    : setErrorRating("");
    setEstado({
      ...estado,
      rating: e
    });
  }
  const  handlerSelectGenres = (e) => {
    setEstado({
        ...estado,
        Genres: estado.Genres.includes(e.target.value) || e.target.value === "" ? estado.Genres : [...estado.Genres, e.target.value]
    });
    console.log(estado.Genres)
  }
  const handlerDeleteGenres = (e) =>{
    setEstado({
      ...estado,
      Genres: estado.Genres.filter(g => g !==e)
    })
  }
  const handleSelectPlatforms = (e) => {
    setEstado({
      ...estado,
      platforms: estado.platforms.includes(e.target.value) || e.target.value === ""? estado.platforms : [...estado.platforms, e.target.value]
    })
    console.log(estado.platforms)
  }
  const handleDeletePlatforms = (e) =>{
    setEstado({
      ...estado,
      platforms: estado.platforms.filter(p => p !== e)
    })
    console.log(estado.platforms)
  }
  const handleChange = (e) =>{
    setEstado({
      ...estado,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(errorUrl === "" && errorUrl === "" && errorRating=== "" ){
      dispatch(createVideogame(estado))
      console.log('Videojuego creado',estado)
      setEstado({
        name:"",
        released:"",
        description: "",
        rating:0,
        platforms: [],
        Genres: [],
        image: ""
      })
      alert("Videogame created successfully")
    }else{
      alert("Some data is wrong")
    }
  }


  return (
    <div className="divTotCreate">
      <div className="divtxtHome">
        <Link style={{textDecoration:"none"}} to="/Home">
          <p className="txtHome">HOME</p>
        </Link>
      </div>
      <h2 className="txtCreated">CREATE GAME</h2>
      <div className="divCreate">
        <p className="itemsrequired">Items with * are required</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="orderForm">
            <div className="AllForms">
              <div className="columForm">
                <label className="letterForms">Videogame Name:*</label>
                <input
                  type="text"
                  name="name"
                  value={estado.name}
                  onChange={(e) => validateName(e.target.value)}
                  required={true}
                  placeholder= "Name"
                  className="textbox"
                />
                {!errorName ? null : <span className="danger">{errorName}</span>}
            </div>
            <div className="rowForm">
              <div className="columForm">
                <label className="letterForms">Release Date:</label>
                <input
                  type="date"
                  value={estado.released}
                  name="released"
                  onChange={(e) => handleChange(e)}
                  className="textbox"
                />
              </div>
              <div className="columForm ">
                <label className="letterForms">Description:*</label>
                <textarea
                  type="text"
                  value={estado.description}
                  name="description"
                  onChange={(e) => handleChange(e)}
                  placeholder="Description of videogame..."
                  required={true}
                  className="textbox inputimg"
                />
              </div>
            </div>
              <div className="rowForm">
                <div className="columForm">
                  <label className="letterForms">Rating:</label>
                  <input
                    type="number"
                    value={estado.rating}
                    name= "rating"
                    onChange={(e) => validateRating(e.target.value)}
                    step = {0.01}
                    placeholder= "0.00 - 5.00"
                    min= {0.00}
                    max= {5}
                    required={true}
                    className="textbox"
                  />
                  {!errorRating ? null : <span className="danger">{errorRating}</span>}
                </div>
                <div className="columForm">
                  <label className="letterForms">Image:</label>
                  <input
                    type="text"
                    name="image"
                    value={estado.image}
                    placeholder="Game image URL"
                    onChange={ (e) => validateUrl(e.target.value)}
                    className="textbox inputimg"
                  />
                  {!errorUrl ? null : <span className="danger">{errorUrl}</span>}
                </div>
              </div>
              <div className="columForm orderSelect">
                <label className="letterForms">Genres:</label>
                <select className="textbox" value="" onChange={(e) => handlerSelectGenres(e)}>
                  <option value="">Chose the genres</option>
                  {AllGenres && AllGenres.map(g=>(
                    <option key={g.name} value={g.name}>{g.name}</option>
                  ))}
                </select>
                <div className="rowText">
                  {estado.Genres.map((el) =>
                    {if(el !== ""){
                      return(
                      <div className="txtSelectrow" key={el} >
                        <p className="TextSelect">{el}</p>
                        <button  className="btndeleteSelect" onClick={() => handlerDeleteGenres(el)}>X</button>
                      </div>
                  )}})}
                </div>
              </div>
              <div className="columForm orderSelect">
                <label className="letterForms">Platforms:*</label>
                <select className="textbox" value={estado.platforms[0]?estado.platforms[estado.platforms.length-1]:""} required ={true} onChange={(e) => handleSelectPlatforms(e)}>  
                  <option value="">Choise the platfroms </option>
                  {Allplatforms.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <div className="rowText">
                  {estado.platforms.map((p) =>
                    {if(p !== ""){
                      return(
                        <div className="txtSelectrow" key={p}>
                          <p className="TextSelect">{p}</p>
                          <button className="btndeleteSelect" onClick={() => handleDeletePlatforms(p)}>X</button>
                        </div>
                  )}})}
                </div>
              </div>
            </div>
            
            <div className="divimagecreate">
              <h4 className="letterForms">Image preview</h4>
              <img  className="imgCreate" src={estado.image === "" || errorUrl !== "" ? "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nJTIwc2V0dXB8ZW58MHx8MHx8&w=1000&q=80" : estado.image  } alt="ssisi"/>
            </div>
          </div>
          <div className="orderBtnCreate">
            <button className="btnCreate" type="submit">Create videogame</button>
          </div>
            
        </form>
      </div>
    </div>
  );
};

export default CreateVideogame;
