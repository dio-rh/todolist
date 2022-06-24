document.addEventListener("DOMContentLoaded", function () {

    const inputBook = document.getElementById("inputBook");

    inputBook.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
 });


 document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });
 document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
 });
