import React, { useRef, useCallback, useEffect, useState } from 'react';

const CodeGeneratorUI = () => {
  const [password, setPassword] = useState('');
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [length, setLength] = useState(12);

  // 
  const passwordRef=useRef(null);
// function to generate code
  const generateCode = useCallback(() => {
    let pass='';
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    if(includeNumbers){
      str+='0123456789';
    }
// include special characters
    if(includeCharacters){
      str+='!@#$%^&*()_+~`|}{[]:;?><,./-=';
    }
    // generate code
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
      setPassword(pass);
    }
  },[
    setPassword,includeNumbers,includeCharacters,length
  ]);
  
  const copyToClipboard=useCallback(()=>{
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password);
  },[password]);
useEffect(() => {
  generateCode();
}, [length, includeNumbers, includeCharacters,generateCode]); 
// UI rendering
  return (
    <div className="min-h-screen flex items-center justify-center bg-fixed bg-linear-to-br from-indigo-900 via-purple-800 to-pink-700 p-6">
      
      {/* Main Card */}
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 space-y-8">
        
        <h2 className="text-3xl font-extrabold text-center text-white tracking-tight">
          Code Generator
        </h2>

        {/* Output Section */}
        <div className="relative group">
          <input
            type="text"
            readOnly
            placeholder="Generated Code..."
            className="w-full bg-black/30 border border-white/10 text-emerald-400 font-mono text-xl px-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-inner"
            value={password}
            ref={passwordRef}
          />
          <button onClick={copyToClipboard} className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-colors active:scale-95">
            Copy
          </button>
        </div>

        {/* Range Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-white font-medium">
            <label>Length</label>
            <span className="bg-purple-600/50 px-3 py-1 rounded-full text-sm">{length}</span>
          </div>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
        </div>

        {/* Checkbox Options */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-white/20 bg-transparent text-purple-600 focus:ring-purple-500 focus:ring-offset-0" 
              onChange={(e) => setIncludeNumbers(!includeNumbers)}
            />
            <span className="text-white font-medium" >Numbers</span>
          </label>

          <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-white/20 bg-transparent text-purple-600 focus:ring-purple-500 focus:ring-offset-0" 
              onChange={(e) => setIncludeCharacters(!includeCharacters)}
            />
            <span className="text-white font-medium">Characters</span>
          </label>
        </div>

        {/* Generate Button */}
        <button onClick={()=>{setPassword(generateCode)}}  className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-[0.98]">
          Generate New Code
        </button>

      </div>
    </div>
  );
};

export default CodeGeneratorUI;