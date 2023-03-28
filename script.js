const gallery = document.getElementById("gallery");

const newImg = document.createElement("img")
newImg.innerHTML = "http://localhost:5678/api/works"
document.querySelector("#gallery").append(newImg)


// *apend pourra être remplacé par prepend selon que l'on souhaitera faire apparaitre 
// *les nouveaux éléments depuis le début ou la fin de la liste.
// *il est aussi possible d'utiliser insertAdjacentElement("afterbefin)") <===exemple


console.log(gallery);

fetch("http://localhost:5678/api/works")
.then(r => r.json())
.then(body => console.log(body))







// async function fetchData (){
// const r = await fetch("http://localhost:5678/api/works")
// }

const loader = document.createElement("img") 