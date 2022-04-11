import { useSelector } from "react-redux";
import "./App.scss";
import Body from "./components/body/body";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import tabnavItem from "./types/enums/tabnavItem";

function App() {
  const selected = useSelector((state: any) => state.tabnav.selected);

  const noPadding = selected === tabnavItem.calendar;

  return (
    <div id="app">
      <Header />
      <Body noPadding={noPadding} />
      <Footer />
    </div>
  );
}

export default App;
