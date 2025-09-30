import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const productFormSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  unit: z.string().min(1, "Please specify the unit"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  stock: z.coerce.number().min(1, "Stock must be at least 1"),
  harvestDate: z.string().min(1, "Harvest date is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  certifications: z.string().optional(),
  images: z
    .any()
    .refine((files) => files?.length >= 1, "At least one image is required")
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      "Max file size is 5MB"
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

const ProductForm = ({onSubmit, initialData = null, isLoading = false}) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      price: initialData?.price || "",
      unit: initialData?.unit || "kg",
      description: initialData?.description || "",
      stock: initialData?.stock || "",
      harvestDate: initialData?.harvestDate || "",
      expiryDate: initialData?.expiryDate || "",
      certifications: initialData?.certifications?.join(", ") || "",
      images: null,
    },
  });

  // Image compression utility
  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(resolve, "image/jpeg", quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  // Handle image selection and compression
  const handleImageChange = async (files) => {
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    const fileArray = Array.from(files);
    const previews = [];
    const compressedFiles = [];

    try {
      for (const file of fileArray) {
        // Create preview
        const previewUrl = URL.createObjectURL(file);
        previews.push({
          url: previewUrl,
          name: file.name,
          size: file.size,
        });

        // Compress if needed (mobile optimization)
        if (file.size > 1024 * 1024) {
          // 1MB
          const compressedFile = await compressImage(file);
          compressedFiles.push(
            new File([compressedFile], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
          );
        } else {
          compressedFiles.push(file);
        }
      }

      setImagePreviews(previews);

      // Create a new FileList-like object
      const dt = new DataTransfer();
      compressedFiles.forEach((file) => dt.items.add(file));

      form.setValue("images", dt.files);
      form.clearErrors("images");
    } catch (error) {
      console.error("Error processing images:", error);
      form.setError("images", {message: "Error processing images"});
    } finally {
      setIsCompressing(false);
    }
  };

  // Cleanup image previews
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [imagePreviews]);

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Add text fields
      Object.keys(data).forEach((key) => {
        if (key !== "images" && key !== "certifications") {
          formData.append(key, data[key]);
        }
      });

      // Process certifications
      if (data.certifications) {
        const certArray = data.certifications
          .split(",")
          .map((cert) => cert.trim())
          .filter(Boolean);
        formData.append("certifications", JSON.stringify(certArray));
      }

      // Add images
      if (data.images) {
        Array.from(data.images).forEach((file, index) => {
          formData.append(`image_${index}`, file);
        });
      }

      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);

    if (newPreviews.length === 0) {
      form.setValue("images", null);
    }
  };

  const categories = [
    {value: "vegetables", label: "🥕 Vegetables"},
    {value: "fruits", label: "🍎 Fruits"},
    {value: "grains", label: "🌾 Grains"},
    {value: "dairy", label: "🥛 Dairy"},
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/80 dark:bg-slate-800/90 border-border/50 dark:border-slate-700/50 backdrop-blur-xl shadow-2xl">
      <CardHeader className="bg-card dark:bg-slate-800/95 border-b border-border/50 dark:border-slate-700/50">
        <CardTitle className="flex items-center gap-2 text-foreground dark:text-slate-100">
          <span>🛒</span>
          {initialData ? "Edit Product" : "Add New Product"}
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-card dark:bg-slate-800/90 p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-foreground dark:text-slate-200">
                      Product Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Organic Tomatoes"
                        className="bg-background dark:bg-slate-700/50 border-border dark:border-slate-600 text-foreground dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-foreground dark:text-slate-200">
                      Category *
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-9 w-full rounded-md border border-input bg-background dark:bg-slate-700/50 dark:border-slate-600 px-3 py-1 text-sm shadow-sm transition-colors text-foreground dark:text-slate-100 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option
                          value=""
                          className="bg-background dark:bg-slate-700 text-foreground dark:text-slate-100"
                        >
                          Select category
                        </option>
                        {categories.map((cat) => (
                          <option
                            key={cat.value}
                            value={cat.value}
                            className="bg-background dark:bg-slate-700 text-foreground dark:text-slate-100"
                          >
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-foreground dark:text-slate-200">
                      Price (₹) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="bg-background dark:bg-slate-700/50 border-border dark:border-slate-600 text-foreground dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-foreground dark:text-slate-200">
                      Unit *
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-9 w-full rounded-md border border-input bg-background dark:bg-slate-700/50 dark:border-slate-600 px-3 py-1 text-sm shadow-sm transition-colors text-foreground dark:text-slate-100 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option
                          value="kg"
                          className="bg-background dark:bg-slate-700 text-foreground dark:text-slate-100"
                        >
                          kg
                        </option>
                        <option
                          value="gram"
                          className="bg-background dark:bg-slate-700 text-foreground dark:text-slate-100"
                        >
                          gram
                        </option>
                        <option
                          value="liter"
                          className="bg-background dark:bg-slate-700 text-foreground dark:text-slate-100"
                        >
                          liter
                        </option>
                        <option
                          value="piece"
                          className="bg-background dark:bg-slate-700 text-foreground dark:text-slate-100"
                        >
                          piece
                        </option>
                        <option
                          value="bunch"
                          className="bg-background dark:bg-slate-700 text-foreground dark:text-slate-100"
                        >
                          bunch
                        </option>
                        <option
                          value="dozen"
                          className="bg-background dark:bg-slate-700 text-foreground dark:text-slate-100"
                        >
                          dozen
                        </option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-foreground dark:text-slate-200">
                      Stock Quantity *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="100"
                        className="bg-background dark:bg-slate-700/50 border-border dark:border-slate-600 text-foreground dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-slate-200">
                    Description *
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Describe your product, growing methods, quality, etc."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background dark:bg-slate-700/50 dark:border-slate-600 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-slate-400 text-foreground dark:text-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="harvestDate"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-foreground dark:text-slate-200">
                      Harvest Date *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-background dark:bg-slate-700/50 border-border dark:border-slate-600 text-foreground dark:text-slate-100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryDate"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-foreground dark:text-slate-200">
                      Expiry Date *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-background dark:bg-slate-700/50 border-border dark:border-slate-600 text-foreground dark:text-slate-100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Certifications */}
            <FormField
              control={form.control}
              name="certifications"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-slate-200">
                    Certifications
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Organic, Non-GMO, Pesticide Free (comma-separated)"
                      className="bg-background dark:bg-slate-700/50 border-border dark:border-slate-600 text-foreground dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-muted-foreground dark:text-slate-400">
                    Enter certifications separated by commas
                  </FormDescription>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="images"
              render={({field: {onChange, ...field}}) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-slate-200">
                    Product Images *
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files)}
                        disabled={isCompressing}
                        className="cursor-pointer bg-background dark:bg-slate-700/50 border-border dark:border-slate-600 text-foreground dark:text-slate-100 file:bg-muted dark:file:bg-slate-600 file:text-foreground dark:file:text-slate-100 file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:text-sm"
                        {...field}
                      />

                      {isCompressing && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-slate-400">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-600 border-t-transparent"></div>
                          Compressing images...
                        </div>
                      )}

                      {/* Image Previews */}
                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview.url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-border dark:border-slate-600"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ✕
                              </button>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 rounded-b-lg">
                                {preview.name.slice(0, 20)}...
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="text-muted-foreground dark:text-slate-400">
                    Upload 1-5 high-quality images of your product. Images will
                    be compressed for optimal loading.
                  </FormDescription>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t border-border dark:border-slate-700">
              <Button
                type="submit"
                disabled={isLoading || isCompressing}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    {initialData ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    <span className="mr-2">{initialData ? "💾" : "🛒"}</span>
                    {initialData ? "Update Product" : "Add Product"}
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isLoading}
                className="border-border dark:border-slate-600 text-foreground dark:text-slate-200 hover:bg-muted dark:hover:bg-slate-700"
              >
                🔄 Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
