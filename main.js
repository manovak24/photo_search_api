const pexelKey = config.PEXEL_API;
const searchTerm = document.querySelector('#search-term');
const photoCtr = document.querySelector('.photo-ctr');
const searchCtr = document.querySelector('.search-bar-ctr');
const submitBtn = document.querySelector('.submit-btn');


const eventHandler = (e) => {
    e.preventDefault();
    let term = searchTerm.value;
    const url = `https://api.pexels.com/v1/search?query=${term}`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        const data = JSON.parse(xhttp.responseText);
        console.log(data);
        photoCtr.innerHTML = `
                <img src="${data.photos[0].src.small}">
        `;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', pexelKey)
    xhttp.send();
}

searchCtr.addEventListener('submit', eventHandler);