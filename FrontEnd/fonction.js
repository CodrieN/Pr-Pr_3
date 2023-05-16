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
    figureElement.dataset.workId = work.id;
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
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      fetch("http://localhost:5678/api/works/" + work.id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }).then((response) => {
        if (response.ok) {
          container.removeChild(figureElement);
          gallery.removeChild(
            document.querySelector('[data-work-id="' + work.id + '"]')
          );
        }
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
const btnAddPic = document.querySelector(".btnAddPic");
const modalFooter = document.querySelector("#modalFooter");
const titleModal = document.querySelector("#titleModal");
const arrow = document.querySelector("#arrow");
const modalForm = document.querySelector("dialog form");
const hr1 = document.querySelector("#hr1");
const hr2 = document.querySelector("#hr2");

BtnModificationWorks.addEventListener("click", () => {
  modalWrapper.showModal();
  preventCloseModal.style.display = "block";
  modalGrid.style.display = "grid";
  modalGrid.style.alignItems = "center";
  modalGrid.style.gridGap = "10px 10px";
  modalGrid.style.gridTemplateColumns = "auto auto auto auto auto";
  modalGrid.style.gridTemplateRow = "300px 300px 300px ";

  arrow.style.display = "none";
  modalForm.style.display = "none";
  modalWrapper.classList.add("mystyle");
  modalWrapper.display = "none";

  btnAddPic.style.display = "flex";
  modalFooter.style.display = "flex";
  titleModal.textContent = "Galerie photo";
  modalGrid.style.display = "grid";
  hr1.style.display = "flex";

  titleModal.textContent = "Galerie photo";
});

// * au click sur btnAddPic => modal 2/2----------------------------------------------------------------------------

// * todo fonction modalIsClosed------------------------------------------------------------------------

btnAddPic.addEventListener("click", function () {
  if (modalWrapper.open) {
    btnAddPic.style.display = "none";
    modalFooter.style.display = "none";
    titleModal.textContent = "Ajout photo";
    modalGrid.style.display = "none";
    hr1.style.display = "none";

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
    modalWrapper.classList.add("mystyle");
    modalWrapper.display = "none";

    btnAddPic.style.display = "flex";
    modalFooter.style.display = "flex";
    titleModal.textContent = "Galerie photo";
    modalGrid.style.display = "grid";
    hr1.style.display = "flex";

    titleModal.textContent = "Galerie photo";
  }
});

//  * ajout image modal 2/2 <i class="fa-regular fa-image"></i>--------------------------------------------

let uploadInput = document.getElementById("file-upload");
const faImg = document.querySelector(".fa-image");
const addPic = document.querySelector("#addPic");
const formatImag = document.querySelector("#formatImage");
const imagePreview = document.querySelector("#imagePreview");
uploadInput.onchange = function () {
  let image = new FileReader();

  image.onload = function (e) {
    imagePreview.src = e.target.result;
    faImg.style.display = "none";
    addPic.style.display = "none";
    formatImag.style.display = "none";
    imagePreview.style.display = "flex";
  };
  image.readAsDataURL(this.files[0]);
};

// * formData // Fetch Post------------------------------------------------------------------

const addWorkForm = document.querySelector("#addWorkForm");
const titleInput = document.getElementById("titre");
const categoryInput = document.getElementById("catégorie");
const imageInput = document.getElementById("file-upload");
const btnValidate = document.getElementById("btnvalidate");

// * todo if all inputs filed filed = > btnvalidate.style.backgroundColor = green

function checkInputs() {
  if (titleInput.value && categoryInput.value && imageInput.value) {
    btnValidate.style.backgroundColor = "#1d6154";
    btnValidate.style.border = "#1d6154";
    btnValidate.style.color = "white";
  } else {
    btnValidate.style.backgroundColor = "grey";
  }
}

titleInput.addEventListener("input", checkInputs);
categoryInput.addEventListener("input", checkInputs);
imageInput.addEventListener("input", checkInputs);
// * todo if all inputs filed filed = > btnvalidate.style.backgroundColor = green

addWorkForm.addEventListener("submit", () => {
  // event.preventDefault();
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
      preventCloseModal.style.display = "none";
      modalForm.reset();
      imageInput.value = "";
      imagePreview.style.display = "none";
      faImg.style.display = "flex";
      addPic.style.display = "flex";
      formatImag.style.display = "flex";
    })
    .catch((error) => alert(error.message));
});

// todo fonction resetModalWrapper

// * fermer la modale au click sur la croix ----------------------------------

const x = document.querySelector(".fa-xmark");

x.addEventListener("click", () => {
  modalWrapper.close();
  addWorkForm.reset();
  preventCloseModal.style.display = "none";
  modalForm.reset();
  imageInput.value = "";
  imagePreview.style.display = "none";
  faImg.style.display = "flex";
  addPic.style.display = "flex";
  formatImag.style.display = "flex";
});

// * fermer la modale hors champ -----------------------------------------------------------------------------------
modalWrapper.addEventListener("click", () => {
  modalWrapper.close();
  preventCloseModal.style.display = "none";
  addWorkForm.reset();
  modalForm.reset();
  imageInput.value = "";
  imagePreview.style.display = "none";
  faImg.style.display = "flex";
  addPic.style.display = "flex";
  formatImag.style.display = "flex";
});

preventCloseModal.addEventListener("click", (event) => event.stopPropagation());
