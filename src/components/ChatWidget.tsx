
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, Bot, Trash2, RefreshCw, ChevronRight } from 'lucide-react';
import { chatWithGemini } from '../services/GeminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const SUGGESTED_PROMPTS = [
  "How do I install EATGF CLI?",
  "What are the API rate limits?",
  "Explain the security architecture",
  "How to configure SSO?"
];

/**
 * Simple Markdown Renderer Component
 * Handles bold (**text**), inline code (`text`), and code blocks (```text```).
 */
const MarkdownMessage: React.FC<{ text: string }> = ({ text }) => {
  // 1. Split by code blocks
  const parts = text.split(/```(\w+)?\n([\s\S]*?)```/g);
  
  return (
    <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
      {parts.map((part, index) => {
        // If it's a code block (simple heuristic based on split)
        // The split regex creates groups: [text, lang, code, text, lang, code...]
        // However, standard split might just dump tokens. 
        // Let's use a simpler approach for stability:
        
        // Actually, let's map simply:
        // Even indices are text, Odd indices are code blocks if using simple split ````(.*?)``` `
        // But with capture groups it's messier.
        
        // Let's try a safer manual parse for this demo to avoid complex regex edge cases in a single file.
        // We will just process the whole text for inline formats if no code blocks, 
        // or just render code blocks if present.
        
        if (text.includes('```')) {
            // Very basic code block handling
            if (part.startsWith('typescript') || part.startsWith('bash') || part.startsWith('json') || part.startsWith('javascript') || part === '') {
                 return null; // Skip language tag or empty strings from split artifacts
            }
            
            // Check if this part is actually code (heuristics)
            const isCode = index % 3 === 2; // Regex group logic: 0=text, 1=lang, 2=code
            
            if (isCode) {
                 return (
                    <div key={index} style={{
                        background: '#1E293B',
                        color: '#E2E8F0',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        overflowX: 'auto',
                        margin: '0.5rem 0'
                    }}>
                        <pre style={{ margin: 0 }}>{part}</pre>
                    </div>
                 );
            }
        }
        
        // Render Text with Inline Formatting
        // Replace **bold** and `code`
        const inlineParts = part.split(/(\*\*.*?\*\*|`.*?`)/g);
        return (
            <span key={index}>
                {inlineParts.map((subPart, subIndex) => {
                    if (subPart.startsWith('**') && subPart.endsWith('**')) {
                        return <strong key={subIndex}>{subPart.slice(2, -2)}</strong>;
                    }
                    if (subPart.startsWith('`') && subPart.endsWith('`')) {
                        return <code key={subIndex} style={{ 
                            background: 'rgba(0,0,0,0.1)', 
                            padding: '1px 4px', 
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85em'
                        }}>{subPart.slice(1, -1)}</code>;
                    }
                    return <span key={subIndex}>{subPart}</span>;
                })}
            </span>
        );
      })}
    </div>
  );
};

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', text: 'Hello! I\'m **EATGF AI**. How can I help you with your enterprise deployment today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e?: React.FormEvent, prompt?: string) => {
    if (e) e.preventDefault();
    const textToSend = prompt || input;
    
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await chatWithGemini(userMsg.text, history);

    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: responseText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleClear = () => {
      setMessages([{ id: Date.now().toString(), role: 'assistant', text: 'Conversation cleared. How else can I assist you?' }]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--nexus-gradient-bg)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 24px rgba(67, 97, 238, 0.4)',
          cursor: 'pointer',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
        }}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={28} /> : <Sparkles size={28} />}
      </button>

      {/* Chat Window */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(2rem + 80px)',
        right: '2rem',
        width: '400px',
        maxWidth: 'calc(100vw - 4rem)',
        height: '650px',
        maxHeight: 'calc(100vh - 140px)',
        background: 'var(--nexus-bg-surface)',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--nexus-border)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'bottom right'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'var(--nexus-gradient-bg)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.2)', borderRadius: '10px' }}>
              <Bot size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'white', letterSpacing: '0.02em' }}>EATGF AI</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', opacity: 0.9 }}>
                <span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%' }}></span>
                Online
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleClear}
            title="Clear Chat"
            style={{ 
                background: 'rgba(255,255,255,0.1)', 
                border: 'none', 
                borderRadius: '8px', 
                padding: '0.4rem', 
                cursor: 'pointer', 
                color: 'white',
                transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          background: 'var(--nexus-bg-root)',
        }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {msg.role === 'assistant' && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--nexus-text-secondary)', marginBottom: '0.25rem', marginLeft: '0.25rem' }}>EATGF AI</span>
              )}
              
              <div style={{
                padding: '0.875rem 1.25rem',
                borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                background: msg.role === 'user' ? 'var(--nexus-primary)' : 'var(--nexus-bg-surface)',
                color: msg.role === 'user' ? 'white' : 'var(--nexus-text-primary)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--nexus-border)',
                boxShadow: msg.role === 'user' ? '0 4px 12px rgba(67, 97, 238, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)',
                wordBreak: 'break-word'
              }}>
                <MarkdownMessage text={msg.text} />
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '20px 20px 20px 4px',
                background: 'var(--nexus-bg-surface)',
                border: '1px solid var(--nexus-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--nexus-text-secondary)'
              }}>
                <Loader2 size={16} className="spin" />
                <span style={{ fontSize: '0.85rem' }}>Processing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts (Horizontal Scroll) */}
        {!isLoading && messages.length < 3 && (
            <div style={{ 
                padding: '0 1rem 1rem', 
                display: 'flex', 
                gap: '0.5rem', 
                overflowX: 'auto',
                background: 'var(--nexus-bg-root)',
                scrollbarWidth: 'none'
            }}>
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button 
                        key={i}
                        onClick={() => handleSubmit(undefined, prompt)}
                        style={{
                            whiteSpace: 'nowrap',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: '1px solid var(--nexus-primary-light)',
                            background: 'rgba(79, 70, 229, 0.05)',
                            color: 'var(--nexus-primary)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            flexShrink: 0
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(79, 70, 229, 0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(79, 70, 229, 0.05)'}
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        )}

        {/* Input Area */}
        <form onSubmit={(e) => handleSubmit(e)} style={{
          padding: '1rem',
          background: 'var(--nexus-bg-surface)',
          borderTop: '1px solid var(--nexus-border)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            style={{
              flex: 1,
              padding: '0.875rem 1.25rem',
              borderRadius: '25px',
              border: '1px solid var(--nexus-border)',
              background: 'var(--nexus-bg-root)',
              color: 'var(--nexus-text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--nexus-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--nexus-border)'}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              padding: '0.875rem',
              borderRadius: '50%',
              border: 'none',
              background: isLoading || !input.trim() ? 'var(--nexus-bg-surface-hover)' : 'var(--nexus-primary)',
              color: isLoading || !input.trim() ? 'var(--nexus-text-secondary)' : 'white',
              cursor: isLoading || !input.trim() ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              boxShadow: isLoading || !input.trim() ? 'none' : '0 4px 12px rgba(67, 97, 238, 0.4)'
            }}
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
};
