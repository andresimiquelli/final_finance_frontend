import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../services/ApiService';

import { Container, Row, Col } from 'react-grid-system'

import { LoginForm, Logo, ErrorMessage } from './styles';
import Spinner from '../../components/Spinner';

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, loginErrorMessage, loading } = useAuth()

    function submit(e: React.FormEvent) {
        e.preventDefault()
        login(email, password)
    }

    return (
        <Container>
            <Row justify='center'>
                <Col sm={12} lg={4}>
                    <LoginForm>
                        <Logo>
                            <img src="./final_finance_logo.svg" alt="final finance logo" />
                        </Logo>
                        <div className="box">

                            { loginErrorMessage.length>0&& <ErrorMessage>{ loginErrorMessage }</ErrorMessage>}

                            <form action="#teste" onSubmit={submit}>
                                <div>
                                    <input 
                                        type="text"
                                        placeholder='e-mail'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div>
                                    <input 
                                        type="password" 
                                        placeholder='senha'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}/>
                                </div>
                                <div>
                                    { loading? <Spinner /> : <button className='primary'>Entrar</button>}
                                </div>
                            </form>
                        </div>
                    </LoginForm>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;