// variables for search bar
const pexelKey = config.PEXEL_API;

// DOM variables searchterms for api
const heroSearchTerm = document.querySelector('#hero-search-term');
const overlaySearchTerm = document.querySelector('#overlay-search-term');
const mobileSearchTerm = document.querySelector('#mobile-search-term');
const topnavSearchTerm = document.querySelector('#topnav-search-term');

// DOM variables for search containers
const heroSearchBarCtr = document.querySelector('.hero-search-bar-ctr');
const overlaySearchCtr = document.querySelector('.overlay-search-ctr');
const mobileSearchCtr = document.querySelector('.mobile-search-ctr');
const submitBtn = document.querySelector('.submit-btn');

// DOM variables for trending search items
const trendingOne = document.getElementById('trending-one');
const trendingTwo = document.getElementById('trending-two');
const trendingThree = document.getElementById('trending-three');
const trendingFour = document.getElementById('trending-four');
const trendingItems = document.querySelectorAll('.trending-item');

// DOM variables for photo columns
const columnOne = document.querySelector('.photos-column-one');
const columnTwo = document.querySelector('.photos-column-two');
const columnThree = document.querySelector('.photos-column-three');

// DOM variables sticky navbar
const navBar = document.querySelector('#nav-bar');
const navLinks = document.querySelectorAll('.nav-link');
const joinBtn = document.querySelector('#join-btn');
const menuIcon = document.querySelector('.menu-icon');
const topNavSearchBarCtr = document.querySelector('.topnav-search-bar-ctr');
const mobileNav = document.querySelector('.mobile-nav');
const mobileSearchBarCtr = document.querySelector('.mobile-search-bar-ctr');
const mobileJoinBtn = document.querySelector('#mobile-join-btn');


// overlay nav functions
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

// Search Term variable for the search API
let termToSearch;

// Pexels API search request
const searchEvent = (e) => {
    e.preventDefault();
    columnOne.innerHTML = ``;
    columnTwo.innerHTML = ``;
    columnThree.innerHTML = ``;
    console.log(termToSearch)
    const url = `https://api.pexels.com/v1/search?query=${termToSearch}&per_page=24`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(xhttp.responseText);
            console.log(data);
            console.log(data.photos);

            for (let i = 0; i < data.photos.length; i++) {
                const photoDiv = document.createElement('div');
                photoDiv.classList.add('img-ctr');
                if (i <= 7) {
                    photoDiv.innerHTML = `
                        <img
                            class="pexel-img"
                            lazy="load"
                            src=${data.photos[i].src.large}
                            alt=${data.photos[i].alt}
                        >
                    `;
                    columnOne.appendChild(photoDiv);
                } else if (i > 7 && i <= 15) {
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

// first api search request for page load
window.onload = function(e) {
    termToSearch = 'beautiful';
    searchEvent(e);
}

// search container api eventhandlers
heroSearchBarCtr.addEventListener('submit', (e) => {
    termToSearch = heroSearchTerm.value;
    searchEvent(e);
    heroSearchTerm.value = '';
})

mobileSearchBarCtr.addEventListener('submit', (e) => {
    termToSearch = mobileSearchTerm.value;
    searchEvent(e);
    mobileSearchTerm.value = '';
    closeNav();
})

topNavSearchBarCtr.addEventListener('submit', (e) => {
    termToSearch = topnavSearchTerm.value;
    searchEvent(e);
    topnavSearchTerm.value = '';
    closeNav();
})

overlaySearchCtr.addEventListener('submit', (e) => {
    termToSearch = overlaySearchTerm.value;
    searchEvent(e);
    overlaySearchTerm.value = '';
    closeNav();
})

trendingOne.addEventListener('click', (e) => {
    termToSearch = trendingOne.innerText;
    searchEvent(e);
    searchTerm.value = '';
})

trendingTwo.addEventListener('click', (e) => {
    termToSearch = trendingTwo.innerText;
    searchEvent(e);
    searchTerm.value = '';
})

trendingThree.addEventListener('click', (e) => {
    termToSearch = trendingThree.innerText;
    searchEvent(e);
    searchTerm.value = '';
})

trendingFour.addEventListener('click', (e) => {
    termToSearch = trendingFour.innerText;
    searchEvent(e);
    searchTerm.value = '';
})


// Sticky Nav Bar
window.onscroll = function () {
    addStickyNav(), removeStickyNav()
};
const sticky = navBar.offsetTop;

function addStickyNav() {
    if (window.pageYOffset >= sticky) {
        mobileJoinBtn.classList.add('sticky-mobile-join-btn');
        navBar.classList.add('sticky-nav-bar');
        navLinks.forEach(navLink => {
            navLink.classList.add('sticky-nav-link');
            navLink.classList.remove('nav-link');
        })
        menuIcon.classList.add('sticky-menu-icon');
        mobileNav.classList.add('sticky-mobile-nav');
        mobileSearchBarCtr.classList.add('sticky-mobile-search-bar-ctr');
        joinBtn.classList.add('sticky-join-btn');
        topNavSearchBarCtr.classList.add('sticky-topnav-search-bar-ctr');
    }
}

function removeStickyNav() {
    if (window.pageYOffset === sticky) {
        mobileJoinBtn.classList.remove('sticky-mobile-join-btn');
        navBar.classList.remove('sticky-nav-bar');
        navLinks.forEach(navLink => {
            navLink.classList.add('nav-link');
            navLink.classList.remove('sticky-nav-link')
        })
        menuIcon.classList.remove('sticky-menu-icon');
        mobileNav.classList.remove('sticky-mobile-nav');
        mobileSearchBarCtr.classList.remove('sticky-mobile-search-bar-ctr');
        joinBtn.classList.remove('sticky-join-btn');
        topNavSearchBarCtr.classList.remove('sticky-topnav-search-bar-ctr');
    }
}