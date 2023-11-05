import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Header function component
export default function Header() {

    //==============JSX Rendering===========
  return (
    <div>
          <header id='header'>
              {/* Row 1 */}
              <Row className='row'>
                  <Col id='heading' className='row'>
                      <h1 className='h1'>CARS</h1>
                  </Col>
              </Row>
          </header>
    </div>
  )
}
