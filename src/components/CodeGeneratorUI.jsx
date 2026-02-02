import { useRef, useCallback, useEffect, useState } from 'react';

const CodeGeneratorUI = () => {
  const [password, setPassword] = useState('');
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [length, setLength] = useState(12);

  const passwordRef = useRef(null);

  const generateCode = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (includeNumbers) str += '0123456789';
    if (includeCharacters) str += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    for (let i = 0; i < length; i++) {
      // +1 hata diya taake index range mein rahe
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    
    setPassword(pass);
  }, [length, includeNumbers, includeCharacters]); // setPassword dependency zaroori nahi hoti

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // Selection range optional hai agar poora copy karna ho
    window.navigator.clipboard.writeText(password);
    alert("Copied to clipboard!");
  }, [password]);

  useEffect(() => {
    generateCode();
  }, [length, includeNumbers, includeCharacters, generateCode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 space-y-8">
        
        <h2 className="text-3xl font-extrabold text-center text-white tracking-tight">
          Code Generator
        </h2>

        {/* Output Section */}
        <div className="relative group">
          <input
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
            className="w-full bg-black/30 border border-white/10 text-emerald-400 font-mono text-xl px-4 py-4 rounded-xl outline-none"
          />
          <button 
            onClick={copyToClipboard} 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg"
          >
            Copy
          </button>
        </div>

        {/* Range Slider */}
        <div className="space-y-4">
          <div className="flex justify-between text-white">
            <label>Length: {length}</label>
          </div>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))} // Input value string hoti hai, Number mein convert karein
            className="w-full cursor-pointer accent-purple-400"
          />
        </div>

        {/* Checkbox Options */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer text-white">
            <input 
              type="checkbox" 
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(prev => !prev)}
            />
            <span>Numbers</span>
          </label>

          <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer text-white">
            <input 
              type="checkbox" 
              checked={includeCharacters}
              onChange={() => setIncludeCharacters(prev => !prev)}
            />
            <span>Characters</span>
          </label>
        </div>

        {/* Generate Button */}
        <button 
          onClick={generateCode} // Sirf function pass karein
          className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl"
        >
          Generate New Code
        </button>

      </div>
    </div>
  );
};

export default CodeGeneratorUI;