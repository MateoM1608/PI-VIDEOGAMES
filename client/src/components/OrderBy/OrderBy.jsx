import React from 'react';
import './OrderBy.css'
import '../Filter/Filter.css'

const OrderBy = ({handleByName, handleByRating}) =>{
    return (
        <div>
            <div>
                <form>
                <select className="content-select" value="" onChange={(e) => handleByName(e)}>
                    <option value="">Order by Name</option>
                    <option value="abc">(A - Z)</option>
                    <option value="bca">(Z - A)</option>
                </select>
                <select className="content-select" value="" onChange={(e) => handleByRating(e) }>
                    <option value="">Order by Rating</option>
                    <option value="menor">(1 - 5)</option>
                    <option value="mayor">(5 - 1)</option>
                </select>
                </form>
                
            </div>
        </div>
    )
}

export default OrderBy;