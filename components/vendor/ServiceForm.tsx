"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import NativeSelect from "@/components/shared/NativeSelect";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/imgbb";
import { CATEGORIES, MAX_IMAGES } from "@/lib/service-constants";
import type { Service } from "@/types/service";

type Props = { service?: Service }; // service  Edit mode

export default function ServiceForm({ service }: Props) {
  const router = useRouter();
  const isEdit = !!service;

  const [serviceName, setServiceName] = useState(service?.serviceName ?? "");
  const [category, setCategory] = useState(service?.category ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [price, setPrice] = useState(service ? String(service.price) : "");
  const [location, setLocation] = useState(service?.location ?? "");
  const [images, setImages] = useState<string[]>(service?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;

    const room = MAX_IMAGES - images.length;
    if (room <= 0) return toast.error(`Maximum ${MAX_IMAGES} images allowed`);
    const picked = files.slice(0, room);
    if (files.length > room) toast.message(`Only ${room} more image(s) can be added`);

    setUploading(true);
    try {
      const urls = await Promise.all(picked.map((f) => uploadImage(f)));
      setImages((prev) => [...prev, ...urls]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // quick client check 
    if (serviceName.trim().length < 3) return toast.error("Service name must be at least 3 characters");
    if (!category) return toast.error("Please choose a category");
    if (description.trim().length < 10) return toast.error("Description must be at least 10 characters");
    if (!(Number(price) > 0)) return toast.error("Price must be greater than 0");
    if (location.trim().length < 2) return toast.error("Please enter a location");
    if (images.length < 1) return toast.error("Please upload at least one image");

    const body = {
      serviceName: serviceName.trim(),
      category,
      description: description.trim(),
      price: Number(price),
      location: location.trim(),
      images,
    };

    setSaving(true);
    try {
      if (isEdit) {
        await apiFetch(`/api/vendor/services/${service._id}`, { method: "PATCH", auth: true, body });
        toast.success("Service updated");
      } else {
        await apiFetch("/api/vendor/services", { method: "POST", auth: true, body });
        toast.success("Service submitted for admin approval");
      }
      router.push("/dashboard/vendor/services");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="serviceName">Service name</Label>
        <Input
          id="serviceName"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          maxLength={100}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <NativeSelect id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            type="number"
            min="1"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="e.g. Dhaka"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={2000}
        />
        <p className="text-muted-foreground text-xs">{description.length}/2000</p>
      </div>

      <div className="space-y-3">
        <Label>
          Images ({images.length}/{MAX_IMAGES})
        </Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((url, i) => (
            <div key={url} className="relative aspect-4/3 overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Service image ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setImages((p) => p.filter((u) => u !== url))}
                className="absolute top-2 right-2 rounded-md bg-black/60 p-1.5 text-white"
                aria-label="Remove image"
              >
                <Trash2 className="size-4" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                  Cover
                </span>
              )}
            </div>
          ))}

          {images.length < MAX_IMAGES && (
            <label className="text-muted-foreground hover:bg-muted/50 flex aspect-4/3 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-xs">
              {uploading ? <Loader2 className="size-5 animate-spin" /> : <UploadCloud className="size-5" />}
              {uploading ? "Uploading..." : "Add images"}
              <input type="file" accept="image/*" multiple hidden disabled={uploading} onChange={onFiles} />
            </label>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving || uploading}>
          {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isEdit ? "Save changes" : "Submit for approval"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
