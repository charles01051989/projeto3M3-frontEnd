import PaletaLista from "components/PaletaLista/PaletaLista";
import Navbar from "components/Navbar/Navbar";
import "./Home.css";


function Home() {
  return (
    <div className="Home">
      <Navbar />
       <div className="Home__container">
        <PaletaLista />
      </div>
    </div>
  );
}

export default Home;
