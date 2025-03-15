import { db } from "../services/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

class BookDAO {
  static async addBook(title, author, ISBN, quantityAvailable) {
    try {
      const books = await BookDAO.getAllBooks();
      if (books.some(book => book.ISBN === ISBN)) {
        console.log("Book already exists!");
        return;
      }

      await addDoc(collection(db, "books"), { title, author, ISBN, quantityAvailable });
      console.log("Book added!");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

  static async getAllBooks() {
    const books = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach(doc => books.push({ id: doc.id, ...doc.data() }));
    return books;
  }

  static async deleteBook(bookId) {
    await deleteDoc(doc(db, "books", bookId));
  }

  static async updateBook(bookId, updatedData) {
    await updateDoc(doc(db, "books", bookId), updatedData);
  }

  static async borrowBook(bookId, userId) {
    const bookRef = doc(db, "books", bookId);
    const bookSnap = await getDoc(bookRef);
    if (!bookSnap.exists()) return console.log("Book not found!");

    const book = bookSnap.data();
    if (book.quantityAvailable > 0) {
      await updateDoc(bookRef, { quantityAvailable: book.quantityAvailable - 1 });
      console.log("Book borrowed!");
    } else {
      console.log("This book is not available!");
    }
  }

  static async returnBook(bookId) {
    const bookRef = doc(db, "books", bookId);
    const bookSnap = await getDoc(bookRef);
    if (!bookSnap.exists()) return console.log("Book not found!");

    const book = bookSnap.data();
    await updateDoc(bookRef, { quantityAvailable: book.quantityAvailable + 1 });
    console.log("Book returned!");
  }
}

export default BookDAO;
