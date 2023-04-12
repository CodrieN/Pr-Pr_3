// ! Verification Login*****************************************************************************************
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  verifyLogin(email, password);

  console.log(email);
  console.log(password);
});

function verifyLogin(email, password) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Vérifier la réponse du serveur
      if (data.success) {
        // Connexion réussie, rediriger l'utilisateur vers la page d'accueil
        window.location.href = "./index.html";
      } else {
        // Identifiant ou mot de passe invalide
        alert("Identifiant ou mot de passe incorrect");
      }
    })
    .catch((error) => {
      // Gérer les erreurs
      console.error("Erreur:", error);
    });
}


// ? https://github.com/CodrieN/Pr-Pr_3/blob/secondary/Backend/controllers/users.controller.js

