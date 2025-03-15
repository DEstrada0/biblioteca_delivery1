import { db } from "../services/firebase";
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";

const UserDAO = {

  async registerUser(email, password, name, id) {
    try {
      const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
      const userId = userCredential.user.uid;
      
      await setDoc(doc(db, "users", userId), {
        name,
        email,
        id,
        borrowedBooks: [],
      });
      
      console.log("User successfully registered!");
      return userCredential.user;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.error("This email is already registered. Please log in or use a different email.");
      } else {
        console.error("Error registering user:", error);
      }
      throw error;
    }
  },
    
      async loginUser(email, password) {
        try {
          const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
          const userId = userCredential.user.uid;
    
          // Fetch user data from Firestore
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            throw new Error("User data not found in database.");
          }
    
          return { id: userId, ...userSnap.data() };
        } catch (error) {
          console.error("Error logging in:", error);
          throw error;
        }
      },
    


  async findUserById(userId) {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      return userSnap.exists() ? userSnap.data() : null;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },


  async getAllUsers() {
    try {
      const users = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },


  async updateUser(userId, updatedData) {
    try {
      await updateDoc(doc(db, "users", userId), updatedData);
      console.log("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
};

export default UserDAO;
