
import React from 'react';
import { useClientes } from '@hooks/clientes/useGetClientes';
import '@styles/cliente-table.css';

const ClientesTable = () => {
    const { clientes, loading, error } = useClientes();

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <table className="cliente-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Rut</th>
                    <th>Teléfono</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((cliente) => (
                    <tr key={cliente.rut}>
                        <td>{cliente.nombreCompleto}</td>
                        <td>{cliente.rut}</td>
                        <td>{cliente.telefono}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClientesTable;
