// import React, { useState } from "react";
// import { motion } from "framer-motion";
import Phoneix from "../assets/image/Phoenix.webp";
import Raze from "../assets/image/Raze.webp";
import FlamesInMyViens from "../assets/image/Flames_in_my_Veins_Spray.webp";

import Boomtastic_Spray from "../assets/gif/Boomtastic_Spray.gif";
import Raze_has_Range_Spray from "../assets/gif/Raze_has_Range_Spray.gif";

import Whtudoing from "../assets/audio/whtudoing.mp3";
import Dont from "../assets/audio/dont.mp3";
import Thathowitgetdone from "../assets/audio/thathowitgetdone.mp3";
import RazeConvo from "../assets/audio/razeconvo.mp3";
import TypingSound from "../assets/audio/typing_sound.mp3";

import { story } from "../data";

// const ValentinePage = () => {
//   const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
//   const [yesScale, setYesScale] = useState(1);
//   const [dialogue, setDialogue] = useState(
//     "Yo, Raze! Think you can keep up with me?",
//   );
//   const [isAccepted, setIsAccepted] = useState(false);

//   const handleNoHover = () => {
//     // Calculate a random position within a 300px range
//     const newX = Math.random() * 400 - 200;
//     const newY = Math.random() * 400 - 200;

//     setNoButtonPos({ x: newX, y: newY });
//     setYesScale((prev) => prev + 0.15); // Grow the Yes button
//     setDialogue("Whoa! Too slow, gotta be faster than that!");
//   };

//   const handleYesClick = () => {
//     setIsAccepted(true);
//     setDialogue("BOOM! I knew you couldn't resist the fire!");
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.dialogueBox}>"{dialogue}"</h2>
//         <div style={styles.characterContainer}>
//           {/* Phoenix Side */}
//           <div style={styles.agentBox}>
//             <img src={Phoneix} alt="Phoenix" style={styles.agentImg} />
//             <p style={styles.tagline}>PHOENIX</p>
//           </div>

//           <div style={styles.vs}>VS</div>

//           {/* Raze Side */}
//           <div style={styles.agentBox}>
//             <img src={Raze} alt="Raze" style={styles.agentImg} />
//             <p style={styles.tagline}>RAZE</p>
//           </div>
//         </div>

//         {!isAccepted ? (
//           <div style={styles.buttonGroup}>
//             <motion.button
//               style={{ ...styles.button, ...styles.yesBtn }}
//               animate={{ scale: yesScale }}
//               onClick={handleYesClick}
//             >
//               YES
//             </motion.button>

//             <motion.button
//               style={{ ...styles.button, ...styles.noBtn }}
//               animate={{ x: noButtonPos.x, y: noButtonPos.y }}
//               onMouseEnter={handleNoHover}
//             >
//               NO
//             </motion.button>
//           </div>
//         ) : (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//             <h1 style={styles.successText}>IT'S A DATE! 🧨🔥</h1>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Quick Valorant-themed styles
// const styles = {
//   container: {
//     background: "#0f1923", // Valorant Dark Blue
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontFamily: '"Oswald", sans-serif',
//     color: "#ece8e1",
//     // overflow: "hidden",
//   },
//   card: {
//     textAlign: "center",
//     padding: "40px",
//     border: "2px solid #ff4655",
//   },
//   characterContainer: {
//     display: "flex",
//     alignItems: "center",
//     gap: "20px",
//     marginBottom: "30px",
//   },
//   agentImg: { width: "550px", height: "auto" },
//   vs: { fontSize: "2rem", color: "#ff4655", fontWeight: "bold" },
//   dialogueBox: { height: "60px", fontStyle: "italic", margin: "20px 0" },
//   buttonGroup: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "50px",
//     alignItems: "center",
//   },
//   button: {
//     padding: "15px 40px",
//     fontSize: "1.5rem",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   yesBtn: {
//     background: "#ff4655", // The iconic Valorant Red
//     color: "white",
//     border: "1px solid rgba(255, 70, 85, 0.5)",
//     boxShadow: "0px 0px 20px rgba(255, 70, 85, 0.6)", // The Red Glow
//     transition: "all 0.2s ease",
//     textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
//   },
//   noBtn: {
//     background: "transparent",
//     color: "#ece8e1",
//     border: "2px solid #ece8e1",
//     boxShadow: "0px 0px 10px rgba(236, 232, 225, 0.2)",
//   },
//   successText: { color: "#ff4655", fontSize: "3rem" },
// };

// export default ValentinePage;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ValentinePage = () => {
  // --- STORY DATA ---

  // --- STATE ---
  const [gameState, setGameState] = useState("loading"); // 'loading', 'vn', 'success'
  const [currentScene, setCurrentScene] = useState("start");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);

  // --- TYPEWRITER LOGIC ---
  useEffect(() => {
    if (gameState !== "vn") return;
    // if(gameState === "loading") {
    //   const timer = setTimeout(() => setGameState("vn"), 2000);
    //   return () => clearTimeout(timer);
    // }

    let i = 0;
    const fullText = story[currentScene].text;
    setDisplayedText("");
    setIsTyping(true);
    setShowChoices(false);

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        if (!story[currentScene].isFinalQuestion) setShowChoices(true);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [currentScene, gameState]);

  const handleStart = () => {
    setGameState("vn");
  };

  const handleNoHover = () => {
    // Limits movement within mobile screen bounds
    const moveRange = window.innerWidth < 600 ? 50 : 150;
    setNoButtonPos({
      x: Math.random() * (moveRange * 2) - moveRange,
      y: Math.random() * (moveRange * 2) - moveRange,
    });
    setYesScale((prev) => prev + 0.1);
  };

  return (
    <div
      style={{ ...styles.container, backgroundImage: story[currentScene].bg }}
    >
      <AnimatePresence mode="wait">
        // Add a background image to the loading screen for extra flair
        {gameState === "loading" && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            style={styles.loadingScreen}
          >
            <div style={styles.matchBox}>
              <img style={styles.matchGif} src={Boomtastic_Spray} />
              <h2 style={styles.matchTitle}>MATCH FOUND</h2>
              <p style={styles.mapText}>MAP: HEART</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                style={styles.acceptBtn}
              >
                ACCEPT
              </motion.button>
            </div>
          </motion.div>
        )}
        {gameState === "vn" && (
          <>
            {/* 1. VISUAL NOVEL OVERLAYS */}
            <div style={styles.scanlines} />
            <div style={styles.vignette} />

            {/* 2. AGENT VIEWPORT */}
            <div style={styles.viewPort}>
              <motion.img
                src={Phoneix}
                animate={{
                  x: story[currentScene].speaker === "Phoenix" ? 0 : -20,
                  opacity: story[currentScene].speaker === "Phoenix" ? 1 : 0.6,
                }}
                style={styles.agentImg}
              />

              <div style={styles.vs}>VS</div>

              <motion.img
                src={Raze}
                animate={{
                  x: story[currentScene].speaker === "Raze" ? 0 : 20,
                  opacity: story[currentScene].speaker === "Raze" ? 1 : 0.6,
                }}
                style={{
                  ...styles.agentImg,
                  filter: "drop-shadow(0 0 15px rgba(255, 243, 70, 0.4))",
                }}
              />
            </div>

            {/* 3. RESPONSIVE DIALOGUE UI */}
            <div style={styles.uiContainer}>
              <div style={styles.dialogueBox}>
                <div style={styles.nameTag}>{story[currentScene].speaker}</div>
                <div style={styles.charTag}>
                  <img
                    style={styles.charStyle}
                    src={story[currentScene].bg}
                    alt="Agent"
                  />
                </div>
                <p style={styles.text}>
                  {displayedText}
                  <span className="cursor">_</span>
                </p>

                {/* Choices */}
                <AnimatePresence>
                  {showChoices && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={styles.choiceWrapper}
                    >
                      {story[currentScene].choices.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setCurrentScene(c.next);
                            setShowChoices(false);
                          }}
                          style={styles.choiceBtn}
                        >
                          {c.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Audio */}
                <audio src={story[currentScene].audio} autoPlay></audio>

                {/* Final Buttons */}
                {story[currentScene].isFinalQuestion && !isTyping && (
                  <div style={styles.finalWrapper}>
                    <motion.button
                      animate={{ scale: yesScale }}
                      style={styles.yesBtn}
                      onClick={() => setGameState("success")}
                    >
                      YES
                    </motion.button>
                    <motion.button
                      animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                      onMouseEnter={handleNoHover}
                      onTouchStart={handleNoHover} // Mobile support
                      style={styles.noBtn}
                    >
                      NO
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {gameState === "success" && (
          <motion.div
            key="win"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={styles.successScreen}
          >
            <h1 style={styles.successTitle}>MISSION ACCOMPLISHED</h1>
            <p style={styles.successSub}>
              See you on the site, Valentine! 🧨🔥
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#0f1923",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily: '"Oswald", sans-serif',
    // padding: "1rem",
  },
  vs: { fontSize: "2rem", color: "#ff4655", fontWeight: "bold" },
  scanlines: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))",
    backgroundSize: "100% 4px, 3px 100%",
    pointerEvents: "none",
    zIndex: 10,
  },
  vignette: {
    position: "absolute",
    width: "100%",
    height: "100%",
    boxShadow: "inset 0 0 150px rgba(0,0,0,0.7)",
    pointerEvents: "none",
    zIndex: 11,
  },
  viewPort: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5%",
    paddingBottom: "20px",
    zIndex: 2,
    height: "40vh",
  },
  agentImg: {
    height: "100%",
    maxWidth: "45%",
    objectFit: "contain",
    filter: "drop-shadow(0 0 15px rgba(255, 70, 85, 0.4))",
  },
  uiContainer: {
    height: "35%",
    padding: "10px",
    zIndex: 12,
    display: "flex",
    justifyContent: "center",
  },
  dialogueBox: {
    width: "100%",
    maxWidth: "900px",
    height: "100%",
    background: "rgba(15, 25, 35, 0.9)",
    border: "2px solid #ff4655",
    padding: "20px",
    position: "relative",
    boxSizing: "border-box",
  },
  nameTag: {
    position: "absolute",
    top: "-15px",
    left: "20px",
    background: "#ff4655",
    color: "white",
    padding: "2px 15px",
    fontWeight: "bold",
    letterSpacing: "2px",
    fontSize: "1.1rem",
  },
  charTag: {
    position: "absolute",
    top: "-120px",
    /* left: auto; */
    /* background: rgb(255, 70, 85); */
    /* color: white; */
    /* padding: 2px 15px; */
    /* font-weight: bold; */
    /* letter-spacing: 2px; */
    /* font-size: 1.1rem; */
    right: "-26px",
  },
  charStyle: {
    width: "12rem",
    height: "12rem",
    objectFit: "cover",
  },
  text: {
    color: "#ece8e1",
    fontSize: "clamp(1rem, 4vw, 1.5rem)",
    lineHeight: "1.4",
    margin: 0,
    fontFamily: "monospace",
    marginTop: "3rem",
    minHeight: "3em",
  },
  // text: { fontSize: "1.2rem", lineHeight: "1.5", minHeight: "3em" },
  choiceWrapper: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  choiceBtn: {
    background: "rgba(236, 232, 225, 0.1)",
    color: "#ffb300",
    border: "1px solid #ffb300",
    padding: "8px",
    cursor: "pointer",
    textAlign: "left",
    transition: "0.2s",
  },
  finalWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginTop: "20px",
  },
  yesBtn: {
    background: "#ff4655",
    color: "white",
    padding: "10px 30px",
    border: "none",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  noBtn: {
    background: "#ece8e1",
    color: "#0f1923",
    padding: "10px 20px",
    border: "none",
    fontWeight: "bold",
  },

  // container: {
  //   width: "100vw",
  //   height: "100vh",
  //   background: "#0f1923",
  //   color: "#ece8e1",
  //   overflow: "hidden",
  //   position: "relative",
  //   fontFamily: "sans-serif",
  // },
  loadingScreen: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle, #1f2326 0%, #0f1923 100%)",
  },
  matchBox: {
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "40px",
    background: "rgba(0,0,0,0.3)",
  },
  matchGif: { width: "100%", height: "50vh", objectFit: "contain" },
  matchTitle: {
    color: "#ffb300",
    fontSize: "2.5rem",
    margin: "0 0 10px 0",
    letterSpacing: "4px",
  },
  mapText: { color: "#888", marginBottom: "30px", letterSpacing: "2px" },
  acceptBtn: {
    background: "#00ad8e",
    color: "white",
    padding: "15px 60px",
    border: "none",
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(0, 173, 142, 0.4)",
  },

  // viewPort: {
  //   height: "65%",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "flex-end",
  //   gap: "5%",
  //   zIndex: 2,
  // },
  // agentImg: { height: "80%", maxWidth: "45%", objectFit: "contain" },

  // uiContainer: {
  //   height: "35%",
  //   padding: "10px",
  //   display: "flex",
  //   justifyContent: "center",
  // },
  // dialogueBox: {
  //   width: "100%",
  //   maxWidth: "800px",
  //   background: "rgba(15, 25, 35, 0.95)",
  //   border: "2px solid #ff4655",
  //   padding: "20px",
  //   position: "relative",
  // },
  // nameTag: {
  //   position: "absolute",
  //   top: "-15px",
  //   left: "20px",
  //   background: "#ff4655",
  //   padding: "2px 15px",
  //   fontWeight: "bold",
  // },

  // choiceWrapper: {
  //   display: "flex",
  //   flexDirection: "column",
  //   gap: "10px",
  //   marginTop: "10px",
  // },
  // choiceBtn: {
  //   background: "transparent",
  //   color: "#ffb300",
  //   border: "1px solid #ffb300",
  //   padding: "10px",
  //   textAlign: "left",
  //   cursor: "pointer",
  // },

  // finalWrapper: {
  //   display: "flex",
  //   justifyContent: "center",
  //   gap: "50px",
  //   marginTop: "20px",
  // },
  // yesBtn: {
  //   background: "#ff4655",
  //   color: "white",
  //   padding: "10px 40px",
  //   border: "none",
  //   fontWeight: "bold",
  // },
  // noBtn: {
  //   background: "#ece8e1",
  //   color: "#0f1923",
  //   padding: "10px 20px",
  //   border: "none",
  //   fontWeight: "bold",
  // },

  successScreen: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#ff4655",
  },
  successTitle: { fontSize: "4rem", margin: 0 },
  successSub: { fontSize: "1.5rem" },
  // scanlines: {
  //   position: "absolute",
  //   width: "100%",
  //   height: "100%",
  //   background:
  //     "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)",
  //   backgroundSize: "100% 4px",
  //   pointerEvents: "none",
  // },
};

export default ValentinePage;
