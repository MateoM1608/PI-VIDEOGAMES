import React from 'react';
import './Paginate.css'
import ArrowL from '../../img/arrowL.png'
import ArrowR from '../../img/arrowR.png'

const Paginate = ({pages, videogames, numberPages,currentPage, prevPage, nextPage}) =>{

   console.log('numero en pagina', numberPages)
    
   let prev = 0
   let next = 0
   if(currentPage === 1){
        prev = 1
        next = 3
   }else if(currentPage === numberPages.length){
       prev = currentPage -2
       next = currentPage 
   }else{
       prev= currentPage -1
       next= currentPage +1
   }
    
    return (
        <div className="order">
            <img src={ArrowL} onClick={() => prevPage() }  className={ currentPage === 1?'flechas_hidden':'flechas'  }/>
            {numberPages && numberPages.map(number => {
                if(number >= prev && number <= next){
                    return(
                        <div  key={number}>
                            <button className={ number === currentPage ? 'current' : 'paginate'}  onClick={() => pages(number)}>{number}</button>
                        </div>
                    )

                }
            })}
            <img src={ArrowR} onClick={() => nextPage() }  className={ currentPage === numberPages.length?'flechas_hidden':'flechas'  } />
        </div>
    )
}

export default Paginate