import "./tabnav.scss";

export default function Tabnav() {
  return (
    <div className="container">
      <div className="tabnav">
        <TabnavItem name="Sauce Finder" />
        <TabnavItem name="Calendar" />
        <TabnavItem name="Recommendations" />
        <TabnavItem name="Quiz" />
        <TabnavItem name="Code Vault" />
      </div>
    </div>
  );
}

function TabnavItem({ name }: { name: string }) {
  return <div className="tabnav-item">{name}</div>;
}
