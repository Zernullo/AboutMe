import { PowerGlitch } from "powerglitch";
import { useEffect, useRef } from "react";

function GlitchHeading() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    // Create the glitch instance
    const glitch = PowerGlitch.glitch(headingRef.current, {
      playMode: "manual", // manual allows us to trigger glitch programmatically
      timing: {
        duration: 500,
        iterations: 1,
      },
    });

    // Trigger glitch every 2 seconds
    const interval = setInterval(() => {
      glitch.startGlitch();
    }, 2000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      glitch.stopGlitch();
    };
  }, []);

  return (
    <h1
      ref={headingRef}
      className="text-green-400 font-bold text-4xl font-mono"
    >
      Welcome to My Portfolio
    </h1>
  );
}

export default GlitchHeading;