const grid = document.querySelector("#grid");

function createGrid(gridElem, size) {
  gridElem.innerHTML = null;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    gridElem.appendChild(square);
  }
}

function handleGridHover(event) {
  const target = event.target;

  if (target.id === "grid") {
    return;
  }

  target.style.backgroundColor = "black";
}

createGrid(grid, 16);

grid.addEventListener("mouseover", handleGridHover);
