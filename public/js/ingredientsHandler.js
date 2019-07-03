const IngredientAPI = axios.create({ baseURL: "/" });

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
    <button class="btn delete" id="${newId}">x</button>
  </div>`;
  checkbox.innerHTML += `<div id="checkbox-${newId}">
  <input type="checkbox" class="input-text input" name="ingredients" id="ingredient" value="${newIngredient}">
  <label for="ingredient" class="label-cat label">${newIngredient}</label>
  </div>`;
  ingredient.value = "";
  document.querySelector(".delete").onclick = deleteIngredient;
};

////// DELETE INGREDIENT //////

function deleteIngredient(evt) {
  evt.preventDefault();
  console.log(evt);
  const target = evt.target;
  const checkbox = document.getElementById(`checkbox-${target.id}`);
  target.parentElement.remove();
  checkbox.remove();
}
