import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getVideogames } from '../../redux/actions/index'
import { useDispatch } from 'react-redux';
import './LandingPage.css'

const LandingPage = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getVideogames())
    },[dispatch])



    return(
        <div className='screen'>
            <div className='position'>
                <h2 className='title'>
                    Just play. Have fun
                </h2>
                <h2 className='enjoy'>
                    Enjoy the game
                </h2>
                <div className="btnLanding">
                <Link style={{textDecoration:"none"}} to="/Home">
                    <span>START</span>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;