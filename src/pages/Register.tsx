import { Helmet } from "react-helmet-async";
import Navbar from "@/components/site/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function Register() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const users = JSON.parse(localStorage.getItem("bio-users") || "[]");
    users.unshift({ ...data, createdAt: Date.now() });
    localStorage.setItem("bio-users", JSON.stringify(users.slice(0, 200)));
    toast({ title: "Registered (Demo)", description: "Welcome! I'll be in touch shortly." });
    e.currentTarget.reset();
  };

  return (
    <>
      <Helmet>
        <title>Register | BioCoach with Saif</title>
        <meta name="description" content="Register as a new student for biochemistry coaching. Share your goals and current challenges to tailor the plan." />
        <link rel="canonical" href="/register" />
      </Helmet>
      <Navbar />
      <main className="container py-10">
        <h1 className="display text-4xl md:text-5xl mb-6">Register New Learner</h1>
        <Card>
          <CardHeader>
            <CardTitle>Intake Form</CardTitle>
            <CardDescription>Tell me a little about you and your goals.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <label>Name</label>
                <Input name="name" required />
              </div>
              <div className="grid gap-2">
                <label>Email</label>
                <Input name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <label>Field/Program</label>
                <Input name="program" placeholder="e.g., MBBS, BSc, Nursing" />
              </div>
              <div className="grid gap-2">
                <label>Upcoming exam/date</label>
                <Input name="exam" placeholder="e.g., Midterm in 3 weeks" />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <label>Which topics trouble you most?</label>
                <Textarea name="pain" placeholder="e.g., enzyme kinetics, glycogen metabolism" />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <label>Learning preference</label>
                <Textarea name="preference" placeholder="Short sprints, detailed derivations, more quizzes, etc." />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" variant="hero">Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
