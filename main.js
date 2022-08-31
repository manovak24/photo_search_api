// variables for search bar
const pexelKey = config.PEXEL_API;
const searchTerm = document.querySelector('#search-term');
const overlaySearchTerm = document.querySelector('#overlay-search-term');
const columnOne = document.querySelector('.photos-column-one');
const columnTwo = document.querySelector('.photos-column-two');
const columnThree = document.querySelector('.photos-column-three');
const searchCtr = document.querySelector('.search-bar-ctr');
const overlaySearchCtr = document.querySelector('.overlay-search-ctr');
const submitBtn = document.querySelector('.submit-btn');

// variables for trending search items
const trendingOne = document.getElementById('trending-one');
const trendingTwo = document.getElementById('trending-two');
const trendingThree = document.getElementById('trending-three');
const trendingFour = document.getElementById('trending-four');
const trendingItems = document.querySelectorAll('.trending-item');

// Search Term variable for the search API
let termToSearch;

// The below api request is for using the search bar
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
// window.onload = function(e) {
//     termToSearch = 'beautiful';
//     searchEvent(e);
// }


// Event Listeners for search bar and each trending tag
searchCtr.addEventListener('submit', (e) => {
    // set term variable for api to the search term value
    termToSearch = searchTerm.value;
    // call search event function
    searchEvent(e);
    // clear the search bar for blank result after search api
    searchTerm.value = '';
});

overlaySearchCtr.addEventListener('submit', (e) => {
    termToSearch = overlaySearchTerm.value;
    searchEvent(e);
    searchTerm.value = '';
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

// sticky navbar
const navBar = document.querySelector('#nav-bar');
const navLinks = document.querySelectorAll('.nav-link');
const menuIcon = document.querySelector('.menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
const mobileSearchBar = document.querySelector('.mobile-search-bar-ctr');
const joinBtn = document.querySelector('#mobile-join-btn');

window.onscroll = function () {
    addStickyNav(), removeStickyNav()
};
const sticky = navBar.offsetTop;

function addStickyNav() {
    if (window.pageYOffset >= sticky) {
        joinBtn.classList.add('sticky-join-btn');
        joinBtn.classList.remove('join-btn');

        navBar.classList.add('sticky-nav-bar');
        // navBar.classList.remove('nav-bar');

        navLinks.forEach(navLink => {
            navLink.classList.add('sticky-nav-link');
            navLink.classList.remove('nav-link');
        })

        menuIcon.classList.add('sticky-menu-icon');
        menuIcon.classList.remove('menu-icon');

        mobileSearchBar.classList.add('sticky-mobile-search-bar-ctr');
        mobileSearchBar.classList.remove('mobile-search-bar-ctr');
    }
}

function removeStickyNav() {
    if (window.pageYOffset === sticky) {
        joinBtn.classList.add('join-btn');
        joinBtn.classList.remove('sticky-join-btn');

        // navBar.classList.add('nav-bar')
        navBar.classList.remove('sticky-nav-bar');

        navLinks.forEach(navLink => {
            navLink.classList.add('nav-link');
            navLink.classList.remove('sticky-nav-link')
        })

        menuIcon.classList.add('menu-icon');
        menuIcon.classList.remove('sticky-menu-icon');

        mobileSearchBar.classList.add('mobile-search-bar-ctr');
        mobileSearchBar.classList.remove('sticky-mobile-search-bar-ctr');
    }
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
    // mobileNav.innerHTML = `
    //     <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&#10006;</a>
    // `;
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    // mobileNav.innerHTML = `
    //     <button class="join-btn">Join</button>
    //     <div class="menu-icon" style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</div>
    // `;
}