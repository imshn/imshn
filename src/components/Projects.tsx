
import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample project data
const projects = [
  {
    id: 1,
    title: "SaaS Analytics MVP for Multi-Source Data",
    description: "Built an MVP with auth, billing-ready architecture, dashboard analytics, and API integrations to help a startup validate product-market fit quickly.",
    image: "https://www.upwork.com/att/download/portfolio/persons/uid/1337322672734584832/profile/projects/files/0acca8aa-3282-453e-8fd7-c3b5f7c75ef5",
    tags: ["SaaS MVP development", "Next.js", "Node.js", "PostgreSQL", "REST API"],
    category: "web",
    github: "https://github.com/imshn",
    demo: "https://multicryptoportfolio.vercel.app/"
  },
  {
    id: 2,
    title: "Backend Modernization for Growing SaaS",
    description: "Refactored backend modules, optimized database access paths, and improved API reliability to support higher usage with lower latency.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tags: ["scalable backend development", "API optimization", "Caching", "Monitoring"],
    category: "backend",
    github: "https://github.com/imshn",
    demo: "https://github.com/imshn"
  },
  {
    id: 3,
    title: "Founder Dashboard & Internal Tools",
    description: "Delivered fullstack internal tools with role-based access and workflow automation so product teams could ship and operate faster.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    tags: ["fullstack developer for startups", "React", "APIs", "RBAC"],
    category: "web",
    github: "https://github.com/imshn",
    demo: "https://github.com/imshn"
  }
];

// Filter categories
const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Development" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data Science" }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Filter projects based on selected category
  useEffect(() => {
    if (activeFilter === "all") {
      setAnimateCards(false);
      setTimeout(() => {
        setFilteredProjects(projects);
        setAnimateCards(true);
      }, 300);
    } else {
      setAnimateCards(false);
      setTimeout(() => {
        const filtered = projects.filter(project => project.category === activeFilter);
        setFilteredProjects(filtered);
        setAnimateCards(true);
      }, 300);
    }
  }, [activeFilter]);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const animatedElements = section.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((el) => {
        el.classList.add('opacity-0');
        observer.observe(el);
      });
    }

    return () => {
      if (section) {
        const animatedElements = section.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  // Initialize animation for project cards
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-0 w-96 h-96 rounded-full bg-blue-500/5 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/5 filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Process and Proof
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I follow a practical path from idea to MVP to scaling, then validate outcomes with measurable product and engineering results.
            </p>
          </div>

          <div id="process" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 animate-on-scroll" style={{ animationDelay: '0.15s' }}>
            {[
              {
                title: '1. Idea Validation',
                description: 'Define core user flow, map scope, and prioritize features that can validate the business quickly.'
              },
              {
                title: '2. MVP Development',
                description: 'Build the product fast with clean fullstack architecture, APIs, and launch-ready deployment setup.'
              },
              {
                title: '3. Scale and Optimize',
                description: 'Improve performance, reliability, and backend scalability based on real usage and product feedback.'
              }
            ].map((step) => (
              <div key={step.title} className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div id="proof" className="mb-12 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Proof of Execution</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { metric: '40% faster', label: 'API response time after backend optimization' },
                  { metric: '99.9% uptime', label: 'for deployed production services and APIs' },
                  { metric: '2-6 weeks', label: 'to launch focused MVPs for startup validation' },
                  { metric: '10+ integrations', label: 'delivered across third-party product ecosystems' }
                ].map((item) => (
                  <div key={item.metric} className="rounded-lg border border-border p-4 bg-background/40">
                    <div className="text-2xl font-bold mb-1">{item.metric}</div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-center mb-8">Selected Work</h3>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                className={cn(
                  "glass-card transition-all duration-300",
                  activeFilter === category.id ? "bg-primary text-white" : "hover:bg-secondary/50"
                )}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.id === "all" && <Filter className="h-4 w-4 mr-2" />}
                {category.label}
              </Button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={cn(
                  "glass-card rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl",
                  animateCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={`${project.title} - SaaS development project preview`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show more button */}
          <div className="mt-12 text-center w-full flex justify-center animate-on-scroll" style={{ animationDelay: '0.6s' }}>
            <a href='https://github.com/imshn' target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              <Button variant="outline" className="glass-card hover:bg-secondary/50">
                View My Projects
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
