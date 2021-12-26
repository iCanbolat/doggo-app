import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchReposAction,
  fetchProfileAction,
} from "./redux/slices/reposSlice";
import imgPic from "./img/gith.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [user, setUser] = useState("iCanbolat");
  const [fav , setFav] = useState([]);

  console.log(fav)
  const repos = useSelector(state => state?.repos);
  const { loading, reposList, profile, error } = repos;


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAction(user));
    dispatch(fetchReposAction(user));
  }, [user, dispatch]);
  

  return (
    <main className="bg-secondary" >
      <div className="container text-center">
        <div className="row mx-auto" style={{minHeight:'100vh'}}>
          <div className="col-12 my-auto">
           <div class="card" style={{minHeight:'70vh' , width:'auto', borderRadius:'16px'}}>
            <div class="card-body">
              <div className="  my-3 row   ">
                <div className="col-lg-2 col-md-3 col-sm-6 text-center mx-auto ">
              <input  
              value={user}
              onChange={e => setUser(e.target?.value)}
              type="text" class="form-control text-center" placeholder="Username" aria-label="Username" 
              aria-describedby="basic-addon1"></input>
           
              </div>
              <div className="row pt-3">
                  <div className="col-12 mx-auto ">
                  <Link to={{pathname:"/Fav", state: {fav:fav} }}
               className=" mt-2 ps-3 h6 text-decoration-none"><i class='fas fa-star text-warning pe-2 ' style={{paddingTop:'2px'}}></i> Fav List </Link>
                  </div>
              
              </div>
              </div>
              {loading ? (
                <h1 class="text-primary mx-auto">Loading</h1>
                 ) : error ? (
                <h1 class="text-danger mx-auto">{error?.message}</h1>
                 ) : (
              <>
              <div className="row  px-5 " style={{height:'42vh'}}>
                <div className="col-4 my-auto ">
                  <img src={profile?.avatar_url} className="img-fluid rounded-circle"   alt="" /> 
                </div>
                <div className="col-6 my-auto ms-auto ">
                  <div className="h5">Name: {profile?.name}</div>
                  <div className="h5">Location:{profile?.location}</div>
                  <div className="h5">Company:{profile?.company}</div>
                  <div className="h5">Followers:{profile?.followers}</div>
                  <div className="h5">Following:{profile?.following}</div>
                  
                </div>
              </div>
              <h5>Last 10 Repos</h5>
              <div className="row">
              {reposList?.name !== "Error" &&
                    reposList?.map(repo => (
                      <>
                        <div class="col-6 px-2 py-2 g-2   bg-secondary rounded-pill border">

                        {fav.find(item => item.name === repo?.name) ? 
                        <i class="fas fa-star pe-2 text-warning" 
                        role={'button'}
                        onClick={() => setFav(fav.filter(x => x.name !== repo?.name))}
                        ></i>:
                        <i class="far fa-star pe-2 text-warning" 
                          role={'button'}
                          onClick={() => setFav([...fav , {name : repo?.name , language : repo?.language , html:repo?.html_url}])}
                          ></i>
                      }
                        
                            <a
                              target="_blank"
                              href={repo?.html_url}
                              class="text-light"
                            >
                              {repo?.name} <strong className="ps-2">({repo?.language ? repo?.language : '..'})</strong>
                            </a>

                        </div>
                      </>
                    ))}
                    </div>
                    </> 
                    )}
 
              
            </div>
           </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default Home;
