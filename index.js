"use strict";

// Variables
const todoContainer = document.getElementById("todo-container");
const addTaskButton = document.getElementById("add-task-button");
const userTask = document.getElementById("input");

// If user presses Enter Trigger button down
userTask.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

// Add Task Button Functionality
addTaskButton.addEventListener('click', function() {

    if (userTask.value === ''){

        let existingError = document.querySelector('.error')
        if(!existingError){
            const errorMessage = document.createElement("p");
            errorMessage.innerHTML = "Please enter a task"
            errorMessage.classList.add("error");
            todoContainer.prepend(errorMessage);
        }
    } else {
        // Remove Error Message if applicable
        const existingError = document.querySelector('.error')
        if (existingError){
            existingError.remove();
        }

        // Todo Card Container
        const newTodoCard = document.createElement("div");
        newTodoCard.classList.add("todo-card");

        // Complete Section -----------
        const completeSection = document.createElement("div");
        completeSection.classList.add("complete-section");

        const completeButton = document.createElement("button");
        completeButton.setAttribute("id", "complete-button");
        completeSection.append(completeButton); 

        // Completed Function
        completeButton.addEventListener('click', function() {
            completeButton.classList.toggle("completed");
            taskName.classList.toggle("completed-text");
        });

        const taskName = document.createElement("p");
        taskName.setAttribute("id", "task-title");
        taskName.innerHTML = userTask.value;
        completeSection.append(taskName);

        newTodoCard.append(completeSection);

        // Edit Section -----------
        const editSection = document.createElement("div");
        editSection.classList.add("edit-section");

        const editButton = document.createElement("button");
        editButton.classList.add("pen-icon");

        // Edit Function
        editButton.addEventListener('click', function() {
            const editInput = document.createElement("input");
            editInput.setAttribute("type", "text");
            editInput.setAttribute("value", taskName.innerHTML);
        
            completeSection.replaceChild(editInput, taskName);
            editInput.focus();
            const length = editInput.value.length;
            editInput.setSelectionRange(length, length);
        
            // Handle submit when Enter is pressed
            editInput.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    if (editInput.value.trim() === '') {
                        alert("Task cannot be empty!");
                        return;
                    }
                    submitEdit();
                }
            });
        
            // Handle blur event
            editInput.addEventListener('blur', function() {
                if (editInput.value.trim() === '') {
                    alert("Task cannot be empty!");
                    return; 
                }
                submitEdit();
            });
        
            function submitEdit() {
                taskName.innerHTML = editInput.value; 
                completeSection.replaceChild(taskName, editInput); 
            }
        });

        editSection.append(editButton);

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-icon");

        // Delete Function
        trashButton.addEventListener('click', function() {
            deleteTask(newTodoCard);
        });

        editSection.append(trashButton);

        newTodoCard.append(editSection);

        // Add Card to Container
        todoContainer.prepend(newTodoCard);

        // Reset User Input
        userTask.value = "";
    }
});

// Delete Task Function
function deleteTask(taskElement) {
    taskElement.remove();
}

