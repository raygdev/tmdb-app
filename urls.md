https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
full image url t/p/ w500 is file size url for image and endpoint is to the actual image.jpg

Does not have to be w500 could also call original as a parameter and would return original photo

svg icons or .svg suggested to use 'original' parameter

endpoints: /t/p/<file_size>/<file_path>
base url: https://image.tmdb.org

https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images

&append_to_response: query to append single or multipe comma separated queries that return an appended json object to the response