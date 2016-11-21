import React from "react"

import Button from "./Button"

const QuizIntro = () => {
  return (
    <div>
      <h2 className="center" style={{display: "block"}}>Are You Ready for the Quiz?</h2>
      <Button
        large
      >
        YES
      </Button>
    </div>
  )
}

export default QuizIntro
