// import React, { useState } from "react";
// import { motion } from "framer-motion";
import Phoneix from "../assets/image/Phoenix.webp";
import Raze from "../assets/image/Raze.webp";
import Radiant from "../assets/image/radiant.png";

import Boomtastic_Spray from "../assets/gif/Boomtastic_Spray.gif";

import Lets_start_party from "../assets/audio/raze/lets_start_party.mp3";
import Arcade_melody from "../assets/audio/arcade-melody.mp3";

import { story } from "../data";
import confetti from "canvas-confetti";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, color } from "framer-motion";

const ValentinePage = () => {
  // --- STORY DATA ---

  // --- STATE ---
  const [gameState, setGameState] = useState("sound-check"); // 'loading', 'vn', 'success'
  const [currentScene, setCurrentScene] = useState("start");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const arcadeRef = useRef(null);

  // --- TYPEWRITER LOGIC ---
  useEffect(() => {
    if (arcadeRef.current && arcadeRef.current.volume !== undefined) {
      arcadeRef.current.volume = 0.05;
    }
    if (gameState !== "vn") return;
    // if(gameState === "loading") {
    //   const timer = setTimeout(() => setGameState("vn"), 2000);
    //   return () => clearTimeout(timer);
    // }

    console.log("Arcade melody volume set to 0.3", arcadeRef.current);
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

  const handleFinalYes = () => {
    setGameState("success");
    arcadeRef.current.pause();

    const end = Date.now() + 15 * 1000; // 5 seconds duration
    const razeColors = ["#ff4655", "#ffb300", "#00ad8e", "#fe019a", "#ece8e1"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: razeColors,
        scalar: 1.2,
        drift: 0.5,
        ticks: 200,
      });

      // Right side cannon
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: razeColors,
      });

      // Keep the animation going until time is up
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div
      style={{ ...styles.container, backgroundImage: story[currentScene].bg }}
    >
      <audio
        src={Arcade_melody}
        controls
        loop
        className="arcade-melody"
        ref={arcadeRef}
        style={{ display: "none" }}
      ></audio>
      <AnimatePresence mode="wait">
        {gameState === "sound-check" && (
          <motion.div
            key="boot"
            exit={{ opacity: 0, y: -20 }}
            style={styles.bootScreen}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={styles.systemText}
            >
              {">"} SYSTEM: INITIALIZING AGENT_COMM_LINK...
              <br />
              {">"} STATUS: AUDIO_DRIVERS_PENDING...
            </motion.div>

            <motion.button
              whileHover={{ backgroundColor: "#00ad8e", color: "#0f1923" }}
              onClick={() => {
                // Trigger a tiny silent sound to "unlock" audio
                const context = new (
                  window.AudioContext || window.webkitAudioContext
                )();
                context.resume();
                arcadeRef.current.play();
                setGameState("loading");
              }}
              style={styles.powerBtn}
            >
              ENABLE TRANSMISSION
            </motion.button>

            <p style={{ marginTop: "20px", color: "#444", fontSize: "0.8rem" }}>
              (Turn on sound for the full experience)
            </p>
          </motion.div>
        )}
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
                      onClick={handleFinalYes}
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
            <img
              src={Radiant}
              style={{
                width: "300px",
                height: "300px",
                marginBottom: "20px",
                borderRadius: "10%",
                aspectRatio: "1 / 1",
              }}
            />
            <audio src={Lets_start_party} autoPlay></audio>
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
    maxWidth: "55%",
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
  successTitle: { fontSize: "4rem", margin: 0, color: "white" },
  successSub: { fontSize: "1.5rem", color: "rgba(255, 255, 255, 0.8)" },
  // scanlines: {
  //   position: "absolute",
  //   width: "100%",
  //   height: "100%",
  //   background:
  //     "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)",
  //   backgroundSize: "100% 4px",
  //   pointerEvents: "none",
  // },
  bootScreen: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f1923",
    color: "#00ad8e", // Valorant Teal
    fontFamily: "'Courier New', monospace",
    textAlign: "center",
    padding: "20px",
  },
  systemText: {
    fontSize: "0.9rem",
    marginBottom: "30px",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  powerBtn: {
    background: "transparent",
    color: "#00ad8e",
    border: "2px solid #00ad8e",
    padding: "15px 40px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(0, 173, 142, 0.2)",
    transition: "0.3s all",
  },
};

export default ValentinePage;
