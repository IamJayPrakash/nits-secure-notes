"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CommonButton from "@/components/common/CommonButton";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-5xl font-extrabold text-primary tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-slate-800">Page Not Found</h2>
        <p className="text-slate-500">The page you are looking for does not exist or has been moved.</p>
        <div className="flex gap-4 justify-center mt-6">
          <CommonButton
            variant="outline"
            onClick={() => router.back()}
          >
            Go Back
          </CommonButton>
          <Link href="/">
            <CommonButton variant="default">
              Go to Dashboard
            </CommonButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;