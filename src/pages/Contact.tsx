
import React from 'react';
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <main className="w-full">
      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="container">
          <div className="grid-2-col contact-grid" style={{ alignItems: 'flex-start' }}>
            
            {/* Left Info */}
            <div>
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get in Touch</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--nexus-text-secondary)', marginBottom: '3rem' }}>
                Have questions about enterprise plans or technical implementation? Our team is ready to help.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="icon-wrapper bg-blue-light" style={{ width: 48, height: 48, marginBottom: 0 }}><Mail size={20} /></div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Email Us</h4>
                    <p style={{ color: 'var(--nexus-text-secondary)' }}>support@eatgf.io</p>
                    <p style={{ color: 'var(--nexus-text-secondary)' }}>sales@eatgf.io</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="icon-wrapper bg-purple-light" style={{ width: 48, height: 48, marginBottom: 0 }}><MapPin size={20} /></div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Visit HQ</h4>
                    <p style={{ color: 'var(--nexus-text-secondary)' }}>
                      100 Governance Way, Floor 24<br/>
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="icon-wrapper bg-teal-light" style={{ width: 48, height: 48, marginBottom: 0 }}><Phone size={20} /></div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Call Us</h4>
                    <p style={{ color: 'var(--nexus-text-secondary)' }}>+1 (555) 123-4567</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--nexus-text-secondary)' }}>Mon-Fri from 8am to 5pm PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="card-modern" style={{ padding: '2.5rem' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={24} color="var(--nexus-primary)" /> Send a Message
              </h3>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={(e) => e.preventDefault()}>
                <div className="grid-2-col" style={{ gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>First Name</label>
                    <input type="text" className="contact-form-input" placeholder="Jane" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Last Name</label>
                    <input type="text" className="contact-form-input" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Work Email</label>
                  <input type="email" className="contact-form-input" placeholder="jane@company.com" />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Message</label>
                  <textarea className="contact-form-input" rows={4} placeholder="How can we help you?" style={{ resize: 'vertical' }}></textarea>
                </div>

                <button type="submit" style={{ 
                  marginTop: '1rem', padding: '1rem', background: 'var(--nexus-primary)', color: 'white',
                  border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                }}>
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};
