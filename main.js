"use strict"

const search = document.querySelector(".js-input");
const button = document.querySelector(".js-btn");
const reset = document.querySelector(".js-reset");
const list = document.querySelector(".js-list");
const favoriteAnime = document.querySelector(".js-favorite-anime");

let animeList = []; //Creo un array vacío que luego llenare con los datos del servidor, linea 20.
let animeFavoritesList = [];

function renderAnimes (animesArray) { //Ordeno mi codigo metiendo todo esto en una funcion que mas tarde invoco donde la tenía puesta.
    list.innerHTML = ""; //Vacío mi lista antes para no repetir animes
    for (const anime of animesArray) {
        let image = anime.images.jpg.image_url; //accedo a la url de las imagenes
        const title = anime.title;
        const withoutImage = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
        const placeHolder = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
        if (image === withoutImage) {
            image = placeHolder
        }
        list.innerHTML += `<li class="js-list-anime" id=${anime.mal_id}> 
        <img src="${image}" alt="Imagen del anime ${title}">
        <h3>${title}</h3>
        </li>`

        const allCartoon = document.querySelectorAll(".js-list-anime"); //Selecciono todas las li y como devuelve un array tengo que hacer un bucle for, porque no puedo pintar directamente en mi HTML un array, a continuacion el bucle:
        for(const cartoon of allCartoon) {
            cartoon.addEventListener("click", handleAddFavorite);
        }
    }

}

const handleSearch = (ev) => {
    ev.preventDefault();
    const series = search.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${series}`)
        .then(response => response.json())
        .then(data => {
            const animes = data.data; //accedo a la propiedad de mi objeto
            animeList = animes; //Lleno mi array vacío
            localStorage.setItem("animes", JSON.stringify(animes)) //guardo animes en el navegador y convierto el objeto en string con JSON.stringify porque al navegador no le puedo pasar objetos, sale object object.
            renderAnimes(animes); //Invoco la funcion donde he guardado mis instrucciones para pintar la li en HTML
        })
}

const animesLocalStorage = JSON.parse(localStorage.getItem("animes")); // Lo hago a nivel global porque quiero saber nada mas cargarse la pagina si están o no guardadas, sin tener que esperar a ningun evento. Además hago el parse para convertir el string en objeto.
console.log(animesLocalStorage);

if (animesLocalStorage !== null) {
    renderAnimes(animesLocalStorage);
} // SE ME PINTAN LOS ANIMES DE MI ULTIMA BUSQUEDA PERO YO QUIERO QUE SE QUEDEN SOLO LOS FAVORITOS


button.addEventListener("click", handleSearch);



function handleAddFavorite(ev){
    const idCartoon = ev.currentTarget.id; // Aquí es .id porque el atributo es id.
    const animeSelected = animeList.find((anime) => {
        return anime.mal_id === parseInt(idCartoon); //Como currenTarget.id es un string y anime.mal_id es un numero va a dar undefined, por lo que tengo que convertir el currentTargert a numero con parseInt.
    })

    animeFavoritesList.push(animeSelected); //Meto los favoritos en un nuevo array

        favoriteAnime.innerHTML = "";
    for (const anime of animeFavoritesList) { // Hago otro bucle muy parecido al de arriba pero esta vez para el array de mis animes favoritos.
        let image = anime.images.jpg.image_url; //accedo a la url de las imagenes
        const title = anime.title;
        const withoutImage = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
        const placeHolder = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
        if (image === withoutImage) {
            image = placeHolder
        }
        favoriteAnime.innerHTML += `<li class="js-list-anime" id=${anime.mal_id}> 
        <img src="${image}" alt="Imagen del anime ${title}">
        <h3>${title}</h3>
        </li>`
    }
}

