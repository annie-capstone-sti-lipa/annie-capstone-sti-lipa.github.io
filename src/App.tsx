import "./App.scss";
import Body from "./components/body/body";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Tabnav from "./components/tabnav/tabnav";

function App() {
  return (
    <div id="app">
      <Header />
      <Tabnav />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
