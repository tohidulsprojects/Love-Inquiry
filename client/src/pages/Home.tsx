import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FloatingHearts } from "../components/FloatingHearts";
import { Heart, Stars } from "lucide-react";

export default function Home() {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleNoHover = () => {
    if (!containerRef.current || !noBtnRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = noBtnRef.current.getBoundingClientRect();

    // Calculate safe boundaries within the container
    const padding = 20;
    const maxX = window.innerWidth - btnRect.width - padding;
    const maxY = window.innerHeight - btnRect.height - padding;

    // Fast random jumps
    const newX = Math.random() * (maxX - padding) + padding;
    const newY = Math.random() * (maxY - padding) + padding;

    setNoBtnPosition({ x: newX, y: newY });
    setIsHoveringNo(true);
  };

  const handleYesClick = () => {
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff69b4', '#ff1493', '#ff0000']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff69b4', '#ff1493', '#ff0000']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Show modal
    setShowSuccess(true);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-background text-foreground selection:bg-primary selection:text-white"
    >
      <FloatingHearts />
      
      {/* Header */}
      <div className="absolute top-8 left-0 w-full text-center z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm"
        >
          <p className="text-sm md:text-base font-bold tracking-widest text-primary font-display uppercase">
            Made by Tohidul
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto space-y-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart className="w-24 h-24 md:w-32 md:h-32 text-primary fill-primary/20 stroke-[1.5px]" />
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground drop-shadow-sm leading-tight">
            Do you love me?
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-handwriting rotate-2">
            Please say yes... 🥺
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 min-h-[140px]">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            className="group relative px-10 py-4 md:px-12 md:py-5 bg-gradient-to-br from-primary to-rose-600 text-white rounded-2xl shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
            <span className="relative text-2xl md:text-3xl font-bold font-display flex items-center gap-2">
              YES <Heart className="w-6 h-6 fill-current animate-pulse" />
            </span>
          </motion.button>

          {/* NO Button - The Runaway */}
          <motion.button
            ref={noBtnRef}
            onMouseEnter={handleNoHover}
            onMouseMove={handleNoHover}
            onTouchStart={handleNoHover}
            onTouchMove={handleNoHover}
            style={{
              position: isHoveringNo ? 'fixed' : 'relative',
              left: isHoveringNo ? noBtnPosition.x : 'auto',
              top: isHoveringNo ? noBtnPosition.y : 'auto',
              zIndex: 50
            }}
            animate={isHoveringNo ? { x: 0, y: 0 } : {}}
            transition={{ type: "tween", duration: 0.1 }}
            className="px-8 py-4 md:px-10 md:py-5 bg-white text-muted-foreground border-2 border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 font-display font-bold text-xl md:text-2xl transition-colors duration-200"
          >
            NO
          </motion.button>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowSuccess(false)}
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-lg w-full text-center overflow-hidden border-4 border-primary/10"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-primary to-rose-400" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Stars className="w-10 h-10 text-primary" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                I knew it! ❤️
              </h2>
              
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-body">
                Thank you for making my life beautiful. I love you too!
              </p>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm font-handwriting text-muted-foreground rotate-1">
                  ~ Forever yours, Tohidul
                </p>
              </div>

              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
