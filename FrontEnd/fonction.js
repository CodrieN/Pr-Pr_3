// ! Gallery*************************************************************************

const buttonsFilter = document.querySelector(".buttons");
const buttonsCategories = new Set();
const gallery = document.querySelector(".gallery");
function creatButton(content) {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = content;
  buttonsFilter.appendChild(buttonElement);
  buttonElement.classList.add("btn");
}
function createWork(work) {
  const figureElement = document.createElement("figure");
  const imageElement = document.createElement("img");
  const captionElement = document.createElement("figcaption");

  imageElement.src = work.imageUrl;
  captionElement.textContent = work.title;

  figureElement.appendChild(imageElement);
  figureElement.appendChild(captionElement);
  gallery.appendChild(figureElement);
}

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    //*****************gallery*******************************************

    data.forEach((work) => {
      createWork(work);

      // ***************boutons filtre*******************************************
      buttonsCategories.add(work.category.name);
    });
    creatButton("Tous");
    buttonsCategories.forEach((category) => {
      creatButton(category);
    });

    //***************filtre selon bouton cliqué*******************************************
    //Selection de tous les boutons
    const filterButtons = document.querySelectorAll(".btn");

    // Ajout de event listener pour chaque bouton
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // récupération de la category séléctionnée
        const selectedCategory = button.textContent;
        gallery.innerHTML = "";
        // On vérifie si le boutons cliqué correspond à "Tous"
        if (selectedCategory === "Tous") {
          // on recré une nouvelle figure pour chaque works

          data.forEach((work) => {
            createWork(work);
          });
        } else {
          // on filtre le tableau des works par category
          const filteredWorks = data.filter(
            (works) => works.category.name === selectedCategory
          );

          // création des figures selon la category selectionnée
          filteredWorks.forEach((work) => {
            createWork(work);
          });
        }
      });
    });
  });

//***************ADMIN PRIVILEGE*******************************************

//Vérifier si le JWT est stocké dans le sessionStorage

const token = sessionStorage.getItem("token");

if (token !== null) {
  console.log("le token existe dans sessionStorage");

  // changer la class .adminPrivilege afin de faire apparaitre les elements de DOM permettant les modifications | masquer les boutons de filtres | changer login en logout
  let adminPrivilege = document.querySelectorAll(".adminPrivilege");
  let maskbuttons = document.querySelector(".buttons");
  adminPrivilege.forEach(function (element) {
    element.style.display = "flex";
  });
  maskbuttons.style.display = "none";



  let login = document.querySelector("login");
  login.innerText = "logout";
  console.log(login);






} else {
  console.log("JWT does not exist in sessionStorage");
}

// todo | penser à utiliser des .innerText =  "logout" et .innerText = "login"  dans un if/else au moment
// todo | où l'on vérifie si le token est "stocké", innerText permet en js de changer directement le texte
// todo | d'un élément HTML
