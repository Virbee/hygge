const notLike = document.getElementById("click-logo");
const like = document.getElementById("clicked-logo");

notLike.onclick = function(evt) {
  notLike.setAttribute("class", "like hidden");
  like.removeAttribute("class", "hidden");
  like.setAttribute("class", "like");
  //
};

like.onclick = function(evt) {
  like.setAttribute("class", "like hidden");
  notLike.removeAttribute("class", "hidden");
  notLike.setAttribute("class", "like");
};
