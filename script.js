document.addEventListener('DOMContentLoaded', () => {
  const taskinput = document.getElementById("task-input");
  const addtaskbtn = document.getElementById("add-task-btn");
  const tasklist = document.getElementById("task-list");
  const numbers = document.getElementById("numbers");
  const progress = document.getElementById("progress");
  const emptyImage = document.querySelector(".empty-image");

  //yay wala kaam animation ka hay 
  function launchConfetti() {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }
   
  //yaha par kahatm hay 




  
  const updateStats = () => {
    const total = tasklist.children.length;
    const completed = tasklist.querySelectorAll(".completed").length;
    numbers.textContent = `${completed}/${total}`;
    progress.style.width = total ? `${(completed / total) * 100}%` : "0%";
    emptyImage.style.display = total === 0 ? "block" : "none";

    if (total > 0 && completed === total) {
      launchConfetti();
    }
  };

 
  const addtask = (text = "", completed = false) => {
    const taskText = text || taskinput.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
      <span>${taskText}</span>
      <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const checkbox = li.querySelector(".checkbox");
    const editbtn = li.querySelector(".edit-btn");
    const deletebtn = li.querySelector(".delete-btn");

    if (completed) {
      li.classList.add("completed");
      editbtn.disabled = true;
      editbtn.style.opacity = 0.6;
    }

    checkbox.addEventListener("change", () => {
      const isChecked = checkbox.checked;
      li.classList.toggle("completed", isChecked);
      editbtn.disabled = isChecked;
      editbtn.style.opacity = isChecked ? 0.6 : 1;
      updateStats();
    });

    editbtn.addEventListener("click", () => {
      if (!checkbox.checked) {
        taskinput.value = li.querySelector("span").textContent;
        li.remove();
        updateStats();
      }
    });

    deletebtn.addEventListener("click", () => {
      li.remove();
      updateStats();
    });

    tasklist.appendChild(li);
    taskinput.value = "";
    updateStats();
  };

 
  addtaskbtn.addEventListener("click", (e) => {
    e.preventDefault();
    addtask();
  });

  taskinput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addtask();
    }
  });

  updateStats();
});
