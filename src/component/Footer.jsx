import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";

function Footer() {
  return (
    <>
    <div className="h-44 lg:h-24 w-auto md:h-24 sm:h-16">
      </div>
      <div className="bg-rose-800 w-auto flex justify-center">
        <div className="md:w-ful w-1/2">
          <div className="p-10 font-pops text-center">
            <p className="text-white pb-5">Designed & Developed by</p>
            <div className="h-1 border-2 border-white border-dotted"></div>

            <div className="flex text-white w-full justify-between py-3 text-4xl">
             <a href="https://www.facebook.com/mr.andrewsalvador/"> <FaFacebook/></a>
             <a href="mailto:andrewsalva88@gmail.com"><FaMailBulk /></a>
              <a href="https://www.linkedin.com/login"><FaLinkedin /></a>
              <a href="https://github.com/andrewsalvadr"><FaGithub/></a>
            </div>

            <div className="h-1 border-2 border-white border-dotted"></div>
            <p className="text-white py-2">Andrew V. Salvador</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
