import React, { useEffect, useState, useRef } from "react";
import xbox from "./layouts/xbox";

export default function useGamepad({ onChange = () => {} }) {
  const gamepad = useRef(0);
  const padState = useRef({
    buttons: {
      A: false,
      B: false,
      X: false,
      Y: false,

      LB: false,
      LT: false,
      LS: false,

      RB: false,
      RT: false,
      RS: false,

      Start: false,
      Back: false,

      DPadUp: false,
      DPadRight: false,
      DPadDown: false,
      DPadLeft: false,
    },

    axis: {
      LeftStickX: 0.0,
      LeftStickY: 0.0,

      RightStickX: 0.0,
      RightStickY: 0.0,

      RightTrigger: 0.0,
      LeftTrigger: 0.0,
    },
  });
  const string = useRef([]);
  const update = () => {
    const gp = navigator.getGamepads()[gamepad.current.index];
    gamepad.current = gp;
    updateAllButtons();
    if (window && window.requestAnimationFrame)
      window.requestAnimationFrame(update);
  };
  const updateAllButtons = () => {
    gamepad.current.buttons.forEach((e, i) => {
      const buttonName = xbox.buttons[i];
      if (e.pressed || e.touched) {
        if (buttonName === "Back") {
          if (string.current.length) {
            string.current = [];
            onChange(string.current);
          }
          return;
        }
        if (string.current[string.current.length - 1] !== buttonName) {
          string.current.push(buttonName);
          onChange(string.current);
          return;
        }
      }
    });
  };
  const gpCon = (e) => {
    const gp = navigator.getGamepads()[e.gamepad.index];
    gamepad.current = gp;
    update();
  };
  useEffect(() => {
    window.addEventListener("gamepadconnected", gpCon);
    return () => {
      window.removeEventListener("gamepadconnected", gpCon);
    };
  }, []);
  return null;
}
