type ButtonProps = {
  label: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { onClick, label } = props;

  return (
    <button className="rounded-sm bg-green-100 px-3 text-sm leading-8 text-white hover:bg-green-200" onClick={onClick}>{label}</button>
  );
};

export default Button;