import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from "react-icons/si";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white py-6 bg-slate-950 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">ChessMaster</h2>
          <p className="mb-2">Your ultimate chess companion</p>
          <p className="text-sm">© 2024 ChessMaster. All rights reserved.</p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-x-8 items-center mt-4">
          <ul className="flex space-x-4 mb-4 md:mb-0">
            <li>
              <Link to="/about" className="hover:text-gray-400">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            </li>
          </ul>
          <div className="flex space-x-4">
            <a href="https://github.com/ShivamGupta8852" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/shivam8851/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
            <a href="https://leetcode.com/shivam8852" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <SiLeetcode  size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;