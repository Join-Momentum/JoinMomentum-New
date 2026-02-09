import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Contact = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: formRef, isVisible: formVisible } = useScrollReveal(0.2);

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:contact@joinmomentum.com?subject=${encodeURIComponent(
      formData.subject || "Inquiry from " + formData.name
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nOrganization: ${formData.organization}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-12">
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
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Initiate secure communication
          </motion.h1>

          <motion.div
            className="w-20 h-px bg-accent"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Contact Form & Info */}
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
                  Secure Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono-accent text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground font-body transition-colors duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-accent text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground font-body transition-colors duration-300"
                        placeholder="Your organization"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-accent text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground font-body transition-colors duration-300"
                      placeholder="your.email@organization.com"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-accent text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground font-body transition-colors duration-300"
                      placeholder="Inquiry subject"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-accent text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground font-mono-accent text-sm transition-colors duration-300 resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center px-10 py-4 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-400 hover:bg-accent hover:text-accent-foreground mt-4"
                  >
                    Initiate Contact
                  </button>
                </form>

                <p className="mt-8 text-muted-foreground/60 font-mono-accent text-xs">
                  All communications handled in accordance with applicable security policies.
                </p>
              </div>
            </motion.div>

            {/* Contact Info */}
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
                    href="mailto:contact@joinmomentum.com"
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-accent" />
                    <span className="font-body text-sm group-hover:underline">
                      contact@joinmomentum.com
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
                  <span className="font-body text-sm">
                    Within 24-48 business hours
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent mb-6">
                  Locations
                </h3>
                <div className="flex items-start gap-4 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm">
                    Washington D.C. • London • Singapore
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <div className="bg-card/50 border border-border p-6">
                  <p className="font-mono-accent text-xs text-muted-foreground leading-relaxed">
                    For sensitive inquiries requiring enhanced security protocols, 
                    please indicate in your initial message and we will provide 
                    appropriate secure communication channels.
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
