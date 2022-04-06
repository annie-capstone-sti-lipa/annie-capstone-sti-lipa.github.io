import { useDispatch } from "react-redux";
import { select } from "../../../redux/reducers/tabnav-item-reducer";
import tabnavItem from "../../../types/enums/tabnavItem";
import "./tabnav.scss";

export default function Tabnav() {
  return (
    <div className="container">
      <div className="tabnav">
        {Object.keys(tabnavItem).map((key, index) => (
          <TabnavItem
            name={Object.values(tabnavItem)[index]}
            key={key + index}
          />
        ))}
      </div>
    </div>
  );
}

function TabnavItem({ name }: { name: string }) {
  const dispatch = useDispatch();
  return (
    <div className="tabnav-item" onClick={() => dispatch(select(name))}>
      {name}
    </div>
  );
}
