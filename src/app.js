import cities from "./cities";
const properties = document.querySelector("#property-container");
const sfHeader = document.querySelector("#sf-header");

//Buttons
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const first = document.querySelector("#first");
const last = document.querySelector("#last");

let arrayList = [];
let page = 0;

//Integrate auto complete library

const getReprString = (city) => `${city.city}, ${city.code}`;

var my_autoComplete = new autoComplete({
  selector: 'input[name="search"]',
  minChars: 3,
  source: function (term, suggest) {
    term = term.toLowerCase();
    var choices = cities;
    var matches = [];
    for (let i = 0; i < choices.length; i++)
      if (~getReprString(choices[i]).toLowerCase().indexOf(term))
        matches.push(getReprString(choices[i]));
    suggest(matches);
  },
});

//Search properties

document.querySelector("form").addEventListener("submit", searchProperties);

function searchProperties(e) {
  e.preventDefault();
  const [city, stateCode] = document
    .querySelector('input[name="search"]')
    .value.split(",")
    .map((_) => _.trim());
  fetch(
    `https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=${city}&limit=50&offset=0&state_code=${stateCode}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "realtor.p.rapidapi.com",
        "x-rapidapi-key": "be8a00a409msh54ed15d6a211e67p1a063ejsnf387341d9ff7",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response);
      clearPropertyContainer();
      arrayList = [];
      propertiesForSale(response);
      showFirstTen();
    })
    .catch((err) => {
      console.log(err);
    });
}

//San Francisco properties

document.addEventListener("DOMContentLoaded", sanFranciscoProperties);

function sanFranciscoProperties() {
  fetch(
    `https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=San%20Francisco%20&limit=50&offset=0&state_code=CA`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "realtor.p.rapidapi.com",
        "x-rapidapi-key": "be8a00a409msh54ed15d6a211e67p1a063ejsnf387341d9ff7",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response);
      arrayList = [];
      propertiesForSale(response);
      showFirstTen();
    })
    .catch((err) => {
      console.log(err);
    });
}

function propertiesForSale(homes) {
  let output = "";

  homes.properties.forEach((home) => {
    let image = home.thumbnail ? home.thumbnail : "image-not-found.png";
    let beds = home.beds ? home.beds : 0;
    let baths = home.baths ? home.baths : 0;
    let price = home.price.toLocaleString();

    output += `
      <div class="h-64 px-2 py-2 border-1 border-black mt-4 mb-12">
      <p class="font-sans text-xs text-gray-600 mb-1">Brokered by ${home.branding.listing_office.list_item.name}</p>
      <a href="${home.rdc_web_url}" class="toggle-image" data-id="${home.id}">
      <img src=${image}
      alt=""
      class="w-full h-full"></img>
      <p class="font-sans text-sm mt-2"><span class="ml-3">For Sale</span> <span class="font-semibold text-lg">$${price}</span></p>
      <p class="font-sans text-sm"><span class="ml-3 font-semibold">${beds}</span> bed   <span class="font-semibold">${baths}</span> bath</p>
      <p class="font-sans text-sm"><span class="ml-3">${home.address.line}</span>
       <span class="ml-3">${home.address.city}</span>, <span>${home.address.state_code}</span> <span>${home.address.postal_code}</span>
      </p>
      </a> 
      </div>
      `;
  });

  arrayList = arrayList.concat(output);
}

//Show first ten houses

function showFirstTen() {
  let output = "";
  for (let i = 0; i < page + 10; i++) {
    output += arrayList[i];
  }
  properties.innerHTML = output;
}

//Next button

next.addEventListener("click", () => {
  page == arrayList.length - 10 ? (page = 0) : (page += 10);
  let output = "";
  properties.innerHTML = "";
  for (let i = page; i < page + 10; i++) {
    output += arrayList[i];
  }
  properties.innerHTML = output;
});

//Previous button

previous.addEventListener("click", () => {
  page == 0 ? (page = arrayList.length - 10) : (page -= 10);
  let output = "";
  properties.innerHTML = "";
  for (let i = page; i < page + 10; i++) {
    output += arrayList[i];
  }
  properties.innerHTML = output;
});

//First button

first.addEventListener("click", () => {
  page = 0;
  let output = "";
  properties.innerHTML = "";
  for (let i = page; i < page + 10; i++) {
    output += arrayList[i];
  }
  properties.innerHTML = output;
});

//Last button

last.addEventListener("click", () => {
  page = arrayList.length - 10;
  let output = "";
  properties.innerHTML = "";
  for (let i = page; i < page + 10; i++) {
    output += arrayList[i];
  }
  properties.innerHTML = output;
});

//Clear property container

function clearPropertyContainer() {
  sfHeader.remove();
  properties.innerHTML = "";
}
