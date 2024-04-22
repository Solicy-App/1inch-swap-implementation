import React from 'react';
import './footer.css';
import {Col, Row} from "react-bootstrap";
import {FaRegCopyright} from "react-icons/fa";

function Footer() {
  const date = new Date();
  return (
        <footer>
          <div className="footer-bottom">
            <div className="container">
              <Row>
                <Col >
                  <p className="mb-0 copyright"><FaRegCopyright /> {date.getUTCFullYear()} 1Inch</p>
                </Col>
              </Row>
            </div>
          </div>
        </footer>
  );
}

export default Footer;
