
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        const currentDate = new Date();
        const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
        const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);
        li.innerHTML = inputBox.value + " - " + formattedDate + " " + formattedTime; // Include formatted date and time
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    inputBox.focus();
    saveData();
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        if (confirm("Are you sure you want to delete the list?")) {
            e.target.parentElement.remove();
            saveData();
        }
    }
    inputBox.focus();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
