import { Helmet } from "react-helmet-async";
import Navbar from "@/components/site/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Dr. Saif | BioCoach</title>
        <meta name="description" content="Dr. Saif teaches biochemistry with a mechanism-first approach. Visual explanations, active recall, and exam-focused practice." />
        <link rel="canonical" href="/about" />
      </Helmet>
      <Navbar />
      <main className="container py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">Dr. Saif in one sentence</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-playfair">Detailed description</CardTitle>
            <CardDescription>Interests, vision, and teaching philosophy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              I help learners truly understand biochemical logic—how structure creates function and how pathways integrate into physiology and disease. My sessions emphasize concept maps, clinically relevant mechanisms, and exam-proven practice.
            </p>
            <ul className="list-disc pl-5 text-muted-foreground grid gap-1">
              <li>Mechanism-first, memory-second</li>
              <li>Active recall & spaced repetition</li>
              <li>Visual pathways and quick checks</li>
              <li>AI search for between-session clarity</li>
            </ul>
            <div className="flex gap-3">
              <Button asChild variant="hero"><Link to="/book">Book a Slot</Link></Button>
              <Button asChild variant="outline"><Link to="/ask">Use AI Search</Link></Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
