fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    //* ---------------gallery-------------------------------------------------

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

    //* ---------------buttons-------------------------------------------------

    // * ajout des boutons

    data.forEach((works) => {
      const buttonsFilter = document.querySelector(".buttons");
      const setCategoryEllement = document.createElement("button");
 
    setCategoryEllement.classList.add("btn");
    setCategoryEllement.textContent = works.category.name;
    buttonsFilter.appendChild(setCategoryEllement);
    
  });
  
  });
