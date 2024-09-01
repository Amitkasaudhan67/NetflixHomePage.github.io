const apiKey = 'cffe6191ffa1b7de722cf7af5fc718ed';

async function fetchMovies(typeOrGenre, elementId, isGenre = false) {
    let baseUrl;
    if (isGenre) {
        baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${typeOrGenre}&page=1`;
    } else {
        baseUrl = `https://api.themoviedb.org/3/movie/${typeOrGenre}?api_key=${apiKey}&language=en-US&page=1`;
    }

    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        const moviePostersContainer = document.getElementById(elementId);

        data.results.forEach(movie => {
            const posterDiv = document.createElement('div');
            posterDiv.classList.add('poster');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/w200' + movie.poster_path;
            img.alt = movie.title;
            posterDiv.appendChild(img);
            moviePostersContainer.appendChild(posterDiv);

            // Add event listener to update the banner with image, title, and description on click
            posterDiv.addEventListener('click', () => {
                updateBanner(movie);
            });
        });
    } catch (error) {
        console.error('Error fetching the movies:', error);
    }
}

function updateBanner(movie) {
    const bannerImage = document.getElementById('banner-image');
    const bannerTitle = document.getElementById('banner-title');
    const bannerDescription = document.getElementById('banner-description');

    // Update the banner image, title, and description
    if (movie.backdrop_path) {
        bannerImage.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
        bannerImage.alt = movie.title;
    } else {
        // Fallback image if no backdrop is available
        bannerImage.src = 'fallback-image-url.jpg'; // Replace with your fallback image URL
        bannerImage.alt = 'No image available';
    }

    bannerTitle.textContent = movie.title;
    bannerDescription.textContent = movie.overview;
}

// Fetch data for different categories
fetchMovies('popular', 'trending-now'); // Trending
fetchMovies('top_rated', 'top-rated'); // Top Rated
fetchMovies('now_playing', 'netflix-originals'); // Netflix Originals
fetchMovies('28', 'action-movies', true); // Action Movies (genre ID 28)
