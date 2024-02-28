const DATA_URL = "https://raw.githubusercontent.com/isanz20/Proyecto-Final-Interfaces/main/res/imdb_top_1000.json";
let paginaActual = 1;

class Movie {
    constructor(Poster_Link, Series_Title, Released_Year, Certificate, Runtime, Genre, IMDB_Rating, Overview, Meta_score, Director, Star1, Star2, Star3, Star4, No_of_Votes, Gross) {
        this.Poster_Link = Poster_Link;
        this.Series_Title = Series_Title;
        this.Released_Year = Released_Year;
        this.Certificate = Certificate;
        this.Runtime = Runtime;
        this.Genre = Genre;
        this.IMDB_Rating = IMDB_Rating;
        this.Overview = Overview;
        this.Meta_score = Meta_score;
        this.Director = Director;
        this.Star1 = Star1;
        this.Star2 = Star2;
        this.Star3 = Star3;
        this.Star4 = Star4;
        this.No_of_Votes = No_of_Votes;
        this.Gross = Gross;
    }
}

async function cargarDatos() {
    let datos = await fetch(DATA_URL);
    return datos.json();
}

/**
 * 
 * @param {Movie} pelicula 
 * @returns {HTMLElement}
 */
function crearCard(pelicula) {
    console.log(pelicula);
    let card = document.createElement("div");
    card.innerHTML = `
    <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-4@s uk-margin" uk-grid>
        <div class="uk-card-media-left">
            <img src="${pelicula.Poster_Link}" alt="${pelicula.Series_Title}">
            <canvas width="70" height="100"></canvas>
        </div>
        <div>
            <div class="uk-card-body">
                <div class="uk-card-badge uk-label">${pelicula.IMDB_Rating}</div>
                <h3 class="uk-card-title">${pelicula.Series_Title}</h3>
                <ul class="uk-list">
                    <li><strong>Año:</strong> ${pelicula.Released_Year}</li>
                    <li><strong>Clasificación:</strong> ${pelicula.Certificate}</li>
                    <li><strong>Duración:</strong> ${pelicula.Runtime}</li>
                    <li><strong>Género:</strong> ${pelicula.Genre}</li>
                    <li><strong>Director:</strong> ${pelicula.Director}</li>
                    <li><strong>Estrellas:</strong> ${pelicula.Star1}, ${pelicula.Star2}, ${pelicula.Star3}, ${pelicula.Star4}</li>
                    <li><strong>Votos:</strong> ${pelicula.No_of_Votes}</li>
                    <li><strong>Ingresos:</strong> ${pelicula.Gross}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
    return card;
}

function paginarDatos(peliculas, cantidad) {
    let datosPaginados = [];
    console.log('longitud array: ' + peliculas.length);
    for (let i = 0; i < peliculas.length; i+=cantidad) {
        const p = peliculas[i];
        if (!p) {
            break;
        }
        datosPaginados.push(peliculas.slice(i, i + cantidad));
    }
    return datosPaginados;
}

async function main() {
    let peliculas = await cargarDatos();
    let cantidad = 40;
    let contenedor = document.getElementById("moviesContainer");
    console.log(peliculas);
    let datosPaginados = paginarDatos(peliculas, cantidad);
    console.log("PELÍCULAS PAGINADAS");
    console.log(datosPaginados);
    // let card = crearCard(datosPaginados[paginaActual]);
    datosPaginados[0].forEach(p => {
        let card = crearCard(p);
        contenedor.appendChild(card);
    });
    
}

window.onload = main;