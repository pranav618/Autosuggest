const searchValue = document.getElementById("search");
const displayData = document.getElementById("display-data");
searchValue.addEventListener("input", (e) => autoSuggest(e.target.value));

const search = () => {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((result) => result.json())
    .then((data) => {
      localStorage.setItem("data", JSON.stringify(data)); //localStorage only supports strings. Use JSON.stringify() and JSON.parse().
    });
};

const autoSuggest = (data) => {
  const dataset = JSON.parse(localStorage.getItem("data"));
  const autoSuggestData =
    dataset &&
    dataset.filter((c, i, array) => {
      return c.title.toLowerCase().trim().includes(data.toLowerCase());
    });
  if (data.length === 0 || autoSuggestData.length === 0) {
    displayData.innerHTML = "";
  } else {
    displayAutocompleteData(autoSuggestData);
  }
};

const displayAutocompleteData = (autoSuggestData) => {
  if (autoSuggestData && autoSuggestData.length > 0) {
    const html = autoSuggestData
      .map(
        (match) => `
        <div class="display">
            ${match.title}  
        </div>`
      )
      .join("");

    displayData.innerHTML = html;
  }
};

const submitFunction = () => {
  console.log(
    "submitFunction********",
    JSON.parse(localStorage.getItem("data"))
  );
};

const debounceSearch = (fn, time) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
};

const debounce = debounceSearch(search, 300);
