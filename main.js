'use strict'

const newCategoryForm = document.querySelector('[data-new-categore-form]');
const newCategoryInput = document.querySelector('[data-new-categore-input');
const categoriesContainer = document.querySelector('[data-categories]');

const LOCAL_STORAGE_CATEGORIES_KEYS = 'LOCAL_STORAGE_CATEGORIES_KEYS';

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
})
