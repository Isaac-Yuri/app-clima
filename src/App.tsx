import Weather from "./components/Weather";
import Header from "./components/NavBar";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <header className="absolute top-0 w-100">
        <Header />
      </header>

      <main className="min-h-150 md:min-h-0">
        <Weather />
      </main>
    </div>
  );
}

export default App;
