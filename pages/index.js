import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
// import startGame from '../components/game'

export default function Home() {
  
  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="X and O game" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {/* <h1 className="flex justify-center content-center items-center text-4xl align-middle text-red-600" id="turn">X</h1> */}
      <div className="border-black fixed m-0 p-0 ml-4 items-center justify-evenly w-[130px]">
        <div className="flex text-black font-bold text-3xl p-4 pb-4 border-black border-b-2" id="xScore">X: 0</div>
        <div className="flex text-black font-bold text-3xl p-4 border-black" id="oScore">O: 0</div>
      </div>
      <div className="board x grid w-[100vw] h-[100vh] justify-center content-center items-center grid-cols-tic-tac m-0 p-0" id="board">
        <div className="cell flex justify-center items-center relative w-[100px] h-[100px] border border-black border-t-0 border-l-0" data-cell></div>
        <div className="cell flex justify-center items-center relative w-[100px] h-[100px] border border-black border-t-0" data-cell></div>
        <div className="cell flex justify-center items-center relative w-[100px] h-[100px] border border-black border-t-0 border-r-0" data-cell></div>
        <div className="cell flex justify-center items-center relative w-[100px] h-[100px] border border-black border-l-0" data-cell></div>
        <div className="cell flex justify-center items-center relative w-[100px] h-[100px] border border-black" data-cell></div>
        <div className="cell flex justify-center items-center relative w-[100px] h-[100px] border border-black border-r-0" data-cell></div>
        <div className="cell flex justify-center items-center relative w-[100px] h-[100px] border border-black border-l-0 border-b-0" data-cell></div>
        <div className="cell flex justify-center items-center relative w-[100px] h-[100px] border border-black border-b-0" data-cell></div>
        <div className="cell flex justify-center items-center relative w-[100px] h-[100px] border border-black border-r-0 border-b-0" data-cell></div>
        <div className="fixed w-[100vw] h-[100vh] justify-center content-center items-center bg-black bg-opacity-95 flex-col hidden" id="endDisplay">
          <h1 className=" text-white text-5xl pb-2" id="winningMsg"></h1>
          <button className="font-bold bg-white text-black hover:bg-black hover:text-white p-1 text-2xl hover:border-white" id="restartBtn">Restart</button>
        </div>
        {typeof window !== 'undefined' ? play() : null}
      </div>

    </div>
  )
}

function play() {
  const X_CLASS = "x"
  const O_CLASS = "o"
  const endDisplay = document.getElementById("endDisplay")
  const winningText = document.getElementById("winningMsg")
  const restartBtn = document.getElementById("restartBtn")
  const boardElement = document.getElementById("board")
  const xScore = document.getElementById("xScore")
  const oScore = document.getElementById("oScore")
  
  const cellElements = document.querySelectorAll("[data-cell]")
  const WINNING_COMBS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]]
  let cTurn
  let xCount = 0
  let oCount = 0
  startGame()

  restartBtn.addEventListener('click', startGame)

  function startGame(){
    cTurn = false
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(O_CLASS)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })
    endDisplay.classList.add("hidden")
    endDisplay.classList.remove("flex")
    
  }
  

  

  function handleClick(e) {
    const cell = e.target
    const currentClass = cTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
      endGame(false)
    }
    else if (checkDraw()) {
      endGame(true)
    }
    else
      swapTurns()
  }

  function checkDraw() { //Could create a counter and if counter == 9, do the draw check
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
  }
  function endGame(draw) {
    endDisplay.classList.remove("hidden")
    endDisplay.classList.add("flex")
    if (draw) {
      winningText.innerText = "Draw"
    }
    else {
      if(cTurn){
        oScore.innerText = `O: ${++oCount}`
      }
      else{
        xScore.innerText = `X: ${++xCount}`
      }
      winningText.innerText = `${!cTurn ? "X's win!" : "O's win!"}`

    }
  }

  function placeMark(cell, currentClass) {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.classList.add(currentClass)
  }

  function swapTurns() {
    if(cTurn) {
      boardElement.classList.remove(O_CLASS)
      boardElement.classList.add(X_CLASS)
    }
    else{
      boardElement.classList.remove(X_CLASS)
      boardElement.classList.add(O_CLASS)
    }
    cTurn = !cTurn
    
  }

  function checkWin(currentClass) {
    return WINNING_COMBS.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
      })
    }
    )
  }
}



