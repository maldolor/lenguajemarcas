/**  API  */
const api = "https://api.jikan.moe/v3";

/** Funcion coger nombre y acitvar funcion de busqueda  */

function cargar(){
    /** Formulario */
    const form = document.getElementById('formulario');
    /** Activador del buscador */
    form.addEventListener("submit", buscadorA);
}
window.addEventListener("load", cargar);
/**
 * Funcion para buscar el anime
 * @param {*} event activacion de la funcion 
 */

function buscadorA(event){

    event.preventDefault();

    const form = new FormData(this);
    /** Nombre del anime que busca en la API */
    const nombreanime = form.get("buscar");
    /** Peticion a la red con la api y el nombre  */
    fetch(`${api}/search/anime?q=${nombreanime}&limit=1`)
    /** Respuesta en .json */
    .then(res=>res.json())
    /** Activar la funcion de actualizar la pagina  */
    .then(updateDom)
}
/**
 * Funcion para actualizacion de la pagina 
 * @param {*} data 
 */
function updateDom(data){

    const busquedaDeAnime = document.getElementById('busca');

    const animes = data.results
    
        .reduce((acc, anime)=>{

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;

        }, {});

        busquedaDeAnime.innerHTML = Object.keys(animes).map(key=>{

            const animesHTML = animes[key]
            .map(anime=>{
               /**Anime que me devuelve con css y lo que quiero que me devuelva */
                return `
                    <div class="bloque">
                        <div class="imagen">
                            <img src="${anime.image_url}">
                        </div>
                        <div class="contenido">
                            <span class="titulo">${anime.title}</span>
                            <p>${anime.synopsis}</p>
                        </div>
                    </div>
                `
            }).join("");


            return `
                <section>
                    <div>${animesHTML}</div>
                </section>
            `
        }).join("");
}







