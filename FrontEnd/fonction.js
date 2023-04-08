fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    //*****************gallery*******************************************

    data.forEach((works) => {
      const imageGrid = document.querySelector(".gallery");
      const figureElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      const captionElement = document.createElement("figcaption");

      imageElement.src = works.imageUrl;
      captionElement.textContent = works.title;

      figureElement.appendChild(imageElement);
      figureElement.appendChild(captionElement);
      imageGrid.appendChild(figureElement);
    });

    // ***************filter buttons*******************************************

    const buttonsFilter = document.querySelector(".buttons");
    const buttonsCategories = new Set();

    data.forEach((works) => {
      buttonsCategories.add(works.category.name);
    });

    buttonsCategories.forEach((category) => {
      const buttonElement = document.createElement("button");
      buttonElement.textContent = category;
      buttonsFilter.appendChild(buttonElement);
      buttonElement.classList.add("btn");
    });

    const buttonAll = document.createElement("button");
    buttonAll.textContent = "Tous";
    buttonsFilter.insertBefore(buttonAll, buttonsFilter.firstChild);
    buttonAll.classList.add("btn");

    //***************filter figures*******************************************






  });
