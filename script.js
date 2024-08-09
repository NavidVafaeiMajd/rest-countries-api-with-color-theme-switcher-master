let mainContent = document.querySelector(".main-content");
let filterBoxSelect = document.getElementById("filter-box-select");
let searchBox = document.getElementById("search-box");

function fetchJSONData() {
    fetch("./data.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            displayData(data);
            filterBoxSelect.addEventListener("change", () => filterData(data));
            searchBox.addEventListener("input", () => searchBoxFilter(data));
        })
        .catch((error) => console.error("Unable to fetch data:", error));
}

function displayData(data) {
    mainContent.innerHTML = '';
    data.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('main-content-item');
        itemElement.innerHTML = `
            <div class="main-content-item-img"><img src="${item.flag}" alt=""></div>
            <div class="main-content-item-padding-style">
                <div class="main-content-item-name">${item.name}</div>
                <div class="main-content-item-population"><b>Population :</b> ${item.population}</div>
                <div class="main-content-item-region"><b>Region :</b> ${item.region}</div>
                <div class="main-content-item-capital"><b>Capital :</b> ${item.capital}</div>
            </div>
        `;

        itemElement.addEventListener('click', () => {
            showMoreInfo(item);
        });

        mainContent.appendChild(itemElement);
    });
}

function filterData(data) {
    const selectedRegion = filterBoxSelect.options[filterBoxSelect.selectedIndex].text;
    const filteredData = data.filter(i => i.region === selectedRegion);
    displayData(filteredData);
}

function searchBoxFilter(data) {
    const searchBoxValue = searchBox.value.toLowerCase();
    const filteredData = data.filter(i => i.name.toLowerCase().includes(searchBoxValue));
    displayData(filteredData);
}

function showMoreInfo(item) {

    let moreInfoElement = document.querySelector('.more-info');
    moreInfoElement.innerHTML = `
            <div class="countainer">
                <div class="back-btn-more-info">
                    <button id="back-btn-more-info" onclick="backBtn()"> Back</button>
                </div>
                <div class="main-content-more-info">
                    <div class="flage-more-info">
                        <img src="${item.flag}" alt="">
                    </div>
                    <div class="someinf-more-info">
                        <span id="name-country-more-info"><h2>${item.name}</h2></span>
                        <span id="native-name-country-more-info"><b>Native Name : </b>${item.nativeName}</span>
                        <span id="top-level-domain-more-info"><b>Top Level Domain : </b>${item.topLevelDomain}</span>
                        <span id="population-more-info"><b>Population : </b>${item.population}</span>
                        <span id="currencies-more-info"><b>Currencies : </b>${item.currencies[0].code}</span>
                        <span id="region-more-info"><b>Region : </b>${item.region}</span>
                        <span id="languages-more-info"><b>Languages : </b>${item.languages[0].name}</span>
                        <span id="subregion-more-info"><b>Subregion : </b>${item.subregion}</span>
                        <span id="capital-more-info"><b>Capital : </b>${item.capital}</span>
                    </div>
                </div>
    `;
    moreInfoElement.style.display = "flex"
    
}

function backBtn(){
    document.querySelector('.more-info').style.display = "none"
}


fetchJSONData();

document.getElementById("dark-mode").addEventListener("click" , ()=>{
    let elementBody = document.body;
    let elementInput = document.querySelector(".search-box")
    let elementDarkModeBtn = document.getElementById("dark-mode")
    let elementDarkSelect = document.getElementById("filter-box-select")
    elementBody.classList.toggle("dark-mode-body");
    elementInput.classList.toggle("dark-mode-input");
    elementDarkModeBtn.classList.toggle("drak-mode-btn")
    elementDarkSelect.classList.toggle("dark-mode-select")
    document.querySelector(".more-info").classList.toggle("more-info-dark")
});
