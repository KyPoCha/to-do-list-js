const addTaskBtn = document.getElementById("add-task-btn");
const descTaskInput = document.getElementById("description-task");
const toDoWrapper = document.querySelector(".todos-wrapper");

/*
const task = {
    description: "Go for a walk",
    complete: false,
}
*/

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));

let todItemElems = [];

function Task(description) {
    this.description = description;
    this.complete = false;
}

const updateLocalStorage = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
};

const createTemplate = (task, index)=>{
    return `
    <div class="todo-item ${task.complete ? "checked" : ""}">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.complete ? "checked" : ""}>
                    <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
                </div>
            </div>
    `;
};

const filterTask = ()=>{
    const activeTasks = tasks.length && tasks.filter((item)=>{
        item.complete === false;
    });
    const completedTasks = tasks.length && tasks.filter((item)=>{
        item.complete === true;
    });
    tasks = [...activeTasks, ...completedTasks];
};

const fillList = ()=>{
    toDoWrapper.innerHTML = "";
    if(tasks.length){
        tasks.forEach((item,index)=>{
            toDoWrapper.innerHTML += createTemplate(item,index);
        });
        todItemElems = document.querySelectorAll(".todo-item");
    }
};

fillList();

const completeTask = (index)=>{
    tasks[index].complete = !tasks[index].complete;
    if(tasks[index].complete){
        todItemElems[index].classList.add('checked');
    }
    else{
        todItemElems[index].classList.remove('checked');
    }
    updateLocalStorage();
    fillList();
};

const deleteTask = (index)=>{
    todItemElems[index].classList.add("delition");
    setTimeout(()=>{
          tasks.splice(index,1);
          updateLocalStorage();
          fillList();
          },1000);
};

addTaskBtn.addEventListener('click',()=>{
    tasks = [...tasks, new Task(descTaskInput.value)];
    updateLocalStorage();
    fillList();
    descTaskInput.value = "";
});

