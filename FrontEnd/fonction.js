const buttonsFilter = document.querySelector(".buttons");
const buttonsCategories = new Set();
const gallery = document.querySelector(".gallery");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalGrid = document.querySelector("#modalGrid");

function creatButton(content) {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = content;
  buttonsFilter.appendChild(buttonElement);
  buttonElement.classList.add("btn");
}
function createWork(work, container, type = "gallery") {
  const figureElement = document.createElement("figure");
  const imageElement = document.createElement("img");
  const captionElement = document.createElement("figcaption");

  imageElement.src = work.imageUrl;

  figureElement.appendChild(imageElement);
  if (type === "gallery") {
    captionElement.textContent = work.title;
  }
  if (type === "modal") {
    captionElement.textContent = "éditer";
    const trash = document.createElement("i");
    const cross = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    cross.classList.add("fa-solid", "fa-arrows-up-down-left-right");

    figureElement.appendChild(cross);
    figureElement.appendChild(trash);

    imageElement.addEventListener("mouseover", (event) => {
      event.target.nextElementSibling.style.display = "block";
      console.log("ca fonctionne");
    });

    imageElement.addEventListener("mouseout", (event) => {
      event.target.nextElementSibling.style.display = "none";
    });

    cross.style.display = "none";

    cross.addEventListener("mouseover", (event) => {
      event.target.style.display = "block";
    });

    cross.addEventListener("mouseout", (event) => {
      event.target.style.display = "block";
    });

    trash.addEventListener("click", () => {
      fetch("http://localhost:5678/api/works/" + work.id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }).then((response) => {
        console.log(response);
      });
    });
  }
  figureElement.appendChild(captionElement);
  container.appendChild(figureElement);
}

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    //*****************gallery*******************************************

    data.forEach((work) => {
      createWork(work, gallery);
      createWork(work, modalGrid, "modal");

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
            createWork(work, gallery);
          });
        } else {
          // on filtre le tableau des works par category
          const filteredWorks = data.filter(
            (works) => works.category.name === selectedCategory
          );

          // création des figures selon la category selectionnée
          filteredWorks.forEach((work) => {
            createWork(work, gallery);
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

const BtnModificationWorks = document.querySelector("#adminWorks");

BtnModificationWorks.addEventListener("click", () => {
  // console.log(BtnModificationWorks);
  modalWrapper.showModal();
  if (modalWrapper.open) {
    console.log("ca marche");
    modalGrid.style.display = "grid";
    modalGrid.style.alignItems = "center";
    modalGrid.style.gridGap = "10px 10px";
    modalGrid.style.gridTemplateColumns = "auto auto auto auto auto";
    modalGrid.style.gridTemplateRow = "300px 300px 300px ";
  } else {
    modalWrapper.style.display = "none";
  }
});

// * fermer la modale au click sur la croix || hors modal----------------------------------

const x = document.querySelector(".fa-xmark");

x.addEventListener("click",
  () => {
    console.log("cela fonctionne bien");
    modalWrapper.close();
  });



// * fermer la modale hors champ -----------------------------------------------------------------------------------

// modalWrapper.addEventListener('click', (e) => {
//   if (e.target.id !== "modal-wrapper") {
//     console.log("fermer la modal");
//       modalWrapper.close();
//       e.stopPropagation();
//   }
// });

// * au click sur btnAddPic => modal 2/3----------------------------------------------------------------------------

// todo ajouter toggle dans une fonction

const btnAddPic = document.querySelector(".btnAddPic");
const modalFooter = document.querySelector("#modalFooter");
const titleModal = document.querySelector("#titleModal");

const arrow = document.querySelector("#arrow");
btnAddPic.addEventListener("click", () => {
  if (modalWrapper.open) {
    btnAddPic.remove();
    modalFooter.remove();
    titleModal.textContent = "Ajout photo";
    modalGrid.remove();

    // ajout de fleche gauche
    arrow.style.display = "flex";
















    


  }
});

//  todo ajout icon image modal 2/3 <i class="fa-regular fa-image"></i>

// todo formData
    // http://localhost:5678/api/works
