'use strict'

const newCategoryForm = document.querySelector('[data-new-categore-form]');
const newCategoryInput = document.querySelector('[data-new-categore-input');
const categoriesContainer = document.querySelector('[data-categories]');

const LOCAL_STORAGE_CATEGORIES_KEYS = 'LOCAL_STORAGE_CATEGORIES_KEYS';

//Application Data
let  categories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEYS)) || [];
// Add categories
newCategoryForm.addEventListener('submit', (event) => {
    event.preventDefault; // Форма не будет обновлятся/сбрасиватся

    // Get value from input field
    const category = newCategoryInput.value;

    // Validation
    const isCategoryEmpty = !category || !category.trim().length;
    if (isCategoryEmpty) {
        return console.log('Enter the task!');
    }

    categories.push({_id: Date.now.toString(), category: category, color: randomHexolor() });
})



// Auxiliary Functions
function getRandomHexColor() {
    var hex = (Math.round(Math.random() * 0xffffff)).toString(16);
    while (hex.length < 6) hex = "0" + hex;
    return `#${hex}`;
}
