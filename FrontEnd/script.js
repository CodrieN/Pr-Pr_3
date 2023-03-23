// ** ajout dynamique de la galerie en utilisant fetch

// const image = document.querySelector("img");
// const figure = document.querySelector("figure");
// const figcaption = document.querySelector("figcaption");

const myImage = document.querySelector("#img");

fetch("http://localhost:5678/api/worksg")
  .then(function (response) {
    return response.blob();
  })
  .then(function (myBlob) {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });

console.log(myImage);
