import React, { useState } from 'react';
import './styles.css'; // assuming you have a CSS file for styles

const Card: React.FC = () => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetOpen(prevState => !prevState);
  };

  return (
    <div className="card">
      <div className="card-content">
        <header className="card-header">
          <div className="card-title">
            <h2 className="card-name">HDFC BUSINESS MONEYBACK</h2>
            <div className="card-number">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/797c696809d4608d2d0c9a5cdc663923c2eaa6ce312e81e14511963c44492937?apiKey=aa19eef6d1f1473ba394866de3aadd86&"
                alt="Chip icon"
                className="card-chip"
              />
              <span className="card-number-text">1234 56XX XXXX 2022</span>
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/df13ebd007a50a1965c689aeeb8c8db875304b5b9ab98ed4ce12652e5b59926d?apiKey=aa19eef6d1f1473ba394866de3aadd86&"
            alt="Card logo"
            className="card-logo"
          />
        </header>
        <footer className="card-footer">
          <div className="card-strip">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/39b5825135b1f18b365eedc87bb0add772ce323768f9010c9608bc2741507e0e?apiKey=aa19eef6d1f1473ba394866de3aadd86&"
              alt=""
              className="card-strip-start"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bbb47e78e38719f1293a167612fbe1e61a76bdfdbdee4ca2ba33cf37d76ad9d7?apiKey=aa19eef6d1f1473ba394866de3aadd86&"
              alt=""
              className="card-strip-end"
            />
          </div>
          <div className="card-status-container">
            <button className="card-status" onClick={toggleBottomSheet}>
                <span className="card-status-text">Pay more</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecc0b05a8f663d59e79f625e990bef18268be3db9cf01bde057680b4fec7e0ee?apiKey=aa19eef6d1f1473ba394866de3aadd86&"
                  alt="Right arrow icon"
                  className="card-status-icon"
                />
            </button>
            <div className="card-status-label">FULLY PAID</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Card;
