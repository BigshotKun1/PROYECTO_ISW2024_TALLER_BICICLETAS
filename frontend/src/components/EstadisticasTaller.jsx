/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { obtenerEstadisticas } from '@services/estadisticas.service';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import '@styles/EstadisticasTaller.css';

const EstadisticasTaller = () => {
    const [estadisticas, setEstadisticas] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchEstadisticas = async () => {
            try {
                const token = localStorage.getItem('token'); 
                console.log('Token:', token);

                const data = await obtenerEstadisticas();
                console.log('Datos de estadísticas:', data);
                setEstadisticas(data);
            } catch (error) {
                console.error('Error al obtener las estadísticas:', error);
                setError('Error al obtener las estadísticas');
            }
        };

        fetchEstadisticas();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!estadisticas) {
        return <div>Cargando...</div>;
    }

    const data = {
        labels: ['Total Pendientes', 'Total Completadas'],
        datasets: [
            {
                type: 'bar',
                label: '',
                data: [
                    estadisticas.totalPendientes,
                    estadisticas.totalCompletadas
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            },
            {
                type: 'line',
                label: 'Tiempo Promedio de Reparación',
                data: [
                    estadisticas.tiempoPromedio, // Suponiendo que este dato esté disponible
                    estadisticas.tiempoPromedio, // Repite el valor para cada punto de datos
                ],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                yAxisID: 'y1'
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    filter: function(legendItem, chartData) {
                            return legendItem.text === 'Tiempo Promedio de Reparación';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1, // Asegura que los valores sean enteros
                    callback: function(value) {
                        if (Number.isInteger(value)) {
                            return value;
                        }
                    }
                }
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                ticks: {
                    callback: function(value) {
                        return value.toFixed(1); // Formatea los valores a dos decimales
                    }
                }
            }
        }
    };

    // Formatea el tiempo promedio de reparación a dos decimales
    const tiempoPromedioFormateado = estadisticas.tiempoPromedio.toFixed(2);

    return (
        <div className="estadisticas-container">
            <div className="estadisticas-content">
                <div className="estadisticas-text">
                    <h1>Estadísticas del Taller</h1>
                    <p>Total de Reparaciones: {estadisticas.totalReparaciones}</p>
                    <p>Total de Reparaciones Pendientes: {estadisticas.totalPendientes}</p>
                    <p>Total de Reparaciones Completadas: {estadisticas.totalCompletadas}</p>
                    <p>Tiempo Promedio de Reparación: {tiempoPromedioFormateado} horas</p>
                </div>
                <div className="estadisticas-grafico">
                    <Chart type='bar' data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default EstadisticasTaller;