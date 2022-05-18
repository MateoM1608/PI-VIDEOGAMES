import React, {useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch,} from 'react-redux';
import {getVideogameById, clearDetails} from '../../redux/actions/index'
import './DetailVideogame.css'
import Logo from '../../img/logo.png'

const DetailVideogame = () =>{

    const videogameDetail = useSelector(state => state.videogameDetail)
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    
    const handleClick = () =>{
        history.push("/Home")
        dispatch(clearDetails())
    }
    useEffect(()=>{
        dispatch(getVideogameById(id))
    },[dispatch])

    return(
        <div className='divTotalDetail'>
            <div className='divHomeDetail'>
            <img src={Logo} alt="img" onClick={handleClick} className="LogoDetail"/>
            </div>
            {videogameDetail.name ?
            <div className='divDetail'>
                <h1 className='nameDetail'>{videogameDetail.name}</h1>
               <div className='divDetailrow'>
                    <div className='spaceDetail'>
                        <p className='titleDetail'>Rating:</p>
                        <p className='resultDetail'>{videogameDetail.rating}</p>
                        <p className='titleDetail'>Released:</p>
                        <p className='resultDetail'> {videogameDetail.released}</p>
                        <p className='titleDetail'>Genres:</p>
                        <div className='rowDetails'>
                            {videogameDetail.Genres.map(g =>(
                            <p key={g} className="oderDetails resultDetail">{g}</p>
                            ))}
                        </div>
                        <p className='titleDetail'>Platforms:</p>
                        <div className='rowDetails'> 
                        {videogameDetail.platforms.map(p=>(
                        <p key={p} className="oderDetails resultDetail" >{p}</p>
                        ))}
                        </div>
                    </div>
                    <div>
                        <img className="imgDetail" src={videogameDetail.image} alt="img"/>
                    </div>
                </div>
                <div className='descDetail'>
                {videogameDetail.description}
                </div>
            </div> 
            :
                <div className='imgloadDetail'>
                    <img className="giftLoad" src="https://acegif.com/wp-content/uploads/loading-38.gif" alt="img"/>
                </div>
            }
        </div>
        
    )
}

export default DetailVideogame;