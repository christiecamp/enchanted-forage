//get saved book
export const getSavedBookIds = (userId) => {
    const savedBookIds = localStorage.getItem(`saved_books_${userId}`)
        ? JSON.parse(localStorage.getItem(`saved_books_${userId}`))
        : [];
    return savedBookIds;
};

//save book
export const saveBookIds = (bookIdArr, userId) => {
    if (bookIdArr.length) {
        localStorage.setItem(`saved_books_${userId}`, JSON.stringify(bookIdArr));
    } else {
        localStorage.removeItem(`saved_books_${userId}`);
    }
}

//remove book
export const removeBookId = (bookId, userId) => {
    const savedBookIds = localStorage.getItem(`saved_books_${userId}`)
        ? JSON.parse(localStorage.getItem(`saved_books_${userId}`))
        : null;
    if (!savedBookIds) {
        return false;
    } 
    const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
    localStorage.setItem(`saved_books_${userId}`, JSON.stringify(updatedSavedBookIds));
    
    return true;
};