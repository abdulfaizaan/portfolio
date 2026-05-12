import { RevealOnScroll } from '../RevealOnScroll';
import { FaGithub,FaInstagram,FaLinkedin} from "react-icons/fa6";


export const Footer = () => {

    return (
        <section id="footer" className="w-full py-20 ">
            <RevealOnScroll>
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-6 text-white">My Social</h2>
                    <div className="flex justify-center gap-8 mb-8">
                        <a href="https://github.com/abdulfaizaan" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                            <FaGithub size={30} />
                        </a>
                        <a href="https://www.linkedin.com/in/abdul-faizaan" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                           <FaLinkedin size={30} />
                        </a>
                        <a href="https://www.instagram.com/abdulfaizaan._7/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors">
                            <FaInstagram size={30} />
                        </a>
                    </div>
                    <p className="text-gray-400 text-sm">© 2026 Abdul Faizaan. All rights reserved.</p>
                </div>
            </RevealOnScroll>
        </section>
    );

}