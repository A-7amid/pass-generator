import { useEffect, useRef, useState } from "react";
import { LuCopy, LuRefreshCw } from "react-icons/lu";
// import AlertCopied from "./components/AlertCopied";
import { FaCheck } from "react-icons/fa";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [password, setPassword] = useState("");
  // const [showAlert, setShowAlert] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [lineWidth, setLineWidth] = useState(`20%`);
  const [lineColor, setLineColor] = useState(`red`);

  const checkRefCap = useRef<boolean>(true);
  const checkRefSmall = useRef<boolean>(true);
  const checkRefSymbols = useRef<boolean>(false);
  const checkRefNums = useRef<boolean>(false);

  const AToZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const aToz = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  useEffect(() => {
    generatePassword();
  }, []);

  let a = "";

  const generatePassword = () => {
    const capital = document.getElementById("capital") as HTMLInputElement;
    const small = document.getElementById("small") as HTMLInputElement;
    const number = document.getElementById("number") as HTMLInputElement;
    const symbol = document.getElementById("symbol") as HTMLInputElement;

    const arr = [""];
    let mainArr: string[] = [];

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
    if (
      passwordLength === 4 &&
      checkRefNums.current.checked == false &&
      checkRefSymbols.current.checked == false
    ) {
      setPasswordStrength("Very Weak");

      setLineWidth("20%");
      setLineColor("red");
    } else if (passwordLength === 4) {
      setPasswordStrength("Weak");
      setLineWidth("40%");
      setLineColor("orange");
    } else if (
      passwordLength < 8 &&
      checkRefNums.current.checked == false &&
      checkRefSymbols.current.checked == false
    ) {
      setPasswordStrength("Weak");
      setLineWidth("40%");
      setLineColor("orange");
    } else if (passwordLength < 8) {
      setPasswordStrength("Medium");
      setLineWidth("60%");
      setLineColor("yellow");
    } else if (
      passwordLength < 12 &&
      checkRefNums.current.checked == false &&
      checkRefSymbols.current.checked == false
    ) {
      setPasswordStrength("Medium");

      setLineWidth("60%");
      setLineColor("yellow");
    } else if (passwordLength < 12) {
      setPasswordStrength("Strong");

      setLineWidth("80%");
      setLineColor("green");
    } else if (
      passwordLength < 16 &&
      checkRefNums.current.checked == false &&
      checkRefSymbols.current.checked == false
    ) {
      setPasswordStrength("Strong");
      setLineWidth("80%");
      setLineColor("green");
    } else if (passwordLength < 16) {
      setPasswordStrength("Very Strong");
      setLineWidth("100%");
      setLineColor("lime");
    } else if (passwordLength > 16) {
      setPasswordStrength("Very Strong");
      setLineWidth("100%");
      setLineColor("lime");
    }
  }, [passwordLength]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white select-none">
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
            <LuCopy
              className="icons"
              onClick={() => {
                navigator.clipboard.writeText(password);
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 4000);
              }}
            />

            <LuRefreshCw className="icons" onClick={generatePassword} />
          </div>
        </div>

        <div className="font-medium text-sm flex flex-col gap-y-4 mb-4 relative">
          <span>Password Length: {passwordLength}</span>
          <input
            type="range"
            value={passwordLength}
            min={4}
            max={20}
            onChange={(e) => setPasswordLength(parseInt(e.target.value))}
            className="bg-zinc-900 py-[3px] appearance-none h-1 rounded-lg cursor-pointer 
           accent-black border-white"
            style={{
              background: `linear-gradient(to right, white ${
                ((passwordLength - 4) / 16) * 100
              }%, #18181b ${((passwordLength - 4) / 16) * 100}%)`,
            }}
          />
          <style>
            {`
              input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          background: black;
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
              }
              input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          background: black;
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
              }
              input[type="range"]::-ms-thumb {
          height: 16px;
          width: 16px;
          background: black;
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
              }
            `}
          </style>
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
                className="inline-flex items-center gap-x-2"
              >
                <input
                  ref={checkRefCap}
                  type="checkbox"
                  className="check-boxes"
                  id="capital"
                />
              </label>

              <label
                htmlFor="small"
                className="inline-flex items-center gap-x-2"
              >
                <input
                  ref={checkRefSmall}
                  type="checkbox"
                  className="check-boxes hidden"
                  id="small"
                />
                {/* <div className="border border-white  items-center justify-center rounded-sm p-[3px] flex">
                  <FaCheck className="size-2 text-transparent peer-checked:block" />
                </div> */}{" "}
                <label className="flex items-center cursor-pointer">
                  {/* Hidden native checkbox */}
                  <input type="checkbox" className="peer hidden" />
                  {/* Custom styled checkbox */}
                  <div className="border border-white items-center justify-center rounded-sm p-[12px] flex">
                    <FaCheck className="size-24 bg-white text-transparent hidden peer-checked:block" />
                  </div>
                </label>
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Lowercase (a-z)
                </span>
              </label>

              <label
                htmlFor="number"
                className="inline-flex items-center gap-x-2"
              >
                <input
                  ref={checkRefNums}
                  type="checkbox"
                  className="check-boxes"
                  id="number"
                />

                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Numbers (0-9)
                </span>
              </label>

              <label
                htmlFor="symbol"
                className="inline-flex items-center gap-x-2"
              >
                <input
                  ref={checkRefSymbols}
                  type="checkbox"
                  className="check-boxes"
                  id="symbol"
                />

                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Symbols (!@#$%)
                </span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col gap-y-2 mb-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">Password Strength</span>
            <span className="text-sm text-gray-300">{passwordStrength}</span>
          </div>

          <div className="w-full bg-zinc-700 relative flex h-2 rounded-3xl">
            <div
              style={{ backgroundColor: lineColor, width: lineWidth }}
              className={`h-full rounded-3xl`}
            ></div>
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="bg-white text-gray-900 w-full rounded-md py-2 font-medium text-sm cursor-pointer hover:bg-gray-300 transition duration-200"
        >
          Generate Password
        </button>
      </div>

      {/* {showAlert && (
        <div className="absolute top-7">
          <AlertCopied setShowAlert={setShowAlert} />
        </div>
      )} */}
    </div>
  );
}

export default App;
