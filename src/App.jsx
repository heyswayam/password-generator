import { useState, useEffect, useRef, useCallback } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [allowChar, setallowChar] = useState(false);
  const [allowNum, setallowNum] = useState(false);
  const [password, setPassword] = useState("");

  const passwordReference = useRef(null);
  const rangeValue = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (allowChar) str += "!@#$%^&*(){}";
    if (allowNum) str += "1234567890";

    let pass = ""
    for (let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length)
      // console.log("ind: " + ind + " str: " + str[ind]);
      pass += str[ind]
    }

    setPassword(pass);
  }, [length, allowChar, allowNum, setPassword])
  const copyClipBoard = () => {
    passwordReference.current?.select();
    console.log(rangeValue.current.value);
    window.navigator.clipboard.writeText(password);
  }
  useEffect(() => {
    passwordGenerator()
  }, [length, allowChar, allowNum])
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-full h-full flex ">

        <div className="w-9/12 md:w-5/12 h-fit flex flex-col  mx-auto shadow-md rounded-lg px-4 py-5 mt-32  bg-gray-500/30 text-white">
          <h1 className='text-white text-center my-3 font-mono'>Password Generator</h1>
          <div className="flex text-gray-500">
            <textarea ref={passwordReference} className='p-2 rounded-md w-full' name="" placeholder='password' id="" rows="1" readOnly value={password}> </textarea>
            <button
              type="button"
              onClick={copyClipBoard}
              className="rounded-md bg-blue-600/70 ml-4 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Copy
            </button>
          </div>
          <div className='flex flex-col justify-between w-full mt-3 py-2 rounded-sm'>
            <div className='flex flex-col justify-between md:flex-row mb-3'>
              <input ref={rangeValue} type="range" className='w-10/12' name="" id="rangeLength" defaultValue={8} min={6} max={20} onChange={(e) => setLength(e.target.value)} />
              <label htmlFor="rangeLength" className=' w-20 md:text-center'>Length: {length} </label>
            </div>
            <div className='flex'>
              <input type="checkbox" name="" id="numberInput" onClick={() => { setallowNum(prev => !prev) }} />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex'>
              <input type="checkbox" name="" id="characterInput" onClick={() => { setallowChar(prev => !prev) }} />
              <label htmlFor="characterInput">Character</label>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
