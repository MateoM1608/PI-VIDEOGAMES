import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getVideogames, getGenres, orderByAlphabet, orderByRating, filterByVieogame, filterByGenres, reload} from '../../redux/actions/index';
import './Home.css'

import NavBar from '../NavBar/NavBar';
import CardVideogame from '../CardVideogame/CardVideogame';
import OrderBy from '../OrderBy/OrderBy';
import Filter from '../Filter/Filter';
import Paginate from '../Paginate/Paginate';


const Home = () => {

    const dispatch = useDispatch()
    const Allgenres = useSelector(estado => estado.genres)
    const videogames = useSelector(state => state.videogames)
    const [pageAnt, setPageAnt] = useState(0)
    const [pagePost, setPagePost] = useState(15)
    const [currentPage, setCurrentPage] = useState(1)
    const [values, setValue] = useState({
        genres: "",
        create: "",
        name: "",
        reating: ""
    })

    let pageslice = videogames.slice(pageAnt, pagePost)
    
    useEffect(()=>{
        dispatch(getGenres())
        dispatch(getVideogames())
    },[dispatch])

   
    let number = []
    for(let i = 0; i < Math.ceil(videogames.length/15); i++){   
        number.push(i+1)
    }
        
    const prevPage = () =>{
        if(currentPage > 1){
            pages(currentPage-1)
        }
    }
    const nextPage = () =>{
        if(currentPage < number.length ){
            pages(currentPage+1)
        }
    }
    const handleByName = (e) => {
        dispatch(orderByAlphabet(e.target.value))
        pages(1)
        setValue({
            ...values,
            genres: "",
            create: "",
            name: e.target.value,
            rating: ""
        })
    }
    const handleByRating = (e) => {
        dispatch(orderByRating(e.target.value))
        pages(1)
        setValue({
            ...values,
            genres: "",
            create: "",
            name: "",
            rating: e.target.value
        })
    }
    const handleByCreate = (e) => {
        dispatch(filterByVieogame(e.target.value))
        pages(1)
        setValue({
            ...values,
            genres: "",
            create: e.target.value,
            name: "",
            rating: ""
        })
    }
    const handleByGenres = (e) =>{
        dispatch(filterByGenres(e.target.value))
        pages(1)
        setValue({
            ...values,
            genres: e.target.value,
            create: "",
            name: "",
            rating: ""
        })
    }
    const pages = (page) =>{
        console.log('ejecutado')
        
        let cant = 15
        if(page === 1){
            setPageAnt(0) 
            setPagePost(cant)
        }
        else if(page>1){
            setPageAnt(cant*(page-1))
            setPagePost(cant*page)
        }
        setCurrentPage(page)
        
    }
    const Reload = () =>{
        dispatch(reload())
        pages(1)
    }


    return (
        <div className='divHome'>
            <NavBar/>
            <div className='filters'>
                <OrderBy 
                    handleByName={handleByName} 
                    handleByRating={handleByRating} 
                    values={values}
                />
                <Filter 
                    handleByCreate={handleByCreate} 
                    handleByGenres={handleByGenres} 
                    Allgenres={Allgenres} values={values}
                />
                <button className="btnFilter" onClick={() =>Reload()}>Reload</button>
            </div>
                {pageslice.length > 0 ?
                    <div>
                        <Paginate 
                            pages={pages} 
                            videogames={videogames} 
                            numberPages={number} 
                            currentPage={currentPage} 
                            prevPage={prevPage} 
                            nextPage={nextPage}
                        />
                        <div className='cards'>
                            {pageslice.map(v=>(
                                <CardVideogame
                                    name={v.name}
                                    Genres={v.Genres}
                                    image={v.image}
                                    rating={v.rating}
                                    id={v.id}
                                    createdInDb={v.createdInDb}
                                    key={v.id}
                                />
                            ))}
                        </div>
                        <Paginate 
                            pages={pages} 
                            videogames={videogames} 
                            numberPages={number} 
                            currentPage={currentPage} 
                            prevPage={prevPage} 
                            nextPage={nextPage}
                        />
                    </div>:
                    <div className='divLoad'>
                        <img  className="giftLoad" src="https://acegif.com/wp-content/uploads/loading-38.gif" alt="img"/>
                    </div>
                }
        </div>
    )
}

export default Home;