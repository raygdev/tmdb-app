import { Link } from "react-router-dom"
import { imageSource, noPhotoUrl } from "../utils/utils"

function CastJobs(props) {
    const { character, title, poster_path, id } = props
    return (
        <figure style={{display:"flex", width:"100%", gap:"2em"}}>
            <img style={{height: "300px", width: "200px"}} src={poster_path ? imageSource + poster_path : noPhotoUrl} alt={title}/>
            <div>
                <Link to={`/movie/selected/${id}`}>
                    <figcaption style={{color: "#1755a6"}} >{title}</figcaption>
                </Link>
                {character && <figcaption style={{color: "#767676"}}>{`as ${character}`}</figcaption>}
            </div>
        </figure>
    )
}

export default CastJobs