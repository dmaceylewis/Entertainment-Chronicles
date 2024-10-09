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
       window.alert("Invalid login")
      }
    })
  };

  return (
    <main className="container-login">
      <section>
        <Form className="form-login" onSubmit={loginSubmit}>
          <article className="echron-title">
            <h1>Welcome to the Entertainment Chronicles</h1>
            <h2>Please sign in</h2>
          </article>
          <hr></hr>
          <fieldset>
              <FormGroup className="form-group">
                <Label for="email">Email</Label>
                <Input 
                  className="login-form-input"
                  id="email" type="text"
                  onChange={e => setEmail(e.target.value)} 
                />
              </FormGroup>
              {/* <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
              </FormGroup> */}
              <section className="button-group">
                <Button className="login-btn" color="warning" outline type="submit">
                  Login
                </Button>
                <Link to="/register">
                  <Button className="register-btn" color="success" outline>
                    Register
                  </Button>
                </Link>
              </section>
          </fieldset>
        </Form>
      </section>
    </main>
  );
}