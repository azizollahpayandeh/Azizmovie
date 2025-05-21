from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from typing import List, Optional
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="DigiMedia API",
    description="API برای دریافت اطلاعات فیلم‌ها از The Movie Database",
    version="1.0.0"
)

# تنظیمات CORS برای ارتباط با فرانت‌اند
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # آدرس فرانت‌اند
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# مدل‌های داده
class Movie(BaseModel):
    id: int
    original_title: str
    vote_average: float
    poster_path: str
    overview: Optional[str] = None
    release_date: Optional[str] = None
    genre_ids: Optional[List[int]] = None
    backdrop_path: Optional[str] = None

# تنظیمات API
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original"

headers = {
    "Authorization": f"Bearer {os.getenv('TMDB_API_KEY')}",
    "accept": "application/json"
}

@app.get("/")
async def root():
    return {
        "message": "به API دیجی‌مدیا خوش آمدید",
        "version": "1.0.0",
        "endpoints": {
            "trending_movies": "/api/movies/trending",
            "movie_details": "/api/movies/{movie_id}",
            "search_movies": "/api/movies/search/{query}"
        }
    }

@app.get("/api/movies/trending", response_model=List[Movie])
async def get_trending_movies():
    try:
        response = requests.get(
            f"{TMDB_BASE_URL}/trending/movie/day",
            headers=headers
        )
        response.raise_for_status()
        data = response.json()
        
        movies = []
        for movie in data["results"]:
            movie_data = {
                "id": movie["id"],
                "original_title": movie["original_title"],
                "vote_average": movie["vote_average"],
                "poster_path": f"{TMDB_IMAGE_BASE_URL}{movie['poster_path']}" if movie.get('poster_path') else None,
                "backdrop_path": f"{TMDB_BACKDROP_BASE_URL}{movie['backdrop_path']}" if movie.get('backdrop_path') else None,
                "overview": movie.get("overview"),
                "release_date": movie.get("release_date"),
                "genre_ids": movie.get("genre_ids", [])
            }
            movies.append(movie_data)
        
        return movies
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/movies/{movie_id}", response_model=Movie)
async def get_movie_details(movie_id: int):
    try:
        response = requests.get(
            f"{TMDB_BASE_URL}/movie/{movie_id}",
            headers=headers
        )
        response.raise_for_status()
        movie = response.json()
        
        return {
            "id": movie["id"],
            "original_title": movie["original_title"],
            "vote_average": movie["vote_average"],
            "poster_path": f"{TMDB_IMAGE_BASE_URL}{movie['poster_path']}" if movie.get('poster_path') else None,
            "backdrop_path": f"{TMDB_BACKDROP_BASE_URL}{movie['backdrop_path']}" if movie.get('backdrop_path') else None,
            "overview": movie.get("overview"),
            "release_date": movie.get("release_date"),
            "genre_ids": [genre["id"] for genre in movie.get("genres", [])]
        }
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/movies/search/{query}")
async def search_movies(query: str):
    try:
        response = requests.get(
            f"{TMDB_BASE_URL}/search/movie",
            headers=headers,
            params={"query": query}
        )
        response.raise_for_status()
        data = response.json()
        
        movies = []
        for movie in data["results"]:
            movie_data = {
                "id": movie["id"],
                "original_title": movie["original_title"],
                "vote_average": movie["vote_average"],
                "poster_path": f"{TMDB_IMAGE_BASE_URL}{movie['poster_path']}" if movie.get('poster_path') else None,
                "backdrop_path": f"{TMDB_BACKDROP_BASE_URL}{movie['backdrop_path']}" if movie.get('backdrop_path') else None,
                "overview": movie.get("overview"),
                "release_date": movie.get("release_date"),
                "genre_ids": movie.get("genre_ids", [])
            }
            movies.append(movie_data)
        
        return movies
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 