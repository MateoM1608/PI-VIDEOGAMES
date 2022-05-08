import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../../img/logo.png'
import { getVideogames } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import SearchBar from "../SearchBar/SearchBar"


const NavBar = () =>{

    const dispatch = useDispatch()
    console.log('soy nav')
    return(
        <div className='divNav'>
            <Link style={{textDecoration:"none"}} to="/Home">
            <img src={Logo} className="imgnav" onClick={() => dispatch(getVideogames())}/>
            </Link>
            <div className='search'>
            <SearchBar/>
            </div>
            <Link style={{textDecoration:"none"}} to="/videogames/create">
            <p className='txtnav'>CREATE GAME</p>
            </Link>
        </div>
    )
}

export default NavBar;