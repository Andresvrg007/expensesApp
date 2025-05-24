import { Header } from '../components/Header';
import  AddTransaction  from '../components/AddTransaction';

export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Grid de dos columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna izquierda - Formulario */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Add Transaction
                            <AddTransaction/>
                        </h2>
                        {/* Aquí irá el formulario */}
                    </div>

                    {/* Columna derecha - Gráfico */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Resumen Financiero
                        </h2>
                        {/* Aquí irá el gráfico */}
                    </div>
                </div>

                {/* Sección de filtros y lista de transacciones */}
                <div className="mt-6 bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Historial de Transacciones
                    </h2>
                    {/* Aquí irán los filtros y la lista */}
                </div>
            </main>
        </div>
    );
};


