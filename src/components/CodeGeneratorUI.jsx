import { useRef, useCallback, useEffect, useState } from 'react';
import React from 'react';

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
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    
    setPassword(pass);
  }, [length, includeNumbers, includeCharacters]);

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  useEffect(() => {
    generateCode();
  }, [generateCode]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl p-8 space-y-8">
        
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
            className="w-full bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-xl px-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Generated Code..."
          />
          <button 
            onClick={copyToClipboard} 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Copy
          </button>
        </div>

        {/* Range Slider */}
        <div className="space-y-4">
          <div className="flex justify-between text-white font-medium">
            <label>Length: <span className="text-purple-400">{length}</span></label>
          </div>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Checkbox Options */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 bg-slate-700/50 p-4 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-700 transition-all text-white">
            <input 
              type="checkbox" 
              checked={includeNumbers}
              className="w-5 h-5 accent-purple-500"
              onChange={() => setIncludeNumbers(prev => !prev)}
            />
            <span>Numbers</span>
          </label>

          <label className="flex items-center space-x-3 bg-slate-700/50 p-4 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-700 transition-all text-white">
            <input 
              type="checkbox" 
              checked={includeCharacters}
              className="w-5 h-5 accent-purple-500"
              onChange={() => setIncludeCharacters(prev => !prev)}
            />
            <span>Characters</span>
          </label>
        </div>

        {/* Generate Button */}
        <button 
          onClick={generateCode}
          className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-[0.98]"
        >
          Generate New Code
        </button>

      </div>
    </div>
  );
};

export default CodeGeneratorUI;