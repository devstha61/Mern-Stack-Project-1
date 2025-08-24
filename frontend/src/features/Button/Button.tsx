import type { ReactNode, MouseEvent } from 'react';
import "./Button.css"

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button 
    className='nav-button'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
