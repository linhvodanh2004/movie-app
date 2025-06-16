import React from 'react'

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
    return (
        <div className='movie-card'>
            {/* <p className='text-white'>{title}</p> */}
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                alt={title}></img>
            <div className='mt-4'>
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src='star.svg' alt='Star Icon'></img>
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <div className='lang'>
                        <p>{original_language.toUpperCase()}</p>
                    </div>
                    <span>•</span>
                    <div className='year'>
                        {release_date ? release_date.split('-')[0] : 'N/A'}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MovieCard