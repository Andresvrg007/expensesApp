import { useState } from "react";
// Puedes instalar Heroicons con: npm install @heroicons/react
import { ArrowDownCircleIcon, ArrowUpCircleIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const expenseCategories = ["Food", "Transport", "Entertainment", "Health", "Other"];
const incomeCategories = ["Salary", "Freelance", "Gift", "Other"];

export const AddTransaction = () => {
    const [tipo, setTipo] = useState("gasto");
    const [categoria, setCategoria] = useState("");
    const [monto, setMonto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [sueldo, setSueldo] = useState("");
    const [sueldoGuardado, setSueldoGuardado] = useState(false);
    const [mensajeSueldo, setMensajeSueldo] = useState("");

    const handleGuardarSueldo = async () => {
        if (!sueldo || Number(sueldo) <= 0) {
            setMensajeSueldo("Sueldo inválido");
            return;
        }
        try {
            const response = await fetch('/api/sueldo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sueldo }),
                credentials: 'include',
            });
            const res = await response.json();
            if (!response.ok) {
                setMensajeSueldo(res.error || "Error al guardar sueldo");
                return;
            }
            setMensajeSueldo(res.message || "¡Sueldo guardado exitosamente!");
            setSueldoGuardado(true);
        } catch (error) {
            setMensajeSueldo("Error de conexión con el servidor");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
            {/* Salary message */}
            {mensajeSueldo && (
                <div
                    className={`mb-4 px-4 py-2 rounded text-center font-semibold ${
                        mensajeSueldo.includes('exitosamente')
                            ? 'bg-green-100 text-green-700 border border-green-400'
                            : 'bg-red-100 text-red-700 border border-red-400'
                    }`}
                >
                    {mensajeSueldo.includes('exitosamente') ? 'Salary saved successfully!' : mensajeSueldo === 'Sueldo inválido' ? 'Invalid salary' : mensajeSueldo}
                </div>
            )}

            {/* Salary section */}
            <div className="mb-6 flex items-center gap-2">
                <CurrencyDollarIcon className="h-6 w-6 text-indigo-500" />
                <input
                    type="number"
                    placeholder="Your monthly salary"
                    className="border rounded px-3 py-1 w-40"
                    value={sueldo}
                    onChange={e => setSueldo(e.target.value)}
                    disabled={sueldoGuardado}
                />
                <button
                    className={`ml-2 px-3 py-1 rounded font-semibold transition cursor-pointer
                        ${sueldoGuardado
                            ? 'bg-indigo-300 text-white'
                            : 'bg-indigo-600 text-white hover:bg-indigo-500'}
                    `}
                    type="button"
                    onClick={handleGuardarSueldo}
                    disabled={sueldoGuardado}
                >
                    Save salary
                </button>
            </div>

            {/* Add transaction form */}
            <form>
                <div className="flex items-center gap-4 mb-4">
                    <button
                        type="button"
                        className={`flex items-center gap-1 px-3 py-1 rounded transition cursor-pointer
                            ${tipo === "gasto"
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"}
                        `}
                        onClick={() => setTipo("gasto")}
                    >
                        <ArrowDownCircleIcon className="h-5 w-5" /> Expense
                    </button>
                    <button
                        type="button"
                        className={`flex items-center gap-1 px-3 py-1 rounded transition cursor-pointer
                            ${tipo === "ingreso"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-600"}
                        `}
                        onClick={() => setTipo("ingreso")}
                    >
                        <ArrowUpCircleIcon className="h-5 w-5" /> Income
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Amount"
                        className="border rounded px-3 py-2 w-full"
                        value={monto}
                        onChange={e => setMonto(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Description"
                        className="border rounded px-3 py-2 w-full"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <select
                        className="border rounded px-3 py-2 w-full"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {(tipo === "gasto" ? expenseCategories : incomeCategories).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    className={`w-full py-2 rounded font-semibold transition cursor-pointer
                        bg-indigo-600 text-white hover:bg-indigo-500
                    `}
                >
                    Add transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransaction; 