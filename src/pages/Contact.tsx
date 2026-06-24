import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Clock, CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

// ── Schema ────────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  organisation: z.string().min(1, "Organisation is required"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  role: z.string().optional(),
  region: z.string().optional(),
  areaOfInterest: z.string().optional(),
  message: z.string().min(10, "Please provide a message of at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

// ── Static data ───────────────────────────────────────────────────────────────

const areasOfInterest = [
  "Communications & Information Systems",
  "Cyber & Information Defence",
  "Intelligence & Surveillance Systems",
  "Emerging Technology Integration",
  "Other / General Inquiry",
];

const regions = [
  "North America",
  "Europe",
  "Middle East & Africa",
  "Asia-Pacific",
  "Other",
];

// ── Sub-components ─────────────────────────────────────────────────────────────

const FieldLabel = ({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    className="block font-mono-accent text-xs uppercase tracking-wider text-muted-foreground mb-2"
  >
    {children}
    {required && (
      <span className="text-accent ml-0.5" aria-hidden="true">
        *
      </span>
    )}
  </label>
);

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} role="alert" className="font-body text-xs text-accent mt-1.5">
      {message}
    </p>
  ) : null;

const inputBase =
  "w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground font-body text-sm transition-colors duration-300 placeholder:text-muted-foreground/60";

const inputError = "border-accent/70";

// ── Success state ─────────────────────────────────────────────────────────────

const SuccessState = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="py-16 text-center"
  >
    <div className="w-14 h-14 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center mx-auto mb-6">
      <CheckCircle2 className="w-7 h-7 text-accent" />
    </div>
    <h3 className="font-heading font-bold text-xl mb-3">Enquiry received</h3>
    <p className="font-body text-muted-foreground leading-relaxed max-w-md mx-auto">
      Thank you for reaching out. A member of the Join Momentum team will respond within 24–48
      business hours through a confidential channel. Check your inbox for a confirmation.
    </p>
  </motion.div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const Contact = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: formRef, isVisible: formVisible } = useScrollReveal(0.2);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitState(res.ok ? "success" : "error");
    } catch {
      setSubmitState("error");
    }
  };

  const scrollToFirstError = (fieldErrors: Record<string, unknown>) => {
    const fieldOrder = ["name", "organisation", "email", "message"] as const;
    for (const field of fieldOrder) {
      if (!fieldErrors[field]) continue;
      const el = document.getElementById(field);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: "smooth" });
        el.focus({ preventScroll: true });
        break;
      }
    }
  };

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Contact
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get in touch
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-body leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            For confidential discussions regarding capability needs, operational challenges, or
            potential engagements, please get in touch.
          </motion.p>

          <motion.div
            className="w-20 h-px bg-accent mt-8"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Form & info */}
      <section ref={formRef} className="pb-28 md:pb-40 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 md:gap-16">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              animate={formVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="bg-card border border-border p-8 md:p-12">
                <h2 className="font-mono-accent text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
                  Request a Capability Discussion
                </h2>

                {submitState === "success" ? (
                  <SuccessState />
                ) : (
                  <form onSubmit={handleSubmit(onSubmit, scrollToFirstError)} noValidate className="space-y-6">
                    {/* Honeypot */}
                    <div
                      aria-hidden="true"
                      className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                      tabIndex={-1}
                    >
                      <input type="text" name="_honeypot" autoComplete="off" tabIndex={-1} />
                    </div>

                    {/* Name + Organisation */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <FieldLabel htmlFor="name" required>Name</FieldLabel>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your name"
                          {...register("name")}
                          className={`${inputBase} ${errors.name ? inputError : ""}`}
                          aria-describedby={errors.name ? "err-name" : undefined}
                        />
                        <FieldError id="err-name" message={errors.name?.message} />
                      </div>
                      <div>
                        <FieldLabel htmlFor="organisation" required>Organisation</FieldLabel>
                        <input
                          id="organisation"
                          type="text"
                          autoComplete="organization"
                          placeholder="Your organisation"
                          {...register("organisation")}
                          className={`${inputBase} ${errors.organisation ? inputError : ""}`}
                          aria-describedby={errors.organisation ? "err-organisation" : undefined}
                        />
                        <FieldError id="err-organisation" message={errors.organisation?.message} />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <FieldLabel htmlFor="email" required>Email address</FieldLabel>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="your@organisation.com"
                        {...register("email")}
                        className={`${inputBase} ${errors.email ? inputError : ""}`}
                        aria-describedby={errors.email ? "err-email" : undefined}
                      />
                      <FieldError id="err-email" message={errors.email?.message} />
                    </div>

                    {/* Role + Region */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <FieldLabel htmlFor="role">Role</FieldLabel>
                        <input
                          id="role"
                          type="text"
                          placeholder="Your role or position"
                          {...register("role")}
                          className={inputBase}
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor="region">Region</FieldLabel>
                        <select
                          id="region"
                          {...register("region")}
                          className={`${inputBase} cursor-pointer`}
                        >
                          <option value="" className="bg-card text-muted-foreground">
                            Select region
                          </option>
                          {regions.map((r) => (
                            <option key={r} value={r} className="bg-card text-foreground">
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Area of interest */}
                    <div>
                      <FieldLabel htmlFor="areaOfInterest">Area of Interest</FieldLabel>
                      <select
                        id="areaOfInterest"
                        {...register("areaOfInterest")}
                        className={`${inputBase} cursor-pointer`}
                      >
                        <option value="" className="bg-card text-muted-foreground">
                          Select area of interest
                        </option>
                        {areasOfInterest.map((a) => (
                          <option key={a} value={a} className="bg-card text-foreground">
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <FieldLabel htmlFor="message" required>Message</FieldLabel>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us about your capability needs or challenges…"
                        {...register("message")}
                        className={`${inputBase} resize-none ${errors.message ? inputError : ""}`}
                        aria-describedby={errors.message ? "err-message" : undefined}
                      />
                      <FieldError id="err-message" message={errors.message?.message} />
                    </div>

                    {/* Validation hint — only after first submit attempt */}
                    <AnimatePresence>
                      {isSubmitted && Object.keys(errors).length > 0 && submitState !== "loading" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-body text-xs text-accent/80"
                          role="alert"
                        >
                          Please complete all required fields above before submitting.
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="group inline-flex items-center gap-3 px-10 py-4 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                      {submitState === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Request a Capability Discussion"
                      )}
                    </button>

                    {/* Error */}
                    <AnimatePresence>
                      {submitState === "error" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-body text-sm text-accent/80"
                        >
                          There was a problem sending your message. Please try again or email us
                          directly at{" "}
                          <a
                            href="mailto:hello@joinmomentum.io"
                            className="underline hover:text-accent"
                          >
                            hello@joinmomentum.io
                          </a>
                          .
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <p className="font-body text-xs text-muted-foreground/60 leading-relaxed border-t border-border pt-6">
                      All communications handled with appropriate confidentiality.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={formVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div>
                <h3 className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent mb-6">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@joinmomentum.io"
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-accent" />
                    <span className="font-body text-sm group-hover:underline">
                      hello@joinmomentum.io
                    </span>
                  </a>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent mb-6">
                  Response Time
                </h3>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="font-body text-sm">Within 24–48 business hours</span>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <div className="bg-card/50 border border-border p-6">
                  <p className="font-mono-accent text-xs text-muted-foreground leading-relaxed">
                    For inquiries requiring enhanced security protocols, please indicate in your
                    message and we will provide appropriate secure communication channels.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
