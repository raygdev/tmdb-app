let API_URL;
if(process.env.NODE_ENV === "production"){
    API_URL = 'https://tmdb-api-pi.vercel.app'
} else {
    API_URL = "http://localhost:5000"
}

export { API_URL }
// API_URL = "https://tmdb-api-rwj0.onrender.com"