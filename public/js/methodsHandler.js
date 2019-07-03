const MethodsAPI = axios.create({ baseURL: "/" });

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
