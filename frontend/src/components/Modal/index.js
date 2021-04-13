import React from 'react';
import { Container, ModalBody } from './styled';

export default ({ children, status, setStatus }) => {
    const handleModalClick = (e) => {
        if(e.target.classList.contains('modalBg')) {
            setStatus(false);
        }
    }
    
    return (
        <Container 
            className="modalBg"
            status={status} 
            onClick={handleModalClick}
        >
            <ModalBody>
                {children}
            </ModalBody>
        </Container>
    )
}