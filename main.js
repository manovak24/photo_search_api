// variables for search bar
const pexelKey = config.PEXEL_API;
const searchTerm = document.querySelector('#search-term');
const columnOne = document.querySelector('.photos-column-one');
const columnTwo = document.querySelector('.photos-column-two');
const columnThree = document.querySelector('.photos-column-three');
const searchCtr = document.querySelector('.search-bar-ctr');
const submitBtn = document.querySelector('.submit-btn');

// variables for trending search items
const trendingOne = document.getElementById('trending-one');
const trendingTwo = document.getElementById('trending-two');
const trendingThree = document.getElementById('trending-three');
const trendingFour = document.getElementById('trending-four');
const trendingItems = document.querySelectorAll('.trending-item');


// The below api is for when page loads and to bring up images
const onPageLoad = (e) => {
    e.preventDefault();
    let term = 'Beautiful';
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
                            class="pexel-img"
                            lazy="load"
                            src=${data.photos[i].src.large}
                            alt=${data.photos[i].alt}
                        >
                    `;
                    columnOne.appendChild(photoDiv);
                } else if(i > 7 && i <= 15) {
                    photoDiv.innerHTML = `
                        <img
                            class="pexel-img" 
                            lazy="load"
                            src=${data.photos[i].src.large}
                            alt=${data.photos[i].alt}
                        >
                    `;
                    columnTwo.appendChild(photoDiv);
                } else {
                    photoDiv.innerHTML = `
                        <img
                            class="pexel-img" 
                            lazy="load"
                            src=${data.photos[i].src.large}
                            alt=${data.photos[i].alt}
                        >
                    `;
                    columnThree.appendChild(photoDiv);
                }
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', pexelKey)
    xhttp.send();
}

window.onload = function(e) {
    onPageLoad(e);
}


// Term variable for the search API
let term;

// The below api request is for using the search bar
const searchEvent = (e) => {
    e.preventDefault();
    columnOne.innerHTML = ``;
    columnTwo.innerHTML = ``;
    columnThree.innerHTML = ``;
    console.log(term)
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
                            class="pexel-img"
                            lazy="load"
                            src=${data.photos[i].src.large}
                            alt=${data.photos[i].alt}
                        >
                    `;
                    columnOne.appendChild(photoDiv);
                } else if(i > 7 && i <= 15) {
                    photoDiv.innerHTML = `
                        <img
                            class="pexel-img"
                            lazy="load"
                            src=${data.photos[i].src.large}
                            alt=${data.photos[i].alt}
                        >
                    `;
                    columnTwo.appendChild(photoDiv);
                } else {
                    photoDiv.innerHTML = `
                        <img
                            class="pexel-img"
                            lazy="load"
                            src=${data.photos[i].src.large}
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

// Event Listeners for search bar and each trending tag
searchCtr.addEventListener('submit', (e) => {
    // set term variable for api to the search term value
    term = searchTerm.value;
    // call search event function
    searchEvent(e);
    // clear the search bar for blank result after search api
    searchTerm.value = '';
});

trendingOne.addEventListener('click', (e) => {
    term = trendingOne.innerText;
    searchEvent(e);
    searchTerm.value = '';
})

trendingTwo.addEventListener('click', (e) => {
    term = trendingTwo.innerText;
    searchEvent(e);
    searchTerm.value = '';
})

trendingThree.addEventListener('click', (e) => {
    term = trendingThree.innerText;
    searchEvent(e);
    searchTerm.value = '';
})

trendingFour.addEventListener('click', (e) => {
    term = trendingFour.innerText;
    searchEvent(e);
    searchTerm.value = '';
})

// Testing out anime.js and added to hero-content
anime({
    targets: '.hero-content',
    translateY: [
        { value: -20, duration: 1000 },
        { value: 0, duration: 800}
    ],
    direction: 'alternate',
    loop: 'false',
    easing: 'linear'
});