import logo from "@/assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-10 h-10">
          <img src={logo} alt="H2O Gestão Logo" className="mx-auto block rounded-full sm:mx-0 sm:shrink-0"/>
        </div>
      </div>
      <span className="text-xl font-heading font-bold text-gradient">
        H2O Gestão
      </span>
    </div>
  );
};

export default Logo;
