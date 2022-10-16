'use strict';
// Selectors for new category form
const newCategoryForm = document.querySelector('[data-new-category-form]');
const newCategoryInput = document.querySelector('[data-new-category-input]'); 

// Selector for categories container
const categoriesContainer = document.querySelector('[data-categories]');
// Selector for new todo form
const curentlyViewingLable = document.querySelector('[data-currently-viewing]')
const newTodoForm = document.querySelector('[data-new-todo-form]');
const curentCategoryView = document.querySelector('[data-view-category]')
const newTodoSelect = document.querySelector('[data-new-todo-select]');
const newTodoInput = document.querySelector('[data-new-todo-input]');

// Selector for edit todo form
const editTodoForm = document.querySelector('[data-edit-todo-form]');
const editTodoSelect = document.querySelector('[data-edit-todo-select]');
const editTodoInput = document.querySelector('[data-edit-todo-input]');

// Selector for todos container
const todosContainer = document.querySelector('[data-cards]');

// Local storage keys
const LOCAL_STORAGE_CATEGORIES_KEYS = 'LOCAL_STORAGE_CATEGORIES_KEYS';
const LOCAL_STORAGE_TODOS_KEYS = 'LOCAL_STORAGE_TODOS_KEYS';
// Sidebar-color selectors
const sideBarColor = document.querySelector('sidebar-color');

let curentViewTodos = null;

//Application Data
const categories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEYS)) || [];
let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEYS)) || [];

// Add categories
newCategoryForm.addEventListener('submit', event => {
  event.preventDefault();
  const category = newCategoryInput.value;

  // Validation
  const isCategoryEmpty = !category || !category.trim().length;
  if (isCategoryEmpty) {
    return alert('Enter the task!');
  }

  categories.push({
    _id: Date.now().toString(),
    category,
    color: getRandomHexColor(),
  });

  newCategoryInput.value = '';

  saveAndRender();
});

// Change category color
categoriesContainer.addEventListener('change', event => {
  if(event.target.tagName.toLowerCase() == 'input') {
    const newCategoryColor = event.target.value;
    const categoryId = event.target.parentElement.getAttribute('data-category-id')
    console.log(categoryId)
    const categoryToEdit = categories.find((category) => category._id === categoryId);
    console.log(categoryToEdit)
    categoryToEdit.color = newCategoryColor;
    saveAndRender()
  }
})


// Delete category
let index = null
categoriesContainer.addEventListener('click', event => {
  index = event.target.dataset.removeBtn
  if(event.target.classList.contains('fa-trash-alt')){

todos = todos.filter(todo => todo.categoryId != index)
      const categoryToDeleteIndex = categories.findIndex(category =>category._id === event.target.dataset.removeBtn);
      categories.splice(categoryToDeleteIndex,1)
   if(curentViewTodos != null) {
    curentViewTodos = null
   }
      saveAndRender();
  }
  });

//Add todos
newTodoForm.addEventListener('submit', event => {
  event.preventDefault();

  todos.push({
    _id: Date.now().toString(),
    categoryId: newTodoSelect.value,
    todo: newTodoInput.value,
  });

  newTodoSelect.value = '';
  newTodoInput.value = '';

  saveAndRender();
});


//Save edit todos
let todoToEdit = null;
editTodoForm.addEventListener('submit', event => {
  event.preventDefault();

  todoToEdit.categoryId = editTodoSelect.value;
  todoToEdit.todo = editTodoInput.value;

  editTodoForm.style.display = 'none';
  newTodoForm.style.display = 'flex';

  editTodoSelect.value = '';
  editTodoInput.value = '';

  saveAndRender();
});

//Edit and delete todos
todosContainer.addEventListener('click', event => {
  if (event.target.classList[1] === 'fa-edit') {
    newTodoForm.style.display = 'none';
    editTodoForm.style.display = 'flex';

    todoToEdit = todos.find(todo => todo._id === event.target.dataset.editTodo);
    if(curentViewTodos != null) {
      todoToEdit = curentViewTodos.find(todo => todo._id === event.target.dataset.editTodo);
      editTodoSelect.value = todoToEdit.categoryId;
      editTodoInput.value = todoToEdit.todo;
    }
    editTodoSelect.value = todoToEdit.categoryId;
    editTodoInput.value = todoToEdit.todo;
  }
  if (event.target.classList[1] === 'fa-trash-alt') {
    const todoToDeleteIndex = todos.findIndex(todo => todo._id === event.target.dataset.deleteTodo);
    todos.splice(todoToDeleteIndex, 1);

  if(curentViewTodos != null) {
    const curentViewTodoToDelete = curentViewTodos.findIndex(todo => todo._id === event.target.dataset.deleteTodo);
    curentViewTodos.splice(todoToDeleteIndex, 1);
  }
    saveAndRender();
  }
});

// Show current category
curentCategoryView.addEventListener('change',event => {
  curentViewTodos = todos.filter(todo => todo.categoryId == curentCategoryView.value)
  if(curentViewTodos.length == 0){
    curentViewTodos = null;
  }
  console.log(curentCategoryView.value)
  console.log(curentViewTodos)
  saveAndRender()
})


// Functions
function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEYS, JSON.stringify(categories));
  localStorage.setItem(LOCAL_STORAGE_TODOS_KEYS, JSON.stringify(todos));
}

function render() {
  clearChildElements(categoriesContainer);
  clearChildElements(newTodoSelect);
  clearChildElements(todosContainer);
  clearChildElements(editTodoSelect);
  clearChildElements(curentCategoryView)
  clearChildElements(curentlyViewingLable)
  renderCategories();
  renderFormOptions();
  renderTodos();
}

function renderCategories() {
  categoriesContainer.innerHTML += `<li class="sidebar-item">All Categories</li>`;
  categories.forEach(({ _id, category, color }) => {
    categoriesContainer.innerHTML += `
    <li class="sidebar-item" data-category-id=${_id}>
    ${category}
    <input type="color" value=${color} class="sidebar-color">
    <i class="far fa-trash-alt" data-remove-btn=${_id}></i>
    </li>`;
  });
}

function renderFormOptions() {
  newTodoSelect.innerHTML += `<option value="">All CAtegories</option`;
  editTodoSelect.innerHTML += `<option value="">Select A Category</option>`;
  curentCategoryView.innerHTML += `<option value="">Select A Category</option>`
  curentCategoryView.innerHTML += `<option value="0">All Categories</option>`
  categories.forEach(({ _id, category }) => {
    newTodoSelect.innerHTML += `<option value=${_id}>${category}</option`;
    editTodoSelect.innerHTML += `<option value=${_id}>${category}</option>`;
    curentCategoryView.innerHTML += `<option value=${_id}>${category}</option>`;
  });
}

function renderTodos() {

  if (curentViewTodos == null){

    todos.forEach(({ _id, categoryId, todo }) => {

      // Get Complimentary categoryDetails Based On TaskId
      const { color, category } = categories.find(({ _id }) => _id === categoryId);
      
      const backgroundColor = convertHexToRGBA(color, 20);
      curentlyViewingLable.innerHTML =`
      <div class="currently-viewing" data-currently-viewing>
        You are currently viewing All Categories
      </div>`;
      todosContainer.innerHTML += `
    <div class="todo" style="border-color: ${color}">
        <div class="todo-tag" style="background-color: ${backgroundColor}; color: ${color};">
          ${category}
        </div>
        <p class="todo-description">${todo}</p>
        <div class="todo-actions">
          <i class="far fa-edit" data-edit-todo=${_id}></i>
          <i class="far fa-trash-alt" data-delete-todo=${_id}></i>
        </div>
    </div>`;
    });

  } else {

 
    curentViewTodos.forEach(({ _id, categoryId, todo }) => {

      // Get Complimentary categoryDetails Based On TaskId
      const { color, category } = categories.find(({ _id }) => _id === categoryId);
      const backgroundColor = convertHexToRGBA(color, 20);
      curentlyViewingLable.innerHTML =`
      <div class="currently-viewing" data-currently-viewing>
        You are currently viewing ${category}
      </div>`;
      todosContainer.innerHTML += `
    <div class="todo" style="border-color: ${color}">
        <div class="todo-tag" style="background-color: ${backgroundColor}; color: ${color};">
          ${category}
        </div>
        <p class="todo-description">${todo}</p>
        <div class="todo-actions">
          <i class="far fa-edit" data-edit-todo=${_id}></i>
          <i class="far fa-trash-alt" data-delete-todo=${_id}></i>
        </div>
    </div>`;
    });
  
  }

}


// Auxiliary Functions
function getRandomHexColor() {
  let hex = Math.round(Math.random() * 0xffffff).toString(16);
  while (hex.length < 6) hex = '0' + hex;
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



function clearChildElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
window.addEventListener('load', render);
