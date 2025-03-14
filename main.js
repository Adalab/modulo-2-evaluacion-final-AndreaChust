"use strict"

const search = document.querySelector(".js-input");
const button = document.querySelector(".js-btn");
const reset = document.querySelector(".js-reset");
const list = document.querySelector(".js-list");

let animeList = []; //Creo un array vacío que luego llenare con los datos del servidor, linea 20.
let animeFavoritesList = [];



const handleSearch = (ev) => {
    ev.preventDefault();
    const series = search.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${series}`)
        .then(response => response.json())
        .then(data => {
            const animes = data.data; //accedo a la propiedad de mi objeto
            animeList = animes; //Lleno mi array vacío
            list.innerHTML = "";
            for (const anime of animes) {
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

        })
}


button.addEventListener("click", handleSearch);

function handleAddFavorite(ev){
    const idCartoon = ev.currentTarget.id;
    const animeSelected = animeList.find((anime) => {
        return anime.mal_id === idCartoon;
    })
    
}