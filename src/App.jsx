import Footer from "./components/Footer";
import Game from "./components/Game";
import Navbar from "./components/Navbar";

import "animate.css";

function App() {
  return (
    <>
      <Navbar />
      <h1>Jogo da Memória</h1>
      <Game />
      <Footer />
    </>
  );
}

export default App;
