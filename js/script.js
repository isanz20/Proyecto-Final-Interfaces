const DATA_URL = "https://raw.githubusercontent.com/isanz20/Proyecto-Final-Interfaces/main/res/imdb_top_1000.json";

class Movie {
    constructor(Poster_Link, Series_Title, Released_Year, Certificate, Runtime, Genre, IMDB_Rating, Overview, Meta_score, Director, Star1, Star2, Star3, Star4, No_of_Votes, Gross) {
        this.poster_link = Poster_Link;
        this.series_title = Series_Title;
        this.released_year = Released_Year;
        this.certificate = Certificate;
        this.runtime = Runtime;
        this.genre = Genre;
        this.imdb_rating = IMDB_Rating;
        this.overview = Overview;
        this.meta_score = Meta_score;
        this.director = Director;
        this.star1 = Star1;
        this.star2 = Star2;
        this.star3 = Star3;
        this.star4 = Star4;
        this.no_of_votes = No_of_Votes;
        this.gross = Gross;
    }
}

function cargarDatos() {
    fetch(DATA_URL)
        .then(response => response.json())
        .then(peliculas => {
            console.log(peliculas);
            let contenedor = document.getElementById("moviesContainer");
            peliculas.forEach(p => {
                let pelicula = new Movie(p.Poster_Link, p.Series_Title, p.Released_Year, p.Certificate, p.Runtime, p.Genre, p.IMDB_Rating, p.Overview, p.Meta_score, p.Director, p.Star1, p.Star2, p.Star3, p.Star4, p.No_of_Votes, p.Gross);
                let card = crearCard(pelicula);
                contenedor.appendChild(card);
            });
        });
}

/**
 * 
 * @param {Movie} pelicula 
 * @returns 
 */
function crearCard(pelicula) {
    console.log(pelicula);
    let card = document.createElement("div");
    card.innerHTML = `
    <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
        <div class="uk-card-media-left uk-cover-container">
            <img src="${pelicula.poster_link}" alt="${pelicula.series_title}" uk-cover>
            <canvas width="70" height="100"></canvas>
        </div>
        <div>
            <div class="uk-card-body">
                <div class="uk-card-badge uk-label">${pelicula.imdb_rating}</div>
                <h3 class="uk-card-title">${pelicula.series_title}</h3>
                <ul class="uk-list">
                    <li><strong>Año:</strong> ${pelicula.released_year}</li>
                    <li><strong>Clasificación:</strong> ${pelicula.certificate}</li>
                    <li><strong>Duración:</strong> ${pelicula.runtime}</li>
                    <li><strong>Género:</strong> ${pelicula.genre}</li>
                    <li><strong>Director:</strong> ${pelicula.director}</li>
                    <li><strong>Estrellas:</strong> ${pelicula.star1}, ${pelicula.star2}, ${pelicula.star3}, ${pelicula.star4}</li>
                    <li><strong>Votos:</strong> ${pelicula.no_of_votes}</li>
                    <li><strong>Ingresos:</strong> ${pelicula.gross}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
    return card;
}

window.onload = cargarDatos;