"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  LeadSchema,
  type Lead,
  PAIN_POINT_OPTIONS,
  BUDGET_OPTIONS,
} from "@/lib/schemas";
import { Button } from "./ui/button";
import { Input, Textarea } from "./ui/input";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Lead>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      companyWebsite: "",
      painPoints: [],
      message: "",
      _hp: "",
    },
  });

  const selectedPainPoints = watch("painPoints") ?? [];
  const selectedBudget = watch("budget");

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
          We&apos;ll reply within one business day. Sending you over to pick a
          time&hellip;
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Company"
          placeholder="Acme Co."
          autoComplete="organization"
          {...register("company")}
          error={errors.company?.message}
        />
        <Input
          label="Company website"
          type="url"
          placeholder="https://acme.com"
          {...register("companyWebsite")}
          error={errors.companyWebsite?.message}
        />
      </div>

      {/* Pain points */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium tracking-wide text-white/70">
          Main challenges
        </span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PAIN_POINT_OPTIONS.map((point) => {
            const checked = selectedPainPoints.includes(point);
            return (
              <label
                key={point}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-xs transition-colors ${
                  checked
                    ? "border-white/30 bg-white/[0.08] text-white"
                    : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/70"
                }`}
              >
                <input
                  type="checkbox"
                  value={point}
                  {...register("painPoints")}
                  className="sr-only"
                />
                <span
                  className={`h-3.5 w-3.5 shrink-0 rounded-sm border transition-colors ${
                    checked ? "border-white/50 bg-white/20" : "border-white/20"
                  }`}
                />
                {point}
              </label>
            );
          })}
        </div>
        {errors.painPoints && (
          <span className="text-xs text-red-400/90">
            {errors.painPoints.message}
          </span>
        )}
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium tracking-wide text-white/70">
          Monthly budget
        </span>
        <div className="flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`cursor-pointer rounded-lg border px-3.5 py-2 text-xs transition-colors ${
                selectedBudget === opt.value
                  ? "border-white/30 bg-white/[0.08] text-white"
                  : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/70"
              }`}
            >
              <input
                type="radio"
                value={opt.value}
                {...register("budget")}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.budget && (
          <span className="text-xs text-red-400/90">{errors.budget.message}</span>
        )}
      </div>

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
          <input type="text" tabIndex={-1} autoComplete="off" {...register("_hp")} />
        </label>
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/45">
          Or email us directly at{" "}
          <a
            href="mailto:elvis@netbiz.cloud"
            className="underline underline-offset-4 hover:text-white"
          >
            elvis@netbiz.cloud
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
