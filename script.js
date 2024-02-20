const taskForm = document.getElementById("task-form");
const userInput = document.getElementById("user-input");
const dInput = document.getElementById("d-input");
const mInput = document.getElementById("m-input");
const sortBy = document.getElementById("sort-by");

const listContainer = document.getElementById("list-container");

let arr = [];

sortBy.value = localStorage.getItem("sortBy");
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderArray(arr);
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);

  arr.push({
    nameValue: formData.get("task-input"),
    dateValue: formData.get("date-input"),
    emailValue: formData.get("mail-input"),
  });
  userInput.value = "";
  dInput.value = "";
  mInput.value = "";

  renderArray(arr);
});

function renderArray(arr) {
  while (listContainer.firstChild) {
    listContainer.firstChild.remove();
  }

  const sortAndFilterTask = sortAnd(arr);

  sortAndFilterTask.forEach((e, i) => {
    //MAke a container for each task
    const container = document.createElement("div");
    container.style.border = "2px solid black";
    container.style.borderRadius = "20px";
    container.style.height = "50px";
    container.style.marginBottom = "5px";

    const optionEl = document.createElement("input");
    optionEl.type = "radio";
    optionEl.name = "r1";
    optionEl.style.margin = "20px 10px";

    optionEl.addEventListener("click", () => {
      inputEl.style.color = "grey";
      setTimeout(() => {
        container.remove();
      }, 2000);
    });

    const inputEl = document.createElement("input");
    inputEl.style.margin = "20px 10px";
    inputEl.placeholder = "new Name";
    inputEl.style.border = "none";
    inputEl.readOnly = true;
    inputEl.value = e.nameValue;

    inputEl.addEventListener("input", () => {
      const width = inputEl.value.length * 20; // Calculate the width based on the length of the value
      inputEl.style.width = width + "px";
    });

    const dateEl = document.createElement("input");
    dateEl.style.margin = "20px 10px";
    dateEl.style.border = "none";
    dateEl.readOnly = true;
    dateEl.value = e.dateValue;

    const mailEl = document.createElement("input");
    mailEl.style.margin = "20px 10px";
    mailEl.style.border = "none";
    mailEl.readOnly = true;
    mailEl.value = e.emailValue;

    container.append(optionEl, inputEl, dateEl, mailEl);
    listContainer.append(container);
  });
  saveStateToLocalStorage();
}

function sortAnd(arr) {
  return arr.sort((a, b) => {
    switch (sortBy.value) {
      case "alpha-asc":
        return a.nameValue.localeCompare(b.nameValue);
      case "alpha-desc":
        return b.nameValue.localeCompare(a.nameValue);
    }
  });
}

sortBy.addEventListener("change", () => {
  renderArray(arr);
});

function saveStateToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(arr));
  localStorage.setItem("sortBy", sortBy.value);
}
