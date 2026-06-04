import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const despacho = async () => {
    try {
      // 🌟 URL CORREGIDA: Cambiamos la IP local fija por la ruta relativa del Proxy de Nginx
      const response = await axios.get("/api/v1/despachos", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log("Datos de despachos recibidos:", response.data);
      setDespachos(response.data);
    } catch (error) {
      console.error("Error al obtener los despachos:", error);
    }
  };

  // Llamada a la función para obtener los datos cuando el componente se monta
  useEffect(() => {
    despacho();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <table className="table-fixed w-full">
              <thead>
                <tr className="py-10 border-b border-gray-100">
                  <th className="pr-10 py-3">Orden de despacho</th>
                  <th className="pr-10 py-3">Orden de compra</th>
                  <th className="pr-10 py-3">Dirección de entrega</th>
                  <th className="pr-10 py-3">Fecha despacho</th>
                  <th className="pr-10 py-3">Patente Camión</th>
                  <th className="pr-10 py-3">Entregado</th>
                  <th className="pr-10 py-3">Intentos de entrega</th>
                  <th className="py-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {despachos.map((despacho) => (
                  <tr key={despacho.idDespacho} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="pr-10 py-6 items-center font-semibold text-slate-700">
                      {despacho.idDespacho}
                    </td>
                    <td className="pr-10 py-6 items-center">
                      {despacho.idCompra || "—"}
                    </td>
                    <td className="pr-10 py-6 items-center text-sm max-w-[200px] truncate">
                      {despacho.direccionCompra || "—"}
                    </td>
                    <td className="pr-10 py-6 items-center">
                      {despacho.fechaDespacho || "—"}
                    </td>
                    <td className="pr-10 py-6 items-center">
                      {despacho.patenteCamion || "—"}
                    </td>
                    <td className="pr-10 py-6 items-center">
                      {/* 🌟 MEJORA: Validamos ambos campos de estado de forma segura */}
                      {despacho.entregado || despacho.despachado === true || despacho.despachado === "true"
                        ? <span className="text-emerald-600 font-bold">Despacho entregado</span>
                        : <span className="text-amber-600 font-bold">Despacho pendiente</span>
                      }
                    </td>
                    <td className="pr-10 py-6 items-center">
                      {despacho.intento !== null && despacho.intento !== undefined ? despacho.intento : 0}
                    </td>
                    <td>
                      <button
                        onClick={() => handleAbrirModal(despacho)}
                        className="py-1.5 bg-orange-200 px-6 rounded-xl shadow-sm font-medium text-orange-800 hover:bg-orange-300 transition-all duration-200"
                      >
                        Cerrar despacho
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      >
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              // 🌟 Sintaxis limpia para cerrar modal y refrescar la tabla al mismo tiempo
              setOpenModal(false);
              despacho();
            }}
          />
        )}
      </Modal>
    </>
  );
};