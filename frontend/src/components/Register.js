import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css';
import Image from 'react-bootstrap/Image';
import { useHistory } from "react-router-dom";

function Register() {
  const [name, setEnteredName] = useState('');
  const [lastname, setEnteredLastName] = useState('');
  const [user, setEnteredUser] = useState('');
  const [password, setEnteredPassword] = useState('');
  const [email, setEnteredEmail] = useState('');
  const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/");
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && lastname !== "" && user !== "" && password !== "" && email !== "") {
      try {
        let res = await fetch("http://localhost:3000/app/signup", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Name: name,
            LastName: lastname,
            User: user,
            Password: password,
            Email: email
          }),
        });
        let resJson = await res.json();
        console.log(resJson)
        console.log(res.status)
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
      alert("Asegúrese que todos los campos estén completos")
    }
  };

  return (
    <div className='reg'>
    <Image className='logo' roundedCircle/>
      <Form className='form2' onSubmit={handleSubmit}>
        <Image className='logo' src='https://www.webretail.com.ar/v2/wp-content/uploads/2020/04/Env%C3%ADos-a-domicilio.png' roundedCircle/>
        <div className='title'><h3>InstaYa</h3></div>
        <Form.Group className="mb-3">
            <Form.Label>Nombres</Form.Label>
            <Form.Control type="text" placeholder="Nombres" id='name' name='name' value={name} onChange={(e) => setEnteredName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control type="text" placeholder="Apellidos" id='lastname' name='lastname' value={lastname} onChange={(e) => setEnteredLastName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Usuario" id='user' name='user' value={user} onChange={(e) => setEnteredUser(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" id='password' name='password' value={password} onChange={(e) => setEnteredPassword(e.target.value)}/>
            <Form.Text className="text-muted">
              Ingresa al menos 8 caracteres con mayúsculas, minúsculas, números y símbolos.
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="example@gmail.com" id='email' name='email' value={email} onChange={(e) => setEnteredEmail(e.target.value)}/>
        </Form.Group>
        <Button className='sesion' variant="primary" type="submit">
        <div className="buttontext">Registrarse</div>
        </Button>
        <div className='back'>
            <Button className='sesion' variant="secondary" type="button" onClick={handleRoute}>
            <div className="buttontext">Volver</div>
            </Button>
          </div>
      </Form>
    </div>
  );
}

export default Register;