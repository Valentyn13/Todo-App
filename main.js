"use strict";

const newCategoryForm = document.querySelector("[data-new-category-form]");
const newCategoryInput = document.querySelector("[data-new-category-input");

const categoriesContainer = document.querySelector("[data-categories]");

const newTodoForm = document.querySelector("[data-new-todo-form]");
const newTodoSelect = document.querySelector("[data-new-todo-select]");
const newTodoInput = document.querySelector("[data-new-todo-input]");

const todosContainer = document.querySelector("[data-cards]");

const LOCAL_STORAGE_CATEGORIES_KEYS = "LOCAL_STORAGE_CATEGORIES_KEYS";
const LOCAL_STORAGE_TODOS_KEYS = "LOCAL_STORAGE_TODOS_KEYS";


//Application Data
let categories =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEYS)) || [];
  let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEYS)) || [];

// Add categories
newCategoryForm.addEventListener("submit", (event) => {
  event.preventDefault; // Форма не будет обновлятся/сбрасиватся

  // Get value from input field
  const category = newCategoryInput.value;

  // Validation
  const isCategoryEmpty = !category || !category.trim().length;
  if (isCategoryEmpty) {
    return console.log("Enter the task!");
  }

  categories.push({
    _id: Date.now.toString(),
    category: category,
    color: getRandomHexColor(),
  });

  newCategoryInput.value = "";

  saveAndRender();
});

//Add todos
newTodoForm.addEventListener('submit', (event) => {
  event.preventDefault;

  todos.push({
    _id: Date.now().toString(),
    categoryId: newTodoSelect.value,
    todo: newTodoInput,
  });

  newTodoSelect.value = '';
  newCategoryInput.value = '';

  saveAndRender();
});

// Functions
function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(
    LOCAL_STORAGE_CATEGORIES_KEYS,
    JSON.stringify(categories)
  );
  localStorage.setItem(
    LOCAL_STORAGE_TODOS_KEYS,
    JSON.stringify(todos)
  );
}

function render() {
  clearChildElements(categoriesContainer);
  clearChildElements(newTodoSelect);
  clearChildElements(todosContainer);

  renderCategories();
  renderFormOptions();
  renderTodos();

}

function renderCategories() {
  categoriesContainer.innerHTML += `<li class="sidebar-item">All Categories</li>`;
  categories.forEach(({ _id, category, color }) => {
    categoriesContainer.innerHTML += `<li class="sidebar-item" data-category-id${_id}>${category}<input type="color" value=${color} class="sidebar-color">`;
  });
}

function renderFormOptions () {
  newTodoSelect.innerHTML += `<option value="">All CAtegories</option`;
  categories.forEach(({_id,category}) => {
    newTodoSelect.innerHTML += `<option value=${_id}>${category}</option`;
  })
}

function renderTodos () {
  todos.forEach(({_id, categoryId, todo}) => {
    const {color,category} = categories.find(({_id}) =>_id === categoryId);
    const backgroundColor = convertHexToRGBA(color,20);

    todosContainer.innerHTML += `
    <div class="todo" style="border-color: ${color};">
    <div class="todo-tag" style="background-color: rgba(0, 0, 0, 0.5); color: black;">
        ${category}
    </div>
    <p class="todo-description">
        ${todo}
    </p>
    <div class="todo-actions">
        <i class="far fa-edit" data-edit-todo="${_id}"></i>
        <i class="far fa-trash-alt" data-delete-todo="${_id}"></i>
    </div>`
  })

}
// Auxiliary Functions
function getRandomHexColor() {
  var hex = Math.round(Math.random() * 0xffffff).toString(16);
  while (hex.length < 6) hex = "0" + hex;
  return `#${hex}`;
}

function convertHexToRGBA(hexCode, opacity) {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
}

window.addEventListener("load", render);

function clearChildElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
