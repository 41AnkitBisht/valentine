import FlamesInMyViens from "../assets/image/Flames_in_my_Veins_Spray.webp";
import Raze_Here_Spray from "../assets/image/Raze_Here_Spray.webp";
import Did_You_Drop_This_Spray from "../assets/image/Did_You_Drop_This_Spray.webp";
import RazeConvo from "../assets/audio/razeconvo.mp3";
import Heaven_or_Hell_Spray from "../assets/image/Heaven_or_Hell_Spray.webp";
import Phoneix from "../assets/image/Phoenix.webp";
import My_Eyes_Spray from "../assets/image/My_Eyes_Spray.webp";
import Pretty_Pretty_Please_Spray from "../assets/image/Pretty_Pretty_Please_Spray.webp";
import Phoenix_Rise_Spray from "../assets/image/Phoenix_Rise_Spray.webp";

import Dont from "../assets/audio/dont.mp3";
import Whtudoing from "../assets/audio/whtudoing.mp3";
import Phoneix_im_sorry from "../assets/audio/raze/phoneix_im_sorry.mp3";
import Yes_im_pumped from "../assets/audio/raze/yes_im_pumped.mp3";
import Thathowitgetdone from "../assets/audio/thathowitgetdone.mp3";
import Just_wamed_up from "../assets/audio/just_wamed_up.mp3";
import You_know_vibe from "../assets/audio/raze/you_know_vibe.mp3";
import You_tried from "../assets/audio/you_tried.mp3";

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
    text: "You tried! I stopped that. But you know I don't give up.",
    speaker: "Phoenix",
    bg: My_Eyes_Spray,
    audio: You_tried,
    choices: [
      { label: "Fine, show me what you got.", next: "start" },
      {
        label:
          "I shouldn't have to say this because, you know, my vibe, but, stay clear of my explosions, okay?",
        next: "r_rejected1",
      },
    ],
    // choices: [{ label: "Fine, show me what you got.", next: "start" }],
  },
  r_rejected1: {
    text: "I shouldn't have to say this because, you know, my vibe, but, stay clear of my explosions, okay?",
    speaker: "Raze",
    bg: Pretty_Pretty_Please_Spray,
    audio: You_know_vibe,
    choices: [{ label: "Continue", next: "p_rejected1" }],
  },
  p_rejected1: {
    text: "Just warmed up! You know how I get done! So, what do you say? Will you be my Valentine?",
    speaker: "Phoenix",
    bg: Phoenix_Rise_Spray,
    audio: Just_wamed_up,
    choices: [{ label: "Fine, show me what you got.", next: "start" }],
  },
};
