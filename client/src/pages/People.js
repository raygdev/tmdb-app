import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLoading } from '../hooks/useLoading/useLoading'
import { API_URL } from '../utils/apiUrl'
import { imageSource, noPhotoUrl } from '../utils/utils'



const People = () => {
  const [person, setPerson] = useState('')
  const { isLoading, setIsLoading, loader } = useLoading()
  const { personId } = useParams()

  useEffect(() => {
    setIsLoading(true)
    fetch(`${API_URL}/api/people/${personId}`)
        .then(res => res.json())
        .then(data => setPerson(data))
        .catch(e => console.log(e))
        .finally(() => setIsLoading(false))
    window.scrollTo(0,0)
  }, [personId])

  let castJobs = person?.movie_credits?.cast.map(titles => {
    const { character, title, poster_path, id } = titles
    return (
        <figure key={id} style={{display:"flex", width:"100%", gap:"2em"}}>
            <img style={{height: "300px", width: "200px"}} src={poster_path ? imageSource + poster_path : noPhotoUrl} alt={title}/>
            <div>
                <Link to={`/movie/selected/${id}`}>
                    <figcaption style={{color: "#1755a6"}} >{title}</figcaption>
                </Link>
                {character && <figcaption style={{color: "#767676"}}>{`as ${character}`}</figcaption>}
            </div>
        </figure>
    )
  })
  let crewJobs = person?.movie_credits?.crew.map((titles, i) => {
    const { job, title, poster_path, id } = titles
    return (
        <figure key={i} style={{display:"flex", width: "100%", gap: "2em"}}>
            <img style={{height: "300px", width: "200px"}} src={poster_path ? imageSource + poster_path : noPhotoUrl} alt={title}/>
            <div>
                <Link to={`/movie/selected/${id}`}>
                    <figcaption style={{color: "#1755a6"}}>{title}</figcaption>
                </Link>
                {job && <figcaption style={{color: "#767676"}}>{`job ${job}`}</figcaption>}
            </div>
        </figure>
    )
  })
  return isLoading ? (loader) :
         (<div>
            <div className='person_container'>
                <figure>
                    <img src={person?.profile_path ? imageSource + person.profile_path : noPhotoUrl} alt="" />
                    <figcaption>{person?.name}</figcaption>
                </figure>
                <div className='person_info_container'>
                    <h3>Biography</h3>
                    <p>{person?.biography ? person.biography : "Biography Unknown"}</p>
                    <h3>
                        Place of Birth
                    </h3>
                    <p>{person?.place_of_birth ? person.place_of_birth : "Unknown"}</p>
                </div>
                
                {castJobs}
                {crewJobs}
            </div>
         </div>)
        
    
}
export default People