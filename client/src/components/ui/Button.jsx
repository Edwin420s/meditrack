// client/src/components/ui/Button.jsx

import './Button.css';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
