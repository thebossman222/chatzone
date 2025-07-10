"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageCircle, Users, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ChatZone
            </span>
          </div>
          <Button
            variant="ghost"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30"
          >
            Sign In
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="text-center space-y-8 max-w-5xl">
            {/* Badge */}
            <div className="flex justify-center">
              <Badge className="bg-white/30 backdrop-blur-sm text-gray-800 border border-white/40 px-4 py-2 text-sm font-medium shadow-lg">
                <Users className="w-4 h-4 mr-2" />
                Join 7,000+ Happy Users
              </Badge>
            </div>

            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  ChatZone
                </span>
              </h1>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 leading-tight">
                Experience{" "}
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  seamless
                </span>{" "}
                communication
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The ultimate platform for{" "}
                <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  real-time messaging
                </span>{" "}
                and collaboration. Connect with friends, collaborate with
                colleagues, and build communities.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/30 backdrop-blur-sm border-2 border-white/40 hover:bg-white/40 text-gray-800 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Watch Demo
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 shadow-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Lightning Fast</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 shadow-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Global Reach</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-gray-500 text-sm">
            Trusted by teams worldwide • Free forever • No credit card required
          </p>
        </footer>
      </div>
    </div>
  );
}
