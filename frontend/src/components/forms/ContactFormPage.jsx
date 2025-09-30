import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must be less than 1000 characters"),
  priority: z.string().min(1, "Please select priority level"),
});

const ContactFormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: {errors, touchedFields},
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const watchedFields = watch();

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Contact Form Data:", data);

      setSubmitResult({
        type: "success",
        message:
          "Message sent successfully! We'll get back to you within 24 hours. 🎉",
      });

      reset();
    } catch (error) {
      setSubmitResult({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    {value: "general", label: "General Inquiry"},
    {value: "technical", label: "Technical Support"},
    {value: "partnership", label: "Partnership"},
    {value: "feedback", label: "Feedback"},
    {value: "complaint", label: "Complaint"},
  ];

  const priorities = [
    {value: "low", label: "Low"},
    {value: "medium", label: "Medium"},
    {value: "high", label: "High"},
    {value: "urgent", label: "Urgent"},
  ];

  return (
    <div className="relative z-20 pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="backdrop-blur-xl bg-card/70 border-border/50 shadow-2xl mb-6 inline-block rounded-2xl border">
            <div className="p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 drop-shadow-lg">
                📧 Contact Us
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you. Send us
                a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Result */}
        {submitResult && (
          <div className="mb-8 flex justify-center">
            <Card
              className={`max-w-md ${
                submitResult.type === "success"
                  ? "border-green-200 bg-green-50/80 dark:bg-green-950/30"
                  : "border-red-200 bg-red-50/80 dark:bg-red-950/30"
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

        {/* Contact Form */}
        <Card className="backdrop-blur-xl bg-card/70 border-border/50 shadow-2xl border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📧</span>
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input
                    {...register("name")}
                    placeholder="Enter your full name"
                    className={cn(
                      "transition-all duration-200",
                      errors.name && "border-red-500",
                      touchedFields.name && !errors.name && "border-green-500"
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address *</label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="your.email@example.com"
                    className={cn(
                      "transition-all duration-200",
                      errors.email && "border-red-500",
                      touchedFields.email && !errors.email && "border-green-500"
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number *</label>
                  <Input
                    {...register("phone")}
                    type="tel"
                    placeholder="10-digit mobile number"
                    className={cn(
                      "transition-all duration-200",
                      errors.phone && "border-red-500",
                      touchedFields.phone && !errors.phone && "border-green-500"
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <select
                    {...register("category")}
                    className={cn(
                      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      errors.category && "border-red-500",
                      touchedFields.category &&
                        !errors.category &&
                        "border-green-500"
                    )}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject *</label>
                  <Input
                    {...register("subject")}
                    placeholder="Brief subject of your message"
                    className={cn(
                      "transition-all duration-200",
                      errors.subject && "border-red-500",
                      touchedFields.subject &&
                        !errors.subject &&
                        "border-green-500"
                    )}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority *</label>
                  <select
                    {...register("priority")}
                    className={cn(
                      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      errors.priority && "border-red-500",
                      touchedFields.priority &&
                        !errors.priority &&
                        "border-green-500"
                    )}
                  >
                    <option value="">Select priority</option>
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                  {errors.priority && (
                    <p className="text-red-500 text-sm">
                      {errors.priority.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Message *</label>
                <textarea
                  {...register("message")}
                  placeholder="Please provide detailed information about your inquiry..."
                  rows={6}
                  className={cn(
                    "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all duration-200",
                    errors.message && "border-red-500",
                    touchedFields.message &&
                      !errors.message &&
                      "border-green-500"
                  )}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{errors.message?.message}</span>
                  <span>{watchedFields.message?.length || 0}/1000</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <span className="mr-2">🔄</span>
                  Clear Form
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📧</span>
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "📧",
              title: "Email",
              content: "support@agrochain.com",
              description: "Send us an email anytime",
            },
            {
              icon: "📞",
              title: "Phone",
              content: "+91 98765 43210",
              description: "Mon-Fri from 8am to 5pm",
            },
            {
              icon: "📍",
              title: "Office",
              content: "Mumbai, Maharashtra",
              description: "Come say hello at our HQ",
            },
          ].map((contact, index) => (
            <Card
              key={index}
              className="backdrop-blur-lg bg-card/50 border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{contact.icon}</div>
                <h3 className="font-semibold mb-2">{contact.title}</h3>
                <p className="font-medium text-emerald-600 mb-1">
                  {contact.content}
                </p>
                <p className="text-sm text-muted-foreground">
                  {contact.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactFormPage;
