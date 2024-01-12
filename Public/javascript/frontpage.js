const error = document.getElementById("error");
const submitButton = document.getElementById("search");
const search = document.getElementById("dataSearch");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (search.value.trim() == "") {
    console.log(search.value);
    error.innerHTML = "please fill the field";
  } else {
    console.log("in");
    error.innerHTML = "";
    document.querySelector(".form").submit();
  }
});
