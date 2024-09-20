const myLibrary = [];
const table = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const openBtn = document.querySelector("button#open");
const closeBtn = document.querySelector("button#close");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayLibrary() {
  table.innerHTML = null;

  myLibrary.forEach((book) => {
    const row = document.createElement("tr");

    for (const prop in book) {
      if (book.hasOwnProperty(prop)) {
        let cell;
        if (prop === "title") {
          cell = document.createElement("th");
          cell.setAttribute("scope", "row");
        } else {
          cell = document.createElement("td");
        }

        if (prop === "read") {
          const btn = document.createElement("button");
          btn.textContent = book[prop] ? "Yes" : "No";
          btn.addEventListener("click", () => {
            book.toggleRead();
            displayLibrary();
          });
          cell.appendChild(btn);
        } else {
          cell.textContent = book[prop];
        }

        row.appendChild(cell);
      }
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      const bookIndex = myLibrary.findIndex((b) => b === book);
      myLibrary.splice(bookIndex, 1);
      table.removeChild(row);
    });
    row.appendChild(deleteBtn);

    table.appendChild(row);
  });
}

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read");

  addBookToLibrary(title, author, Number(pages), Boolean(read));
  displayLibrary();

  form.reset();
  dialog.close();
});

addBookToLibrary("The Kybalion", "	William Walker Atkinson", 223, false);
addBookToLibrary(
  "How to Win Friends and Influence People",
  "Dale Carnegie",
  291,
  false,
);
addBookToLibrary("Psycho-Cybernetics", "Maxwell Maltz", 336, true);
displayLibrary();
