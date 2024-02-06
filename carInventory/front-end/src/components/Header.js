import React from 'react';// Import the React module to use React functionalities
import Col from 'react-bootstrap/Col';//Import bootstrap Columns
import Row from 'react-bootstrap/Row';//Import bootstap Row

//Header function component
export default function Header() {//Export default Header function component

    //==============JSX Rendering===========
    
  return (  
          <header id='header'>
              {/* Row 1 */}
              <Row className='row'>
                  <Col id='heading' className='row'>
                      <h1 className='h1'>CARS</h1>
                  </Col>
              </Row>
          </header>
  )
}
