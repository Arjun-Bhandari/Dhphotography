"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { login, type LoginState } from "../actions";

export function LoginForm() {
  const next = useSearchParams().get("next") ?? "/dashboard";
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="mt-6 flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <label className="flex flex-col gap-2 text-sm font-medium">
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "login-error" : undefined}
          className="rounded-panel bg-paper px-4 py-3 text-base font-normal ring-1 ring-ink/15 ring-inset focus:ring-2 focus:ring-sindoor focus:outline-none aria-invalid:ring-2 aria-invalid:ring-sindoor-deep"
        />
      </label>
      {state.error ? (
        <p id="login-error" role="alert" className="text-sm text-sindoor-deep">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="mt-2">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
