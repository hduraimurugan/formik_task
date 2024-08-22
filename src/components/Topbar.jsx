import React from 'react';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom';


function Topbar(){
    let navigate = useNavigate();

    return(
        <>
              <Navbar expand="lg" className="bg-primary p-4">
                <Container>
                    <Navbar.Brand onClick={() => navigate('/')} style={{textAlign:"center"}} className='text-white'><h2><b>Library Admin Dashboard</b></h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav"style={{fontWeight:"500",}}>
                        <Nav className="ms-auto px-5 bg-light" id='navbar'>
                            <Nav.Link onClick={() => navigate('/')}><b>Dashboard</b></Nav.Link>
                            
                            <Nav.Link onClick={() => navigate('/adduser')}><b>Add Records</b></Nav.Link>  
                            {/* <Nav.Link onClick={() => navigate('/edituser/1')}><b>Edit Records</b></Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Topbar