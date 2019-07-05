//////////////////////////////
//////////EDIT FORM///////////
//////////////////////////////

const editButton = document.getElementById("edit-btn-ingredient");
const editIngBox = document.getElementById("edit-ing-checkbox");
const ingredientInput = document.getElementById("edited-ingredient");

editButton.onclick = function(evt) {
  evt.preventDefault();
  const newIngredient = ingredientInput.value;
  const elementToAppend = document.createElement("div");
  elementToAppend.innerHTML += `
     <input type="checkbox" class="input-text input" name="ingredients" id="ingredient" value="${newIngredient}" checked>
    <label for="instruction" class="label-cat label">${newIngredient}</label>`;
  editIngBox.appendChild(elementToAppend);
  ingredientInput.value = "";
};

const editMethButton = document.getElementById("edit-btn-method");
const editMethBox = document.getElementById("edit-ins-checkbox");
const methInput = document.getElementById("edited-instruction");

editMethButton.onclick = function(evt) {
  evt.preventDefault();
  const newMeth = methInput.value;
  console.log(newMeth);
  const elementToAppend = document.createElement("div");
  elementToAppend.innerHTML += `
  <input type="checkbox" name="instructions" id="instruction" value="${newMeth}" checked>
          <label for="ingredient" class="label-cat label">${newMeth}</label>`;
  editMethBox.appendChild(elementToAppend);
  methInput.value = "";
};

//Edit name
//qd on clique sur le bouton
//on empêche le comportement de la page
//on vide la value de l'input

//Edit description
//qd on clique sur le bouton
//on empêche le comportement de la page
//on vide la value de l'input

//Edit preparation time
//idem

//Edit image
//qd on clique sur le bouton
//on empêche le comportement par défaut de la page
//on vide la dive
//on affiche l'input de type file
