import { ReactNode } from 'react';
import styles from './styles';

interface ButtonProps {
  children: ReactNode;
  type?: string;
  disabled?: boolean;
  onClick: () => void;
}

function Button({
  onClick,
  disabled,
  type = 'primary',
  children,
}: ButtonProps) {
  const colorMapper: {[key: string]: string} = {
    primary: '#037030',
  }

  return (
    <styles.Button
      onClick={onClick}
      color={colorMapper[type]}
      disabled={disabled}
    >
      {children}
    </styles.Button>
  );
}

export default Button;
