import "./styles.css";
import { useState } from "react";

const MAX_DECIMAL = 8;
function NumberButton(props) {
  const onClick = () => {
    props.onClick(props.num);
  };
  let numberClass = props.num === "0" ? "cal-zero-button" : "cal-number-button";
  return (
    <button className={"cal-button-general " + numberClass} onClick={onClick}>
      {props.num}
    </button>
  );
}

function OperatorButton(props) {
  const onClick = () => {
    props.onClick(props.operator);
  };
  let myClass = "cal-button-general ";
  myClass +=
    props.operator === props.pressedOperator
      ? "cal-operator-highlight"
      : "cal-operator-button";
  return (
    <button className={myClass} onClick={onClick}>
      {props.operator}
    </button>
  );
}

function CommandButton(props) {
  const onClick = () => {
    props.onClick();
  };
  return (
    <button className="cal-button-general cal-command-button" onClick={onClick}>
      {props.command}
    </button>
  );
}

export default function App() {
  const [operator, setOperator] = useState("");
  const [pressedOperator, setPressedOperator] = useState("");
  const [leftValue, setLeftValue] = useState("0");
  const [rightValue, setRightValue] = useState("0");
  const [showValue, setShowValue] = useState("0");

  const handleNumber = (num) => {
    if (num === "." && showValue.indexOf(".") > -1) {
      return;
    }
    if (pressedOperator === "" && (showValue !== "0" || num === ".")) {
      let tmp = showValue + num;
      setShowValue(tmp);
      setRightValue(tmp);
    } else {
      setShowValue(num);
      setRightValue(num);
      setPressedOperator("");
    }
  };

  const handleOperator = (operator) => {
    console.log(operator);
    if (operator === "=") {
      doCalculate();
    } else {
      let tmp = showValue;
      setLeftValue(tmp);
      setRightValue(tmp);
      setOperator(operator);
      setPressedOperator(operator);
    }
  };

  const doCalculate = () => {
    let result;
    const leftNum = parseFloat(leftValue);
    const rightNum = parseFloat(rightValue);
    if (operator === "+") {
      result = leftNum + rightNum;
    } else if (operator === "-") {
      result = leftNum - rightNum;
    } else if (operator === "*") {
      result = leftNum * rightNum;
    } else if (operator === "/") {
      result = leftNum / rightNum;
    }
    if (result >= Math.pow(10, 16)) {
      result = "NaN";
    }
    let resultForShow =
      result === "NaN"
        ? "NaN"
        : Math.round(result * Math.pow(10, MAX_DECIMAL)) /
          Math.pow(10, MAX_DECIMAL);
    setLeftValue((resultForShow + "").substr(0, 18));
    setShowValue((resultForShow + "").substr(0, 15));
    setPressedOperator("=");
  };

  const handleClear = () => {
    if (showValue === "0") {
      setLeftValue("0");
      setRightValue("0");
      setOperator("");
      setPressedOperator("");
    } else {
      setRightValue("0");
      setShowValue("0");
    }
  };

  const handleChangeSign = () => {
    let tmp = 0 - parseFloat(showValue) + "";
    setShowValue(tmp);
    setLeftValue(tmp);
    setPressedOperator("+/-");
  };

  const handlePercent = () => {
    let tmp = parseFloat(showValue) / 100 + "";
    setShowValue(tmp);
    setLeftValue(tmp);
    setPressedOperator("%");
  };

  return (
    <div className="App">
      <div class="cal-button-container">
        <div className="cal-result-window">
          <div className="cal-result-operator"></div>
          <div className="cal-result-number">{showValue}</div>
        </div>

        <CommandButton
          command={showValue === "0" ? "AC" : "C"}
          onClick={handleClear}
        />
        <CommandButton command="+/-" onClick={handleChangeSign} />
        <CommandButton command="%" onClick={handlePercent} />
        <OperatorButton
          operator="/"
          pressedOperator={pressedOperator}
          onClick={handleOperator}
        />

        <NumberButton num="7" onClick={handleNumber} />
        <NumberButton num="8" onClick={handleNumber} />
        <NumberButton num="9" onClick={handleNumber} />
        <OperatorButton
          operator="*"
          pressedOperator={pressedOperator}
          onClick={handleOperator}
        />

        <NumberButton num="4" onClick={handleNumber} />
        <NumberButton num="5" onClick={handleNumber} />
        <NumberButton num="6" onClick={handleNumber} />
        <OperatorButton
          operator="-"
          pressedOperator={pressedOperator}
          onClick={handleOperator}
        />

        <NumberButton num="1" onClick={handleNumber} />
        <NumberButton num="2" onClick={handleNumber} />
        <NumberButton num="3" onClick={handleNumber} />
        <OperatorButton
          operator="+"
          pressedOperator={pressedOperator}
          onClick={handleOperator}
        />

        <NumberButton num="0" onClick={handleNumber} />
        <NumberButton num="." onClick={handleNumber} />
        <OperatorButton operator="=" onClick={handleOperator} />
      </div>
    </div>
  );
}
