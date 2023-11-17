import logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <div className="flex h-10 items-center justify-center bg-navbg">
      <img src={logo} alt="logo" className="h-[30px] w-20 cursor-pointer opacity-50 hover:opacity-80" />
    </div>
  );
};

export default Navbar;