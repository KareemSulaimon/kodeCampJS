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
countryElements.map(element => fetchDataElement.appendChild(element));
console.log(fetchDataElement)

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

