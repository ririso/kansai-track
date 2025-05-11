// src/components/ui/avatar.tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const avatarVariants = cva(
  "relative inline-block overflow-hidden rounded-full bg-muted ring-2 ring-offset-2 ring-offset-background",
  {
    variants: {
      size: {
        default: "h-12 w-12",
        sm: "h-10 w-10",
        md: "h-16 w-16",
        lg: "h-24 w-24",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

export { Avatar };

const avatarImageVariants = cva("h-full w-full object-cover", {
  variants: {
    shape: {
      rounded: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    shape: "rounded",
  },
});

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarImageVariants> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, shape, ...props }, ref) => (
    <img
      ref={ref}
      className={cn(avatarImageVariants({ shape }), className)}
      {...props}
    />
  )
);
AvatarImage.displayName = "AvatarImage";

const avatarFallbackVariants = cva(
  "absolute inset-0 h-full w-full flex items-center justify-center text-sm font-medium text-muted-foreground",
  {
    variants: {
      shape: {
        rounded: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      shape: "rounded",
    },
  }
);

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarFallbackVariants> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, shape, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarFallbackVariants({ shape }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
AvatarFallback.displayName = "AvatarFallback";

export { AvatarFallback, AvatarImage };
