import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AsanaDashboardWithReports = () => {
  const [activeTab, setActiveTab] = useState("tareas");

  const tareas = [
    { id: 1, nombre: "Revisión de contratos", prioridad: "Alta", estado: "En progreso", responsable: "María" },
    { id: 2, nombre: "Informe de ventas", prioridad: "Media", estado: "Completada", responsable: "Luis" },
    { id: 3, nombre: "Actualizar precios", prioridad: "Alta", estado: "Pendiente", responsable: "Carla" },
  ];

  const dataGrafico = [
    { estado: "Pendiente", cantidad: 1 },
    { estado: "En progreso", cantidad: 1 },
    { estado: "Completada", cantidad: 1 },
  ];

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tareas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tareas");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "tareas.xlsx");
  };

  const exportarPDF = () => {
    const contenido = tareas.map(
      (t) => `${t.nombre} — Prioridad: ${t.prioridad} — Estado: ${t.estado}`
    ).join("\n");
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "reporte_tareas.txt");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Seguimiento de Tareas</h1>

      <div className="flex space-x-4 mb-4">
        <button
          className={\`px-4 py-2 rounded-xl \${activeTab === "tareas" ? "bg-blue-600 text-white" : "bg-gray-200"}\`}
          onClick={() => setActiveTab("tareas")}
        >
          Tareas
        </button>
        <button
          className={\`px-4 py-2 rounded-xl \${activeTab === "reportes" ? "bg-blue-600 text-white" : "bg-gray-200"}\`}
          onClick={() => setActiveTab("reportes")}
        >
          Reportes
        </button>
      </div>

      {activeTab === "tareas" && (
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b font-semibold text-left">
                <th className="py-2">Tarea</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Responsable</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{t.nombre}</td>
                  <td>{t.prioridad}</td>
                  <td>{t.estado}</td>
                  <td>{t.responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "reportes" && (
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Reporte de estados</h2>
            <div className="relative">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                Exportar ▾
              </button>
              <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-md">
                <button
                  onClick={exportarPDF}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Exportar a PDF
                </button>
                <button
                  onClick={exportarExcel}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Exportar a Excel
                </button>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataGrafico}>
              <XAxis dataKey="estado" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AsanaDashboardWithReports;