///////////////////////////////////
/////////ADD FORM//////////////////
const addButton = document.getElementById("new-ingredient");
const ingredient = document.getElementById("ingredient");
const ingredientList = document.getElementById("ingredients-list");
const checkbox = document.getElementById("hidden-ingredients");

///// ADD INGREDIENT /////

addButton.onclick = function(evt) {
  evt.preventDefault();
  var newIngredient = ingredient.value;
  const newId = `delete-btn-${Date.now()}`;

  const elementToAppend = document.createElement("div");
  elementToAppend.innerHTML = `
  <div class="boxes">
    <p>${newIngredient}</p>
    <a class="delete-button" id="${newId}">x</a>
  </div>`;
  ingredientList.appendChild(elementToAppend);

  checkbox.innerHTML += `<div id="checkbox-${newId}">
  <input type="checkbox" class="input-text input" name="ingredients" id="ingredient" value="${newIngredient}">
  <label for="ingredient" class="label-cat label">${newIngredient}</label>
  </div>`;
  ingredient.value = "";
  document.getElementById(newId).onclick = deleteIngredient;
};

////// DELETE INGREDIENT //////

function deleteIngredient(evt) {
  evt.preventDefault();
  const target = evt.target;
  const checkbox = document.getElementById(`checkbox-${target.id}`);
  checkbox.remove();
  target.parentElement.remove();
}

///// ADD METHOD /////
const addMethods = document.getElementById("new-method");
const method = document.getElementById("method");
const methodList = document.getElementById("methods-list");
const methodCheckbox = document.getElementById("hidden-methods");

addMethods.onclick = function(evt) {
  evt.preventDefault();
  var newMethod = method.value;
  methods.push(newMethod);
  const newId = `delete-btn-${Date.now()}`;
  const elementToAppend = document.createElement("div");
  elementToAppend.innerHTML += `<div class="boxes">
    <p>${newMethod}</p>
    <a class="delete-button" id="${newId}">x</a>
    </div>`;
  methodList.appendChild(elementToAppend);
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
  const methodCheckbox = document.getElementById(`checkbox-${target.id}`);
  target.parentElement.remove();
  methodCheckbox.remove();
}
