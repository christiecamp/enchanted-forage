//get saved book
export const getSavedBookIds = () => {
    //get saved book ids from local storage
    const savedBookIds = localStorage.getItem(`saved_books`)
        ? JSON.parse(localStorage.getItem(`saved_books`))
        : [];
    return savedBookIds;
};

//save book
export const saveBookIds = (bookIdArr) => {
    //if there's something to save, save it to local storage
    if (bookIdArr.length) {
        localStorage.setItem(`saved_books`, JSON.stringify(bookIdArr));
    } else {
        localStorage.removeItem(`saved_books`);
    }
}

//remove book
export const removeBookId = (bookId) => {
    //get all saved book ids
    const savedBookIds = localStorage.getItem(`saved_books`)
        ? JSON.parse(localStorage.getItem(`saved_books`))
        : null;
    //if no saved book ids, return false
    if (!savedBookIds) {
        return false;
    } 
    //remove book id from saved book ids
    const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
    localStorage.setItem(`saved_books`, JSON.stringify(updatedSavedBookIds));

    return true;
};