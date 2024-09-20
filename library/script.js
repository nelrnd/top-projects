const myLibrary = [];
const table = document.querySelector("tbody");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayLibrary() {
  table.innerHTML = null;

  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    for (const prop in book) {
      let cell;
      if (prop === "title") {
        cell = document.createElement("th");
        cell.setAttribute("scope", "row");
      } else {
        cell = document.createElement("td");
      }
      cell.textContent = book[prop];
      row.appendChild(cell);
    }
    table.appendChild(row);
  });
}

addBookToLibrary("Atomic Habits", "Cal Newman", 302, true);
addBookToLibrary("Atomic Habits", "Cal Newman", 302, true);

displayLibrary();
displayLibrary();
