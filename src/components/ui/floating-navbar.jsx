import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

export const FloatingNav = ({ navItems, className }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - prevScrollY;
    // Show navbar when scrolling up, hide when scrolling down
    setVisible(direction < 0 || current < 50);

    // Update previous scroll position
    setPrevScrollY(current);
    }
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-[20px] dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-4 pl-8 py-2 items-center justify-between space-x-1",
          className
        )}
      >
        <div className="flex-none">
        <span className="text-left"><svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0352 44H21.3952L6.75516 21.8V44H3.11516V16.08H6.75516L21.3952 38.24V16.08H25.0352V44ZM99.1845 29.64C100.198 29.8 101.118 30.2133 101.945 30.88C102.798 31.5467 103.465 32.3733 103.945 33.36C104.451 34.3467 104.705 35.4 104.705 36.52C104.705 37.9333 104.345 39.2133 103.625 40.36C102.905 41.48 101.851 42.3733 100.465 43.04C99.1045 43.68 97.4912 44 95.6245 44H85.2245V16.12H95.2245C97.1179 16.12 98.7312 16.44 100.065 17.08C101.398 17.6933 102.398 18.5333 103.065 19.6C103.731 20.6667 104.065 21.8667 104.065 23.2C104.065 24.8533 103.611 26.2267 102.705 27.32C101.825 28.3867 100.651 29.16 99.1845 29.64ZM88.8645 28.16H94.9845C96.6912 28.16 98.0112 27.76 98.9445 26.96C99.8779 26.16 100.345 25.0533 100.345 23.64C100.345 22.2267 99.8779 21.12 98.9445 20.32C98.0112 19.52 96.6645 19.12 94.9045 19.12H88.8645V28.16ZM95.3045 41C97.1179 41 98.5312 40.5733 99.5445 39.72C100.558 38.8667 101.065 37.68 101.065 36.16C101.065 34.6133 100.531 33.4 99.4645 32.52C98.3979 31.6133 96.9712 31.16 95.1845 31.16H88.8645V41H95.3045Z" fill="#7F6EFC"/>
<path d="M47.7202 37.8H35.5602L33.3202 44H29.4802L39.5602 16.28H43.7602L53.8002 44H49.9602L47.7202 37.8ZM46.6802 34.84L41.6402 20.76L36.6002 34.84H46.6802ZM81.2333 16.12L70.7133 44H66.5133L55.9933 16.12H59.8733L68.6333 40.16L77.3933 16.12H81.2333ZM126.236 37.8H114.076L111.836 44H107.996L118.076 16.28H122.276L132.316 44H128.476L126.236 37.8ZM125.196 34.84L120.156 20.76L115.116 34.84H125.196ZM151.389 44L144.749 32.6H140.349V44H136.709V16.12H145.709C147.816 16.12 149.589 16.48 151.029 17.2C152.496 17.92 153.589 18.8933 154.309 20.12C155.029 21.3467 155.389 22.7467 155.389 24.32C155.389 26.24 154.829 27.9333 153.709 29.4C152.616 30.8667 150.962 31.84 148.749 32.32L155.749 44H151.389ZM140.349 29.68H145.709C147.682 29.68 149.162 29.2 150.149 28.24C151.136 27.2533 151.629 25.9467 151.629 24.32C151.629 22.6667 151.136 21.3867 150.149 20.48C149.189 19.5733 147.709 19.12 145.709 19.12H140.349V29.68Z" fill="black"/>
</svg>
</span>
        </div>
      <div className="flex-grow flex items-center justify-center space-x-2">
        {navItems.map((navItem, idx) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
           
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          
          </a>
        
        ))}
        </div>
        <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-[10px]">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
        <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <span>Sign Up</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      </motion.div>
    </AnimatePresence>

    // <div>
    //     {navItems.map((navItem, idx) => (
    //       <a
    //         key={`link=${idx}`}
    //         href={navItem.link}
    //         className={cn(
    //           "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
    //         )}
    //       >
    //         <span className="block sm:hidden">{navItem.icon}</span>
    //         <span className="hidden sm:block text-sm">{navItem.name}</span>
    //       </a>
    //     ))}
    //     {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
    //       <span>Login</span>
    //       <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
    //     </button> */}
    // </div>
  );
};
