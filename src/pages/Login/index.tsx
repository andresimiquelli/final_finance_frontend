import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import { Container, Row, Col } from 'react-grid-system'

import { LoginForm, Logo, ErrorMessage, WalletList } from './styles';
import Spinner from '../../components/Spinner';
import { FaWallet } from 'react-icons/fa';
import ApiWallet from '../../types/ApiWallet';

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, loginErrorMessage, loading, me, setSelectedWallet } = useAuth()

    function submit(e: React.FormEvent) {
        e.preventDefault()
        login(email, password)
    }

    function selectWallet(wallet: ApiWallet){
        setSelectedWallet(wallet)
    }

    function showWalletList() {
   
        return (
            <WalletList>
                {
                    me?.wallets.map((wallet, index) => 
                        <div onClick={() => selectWallet(wallet)} key={`wallet_${index}`}>
                            <FaWallet />
                            <h3>{wallet.name}</h3>
                            <h5>R$ {wallet.leftover}</h5>
                        </div>
                    )
                }
            </WalletList>
        )
    }

    function showLoginForm() {
        return (
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
        )
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

                            { me? showWalletList() : showLoginForm() }
                            
                        </div>
                    </LoginForm>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;