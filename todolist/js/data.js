const STORAGE_KEY = "BOOK_APPS";

let incompleteBookshelfList = [];

function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("MAAF BROWSER KAMU TIDAK TERDAPAT LOCAL STORAGE");
       return false
   }
   return true;
}

function saveData() {
   const parsed = JSON.stringify(incompleteBookshelfList);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);

   let data = JSON.parse(serializedData);

   if(data !== null)
       incompleteBookshelfList = data;

   document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}

function composeTodoObject(judul, author,tahunbuku, isCompleted) {
   return {
       id: +new Date(),
       judul,
       author,
       tahunbuku,
       isCompleted
   };
}

function findTodo(bookId) {
   for(book of incompleteBookshelfList){
       if(book.id === bookId)
           return book;
   }
   return null;
}


function findTodoIndex(bookId) {
   let index = 0
   for (book of incompleteBookshelfList) {
       if(book.id === bookId)
           return index;

       index++;
   }

   return -1;
}

function refreshDataFromTodos() {
   const listUncompleted = document.getElementById(UNCOMPLETED_LIST);
   let listCompleted = document.getElementById(COMPLETED_LIST);


   for(book of incompleteBookshelfList){
       const newBook = makeBook(book.judul,book.author,book.tahunbuku,book.isCompleted);
       newBook[BOOK_ITEMID] = book.id;


       if(book.isCompleted){
           listCompleted.append(newBook);
       } else {
           listUncompleted.append(newBook);
       }
   }
}

for(book of incompleteBookshelfList){
   const newBook = makeBook(book.judul,book.author,book.tahunbuku,book.isCompleted);
   newBook[BOOK_ITEMID] = book.id;


   if(book.isCompleted){
       listCompleted.append(newBook);
   } else {
       listUncompleted.append(newBook);
   }
}
