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
  const [vmReady, setVmReady] = useState(false);
  const [lineNumbers, setLineNumbers] = useState('1');
  const vmRef = useRef<RubyVM | null>(null);
  const lineNumbersRef = useRef<HTMLTextAreaElement | null>(null);
  const codeEditorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const lineCount = code.split('\n').length;
    const numbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
    setLineNumbers(numbers);
  }, [code]);

  const handleScroll = () => {
    if (lineNumbersRef.current && codeEditorRef.current) {
      lineNumbersRef.current.scrollTop = codeEditorRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const initializeVM = async () => {
      setOutput('Initializing Ruby VM...\nPlease wait, it may take a moment.');
      try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/ruby-head-wasm-wasi@2.3.0/dist/ruby.wasm");
        const buffer = await response.arrayBuffer();
        const vm = await RubyWASM.DefaultRubyVM(buffer);
        vmRef.current = vm;
        setVmReady(true);
        setOutput('Ruby VM is ready. Click "Run" to execute code.');
      } catch (err) {
        console.error('Failed to initialize Ruby VM:', err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setOutput('Error: Failed to initialize Ruby VM.\n' + errorMessage);
      } finally {
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
          <div className="flex w-full h-64 font-mono border rounded-md bg-gray-900">
            <textarea
              ref={lineNumbersRef}
              className="w-12 p-2 text-right text-gray-500 bg-transparent border-r border-gray-700 resize-none focus:outline-none"
              value={lineNumbers}
              readOnly
            />
            <textarea
              ref={codeEditorRef}
              aria-label="Code Editor"
              className="flex-1 p-2 text-green-400 bg-transparent resize-none focus:outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={handleScroll}
              spellCheck="false"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
          <button
            onClick={runCode}
            disabled={!vmReady}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
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
