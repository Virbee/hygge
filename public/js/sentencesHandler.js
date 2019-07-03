const SentenceAPI = axios.create({ baseURL: "/" });

var sentences = [];
const addButton = document.getElementById("new-sentence");
const sentence = document.getElementById("sentence");
const sentenceList = document.getElementById("sentences-list");

// ADD SENTENCE

addButton.onclick = function(evt) {
  evt.preventDefault();
  var newSentence = sentence.value;
  sentences.push(newSentence);
  const newId = `delete-btn-${Date.now()}`;
  sentenceList.innerHTML += `<div class ="item-sentence">
    <p>${newSentence}</p>
    <button class ="btn delete" id="${newId}">x</button>
    </div>`;
  sentence.value = "";
  document.querySelector(".delete").onclick = deleteSentence;
};
