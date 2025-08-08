import { Helmet } from "react-helmet-async";
import Navbar from "@/components/site/Navbar";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | BioCoach</title>
        <meta name="description" content="The page you’re looking for does not exist." />
        <link rel="canonical" href="/404" />
      </Helmet>
      <Navbar />
      <main className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="story-link">Return to Home</a>
        </div>
      </main>
    </>
  );
};

export default NotFound;
