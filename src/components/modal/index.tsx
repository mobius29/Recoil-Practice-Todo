import { CSSTransition } from 'react-transition-group';
import styled from '@emotion/styled/macro';

import Portal from './Portal';

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: relative;
  max-width: 456px;
  width: 100%;
`;

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<IProps> = ({ children, isOpen, onClose }) => {
  return (
    <Portal>
      <CSSTransition in={isOpen} timeout={300} classNames='modal' unmountOnExit>
        <Overlay>
          <Dim onClick={onClose} />
          <Container>{children}</Container>
        </Overlay>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;
