/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EstadisticasTaller = () => {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('Renderizando EstadisticasTaller 1');
  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await axios.get("/api/estadisticas", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEstadisticas(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);
  console.log('Renderizando EstadisticasTaller 2');
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const data = {
    labels: ["Total Reparaciones", "Pendientes", "Completadas"],
    datasets: [
      {
        label: "Reparaciones",
        data: [estadisticas.totalReparaciones, estadisticas.totalPendientes, estadisticas.totalCompletadas],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Estadísticas del Taller",
      },
    },
  };

  return (
    <div>
      <h1>Estadísticas del Taller</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EstadisticasTaller;