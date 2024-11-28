import React, { useState } from 'react';

function Clientes() {
    const [rut, setRut] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleRutChange = (e) => {
        const newRut = e.target.value;
        setRut(newRut);
        setIsValid(validarRut(newRut));
    };

    return (
        <form>
            <label>
                RUT:
                <input
                    type="text"
                    value={rut}
                    onChange={handleRutChange}
                    pattern="^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$"
                    title="Formato: XX.XXX.XXX-X"
                />
            </label>
            {!isValid && <span className="error">RUT inválido</span>}
            {/* Otros campos del formulario */}
        </form>
    );
}

function validarRut(rutCompleto) {
    if (!/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/.test(rutCompleto)) {
        return false; // Formato inválido
    }

    const rut = rutCompleto.replace(/\./g, '').replace('-', '');
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * rut.charAt(i);
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dvCalculado === dv;
}

export default Clientes;