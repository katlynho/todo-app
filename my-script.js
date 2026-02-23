const newTodo = document.getElementById('newTodo');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const count = document.getElementById('count');
const leftCount = document.getElementById('leftCount');
const showCompleted = document.getElementById('showCompleted');
const clearCompleted = document.getElementById('clearCompleted');
const clearAll = document.getElementById('clearAll');

function updateCounts(){
    const items = todoList.children.length;
    const completed = todoList.querySelectorAll('.todo.completed').length;
    count.textContent = items + (items===1? ' item':' items');
    leftCount.textContent = (items - completed) + ' left';
}

function makeTodoItem(text){ 
    const item = document.createElement('li');
    item.className = 'todo';
    item.innerHTML = `
        <input type="checkbox" class="toggle" aria-label="Mark complete">
        <div class="title">${text}</div>
        <div class="actions">
            <button class="icon-btn edit" title="Edit">&#9998;</button>
            <button class="icon-btn remove" title="Remove">&times;</button>
        </div>
    `;
    
    item.querySelector('.toggle').addEventListener('change', e=>{
        if (e.target.checked) {
            item.classList.add('completed');
            item.style.display = 'none';
        }
        else {            
            item.classList.remove('completed');
            item.style.display = '';
        }
        updateCounts();
    });

    item.querySelector('.remove').addEventListener('click', ()=>{
        item.remove();
        updateCounts();
    });

    item.querySelector('.edit').addEventListener('click', ()=>{
        const title = item.querySelector('.title');
        const currentText = title.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';
        title.replaceWith(input);
        input.focus();

        function save(){
            const newText = input.value.trim();
            if(newText){
                title.textContent = newText;
                input.replaceWith(title);
            } else {
                item.remove();
            }
            updateCounts();
        }

        input.addEventListener('blur', save);
        input.addEventListener('keydown', e=>{
            if(e.key === 'Enter') save();
            else if(e.key === 'Escape') {
                input.replaceWith(title);
            }
        });
    });

    return item;
}

addBtn.addEventListener('click', ()=>{
    const val = newTodo.value.trim();
    if(!val) return;
    const item = makeTodoItem(val);
    todoList.prepend(item);
    newTodo.value = '';
    updateCounts();
    newTodo.focus();
});

newTodo.addEventListener('keydown', e=>{
    if(e.key === 'Enter') addBtn.click();
});

showCompleted.addEventListener('click', ()=> {
    const completedItems = document.querySelectorAll('.todo.completed');
    if (completedItems.length === 0) return;
    
    if (showCompleted.textContent === 'Show completed') {
        completedItems.forEach(todo => todo.style.display = '');
        showCompleted.textContent = 'Hide completed';
        showCompleted.style.backgroundColor = '#493e3e2e';
    } else {
        completedItems.forEach(todo => {
                todo.style.display = 'none';
        });
        showCompleted.textContent = 'Show completed';
        showCompleted.style.backgroundColor = '';
    }
});

clearAll.addEventListener('click', ()=>{
    todoList.querySelectorAll('.todo').forEach(n=>n.remove());
    updateCounts();
});