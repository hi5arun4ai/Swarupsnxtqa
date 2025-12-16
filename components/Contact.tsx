import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Sales Inquiry',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Points to functions/api/contact.ts automatically handled by Cloudflare Pages
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', subject: 'Sales Inquiry', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error("Submission failed", error);
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left Column: Content */}
        <div className="lg:w-5/12 space-y-8">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-bold uppercase tracking-wider mb-4">
                <i className="fas fa-paper-plane"></i> Get Started
             </div>
             <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-900 dark:text-white mb-6">
                Ready to <span className="text-accent-500">Scale?</span>
             </h2>
             <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Book a consultation or ask us anything. Our AI experts (and human team) are ready to deploy your digital workforce.
             </p>
          </div>

          <div className="space-y-6">
             <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-brand-900 dark:text-white shrink-0">
                   <i className="fas fa-envelope"></i>
                </div>
                <div>
                   <h4 className="font-bold text-brand-900 dark:text-white text-lg">Email Us</h4>
                   <p className="text-gray-500 dark:text-gray-400">hello@swarupsnxt.com</p>
                </div>
             </div>
             
             <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-brand-900 dark:text-white shrink-0">
                   <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                   <h4 className="font-bold text-brand-900 dark:text-white text-lg">Call Us</h4>
                   <p className="text-gray-500 dark:text-gray-400">+91 9840443276</p>
                </div>
             </div>

             <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-brand-900 dark:text-white shrink-0">
                   <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                   <h4 className="font-bold text-brand-900 dark:text-white text-lg">HQ</h4>
                   <p className="text-gray-500 dark:text-gray-400">Chennai, Tamil Nadu, India</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:w-7/12 w-full">
           <div className="relative glass-light dark:glass-dark p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-700/50">
              
              {/* Form Success Overlay */}
              {status === 'success' && (
                 <div className="absolute inset-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-green-500/20">
                       <i className="fas fa-check"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-brand-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-300">We'll get back to you within 24 hours.</p>
                    <button 
                       onClick={() => setStatus('idle')}
                       className="mt-8 text-sm font-bold text-accent-500 hover:text-accent-600 underline"
                    >
                       Send another message
                    </button>
                 </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label htmlFor="name" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                       <input 
                          type="text" 
                          id="name"
                          name="name" 
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-600 focus:border-accent-500 dark:focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all placeholder-gray-400"
                       />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="email" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Work Email</label>
                       <input 
                          type="email" 
                          id="email"
                          name="email" 
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-600 focus:border-accent-500 dark:focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all placeholder-gray-400"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label htmlFor="phone" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Phone (Optional)</label>
                       <input 
                          type="tel" 
                          id="phone"
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 ..."
                          className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-600 focus:border-accent-500 dark:focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all placeholder-gray-400"
                       />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="subject" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">I'm interested in...</label>
                       <div className="relative">
                          <select 
                             id="subject"
                             name="subject"
                             value={formData.subject}
                             onChange={handleChange}
                             className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-600 focus:border-accent-500 dark:focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all appearance-none cursor-pointer text-gray-700 dark:text-gray-200"
                          >
                             <option>Sales Inquiry</option>
                             <option>Voice Agents Demo</option>
                             <option>Partnership</option>
                             <option>Technical Support</option>
                          </select>
                          <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                    <textarea 
                       id="message"
                       name="message" 
                       required
                       rows={4}
                       value={formData.message}
                       onChange={handleChange}
                       placeholder="Tell us about your requirements..."
                       className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-600 focus:border-accent-500 dark:focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all placeholder-gray-400 resize-none"
                    ></textarea>
                 </div>

                 <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3
                    ${status === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-brand-900 to-blue-800 dark:from-accent-600 dark:to-accent-500 hover:shadow-accent-500/25'}`}
                 >
                    {status === 'submitting' ? (
                       <>
                         <i className="fas fa-circle-notch fa-spin"></i> Sending...
                       </>
                    ) : (
                       <>
                         Send Message <i className="fas fa-paper-plane"></i>
                       </>
                    )}
                 </button>
                 
                 <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    By submitting this form, you agree to our <a href="#" className="underline hover:text-accent-500">Privacy Policy</a>.
                 </p>

              </form>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;