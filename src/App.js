import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const handleClick = text => text.length > 0 && fetch("/api/inp", post(text));
const post = inp => ({
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ input: inp })
});
function hexToBase64(str) {
    return btoa(
        String.fromCharCode.apply(
            null,
            str
                .replace(/\r|\n/g, "")
                .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
                .replace(/ +$/, "")
                .split(" ")
        )
    );
}

function Img(bytes) {
    return <img alt="qr" src={"data:image/png;base64," + bytes} />;
}
function App() {
    const [inp, updateInp] = useState("");
    const [bytes, updateBytes] = useState("");
    const [time, updateTime] = useState("")
    return (
        <div className="App">
            <h1>enter a string of text here to generate a qr code for it</h1>
            <input onChange={e => updateInp(e.target.value)} onKeyDown={e => console.log(e.keyCode)} />
            <button
                onClick={() => {
                   handleClick(inp)
                        .then(binary => binary.json())
                        .then(data => updateBytes("data:image/png;base64," + data));
                  updateTime("Encoded String: " + inp);
                }} 
            >
                Submit
            </button>
            <br/>
            <br/>
            <img alt="" src={bytes} />
            <p>{time}</p>
        </div>
    );
}

export default App;
