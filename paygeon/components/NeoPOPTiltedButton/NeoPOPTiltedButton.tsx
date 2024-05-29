import React, { ReactNode } from 'react';
import styles from './NeoPOPTiltedButton.module.css';

interface NeoPopTiltedButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const NeoPopTiltedButton: React.FC<NeoPopTiltedButtonProps> = ({ children, onClick, disabled = false, className = '' }) => {
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    (event.target as HTMLButtonElement).classList.add(styles.down);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    (event.target as HTMLButtonElement).classList.remove(styles.down);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).classList.add(styles.down);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).classList.remove(styles.down);
  };

  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.btnContainer}>
        <div className={styles.btnMain}>
          <button
            className={styles.btn3d}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        </div>
        <div className={styles.shadow}></div>
      </div>
    </div>
  );
};

export default NeoPopTiltedButton;
