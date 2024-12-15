import React from "react";
import { PieChart } from "./charts/PieChart";
import { BarChart } from "./charts/BarChart";

// Mock data - Replace with real data from your backend
const mockData = {
  platosVendidos: {
    labels: ["Arroz Chaufa", "Tallarín Saltado", "Pollo a la Parrilla"],
    values: [300, 200, 100],
  },
  categorias: {
    labels: ["Arroces", "Pollo", "Criollos"],
    values: [400, 300, 200],
  },
  mesas: {
    labels: ["Mesa 1", "Mesa 2", "Mesa 3"],
    values: [500, 400, 300],
  },
  ventasPorMes: {
    labels: ["Octubre", "Noviembre", "Diciembre"],
    values: [1500, 2000, 1800],
  },
};

export function Dashboard() {
  return (
    <main className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <PieChart data={mockData.platosVendidos} title="Platos más vendidos" />
        <PieChart data={mockData.categorias} title="Categorías más vendidas" />
        <PieChart data={mockData.mesas} title="Mesas más usadas" />
      </div>
      <BarChart data={mockData.ventasPorMes} title="Ventas por mes" />
    </main>
  );
}
