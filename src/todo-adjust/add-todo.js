export const addTodo = () => {
    const content = document.getElementById('content');

    function createElement(type, id, attributes = {}) {
        const element = document.createElement(type);
        element.id = id;
        Object.entries(attributes).forEach(([key, value]) => {
            element[key] = value;
        });
        return element;
    }

    function createTodoForm() {
        const form = createElement('form', 'todo-form');
        
        // Header section
        const header = createElement('div', 'todo-form-header');
        
        // Title section
        const titleContainer = createElement('div', 'form-title-container');
        const titleLabel = createElement('label', 'form-title-label', { textContent: 'Todo Title' });
        const titleInput = createElement('input', 'form-title', { 
            type: 'text',
            placeholder: 'Enter Todo Title',
            required: true
        });
        titleContainer.append(titleLabel, titleInput);

        // Due date section
        const dateContainer = createElement('div', 'due-date-container');
        const dateLabel = createElement('label', 'due-date-label', { textContent: 'Due Date' });
        const dateInput = createElement('input', 'due-date', { type: 'date', required: true });
        dateContainer.append(dateLabel, dateInput);

        // Close button
        const closeButton = createElement('button', 'close-form', {
            type: 'button',
            textContent: 'Close'
        });

        // Description section
        const descContainer = createElement('div', 'form-description-container');
        const descLabel = createElement('label', 'form-description-label', { textContent: 'Description' });
        const descTextarea = createElement('textarea', 'form-description', {
            rows: 5,
            cols: 50,
            required: true
        });
        descContainer.append(descLabel, descTextarea);

        // Priority section
        const priorityContainer = createElement('div', 'checkbox-container');
        const priorityLabel = createElement('label', 'checkbox-label', { textContent: 'Priority'});
        const priorityCheckbox = createElement('input', 'checkbox', { type: 'checkbox' });
        priorityContainer.append(priorityLabel, priorityCheckbox);

        // Submit button
        const submitButton = createElement('button', 'submit-todo', {
            type: 'submit',
            textContent: 'Submit'
        });

        // Assemble form
        header.append(titleContainer, dateContainer, closeButton);
        form.append(header, descContainer, priorityContainer, submitButton);

        return form;
    }

    content.innerHTML = '';
    const form = createTodoForm();
    content.append(form);

    const closeForm = document.getElementById('close-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('form-title').value;
        const description = document.getElementById('form-description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('checkbox').checked;

        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        const newTodo = {
            id: Date.now(),
            title,
            description,
            dueDate,
            priority,
        }
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));

        form.reset();
        content.removeChild(form);
    });

    closeForm.addEventListener('click', (e) => {
        e.preventDefault();
        content.removeChild(form);
    });
}