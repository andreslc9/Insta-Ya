import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './CreateForm.css';
import Image from 'react-bootstrap/Image';
import { useHistory } from "react-router-dom";
import React, { useState } from 'react';

function CreateForm() {
    const history = useHistory();
    const [date, setEnteredDate] = useState('');
    const [hour, setEnteredHour] = useState('');
    const [large1, setEnteredLarge1] = useState('');
    const [large2, setEnteredLarge2] = useState('');
    const [height, setEnteredHeight] = useState('');
    const [weight, setEnteredWeight] = useState('');
    const [initialaddress, setEnteredInitialAddress] = useState('');
    const [initialcity, setEnteredInitialCity] = useState('');
    const [destinatary, setEnteredDestinatary] = useState('');
    const [destinataryid, setEnteredDestinataryId] = useState('');
    const [finaladdress, setEnteredFinalAddress] = useState('');
    const [finalcity, setEnteredFinalCity] = useState('');
  
    const handleRoute = () =>{ 
      history.push("/lista-paquetes");
    };

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    };
    
    let handleSubmit = async (e) => {
        e.preventDefault();
        if (date !== "" && large1 !== "" && large2 !== "" && height !== "" && weight !== "" && initialaddress !== "" && initialcity !== "" && destinatary !== "" && destinataryid !== "" && finaladdress !== "" && finalcity !== "") {
          try {
            const random1 = getRandomInt(10);
            const random2 = getRandomInt(10);
            const random3 = getRandomInt(10);
            const random4 = getRandomInt(10);
            const random5 = getRandomInt(10);
            console.log(random1, random2, random3, random4, random5)
            const nseguimiento = `${random1}${random2}${random3}${random4}${random5}`
            const author = localStorage.getItem("id");
            const authstr = author.replace(/["']/g, "");
            console.log(authstr)
            let res = await fetch("https://instaya.herokuapp.com/app/create-order", {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                Author:authstr,
                Tracing: nseguimiento,
                Date: `${date}T${hour}`,
                Large1: large1,
                Large2: large2,
                Height: height,
                Weight: weight,
                InitialAddress: initialaddress,
                InitialCity: initialcity,
                Destinatary: destinatary,
                IdDestinatary: destinataryid,
                FinalAddress: finaladdress,
                FinalCity: finalcity,
                State: "Guardado"
              }),
            });
            let resJson = await res.json();
            if (res.status === 201) {
              alert(JSON.stringify(resJson).slice(12, -2));
              handleRoute(); 
            } else {
              alert(JSON.stringify(resJson).slice(12, -2));
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          alert("Revise que todos los campos estén completos")
        }
      };

    return (
            <div className='createorder'>
            <Image className='logo' roundedCircle/>
            <Form className='form3' onSubmit={handleSubmit}>
                <div className='createtitle'><h3>Agregar Orden</h3></div>
                <div className='datetime'>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" id='date' name='date' value={date} onChange={(e) => setEnteredDate(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Hora</Form.Label>
                    <Form.Control type="time" id='hour' name='hour' value={hour} onChange={(e) => setEnteredHour(e.target.value)}/>
                </Form.Group>
                </div>
                <div className='columns'>
                <Form.Group className="mb-3">
                    <Form.Label>Largo</Form.Label>
                    <Form.Control type="number" placeholder="" id='large1' name='large1' value={large1} onChange={(e) => setEnteredLarge1(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Largo</Form.Label>
                    <Form.Control type="number" placeholder="" id='large2' name='large2' value={large2} onChange={(e) => setEnteredLarge2(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Alto</Form.Label>
                    <Form.Control type="number" placeholder="" id='height' name='height' value={height} onChange={(e) => setEnteredHeight(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control type="number" placeholder="" id='weight' name='weight' value={weight} onChange={(e) => setEnteredWeight(e.target.value)}/>
                </Form.Group>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Dirección recogida</Form.Label>
                    <Form.Control type="text" placeholder="" id='initialaddress' name='initialaddress' value={initialaddress} onChange={(e) => setEnteredInitialAddress(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ciudad recogida</Form.Label>
                    <Form.Control type="text" placeholder="" id='initialcity' name='initialcity' value={initialcity} onChange={(e) => setEnteredInitialCity(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre destinatario</Form.Label>
                    <Form.Control type="text" placeholder="" id='destinatary' name='destinatary' value={destinatary} onChange={(e) => setEnteredDestinatary(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cédula/Nit destinatario</Form.Label>
                    <Form.Control type="text" placeholder="" id='destinataryid' name='destinataryid' value={destinataryid} onChange={(e) => setEnteredDestinataryId(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Dirección entrega</Form.Label>
                    <Form.Control type="text" placeholder="" id='finaladdress' name='finaladdress' value={finaladdress} onChange={(e) => setEnteredFinalAddress(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ciudad entrega</Form.Label>
                    <Form.Control type="text" placeholder="" id='finalcity' name='finalcity' value={finalcity} onChange={(e) => setEnteredFinalCity(e.target.value)}/>
                </Form.Group>
                <Button className='sesion' variant="primary" type="submit">
                <div className='buttontext'>Crear Orden</div>
                </Button>
                <div className='back'>
                <Button className='sesion' variant="secondary" type="button" onClick={handleRoute}>
                <div className='buttontext'>Volver</div>
                </Button>
            </div>
            </Form>
            </div>
  );
}

export default CreateForm;