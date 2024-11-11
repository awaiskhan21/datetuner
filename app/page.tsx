import Testimonial from "@/components/testimonial";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];
export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-24">
          <div className="lg:w-1/2">
            <h1 className="text-7xl font-extrabold pb-6 gradient-title">
              FineTune Your Scheduling
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              DateTuner helps you manage you time effectively. Create events,
              set your avalability, and let other book time with you seamlessly.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="text-lg">
                Get Started <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative max-w-md w-full aspect-square">
              <Image
                src="/poster.png"
                alt="poster"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        {/* key features */}
        <div className="mb-24">
          <h2 className="flex flex-col justify-center items-center text-3xl text-blue-600 mb-12 font-bold">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="flex flex-col justify-center gap-4"
                >
                  <CardHeader className="flex flex-col items-center m-4 p-4">
                    <Icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                    <CardTitle className="text-blue-600 mb-4">
                      {feature.title}{" "}
                    </CardTitle>
                    <CardContent>
                      <p className="text-center text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* What users say */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
            What Users Say
          </h2>
          <Testimonial />
        </div>

        {/* how to use */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
            How It Works
          </h2>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-blue-600 my-4">
                    {step.step}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready To Simplify Yours Meetings?
          </h2>
          <p className="text-xl mb-6">
            Join thousands of professionals who trusted DateTuner for efficient
            time management
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-blue-600">
              Get Started <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
      <footer className="bg-blue-100 py-12 hidden md:block">
        <div className="text-center text-gray-600 container mx-auto px-4 ">
          <p>Developed by Awais A. khan</p>
        </div>
      </footer>
    </>
  );
}
