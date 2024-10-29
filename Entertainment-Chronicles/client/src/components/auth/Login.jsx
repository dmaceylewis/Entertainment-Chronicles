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
import "./login.css";

export const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
//   const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email})
      .then(r =>{
      if(r){
      setIsLoggedIn(true)
      localStorage.setItem("User",
        JSON.stringify({
          id: r.id,
          email: r.email,
          name: r.name
        })
      )
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
                <Label for="email" style={{fontFamily: "Fredoka"}}>Email</Label>
                <Input 
                  className="login-form-input"
                  id="email" type="text"
                  // autoComplete="email" 
                  placeholder="Enter your email address here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka",
                    // color: 'white'
                  }}
                  onChange={e => setEmail(e.target.value)} 
                />
              </FormGroup>
              {/* <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
              </FormGroup> */}
              <section className="button-group">
                <Button className="login-btn" color="warning" outline type="submit" style={{fontFamily: "Fredoka"}}>
                  Login
                </Button>
                <Link to="/register">
                  <Button className="register-btn" color="success" outline style={{fontFamily: "Fredoka"}}>
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