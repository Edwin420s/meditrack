// client/src/components/ui/Button.jsx

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = "font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none";
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    outline: "border border-primary text-primary hover:bg-primary-light hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
