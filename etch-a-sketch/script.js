const grid = document.querySelector("#grid");
const btn = document.querySelector("button");

function createGrid(gridElem, size) {
  const gridWidth = gridElem.offsetWidth;

  gridElem.innerHTML = null;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.style.width = gridWidth / size + "px";
    square.style.height = gridWidth / size + "px";
    square.style.opacity = 0;
    gridElem.appendChild(square);
  }
}

function handleGridHover(event) {
  const target = event.target;
  const opacity = +target.style.opacity;

  if (target.id === "grid") {
    return;
  }

  target.style.backgroundColor = getRandomColor();

  if (opacity < 1) {
    target.style.opacity = opacity + 0.1;
  }
}

function handleBtnClick() {
  let size;

  while (!size || size < 2 || size > 100) {
    size = +prompt("Enter grid size (between 2 and 100)");
  }

  createGrid(grid, size);
}

function getRandomColor() {
  const random = Math.floor(Math.random() * 4);
  switch (random) {
    case 0:
      return "#B4D6CD";
    case 1:
      return "#FFDA76";
    case 2:
      return "#FF8C9E";
    case 3:
      return "#FF4E88";
  }
}

grid.addEventListener("mouseover", handleGridHover);
btn.addEventListener("click", handleBtnClick);

createGrid(grid, 16);
