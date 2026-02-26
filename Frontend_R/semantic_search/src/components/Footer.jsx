export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#334e68] to-[#2563eb] flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Hustle.ai</span>
          </div>
          <p className="text-gray-600 mb-6">AI-powered job search platform. Get hired faster with intelligent job matching and one-click applications.</p>
          <form className="flex flex-col sm:flex-row items-center gap-2 justify-center">
            <input type="email" placeholder="Your email" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#2563eb]" />
            <button type="submit" className="bg-gradient-to-r from-[#ef4444] to-[#2563eb] text-white px-6 py-2 rounded-lg shadow-md">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
