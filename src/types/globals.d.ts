interface RubyVM {
  eval: (code: string) => Promise<unknown>;
  print: (stream: 'stdout' | 'stderr', message: string) => void;
}

interface RubyWASM {
  DefaultRubyVM: (buffer?: ArrayBuffer) => Promise<{ vm: RubyVM }>;
}

interface Window {
  RubyWASM?: RubyWASM;
}
