import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Volume2, VolumeX, Play, Pause, RotateCcw, Mic, MicOff } from "lucide-react";
import { generateResponse, smartSuggestions, getVoiceScript, Message } from "@/utils/aiLogic";

// Browser SpeechRecognition type shim
type SpeechRecognitionConstructor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: { results: { [i: number]: { [i: number]: { transcript: string } } } }) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
};

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}


const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice States (TTS - text to speech)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [currentScript, setCurrentScript] = useState<string | null>(null);

  // Voice Input States (STT - speech to text)
  const [isListening, setIsListening] = useState(false);
  const [sttSupported, setSttSupported] = useState(false);
  // Active project context
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const recognitionRef = useRef<{
    continuous: boolean; interimResults: boolean; lang: string;
    start(): void; stop(): void; abort(): void;
    onresult: ((event: { results: { [i: number]: { [i: number]: { transcript: string } } } }) => void) | null;
    onerror: ((event: Event) => void) | null;
    onend: ((event: Event) => void) | null;
  } | null>(null);

  useEffect(() => {
    if ("speechSynthesis" in window) setVoiceSupported(true);
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setSttSupported(true);
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";

      recognition.onresult = (event: { results: { [i: number]: { [i: number]: { transcript: string } } } }) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.abort();
    };
  }, []);

  const toggleListening = () => {
    if (!sttSupported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      setInputValue("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const sanitizeForSpeech = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")   // **bold** → bold
      .replace(/\*(.*?)\*/g, "$1")        // *italic* → italic
      .replace(/`{1,3}[^`]*`{1,3}/g, "") // `code` / ```code``` → removed
      .replace(/#+\s/g, "")              // # headings → removed
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [label](url) → label
      .replace(/https?:\/\/\S+/g, "")   // bare URLs → removed
      .replace(/[•\-–—►▶📁⚡🚀✨🎤💬]\s*/g, "") // bullets & emoji
      .replace(/[*_~|>#]/g, "")         // remaining markdown chars
      .replace(/\n+/g, ". ")            // newlines → natural pause
      .replace(/:\s*\./g, ".")           // ". " from empty newlines
      .replace(/\.{2,}/g, ".")           // multiple dots → one
      .replace(/\s{2,}/g, " ")           // multiple spaces → one
      .trim();
  };

  const playVoice = (text: string) => {
    if (!voiceSupported) return;
    
    window.speechSynthesis.cancel();
    if (isMuted) return;

    
    setIsPlaying(true);
    setCurrentScript(text);
    
    const utterance = new SpeechSynthesisUtterance(sanitizeForSpeech(text));

    // Pick the most natural-sounding voice available
    const tryVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = [
        voices.find(v => v.name.includes("Google UK English Male")),
        voices.find(v => v.name.includes("Google US English")),
        voices.find(v => v.lang === "en-IN"),
        voices.find(v => v.lang.startsWith("en-GB")),
        voices.find(v => v.lang.startsWith("en-US")),
        voices[0]
      ].find(Boolean);
      if (preferred) utterance.voice = preferred;
    };

    // voices may not be loaded yet
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => { tryVoice(); window.speechSynthesis.onvoiceschanged = null; };
    } else {
      tryVoice();
    }
    
    utterance.rate = 0.92;   // slightly slower = more natural
    utterance.pitch = 1.05;  // slight warmth
    utterance.volume = 1.0;
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const closeChat = () => {
    // Stop all voice
    window.speechSynthesis.cancel();
    recognitionRef.current?.abort();
    setIsPlaying(false);
    setIsListening(false);
    setCurrentScript(null);
    // Reset chat state
    setMessages([]);
    setSelectedProject(null);
    setInputValue("");
    // Keep hasPrompted = true so auto-popup never re-fires
    setIsOpen(false);
  };

  const togglePause = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    }
  };

  const replayVoice = () => {
    if (currentScript) {
      window.speechSynthesis.cancel();
      playVoice(currentScript);
    }
  };

  // Auto-popup logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasPrompted && !isOpen) {
        setMessages([
          { id: "msg-0", role: "assistant", content: "Do you want a 30-second explanation of my best project?" }
        ]);
        setIsOpen(true);
        setHasPrompted(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [hasPrompted, isOpen]);

  // Listen for external trigger
  useEffect(() => {
    const handleExplain = (e: CustomEvent<{ projectName: string; triggerVoice?: boolean }>) => {
      setIsOpen(true);
      handleSend(`Explain this project: ${e.detail.projectName}`);
      
      if (e.detail.triggerVoice) {
         const script = getVoiceScript(e.detail.projectName);
         if (script) playVoice(script);
      }
    };
    window.addEventListener("ai-explain-project", handleExplain as EventListener);
    return () => window.removeEventListener("ai-explain-project", handleExplain as EventListener);
  }, [messages.length, isMuted, voiceSupported]);
  // Initial welcome message when manually opened without prompt
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: "msg-welcome", role: "assistant", content: "Hey! I'm Swami's AI assistant. Ask me anything about his projects 🚀" }
      ]);
      setHasPrompted(true);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // projectOverride lets callers pass the new project name synchronously
  // without relying on async setSelectedProject to have already updated.
  const handleSend = async (text: string, projectOverride?: string | null) => {
    if (!text.trim()) return;

    if (messages.length === 1 && text.toLowerCase() === "no") {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", content: text },
        { id: (Date.now() + 1).toString(), role: "assistant", content: "No problem! You can ask me anything about Swami's projects, skills, or experience." }
      ]);
      setInputValue("");
      return;
    }

    // Use the override if provided (avoids stale selectedProject closure)
    const activeProject = projectOverride !== undefined ? projectOverride : selectedProject;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(async () => {
      const response = await generateResponse(messages, text, activeProject);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: response }
      ]);
      setIsTyping(false);
    }, 500);

  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mb-4 w-[340px] h-[480px] rounded-2xl border border-background/20 bg-foreground/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden relative"
            style={{ boxShadow: "0 25px 50px -12px rgba(255, 45, 45, 0.15)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-background/10 bg-background/10">
              <div className="flex items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-red shadow-[0_0_10px_rgba(255,45,45,0.8)]"></span>
                </div>
                <span className="font-mono-display text-xs tracking-wider uppercase text-background font-medium">AI Assistant</span>
                {isPlaying && !isMuted && (
                  <div className="flex items-end gap-[2px] ml-2 h-3 overflow-hidden">
                    <span className="w-1 bg-accent-red wave-bar rounded-t-sm" />
                    <span className="w-1 bg-accent-red wave-bar rounded-t-sm" />
                    <span className="w-1 bg-accent-red wave-bar rounded-t-sm" />
                    <span className="w-1 bg-accent-red wave-bar rounded-t-sm" />
                    <span className="w-1 bg-accent-red wave-bar rounded-t-sm" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                {currentScript && (
                   <>
                     <button onClick={togglePause} className="text-background/50 hover:text-background p-1 transition-colors">
                       {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                     </button>
                     <button onClick={replayVoice} className="text-background/50 hover:text-background p-1 transition-colors">
                       <RotateCcw size={14} />
                     </button>
                     <button onClick={() => {
                        setIsMuted(!isMuted);
                        if (!isMuted) window.speechSynthesis.cancel();
                     }} className="text-background/50 hover:text-background p-1 transition-colors mr-1">
                       {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                     </button>
                   </>
                )}
                <button 
                  onClick={closeChat}
                  className="text-background/50 hover:text-background transition-colors p-1"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-background/10">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-end gap-1 max-w-[85%]">
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-background text-foreground rounded-br-sm shadow-sm"
                          : "bg-background/10 text-background rounded-bl-sm border border-background/10"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "assistant" && voiceSupported && (
                      <button
                        onClick={() => playVoice(msg.content)}
                        className="flex-shrink-0 p-1 text-background/40 hover:text-accent-red transition-colors rounded-full hover:bg-background/10"
                        title="Read aloud"
                      >
                        <Volume2 size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-background/10 rounded-2xl rounded-bl-sm px-4 py-3 border border-background/10 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-background/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-background/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-background/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {!isTyping && messages.length > 0 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
                {(messages.length === 1 && messages[0].content.includes("30-second") 
                  ? ["Yes", "No"] 
                  : smartSuggestions.slice(0, 3)
                ).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    className="inline-block px-3 py-1.5 rounded-full border border-background/10 bg-background/5 text-[11px] text-background/70 hover:text-background hover:bg-background/10 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Project Selection Area */}
            <div className="px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap bg-background/5 border-t border-background/10">
              <span className="text-[10px] text-background/50 uppercase tracking-widest font-mono mr-1 flex-shrink-0">Projects:</span>
              {[
                { name: "One-Click Deployment" },
                { name: "College Navigator" }
              ].map(({ name }) => (
                <button
                  key={name}
                  onClick={() => {
                    // Update state AND pass the name directly to avoid stale closure
                    setSelectedProject(name);
                    handleSend(`Explain ${name}`, name);
                    const script = getVoiceScript(name);
                    if (script) playVoice(script);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] transition-colors shadow-sm ${
                    selectedProject === name
                      ? "border-accent-red bg-accent-red/20 text-accent-red font-semibold"
                      : "border-accent-red/20 bg-accent-red/5 text-accent-red hover:bg-accent-red/10"
                  }`}
                >
                  {selectedProject === name ? "▶" : "📁"} {name}
                  {selectedProject === name && <span className="text-[9px] ml-1 opacity-70">(active)</span>}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-background/5 border-t border-background/10">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask about projects, tech stack..."}
                  className={`w-full bg-background/5 border rounded-full pl-4 pr-20 py-2.5 text-sm text-background focus:outline-none focus:ring-1 focus:ring-accent-red/50 placeholder:text-background/40 transition-all ${
                    isListening ? "border-accent-red/60 bg-accent-red/5" : "border-background/10"
                  }`}
                />

                {/* Mic Button */}
                {sttSupported && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-10 p-1.5 transition-colors ${
                      isListening
                        ? "text-accent-red animate-pulse"
                        : "text-background/50 hover:text-background"
                    }`}
                    title={isListening ? "Stop listening" : "Speak your question"}
                  >
                    {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                  </button>
                )}

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-1.5 text-background/50 hover:text-background disabled:opacity-50 transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => isOpen ? closeChat() : setIsOpen(true)}
        className="w-14 h-14 rounded-full bg-foreground border border-background/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,45,45,0.2)] hover:shadow-[0_0_40px_rgba(255,45,45,0.3)] transition-all relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X size={24} className="text-background relative z-10" />
        ) : (
          <div className="relative z-10 flex items-center justify-center">
            <span className="absolute inline-flex h-8 w-8 rounded-full bg-accent-red/30 animate-ping"></span>
            <div className="w-5 h-5 rounded-full bg-accent-red shadow-[0_0_15px_rgba(255,45,45,1)] flex items-center justify-center">
              <Sparkles size={10} className="text-white absolute -top-1 -right-1" />
            </div>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIAssistant;
