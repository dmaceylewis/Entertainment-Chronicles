import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/UsersService";

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
//   const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email})
      .then(r =>{
      if(r){
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email")
      }
    })
  };

  return (
    <main className="container-login">
      <section>
        <Form className="form-login" onSubmit={loginSubmit}>
        <h1>Entertainment Chronicles</h1>
        <h2>Please sign in</h2>
        <fieldset>
            <FormGroup className="form-group">
            <Label for="email">Email</Label>
            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            {/* <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
            </FormGroup> */}
            <FormGroup className="form-group">
            <Button className="login-btn btn-info" type="submit">Login</Button>
            </FormGroup>
            <em>
            Not registered? <Link to="/register">Register</Link>
            </em>
        </fieldset>
        </Form>
    </section>
    </main>
  );
}