  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {

      data.forEach(image => {
        const imageGrid = document.querySelector('.gallery');
        const figureElement = document.createElement('figure');
        const imageElement = document.createElement('img');
        const captionElement = document.createElement('figcaption');

        imageElement.src = image.imageUrl;
        captionElement.textContent = image.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(captionElement);
        imageGrid.appendChild(figureElement);
      });
    })
    .catch(error => console.error(error));

    