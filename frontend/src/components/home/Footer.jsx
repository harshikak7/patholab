import React from "react";
import logo from "../../assets/logo.svg";
import { Apple } from "lucide-react";

const Footer = () => {
  return (
    <footer>

      <div className="bg-[#428DF5] text-white">

        <div className="max-w-350 mx-auto px-6 py-20">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Logo */}

            <div>

              <img
                src={logo}
                alt=""
                className="h-16 brightness-0 invert"
              />

              <p className="mt-6 text-white/90">
                Making healthcare accessible
                for everyone.
              </p>

            </div>

            {/* Links */}

            <div>

              <h3 className="font-semibold mb-6">
                Quick Links
              </h3>

              <ul className="space-y-3">

                <li>Book a Test</li>
                <li>Upload Prescription</li>
                <li>Download Report</li>
                <li>Health Packages</li>
                <li>Lab Locator</li>

              </ul>

            </div>

            {/* Partner */}

            <div>

              <h3 className="font-semibold mb-6">
                Partner with us
              </h3>

              <ul className="space-y-3">

                <li>Franchise Opportunities</li>
                <li>Corporate Wellness</li>
                <li>Hospital Lab Management</li>
                <li>Organise Camps</li>

              </ul>

            </div>

            {/* Contact */}

            <div>

              <h3 className="font-semibold mb-6">
                Contact Us
              </h3>

              <ul className="space-y-3">

                <li>Get in touch</li>
                <li>Faq</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

      <div className="bg-[#242424] text-white py-6 text-center">
        © 2025 PathoLab. All rights reserved
      </div>

    </footer>
  );
};

export default Footer;