document.querySelector("form").addEventListener("submit", searchProperties);
let inputVal = document.querySelector("input").value;

function searchProperties() {
  fetch(
    "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=New%20York%20City&limit=200&offset=0&state_code=NY",
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
