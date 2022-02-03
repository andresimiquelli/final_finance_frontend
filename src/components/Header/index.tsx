import React from "react";

import { Row, Col } from "react-grid-system";
import { IoExitOutline } from "react-icons/io5";

import { Container, Logo, User } from "./styles";

const Header: React.FC = () => {

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <Logo>
                       <img src="final_finance_logo.svg" alt="final finance logotipo" /> 
                    </Logo>
                </Col>
                <Col sm={6}>
                    <User>
                        <h5>João André</h5>
                        <IoExitOutline />
                    </User>
                </Col>
            </Row>            
        </Container>
    );

}

export default Header;