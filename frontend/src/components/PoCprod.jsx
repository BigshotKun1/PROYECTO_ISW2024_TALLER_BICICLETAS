import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PoCprod({ show, setShow, action, }) {
    // Obtener los datos del producto seleccionado
    const defaultProductData = {
        nombre: "Nuevo Producto",
        precio: 0,
        cantidad: 0,
        idM: "",
        idC: "",
        descuento: 0,
        idE: "",
    };

    const handleSubmit = (formData) => {
        action(formData); // Ejecuta la acción para crear el producto
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Cerrar" />
                        </button>
                        <Form
                            title="Crear Producto"
                            fields={[
                                {
                                    label: "Nombre del producto",
                                    name: "nombre",
                                    defaultValue: defaultProductData.nombre,
                                    placeholder: "Escribe el nombre del producto",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    maxLength: 100,
                                },
                                {
                                    label: "Precio",
                                    name: "precio",
                                    defaultValue: defaultProductData.precio,
                                    placeholder: "0",
                                    fieldType: "input",
                                    type: "number",
                                    required: true,
                                    min: 0,
                                },
                                {
                                    label: "Cantidad",
                                    name: "cantidad",
                                    defaultValue: defaultProductData.cantidad,
                                    placeholder: "0",
                                    fieldType: "input",
                                    type: "number",
                                    required: true,
                                    min: 0,
                                },
                                {
                                    label: "Marca",
                                    name: "idM",
                                    defaultValue: defaultProductData.idM,
                                    placeholder: "Escribe la marca del producto",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    label: "Categoría",
                                    name: "idC",
                                    defaultValue: defaultProductData.idC,
                                    placeholder: "Escribe la categoría del producto",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    label: "Descuento (%)",
                                    name: "descuento",
                                    defaultValue: defaultProductData.descuento,
                                    placeholder: "0",
                                    fieldType: "input",
                                    type: "number",
                                    min: 0,
                                },
                                {
                                    label: "Estado",
                                    name: "idE",
                                    defaultValue: defaultProductData.idE,
                                    placeholder: "Escribe el estado del producto",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    label: "Fecha de creación",
                                    name: "createdAt",
                                    defaultValue: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
                                    placeholder: "Fecha de creación",
                                    fieldType: "input",
                                    type: "text",
                                    readOnly: true, // Campo solo lectura
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Crear Producto"
                            backgroundColor="#fff"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}