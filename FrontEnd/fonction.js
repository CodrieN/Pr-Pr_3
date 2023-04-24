// ! Gallery*************************************************************************

const buttonsFilter = document.querySelector(".buttons");
const buttonsCategories = new Set();
const gallery = document.querySelector(".gallery");
const modalWrapper = document.querySelector(".modal-wrapper");

function creatButton(content) {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = content;
  buttonsFilter.appendChild(buttonElement);
  buttonElement.classList.add("btn");
}
function createWork(work, container) {
  const figureElement = document.createElement("figure");
  const imageElement = document.createElement("img");
  const captionElement = document.createElement("figcaption");

  imageElement.src = work.imageUrl;
  captionElement.textContent = work.title;

  figureElement.appendChild(imageElement);
  figureElement.appendChild(captionElement);
  container.appendChild(figureElement);
}

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    //*****************gallery*******************************************

    data.forEach((work) => {
      createWork(work, gallery);
      createWork(work, modalGrid);

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

//Vérifier si le JWT est stocké dans le localStorage

const token = localStorage.getItem("token");
const authButton = document.getElementById("login");
if (token !== null) {
  // changer la class .adminPrivilege afin de faire apparaitre les elements de DOM permettant les modifications | masquer les boutons de filtres | changer login en logout
  let adminPrivilege = document.querySelectorAll(".adminPrivilege");
  let maskbuttons = document.querySelector(".buttons");

  adminPrivilege.forEach(function (element) {
    element.style.display = "flex";
  });
  maskbuttons.style.display = "none";

  authButton.innerHTML = "logout";

  // -------------logout----------------------------------------------
  authButton.addEventListener("click", (e) => {
    localStorage.clear();
    e.preventDefault();
    window.location.reload();
  });
} else {
  console.log("JWT does not exist in localStorage");
}

//***************MODAL*******************************************

// todo if création works dans modale, condition => afficher les icones et texte éditer

const BtnModificationWorks = document.querySelector("#adminWorks");

BtnModificationWorks.addEventListener("click", () => {
  // console.log(BtnModificationWorks);
  modalWrapper.showModal(); // ? toujours capable de scoll le <main> ?


function openCheck(modalWrapper) {
  if (modalWrapper.open) {
    console.log("ca marche");
    modalGrid.style.display = "grid";
    modalGrid.style.alignItems = "center";
    modalGrid.style.gridGap = "10px 10px";
    modalGrid.style.gridTemplateColumns = "auto auto auto auto auto";
    modalGrid.style.gridTemplateRow = "300px 300px 300px ";

  }else{
    modalWrapper.style.display = "none";
    }

}
openCheck(modalWrapper);

// ! boucle ?  while(true) ?
// while (modalWrapper.open === true) {
//       console.log("ca marche");
//       modalWrapper.style.display = "grid";
//       modalWrapper.style.gridGap = "10px 10px";
//       modalWrapper.style.gridTemplateColumns = "(5, 1fr)";
// }
// ! boucle ?
});



const toCloseDialog = document.getElementById('toCloseDialog');

toCloseDialog.addEventListener('click', (event) => {
  if (event.target.id !== 'toCloseDialog') {
      modalWrapper.close();
  }
});




