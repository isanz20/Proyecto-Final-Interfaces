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
    let card = document.createElement("div");
    card.innerHTML = `
    <div class="uk-card uk-card-default uk-width-2-3@m uk-grid-collapse uk-child-width-1-3@s uk-margin" uk-grid>
        <div class="uk-card-media-left uk-cover-container">
            <img src="${pelicula.Poster_Link}" alt="${pelicula.Series_Title}" uk-cover>
            <canvas width="70" height=""></canvas>
        </div>
        <div>
            <div class="uk-card-body">
                <div class="uk-card-badge uk-label">${pelicula.IMDB_Rating}</div>
                <h3 class="uk-card-title">${pelicula.Series_Title}</h3>
                <ul class="uk-list">
                    <li><strong>Año:</strong> ${pelicula.Released_Year}</li>
                    <li><strong>Clasificación:</strong> ${pelicula.Certificate}</li>
                    <li><strong>Género:</strong> ${pelicula.Genre}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
    return card;
}

function llenarContenido(numPagina, datosPaginados) {
    let contenedor = document.getElementById("moviesContainer");
    contenedor.innerHTML = "";
    datosPaginados[numPagina].forEach(p => {
        let card = crearCard(p);
        contenedor.appendChild(card);
    });

}

function paginarDatos(peliculas, cantidad) {
    let datosPaginados = [];
    //console.log('longitud array: ' + peliculas.length);
    for (let i = 0; i < peliculas.length; i += cantidad) {
        const p = peliculas[i];
        if (!p) {
            break;
        }
        datosPaginados.push(peliculas.slice(i, i + cantidad));
    }
    return datosPaginados;
}

function construirPaginador(datosPaginados) {
    let paginador = document.getElementById("paginador");
    let ulPaginador = paginador.querySelector("ul");
    ulPaginador.innerHTML = "";

    let pagAnterior = document.createElement("li");
    pagAnterior.id = "pagAnterior";
    pagAnterior.innerHTML = `
        <a href="#"><span uk-pagination-previous></span></a>
    `;
    ulPaginador.appendChild(pagAnterior);

    for (let i = 1; i <= datosPaginados.length; i++) {
        console.log('creando paginador');
        let pagLi = document.createElement("li");
        pagLi.id = `pag-${i}`;
        pagLi.innerHTML = `
            <a href="#">${i}</a>
        `;
        if (i == paginaActual) {
            pagLi.classList.add("uk-active");
        }
        ulPaginador.appendChild(pagLi);
    }

    let pagSiguiente = document.createElement("li");
    pagSiguiente.id = "pagSiguiente";
    pagSiguiente.innerHTML = `
        <a href="#"><span uk-pagination-next></span></a>
    `;
    ulPaginador.appendChild(pagSiguiente);

    prepararPaginador(datosPaginados);
}

function prepararPaginador(datosPaginados) {
    let pagAnterior = document.getElementById("pagAnterior");
    pagAnterior.onclick = function () {
        if (paginaActual > 1) {
            paginaActual--;
            llenarContenido(paginaActual - 1, datosPaginados);
            construirPaginador(datosPaginados);
        }
    }

    for (let i = 1; i <= datosPaginados.length; i++) {
        let pagLi = document.getElementById(`pag-${i}`);
        // console.log(pagLi);
        pagLi.onclick = function () {
            llenarContenido(i - 1, datosPaginados);
            paginaActual = i;
            construirPaginador(datosPaginados);
        }
    }

    let pagSiguiente = document.getElementById("pagSiguiente");
    pagSiguiente.onclick = function () {
        if (paginaActual < datosPaginados.length) {
            paginaActual++;
            llenarContenido(paginaActual - 1, datosPaginados);
            construirPaginador(datosPaginados);
        }
    }
}

async function main() {
    let peliculas = await cargarDatos();
    let cantidad = 20;
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
    construirPaginador(datosPaginados);
}

async function grossPorAnio() {
    let grossAnio = new Map();
    let pelisAnio = new Map();
    let resultado = [];
    let pelis = await cargarDatos();

    for (let i = 0; i < pelis.length; i++) {
        let peli = pelis[i];
        if (pelisAnio.get(peli.Released_Year)) {
            let anios = parseInt(pelisAnio.get(peli.Released_Year));
            anios++;
            pelisAnio.set(peli.Released_Year, anios);
        } else {
            pelisAnio.set(peli.Released_Year, 1);
        }
        if (peli.Gross){ 
            let gross = parseInt(peli.Gross.split(",").join(""));
            if (grossAnio.get(peli.Released_Year)) {
                gross += parseInt(grossAnio.get(peli.Released_Year));
            }
            grossAnio.set(peli.Released_Year, parseInt(gross));
        }
    }
    grossAnio = new Map([...grossAnio.entries()].sort());
    resultado.push(grossAnio, pelisAnio);
    return resultado;
}

window.onload = main;