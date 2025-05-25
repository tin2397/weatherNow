const todoList = document.getElementById('todo-list');
const content = document.getElementById('content');

export const renderTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.innerHTML = ''; // Clear existing todos
    
    // Sort by priority first, then by date (newest first)
    todos.sort((a, b) => {
        // First sort by priority (high priority first)
        if (a.priority !== b.priority) {
            return b.priority ? 1 : -1;
        }
        // Then sort by date (newest first)
        return new Date(a.dueDate) - new Date(b.dueDate);
    }).forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.className = 'todo-item';
        todoElement.dataset.todoId = todo.id; // Store the todo ID as a data attribute
        todoElement.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <p>Due: ${todo.dueDate}</p>
            ${todo.priority ? '<span class="priority">High Priority</span>' : ''}
        `;
        todoList.appendChild(todoElement);
    });

    // Add event listeners to each todo item
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(item => {
        item.addEventListener('click', () => {
            const todoId = parseInt(item.dataset.todoId);
            const todo = todos.find(t => t.id === todoId);
            
            content.innerHTML = '';
            const todoSelect = document.createElement('div');
            todoSelect.id = 'todo-select';
            todoSelect.innerHTML = `
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
                <p>Due: ${todo.dueDate}</p>
                ${todo.priority ? '<span class="priority">High Priority</span>' : ''}
                <button id="finish-todo">Finish Job</button>
                <button id="edit-todo">Edit Job</button>
                <button id="close-todo">Close</button>
            `;
            content.append(todoSelect);

            const finishTodo = document.getElementById('finish-todo');
            finishTodo.addEventListener('click', () => {
                content.innerHTML = '';
                const updatedTodos = todos.filter(t => t.id !== todoId);
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
                renderTodos();
            });
            const closeTodo = document.getElementById('close-todo');
            closeTodo.addEventListener('click', () => {
                content.innerHTML = '';
            });
        });
    });
}