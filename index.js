
//Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class
class UI {
    static displayBooks() {

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));  //looping through the array of books and calling addbooktolist for each one of them.

    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list");

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class ="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }

    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form); //inserts the div before form i.e container.

        //vanish in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }


    static clearfields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}



//events:display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Event:Add books to list

document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault(); //prevent actual submit.

    //get values from input field

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill all the details', 'danger');
    }
    else {

        //instantiate book
        const book = new Book(title, author, isbn);
        UI.addBookToList(book); //adds book to the list.
        Store.addBook(book); //add book to store local.
        UI.showAlert('Book Added', 'success');
        UI.clearfields(); //clears the field after the input has been given.
    }






});

//remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);  //Removes book from local storage.

    UI.showAlert('Book Deleted', 'success');
})


//Store class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];

        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));



    }
}