import Image from "next/image";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="page-x grid flex-1 place-items-center py-16">
      <div className="w-full max-w-sm">
        <Image src="/brand/logo-horizontal.svg" alt="Dh Photography" width={160} height={45} unoptimized className="bg-transparent" />
        <div className="mt-10 rounded-panel bg-paper p-8 shadow-btn">
          <h1 className="text-3xl">Dashboard</h1>
          <p className="mt-2 text-stone">Sign in to see inquiries.</p>
          {/* useSearchParams (for ?next=) needs a Suspense boundary. */}
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
