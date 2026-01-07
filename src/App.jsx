import { useState } from "react";
import { langu } from "./langu.js";
import { getFarewellText, randomword } from "./utils.js";
import Confetti from "react-confetti";

import clsx from "clsx";
export default function App() {
  const [currentWord, setCurrentWord] = useState(() => randomword());
  const [guessletters, setGuessletters] = useState([]);

  const wrongGuessCount = guessletters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessletters.includes(letter));
  const isGameLost = wrongGuessCount > langu.length - 2;
  const isGameOver = isGameWon || isGameLost;

  console.log(isGameOver);

  function handleletters(letter) {
    setGuessletters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  function handleNewGame() {
    setCurrentWord(randomword());
    setGuessletters([]);
  }

  const wordarr = currentWord.split("").map((cur, index) => {
    const redclass = clsx(isGameOver && !guessletters.includes(cur) && "red");
    return (
      <span key={index} className={redclass}>
        {isGameOver
          ? cur.toUpperCase()
          : guessletters.includes(cur)
          ? cur.toUpperCase()
          : ""}
      </span>
    );
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboard = alphabet.split("").map((letter, index) => {
    const isguessd = guessletters.includes(letter);
    const iscorrect = isguessd && currentWord.includes(letter);
    const isWrong = isguessd && !currentWord.includes(letter);
    return (
      <button
        disabled={isGameOver}
        className={clsx("keyboardbutton", { green: iscorrect, red: isWrong })}
        key={index}
        onClick={() => handleletters(letter)}
      >
        {letter}
      </button>
    );
  });

  return (
    <>
      <header>
        {" "}
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="status">
        {isGameOver ? (
          isGameWon ? (
            <div className="backgroundgreen">
              <h3>You Won!</h3>
              <p>well done!👏</p>
              <Confetti />
            </div>
          ) : (
            <div className="backgroundred">
              <h3>You lost!</h3>
              <p>start learning assembly!😂</p>
            </div>
          )
        ) : (
          wrongGuessCount > 0 && (
            <p className="farewell">
              {" "}
              {getFarewellText(langu[wrongGuessCount - 1].name)}
            </p>
          )
        )}
      </section>

      <section className="languages">
        {langu.map((cur, index) => (
          <span
            className={index < wrongGuessCount ? "chip lost" : "chip"}
            key={cur.backgroundColor}
            style={{ color: cur.color, backgroundColor: cur.backgroundColor }}
          >
            {cur.name}
          </span>
        ))}
      </section>
      <section className="letters">{wordarr}</section>
      <section className="keyboard">{keyboard}</section>
      {isGameOver && (
        <button onClick={handleNewGame} className="new-game">
          New Game
        </button>
      )}
    </>
  );
}
