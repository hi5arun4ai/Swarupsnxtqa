import React, { useState } from 'react';

const ROICalculator: React.FC = () => {
  const [agents, setAgents] = useState(10);
  const [salary, setSalary] = useState(25000); // Default Avg Salary in INR approx

  // Logic: 40% savings on Annual Cost
  // Annual Cost = Agents * Salary * 12
  // Savings = Annual Cost * 0.40
  const annualCost = agents * salary * 12;
  const savings = annualCost * 0.40;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(val);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        
        {/* Input Side */}
        <div className="w-full md:w-1/2 space-y-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-900 dark:text-white">
            Calculate Your <br/> <span className="text-accent-500">Savings</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            See how much you can save by augmenting your human team with Swarups NXT AI Agents.
          </p>

          {/* Slider 1 */}
          <div className="space-y-4">
            <div className="flex justify-between font-bold text-brand-900 dark:text-white">
              <label>Number of Support Agents</label>
              <span className="text-accent-500 text-xl">{agents}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={agents}
              onChange={(e) => setAgents(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
            />
          </div>

          {/* Slider 2 (Simulated Input) */}
          <div className="space-y-4">
            <div className="flex justify-between font-bold text-brand-900 dark:text-white">
              <label>Avg Monthly Salary (₹)</label>
              <div className="flex items-center border-b border-gray-300 focus-within:border-accent-500">
                <span className="text-gray-500 mr-2">₹</span>
                <input 
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(parseInt(e.target.value))}
                    className="w-24 bg-transparent focus:outline-none text-right font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Result Side */}
        <div className="w-full md:w-1/2">
          <div className="relative glass-light dark:glass-dark p-8 md:p-12 rounded-3xl text-center border border-white/40 shadow-2xl overflow-hidden group">
            
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" 
                 alt="Dashboard Background" 
                 className="w-full h-full object-cover opacity-10 dark:opacity-20"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 dark:to-transparent"></div>
            </div>

            <div className="relative z-10">
                <h3 className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest mb-2">Projected Annual Savings</h3>
                <div className="text-5xl md:text-6xl font-heading font-extrabold text-brand-900 dark:text-white mb-6 drop-shadow-sm">
                {formatCurrency(savings)}
                </div>
                <p className="text-green-600 dark:text-green-400 font-bold flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900/30 py-2 rounded-full max-w-xs mx-auto border border-green-200 dark:border-green-800">
                <i className="fas fa-arrow-up"></i> 40% Efficiency Boost
                </p>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700/50">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        *Estimates based on standard operational costs and AI implementation efficiency.
                    </p>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ROICalculator;