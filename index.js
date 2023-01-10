// declare variables
const inputTitle = document.querySelector('.booktitle');
const inputAuthor = document.querySelector('.bookauthor');
const addBtn = document.querySelector('.add');
const showBook = document.getElementById('books-list');
const form = document.getElementById('form');
let bookList = [];

// local storage
const fromLS = () => {
  if (localStorage.books) {
    const from = JSON.parse(localStorage.books);
    bookList = from;
  }
};

const toLS = (list) => {
  const to = JSON.stringify(list);
  localStorage.setItem('books', to);
};

fromLS();

class Book {
  constructor(title, author) {
      this.title = title;
      this.author = author;
  }
}

// create an empty collection to store our books
const printBooks = (bookList) => {
  showBook.innerHTML = '';
  bookList.map((item) => {
    const addBook = document.createElement('div');
    addBook.className = 'addbook';
    addBook.innerHTML = `<p class="title">${item.title}</p>
      <p class="author">${item.author}</p>
    `;
    const btnRmv = document.createElement('button');
    btnRmv.className = 'remove';
    btnRmv.id = 'rmv-btn';
    btnRmv.innerHTML = 'remove';
    addBook.append(btnRmv);
    const underline = document.createElement('div');
    underline.className = 'underline';
    addBook.append(underline);
    btnRmv.addEventListener('click', (e) => {
      e.preventDefault();
      const newArray = bookList.filter((books) => (
        books.title !== item.title || books.author !== item.author
      ));
      bookList = newArray;
      toLS(newArray);
      printBooks(bookList);
    });
    return showBook.append(addBook);
  });
};

function clearInput() {
  form[0].value = '';
  form[1].value = '';
}

// create a function to add a new book
 addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const theTitle = inputTitle.value;
  const theAuthor = inputAuthor.value;
  const newBook = new Book(theTitle, theAuthor);
  bookList.push(newBook);

  const addBook = document.createElement('div');
  addBook.className = 'addbook';
  addBook.innerHTML = `<p class="title">${theTitle}</p>
    <p class="author">${theAuthor}</p>
  `;
  const btnRmv = document.createElement('button');
  btnRmv.className = 'remove';
  btnRmv.id = 'rmv-btn';
  btnRmv.innerHTML = 'remove';
  addBook.append(btnRmv);

  const underline = document.createElement('div');
  underline.className = 'underline';
  addBook.append(underline);
  showBook.append(addBook);

  btnRmv.addEventListener('click', () => {
    const newArray = bookList.filter((books) => (
      books.title !== newBook.title || books.author !== newBook.author
    ));
    bookList = newArray;
    toLS(newArray);
    printBooks(bookList);
    window.location.reload();
  });
  toLS(bookList);
  clearInput();
});

printBooks(bookList);