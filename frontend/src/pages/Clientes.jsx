import { useNavigate } from "react-router-dom";
import { createCliente } from "@services/cliente.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import Form from "@components/Form";
import { useState } from "react";
import { Link } from "react-router-dom";

const CrearCliente = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [newCliente, setNewCliente] = useState({
        rut: "",
        nombreCompleto: "",
        telefono: "",
    });

    const handleInputChange = (name, value) => {
        setNewCliente((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (data) => {
        console.log(data); // Verifica que los datos sean los esperados
        console.log(newCliente); // Verifica que los datos sean los esperados
        try {
            const response = await createCliente(newCliente);
            if (response.status === "Success") {
                showSuccessAlert("¡Cliente creado!", "Cliente creado exitosamente.");
                setTimeout(() => {
                    navigate("/cliente/all");
                }, 3000);
            } else {
                throw new Error(response.details || "Error desconocido");
            }
        } catch (error) {
            console.error("Error al crear el cliente:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Error desconocido.");
            showErrorAlert("Error", error.response?.data?.message || "Ocurrió un error al crear el cliente.");
        }
    };

    return (
        <main className="container">
            <Form
                title="Registrar Cliente"
                fields={[
                    {
                        label: "Nombre",
                        name: "nombreCompleto",
                        placeholder: "Juan Pérez",
                        fieldType: "input",
                        type: "text",
                        required: true,
                        onChange: (e) => handleInputChange('nombreCompleto', e.target.value),
                        value: newCliente.nombreCompleto,
                    },
                    {
                        

                        label: "RUT",
                        name: "rut",
                        placeholder: "12.345.678-9",
                        fieldType: "input",
                        type: "text",
                        required: true,
                        pattern: /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/,
                        patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                        onChange: (e) => handleInputChange('rut', e.target.value)

                    },
                    {
                        label: "Teléfono",
                        name: "telefono",
                        placeholder: "+56912345678",
                        fieldType: "input",
                        type: "text",
                        required: true,
                        onChange: (e) => handleInputChange('telefono', e.target.value),
                        value: newCliente.telefono,
                    },
                ]}
                buttonText="Registrar Cliente"
                onSubmit={handleSubmit}
                footerContent={
                    <p>
                        ¿Ya tienes cliente registrado?, <Link to="/cliente/all">¡Ver clientes!</Link>
                    </p>
                }
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
        </main>
    );
};

export default CrearCliente;