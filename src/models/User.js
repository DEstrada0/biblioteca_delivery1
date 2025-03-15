class User {
    constructor(nombre, id, correo, telefono) {
      this.nombre = nombre;
      this.id = id;
      this.correo = correo;
      this.telefono = telefono;
      this.borrowedBooks = [];
    }
  }
  
  export default User;
  