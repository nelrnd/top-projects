const grid = document.querySelector("#grid");
const btn = document.querySelector("button");

function createGrid(gridElem, size) {
  const gridWidth = gridElem.offsetWidth;

  gridElem.innerHTML = null;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.style.width = gridWidth / size + "px";
    square.style.height = gridWidth / size + "px";
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

function handleBtnClick() {
  let size;

  while (!size || size < 2 || size > 100) {
    size = +prompt("Enter grid size (between 2 and 100)");
  }

  createGrid(grid, size);
}

grid.addEventListener("mouseover", handleGridHover);
btn.addEventListener("click", handleBtnClick);

createGrid(grid, 16);
