import React from 'react'
import { useDispatch} from 'react-redux'
import { findByRating } from '../../redux/actions'
import { useState } from 'react'

const SearchRating = () => {
    
    const dispatch = useDispatch()
    const [rating , setRating] = useState("")

    const handleChange = (e) => {       
        setRating(e.target.value)
    }

    const handlesubmit = (e) =>{
        e.preventDefault()
        dispatch(findByRating(rating))
        setRating("")
    }
    
    return (
        <div>
            <form onSubmit={(e) => handlesubmit(e)}>
                <input
                type="text"
                placeholder='Search Rating'
                value={rating}
                onChange= {(e) => handleChange(e)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchRating