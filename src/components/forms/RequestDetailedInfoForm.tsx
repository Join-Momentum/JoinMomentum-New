import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Schema ──────────────────────────────────────────────────────────────────

const schema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    organisation: z.string().min(1, "Organisation is required"),
    orgType: z.enum(["organisation", "agency", "government_department", "other"], {
      errorMap: () => ({ message: "Please select an organisation type" }),
    }),
    role: z.string().min(1, "Role / title is required"),
    region: z.string().min(1, "Region is required"),
    requestType: z.enum(
      ["detailed_information_pricing", "ask_to_be_contacted", "request_scoping_call"],
      { errorMap: () => ({ message: "Please select a request type" }) }
    ),
    deliveryPreference: z.string().optional(),
    participantNumbers: z.string().optional(),
    preferredTiming: z.string().optional(),
    workEmail: z
      .string()
      .min(1, "Work email is required")
      .email("Please enter a valid email address"),
    phone: z.string().optional(),
    message: z.string().optional(),
    consent: z
      .boolean()
      .refine((v) => v === true, "You must confirm consent to submit this form"),
    _honeypot: z.string().max(0, ""),
  })
  .superRefine((data, ctx) => {
    if (
      data.requestType === "ask_to_be_contacted" &&
      (!data.phone || data.phone.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number is required when requesting to be contacted",
        path: ["phone"],
      });
    }
  });

type FormValues = z.infer<typeof schema>;

// ─── Sub-components ───────────────────────────────────────────────────────────

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
    {required && <span className="text-accent ml-0.5" aria-hidden="true">*</span>}
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

// ─── Success state ────────────────────────────────────────────────────────────

const SuccessState = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center py-16"
  >
    <div className="w-14 h-14 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center mx-auto mb-6">
      <CheckCircle2 className="w-7 h-7 text-accent" />
    </div>
    <h3 className="font-heading font-bold text-xl mb-3">Enquiry received</h3>
    <p className="font-body text-muted-foreground leading-relaxed max-w-md mx-auto">
      Thank you. A member of the Join Momentum team will respond through a confidential channel.
    </p>
  </motion.div>
);

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  listingSlug?: string;
  defaultRequestType?: "detailed_information_pricing" | "ask_to_be_contacted" | "request_scoping_call";
}

const RequestDetailedInfoForm = ({
  listingSlug = "cyber-threat-intelligence-portfolio-simulation",
  defaultRequestType = "detailed_information_pricing",
}: Props) => {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      requestType: defaultRequestType,
      consent: false,
      _honeypot: "",
    },
  });

  const requestType = watch("requestType");
  const phoneRequired = requestType === "ask_to_be_contacted";

  const onSubmit = async (data: FormValues) => {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/marketplace-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          listing: listingSlug,
          _honeypot: undefined,
        }),
      });
      if (res.ok) {
        setSubmitState("success");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  if (submitState === "success") return <SuccessState />;

  const requestTypeOptions = [
    {
      value: "detailed_information_pricing",
      label: "Detailed information & pricing",
      description: "Receive a tailored information pack covering scope, format, and pricing.",
    },
    {
      value: "ask_to_be_contacted",
      label: "Ask to be contacted",
      description: "A member of the team will reach out through a confidential channel.",
    },
    {
      value: "request_scoping_call",
      label: "Request a scoping call",
      description: "Schedule a brief call to discuss your requirements in confidence.",
    },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot — hidden from users and screen readers */}
      <div
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        tabIndex={-1}
      >
        <input type="text" autoComplete="off" tabIndex={-1} {...register("_honeypot")} />
      </div>

      <div className="space-y-8">
        {/* Row 1: Name + Organisation */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <FieldLabel htmlFor="fullName" required>Full name</FieldLabel>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-describedby={errors.fullName ? "err-fullName" : undefined}
              placeholder="Your full name"
              {...register("fullName")}
              className={`${inputBase} ${errors.fullName ? inputError : ""}`}
            />
            <FieldError id="err-fullName" message={errors.fullName?.message} />
          </div>
          <div>
            <FieldLabel htmlFor="organisation" required>Organisation</FieldLabel>
            <input
              id="organisation"
              type="text"
              autoComplete="organization"
              aria-required="true"
              aria-describedby={errors.organisation ? "err-organisation" : undefined}
              placeholder="Your organisation"
              {...register("organisation")}
              className={`${inputBase} ${errors.organisation ? inputError : ""}`}
            />
            <FieldError id="err-organisation" message={errors.organisation?.message} />
          </div>
        </div>

        {/* Row 2: Org type + Role */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <FieldLabel htmlFor="orgType" required>Organisation type</FieldLabel>
            <select
              id="orgType"
              aria-required="true"
              aria-describedby={errors.orgType ? "err-orgType" : undefined}
              {...register("orgType")}
              className={`${inputBase} cursor-pointer ${errors.orgType ? inputError : ""}`}
              defaultValue=""
            >
              <option value="" disabled className="bg-card text-muted-foreground">
                Select type
              </option>
              <option value="organisation" className="bg-card text-foreground">Organisation</option>
              <option value="agency" className="bg-card text-foreground">Agency</option>
              <option value="government_department" className="bg-card text-foreground">Government department</option>
              <option value="other" className="bg-card text-foreground">Other</option>
            </select>
            <FieldError id="err-orgType" message={errors.orgType?.message} />
          </div>
          <div>
            <FieldLabel htmlFor="role" required>Role / title</FieldLabel>
            <input
              id="role"
              type="text"
              aria-required="true"
              aria-describedby={errors.role ? "err-role" : undefined}
              placeholder="Your role or title"
              {...register("role")}
              className={`${inputBase} ${errors.role ? inputError : ""}`}
            />
            <FieldError id="err-role" message={errors.role?.message} />
          </div>
        </div>

        {/* Row 3: Region */}
        <div>
          <FieldLabel htmlFor="region" required>Region</FieldLabel>
          <input
            id="region"
            type="text"
            aria-required="true"
            aria-describedby={errors.region ? "err-region" : undefined}
            placeholder="Country or region"
            {...register("region")}
            className={`${inputBase} ${errors.region ? inputError : ""}`}
          />
          <FieldError id="err-region" message={errors.region?.message} />
        </div>

        {/* Request type — styled radio cards */}
        <div>
          <FieldLabel htmlFor="requestType-0" required>What are you requesting?</FieldLabel>
          {errors.requestType && (
            <FieldError id="err-requestType" message={errors.requestType?.message} />
          )}
          <div className="space-y-3 mt-1" role="radiogroup" aria-label="Request type">
            {requestTypeOptions.map((opt, i) => (
              <label
                key={opt.value}
                htmlFor={`requestType-${i}`}
                className={`flex items-start gap-4 p-4 border cursor-pointer transition-all duration-200 group ${
                  requestType === opt.value
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <input
                    id={`requestType-${i}`}
                    type="radio"
                    value={opt.value}
                    {...register("requestType")}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      requestType === opt.value ? "border-accent" : "border-border"
                    }`}
                  >
                    {requestType === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    )}
                  </div>
                </div>
                <div>
                  <p className={`font-heading font-semibold text-sm transition-colors duration-200 ${requestType === opt.value ? "text-accent" : "text-foreground"}`}>
                    {opt.label}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Optional fields: Delivery preference + Participant numbers + Timing */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <FieldLabel htmlFor="deliveryPreference">Delivery preference</FieldLabel>
            <select
              id="deliveryPreference"
              {...register("deliveryPreference")}
              className={`${inputBase} cursor-pointer`}
            >
              <option value="" className="bg-card text-muted-foreground">Not sure</option>
              <option value="online" className="bg-card text-foreground">Online</option>
              <option value="in_person" className="bg-card text-foreground">In-person</option>
              <option value="location_specific" className="bg-card text-foreground">Location-specific</option>
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="participantNumbers">Indicative participants</FieldLabel>
            <select
              id="participantNumbers"
              {...register("participantNumbers")}
              className={`${inputBase} cursor-pointer`}
            >
              <option value="" className="bg-card text-muted-foreground">Not sure</option>
              <option value="1-10" className="bg-card text-foreground">1–10</option>
              <option value="11-25" className="bg-card text-foreground">11–25</option>
              <option value="26-50" className="bg-card text-foreground">26–50</option>
              <option value="50+" className="bg-card text-foreground">50+</option>
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="preferredTiming">Preferred timing</FieldLabel>
            <select
              id="preferredTiming"
              {...register("preferredTiming")}
              className={`${inputBase} cursor-pointer`}
            >
              <option value="" className="bg-card text-muted-foreground">Exploratory</option>
              <option value="this_quarter" className="bg-card text-foreground">This quarter</option>
              <option value="next_quarter" className="bg-card text-foreground">Next quarter</option>
              <option value="exploratory" className="bg-card text-foreground">Exploratory</option>
            </select>
          </div>
        </div>

        {/* Work email */}
        <div>
          <FieldLabel htmlFor="workEmail" required>Work email</FieldLabel>
          <input
            id="workEmail"
            type="email"
            autoComplete="work email"
            aria-required="true"
            aria-describedby={errors.workEmail ? "err-workEmail" : undefined}
            placeholder="your@organisation.com"
            {...register("workEmail")}
            className={`${inputBase} ${errors.workEmail ? inputError : ""}`}
          />
          <FieldError id="err-workEmail" message={errors.workEmail?.message} />
        </div>

        {/* Conditional phone */}
        <div aria-live="polite">
          <FieldLabel htmlFor="phone" required={phoneRequired}>
            Phone{phoneRequired ? "" : " (optional)"}
          </FieldLabel>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-required={phoneRequired}
            aria-describedby={errors.phone ? "err-phone" : undefined}
            placeholder={phoneRequired ? "Required for callback" : "Optional"}
            {...register("phone")}
            className={`${inputBase} ${errors.phone ? inputError : ""}`}
          />
          <FieldError id="err-phone" message={errors.phone?.message} />
        </div>

        {/* Message */}
        <div>
          <FieldLabel htmlFor="message">Message (optional)</FieldLabel>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us anything that will help us scope a response."
            {...register("message")}
            className={`${inputBase} resize-none`}
          />
        </div>

        {/* Consent */}
        <div>
          <label
            htmlFor="consent"
            className={`flex items-start gap-4 cursor-pointer group ${errors.consent ? "text-accent/70" : ""}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <input
                id="consent"
                type="checkbox"
                aria-describedby={errors.consent ? "err-consent" : undefined}
                {...register("consent")}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 ${
                  errors.consent ? "border-accent/70" : "border-border group-hover:border-accent/50"
                }`}
              >
                {watch("consent") && (
                  <svg
                    className="w-2.5 h-2.5 text-accent"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 5.5L4 8L8.5 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="font-body text-sm text-muted-foreground leading-relaxed">
              I confirm the information provided is accurate and that I am authorised to contact
              Join Momentum on behalf of the organisation named.{" "}
              <Link
                to="/privacy-policy"
                className="text-accent hover:underline"
                target="_blank"
              >
                Privacy Policy
              </Link>
              . <span className="text-accent">*</span>
            </span>
          </label>
          <FieldError id="err-consent" message={errors.consent?.message} />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitState === "loading"}
            className="group inline-flex items-center gap-3 px-10 py-4 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitState === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Request detailed information"
            )}
          </button>
        </div>

        {/* Error state */}
        <AnimatePresence>
          {submitState === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-body text-sm text-accent/80"
            >
              There was a problem submitting your enquiry. Please try again or contact us directly
              at{" "}
              <a
                href="mailto:marketplace@joinmomentum.com"
                className="underline hover:text-accent"
              >
                marketplace@joinmomentum.com
              </a>
              .
            </motion.p>
          )}
        </AnimatePresence>

        {/* Compliance text */}
        <p className="font-body text-xs text-muted-foreground/60 leading-relaxed border-t border-border pt-6">
          By submitting this form you confirm that the information provided is accurate and that
          you are authorised to contact Join Momentum on behalf of the organisation named. Join
          Momentum processes enquiry data in accordance with applicable data protection law and
          our{" "}
          <Link to="/privacy-policy" className="hover:text-accent transition-colors">
            Privacy Policy
          </Link>
          . Enquiries are handled through structured, confidential channels.
        </p>
      </div>
    </form>
  );
};

export default RequestDetailedInfoForm;
