let myLibrary;

const DEFAULT_DATA = [
  {
    title: "Nartuo",
    author: "Masashi Kishimoto",
    pages: 100,
    status: "Not Read",
  },
  {
    title: "The Lord of the Rings",
    author: "Tolkien",
    pages: 100,
    status: "Read",
  },
];

const $title = document.querySelector("#title");
const $author = document.querySelector("#author");
const $pages = document.querySelector("#pages");
const $status = document.querySelector("#status");
const $tableBody = document.querySelector("#book-table-body");
const $form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  render();
  clearForm();
});

const $table = document
  .querySelector("table")
  .addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == "Delete") {
      if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
        deleteBook(findBook(myLibrary, currentTarget.innerText));
    }
    if (e.target.classList.contains("status-button")) {
      changeStatus(findBook(myLibrary, currentTarget.innerText));
    }
    updateLocalStorage();
    render();
  });

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary() {
  if (
    $title.value.length === 0 ||
    $author.value.length === 0 ||
    $pages.value.length === 0
  ) {
    alert("Please, complete all fields!");
    return;
  }
  const newBook = new Book(
    $title.value,
    $author.value,
    $pages.value,
    $status.value
  );
  myLibrary.push(newBook);
  updateLocalStorage();
}

function changeStatus(book) {
  if (myLibrary[book].status === "Read") {
    myLibrary[book].status = "Not Read";
  } else myLibrary[book].status = "Read";
}

function deleteBook(currentBook) {
  myLibrary.splice(currentBook, currentBook + 1);
}

function findBook(libraryArray, title) {
  if (libraryArray.length === 0 || libraryArray.length === null) {
    return;
  }
  for (book of libraryArray)
    if (book.title === title) {
      return libraryArray.indexOf(book);
    }
}

function clearForm() {
  $title.value = "";
  $author.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function checkLocalStorage() {
  if (localStorage.getItem("myLibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  } else {
    myLibrary = DEFAULT_DATA;
  }
}

function render() {
  checkLocalStorage();
  $tableBody.innerHTML = "";
  myLibrary.forEach((book) => {
    const htmlBook = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td class="status"><button class="status-button">${book.status}</button></td>
            <td class="borders"><button class="Delete">Delete</button></td>
        </tr>
    `;
    $tableBody.insertAdjacentHTML("afterbegin", htmlBook);
  });
}
// localStorage.clear();
render();
