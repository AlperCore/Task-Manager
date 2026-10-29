const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", function() {
    const taskText = taskInput.value;
    if (taskText.trim() === "") {
        return;
    }
    const li = document.createElement("li");
li.textContent = taskText;
li.addEventListener("click", function() {
    li.style.textDecoration =
        li.style.textDecoration === "line-through"
            ? "none"
            : "line-through";
            
            saveTasks();                            
});
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

li.appendChild(deleteBtn);
deleteBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    li.remove();
    saveTasks();
    updateTaskCounter();
    updateCompletedCounter();
});
taskList.appendChild(li);
taskInput.value = "";
saveTasks();
updateTaskCounter();
});
function saveTasks() {
    const tasks = [];

    taskList.querySelectorAll("li").forEach(function(li) {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.style.textDecoration === "line-through"
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(function(task) {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.addEventListener("click", function() {
            li.style.textDecoration =
                li.style.textDecoration === "line-through"
                    ? "none"
                    : "line-through";
        
            saveTasks();
            updateCompletedCounter();
        });
    
        if (task.completed) {
            li.style.textDecoration = "line-through";
        }
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        
        deleteBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            li.remove();
            saveTasks();
            updateTaskCounter();
            updateCompletedCounter();
        });
        
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    
}
loadTasks();
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTaskBtn.click();
    }

    
});
function updateTaskCounter() {
    const taskCounter = document.getElementById("taskCounter");
    const totalTasks = taskList.querySelectorAll("li").length;

    taskCounter.textContent = "Total Tasks: " + totalTasks;
}
updateTaskCounter();
function updateCompletedCounter() {
    const completedCounter = document.getElementById("completedCounter");

    const completedTasks = Array.from(taskList.querySelectorAll("li"))
    .filter(function(li) {
        return li.style.textDecoration === "line-through";
    }).length;

    completedCounter.textContent = "Completed Tasks: " + completedTasks;
}
updateCompletedCounter();