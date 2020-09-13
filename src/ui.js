class UI {
  constructor() {
    this.properties = document.querySelector("#property-container");
  }

  propertiesForSale(homes) {
    let output = "";

    homes.properties.forEach((home) => {
      output += `
      <div class="h-64 px-2 py-2 border-1 border-black">
      <a href="#" class="toggle-image" data-id="${home.id}">
      <img src=${home.thumbnail}
      alt="home-image"
      class="w-full h-full"></img>
      </a>
      </div>
      `;
    });
    this.properties.innerHTML = output;
  }
}

export const ui = new UI();
