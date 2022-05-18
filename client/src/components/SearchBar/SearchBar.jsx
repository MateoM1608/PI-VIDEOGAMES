import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getVideogamesByName } from '../../redux/actions/index'
import './SearchBar.css'


const SearchBar = () => {

    const dispatch = useDispatch();
    const [ name, setName ] = useState("");

    const handleChange = (e) =>{
        setName(e.target.value);
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getVideogamesByName(name))
        setName("")
    }

    return(
        <div className ="SearchOrder" >
            <form  onSubmit={(e) => handleSubmit(e)}>
                <input 
                type="text"
                placeholder="Search Videogame"
                value={name}
                onChange={(e) => handleChange(e)}
                className="searchbar"
                />
                <button className='btnsearch' type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;