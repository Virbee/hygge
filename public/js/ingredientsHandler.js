const IngredientAPI = axios.create({ baseURL: "/" });

var ingredients = [];

//quand on clique sur le bouton Add
//evt.preventDefault();
//ingredient = valeur ingrédients de l'input
//on pousse la valeur dans le tableau
// on l'ajoute au HTML

console.log(document.getElementById("new-ingredient"));

document.getElementById("new-ingredient").onclick = function(evt) {
  evt.preventDefault();
  console.log(evt);
  const ingredient = document.getElementById("ingredient");
  const newIngredient = ingredient.value;
  ingredients.push(newIngredient);
  IngredientAPI.post("/add/Recipe/ingredients", { ingredients })
    .then()
    .catch();
};

////delete
//qd on clique sur la croix, on la supprime ainsi que l'élément précédent
//on supprime l'entrée du tableau (qui va alimenter la checkbox cachée)
