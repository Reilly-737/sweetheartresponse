import React, { useState, useEffect } from "react";
import "../mystyles.css";

const buttonTextArray = [
  "No?",
  "Really?",
  "Really really?",
  "404: Your yes not found 😞",
  "Double really sure? Triple, maybe?",
  "Are you a keyboard? Because you're my type!",
  "Sorry..That wasn't very good....but please?",
  "PleasePleasePleasePleasePlease",
  "PleasePleasePleasePleasePleasePleasePlease",
  "Reconsider, let's try again",
  "No",
  "In a parallel universe, you said yes! 🌌",
  "No??",
  "No again? Are you a software update? 🔄",
];

const VDayQuestion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [yesClicked, setYesClicked] = useState(false);

  const updateButtonText = () => {
    setCurrentIndex((currentIndex + 1) % buttonTextArray.length);
  };

  const increaseFontSize = () => {
    if (fontSize < 30)
    setFontSize(fontSize + 5);
  };

  const onYesClick = () => {
    setYesClicked(true); 
  };

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";
      heart.innerText = "💗";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    };

    useEffect(() => {
      if (yesClicked) {
        const interval = setInterval(createHeart, 300);
        return () => clearInterval(interval);
      }
    }, [yesClicked]);

  return (
    <div className="bordered-box">
    <div className="content-container"></div>
    <div>
      <h3>Will you be my Valentine? &lt;3</h3>
      <div className="items">
        <div className="item">
          <div className="inner">
            <img
              src="https://media1.tenor.com/m/vpxL0d_5_98AAAAC/love-heart.gif"
              alt="Love Heart"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        {yesClicked ? (
          <p>∘°∘♡∘°∘Yes! Yes! Yes!!!∘°∘♡∘°∘</p>
        ) : (
          <>
            <button
              className="button-primary"
              id="yesButton"
              onClick={onYesClick}
            >
              Yes
            </button>
            <button
              className="button-secondary"
              id="dynamicButton"
              onClick={() => {
                updateButtonText();
                increaseFontSize();
              }}
              style={{ fontSize }}
            >
              {buttonTextArray[currentIndex]}
            </button>
          </>
        )}
      </div>
    </div>
    </div>

  );
};

export default VDayQuestion;
