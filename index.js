'use script'
//declare variables
const inputTitle = document.querySelector('.booktitle')
const inputAuthor = document.querySelector('.bookauthor')
const addBtn = document.querySelector('.add')
const showBook = document.getElementById('books-list')
const removeBtn = document.querySelector('.remove')

// create an empty collection to store our books
let bookList = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

let position = 0;
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
  `
  const btnRmv = document.createElement('button');
  btnRmv.className = 'remove';
  btnRmv.id = 'rmv-btn';
  btnRmv.innerHTML = 'remove';
  addBook.append(btnRmv);

  const underline = document.createElement('div');
  underline.className='underline';
  addBook.append(underline);
  showBook.append(addBook);


  btnRmv.addEventListener('click', () => {
    const newArray = bookList.filter(books => {
      return books.title !== newBook.title ||
      books.author !== newBook.author
    });

    bookList = newArray;
    printBooks(bookList);
  })

  function clearInput() {
    document.getElementById("form")[0].reset();
  }
})

const printBooks = (bookList) => {
  showBook.innerHTML = '';
  bookList.map((item) => {
    const addBook = document.createElement('div');
    addBook.className = 'addbook';
    addBook.innerHTML = `<p class="title">${item.title}</p>
      <p class="author">${item.author}</p>
    `
    const btnRmv = document.createElement('button');
    btnRmv.className = 'remove';
    btnRmv.id = 'rmv-btn';
    btnRmv.innerHTML = 'remove';
    addBook.append(btnRmv);
  
    const underline = document.createElement('div');
    underline.className='underline';
    addBook.append(underline);
    showBook.append(addBook);
  
  
    btnRmv.addEventListener('click', () => {
      const newArray = bookList.filter(books => {
        return books.title !== item.title ||
        books.author !== item.author
      });
  
      bookList = newArray;
      printBooks(bookList);
      debugger;
    })
  })
}

//create a function to remove book

