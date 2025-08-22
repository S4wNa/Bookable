import { useRef, useEffect } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

import useToggleStore from "../../stores/useToggleStore";
function FallingNav({ children }) {
  const { isOpen } = useToggleStore();
  const fallingNav = useRef(null);
  const timelineRef = useRef(null);
  useGSAP(() => {
    timelineRef.current = gsap.timeline({ paused: true });
    timelineRef.current.to(fallingNav.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);
  useEffect(() => {
    if (!timelineRef.current) return;
    if (isOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isOpen]);
  return (
    <div
      ref={fallingNav}
      className="pink fixed inset-0 z-50"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      }}
    >
      {children}
    </div>
  );
}
export default FallingNav;
