import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './EditForm.css';
import Image from 'react-bootstrap/Image';
import { useHistory } from "react-router-dom";
import {useCallback, useState, useEffect} from "react";

function EditForm() {
    const history = useHistory();
    
    
    const [date, setEnteredDate] = useState('');
    const [hour, setEnteredHour] = useState('');
    const [order, setOrders] = useState({});
    
    const pathName_url = window.location.pathname;
    const arr_url = pathName_url.split('/');
    const item_tracing = arr_url[2];
    
    const handleRoute = () =>{
        history.push("/lista-paquetes");
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    
    const fetchData = useCallback(async () => {
        
        const data = await fetch(`https://instaya.herokuapp.com/app/actualizar-orden/${item_tracing}`)
        const order = await data.json()
    
        let isoDateStr = order.Date;
        const date = new Date(isoDateStr);
        
        let dateOutput = String(date.getFullYear()) + '-' + String(date.getMonth() + 1) + '-'  ;
        if(date.getDate() < 10){
            dateOutput += '0' + String(date.getDate());
        }
        
        let hourOutput = String(date.getHours()) + ':' + String(date.getMinutes());
        
        setEnteredHour(hourOutput)
        setEnteredDate(dateOutput);
        setOrders(order)
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        let task = e.target.elements;
        console.log(task[6].name)
        let tasks = {};
        
        for (let element of task) {
            if (element.name !== "Author" && element.name !== "Tracing" &&
                element.name !== "Date" && element.name !== "Status" && element.name !=="") {
                
                tasks[element.name] = element.value;
            }
        }
    
        tasks["Author"] = order.Author;
        tasks["Tracing"] = order.Tracing;
        tasks["Date"] = `${date}T${hour}`;
        tasks["State"] = "Guardado";
        tasks["_id"] = order._id;
        tasks["__v"] = order.__v;
        
        console.log(JSON.stringify(tasks))
        
        let res = await fetch(`https://instaya.herokuapp.com/app/actualizar-orden/${item_tracing}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            
            body: JSON.stringify(tasks),
        });
    
        let resJson = await res.json();
        console.log(resJson)
        console.log(res.status)
        if (res.status === 201) {
            alert("Orden actualizada exitosamente");
            handleRoute();
        } else {
            alert("Error a la hora de actualizar la orden");
        }
    }

    const cancelOrder = async (e) => {
        e.preventDefault();
            try {
              let res = await fetch(`https://instaya.herokuapp.com/app/cancel-order/${item_tracing}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
              });
              let resJson = await res.json();
              console.log(resJson)
              if (res.status === 200) {
                alert("Orden cancelada con éxito")
                handleRoute();
              } else {
                alert("Ocurrió un error al cancelar el pedido");
              }
            } catch (err) {
              console.log(err);
            }
    }

    return (
        
        <div className='createorder'>
            <Image className='logo' roundedCircle/>
            <div className='form3'>
                <Form onSubmit={handleSubmit} id="editForm">
                    <div className='createtitle'>
                        <h3>Editar Orden</h3>
                    </div>
        
                    <div className='datetime'>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date"  value={date} onChange={(e) => setEnteredDate(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control type="time" value={hour} onChange={(e) => setEnteredHour(e.target.value)} />
                        </Form.Group>
                    </div>
        
                    <div className='columns'>
                        <Form.Group className="mb-3">
                            <Form.Label>Largo</Form.Label>
                            <Form.Control type="number" name="Large1" 
                                          placeholder={order.Large1} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Largo</Form.Label>
                            <Form.Control type="number" name="Large2" 
                                          placeholder={order.Large2} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Alto</Form.Label>
                            <Form.Control type="number" name="Height" 
                                          placeholder={order.Height} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Peso</Form.Label>
                            <Form.Control type="number" name="Weight"
                                          placeholder={order.Weight} />
                        </Form.Group>
                    </div>
        
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección recogida</Form.Label>
                        <Form.Control type="text" name="InitialAddress"
                                      placeholder={order.InitialAddress} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Ciudad recogida</Form.Label>
                        <Form.Control type="text" name="InitialCity"
                                      placeholder={order.InitialCity}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre destinatario</Form.Label>
                        <Form.Control type="text" name="Destinatary"
                                      placeholder={order.Destinatary} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Cédula/Nit destinatario</Form.Label>
                        <Form.Control type="text" name="IdDestinatary:"
                                      placeholder={order.IdDestinatary} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección entrega</Form.Label>
                        <Form.Control type="text" name="FinalAddress"
                                      placeholder={order.FinalAddress} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Ciudad entrega</Form.Label>
                        <Form.Control type="text" name="FinalCity"
                                      placeholder={order.FinalCity} />
                    </Form.Group>
                                    
                
                <Button className='sesion' variant="primary" type="submit" form="editForm">
                <div className='buttontext'>Editar Orden</div>
                </Button>
                
                <div className='back'>
                    <Button className='sesion' variant="danger" type="button" onClick={cancelOrder}>
                    <div className='buttontext'>Cancelar Orden</div>
                    </Button>
                </div>
    
                <div className='back'>
                    <Button className='sesion' variant="secondary" type="button" onClick={handleRoute}>
                    <div className='buttontext'>Volver</div>
                    </Button>
                </div>
                </Form>

            </div>
            
        </div>
    );
}

export default EditForm;