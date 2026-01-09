import { Droplets } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-water-light flex items-center justify-center shadow-soft">
          <Droplets className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-water-light rounded-full animate-pulse-slow" />
      </div>
      <span className="text-xl font-heading font-bold text-gradient">
        h2oGestão
      </span>
    </div>
  );
};

export default Logo;
