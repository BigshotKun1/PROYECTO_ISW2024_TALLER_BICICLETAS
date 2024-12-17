import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '@styles/Formulario.css';

const FormA = ({ title, clients, onSubmit, buttonText }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [selectedClient, setSelectedClient] = useState('');
    const [bikes, setBikes] = useState([]);
    
    // Simulación de bicicletas de clientes (esto puede venir de una API)
    const clientBikes = {
        'cliente1': [{ id: 'bici1', name: 'Bicicleta 1' }, { id: 'bici2', name: 'Bicicleta 2' }],
        'cliente2': [{ id: 'bici3', name: 'Bicicleta 3' }, { id: 'bici4', name: 'Bicicleta 4' }]
    };

    const handleClientChange = (event) => {
        const clientId = event.target.value;
        setSelectedClient(clientId);
        setBikes(clientBikes[clientId] || []);
        setValue('bike', '');  // Resetea la selección de la bicicleta cuando el cliente cambia
    };

    const onFormSubmit = (data) => {
        console.log("Datos enviados", data);
        onSubmit(data);  // Pasar los datos al formulario padre
    };

    return (
        <form className="form" onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
            <h1>{title}</h1>

            {/* Selección de Cliente */}
            <div className="container_inputs">
                <label htmlFor="client">Seleccionar Cliente</label>
                <select
                    id="client"
                    {...register('client', { required: 'Este campo es obligatorio' })}
                    onChange={handleClientChange}
                >
                    <option value="">Seleccionar Cliente</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
                <div className={`error-message ${errors.client ? 'visible' : ''}`}>
                    {errors.client?.message}
                </div>
            </div>

            {/* Selección de Bicicleta */}
            {selectedClient && (
                <div className="container_inputs">
                    <label htmlFor="bike">Seleccionar Bicicleta</label>
                    <select
                        id="bike"
                        {...register('bike', { required: 'Este campo es obligatorio' })}
                    >
                        <option value="">Seleccionar Bicicleta</option>
                        {bikes.map((bike) => (
                            <option key={bike.id} value={bike.id}>
                                {bike.name}
                            </option>
                        ))}
                    </select>
                    <div className={`error-message ${errors.bike ? 'visible' : ''}`}>
                        {errors.bike?.message}
                    </div>
                </div>
            )}

            {/* Motivo de Reparación */}
            <div className="container_inputs">
                <label htmlFor="repairReason">Motivo de Reparación</label>
                <textarea
                    id="repairReason"
                    {...register('repairReason', { required: 'Este campo es obligatorio' })}
                    placeholder="Escribe el motivo de la reparación"
                />
                <div className={`error-message ${errors.repairReason ? 'visible' : ''}`}>
                    {errors.repairReason?.message}
                </div>
            </div>

            {/* Botón de Envío */}
            {buttonText && <button type="submit">{buttonText}</button>}
        </form>
    );
};

export default FormA;
