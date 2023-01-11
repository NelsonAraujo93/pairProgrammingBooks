// declare variables
const mainContainer = document.getElementById('main');


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
const printBooks = (books, container) => {
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
    return container.append(addBook);
  });
};

function clearInput() {
  form[0].value = '';
  form[1].value = '';
}

const renderListSection = () => {
  mainContainer.innerHTML = '';
  const bookSection = document.createElement('section');
  bookSection.id = 'list';
  bookSection.className = 'section';
  const bookListContainer = document.createElement('div');
  bookListContainer.className = 'showbooks';
  const bookListHeader = document.createElement('div');
  bookListHeader.className = 'heading';
  bookListHeader.innerHTML = '<h1>All awesome books</h1>';
  const bookListHtml = document.createElement('div');
  bookListHtml.id = 'books-list';
  bookListContainer.append(bookListHeader);
  bookListContainer.append(bookListHtml);
  bookSection.append(bookListContainer);
  mainContainer.append(bookSection);
  printBooks(booksList.bookList, bookListHtml);

}

const renderAddSection = () => {
  mainContainer.innerHTML = '';
  const addSection = document.createElement('section');
  addSection.id='addNew';
  addSection.classList.add('addbookform', 'section');
  const form = document.createElement('form');
  form.id = 'form';
  form.innerHTML = `<div class="heading">
    <h1>Add a new book</h1>
  </div>
  <input type="text" class="booktitle" id="title" name="book_title" placeholder="Title" required>
  <input type="text" class="bookauthor" id="author" name="book_title" placeholder="Author" required>`;

  const addBtn = document.createElement('button');
  addBtn.id = 'addBtn';
  addBtn.className = 'add';
  addBtn.type = 'submit';
  addBtn.innerHTML = 'Add';
  form.append(addBtn);

  addSection.append(form);
  mainContainer.append(addSection);
  addBtn.addEventListener('click', (e) => {
    debugger;
    e.preventDefault();
    const inputTitle = document.querySelector('.booktitle');
    const inputAuthor = document.querySelector('.bookauthor');
  
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
  
    btnRmv.addEventListener('click', () => {
      booksList.remove(newBook);
      booksList.toLS();
      printBooks(booksList.bookList);
      window.location.reload();
    });
    booksList.toLS();
    clearInput();
  })
}

const renderContactSection = () => {

}

const navigation = (value) => {
  switch (value) {
    case 0:
      renderListSection();
    break;
    case 1:
      renderAddSection();
    break;
    case 2:
      renderContactSection();
    break;
  }
}

navigation(0);