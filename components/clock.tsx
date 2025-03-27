import React, { useState, useEffect } from "react"
import NumberFlow, { NumberFlowGroup } from "@number-flow/react"

export function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hh = time.getHours()
  const mm = time.getMinutes()
  const ss = time.getSeconds()

  return (
    <div className="text-4xl font-light tracking-wider text-center flex justify-center">
      <NumberFlowGroup>
        <div
          style={{
            fontVariantNumeric: "tabular-nums",
            ["--number-flow-char-height" as string]: "0.85em",
          }}
          className="flex items-baseline font-semibold text-3xl"
        >
          <NumberFlow
            value={hh}
            format={{ minimumIntegerDigits: 2 }}
            digits={{ 1: { max: 2 }, 0: { max: 9 } }}
          />
          <NumberFlow
            prefix=":"
            value={mm}
            digits={{ 1: { max: 5 }, 0: { max: 9 } }}
            format={{ minimumIntegerDigits: 2 }}
          />
          <NumberFlow
            prefix=":"
            value={ss}
            digits={{ 1: { max: 5 }, 0: { max: 9 } }}
            format={{ minimumIntegerDigits: 2 }}
          />
        </div>
      </NumberFlowGroup>
    </div>
  )
}
