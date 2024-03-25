import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Bienvenida from '../Bienvenida';

const Libros = () => {
    const [libreriaCanister] = useCanister("otro_backend");
    const { principal } = useConnect();
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState("");
    const librosMock = [
        {
            "id": 1,
            "titulo": "El señor de los anillos",
            "autores": "J.R.R. Tolkien",
            "editorial": "Minotauro",
            "isbn": "9788445072512",
            "añoPublicacion": 1954,
            "genero": "Fantasía",
            "sinopsis": "La historia sigue el viaje del joven hobbit Frodo Bolsón para destruir el Anillo Único y poner fin al señor oscuro Sauron.",
            "precio": 20,
            "cantidadDisponible": 50
        },
        {
            "id": 2,
            "titulo": "Cien años de soledad",
            "autores": "Gabriel García Márquez",
            "editorial": "Editorial Sudamericana",
            "isbn": "9788437604947",
            "añoPublicacion": 1967,
            "genero": "Realismo mágico",
            "sinopsis": "La novela narra la historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo.",
            "precio": 18,
            "cantidadDisponible": 30
        },
        {
            "id": 3,
            "titulo": "Harry Potter y la piedra filosofal",
            "autores": "J.K. Rowling",
            "editorial": "Bloomsbury Publishing",
            "isbn": "9780747532743",
            "añoPublicacion": 1997,
            "genero": "Fantasía",
            "sinopsis": "La novela sigue las aventuras del joven mago Harry Potter y sus amigos Hermione Granger y Ron Weasley.",
            "precio": 15,
            "cantidadDisponible": 40
        },
        {
            "id": 4,
            "titulo": "1984",
            "autores": "George Orwell",
            "editorial": "Secker & Warburg",
            "isbn": "9780451524935",
            "añoPublicacion": 1949,
            "genero": "Distopía",
            "sinopsis": "La novela presenta un mundo totalitario y vigilado, donde el gobierno controla todos los aspectos de la vida de sus ciudadanos.",
            "precio": 16,
            "cantidadDisponible": 25
        },
        {
            "id": 5,
            "titulo": "Orgullo y prejuicio",
            "autores": "Jane Austen",
            "editorial": "T. Egerton, Whitehall",
            "isbn": "9780141439518",
            "añoPublicacion": 1813,
            "genero": "Romance",
            "sinopsis": "La novela sigue las vidas de las hermanas Bennet y su búsqueda de amor y matrimonio en la Inglaterra del siglo XIX.",
            "precio": 12,
            "cantidadDisponible": 35
        }
    ]
        ;

    useEffect(() => {
        obtenerLibros();
    }, []);

    const obtenerLibros = async () => {
        setLoading("Cargando...");
        try {
            const librosObtenidos = await libreriaCanister.obtenerLibros();
            //const librosObtenidos = librosMock;
            setLibros(librosObtenidos);
            setLoading("");
        } catch (error) {
            console.error("Error al obtener libros:", error);
            setLoading("Error al obtener libros");
        }
    };

    const eliminarLibro = async (idLibro) => {
        setLoading("Eliminando libro...");
        try {
            await libreriaCanister.eliminarLibro(idLibro);
            obtenerLibros();
        } catch (error) {
            console.error("Error al eliminar libro:", error);
            setLoading("Error al eliminar libro");
        }
    };

    return (
        <>
            <div className="row mt-5">
                <div className="col">
                    {loading && <div className="alert alert-primary">{loading}</div>}
                    <div className="card">
                        <div className="card-header">Lista de libros</div>
                        <div className="card-body">
                            {libros.length === 0 ?
                                <div>
                                    <p>Ups! parece que aun no hay libros</p>
                                </div> :
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Título</th>
                                                <th>Autor(es)</th>
                                                <th>Editorial</th>
                                                <th>ISBN</th>
                                                <th>Año de publicación</th>
                                                <th>Género</th>
                                                <th>Sinopsis</th>
                                                <th>Precio</th>
                                                <th>Cantidad disponible</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {libros.map(libro => (
                                                <tr key={libro[0]}>
                                                    <td>{libro[0]}</td>
                                                    <td>{libro[1].Titulo}</td>
                                                    <td>{libro[1].Autores}</td>
                                                    <td>{libro[1].Editorial}</td>
                                                    <td>{libro[1].ISBN}</td>
                                                    <td>{libro[1].Ano_de_publicacion}</td>
                                                    <td>{libro[1].Genero}</td>
                                                    <td>{libro[1].Sinopsis}</td>
                                                    <td>{libro[1].Precio}</td>
                                                    <td>{libro[1].Cantidad_disponible}</td>
                                                    {/* <td>{libro[1].Imagen_de_portada}</td> */}
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => eliminarLibro(libro[0])}>
                                                            Eliminar
                                                        </button>
                                                        <button className="btn btn-primary" onClick={() => editarLibro(libro[0])}>
                                                            Editar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Libros;
