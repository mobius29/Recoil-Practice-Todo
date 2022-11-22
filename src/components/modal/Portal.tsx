import { createPortal } from 'react-dom';

interface IProps {
  children: React.ReactNode;
}

const Portal: React.FC<IProps> = ({ children }) => {
  const rootElement = document.getElementById('modal-root') as HTMLElement;

  return rootElement ? createPortal(children, rootElement) : null;
};

export default Portal;
