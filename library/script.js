const table = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const openButton = document.querySelector("button#open");
const closeButton = document.querySelector("button#close");

class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

  toggleRead() {
    this.read = !this.read
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    this.books.push(book)
    this.#display()
  }

  #display() {
    table.innerHTML = null
    this.books.forEach((book) => {
      const row = table.insertRow()
      for (const prop in book) {
        let cell
        if (prop === "title") {
          cell = document.createElement("th")
          cell.setAttribute("scope", "row")
          row.appendChild(cell)
        } else {
          cell = row.insertCell()
        }

        if (prop === "read") {
          const button = document.createElement("button")
          button.textContent = book[prop] ? "Yes" : "No"
          button.onclick = () => {
            book.toggleRead()
            this.#display()
          }
          cell.appendChild(button)
        } else {
          cell.textContent = book[prop]
        }
      }
      const deleteButton = document.createElement("button")
      deleteButton.textContent = "Delete"
      deleteButton.onclick = () => {
        const bookIndex = this.books.indexOf(book)
        this.books.splice(bookIndex, 1)
        this.#display()
      }
      row.appendChild(deleteButton)
      table.appendChild(row)
    })
  }
}

const library = new Library()
library.addBook("The Kybalion", "	William Walker Atkinson", 223, false)
library.addBook("How to Win Friends and Influence People", "Dale Carnegie",  291, false,)
library.addBook("Psycho-Cybernetics", "Maxwell Maltz", 336, true)

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
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

  library.addBook(title, author, Number(pages), Boolean(read));

  form.reset();
  dialog.close();
});