import { GitBranch } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-6 transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 text-center sm:text-left flex items-center gap-2">
          Developed by Jay Prakash
          <Link href="https://github.com/IamJayprakash" target="_blank" className="text-orange-500">
            <GitBranch size={20} />
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;