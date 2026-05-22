import React from "react";
import heroImg from "../../assets/hero-bg.png"; // add your hero image

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Heading */}
          <h1
            className="
            text-[38px]
            sm:text-[48px]
            lg:text-[64px]
            font-bold
            leading-tight
            text-black
          "
          >
            Worried About Your Health?
          </h1>

          {/* Subtitle */}
          <p
            className="
            mt-4
            text-[16px]
            sm:text-[18px]
            text-black/80
            max-w-4xl
            mx-auto
          "
          >
            Don't Wait. Get Convenient Home Sample Collection and
            Accurate Results with PathoLab.
          </p>

          {/* Search + Button */}
          <div
            className="
            mt-10
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-5
          "
          >
            {/* Search */}
            <div
              className="
              w-full
              sm:w-lg
              bg-white
              rounded-full
              border-2
              border-blue-500
              px-5
              py-3
              flex
              items-center
            "
            >
              <span className="mr-2">⌕</span>

              <input
                type="text"
                placeholder="Search Tests"
                className="
                w-full
                outline-none
                bg-transparent
              "
              />
            </div>

            {/* Button */}
            <button
              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-10
              py-3
              rounded-full
              transition
            "
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;