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
    <div style={{ width: '100%', height: 500, position: 'relative' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(0)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(1)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(2)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(3)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(4)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(5)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(6)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(7)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(8)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(9)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(10)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(11)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(12)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(13)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(14)}
        </div>
        <div style={{ position: 'relative' }}>
          {renderAnimatedIcon(15)}
        </div>
      </div>
      {isAnimating && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h2 style={{ fontSize: 20 }}>{texts[textIndex]}</h2>
        </div>
      )}
      <button onClick={!isAnimating ? startAnimation : null} disabled={isAnimating}>
        Start Session
      </button>
    </div>
  );
}
