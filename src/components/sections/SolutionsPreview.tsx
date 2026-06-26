import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, ClipboardList, GraduationCap, Users, Rocket } from "lucide-react";


const solutions = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Capability Assessment & Roadmapping",
    description:
      "Structured assessment of current capability, risks, and gaps — delivering a prioritised roadmap, operating model, and clear near- and long-term recommendations.",
    path: "/solutions/capability-assessment-roadmapping",
  },
  {
    icon: GraduationCap,
    number: "02",
    title: "Training, Exercises & Capacity Development",
    description:
      "Role-based development that builds lasting institutional capability through leadership training, tabletop exercises, simulation-supported learning, and evaluation frameworks.",
    path: "/solutions/training-exercises-capacity-development",
  },
  {
    icon: Users,
    number: "03",
    title: "Operational Advisory & Embedded Support",
    description:
      "Embedded advisory roles across planning, readiness, intelligence and cyber operations, programme delivery, and crisis environments.",
    path: "/solutions/operational-advisory-embedded-support",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Service Deployment & Programme Delivery",
    description:
      "Standing up defined operational capability, delivering security services and programmes, integrating with existing teams, and transitioning to client ownership.",
    path: "/solutions/service-deployment-programme-delivery",
  },
];

const SolutionsPreview = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative py-20 md:py-32 bg-card border-y border-border">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <motion.div
            className="h-[1px] bg-accent"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 60 } : {}}
            transition={{ duration: 0.6 }}
          />
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Solutions
          </motion.span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            How we engage — four delivery models
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/solutions"
              className="group inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
            >
              Explore solutions
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Solutions grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <Link
                to={sol.path}
                className="group relative p-8 bg-background border border-border hover:border-accent transition-all duration-400 block"
              >
                <div className="flex items-start gap-5 mb-5">
                  <div className="flex-shrink-0 w-12 h-12 border border-border bg-secondary/50 flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                    <sol.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-mono-accent text-xs text-muted-foreground mt-1">
                    {sol.number}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-lg mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                  {sol.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {sol.description}
                </p>

                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsPreview;
