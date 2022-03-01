import React from 'react';

import { Container } from './styles';

interface InputRadioProps {
    value: string | number;
    options: {label: string, value: string | number}[];
    onChange?(value: string | number): void;
}

const InputRadio: React.FC<InputRadioProps> = ({ value, options, onChange }) => {
    return (
        <Container>
            {
                options.map((op,i) => 
                    <button
                        key={`op${i}`} 
                        onClick={() => onChange&& onChange(op.value)}
                        className={value===op.value? 'selected' : 'unselected'}>
                            {op.label}
                    </button>
                )
            }
        </Container>
    );
}

export default InputRadio;