import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-6 transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 text-center sm:text-left">
          &copy; {new Date().getFullYear()} Secure Notes. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-slate-400">
          <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;