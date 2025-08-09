import { Helmet } from "react-helmet-async";
import Navbar from "@/components/site/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Book() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setLoading(true);
    setTimeout(() => {
      const bookings = JSON.parse(localStorage.getItem("bio-bookings") || "[]");
      bookings.unshift({ ...data, createdAt: Date.now() });
      localStorage.setItem("bio-bookings", JSON.stringify(bookings.slice(0, 50)));
      setLoading(false);
      toast({ title: "Booked (Demo)", description: "I will confirm via email soon." });
      e.currentTarget.reset();
    }, 600);
  };

  return (
    <>
      <Helmet>
        <title>Book a Session | BioCoach with Saif</title>
        <meta name="description" content="Book a focused biochemistry coaching session. Share your syllabus and goals to get a tailored plan." />
        <link rel="canonical" href="/book" />
      </Helmet>
      <Navbar />
      <main className="container py-10">
        <h1 className="display text-4xl md:text-5xl mb-6">Book a Slot</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your details</CardTitle>
            <CardDescription>Provide a few details and a preferred time.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <label>Name</label>
                <Input name="name" required placeholder="Full name" />
              </div>
              <div className="grid gap-2">
                <label>Email</label>
                <Input name="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <label>Goals / Topics</label>
                <Textarea name="goals" required placeholder="Share your syllabus, exam date, and goals" />
              </div>
              <div className="grid gap-2">
                <label>Preferred date</label>
                <Input name="date" type="date" required />
              </div>
              <div className="grid gap-2">
                <label>Preferred time</label>
                <select name="time" required className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Select…</option>
                  <option>09:00</option>
                  <option>11:00</option>
                  <option>14:00</option>
                  <option>16:00</option>
                  <option>19:00</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Button type="submit" variant="hero" disabled={loading}>{loading ? "Booking..." : "Confirm Booking"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
