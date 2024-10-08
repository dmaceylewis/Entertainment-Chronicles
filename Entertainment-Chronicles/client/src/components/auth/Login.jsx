import React, { useState } from "react";
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/UsersService";

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
          <h1>Welcome to the Entertainment Chronicles</h1>
          <h2>Please sign in</h2>
          <fieldset>
              <FormGroup className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input id="login-form-input" type="text" onChange={e => setEmail(e.target.value)} />
              </FormGroup>
              {/* <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
              </FormGroup> */}
              <FormGroup className="form-group">
                <Button className="login-btn" type="submit">Login</Button>
              </FormGroup>
              <Link to="/register">
                <Button className="register-btn">
                  Register
                </Button>
              </Link>
          </fieldset>
        </Form>
      </section>
    </main>
  );
}