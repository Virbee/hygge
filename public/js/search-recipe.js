const searchBar = document.getElementById("search-bar");

const rows = document.querySelectorAll("tbody>tr");

searchBar.oninput = function(evt) {
  const lowerValue = searchBar.value.toLowerCase();
  rows.forEach(row => {
    const title = row.innerText.toLowerCase();
    if (!title.includes(lowerValue)) {
      console.log(title);
      row.setAttribute("class", "hidden");
    }
    if (title.includes(searchBar.value)) {
      row.removeAttribute("class", "hidden");
    }
  });
};
