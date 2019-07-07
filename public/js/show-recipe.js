const likes = axios.create({
  baseURL: window.location.origin
});

const notLike = document.getElementById("click-logo");
const like = document.getElementById("clicked-logo");

notLike.onclick = function(evt) {
  notLike.setAttribute("class", "like hidden");
  like.removeAttribute("class", "hidden");
  like.setAttribute("class", "like");
  const div = notLike.parentElement;
  const id_recipe = div.id;
  axios
    .post("/like", { id_recipe })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

like.onclick = function(evt) {
  like.setAttribute("class", "like hidden");
  notLike.removeAttribute("class", "hidden");
  notLike.setAttribute("class", "like");
  const div = like.parentElement;
  const id_recipe = div.id;
  axios.post("/unlike", { id_recipe });
};
