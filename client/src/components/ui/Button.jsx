// client/src/components/ui/Button.jsx

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-green-600 text-green-600 hover:bg-green-100",
  };

  const baseClasses = "px-4 py-2 rounded font-semibold focus:outline-none focus:ring";

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
