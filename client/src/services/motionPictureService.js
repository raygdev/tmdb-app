import { API_URL } from "../utils/apiUrl";

export async function getMotionPictures(motionPicture, signal) {
    const res = await fetch(`${API_URL}/api/motionpicture?motionPicture=${motionPicture}`, { signal })
    const data = await res.json()
    return data.results
}

export async function getMotionPicturesFromGenre({ genre_id, page, motion_picture }, signal) {
    const res = await fetch(
        `${API_URL}/api/genres/?with_genres=${genre_id}&page=${page}&motion_picture=${motion_picture}`,
        { signal }
      )
    const data = await res.json()
    return data
}

export async function getMovieById(id, signal) {
    const res = await fetch(`${API_URL}/api/movie/${id}`, { signal })
    const data = await res.json()
    return data
}

export async function getShowById(id, signal) {
    const res = await fetch(`${API_URL}/api/tvshow/${id}`, { signal })
    const data = await res.json()
    return data
}