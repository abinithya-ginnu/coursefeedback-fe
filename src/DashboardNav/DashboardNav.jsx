import React, { useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ListItemText } from '@mui/material';
import AddDetails from '../AddDetails/AddDetails';
import './DashboardNav.css'

const DashboardNav = () => {
  const nav=useNavigate();

  const handleLogout = () =>{
    sessionStorage.clear();
    nav("/");
  }
  useEffect(() => {
    let userId = sessionStorage.getItem("id")
    if(userId === null || userId === undefined)
    {
      nav("/")
    }
  })
     

  return (
    <Navbar className='login-navbar' collapseOnSelect expand="lg" bg="light" variant="light" sticky='top'>
      <Container>
        <Navbar.Brand href="#home">
            <h1>REFERO</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className='nav-links ml-auto'>
            <Nav.Link as={NavLink} activeClassName="active" to="/dashboard">Dashboard</Nav.Link>
            <AddDetails />
          </Nav>
          <Nav className='nav-links'>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className='login-nav-dropdown'>
                  <img src="profileimage.svg" alt="Profile" style={{ width: '32px', borderRadius: '50%', marginRight: '5px' }} />
                  <ListItemText primary={sessionStorage.getItem("name")} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/profile">Profile & Settings</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default DashboardNav
