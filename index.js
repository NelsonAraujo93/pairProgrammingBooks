// declare variables
const inputTitle = document.querySelector('.booktitle');
const inputAuthor = document.querySelector('.bookauthor');
const addBtn = document.querySelector('.add');
const showBook = document.getElementById('books-list');
const form = document.getElementById('form');

class BookList {
  constructor(bookList) {
    this.bookList = bookList;
  }

  fromLs() {
    if (localStorage.books) {
      const from = JSON.parse(localStorage.books);
      this.bookList = from;
    }
  }

  toLS() {
    const stringBooks = JSON.stringify(this.bookList);
    localStorage.setItem('books', stringBooks);
  }

  addBook(book) {
    this.bookList.push(book);
  }

  remove(book) {
    const newArray = this.bookList.filter((books) => (
      books.title !== book.title || books.author !== book.author
    ));
    this.bookList = newArray;
  }
}

const booksList = new BookList([]);
booksList.fromLs();

function Book(title, author) {
  this.title = title;
  this.author = author;
}

// create an empty collection to store our books
const printBooks = (books) => {
  showBook.innerHTML = '';
  books.map((item) => {
    const addBook = document.createElement('div');
    addBook.className = 'addbook';
    const bookContent = document.createElement('div');
    bookContent.className = 'book-content';
    bookContent.innerHTML = `<p class="title">"${item.title}" by ${item.author}</p>`;
    const btnRmv = document.createElement('button');
    btnRmv.className = 'remove';
    btnRmv.id = 'rmv-btn';
    btnRmv.innerHTML = 'Remove';
    bookContent.append(btnRmv);
    addBook.append(bookContent);
    const underline = document.createElement('div');
    underline.className = 'underline';
    addBook.append(underline);
    btnRmv.addEventListener('click', (e) => {
      e.preventDefault();
      booksList.remove(item);
      booksList.toLS();
      printBooks(booksList.bookList);
      window.location.reload();
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
  booksList.addBook(newBook);
  const addBook = document.createElement('div');
  addBook.className = 'addbook';
  const bookContent = document.createElement('div');
  bookContent.className = 'book-content';
  bookContent.innerHTML = `<p class="title">"${theTitle}" by ${theAuthor}</p>`;
  const btnRmv = document.createElement('button');
  btnRmv.className = 'remove';
  btnRmv.id = 'rmv-btn';
  btnRmv.innerHTML = 'Remove';
  bookContent.append(btnRmv);
  addBook.append(bookContent);

  const underline = document.createElement('div');
  underline.className = 'underline';
  addBook.append(underline);
  showBook.append(addBook);

  btnRmv.addEventListener('click', () => {
    booksList.remove(newBook);
    booksList.toLS();
    printBooks(booksList.bookList);
    window.location.reload();
  });
  booksList.toLS();
  clearInput();
});

printBooks(booksList.bookList);