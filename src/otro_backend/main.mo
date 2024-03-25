import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

actor Libros {
  type Libro = {
    ID: Text;
    Titulo: Text;
    Autores: Text;
    Editorial: Text;
    ISBN: Text;
    Ano_de_publicacion: Text;
    Genero: Text;
    Sinopsis: Text;
    Precio: Nat32;
    Cantidad_disponible: Nat32;
    Imagen_de_portada: Text;
  };

  type LibroID = Nat32;
  stable var libroID: LibroID = 0;

  let listaLibros = HashMap.HashMap<Text, Libro>(0, Text.equal, Text.hash);

  private func generaLibroID() : Text {
    libroID += 1;
    return Nat32.toText(libroID);
  };

  public shared(msg) func crearLibro(
    titulo: Text,
    autores: Text,
    editorial: Text,
    isbn: Text,
    anoDePublicacion: Text,
    genero: Text,
    sinopsis: Text,
    precio: Nat32,
    cantidadDisponible: Nat32,
    imagenDePortada: Text,
  ) : async () {
    let libro = {
      ID = generaLibroID();
      Titulo = titulo;
      Autores = autores;
      Editorial = editorial;
      ISBN = isbn;
      Ano_de_publicacion = anoDePublicacion;
      Genero = genero;
      Sinopsis = sinopsis;
      Precio = precio;
      Cantidad_disponible = cantidadDisponible;
      Imagen_de_portada = imagenDePortada;
    };

    listaLibros.put(libro.ID, libro);
    Debug.print("Nuevo libro creado ID: " # libro.ID);
    return ();
  };

  public query func obtenerLibros() : async [(Text, Libro)] {
    let libroIter : Iter.Iter<(Text, Libro)> = listaLibros.entries();
    let libroArray : [(Text, Libro)] = Iter.toArray(libroIter);
    Debug.print("Libros ");
    return libroArray;
  };

  public query func obtenerLibro(id: Text) : async ?Libro {
    let libro: ?Libro = listaLibros.get(id);
    return libro;
  };

  public shared(msg) func actualizarLibro(
    id: Text,
    titulo: Text,
    autores: Text,
    editorial: Text,
    isbn: Text,
    anoDePublicacion: Text,
    genero: Text,
    sinopsis: Text,
    precio: Nat32,
    cantidadDisponible: Nat32,
    imagenDePortada: Text,
  ) : async Bool {
    let libro: ?Libro = listaLibros.get(id);

    switch (libro) {
      case (null) {
        return false;
      };
      case (?libroActual) {
        let nuevoLibro: Libro = {
          ID = id;
          Titulo = titulo;
          Autores = autores;
          Editorial = editorial;
          ISBN = isbn;
          Ano_de_publicacion = anoDePublicacion;
          Genero = genero;
          Sinopsis = sinopsis;
          Precio = precio;
          Cantidad_disponible = cantidadDisponible;
          Imagen_de_portada = imagenDePortada;
        };
        listaLibros.put(id, nuevoLibro);
        Debug.print("Libro actualizado: " # id);
        return true;
      };
    };
  };

  public func eliminarLibro(id: Text) : async Bool {
    let libro: ?Libro = listaLibros.get(id);

    switch (libro) {
      case (null) {
        return false;
      };
      case (_) {
        ignore listaLibros.remove(id);
        Debug.print("Libro eliminado: " # id);
        return true;
      };
    };
  };
};
