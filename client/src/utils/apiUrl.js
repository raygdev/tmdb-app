let API_URL;
if(process.env.NODE_ENV === "production"){
    API_URL = 'https://eager-polo-shirt-crow.cyclic.app'
} else {
    API_URL = "http://localhost:8080"
}

export { API_URL }
// API_URL = "https://tmdb-api-rwj0.onrender.com"