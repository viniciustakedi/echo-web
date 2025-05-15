import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface AuthSocialButtonProps extends ComponentProps<typeof Button> {
  icon: React.ElementType;
  label: string;
}

const AuthSocialButton = ({ 
  icon: Icon, 
  label, 
  className, 
  ...props 
}: AuthSocialButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "flex items-center gap-2 w-full border-gray-300 hover:bg-muted",
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  );
};

export default AuthSocialButton;
