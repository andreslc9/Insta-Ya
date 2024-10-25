import Button from 'react-bootstrap/Button';
import './Createbutton.css'
import { useHistory } from "react-router-dom";

function Createbutton() {
  const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/crear-orden");
  };
  return (
    <>
        <div className='create'><Button variant="outline-primary" onClick={handleRoute}><div className='textbt'>Crear orden</div></Button>{' '}</div>
    </>
  );
}

export default Createbutton;