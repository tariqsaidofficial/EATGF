import React, { useState } from 'react';
import { X, MessageSquare, Send } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setFeedback('');
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        width: '100%', maxWidth: '500px', background: 'var(--nexus-bg-surface)',
        borderRadius: '12px', boxShadow: 'var(--shadow-2xl)', border: '1px solid var(--nexus-border)',
        overflow: 'hidden', margin: '0 1rem', display: 'flex', flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        
        <div style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem', borderBottom: '1px solid var(--nexus-border)', 
          background: 'var(--nexus-bg-root)'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={20} color="var(--nexus-primary)" />
            Provide Feedback
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nexus-text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--nexus-bg-root)' }}>
          {isSent ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--nexus-success)' }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%' }}>
                  <Send size={32} />
                </div>
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>Thank you!</h4>
              <p style={{ color: 'var(--nexus-text-secondary)' }}>Your feedback helps us improve Nexus.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--nexus-text-primary)' }}>
                  How can we improve this page?
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think..."
                  rows={4}
                  style={{
                    width: '100%', padding: '0.75rem', borderRadius: '8px',
                    border: '1px solid var(--nexus-border)', background: 'var(--nexus-bg-surface)',
                    color: 'var(--nexus-text-primary)', fontSize: '0.9rem', fontFamily: 'inherit',
                    resize: 'vertical', outline: 'none'
                  }}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--nexus-border)',
                    background: 'transparent', color: 'var(--nexus-text-primary)', cursor: 'pointer', fontWeight: 500
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '6px', border: 'none',
                    background: 'var(--nexus-primary)', color: 'white', cursor: 'pointer', fontWeight: 500,
                    opacity: isSubmitting ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};