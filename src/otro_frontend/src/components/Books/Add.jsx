import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";

const Libros = () => {
    const [libreriaCanister] = useCanister("otro_backend");
    const [loading, setLoading] = useState("");

    const agregarLibro = async (e) => {
        e.preventDefault();
        const titulo = e.target.titulo.value;
        const autores = e.target.autores.value;
        const editorial = e.target.editorial.value;
        const isbn = e.target.isbn.value;
        const anoPublicacion = e.target.anoPublicacion.value;
        const genero = e.target.genero.value;
        const sinopsis = e.target.sinopsis.value;
        const precio = parseFloat(e.target.precio.value);
        const cantidadDisponible = parseInt(e.target.cantidadDisponible.value);
        const imagenPortada = e.target.imagenPortada.value;

        setLoading("Agregando libro...");

        // Llama al método en el canister para agregar el libro
        await libreriaCanister.crearLibro(
            titulo,
            autores,
            editorial,
            isbn,
            anoPublicacion,
            genero,
            sinopsis,
            precio,
            cantidadDisponible,
            imagenPortada
        );
        //await libreriaCanister.crearLibro(area);
        setLoading("");

    };

    return (
        <div className="row mt-5">
            <div className="col">
                {loading && <div className="alert alert-primary">{loading}</div>}
                <div className="card">
                    <div className="card-header">Agregar libro</div>
                    <div className="card-body">
                        <form className="form" onSubmit={agregarLibro}>
                            <div className="mb-3">
                                <label htmlFor="titulo" className="form-label">Título</label>
                                <input type="text" className="form-control" id="titulo" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="autores" className="form-label">Autor(es)</label>
                                <input type="text" className="form-control" id="autores" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editorial" className="form-label">Editorial</label>
                                <input type="text" className="form-control" id="editorial" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="isbn" className="form-label">ISBN</label>
                                <input type="text" className="form-control" id="isbn" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="anoPublicacion" className="form-label">Ano de publicación</label>
                                <input type="number" className="form-control" id="anoPublicacion" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="genero" className="form-label">Género</label>
                                <input type="text" className="form-control" id="genero" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sinopsis" className="form-label">Sinopsis</label>
                                <textarea className="form-control" id="sinopsis" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio" className="form-label">Precio</label>
                                <input type="number" className="form-control" id="precio" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cantidadDisponible" className="form-label">Cantidad disponible</label>
                                <input type="number" className="form-control" id="cantidadDisponible" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="imagenPortada" className="form-label">Imagen de portada</label>
                                <input type="url" className="form-control" id="imagenPortada" required />
                            </div>
                            <input type="submit" className="btn btn-success" value="Agregar libro" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Libros;
