const inputtext = document.querySelector(".new-task");
const list = document.querySelector(".todo-list");
let tasks = [];


inputtext.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        if (inputtext.value === '') {
            alert("Empty value not allowed");
        } else {
            
            addTask(inputtext.value);
            inputtext.value = ''; // Clear the input box after adding the task
        }
    }
});


//clear complete

const btn = document.querySelector('.clear');
btn.addEventListener('click', () => {
    // Filter out the completed tasks, keeping only the active tasks
   const activetasks = tasks.filter(task => task.status === 'Active');
    renderTasks(activetasks); 
    updateTaskCount()
    
});



//add taks

function addTask(taskName) {
    tasks.unshift({ name: taskName, status: "Active" });
    renderTasks(tasks);
    updateTaskCount();
}

function getTask(category){
   
    let filteredTasks = [];

    if (category === 'All') {
        filteredTasks = tasks;
    } 
    else {
        filteredTasks = tasks.filter(item => item.status === category);
    }
    console.log({ filteredTasks, category });
    renderTasks(filteredTasks);
    updateTaskCount();
}


//displaying tasks
function renderTasks(taskList) {
    const taskListElement = document.getElementById('todo-list');
    taskListElement.innerHTML = '';
    
    taskList.forEach(task => {
        const taskItem = document.createElement('li');
        
        taskItem.innerHTML = `
            <input class="toggle" type="checkbox" ${task.status === 'Completed' ? 'checked' : ''}>
            <label>${task.name}</label>
            <button class="destroy">\u00d7</button>
        `;
        taskListElement.appendChild(taskItem);

        taskItem.querySelector('.destroy').addEventListener('click', () => deleteTask(task));
        taskItem.querySelector('.toggle').addEventListener('click', () => toggleTask(task));
        updateTaskCount()
    });
    console.log(taskList);
}

//category filtering

const categorybutton = document.querySelectorAll('.foot li');
categorybutton.forEach(button => {
    button.addEventListener('click', (e) => {
        const category = e.target.parentElement.dataset.category;
        console.log({ e, category });
        getTask(category);
    });
});


//status changing of tasks

function toggleTask(task) {
    task.status = task.status === 'Active' ? 'Completed' : 'Active';
    console.log(task);
}





//deleting tasks

function deleteTask(taskToRemove){
    
    const taskIndex = tasks.indexOf(taskToRemove);
    tasks.splice(taskIndex, 1);
    renderTasks(tasks); 
    updateTaskCount()
}


function updateTaskCount() {
    const totalCount = tasks.length;
    // const activeCount = tasks.filter(task => task.status === 'Active').length;
    document.querySelector('.task-count').textContent = `${totalCount} items left`;
}
