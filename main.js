const pexelKey = config.PEXEL_API;
const searchTerm = document.querySelector('#search-term');
const columnOne = document.querySelector('.photos-column-one');
const columnTwo = document.querySelector('.photos-column-two');
const columnThree = document.querySelector('.photos-column-three');
const searchCtr = document.querySelector('.search-bar-ctr');
const submitBtn = document.querySelector('.submit-btn');


const eventHandler = (e) => {
    e.preventDefault();
    columnOne.innerHTML = ``;
    columnTwo.innerHTML = ``;
    columnThree.innerHTML = ``;
    let term = searchTerm.value;
    const url = `https://api.pexels.com/v1/search?query=${term}&per_page=24`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(xhttp.responseText);
            console.log(data);
            console.log(data.photos);

            for(let i = 0; i < data.photos.length; i++) {
                const photoDiv = document.createElement('div');
                photoDiv.classList.add('img-ctr');
                if(i <= 7) {
                    photoDiv.innerHTML = `
                        <img 
                            lazy="load"
                            src=${data.photos[i].src.medium}
                            alt=${data.photos[i].alt}
                        >
                    `;
                    columnOne.appendChild(photoDiv);
                } else if(i > 7 && i <= 15) {
                    photoDiv.innerHTML = `
                        <img 
                            lazy="load"
                            src=${data.photos[i].src.medium}
                            alt=${data.photos[i].alt}
                        >
                    `;
                    columnTwo.appendChild(photoDiv);
                } else {
                    photoDiv.innerHTML = `
                        <img 
                            lazy="load"
                            src=${data.photos[i].src.medium}
                            alt=${data.photos[i].alt}
                        >
                    `;
                    columnThree.appendChild(photoDiv);
                }
            } 

            // Below works but changing because I want to make a three column layout
            // data.photos.forEach(function(photo) {
            //     const photoDiv = document.createElement('div');
            //     photoDiv.classList.add('img-ctr');
            //     photoDiv.innerHTML = `
            //         <img 
            //             lazy="load"
            //             src=${photo.src.medium}
            //             alt=${photo.alt}
            //         >
            //     `;
            //     photosCtr.appendChild(photoDiv);
            // })

        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', pexelKey)
    xhttp.send();
}

searchCtr.addEventListener('submit', eventHandler);