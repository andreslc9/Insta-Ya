import Table from 'react-bootstrap/Table';
import './Orderlist.css'
import React from 'react'
import { useCallback } from 'react';


function Orderlist() {

  const [ordenes, setOrdenes] = React.useState([])

  React.useEffect(() =>{
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    const author = localStorage.getItem("id");
    const idstr = author.replace(/["']/g, "");
    const data = await fetch(`http://localhost:3000/app/order-data/${idstr}`)
    console.log(idstr)
    const orders = await data.json()
    setOrdenes(orders)
    console.log(orders)
  });


  return (
    <div className='list'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Número de seguimiento</th>
              <th>Fecha</th>
              <th>Ciudad Entrega</th>
              <th>Dirección Entrega</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
          {
              ordenes.map((item, i) => (
                
            <tr key={i}>
              <td><a href={'/actualizar-orden/'+ item.Tracing}>{item.Tracing}</a></td>
              <td>{item.Date}</td>
              <td>{item.FinalCity}</td>
              <td>{item.FinalAddress}</td>
              <td>{item.State}</td>
            </tr>
              ))}
          </tbody>
        </Table>
    </div>

    
  );
}

export default Orderlist;