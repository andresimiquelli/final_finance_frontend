import React, { createContext, useContext, useState } from 'react';
import { useApi } from '../services/ApiService';

import ApiUser from '../types/ApiUser';
import ApiWallet from '../types/ApiWallet';

interface AuthContextProps {
    token: string;
    setToken(token: string): void;
    me?: ApiUser;
    setMe(user: ApiUser): void;
    loading: boolean;
    setLoading(loading: boolean): void;
    loginErrorMessage: string;
    setLoginErrorMessage(message: string): void;
    login(email: string, password: string): void;
    logout(): void;
    selectedWallet?: ApiWallet;
    setSelectedWallet(wallet: ApiWallet): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC = ( { children } ) => {

    const [token, setToken] = useState('')
    const [me, setMe] = useState<ApiUser>()
    const [loading, setLoading] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const [selectedWallet, setSelectedWallet] = useState<ApiWallet>()

    const api = useApi()

    function login(email: string, password: string) {
        setLoading(true)
        api.post('/login', {email: email, password: password}).then(
            response => {
                let lToken = response.data.token
                setToken(lToken)
                loadMe(lToken)
            }
        )
        .catch(
            () => setLoginErrorMessage("Usuário ou senha incorretos.")
        )
        .finally(
            () => setLoading(false)
        )
    }

    function loadMe(lToken: string) {
        api.get('/users/me', {headers: { "Authorization": "Bearer "+lToken } }).then(
            response => {
                setMe(response.data)
            }
        ).catch(
            () => setLoginErrorMessage("Erro ao carregar informações do usuário")
        ).finally(
            () => setLoading(false)
        )
    }

    function logout() {
        setToken('')
    }

    return (
        <AuthContext.Provider
            value={{ 
                token, 
                setToken, 
                me, 
                setMe, 
                loading, 
                setLoading, 
                loginErrorMessage, 
                setLoginErrorMessage, 
                login, 
                logout,
                selectedWallet,
                setSelectedWallet}}
        >
            { children }
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextProps
{
    const context = useContext(AuthContext)
    return context;
}

export { AuthProvider, useAuth };