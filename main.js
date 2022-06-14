const input = document.querySelector('input'),
    btnAdd = document.querySelector('.todo__add'),
    todoList = document.querySelector('.todo__list');

let taskArray = [];

if (localStorage.getItem('todo')) {
    taskArray = JSON.parse(localStorage.getItem('todo'));
    displayMessage();
}

btnAdd.addEventListener('click', function() {
    if (!input.value || input.value == ' ') { return; }
    let newTask = {
        todo: input.value.substring(0, 35),
        checked: false,
        completed: false,
    };

    taskArray.push(newTask);
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(taskArray));
    input.value = '';
});

function displayMessage() {
    let displayTask = '';
    taskArray.forEach(function(item, i) {
        displayTask += `
        <div class="todo__task" id='item-${i}'>
                    <label for='item_${i}' class="todo__checkbox ">
                        <input type="checkbox" id='item_${i}' ${item.checked ? 'checked' : ''}>
                        <div></div>
                    </label>
                    <div class="todo__task-text  ${item.completed ? 'completed' : ''}">${item.todo}</div>
                    <div class="todo__task-del" id='item-${i}'>-</div>
                </div>
        `;

        todoList.innerHTML = displayTask;
    });

    todoList.querySelectorAll('.todo__task-del').forEach((btn, i) => {
        btn.addEventListener('click', function() {
            taskArray.splice(i, 1);
            btn.parentNode.remove();
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(taskArray));
        });
    });

}

todoList.addEventListener('change', function(event) {
    let idinput = event.target.getAttribute('id');

    let forLabel = todoList.querySelector('[for=' + idinput + ']');
    let valueLabel = forLabel.nextElementSibling;

    taskArray.forEach(function(item) {
        if (item.todo === valueLabel.innerHTML) {
            item.checked = !item.checked;

            localStorage.setItem('todo', JSON.stringify(taskArray));

        }
    });
});

todoList.addEventListener('change', function() {
    taskArray.forEach(function(item) {
        if (item.checked == true) {
            item.completed = true;
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(taskArray));
        }

        if (item.checked == false) {
            item.completed = false;
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(taskArray));
        }
    });
});