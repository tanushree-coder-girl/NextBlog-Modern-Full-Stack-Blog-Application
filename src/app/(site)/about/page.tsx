import HeroSection from "@/components/HeroSection";
import CoreValues from "@/components/CoreValues";

const About = () => {
  return (
    <main className="bg-white">
      <HeroSection
        title="Who We Are"
        description="NextBlog is your trusted source for stories and insights in sustainable agriculture. From regenerative farming practices to modern eco-tech, we connect conscious readers with expert-backed knowledge and real-world inspiration."
        buttonText="Get in Touch"
        imageUrl="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2070&auto=format&fit=crop"
        imageAlt="People working on a farm together"
        link="/contact"
      />
      <CoreValues />
    </main>
  );
};

export default About;
