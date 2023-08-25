let datas = [];
let searchQueries = "";
let selectedRegion = "";
let finalCountries = [];
let changeBg = false;
 const inputs = document.getElementById("input")


// Light Mode Background
let background = "hsl(0, 0%, 98%)"
//  Light Mode Elements
let  bgTop = "hsl(0, 0%, 100%)"
// Light Mode Text 
let textColor = "hsl(200, 15%, 8%)"
// Light Mode Input
let element = "hsl(200, 15%, 8%)"


function fetchData() {
  fetch('data.json')
    .then((res) => res.json())
    .then(data => {
      datas = data;
      listCountries();
    });
}

// Fetch data whenever the page reloads
window.addEventListener('load', () => {
  fetchData();
  document.getElementById('root').style.background = background;
  document.querySelectorAll('.headingBg').forEach(element => element.style.background = bgTop);
 document.querySelectorAll(".textColor").forEach(v => v.style.color = textColor);
 document.querySelectorAll(".element").forEach(v => v.style.color = element);
});

function handleChange() {
  searchQueries = inputs.value;
  listCountries();
}

// Handle changes in the selected region
function handleRegionChange() {
  selectedRegion = regionFilter.value;
  listCountries();
}

function listCountries() {
  let filteredCountries = [];
  if (selectedRegion) {
    const countries = datas.filter(country => country?.region === selectedRegion);
    filteredCountries = countries.map((country) => country.name);
  } else {
    filteredCountries = datas.map((country) => country.name);
  }

  // filter out  country which is contain letters in  search queries
  const filteredCountry = filteredCountries.filter((country) =>
  country.toLowerCase().includes(searchQueries.toLowerCase())
  );
  
  // final Countries 
  finalCountries = datas.filter((country) =>
  filteredCountry.some((query) => country.name.includes(query))
  );

// Generate country elements
const countryElements = finalCountries.map(country => {
  
  const aElement = document.createElement('a');
  aElement.href = `country.html?name=${encodeURIComponent(country.name)}`;
  aElement.id = 'fetchCountry';
  aElement.className = 'headingBg';

  const fetchCountrySub = document.createElement('div');
  fetchCountrySub.className = 'fetchCountrySub';

  const imgElement = document.createElement('img');
  imgElement.src = country.flag;
  imgElement.alt = 'Country Flag';
  fetchCountrySub.appendChild(imgElement);

  aElement.appendChild(fetchCountrySub);

  const countryDetails = document.createElement('div');
  countryDetails.className = 'countryDetails';

  const h1Element = document.createElement('h1');
  h1Element.className = 'textColor';
  h1Element.textContent = country.name;
  countryDetails.appendChild(h1Element);

  const populationElement = document.createElement('h3');
  populationElement.className = 'element';
  const populationSpan = document.createElement('span');
  populationSpan.textContent = 'Population: ';
  populationElement.appendChild(populationSpan);
  populationElement.textContent += country.population;
  countryDetails.appendChild(populationElement);

  const regionElement = document.createElement('h3');
  regionElement.className = 'element';
  const regionSpan = document.createElement('span');
  regionSpan.textContent = 'Region: ';
  regionElement.appendChild(regionSpan);
  regionElement.textContent += country.region;
  countryDetails.appendChild(regionElement);

  const capitalElement = document.createElement('h3');
  capitalElement.className = 'element';
  const capitalSpan = document.createElement('span');
  capitalSpan.textContent = 'Capital: ';
  capitalElement.appendChild(capitalSpan);
  capitalElement.textContent = country.capital;
  countryDetails.appendChild(capitalElement);

  aElement.appendChild(countryDetails);
  return aElement;
});

// Append country elements to the designated element
const fetchDataElement = document.getElementById('fetchData');
   fetchDataElement.innerHTML = ''; 
   countryElements.map(element => fetchDataElement.appendChild(element));
 }
 
 

//  change Bg onclick
document.getElementById("darkMode").addEventListener('click', () => {
changeBg = !changeBg

if (changeBg) {
 //  Dark Mode Background
background = "hsl(207, 26%, 17%)"
// Dark Mode Elements
bgTop = "hsl(209, 23%, 22%)"
// Dark Mode Text and Dark Mode Text
textColor = "hsl(0, 0%, 100%)"
// Dark Mode Input
element = "hsl(0, 0%, 90%)";

} else {
//  Light Mode Background 
 background = "hsl(0, 0%, 98%)"
  // Light Mode Elements
  bgTop = "hsl(0, 0%, 100%)"
 // Light Mode Text
 textColor = "hsl(200, 15%, 8%)"
// Light Mode Input
element = "hsl(200, 15%, 8%)"

}
document.getElementById('root').style.background = background;
document.querySelectorAll('.headingBg').forEach(v => v.style.background = bgTop);
document.querySelectorAll(".textColor").forEach(v => v.style.color = textColor);
document.querySelectorAll(".element").forEach(v => v.style.color = element);

})



// country detail
const countryDetailContainer = document.getElementById('country-detail');

// Get the country name from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('name');

// Load data.json using fetch and render country details
fetch("/data.json")
.then((res) => res.json())
  .then(data => {
    // find a particular country which country is equal to countryName
    const country = data.find(country => country.name === countryName);
    console.log(country)

    if (country) {
      const borderList = document.createElement('div');
      borderList.className = "borders textColor"
      borderList.innerHTML = "<h3 class='textColor'>Bounder Countries :</h3>"

      const borders = country.borders;

      if(borders) {
        borders.forEach(border => {
        const borderItem = document.createElement('span');
        borderItem.textContent = border;
        borderItem.className = "textColor bordersspan"
        borderList.appendChild(borderItem);
      });
      } else {
        borderList.innerHTML = `<h3 class='textColor'>Bounder Countries </h3>: ${country.name}does not have a border`
      }
      

      countryDetailContainer.innerHTML = `
        <div id="all">
          <div class="countrySub">
            <a href="/" class="textColor headingBg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="element">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  fill="currentColor"></path>
              </svg>
              <h3 class="textColor">back</h3>
            </a>
          </div>
          <div id="country">
            <div class="countryImg">
              <img src="${country.flag}" alt="country flag" />
            </div>
            <div class="countryInfo">
              <h1 class="textColor">${country.name}</h1>
              <div class="countryInfoSub">
                <div class="countryInfoSubsOne">
                  <h3 class="element">
                    <span>Native Name : </span>
                    ${country.nativeName}
                  </h3>
                  <h3 class="element">
                    <span>Population: </span>
                    ${country.population}
                  </h3>
                  <h3 class="element">
                    <span>Region: </span>
                    ${country.region}
                  </h3>
                  <h3 class="element">
                    <span>Sub-Region: </span>
                    ${country.subregion}
                  </h3>
                  <h3 class="element">
                    <span>Capital: </span>
                    ${country.capital}
                  </h3>
                </div>
                <div class="countryInfoSubsOne">
                  <h3 class="element">
                    <span>Top Level Domain: </span>
                    ${country.topLevelDomain}
                  </h3>
                  <h3 class="element">
                    <span>Currencies: </span>
                    ${country.currencies[0]?.name}
                  </h3>
                  <h3 class="element">
                    <span>Languages: </span>
                    ${country.languages.map(lang => lang.name).join(', ')}
                  </h3>
                </div>
              </div>
              <div class="borders textColor"> ${borderList.outerHTML} </div>
            </div>
          </div>
        </div>
      `;
    } else {
      countryDetailContainer.innerHTML = '<p>Country not found.</p>';
    }
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });
