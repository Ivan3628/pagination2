import cities from "./cities";
import { ui } from "./ui";

document.querySelector("form").addEventListener("submit", searchProperties);

const getReprString = (city) => `${city.city}, ${city.code}`;

//Integrate auto complete library

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
      ui.propertiesForSale(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

/*
function searchDetails() {
  fetch(
    "https://realtor.p.rapidapi.com/properties/v2/detail?property_id=O3599084026",
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
    })
    .catch((err) => {
      console.log(err);
    });
}

searchDetails();
*/
