const pexelKey = config.PEXEL_API;
const searchTerm = document.querySelector('#search-term');
const photoColumnOne = document.querySelector('.photo-column-one');
const photoColumnTwo = document.querySelector('.photo-column-two');
const searchCtr = document.querySelector('.search-bar-ctr');
const submitBtn = document.querySelector('.submit-btn');


const eventHandler = (e) => {
    e.preventDefault();
    let term = searchTerm.value;
    const url = `https://api.pexels.com/v1/search?query=${term}`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(xhttp.responseText);
            console.log(data);
            console.log(data.photos);

            for(i =0; i < data.photos.length; i++){
                if(i < 7) {
                    const photoDiv = document.createElement('div');
                    photoDiv.classList.add('img-ctr');
                    photoDiv.innerHTML = `
                    <img 
                        lazy="load"
                        src=${data.photos[i].src.small}
                        alt=${data.photos[i].alt}
                    >
                `;
                photoColumnOne.appendChild(photoDiv);
                } else {
                    const photoDiv = document.createElement('div');
                    photoDiv.classList.add('img-ctr');
                    photoDiv.innerHTML = `
                    <img 
                        lazy="load"
                        src=${data.photos[i].src.small}
                        alt=${data.photos[i].alt}
                    >
                `;
                photoColumnTwo.appendChild(photoDiv);
                }
            
            }
       
            
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', pexelKey)
    xhttp.send();
}

searchCtr.addEventListener('submit', eventHandler);