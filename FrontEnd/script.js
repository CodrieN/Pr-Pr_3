// todo récuperer works

// ? déclarer Fetch

const fetchResponsePromise = Promise<Response> fetch(entrée[, init]);




if (window.fetch) {
}
console.log(fetch);
// else {
//     // Faire quelque chose avec XMLHttpRequest?
// }

// **https://developer.mozilla.org/fr/docs/Web/API/Request

// !Dans l'extrait de code suivant, nous créons une nouvelle
// !requête à l'aide du constructeur Request() avec des
//  !données initiales et du contenu du body pour une requête
//   !api qui nécessite une charge utile de body:

// *const request = new Request('http://localhost:5678/api/works', {method: 'POST', body: '{"foo": "bar"}'});

// *const URL = request.url;
// *const method = request.method;
// *const credentials = request.credentials;
// *const bodyUsed = request.bodyUsed;

// !Vous pouvez ensuite récupérer cette demande d'API
// !en passant l'objet Request en tant que paramètre à
//  !un appel fetch(), par exemple et obtenir la réponse:

// *fetch(request)
//   *.then(response => {
//     *if (response.status === 200) {
//       *return response.json();
//     *} else {
//       *throw new Error('Something went wrong on api server!');
//     *}
//   *})
//   *.then(response => {
//     *console.debug(response);
//     // ...
//   *}).catch(error => {
//     *console.error(error);
//   *});

// **https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector

// todo récupérer les travaux depuis l'API
// ** https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

// todo ajouter les button filtres en JS

// const buttonfilter = document.querySelector (".gallery");

// console.log (buttonfilter);
