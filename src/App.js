// imports
import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  // states
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  // constants
  const width = 8;
  const colors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];

  // creating initial board
  const createBoard = () => {
    const randomColorArrangement = [];

    // creating 64 random colors
    for (let i = 0; i < width * width; i++) {
      // assigning random number to each color
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // push random color into random color arrangement array
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  // checking for columns of three
  const checkForColumnOfThree = () => {
    // 47 is the 3 last box before the end
    for (let i = 0; i < 47; i++) {
      const colOfThree = [i, i + width, i + width * 2];

      // the color that we are gonna check in our column
      const decidedColor = currentColorArrangement[i];

      // if a square in our column of 3 matches the decided color, its a match
      if (
        colOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        colOfThree.forEach((item) => (currentColorArrangement[item] = ''));
      }
    }
  };

  // checking for columns of four
  const checkForColumnOfFour = () => {
    // 47 is the 3 last box before the end
    for (let i = 0; i < 39; i++) {
      const colOfFour = [i, i + width, i + width * 2, i + width * 3];

      // the color that we are gonna check in our column
      const decidedColor = currentColorArrangement[i];

      // if a square in our column of 4 matches the decided color, its a match
      if (
        colOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        colOfFour.forEach((item) => (currentColorArrangement[item] = ''));
      }
    }
  };

  // checking for rows of three
  const checkForRowOfThree = () => {
    // 47 is the 3 last box before the end
    for (let i = 0; i < 64; i++) {
      const rowlOfThree = [i, i + 1, i + 2];

      // the first square we come across
      const decidedColor = currentColorArrangement[i];

      // last 2 columns are not valid because there isnt 3 more to check after
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 54, 63, 64,
      ];

      // if i matches a number in notValid array then move on
      if (notValid.includes(i)) continue;

      // if a square in our column of 3 matches the decided color, its a match
      if (
        rowlOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        rowlOfThree.forEach((item) => (currentColorArrangement[item] = ''));
      }
    }
  };

  // checking for rows of four
  const checkForRowOfFour = () => {
    // 47 is the 3 last box before the end
    for (let i = 0; i < 64; i++) {
      const rowlOfThree = [i, i + 1, i + 2, i + 3];

      // the first square we come across
      const decidedColor = currentColorArrangement[i];

      // last 2 columns are not valid because there isnt 4 more to check after
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 54, 62, 63, 64,
      ];

      // if i matches a number in notValid array then move on
      if (notValid.includes(i)) continue;

      // if a square in our column of 3 matches the decided color, its a match
      if (
        rowlOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        rowlOfThree.forEach((item) => (currentColorArrangement[item] = ''));
      }
    }
  };

  // move our squares down
  const moveSquareDown = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      // if first row and its empty then generate a new random color
      if (isFirstRow && currentColorArrangement[i] === '') {
        let randomNum = Math.floor(Math.random() * colors.length);
        currentColorArrangement[i] = colors[randomNum];
      }
      // if the one were looping over is blank,
      // then we are getting the one were looping over and moving it down
      if (currentColorArrangement[i + width] === '') {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = '';
      }
    }
  };

  // creating board after initial render
  useEffect(() => {
    createBoard();
  }, []);

  // interval set for check columns
  useEffect(() => {
    // check every 100 milleseconds
    const timer = setInterval(() => {
      // checking for 4 before columns of 3 for squares that could potentially be 4
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveSquareDown();

      // change current color arrangement and reset it
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);

    // clear interval from use effect
    return () => clearInterval(timer);
  }, [
    checkForColumnOfThree,
    checkForColumnOfFour,
    checkForRowOfThree,
    checkForRowOfFour,
    moveSquareDown,
  ]);

  console.log(currentColorArrangement);
  return (
    <div className='app'>
      <div className='game'>
        {currentColorArrangement.map((color, index) => (
          <img
            className='image'
            key={index}
            style={{ backgroundColor: color }}
            alt={color}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
