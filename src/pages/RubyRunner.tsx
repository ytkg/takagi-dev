import React, { useState, useEffect, useRef } from 'react';
import * as RubyWASM from 'ruby-head-wasm-wasi';

interface RubyVM {
  eval: (code: string) => Promise<unknown>;
  print: (stream: 'stdout' | 'stderr', message: string) => void;
}

const RubyRunner: React.FC = () => {
  const [code, setCode] = useState('puts "Hello, World!"');
  const [output, setOutput] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);
  const vmRef = useRef<RubyVM | null>(null);

  useEffect(() => {
    const initializeVM = async () => {
      setOutput('Initializing Ruby VM...\nPlease wait, it may take a moment.');
      try {
        const vm = await RubyWASM.DefaultRubyVM();
        vmRef.current = vm;
        setIsInitializing(false);
        setOutput('Ruby VM is ready. Click "Run" to execute code.');
      } catch (err) {
        console.error('Failed to initialize Ruby VM:', err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setOutput('Error: Failed to initialize Ruby VM.\n' + errorMessage);
        setIsInitializing(false);
      }
    };

    initializeVM();
  }, []);

  const runCode = async () => {
    if (!vmRef.current) {
      setOutput('VM not initialized.');
      return;
    }
    setOutput('Running...');
    try {
      let capturedOutput = '';
      // Override the print function to capture stdout and stderr
      vmRef.current.print = (_stream: 'stdout' | 'stderr', message: string) => {
        capturedOutput += message;
      };

      await vmRef.current.eval(code);
      setOutput(capturedOutput || '(No output)');
    } catch (err) {
      console.error('Error running Ruby code:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setOutput('Error:\n' + errorMessage);
    }
  };

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">Ruby Runner</h1>
      <p className="mb-4">
        Write your Ruby code below and click &quot;Run&quot; to see the output.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Code Input</h2>
          <textarea
            className="w-full h-64 p-2 border rounded-md font-mono bg-gray-900 text-green-400"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <button
            onClick={runCode}
            disabled={isInitializing}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isInitializing ? 'Initializing...' : 'Run'}
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Output</h2>
          <pre className="w-full h-64 p-2 border rounded-md bg-gray-100 overflow-auto">
            <code className="text-sm">{output}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RubyRunner;
