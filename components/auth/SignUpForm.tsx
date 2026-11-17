"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Heart, ImagePlus, Loader2, Store, X } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/imgbb";
import { cn } from "@/lib/utils";
import { signUpSchema, type SignUpValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "@/components/auth/GoogleButton";

const ROLES = [
  { value: "customer", label: "Customer", hint: "I'm planning a wedding", icon: Heart },
  { value: "vendor", label: "Vendor", hint: "I offer wedding services", icon: Store },
] as const;

export function SignUpForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: "customer" },
  });

  const role = watch("role");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return toast.error("Please select an image file");
    if (f.size > 5 * 1024 * 1024) return toast.error("Image must be under 5MB");
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function removeFile() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  }

  async function onSubmit(values: SignUpValues) {
    let image: string | undefined;

    if (file) {
      try {
        image = await uploadImage(file);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Image upload failed");
        return;
      }
    }

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image,
      role: values.role,
      businessName: values.role === "vendor" ? values.businessName : undefined,
    });

    if (error) {
      toast.error(error.message || "Could not create your account");
      return;
    }

    toast.success("Account created successfully!");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Role */}
        <div className="space-y-1.5">
          <Label className="text-xs">I am a</Label>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setValue("role", r.value, { shouldValidate: true })}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors",
                  role === r.value
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/25",
                )}
                aria-pressed={role === r.value}
              >
                <r.icon className={cn("size-4", role === r.value ? "text-primary" : "text-muted-foreground")} />
                <span className="text-xs font-semibold">{r.label}</span>
                <span className="text-[10px] text-muted-foreground">{r.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs">Full Name</Label>
          <Input id="name" autoComplete="name" placeholder="Your full name" {...register("name")} />
          {errors.name && <p className="text-[11px] text-destructive">{errors.name.message}</p>}
        </div>

        {role === "vendor" && (
          <div className="space-y-1.5">
            <Label htmlFor="businessName" className="text-xs">Business Name</Label>
            <Input id="businessName" placeholder="e.g. Golden Hour Studio" {...register("businessName")} />
            {errors.businessName && <p className="text-[11px] text-destructive">{errors.businessName.message}</p>}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-[11px] text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min 6 chars, upper & lower case"
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p className="text-[11px] text-destructive">{errors.password.message}</p>}
        </div>

        {/* Profile image */}
        <div className="space-y-1.5">
          <Label className="text-xs">Profile Image (optional)</Label>
          {preview ? (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="size-14 rounded-full border border-white/10 object-cover" />
              <Button type="button" variant="ghost" size="sm" onClick={removeFile} className="h-8 gap-1 text-xs">
                <X className="size-3.5" /> Remove
              </Button>
            </div>
          ) : (
            <label
              htmlFor="image"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-white/15 p-3 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <ImagePlus className="size-5" />
              Click to upload (max 5MB)
            </label>
          )}
          <input id="image" type="file" accept="image/*" onChange={onPickFile} className="sr-only" />
        </div>

        <Button type="submit" disabled={isSubmitting} className="h-10 w-full text-xs shadow-[0_0_20px_-4px] shadow-primary/70">
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
        <div className="h-px flex-1 bg-white/10" />
        or
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <GoogleButton label="Sign up with Google" />

      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:text-primary/80">
          Sign in
        </Link>
      </p>
    </div>
  );
}