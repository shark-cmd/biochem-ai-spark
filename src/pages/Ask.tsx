import { Helmet } from "react-helmet-async";
import Navbar from "@/components/site/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface QAItem { question: string; answer: string; time: number }

const knowledgeBase = [
  {
    title: "ATP and Energy Coupling",
    content: "ATP hydrolysis drives endergonic reactions via group transfer, not heat. Coupling often occurs through phosphorylated intermediates.",
    keywords: ["ATP", "energy", "hydrolysis", "coupling", "phosphate"],
  },
  {
    title: "Enzyme Kinetics (Michaelis–Menten)",
    content: "Vmax reflects catalytic capacity at saturation; Km approximates substrate affinity under certain assumptions. Lineweaver–Burk is error‑prone; prefer nonlinear fits.",
    keywords: ["enzyme", "kinetics", "vmax", "km", "michaelis"]
  },
  {
    title: "Acid–Base and Buffers",
    content: "Henderson–Hasselbalch relates pH to pKa and ratio of base to acid. Biological buffers stabilize pH around pKa with optimal capacity ±1 pH unit.",
    keywords: ["pH", "buffer", "pKa", "acid", "base"]
  },
  {
    title: "Metabolic Regulation",
    content: "Flux is regulated at irreversible steps using allostery and covalent modification; compartmentalization and energy charge coordinate pathways.",
    keywords: ["metabolism", "regulation", "allosteric", "flux", "pathway"]
  },
];

function searchKnowledge(q: string) {
  const tokens = q.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const scored = knowledgeBase.map((k) => {
    const score = k.keywords.reduce((s, kw) => (tokens.includes(kw.toLowerCase()) ? s + 2 : s), 0)
      + (k.content.toLowerCase().includes(tokens.join(" ")) ? 1 : 0);
    return { k, score };
  }).sort((a,b) => b.score - a.score);
  const top = scored[0]?.k;
  return top ? `${top.title}: ${top.content}` : "I couldn't find a direct match. Try rephrasing or ask more specifically (e.g., 'What controls glycolysis flux?').";
}

const SUGGESTIONS = [
  "What is ATP coupling?",
  "Explain Km vs Vmax simply",
  "Best buffer around pH 7.4",
  "How are pathways regulated?",
];

export default function Ask() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [history, setHistory] = useState<QAItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bio-ask-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bio-ask-history", JSON.stringify(history));
  }, [history]);

  const disabled = useMemo(() => q.trim().length === 0, [q]);

  const onAsk = () => {
    if (!q.trim()) return;
    const answer = searchKnowledge(q.trim());
    setA(answer);
    const item = { question: q.trim(), answer, time: Date.now() };
    setHistory((h) => [item, ...h].slice(0, 20));
    toast({ title: "Answer ready", description: "Based on local knowledge base (demo RAG)." });
  };

  const onUse = (s: string) => { setQ(s); };

  return (
    <>
      <Helmet>
        <title>Ask Anything – AI RAG (Demo) | BioCoach with Saif</title>
        <meta name="description" content="Ask biochemistry questions and get instant answers from a curated local knowledge base. Built to later connect to full Supabase RAG." />
        <link rel="canonical" href="/ask" />
      </Helmet>
      <Navbar />
      <main className="container py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Medical Biochemistry RAG Engine (Demo)</h1>
        <section className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Ask anything in Medical Biochemistry</CardTitle>
              <CardDescription>Type your question and get a concise, referenced-style answer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g., What does Km mean biologically?" onKeyDown={(e) => e.key === 'Enter' && onAsk()} />
                <Button onClick={onAsk} disabled={disabled}>Answer</Button>
              </div>
              {a && (
                <Card className="border-dashed">
                  <CardHeader>
                    <CardTitle>Answer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/90">{a}</p>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <Badge key={s} variant="secondary" className="cursor-pointer" onClick={() => onUse(s)}>
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>Your last 20 questions on this device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {history.length === 0 && (
                <p className="text-sm text-muted-foreground">No questions yet.</p>
              )}
              {history.map((h) => (
                <div key={h.time} className="space-y-1">
                  <p className="font-medium">{h.question}</p>
                  <p className="text-sm text-muted-foreground">{new Date(h.time).toLocaleString()}</p>
                </div>
              ))}
              {history.length > 0 && (
                <Button variant="outline" onClick={() => setHistory([])}>Clear history</Button>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
