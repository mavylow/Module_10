import "./style.css";

interface ICheckbox {
  id: string;
  description: string;
  onToggle: () => void;
}

function Checkbox({ id, description, onToggle }: ICheckbox) {
  return (
    <>
      <input onClick={onToggle} type="checkbox" className="toggle" id={id} />
      <label htmlFor={id}> {description} </label>
    </>
  );
}

export default Checkbox;
