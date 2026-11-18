"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/imgbb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileForm() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  const [name, setName] = useState<string>();
  const [businessName, setBusinessName] = useState<string>();
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [saving, setSaving] = useState(false);

  if (isPending || !user) {
    return <div className="h-72 max-w-xl animate-pulse rounded-xl bg-muted/40" />;
  }

  const isVendor = user.role === "vendor";
  const currentName = name ?? user.name;
  const currentBusiness = businessName ?? user.businessName ?? "";
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (currentName.trim().length < 2) {
      toast.error("Enter your full name.");
      return;
    }
    if (isVendor && currentBusiness.trim().length < 2) {
      toast.error("Enter your business name.");
      return;
    }

    setSaving(true);
    try {
      let image: string | undefined;
      if (file) {
        try {
          image = await uploadImage(file);
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "Image upload failed.");
          return;
        }
      }

      const { error } = await authClient.updateUser({
        name: currentName.trim(),
        ...(image ? { image } : {}),
        ...(isVendor ? { businessName: currentBusiness.trim() } : {}),
      });

      if (error) {
        toast.error(error.message ?? "Could not update your profile.");
        return;
      }

      toast.success("Profile updated");
      setFile(null);
      setFileKey((k) => k + 1);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate font-medium">{user.name}</p>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" value={currentName} onChange={(e) => setName(e.target.value)} />
      </div>

      {isVendor && (
        <div className="space-y-1.5">
          <Label htmlFor="businessName">Business name</Label>
          <Input
            id="businessName"
            value={currentBusiness}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="image">Profile image</Label>
        <Input
          key={fileKey}
          id="image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Account role</p>
          <p className="font-medium capitalize">{user.role}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Plan</p>
          <p className="font-medium capitalize">{user.subscriptionPlan ?? "free"}</p>
        </div>
      </div>

      <Button type="submit" disabled={saving}>
        {saving && <Loader2 className="size-4 animate-spin" />}
        {saving ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}