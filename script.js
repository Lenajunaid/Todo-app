document.addEventListener("DOMContentLoaded", () => {
  let todos = []; 

  const container = document.querySelector(".container");
  const ul = document.createElement("ul");
  container.appendChild(ul);

  const title = document.querySelector(".title");
  title.textContent = "To-Do List";

  const form = document.querySelector(".todo-form");
  const input = document.querySelector(".todo-input");
  const counter = document.getElementById("todo-counter");
  const searchInput = document.getElementById("search");

  function renderTodos(filter = "") {
    ul.innerHTML = "";
    const filtered = todos.filter(todo => todo.text.toLowerCase().includes(filter.toLowerCase()));

    filtered.forEach((todo, index) => {
      const li = document.createElement("li");
      li.classList.add("todo-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const span = document.createElement("span");
      span.textContent = todo.text;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        const newText = prompt("Edit task:", todo.text);
        if (newText !== null && newText.trim()) {
          todos[index].text = newText.trim();
          renderTodos(searchInput.value);
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        todos.splice(index, 1);
        renderTodos(searchInput.value);
      };

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    });

    counter.textContent = `Total: ${todos.length}`;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (input.value.trim() === "") return;

    todos.push({ text: input.value.trim() });
    input.value = "";
    renderTodos(searchInput.value);
  });

  searchInput.addEventListener("input", () => {
    renderTodos(searchInput.value);
  });

  renderTodos();
});
