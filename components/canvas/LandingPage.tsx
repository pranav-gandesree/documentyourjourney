'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PenLine, BarChart2, Users, Share2, Award, Briefcase } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="h-12 w-12 mb-4 text-purple-400" />
    <h3 className="text-lg font-bold text-purple-300">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </motion.div>
)

const FloatingStar = ({ delay }: any) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full"
    initial={{ opacity: 0, y: "100vh" }}
    animate={{ opacity: [0, 1, 0], y: "-100vh" }}
    transition={{ duration: 10, delay, repeat: Infinity, ease: "linear" }}
    style={{
      left: `${Math.random() * 100}%`,
    }}
  />
)

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-hidden">
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-purple-500 mix-blend-screen pointer-events-none z-50"
        style={{ left: mousePosition.x - 12, top: mousePosition.y - 12 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      {[...Array(20)].map((_, i) => (
        <FloatingStar key={i} delay={i * 0.5} />
      ))}
      <header className="px-4 lg:px-6 h-14 flex items-center z-10">
        <Link className="flex items-center justify-center" href="#">
          <PenLine className="h-6 w-6 mr-2 text-purple-400" />
          <span className="font-bold text-purple-300">DocumentYourJourney</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#">
            Features
          </Link>
          {/* <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#">
            Pricing
          </Link> */}
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="/signin">
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Document Your Coding Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Track your progress, set goals, and connect with other developers. Showcase your skills and build your portfolio.
                </p>
              </div>
              <div className="space-x-4">
                <Link href='/signin'>
                <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
                </Link>
                <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900">Learn More</Button>
              </div>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900 z-0" />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-purple-300">
              Key Features
            </h2>
            <motion.div
              className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <FeatureCard
                icon={BarChart2}
                title="Personalized Dashboard"
                description="Track your streak, milestones, and set goals for your coding journey."
              />
              <FeatureCard
                icon={Users}
                title="Community Interaction"
                description="Follow others, like, comment, and share journal entries with fellow developers."
              />
              <FeatureCard
                icon={Share2}
                title="Multi-domain Progress"
                description="Document your journey in coding, music, or any skill you're developing."
              />
              <FeatureCard
                icon={Award}
                title="Achievement Tracking"
                description="Celebrate your wins and track your progress over time."
              />
              <FeatureCard
                icon={Briefcase}
                title="Portfolio Integration"
                description="Showcase your projects, certifications, and accomplishments in one place."
              />
              <FeatureCard
                icon={PenLine}
                title="Journaling"
                description="Write detailed entries about your learning experiences and challenges."
              />
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-purple-300">
                  Start Documenting Your Journey Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of developers who are tracking their progress and building their portfolios.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-gray-700 border-gray-600 text-white" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-purple-400" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-purple-900/20 z-0" />
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          © 2023 DocumentYourJourney. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-purple-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-purple-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}