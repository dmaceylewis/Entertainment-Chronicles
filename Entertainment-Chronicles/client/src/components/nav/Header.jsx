import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../../services/UsersService";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export const Header = ({isLoggedIn, setIsLoggedIn}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  return (
    <div className="container-fluid">
      <Navbar color="dark" dark expand="lg">
        <NavbarBrand className='nav-title' href="/" style={{fontFamily: "Fredoka"}}>
          {/* <img
          alt="logo"
          src="/logo-white.svg"
          style={{
            height: 40,
            width: 40
          }}/> */}
          Entertainment Chronicles
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="ml-auto" style={{marginLeft: "auto"}} navbar fill pills>
            { /* When isLoggedIn === true, we will render the Home link */ }
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/Collections">Collections</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/Collections/MyCollections">My Collections</NavLink>
                </NavItem> */}
              </>
            )}
          {isLoggedIn && (
              <NavItem style={{fontWeight: "bolder"}}>
                <a 
                  aria-current="page" 
                  className="nav-link" 
                  style={{ cursor: "pointer" }} 
                  onClick={() => {
                    logout();
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </a>
              </NavItem>
            )}
            {/* {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
           
              </>
            )} */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}