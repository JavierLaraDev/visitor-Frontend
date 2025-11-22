export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-[#D59D31] border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-3 bg-[#1B473A] rounded-full flex items-center justify-center">
          <span className="text-[#D59D31] font-bold text-xl">B</span>
        </div>
      </div>
      <p className="mt-6 text-[#1B473A] font-bold text-lg">Briz System</p>
      <p className="text-gray-500 text-sm mt-1">
        Cargando panel administrativo...
      </p>
    </div>
  );
}
