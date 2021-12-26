import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'



const Fav = () => {
    let data = useLocation()
 
     const [favs , setFavs] = useState(data.state.fav)
    return (
 
   <main className="bg-secondary" >
      <div className="container text-center">
        <div className="row mx-auto" style={{minHeight:'100vh'}}>
          <div className="col-12 my-auto">
           <div class="card" style={{minHeight:'70vh' , width:'auto', borderRadius:'16px'}}>
            <div class="card-body">
              <div className=" my-3 row">
                <Link to='/' className="col-2 text-decoration-none h6">
                <i class="fas fa-arrow-left"></i> Go Back
                 </Link>
                 {favs.length == 0 
                    ? 
                    <h6 className='text-primary mx-auto'>No Repos Yet</h6>
                     :
                    <div className="row px-5 ">
                    {favs.map(item => (
                        <>
                        <div className="col-6 mx-auto py-2 g-2 bg-secondary rounded-pill border">
                        
                        <i class="fas fa-star pe-2 text-warning" 
                        role={'button'}
                        onClick={() => setFavs(favs.filter(x => x.name !== item?.name))}
                        ></i>               
                            <a
                              target="_blank"
                              href={item?.html}
                              class="text-light"
                            >
                              {item?.name}  <strong className="ps-2">({item?.language ? item?.language : '..'})</strong>
                            </a>
                        </div>
                        </>
                    ))}
                    
                </div>
                }
               
              
            </div>
           </div>
          </div>
        </div>
      </div>
      </div>
      
    </main>
 
    )
}

export default Fav
