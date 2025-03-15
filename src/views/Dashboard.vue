<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <!-- Books Management Section -->
    <section class="books">
      <h2>Books Management</h2>

      <!-- Add Book Form -->
      <div class="add-book">
        <h3>Add a New Book</h3>
        <form @submit.prevent="handleAddBook">
          <input v-model="newBook.title" placeholder="Title" required />
          <input v-model="newBook.author" placeholder="Author" required />
          <input v-model="newBook.ISBN" placeholder="ISBN" required />
          <input
            v-model.number="newBook.quantityAvailable"
            type="number"
            placeholder="Quantity Available"
            required
          />
          <button type="submit">Add Book</button>
        </form>
      </div>

      <!-- Book List -->
      <div class="book-list">
        <h3>Book List</h3>
        <ul>
          <li v-for="book in books" :key="book.id">
            <div>
              <strong>{{ book.title }}</strong> by {{ book.author }}
              <br />
              ISBN: {{ book.ISBN }} | Available: {{ book.quantityAvailable }}
            </div>
            <div class="actions">
              <button @click="handleBorrow(book.id)">Borrow</button>
              <button @click="handleReturn(book.id)">Return</button>
              <button @click="handleDelete(book.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import BookDAO from "../models/BookDAO";

export default {
  name: "Dashboard",
  data() {
    return {
      books: [],
      newBook: {
        title: "",
        author: "",
        ISBN: "",
        quantityAvailable: 0,
      },
    };
  },
  methods: {
    async fetchBooks() {
      try {
        this.books = await BookDAO.getAllBooks();
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    async handleAddBook() {
      try {
        await BookDAO.addBook(
          this.newBook.title,
          this.newBook.author,
          this.newBook.ISBN,
          this.newBook.quantityAvailable
        );
        // Clear the form after adding
        this.newBook.title = "";
        this.newBook.author = "";
        this.newBook.ISBN = "";
        this.newBook.quantityAvailable = 0;
        this.fetchBooks();
      } catch (error) {
        console.error("Error adding book:", error);
      }
    },
    async handleBorrow(bookId) {
      try {
        // Replace with the actual logged-in user's id as needed
        const userId = "exampleUserId"; 
        await BookDAO.borrowBook(bookId, userId);
        this.fetchBooks();
      } catch (error) {
        console.error("Error borrowing book:", error);
      }
    },
    async handleReturn(bookId) {
      try {
        await BookDAO.returnBook(bookId);
        this.fetchBooks();
      } catch (error) {
        console.error("Error returning book:", error);
      }
    },
    async handleDelete(bookId) {
      try {
        await BookDAO.deleteBook(bookId);
        this.fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.books {
  margin-top: 2rem;
}

.add-book,
.book-list {
  margin-bottom: 2rem;
}

.add-book form input {
  margin: 0.5rem;
}

.actions button {
  margin-right: 0.5rem;
}
</style>
