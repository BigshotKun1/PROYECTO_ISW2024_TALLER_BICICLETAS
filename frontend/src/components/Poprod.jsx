import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function Poprod({ show, setShow, data, action }) {
    // Obtener los datos del producto seleccionado
    const productData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData); // Ejecuta la acción para actualizar el producto
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Cerrar" />
                        </button>
                        <Form
                            title="Editar Producto"
                            fields={[
                                {
                                    label: "Nombre del producto",
                                    name: "nombre",
                                    defaultValue: productData.nombre || "",
                                    placeholder: productData.nombre || "Nombre actual",
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    maxLength: 100,
                                },
                                {
                                    label: "Precio",
                                    name: "precio",
                                    defaultValue: productData.precio || "",
                                    placeholder: productData.precio?.toString() || "Precio actual",
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    min: 0,
                                },
                                {
                                    label: "Cantidad",
                                    name: "cantidad",
                                    defaultValue: productData.cantidad || "",
                                    placeholder: productData.cantidad?.toString() || "Cantidad actual",
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    min: 0,
                                },
                                {
                                    label: "Marca",
                                    name: "idM",
                                    defaultValue: productData.idM || "",
                                    placeholder: productData.idM || "Marca actual",
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                },
                                {
                                    label: "Categoría",
                                    name: "idC",
                                    defaultValue: productData.idC || "",
                                    placeholder: productData.idC || "Categoría actual",
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                },
                                {
                                    label: "Descuento (%)",
                                    name: "descuento",
                                    defaultValue: productData.descuento || "",
                                    placeholder: productData.descuento?.toString() || "Descuento actual",
                                    fieldType: 'input',
                                    type: "number",
                                },
                                {
                                    label: "Estado",
                                    name: "idE",
                                    defaultValue: productData.idE || "",
                                    placeholder: productData.idE || "Estado actual",
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                },
                                {
                                    label: "Fecha de creación",
                                    name: "createdAt",
                                    defaultValue: productData.createdAt || "",
                                    placeholder: productData.createdAt || "Fecha actual",
                                    fieldType: 'input',
                                    type: "text",
                                    readOnly: true, // No editable
                                }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Actualizar Producto"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}