"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LeadSchema, type Lead } from "@/lib/schemas";
import { Button } from "./ui/button";
import { Input, Textarea } from "./ui/input";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Lead>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        setStatus("error");
        setServerError(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      if (body.redirectUrl) {
        // small delay so the user sees the success state
        setTimeout(() => {
          window.location.href = body.redirectUrl as string;
        }, 900);
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again.");
    }
  });

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        <h3 className="text-xl font-medium">Got it — thanks.</h3>
        <p className="max-w-sm text-sm text-white/60">
          We&apos;ll reply within one business day. Sending you over to pick
          a time…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          placeholder="Jane Doe"
          autoComplete="name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          placeholder="jane@company.com"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
      <Input
        label="Company (optional)"
        placeholder="Acme Co."
        autoComplete="organization"
        {...register("company")}
        error={errors.company?.message}
      />
      <Textarea
        label="What do you need help with?"
        placeholder="A few sentences about your problem, what you've tried, and what success looks like."
        {...register("message")}
        error={errors.message?.message}
      />
      {/* honeypot */}
      <div
        aria-hidden
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/45">
          Or email us directly at{" "}
          <a
            href="mailto:hello@netbiz.ai"
            className="underline underline-offset-4 hover:text-white"
          >
            hello@netbiz.ai
          </a>
          .
        </p>
        <Button
          type="submit"
          variant="primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send & book a call"}
          {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>

      {serverError && (
        <p className="text-sm text-red-400/90">{serverError}</p>
      )}
    </form>
  );
}
