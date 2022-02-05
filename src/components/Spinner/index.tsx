import React from 'react';

import ReactLoading from 'react-loading';

import { Container } from './styles';

import DefaultTheme from '../../themes/DefaultTheme';

const Spinner: React.FC = () => {
    return (
        <Container>
            <ReactLoading type="bars" height={"1.3rem"} color={DefaultTheme.primary}/>
        </Container>
    );
}

export default Spinner;