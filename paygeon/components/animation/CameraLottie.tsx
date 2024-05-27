// components/AnimationComponent.tsx
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import 'tailwindcss/tailwind.css';

const CameraLottie: React.FC = () => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/3D_camera.json',
      });

      anim.setSpeed(1.6);

      anim.addEventListener('DOMLoaded', () => {
        anim.addEventListener('complete', () => {
          // Add any actions you want to perform when the animation completes
        });
      });

      return () => {
        anim.destroy();
      };
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full overflow-hidden bg-transparent">
      <div
        id="animationWindow"
        ref={animationContainer}
        className="bg-transparent"
        style={{ width: '175px', height: '175px', position: 'absolute' }}
      />
    </div>
  );
};

export default CameraLottie;
