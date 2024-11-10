function CityNotFound() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center text-center p-6 max-w-md mx-auto mt-10 text-white">
      <img src="404.png" alt="Ícone de erro - Localidade não encontrada" className="w-[80%] opacity-80" />
      <p className="text-2xl font-semibold mb-2">Localidade não encontrada</p>
      <p className="text-sm mb-4 text-gray-300">
        Verifique o nome da cidade ou tente novamente.
      </p>
      <button
        onClick={handleReload}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
      >
        Tentar Novamente
      </button>
    </div>
  );
}

export default CityNotFound;
