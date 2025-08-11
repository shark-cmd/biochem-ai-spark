import { Helmet } from "react-helmet-async";
import Navbar from "@/components/site/Navbar";
import AmbientGlow from "@/components/site/AmbientGlow";
import heroImg from "@/assets/hero-biochem.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, FlaskConical, GraduationCap, HeartPulse, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "The Essence of Biochemistry",
    desc: "From atoms to pathways: build intuition before memorization.",
  },
  {
    icon: GraduationCap,
    title: "How to Master It",
    desc: "Active recall, spaced repetition, and mechanism-first learning.",
  },
  {
    icon: FlaskConical,
    title: "Why It Matters",
    desc: "Connect molecular events to health, disease, and innovation.",
  },
  {
    icon: HeartPulse,
    title: "Teaching Style",
    desc: "Clarity, visuals, and problem-led sessions with lab analogies.",
  },
];

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Dr. Saif Biochemistry Coaching | Book 1:1 Session</title>
        <meta name="description" content="Personalized biochemistry coaching. Book a 1:1 session to master pathways with mechanism-first teaching and a clear study plan." />
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <AmbientGlow>
            <div className="container grid md:grid-cols-2 gap-10 items-center py-16">
              <div className="space-y-6 animate-fade-in">
                <p className="eyebrow inline-flex items-center gap-2 text-muted-foreground">
                  <Sparkles className="opacity-80" /> Premium Biochemistry Coaching
                </p>
                <h1 className="display text-4xl md:text-6xl text-balance">
                  Learn Biochemistry with Confidence
                </h1>
                <p className="lead max-w-prose">
                  I’m Dr. Saif. I help students truly understand biochemistry—not just memorize it. Book a focused 1:1 session and get an exam‑ready study plan.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" variant="hero" className="hover-scale">
                    <Link to="/book">Book a Slot</Link>
                  </Button>
                  <Button asChild size="lg" variant="glass" className="hover-scale">
                    <Link to="/register">Register Now</Link>
                  </Button>
                </div>
              </div>
              <div className="relative rounded-xl border border-border shadow-lg overflow-hidden animate-scale-in">
                <img
                  src={heroImg}
                  alt="Biochemistry molecules gradient hero"
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </AmbientGlow>
          <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-20" aria-hidden />
        </section>

        {/* Feature cards */}
        <section className="container py-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="transition hover:shadow-lg animate-enter">
                <CardHeader>
                  <div className="h-10 w-10 rounded-md bg-gradient-hero" aria-hidden />
                  <CardTitle className="mt-3 flex items-center gap-2 font-playfair">
                    <f.icon /> {f.title}
                  </CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-12">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="font-playfair">What you'll get in your first session</CardTitle>
                <CardDescription>Clear plan, laser focus, and measurable progress from day one.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 grid gap-2 text-muted-foreground">
                  <li>Personalized roadmap based on your syllabus and exam date</li>
                  <li>Mechanism-first explanation of your top pain point</li>
                  <li>10-question micro‑assessment to lock in learning</li>
                  <li>Study routine you can actually follow in 30–45 minutes/day</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="hero">
                    <Link to="/book">Book your first slot</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Trusted results</CardTitle>
                <CardDescription>Outcomes students report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>“Enzyme kinetics finally clicked. From 48% to 76% in three weeks.”</p>
                <p>“Made pathways intuitive—no more blind memorization.”</p>
                <p className="text-xs">Spots are limited to keep sessions high‑quality.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t border-border mt-12">
        <div className="container py-6 text-sm text-muted-foreground flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} BioCoach with Saif</p>
          <nav className="flex gap-4">
            <Link className="story-link" to="/about">About</Link>
            <Link className="story-link" to="/book">Book</Link>
            <Link className="story-link" to="/register">Register</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
