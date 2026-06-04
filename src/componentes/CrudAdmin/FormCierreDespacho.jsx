import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormCierreDespacho = ({ despacho, onClose }) => {
  // Inicializamos react-hook-form
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log("onSubmit ejecutado");
    
    // 🌟 ARREGLO PRINCIPAL: Reconstruimos el objeto completo para que Hibernate
    // NO sobreescriba los campos existentes con valores 'null' en la base de datos.
    const jsonData = {
      idDespacho: despacho.idDespacho,
      fechaDespacho: despacho.fechaDespacho,
      patenteCamion: despacho.patenteCamion,
      idCompra: despacho.idCompra,
      direccionCompra: despacho.direccionCompra,
      valorCompra: despacho.valorCompra,
      // Convertimos el string del input a un número entero real
      intento: parseInt(data.intento, 10),
      // Convertimos el string del select a un booleano real
      despachado: data.despachado === "true",
      // Enviamos también 'entregado' por si tu backend mapea la base de datos con este nombre
      entregado: data.despachado === "true"
    };

    console.log("Datos seguros a enviar al Backend:", jsonData);

    try {
      // 🌟 URL CORREGIDA: Cambiamos la IP de red local por la ruta relativa limpia
      // para que Nginx la procese de forma segura en AWS
      await axios.put(
        `/api/v1/despachos/${despacho.idDespacho}`,
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      Swal.fire({
        title: "Despacho modificado 🛻!",
        text: "El despacho ha sido modificado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "¡Error!",
        text: "No se pudo actualizar el despacho en el servidor",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
    // Cierra el modal y refresca la tabla
    onClose();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center text-center px-24 text-xl"
      >
        <div className="mx-auto text-3xl font-bold mb-10 text-teal-600">
          Editar y cierre de despacho
        </div>
        
        <div className="mb-5">
          <label className="block font-bold mb-2">ID despacho</label>
          <input
            disabled={true}
            type="text"
            className="border border-gray-300 rounded-lg block w-full p-1 text-slate-400 bg-gray-50"
            value={despacho.idDespacho}
          />
        </div>

        <div className="mb-5">
          <label className="block font-bold mb-2">Fecha despacho</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1 bg-gray-50"
            value={despacho.fechaDespacho || "Sin fecha asignada"}
            disabled={true}
          />
        </div>

        <div className="mb-5">
          <label className="block font-bold mb-2">Patente Camión</label>
          <input
            type="text"
            disabled={true}
            value={despacho.patenteCamion || "Sin patente"}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1 bg-gray-50"
          />
        </div>

        <div className="mb-5">
          <label className="block font-bold mb-2">Intentos de entrega</label>
          <input
            type="number"
            defaultValue={despacho.intento}
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("intento", { required: true })}
          />
        </div>

        <div className="mb-5">
          <label className="block font-bold mb-2">Despacho entregado</label>
          <select
            defaultValue={despacho.despachado || despacho.entregado || false}
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("despachado", { required: true })}
          >
            <option value="false">Despacho abierto / Pendiente</option>
            <option value="true">Cerrar despacho / Entregado</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block font-bold mb-2">ID Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1 bg-gray-50"
            disabled={true}
            value={despacho.idCompra || ""}
          />
        </div>

        <div className="mb-5">
          <label className="block font-bold mb-2">Dirección Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1 bg-gray-50"
            disabled={true}
            value={despacho.direccionCompra || ""}
          />
        </div>

        <div className="mb-5">
          <label className="block font-bold mb-2">Valor Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1 bg-gray-50"
            disabled={true}
            value={despacho.valorCompra || ""}
          />
        </div>

        <button
          className="py-6 px-14 rounded-lg bg-teal-600 text-white font-bold mb-14 hover:bg-teal-700 transition-colors"
          type="submit"
        >
          Modificar Despacho
        </button>
      </form>
    </>
  );
};