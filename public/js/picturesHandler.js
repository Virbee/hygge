const SentenceAPI = axios.create({ baseURL: "/" });

var sentences = [];
const addButton = document.getElementById("new-sentence");
const picture = document.getElementById("picture");
const pictureList = document.getElementById("pictures-list");

// ADD SENTENCE

addButton.onclick = function(evt) {
  evt.preventDefault();
  var newPicture = picture.value;
  pictures.push(newPicture);
  const newId = `delete-btn-${Date.now()}`;
  pictureList.innerHTML += `<div class ="item-picture">
    <p>${newPicture}</p>
    <button class ="btn delete" id="${newId}">x</button>
    </div>`;
  picture.value = "";
  document.querySelector(".delete").onclick = deletePicture;
};
