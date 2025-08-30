import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Página no encontrada</p>
        <Link 
          href="/"
          className="bg-primary-wine text-white px-6 py-3 rounded-lg hover:bg-wine-600 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}