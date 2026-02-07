import FlamesInMyViens from "../assets/image/Flames_in_my_Veins_Spray.webp";
import Raze_Here_Spray from "../assets/image/Raze_Here_Spray.webp";
import RazeConvo from "../assets/audio/razeconvo.mp3";
import Dont from "../assets/audio/dont.mp3";
import Phoneix from "../assets/image/Phoenix.webp";
import Did_You_Drop_This_Spray from "../assets/image/Did_You_Drop_This_Spray.webp";
import Heaven_or_Hell_Spray from "../assets/image/Heaven_or_Hell_Spray.webp";
import Whtudoing from "../assets/audio/whtudoing.mp3";
import Phoneix_im_sorry from "../assets/audio/raze/phoneix_im_sorry.mp3";
import Yes_im_pumped from "../assets/audio/raze/yes_im_pumped.mp3";
import Thathowitgetdone from "../assets/audio/thathowitgetdone.mp3";

export const story = {
  start: {
    text: "Yo, Raze! Think you can keep up with me this Valentine's?",
    speaker: "Phoenix",
    bg: FlamesInMyViens,
    choices: [
      {
        label: "Yes! I'm pumped!",
        next: "r_playful",
      },
      {
        label: "Phoenix, you're a star! Get it? Ahah. Okay, I am sorry.",
        next: "r_nah",
      },
    ],
    audio: RazeConvo,
  },
  r_playful: {
    text: "Yes! I'm pumped!",
    speaker: "Raze",
    bg: Raze_Here_Spray,
    choices: [{ label: "Continue", next: "p_playful" }],
    audio: Yes_im_pumped,
  },
  r_nah: {
    text: "Phoenix, you're a star! Get it? Ahah. Okay, I am sorry.",
    speaker: "Raze",
    bg: Heaven_or_Hell_Spray,
    choices: [{ label: "Continue", next: "p_rejected" }],
    audio: Phoneix_im_sorry,
  },
  p_playful: {
    text: "That's what I like to hear! So... will you be my Valentine and make some noise with me?",
    speaker: "Phoenix",
    bg: Did_You_Drop_This_Spray,
    audio: Thathowitgetdone,
    isFinalQuestion: true,
  },
  p_rejected: {
    text: "Ouch... cold as ice. But you know I don't give up. Let's try that again!",
    speaker: "Phoenix",
    bg: Did_You_Drop_This_Spray,
    audio: Whtudoing,
    choices: [{ label: "Fine, show me what you got.", next: "start" }],
  },
};
