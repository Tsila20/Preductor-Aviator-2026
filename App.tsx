/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  RefreshCw, 
  CheckCircle2, 
  Copy, 
  Hourglass, 
  ChevronRight,
  ExternalLink,
  Mail,
  Wallet,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 'main' | 'activate' | 'review' | 'approved';

const AviatorLogo = ({ className }: { className?: string }) => (
  <div className={`relative flex flex-col items-center ${className}`}>
    <div className="relative w-44 h-44 flex items-center justify-center">
      {/* Broken Circle Arc */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-aviator-red">
        <path 
          d="M 22 82 A 44 44 0 1 1 78 82" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.8" 
          strokeLinecap="round"
        />
      </svg>
      
      {/* Detailed Vintage Airplane SVG */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-32 h-32 text-aviator-red fill-current z-10 -mt-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tail fin */}
        <path d="M28,48 L15,32 C13,30 18,28 20,30 L35,46 Z" />
        {/* Main Body */}
        <path d="M28,52 C28,52 45,45 60,45 C75,45 85,50 88,50 C91,50 91,45 88,44 C82,42 65,38 50,38 C35,38 28,45 28,45 Z" />
        {/* Cockpit bubble */}
        <path d="M52,42 C52,42 56,34 64,34 C72,34 76,42 76,42 Z" />
        {/* Propeller hub */}
        <ellipse cx="89" cy="47" rx="2" ry="4" />
        {/* Propeller blades */}
        <path d="M89,32 L89,62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    
    {/* Text Overlay */}
    <div className="mt-[-55px] flex flex-col items-center z-20">
      <h2 className="text-6xl text-aviator-red font-lobster leading-none drop-shadow-lg">
        Aviator
      </h2>
      <span className="text-sm font-bold text-white tracking-[0.5em] mt-1 drop-shadow-md">
        STUDIO
      </span>
    </div>
  </div>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [multiplier, setMultiplier] = useState('0.00x');
  const [isPredicting, setIsPredicting] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>(['1.24x', '2.10x', '1.05x', '4.32x', '1.18x']);
  const [serverStatus, setServerStatus] = useState<'online' | 'syncing' | 'offline'>('online');
  const [accuracy, setAccuracy] = useState(98.4);
  const [nextRoundIn, setNextRoundIn] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [gameId, setGameId] = useState('B261-7842-910');

  const [showActivationHint, setShowActivationHint] = useState(false);

  useEffect(() => {
    if (nextRoundIn > 0) {
      const timer = setTimeout(() => setNextRoundIn(nextRoundIn - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [nextRoundIn]);

  const generateRealisticMultiplier = () => {
    const rand = Math.random();
    if (rand < 0.8) {
      // 80% chance for 1.10 - 1.90 (Very safe)
      return (Math.random() * 0.8 + 1.1).toFixed(2);
    } else if (rand < 0.95) {
      // 15% chance for 2.00 - 3.50 (Medium)
      return (Math.random() * 1.5 + 2).toFixed(2);
    } else {
      // 5% chance for 3.50 - 8.00 (High - capped lower for "reliability")
      return (Math.random() * 4.5 + 3.5).toFixed(2);
    }
  };

  const handleGetPrediction = () => {
    if (!isActivated) {
      setShowActivationHint(true);
      setTimeout(() => setShowActivationHint(false), 3000);
      return;
    }

    if (nextRoundIn > 0) return;

    setIsPredicting(true);
    setServerStatus('syncing');
    setMultiplier('...');
    setLogs(['Connecting to Bet261 servers...', 'Fetching round hash...', 'Decoding SHA-256...']);

    setTimeout(() => setLogs(prev => [...prev, 'Analyzing multiplier patterns...']), 1000);
    setTimeout(() => setLogs(prev => [...prev, 'Calculating safe exit point...']), 2000);

    // Simulate deep analysis and syncing
    setTimeout(() => {
      const newVal = generateRealisticMultiplier();
      setMultiplier(`${newVal}x`);
      setHistory(prev => [`${newVal}x`, ...prev].slice(0, 5));
      setIsPredicting(false);
      setServerStatus('online');
      setAccuracy(Number((97 + Math.random() * 2).toFixed(1)));
      setNextRoundIn(10); // Wait 10 seconds for next round
      setGameId(`B261-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 900 + 100)}`);
      setLogs([]); // Clear logs after prediction
    }, 3500);
  };

  const triggerBypass = () => {
    setIsActivated(true);
    setMultiplier('0.00x');
    alert("Bypass Activated! You can now get predictions.");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('TUKMWvqgWDuHL4b2GkCwy...');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActivate = () => {
    setCurrentScreen('activate');
  };

  const handlePaid = () => {
    setCurrentScreen('review');
    // Simulate review process
    setTimeout(() => {
      setCurrentScreen('approved');
    }, 4000);
  };

  const handleContinue = () => {
    setIsActivated(true);
    setCurrentScreen('main');
    setMultiplier('0.00x');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-aviator-bg relative overflow-y-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-aviator-red/10 blur-[120px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {currentScreen === 'main' && (
          <motion.div 
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md flex flex-col items-center space-y-8 z-10 py-8"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : serverStatus === 'syncing' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Server: {serverStatus}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">ID:</span>
                    <span className="text-[10px] font-bold text-white/40 font-mono">{gameId}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Accuracy:</span>
                    <span className="text-[10px] font-bold text-green-500">{accuracy}%</span>
                  </div>
                </div>
              </div>
              <motion.div
                onContextMenu={(e) => { e.preventDefault(); triggerBypass(); }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="cursor-pointer active:scale-95 transition-transform"
                title="Long press to bypass activation"
              >
                <AviatorLogo />
              </motion.div>
              <h1 className="text-2xl font-black text-aviator-red italic tracking-widest mt-8 drop-shadow-md">
                Predictor v4.6
              </h1>
            </div>

            <div className="flex flex-col items-center justify-center py-6 relative w-full">
              <AnimatePresence>
                {showActivationHint && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-4 bg-aviator-red text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-lg z-20"
                  >
                    Activation Required
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="relative flex flex-col items-center">
                <span className={`multiplier-text ${isPredicting ? 'animate-pulse text-white/50' : 'text-white'}`}>
                  {multiplier}
                </span>
                {isPredicting ? (
                  <div className="absolute -bottom-6 w-full flex flex-col items-center space-y-1">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] font-mono text-aviator-red animate-pulse"
                    >
                      ANALYZING HASH...
                    </motion.div>
                    <div className="flex flex-col items-center space-y-1">
                      {logs.map((log, i) => (
                        <motion.span 
                          key={i}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[8px] font-mono text-white/20 uppercase tracking-tighter"
                        >
                          {log}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ) : multiplier !== '0.00x' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-4 flex flex-col items-center"
                  >
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Safe Cashout</span>
                    <span className="text-xs font-black text-green-500">{(parseFloat(multiplier) * 0.85).toFixed(2)}x</span>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="w-full space-y-4">
              <button 
                onClick={handleGetPrediction}
                className={`btn-primary flex items-center justify-center space-x-2 relative overflow-hidden ${nextRoundIn > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isPredicting || nextRoundIn > 0}
              >
                {isPredicting && (
                  <motion.div 
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
                {nextRoundIn > 0 ? (
                  <>
                    <Hourglass className="w-5 h-5 animate-pulse" />
                    <span>Next Round in {nextRoundIn}s</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className={`w-5 h-5 ${isPredicting ? 'animate-spin' : ''}`} />
                    <span>{isPredicting ? 'Syncing...' : 'Get Prediction!'}</span>
                  </>
                )}
              </button>

              {!isActivated && (
                <button 
                  onClick={handleActivate}
                  className="w-full py-4 bg-aviator-red hover:bg-aviator-dark-red text-white font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-aviator-red/30 flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Activate Account!</span>
                </button>
              )}

              <button 
                onClick={() => window.open('https://bet261.mg/instant-games/llc/Aviator', '_blank')}
                className="w-full py-4 bg-white/5 border border-white/10 text-white/80 font-bold rounded-lg flex items-center justify-center space-x-2 hover:bg-white/10 transition-all active:scale-95"
              >
                <ExternalLink className="w-5 h-5 text-aviator-red" />
                <span>Open Bet261 Game</span>
              </button>
            </div>

            {/* Prediction History */}
            <div className="w-full pt-4">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Recent History</span>
                <div className="h-[1px] flex-1 bg-white/10 mx-4" />
              </div>
              <div className="flex justify-between space-x-2">
                {history.map((val, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 py-2 rounded-md text-center text-[10px] font-bold border ${i === 0 ? 'bg-aviator-red/10 border-aviator-red/30 text-aviator-red' : 'bg-white/5 border-white/5 text-white/40'}`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 text-center">
              <p className="text-sm text-white/40">
                Join our telegram <a href="#" className="text-aviator-red underline">https://t.me/AviatorPredictor...</a>
              </p>
            </div>
          </motion.div>
        )}

        {currentScreen === 'activate' && (
          <motion.div 
            key="activate"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-md glass-panel p-8 space-y-8 z-10"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-aviator-red">Activate Your Account</h2>
              <p className="text-sm text-white/60">To activate your account, please make payment using the details below.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <Mail className="w-5 h-5 text-aviator-red" />
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Email</p>
                  <p className="text-sm font-medium">global_aviator@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <Wallet className="w-5 h-5 text-aviator-red" />
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Amount</p>
                  <p className="text-lg font-bold">45 USDT</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/40 ml-1">USDT Address</p>
                <div className="flex items-center space-x-2 p-4 bg-white/5 rounded-xl border border-white/5 group">
                  <p className="text-xs font-mono text-white/80 truncate flex-1">
                    TUKMWvqgWDuHL4b2GkCwy...
                  </p>
                  <button 
                    onClick={copyAddress}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-aviator-red"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <Network className="w-5 h-5 text-aviator-red" />
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Network</p>
                  <p className="text-sm font-bold text-aviator-red">TRON (TRC20)</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handlePaid}
              className="btn-primary"
            >
              I Have Paid
            </button>
          </motion.div>
        )}

        {currentScreen === 'review' && (
          <motion.div 
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md flex flex-col items-center space-y-8 z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-aviator-red/20 blur-3xl rounded-full" />
              <Hourglass className="w-24 h-24 text-aviator-red animate-[spin_3s_linear_infinite]" />
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-black italic text-aviator-red">Payment Under Review</h2>
              <p className="text-white/60 max-w-[280px] mx-auto leading-relaxed">
                Your payment has been submitted successfully. You will be notified via email once it is processed.
              </p>
            </div>
          </motion.div>
        )}

        {currentScreen === 'approved' && (
          <motion.div 
            key="approved"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-panel p-10 flex flex-col items-center space-y-8 z-10"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-green-500">Payment Approved</h2>
              <p className="text-white/60">Your account has been activated successfully!</p>
            </div>
            <button 
              onClick={handleContinue}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all active:scale-95"
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-white/20">
        <span>Secure Prediction Engine</span>
        <div className="w-1 h-1 bg-aviator-red rounded-full" />
        <span>v4.6.0</span>
      </div>
    </div>
  );
}
