"use client"
import React, { useState, useEffect } from 'react';
import './BreathingBox.css'; // Import CSS file for styling

const texts = ["Pause ", "Breath In", "Hold ", "Breath Out"];

function BreathingBox({ text }) {
  return (
    <div className="breathing-box-container">
      <div className="breathing-box-content">
        <div className="breathing-box-inner">{text}</div>
      </div>
    </div>
  );
}

export default function TestAnimation() {
  const [currentAnimatingIndex, setCurrentAnimatingIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let textChangeTimer;
    if (isAnimating) {
      textChangeTimer = setInterval(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 4000);
    }
    return () => clearInterval(textChangeTimer);
  }, [isAnimating]);

  const startAnimation = () => {
    setIsAnimating(true);
    const animationInterval = setInterval(() => {
      setCurrentAnimatingIndex((prevIndex) => prevIndex + 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(animationInterval);
      setIsAnimating(false);
      setCurrentAnimatingIndex(0);
    }, 16000); // 16 seconds
  };

  const renderAnimatedIcon = (index) => {
    return (
      <div style={{ opacity: currentAnimatingIndex === index && isAnimating ? 1 : 0, transition: 'opacity 1s' }}>
        <BreathingBox text={index + 1} />
      </div>
    );
  };

  return (
    <div>
      <div style={{ width: '100%', height: 300, position: 'relative' }}>
        {Array.from({ length: 16 }, (_, i) => i).map((index) => (
          <React.Fragment key={index}>
            {index === 3 || index === 7 || index === 11 || index === 15 ? (
              <div style={{ position: 'absolute', bottom: 0, left: `${(index % 4) * 25}%` }}>
                {renderAnimatedIcon(index)}
              </div>
            ) : index === 0 || index === 4 || index === 8 || index === 12 ? (
              <div style={{ position: 'absolute', left: 0, top: `${(index % 4) * 25}%` }}>
                {renderAnimatedIcon(index)}
              </div>
            ) : index === 1 || index === 5 || index === 9 || index === 13 ? (
              <div style={{ position: 'absolute', top: 0, left: `${(index % 4) * 25}%` }}>
                {renderAnimatedIcon(index)}
              </div>
            ) : (
              <div style={{ position: 'absolute', right: 0, top: `${(index % 4) * 25}%` }}>
                {renderAnimatedIcon(index)}
              </div>
            )}
          </React.Fragment>
        ))}
        {isAnimating && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h2 style={{ fontSize: 20 }}>{texts[textIndex]}</h2>
          </div>
        )}
      </div>
      <button onClick={!isAnimating ? startAnimation : null} disabled={isAnimating}>
        Start Session
      </button>
    </div>
  );
}
