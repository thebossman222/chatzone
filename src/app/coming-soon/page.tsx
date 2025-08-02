export default function ComingSoon() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br relative overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 ">
        <div className="text-center space-y-8 max-w-5xl">
          {/* Hero Text */}
          <div className="space-y-6 content-center">
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
              Something{" "}
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Amazing
              </span>{" "}
              Is Coming
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                real-time messaging
              </span>{" "}
              and collaboration. Connect with friends, collaborate with
              colleagues, and build communities.
            </p>
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent text-3xl">
              Coming Soon
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-gray-500 text-sm">
          Trusted by teams worldwide • Free forever • No credit card required •
          Created with ❤️ by Caleb Krainman
        </p>
      </footer>
    </div>
  );
}
