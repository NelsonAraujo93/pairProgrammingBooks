'use script'

//declare variables
const inputTitle = document.querySelector('.booktitle')
const inputAuthor = document.querySelector('.bookauthor')
const addBtn = document.querySelector('.add')
const showBook = document.querySelector('.showbooks')
const removeBtn = document.querySelector('.remove')

// create an empty collection to store our books
let bookList = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

// create a function to add a new book
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
const theTitle = inputTitle.value
const theAuthor = inputAuthor.value
const newBook = new Book(theTitle, theAuthor)
bookList.push(newBook)
const html = ` 
  <div class="addbook">
    <p class="title">${theTitle}</p>
    <p class="author">${theAuthor}</p>
    <button class="remove">Remove</button>
    <div class="underline"></div>
  </div>
`
showBook.innerHTML += html;

function clearInput() {
  document.getElementById("form")[0].reset();
}
})

//create a function to remove book

