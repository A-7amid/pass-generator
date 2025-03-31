import React, { useEffect, useState } from "react";
import AlertCopied from "./components/AlertCopied";

function App() {
  const [passwordLength, setPasswordLength] = useState(4);
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const AToZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const aToz = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let a = "";

  const generatePassword = () => {
    const capital = document.getElementById("capital") as HTMLInputElement;
    const small = document.getElementById("small") as HTMLInputElement;
    const number = document.getElementById("number") as HTMLInputElement;
    const symbol = document.getElementById("symbol") as HTMLInputElement;

    const arr = [""];
    let mainArr = [];

    if (capital.checked) arr.push(AToZ);
    if (small.checked) arr.push(aToz);
    if (number.checked) arr.push(numbers);
    if (symbol.checked) arr.push(symbols);
    console.log(arr);

    for (let i = 0; i < passwordLength; i++) {
      mainArr.splice(0, 0, arr[Math.floor(Math.random() * arr.length)]);
    }
    console.log(mainArr);

    for (let i = 0; i < passwordLength; i++) {
      a += mainArr[i].charAt(Math.floor(Math.random() * mainArr[i].length));
    }
    setPassword(a);
    console.log(password);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 w-110">
        <div>
          <h3 className="text-2xl font-semibold">Password Generator</h3>
          <span className="text-gray-400 text-sm font-medium">
            Create secure, random passwords
          </span>
        </div>

        <div className="flex mb-4 mt-4 border border-gray-700 rounded-lg px-1 py-1 justify-between items-center">
          <span className="pl-2">{password}</span>
          <div className="flex gap-x-1">
            <svg
              onClick={() => {
                navigator.clipboard.writeText(password);
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 2000);
              }}
              className="icons"
              xmlns="http://www.w3.org/2000/svg"
              height="22px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#e3e3e3"
            >
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
            </svg>

            <svg
              onClick={generatePassword}
              className="icons"
              xmlns="http://www.w3.org/2000/svg"
              height="22px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#e3e3e3"
            >
              <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
            </svg>
          </div>
        </div>

        <div className="font-medium text-sm flex flex-col gap-y-4 mb-4 relative">
          <span>Password Length: {passwordLength}</span>
          <input
            type="range"
            value={passwordLength}
            maxLength={40}
            onChange={(e) => setPasswordLength(parseInt(e.target.value))}
            className="px-2 py-1 bg-gray-800 border border-gray-700 rounded-md ml-2 text-sm text-gray-200"
          />
        </div>

        <div className="font-medium text-gray-200 text-sm">
          <span className="font-medium text-sm mt-4 grid grid-cols-2 mb-2">
            Include Characters:
          </span>
          <fieldset>
            <legend className="sr-only">Checkboxes</legend>

            <div className="grid grid-cols-2 items-start gap-3">
              <label
                htmlFor="capital"
                className="inline-flex items-center gap-3"
              >
                <input type="checkbox" className="check-boxes" id="capital" />

                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Uppercase (A-Z)
                </span>
              </label>

              <label htmlFor="small" className="inline-flex items-center gap-3">
                <input type="checkbox" className="check-boxes" id="small" />

                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Lowercase (a-z)
                </span>
              </label>

              <label
                htmlFor="number"
                className="inline-flex items-center gap-3"
              >
                <input type="checkbox" className="check-boxes" id="number" />

                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Numbers (0-9)
                </span>
              </label>

              <label
                htmlFor="symbol"
                className="inline-flex items-center gap-3"
              >
                <input type="checkbox" className="check-boxes" id="symbol" />

                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Symbols (!@#$%)
                </span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col gap-y-2 mb-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">Password Length</span>
            <span className="text-sm text-gray-300">Strong</span>
          </div>

          <div className="w-full line-through"></div>
        </div>

        <button
          onClick={generatePassword}
          className="bg-white text-gray-900 w-full rounded-md py-2 font-medium text-sm cursor-pointer hover:bg-gray-300 transition duration-200"
        >
          Generate Password
        </button>
      </div>

      {showAlert && (
        <div className="absolute top-7">
          <AlertCopied setShowAlert={setShowAlert} />
        </div>
      )}
    </div>
  );
}

export default App;
