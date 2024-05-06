import { imageSource, noPhotoUrl } from '../utils/utils'
import { usePeople } from '../hooks/usePeople'
import CastJobs from '../components/CastJobs'
import CrewJobs from '../components/CrewJobs'



const People = () => {
  const{ person, loader, isLoading } = usePeople()

  if(isLoading) return loader

  let castJobs = person.movie_credits?.cast.map(titles => {
    const { character, title, poster_path, id } = titles
    return <CastJobs key={id} character={character} title={title} poster_path={poster_path} id={id} />
  })

  let crewJobs = person.movie_credits?.crew.map((titles, i) => {
    const { job, title, poster_path, id } = titles
    return <CrewJobs key={i} job={job} title={title} poster_path={poster_path} id={id} />
  })

  return (
        <div>
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
        </div>
    )
}
export default People