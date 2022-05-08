import React  from 'react';
import './Filter.css'

const Filter = ({handleByCreate, handleByGenres, Allgenres}) => {
    
    return (
        <div>
            <div className='orderFilter'>
                <select className='content-select' value="" onChange={(e) => handleByCreate(e)}>
                    <option value="">Filter by Create</option>
                    <option value="Created">Created by myself</option>
                    <option value="Origin">Others</option>
                </select>
                
                <select  className='content-select' value="" onChange={(e) => handleByGenres(e)}>
                    <option value="">Filter by Genres</option>
                    <option value="All genres">All</option> 
                    {
                        Allgenres && Allgenres.map(g =>(
                            <option key={g.name} value={g.name}>{g.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export default Filter