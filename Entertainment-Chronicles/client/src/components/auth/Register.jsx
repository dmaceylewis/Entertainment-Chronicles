import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../services/UsersService";


export const Register = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    const newUser = { 
        name: name,
        email: email
       }
      try {
      register(newUser)
        .then(() => {
          setIsLoggedIn(true)
          navigate('/')
        });
      } catch (error) {
        console.error("There was an error while trying to register:", error);
      }
    }


  return (
    <>
    <main className="container-login">
      <section>
        <Form className="form-login" onSubmit={registerClick}>
          <article className="echron-title">
            <h1>Welcome to the Entertainment Chronicles</h1>
            <h2>Please create an account</h2>
          </article>
          <hr></hr>
          <fieldset>
              <FormGroup className="form-group">
                <Label for="name" style={{fontFamily: "Fredoka"}}>Name</Label>
                <Input 
                  className="login-form-input"
                  id="name" type="text"
                  autoComplete="name" 
                  placeholder="Enter your full name here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka",
                    color: 'white'
                  }}
                  onChange={e => setName(e.target.value)} 
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="email" style={{fontFamily: "Fredoka"}}>Email</Label>
                <Input 
                  className="login-form-input"
                  id="email" type="text"
                  autoComplete="email" 
                  placeholder="Enter your email address here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka",
                    color: 'white'
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
                  Register
                </Button>
                <Link to="/login">
                  <Button className="register-btn" color="danger" outline style={{fontFamily: "Fredoka"}}>
                    Cancel
                  </Button>
                </Link>
              </section>
          </fieldset>
        </Form>
      </section>
    </main>
    </>
  );
}