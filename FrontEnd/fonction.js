const buttonsFilter = document.querySelector(".buttons");
const buttonsCategories = new Set();
const gallery = document.querySelector(".gallery");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalGrid = document.querySelector("#modalGrid");
const preventCloseModal = document.getElementById("preventCloseModal");

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
      // e.preventDefault();
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
    filterButtons[0].focus();
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
  preventCloseModal.style.display = "block";
  modalGrid.style.display = "grid";
  modalGrid.style.alignItems = "center";
  modalGrid.style.gridGap = "10px 10px";
  modalGrid.style.gridTemplateColumns = "auto auto auto auto auto";
  modalGrid.style.gridTemplateRow = "300px 300px 300px ";
});

// * fermer la modale au click sur la croix ----------------------------------

const x = document.querySelector(".fa-xmark");

x.addEventListener("click", () => {
  modalWrapper.close();
  addWorkForm.reset();
  preventCloseModal.style.display = "none";
});

// ! fermer la modale hors champ -----------------------------------------------------------------------------------
modalWrapper.addEventListener("click", () => {
  modalWrapper.close();
  preventCloseModal.style.display = "none";
  addWorkForm.reset();
});

preventCloseModal.addEventListener("click", (event) => event.stopPropagation());

// ! fermer la modale hors champ -----------------------------------------------------------------------------------
// * au click sur btnAddPic => modal 2/2----------------------------------------------------------------------------

// todo fonction modalIsClosed------------------------------------------------------------------------

const btnAddPic = document.querySelector(".btnAddPic");
const modalFooter = document.querySelector("#modalFooter");
const titleModal = document.querySelector("#titleModal");
const arrow = document.querySelector("#arrow");
const modalForm = document.querySelector("dialog form");
const hr1 = document.querySelector("#hr1");
const hr2 = document.querySelector("#hr2");

btnAddPic.addEventListener("click", function () {
  if (modalWrapper.open) {
    btnAddPic.remove();
    modalFooter.remove();
    titleModal.textContent = "Ajout photo";
    modalGrid.remove();
    hr1.remove();

    // ajout de fleche gauche
    arrow.style.display = "flex";
    modalForm.style.display = "flex";
    modalForm.style.flexDirection = "column";
  }
});
arrow.addEventListener("click", () => {
  if (modalWrapper.open) {
    arrow.style.display = "none";
    modalForm.style.display = "none";

    modalWrapper.appendChild(btnAddPic);
    modalWrapper.appendChild(modalFooter);
    titleModal.textContent = "Galerie photo";
    modalWrapper.appendChild(modalGrid);
    modalWrapper.appendChild(hr1);

    // ajout de fleche gauche
    arrow.style.display = "none";

    modalGrid.style.display = "grid";
    modalGrid.style.alignItems = "center";
    modalGrid.style.gridGap = "10px 10px";
    modalGrid.style.gridTemplateColumns = "auto auto auto auto auto";
    modalGrid.style.gridTemplateRow = "300px 300px 300px ";
  }
});

//  * ajout image modal 2/2 <i class="fa-regular fa-image"></i>--------------------------------------------

let uploadInput = document.getElementById("file-upload");
const faImg = document.querySelector(".fa-image");
const addPic = document.querySelector("#addPic");
const formatImag = document.querySelector("#formatImage");


uploadInput.onchange = function () {
  let image = new FileReader();

  image.onload = function (e) {
    document.getElementById("imagePreview").src = e.target.result;
    faImg.style.display = "none"
    addPic.style.display = "none"
    formatImag.style.display = "none"
    
  };
  image.readAsDataURL(this.files[0]);
};




// * formData // Fetch Post------------------------------------------------------------------


// todo if all inputs filed filed = > btnvalidate.style.backgroundColor = green
const addWorkForm = document.querySelector("#addWorkForm");

addWorkForm.addEventListener("submit", (event) => {



  event.preventDefault();
  const formData = new FormData();

  formData.append("image", document.getElementById("file-upload").files[0]);
  formData.append("title", document.getElementById("titre").value);
  formData.append("category", document.getElementById("catégorie").value);
  console.log(formData);
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      createWork(data, gallery);
      createWork(data, modalGrid, "modal");
      modalWrapper.reset();
    })
    .catch((error) => alert(error.message));
});


// todo fonction resetModalWrapper

