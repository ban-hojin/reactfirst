import { useState, useEffect } from "react";
import "./App.css";
import Box from "./component/Box";

const choice = {
  rock: {
    name: "Rock",
    img: "https://media.istockphoto.com/photos/stone-pebble-gray-picture-id1288973456?b=1&k=20&m=1288973456&s=170667a&w=0&h=GBGgp4yrZv4ooDBws8yHF24sJ3rkEpObYsBWpVNKFT8=",
  },
  scissors: {
    name: "Scissors",
    img: "https://www.ikea.com/kr/en/images/products/sy-scissors__0112301_pe263788_s5.jpg?f=s",
  },
  paper: {
    name: "Paper",
    img: "https://www.collinsdictionary.com/images/full/paper_111691001.jpg",
  },
  default: {
    name: "찐빠이뽀",
    img: "https://image.dongascience.com/Photo/2018/06/21f9eeb689b9d11a3286a5c694a97021.jpg",
  }
};

function App() {
  const [userSelect, setUserSelect] = useState(choice.default);
  const [computerSelect, setComputerSelect] = useState(choice.default);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });

  useEffect(() => {
    if (result !== "") {
      const timer = setTimeout(() => {
        setUserSelect(choice.default);
        setComputerSelect(choice.default);
        setResult("");
      }, 1000); // 1초 후 초기화

      return () => clearTimeout(timer);
    }
  }, [result]);

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    const gameResult = judgement(choice[userChoice], computerChoice);
    setResult(gameResult);
    updateScore(gameResult);
  };

  const updateScore = (gameResult) => {
    if (gameResult === "win") {
      setScore(prevScore => ({ ...prevScore, user: prevScore.user + 1 }));
    } else if (gameResult === "lose") {
      setScore(prevScore => ({ ...prevScore, computer: prevScore.computer + 1 }));
    }
    // 'tie'의 경우 점수를 업데이트하지 않음
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice).filter(key => key !== 'default');
    let randomItem = Math.floor(Math.random() * itemArray.length);
    return choice[itemArray[randomItem]];
  };

  const judgement = (user, computer) => {
    if (user.name == computer.name) {
      return "tie";
    } else if (user.name == "Rock") return computer.name == "Scissors" ? "win" : "lose";
    else if (user.name == "Scissors") return computer.name == "Paper" ? "win" : "lose";
    else if (user.name == "Paper") return computer.name == "Rock" ? "win" : "lose";
  };

  return (
    <div>
      <div className="main">
        <Box title="찐빠이뽀 - You" item={userSelect} result={result} />
        <Box title="찐빠이뽀 - Computer" item={computerSelect} result={result} />
      </div>
      <div className="scoreboard">
        <p>Scoreboard</p>
        <p>User: {score.user} | Computer: {score.computer}</p>
      </div>
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;
