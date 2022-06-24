const UNCOMPLETED_LIST = "incompleteBookshelfList";
const COMPLETED_LIST = "completeBookshelfList";
const BOOK_ITEMID = "itemId";


function makeBook(judul, author,tahunbuku, isCompleted) {
    let judulbuku = document.createElement("h2");
    judulbuku.innerText = judul;

    let pembuat = document.createElement("p");
    pembuat.innerText = author;

    let tahun = document.createElement("p1");
    tahun.innerText = tahunbuku;

    let list = document.createElement("div");
    list.classList.add("book_item")
    list.append(judulbuku,pembuat,tahun);

    let book_list = document.createElement("div");
    book_list.classList.add("book_shelf")
    book_list.append(list);

    if(isCompleted){
        book_list.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        book_list.append(
            createCheckButton(),
            createTrashButton(),
        );
    }

    return book_list;
}

function createTrashButton() {
    return createButton("delete-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("book-button", function(event){
        BookCompleted(event.target.parentElement);
    });
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}



function createButton(buttonTypeClass, eventListener) {
    let button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBook() {
    let uncompletedbook = document.getElementById(UNCOMPLETED_LIST);
    let inputBookTitle = document.getElementById("inputBookTitle").value;
    let inputBookAuthor = document.getElementById("inputBookAuthor").value;
    var inputBookYear = document.getElementById("date").value;

    let book = makeBook(inputBookTitle,inputBookAuthor,inputBookYear, false);

    const bookObject = composeTodoObject(inputBookTitle,inputBookAuthor,inputBookYear, false);

    book[BOOK_ITEMID] = bookObject.id;
    incompleteBookshelfList.push(bookObject);

    uncompletedbook.append(book);
    updateDataToStorage();

}



function BookCompleted(taskElement) {
    let booklistCompleted = document.getElementById(COMPLETED_LIST);
    let inputBookTitle = taskElement.querySelector(".book_item > h2").innerText;
    let inputBookAuthor = taskElement.querySelector(".book_item > p").innerText;
    var inputBookYear = taskElement.querySelector(".book_item > p1").innerText;


    let newBook = makeBook(inputBookTitle,inputBookAuthor,inputBookYear,true);

    const book = findTodo(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    booklistCompleted.append(newBook);
    taskElement.remove();

     updateDataToStorage();

}

function removeTaskFromCompleted(taskElement) {

    const bookPosition = findTodoIndex(taskElement[BOOK_ITEMID]);
    incompleteBookshelfList.splice(bookPosition, 1);
    taskElement.remove();

    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement){
    let booklistUncompleted = document.getElementById(UNCOMPLETED_LIST);
    let inputBookTitle = taskElement.querySelector(".book_item > h2").innerText;
    let inputBookAuthor = taskElement.querySelector(".book_item > p").innerText;
    var inputBookYear = taskElement.querySelector(".book_item > p1").innerText;

    let newBook = makeBook(inputBookTitle, inputBookAuthor, inputBookYear, false);

    const book = findTodo(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    booklistUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}
