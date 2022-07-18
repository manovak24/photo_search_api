const pexelKey = config.PEXEL_API;
const searchTerm = document.querySelector('#search-term');
const photosCtr = document.querySelector('.photo-ctr');
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

            data.photos.forEach(function(photo) {
                const photoDiv = document.createElement('div');
                photoDiv.innerHTML = `
                    <img src=${photo.src.medium} alt=${photo.alt}>
                `;
                photosCtr.appendChild(photoDiv);
            })
            
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', pexelKey)
    xhttp.send();
}

searchCtr.addEventListener('submit', eventHandler);