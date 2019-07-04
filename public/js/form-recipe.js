///////////////////////////////////
/////////ADD FORM//////////////////
var ingredients = [];
const addButton = document.getElementById("new-ingredient");
const ingredient = document.getElementById("ingredient");
const ingredientList = document.getElementById("ingredients-list");
const checkbox = document.getElementById("hidden-ingredients");

///// ADD INGREDIENT /////

addButton.onclick = function(evt) {
  evt.preventDefault();
  var newIngredient = ingredient.value;
  ingredients.push(newIngredient);
  const newId = `delete-btn-${Date.now()}`;
  ingredientList.innerHTML += `
  <div class="item-ingredient">
    <p>${newIngredient}</p>
    <a class="btn delete" id="${newId}">x</a>
  </div>`;
  checkbox.innerHTML += `<div id="checkbox-${newId}">
  <input type="checkbox" class="input-text input" name="ingredients" id="ingredient" value="${newIngredient}">
  <label for="ingredient" class="label-cat label">${newIngredient}</label>
  </div>`;
  ingredient.value = "";
  document.getElementById(`${newId}`).onclick = deleteIngredient;
};

////// DELETE INGREDIENT //////

function deleteIngredient(evt) {
  evt.preventDefault();
  axios.delete("url/id")
  console.log(evt);
  const target = evt.target;
  const checkbox = document.getElementById(`checkbox-${target.id}`);
  target.parentElement.remove();
}

var methods = [];
const addMethods = document.getElementById("new-method");
const method = document.getElementById("method");
const methodList = document.getElementById("methods-list");
const methodCheckbox = document.getElementById("hidden-methods");

///// ADD INGREDIENT /////

addMethods.onclick = function(evt) {
  evt.preventDefault();
  var newMethod = method.value;
  methods.push(newMethod);
  const newId = `delete-btn-${Date.now()}`;
  methodList.innerHTML += `<div class="method-ingredient">
    <p>${newMethod}</p>
    <button class="btn delete" id="${newId}">x</button>
    </div>`;
  methodCheckbox.innerHTML += `<div id="checkbox-${newId}">
     <input type="checkbox" class="input-text input" name="instructions" id="instruction" value="${newMethod}">
    <label for="instruction" class="label-cat label">${newMethod}</label>
     </div>`;
  document.getElementById(newId).onclick = deleteMethod;

  method.value = "";
};

////// DELETE METHOD //////

function deleteMethod(evt) {
  evt.preventDefault();
  const target = evt.target;
  const checkbox = document.getElementById(`checkbox-${target.id}`);
  target.parentElement.remove();
  methodCheckbox.remove();
}

//////////////////////////////
//////////EDIT FORM///////////
//////////////////////////////

//btn edit name
//btn edit description
//btn edit preparation time
//btn edit img
//btn add ingredients
//btn add instructions


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
