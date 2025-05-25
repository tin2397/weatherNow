import './styles.css';
import { addTodo } from './todo-adjust/add-todo.js';
import { renderTodos } from './todo-adjust/render-todo.js';

const content = document.getElementById('content');
const newTodo = document.getElementById('add-todo');


newTodo.addEventListener('click', (e) => {
    e.preventDefault();
    const existingForm = document.getElementById('todo-form');
    if (existingForm) {
        content.removeChild(existingForm);
    }
    addTodo();
});

// Listen for form submission
document.addEventListener('submit', (e) => {
    if (e.target.id === 'todo-form') {
        renderTodos(); // Re-render todos after adding a new one
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});

