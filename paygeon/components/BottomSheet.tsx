// components/BottomSheet.tsx
import { ReactNode, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface BottomSheetProps {
  isVisible: boolean;
  content: ReactNode;
  onClose?: () => void; // Make onClose function optional
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isVisible, content, onClose }) => {
  const [{ y }, api] = useSpring(() => ({ y: 100 }));

  const openSheet = () => {
    api.start({ y: 0, immediate: false });
  };

  const closeSheet = () => {
    api.start({ y: 100, immediate: false });
    onClose?.(); // Call onClose only if it's defined
  };

  const bind = useDrag(({ down, movement: [, my], memo = y.get() }) => {
    if (down) {
      api.start({ y: memo + my, immediate: true });
    } else {
      if (y.get() > 50) {
        closeSheet();
      } else {
        openSheet();
      }
    }
    return memo;
  });

  useEffect(() => {
    if (isVisible) {
      openSheet();
    } else {
      closeSheet();
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeSheet} />
      )}

      <animated.div
        {...bind()}
        style={{ transform: y.to(y => `translateY(${y}%)`) }}
        className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-lg p-6 z-50"
      >
        <div className="relative w-full max-w-md mx-none">
          {content}
        </div>
      </animated.div>
    </>
  );
};

export default BottomSheet;
