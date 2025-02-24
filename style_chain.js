document.querySelectorAll(".box").forEach((box, index) => {
    box.dataset.number = box.innerText; // Store original number

    // Load saved state from localStorage
    let savedData = localStorage.getItem(`box-${index}`);
    if (savedData) {
        let { done, date } = JSON.parse(savedData);
        if (done) {
            box.classList.add("done");
            box.setAttribute("data-tooltip", `Day: ${index + 1} Date: ${date}`);
            box.dataset.savedDate = date; // Store saved date in dataset
        }
    }

    // Click event to toggle "done" state with date restrictions
    box.addEventListener("click", function () {
        let today = new Date().toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        }
        //this.innerHTML = "\u2718"
        );

        let savedDate = this.dataset.savedDate; // Get stored date if exists
        // this.innerHTML = "\u2718"
        if (this.classList.contains("done")) {
            
            if (savedDate && savedDate !== today) {
                alert("You cannot undo a past day's entry!");
                return; // Prevent undo for past dates
            }

            // Allow undo if no saved date (future date clicked early)
            this.classList.remove("done");
            this.innerHTML = this.dataset.number;
            this.removeAttribute("data-tooltip");
            this.dataset.savedDate = "";
            localStorage.removeItem(`box-${index}`);
        } else {
            // Mark as done and store the current date
            this.innerHTML = this.dataset.number;
            this.innerHTML = "\u2718"
            this.classList.add("done");
            this.setAttribute("data-tooltip", `Day: ${index + 1} Date: ${today}`);
            
            this.dataset.savedDate = today;

            localStorage.setItem(`box-${index}`, JSON.stringify({ done: true, date: today }));

        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const titleElement = document.getElementById("grid_title");

    // Load saved title from localStorage
    const savedTitle = localStorage.getItem("trackerTitle");
    if (savedTitle) {
        titleElement.textContent = savedTitle;
    }

    // Save title when user edits it
    titleElement.addEventListener("input", function () {
        localStorage.setItem("trackerTitle", titleElement.textContent);
    });
});


