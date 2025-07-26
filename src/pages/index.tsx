import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-indigo-900 via-blue-900 to-indigo-700 text-white flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">WebGarage</h1>
        <nav className="space-x-6 text-lg">
          <a href="#features" className="hover:underline">Features</a>
          <a href="/studio" className="hover:underline">Start Building</a>
          <a href="/dashboard" className="hover:underline">Dashboard</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-4 leading-tight">
          Build Any Website, Web App, or Application <br /> with 3D UI/UX & AI
        </h2>
        <p className="text-lg text-indigo-200 mb-8">
          WebGarage is your all-in-one platform for designing, animating, coding,
          and deploying modern digital experiences — powered by AI, collaboration,
          and AR/VR previews.
        </p>

        <div className="space-x-4">
          <a
            href="/studio"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md text-white font-semibold transition"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="inline-block bg-transparent border border-indigo-400 hover:bg-indigo-500 px-6 py-3 rounded-md text-indigo-200 hover:text-white font-semibold transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="bg-indigo-800 py-16 px-6 text-center max-w-5xl mx-auto"
      >
        <h3 className="text-4xl font-bold mb-12">Why WebGarage?</h3>
        <div className="grid gap-12 md:grid-cols-3">
          <FeatureCard
            title="Figma-like Studio"
            description="Design with an intuitive 2D & 3D editor, drag-and-drop, and real-time collaboration."
          />
          <FeatureCard
            title="AI Assistant GarageBot"
            description="Generate code, animations, backend logic, and fixes — all with natural language commands."
          />
          <FeatureCard
            title="AR/VR Preview & Deployment"
            description="Visualize your projects in AR/VR and deploy with one click to modern hosting platforms."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 py-6 text-center text-indigo-300">
        &copy; {new Date().getFullYear()} WebGarage. All rights reserved.
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-indigo-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
      <h4 className="text-2xl font-semibold mb-2">{title}</h4>
      <p className="text-indigo-300">{description}</p>
    </div>
  );
}
