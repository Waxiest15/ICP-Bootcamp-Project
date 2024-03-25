import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Bienvenida from './Bienvenida';

const Libros = () => {
    const [libreriaCanister] = useCanister("otro_backend");
    const { principal } = useConnect();
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        obtenerLibros();
    }, []);

    const obtenerLibros = async () => {
        setLoading("Cargando...");
        try {
            const librosObtenidos = await libreriaCanister.obtenerLibros();
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
            {principal ? (
                <div className="row mt-5">
                    <div className="col">
                        {loading && <div className="alert alert-primary">{loading}</div>}
                        <div className="card">
                            <div className="card-header">Lista de libros</div>
                            <div className="card-body">
                                {libros.length===0 ? 
                                <div>
                                    <p>Ups! parece que aun no hay libros</p>
                                </div>    :
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
                                    {libros.map((libro) => (
                                        <tr key={libro.id}>
                                            <td>{libro.id}</td>
                                            <td>{libro.titulo}</td>
                                            <td>{libro.autores}</td>
                                            <td>{libro.editorial}</td>
                                            <td>{libro.isbn}</td>
                                            <td>{libro.añoPublicacion}</td>
                                            <td>{libro.genero}</td>
                                            <td>{libro.sinopsis}</td>
                                            <td>{libro.precio}</td>
                                            <td>{libro.cantidadDisponible}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => eliminarLibro(libro.id)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Bienvenida />
            )}
        </>
    );
};

export default Libros;
