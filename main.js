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
                let image = anime.images.jpg.image_url; //accedo a la url de las imagenes
                const title = anime.title;
                const withoutImage = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
                const placeHolder = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
                if (image === withoutImage) {
                    image = placeHolder
                }
                list.innerHTML += `<li class="js-list-anime"> 
                <img src="${image}" alt="Imagen del anime ${title}">
                <h3>${title}</h3>
                </li>`

                const allAnime = document.querySelectorAll(".js-list-anime");
                
            }

        })
}


button.addEventListener("click", handleSearch);