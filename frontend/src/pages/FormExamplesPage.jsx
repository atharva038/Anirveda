import {useState} from "react";
import ProductForm from "../components/forms/ProductForm";
import FarmerRegistrationForm from "../components/forms/FarmerRegistrationForm";
import ContactForm from "../components/forms/ContactFormPage";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const FormExamplesPage = () => {
  const [activeForm, setActiveForm] = useState("product");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleProductSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log form data for demonstration
      console.log("Product Form Data:", {
        textFields: Object.fromEntries(
          [...formData.entries()].filter(([key]) => !key.startsWith("image_"))
        ),
        images: [...formData.entries()].filter(([key]) =>
          key.startsWith("image_")
        ).length,
      });

      setSubmitResult({
        type: "success",
        message: "Product added successfully! 🎉",
      });
    } catch (error) {
      setSubmitResult({
        type: "error",
        message: "Failed to add product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFarmerSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Log form data for demonstration
      console.log("Farmer Registration Data:", {
        textFields: Object.fromEntries(
          [...formData.entries()].filter(
            ([key]) =>
              !["aadharDocument", "landDocument", "farmPhoto"].includes(key)
          )
        ),
        documents: [...formData.entries()].filter(([key]) =>
          ["aadharDocument", "landDocument", "farmPhoto"].includes(key)
        ).length,
      });

      setSubmitResult({
        type: "success",
        message:
          "Registration submitted successfully! We'll review your application within 24-48 hours. 🎉",
      });
    } catch (error) {
      setSubmitResult({
        type: "error",
        message: "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log form data for demonstration
      console.log("Contact Form Data:", data);

      setSubmitResult({
        type: "success",
        message:
          "Message sent successfully! We'll get back to you within 24 hours. 🎉",
      });
    } catch (error) {
      setSubmitResult({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const forms = [
    {
      id: "product",
      name: "Product Form",
      icon: "🛒",
      title: "Product Management Form",
      badge: "React Hook Form + Zod",
      description:
        "Complete product form with image upload, compression, validation, and mobile optimization. Features real-time validation, file preview, and FormData submission.",
    },
    {
      id: "farmer",
      name: "Farmer Registration",
      icon: "👨‍🌾",
      title: "Farmer Registration Form",
      badge: "Multi-Step + File Upload",
      description:
        "Multi-step registration form with document upload, progress tracking, and comprehensive validation. Features step-by-step validation, file previews, and progress indicators.",
    },
    {
      id: "contact",
      name: "Contact Form",
      icon: "📧",
      title: "Contact & Support Form",
      badge: "Validation + Categories",
      description:
        "Professional contact form with categorization, priority levels, and comprehensive validation. Features real-time validation, character counting, and responsive design.",
    },
  ];

  return (
    <div className="relative z-20 pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-zinc-900/50 border-border/50 dark:border-zinc-700/60 shadow-2xl mb-6 inline-block rounded-2xl border transition-colors">
            <div className="p-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 drop-shadow-lg">
                📝 Form Examples
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                Comprehensive React forms using react-hook-form with Shadcn
                components, validation, file uploads, and mobile optimization.
              </p>
            </div>
          </div>
        </div>

        {/* Form Selection */}
        <div className="flex justify-center mb-8">
          <div className="backdrop-blur-xl bg-white/55 dark:bg-zinc-900/55 supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-zinc-900/40 border-border/50 dark:border-zinc-700/60 shadow-lg rounded-xl border p-2 inline-flex flex-wrap gap-1 transition-colors">
            {forms.map((form) => (
              <Button
                key={form.id}
                variant={activeForm === form.id ? "default" : "ghost"}
                onClick={() => {
                  setActiveForm(form.id);
                  setSubmitResult(null);
                }}
                className={`transition-all duration-300 ${
                  activeForm === form.id
                    ? "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
                    : "hover:bg-muted/70 dark:hover:bg-zinc-700/70 text-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                <span className="mr-2">{form.icon}</span>
                {form.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Submit Result */}
        {submitResult && (
          <div className="mb-8 flex justify-center">
            <Card
              className={`max-w-md transition-all duration-300 ${
                submitResult.type === "success"
                  ? "border-green-200 bg-green-50/90 dark:border-green-800 dark:bg-green-950/40"
                  : "border-red-200 bg-red-50/90 dark:border-red-800 dark:bg-red-950/40"
              }`}
            >
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">
                    {submitResult.type === "success" ? "✅" : "❌"}
                  </div>
                  <p
                    className={`font-medium ${
                      submitResult.type === "success"
                        ? "text-green-800 dark:text-green-300"
                        : "text-red-800 dark:text-red-300"
                    }`}
                  >
                    {submitResult.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Form Content */}
        <div className="backdrop-blur-xl bg-white/55 dark:bg-zinc-900/55 supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-zinc-900/40 border-border/50 dark:border-zinc-700/60 shadow-2xl rounded-2xl border p-6 transition-colors">
          {activeForm === "product" ? (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {forms.find((f) => f.id === "product").title}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                  >
                    {forms.find((f) => f.id === "product").badge}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  {forms.find((f) => f.id === "product").description}
                </p>
              </div>
              <ProductForm
                onSubmit={handleProductSubmit}
                isLoading={isSubmitting}
              />
            </div>
          ) : activeForm === "farmer" ? (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {forms.find((f) => f.id === "farmer").title}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                  >
                    {forms.find((f) => f.id === "farmer").badge}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  {forms.find((f) => f.id === "farmer").description}
                </p>
              </div>
              <FarmerRegistrationForm
                onSubmit={handleFarmerSubmit}
                isLoading={isSubmitting}
              />
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {forms.find((f) => f.id === "contact").title}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                  >
                    {forms.find((f) => f.id === "contact").badge}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  {forms.find((f) => f.id === "contact").description}
                </p>
              </div>
              <ContactForm
                onSubmit={handleContactSubmit}
                isLoading={isSubmitting}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormExamplesPage;
