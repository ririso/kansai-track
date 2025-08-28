import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ReturnLinkProps = {
  href: string;
  label: string;
};

export default function ReturnLink({ href, label }: ReturnLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
