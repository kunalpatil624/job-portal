import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white text-black py-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">

        {/* Description */}
        <p className="text-sm">
          <span>Created By Kunal {'\u2764\uFE0F'}</span><br />
          <strong>JobFind</strong> is your trusted platform to explore jobs and hire talented professionals.  
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 text-xl">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaTwitter />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaFacebook />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} JobFind. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
