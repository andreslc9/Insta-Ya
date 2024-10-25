import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Session.css';
import Image from 'react-bootstrap/Image';
import { useHistory } from "react-router-dom";
import React, { useState } from 'react';

function Session() {
  const [user, setEnteredUser] = useState('');
  const [password, setEnteredPassword] = useState('');
  const history = useHistory();

  const handleRoute = () =>{ 
    history.push("/registro");
  };
  

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (user !== "" && password !== "") {
      try {
        let res = await fetch("http://localhost:3000/app/signin", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            User: user,
            Password: password,
          }),
        });
        let resJson = await res.json();
        console.log(resJson)
        if (res.status === 200) {
          
          let response = await fetch(`http://localhost:3000/app/user-data/${user}`, {
            method: "GET"
          });
          let responsejson = await response.json();
          console.log(resJson);
          localStorage.setItem("isAuthenticated", "true")
          localStorage.setItem("token", JSON.stringify(resJson.accestoken));
          localStorage.setItem("id", JSON.stringify(responsejson));
          handleRoute2(); 
        } else {
          alert(JSON.stringify(resJson).slice(12, -2));
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Asegúrese de llenar los campos")
    }
  };

  const handleRoute2 = () =>{
      history.push("/lista-paquetes");


  };
  
  return (
        <div className='login'>
        <Image className='logo' roundedCircle/>
          <Form className='form' onSubmit={handleSubmit}>
          <Image className='logo' src='https://www.webretail.com.ar/v2/wp-content/uploads/2020/04/Env%C3%ADos-a-domicilio.png' roundedCircle/>
          <Form.Group className="mb-3">
            <div className='title'><h3>InstaYa</h3></div>
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu usuario" id='user' name='user' value={user} onChange={(e) => setEnteredUser(e.target.value)}/>
            <Form.Text className="text-muted">
              Nunca compartiremos tus datos con alguien más.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" id='password' name='password' value={password} onChange={(e) => setEnteredPassword(e.target.value)}/>
          </Form.Group>
          <Button className='sesion' variant="primary" type="submit">
          <div className='buttontext'>Iniciar sesión</div>
          </Button>
          <div>
          <Form.Text className="text-muted" id='txt-register'>
              ¿No tienes una cuenta?
            </Form.Text>
          </div>
          <div>
            <Button className='register' variant="secondary" type="button" onClick={handleRoute}>
            <div className='buttontext'>Regístrate</div>
            </Button>
          </div> 
          </Form>
        </div>
  );
}

export default Session;