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
}

function render() {
  clearChildElements(categoriesContainer);
  renderCategories();
}

function renderCategories() {
  categoriesContainer.innerHTML += `<li class="sidebar-item">All Categories</li>`;
  categories.forEach(({ _id, category, color }) => {
    categoriesContainer.innerHTML += `<li class="sidebar-item" data-category-id${_id}>${category}<input type="color" value=${color} class="sidebar-color">`;
  });
}

// Auxiliary Functions
function getRandomHexColor() {
  var hex = Math.round(Math.random() * 0xffffff).toString(16);
  while (hex.length < 6) hex = "0" + hex;
  return `#${hex}`;
}

window.addEventListener("load", render);

function clearChildElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
