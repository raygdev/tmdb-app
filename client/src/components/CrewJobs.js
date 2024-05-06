import { Link } from 'react-router-dom'
import { imageSource, noPhotoUrl } from '../utils/utils'
function CrewJobs(props) {
    const { job, title, poster_path, id } = props
    return (
        <figure style={{display:"flex", width: "100%", gap: "2em"}}>
            <img style={{height: "300px", width: "200px"}} src={poster_path ? imageSource + poster_path : noPhotoUrl} alt={title}/>
            <div>
                <Link to={`/movie/selected/${id}`}>
                    <figcaption style={{color: "#1755a6"}}>{title}</figcaption>
                </Link>
                {job && <figcaption style={{color: "#767676"}}>{`job ${job}`}</figcaption>}
            </div>
        </figure>
    )
}

export default CrewJobs