const searchBar = document.getElementById("search-bar");

searchBar.oninput = function(evt) {
  console.log(axios);
  getRecipe(evt.target.value);
};

function getRecipe(query) {
  console.log("yo");

  axios.get(`/api/recipes?string=${query}`).then(apiRes => {
    console.log(apiRes);
    //vide le tableau
    //refait le tableau
  });
}
