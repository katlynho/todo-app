const newTodo = document.getElementById('newTodo');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const countEl = document.getElementById('count');
const leftCount = document.getElementById('leftCount');
const clearCompleted = document.getElementById('clearCompleted');
const clearAll = document.getElementById('clearAll');

function updateCounts(){
    const items = todoList.children.length;
    const completed = todoList.querySelectorAll('.todo.completed').length;
    countEl.textContent = items + (items===1? ' item':' items');
    leftCount.textContent = (items - completed) + ' left';
}

function makeTodo(text){
    const li = document.createElement('li');
    li.className = 'todo';
    li.innerHTML = `
        <input type="checkbox" class="toggle" aria-label="Mark complete">
        <div class="title">${escapeHtml(text)}</div>
        <div class="actions">
            <button class="icon-btn remove" title="Remove">&times;</button>
        </div>
    `;
    // toggle complete
    li.querySelector('.toggle').addEventListener('change', e=>{
        li.classList.toggle('completed', e.target.checked);
        updateCounts();
    });
    // remove
    li.querySelector('.remove').addEventListener('click', ()=>{
        li.remove();
        updateCounts();
    });
    return li;
}

function escapeHtml(s){
    return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

addBtn.addEventListener('click', ()=>{
    const val = newTodo.value.trim();
    if(!val) return;
    todoList.prepend(makeTodo(val));
    newTodo.value = '';
    updateCounts();
    newTodo.focus();
});

newTodo.addEventListener('keydown', e=>{
    if(e.key === 'Enter') addBtn.click();
});

clearCompleted.addEventListener('click', ()=>{
    todoList.querySelectorAll('.todo.completed').forEach(n=>n.remove());
    updateCounts();
});

clearAll.addEventListener('click', ()=>{
    // if(confirm('Are you sure you want to clear all items?')) {
        todoList.innerHTML = '';
        updateCounts();
    // }
});

// sample starter items (optional)
['Buy groceries','Read 20 pages','Walk the dog'].forEach(t=>todoList.appendChild(makeTodo(t)));
updateCounts();