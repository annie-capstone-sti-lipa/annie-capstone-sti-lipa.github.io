import { useSelector } from "react-redux";
import "./body.scss";

export default function Body() {
  const selected = useSelector((state: any) => state.tabnav.selected);

  return <div id="body">{selected}</div>;
}
