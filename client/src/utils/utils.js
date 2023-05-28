import { Link } from "react-router-dom"
import React from "react"

const imageSource = "https://image.tmdb.org/t/p/w200"
const noPhotoUrl =
  "https://images.freeimages.com/clg/images/41/413691/none-icon-available-no-unavailable_f.jpg"

function displaySimilarTitles(titles, path) {
  let hash = {}
  let images = titles
    ?.filter(
      title => title.poster_path || title.profile_path || !title.profile_path
    )
    .map(title => {
      let imagePath = title.poster_path
        ? `${imageSource}${title.poster_path}`
        : title.profile_path
        ? `${imageSource}${title.profile_path}`
        : noPhotoUrl
      if (!hash[title.id]) {
        hash[title.id] = title.id
        return (
          <div className={`movie-container`} key={title.id}>
            <Link to={`${path}/${title.id}`}>
              <figure>
                <img
                  loading="lazy"
                  src={imagePath}
                  alt={title.title || title.name}
                />
                <figcaption
                  data-tool-tip={`${title.title || title.name}`}
                  className="name-truncate"
                >
                  {title.name || title.title}
                </figcaption>
              </figure>
            </Link>
          </div>
        )
      }
    })
  return images
}

function setImageFirst(people) {
  let image = []
  let non_image = []
  people?.forEach(person => {
    if (!person.profile_path) {
      non_image.push(person)
    } else {
      image.push(person)
    }
  })
  return image.concat(non_image)
}

function truncate(string) {
  return string?.length > 175
    ? string.slice(0, 175).trim().concat(`...`)
    : string
}

export { displaySimilarTitles, setImageFirst, truncate, noPhotoUrl, imageSource }
