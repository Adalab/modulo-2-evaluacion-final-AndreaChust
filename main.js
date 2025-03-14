"use strict"

const search = document.querySelector(".js-input");
const button = document.querySelector(".js-btn");
const reset = document.querySelector(".js-reset");
const list = document.querySelector(".js-list");



const handleSearch = (ev) => {
    ev.preventDefault();
    const series = search.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${series}`)
        .then(response => response.json())
        .then(data => {
            const animes = data.data; //accedo a la propiedad de mi objeto
            console.log(data);
            list.innerHTML = "";
            for (const anime of animes) {
                const image = anime.images.jpg.image_url; //accedo a la url de las imagenes
                const title = anime.title;
                list.innerHTML += `<li> 
                <img src="${image}" alt="Imagen del anime ${animes}">
                <h3>${title}</h3>
                </li>`
            }

        })
}


button.addEventListener("click", handleSearch);