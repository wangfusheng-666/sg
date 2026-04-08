import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, ChevronRight, MessageSquare, Heart, Activity, Pill } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { useHealthMode } from '../context/HealthModeContext';

export function VoiceAssistant() {
  const { isElderlyMode } = useHealthMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const greetingRef = useRef(false);

  // Quick select options for elderly mode
  const quickOptions = [
    { icon: Activity, label: "有点头晕", color: "bg-blue-500" },
    { icon: Heart, label: "胸口不舒服", color: "bg-red-500" },
    { icon: Pill, label: "该吃什么药", color: "bg-green-500" },
    { icon: MessageSquare, label: "找医生聊聊", color: "bg-purple-500" },
  ];

  const speakGreeting = () => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance("你好王爷爷，我是小康有什么可以帮您的呢");
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9; // Slightly slower for natural tone
      utterance.pitch = 1.1; // Slightly warmer tone
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    speakGreeting();
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript("正在听您说话...");
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript("王爷爷，我已经收到您的请求了。");
      }, 3000);
    }
  };

  if (!isElderlyMode) return null;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[70]">
        <Motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpen}
          className="w-24 h-24 bg-medical-dark text-white rounded-full shadow-[0_10px_40px_rgba(66,38,112,0.4)] flex flex-col items-center justify-center border-4 border-white overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-medical-purple to-medical-dark opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center">
            <Mic size={32} className="mb-1" />
            <span className="text-xs font-black">语音助手</span>
          </div>
          
          {/* Animated rings around the button */}
          <Motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full bg-medical-purple -z-10"
          />
        </Motion.button>
      </div>

      {/* Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[80] flex items-end justify-center px-4 pb-20 sm:pb-32">
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-medical-dark/40 backdrop-blur-sm"
            />
            
            <Motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-medical-dark p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">小康智能助手</h3>
                    <p className="text-sm opacity-70">正在为您服务</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-8 text-center">
                  <Motion.div
                    animate={isListening ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block px-6 py-4 bg-medical-bg rounded-3xl text-medical-dark text-2xl font-bold mb-4"
                  >
                    {isListening ? transcript : "你好王爷爷，我是小康"}
                  </Motion.div>
                  <p className="text-medical-mid text-lg">
                    您可以直接说话，或者选择下方的快捷项
                  </p>
                </div>

                {/* Quick Selection */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {quickOptions.map((option, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-4 p-5 bg-medical-bg/50 hover:bg-medical-bg rounded-3xl transition-colors border-2 border-transparent hover:border-medical-purple/20 text-left group"
                    >
                      <div className={`w-12 h-12 ${option.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <option.icon size={24} />
                      </div>
                      <span className="text-lg font-bold text-medical-dark">{option.label}</span>
                    </button>
                  ))}
                </div>

                {/* Big Voice Button */}
                <div className="flex flex-col items-center">
                  <Motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleListening}
                    className={`w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 relative ${
                      isListening ? 'bg-medical-purple' : 'bg-medical-dark'
                    }`}
                  >
                    {isListening && (
                      <Motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute inset-0 rounded-full bg-medical-purple"
                      />
                    )}
                    <Mic size={48} className="text-white relative z-10" />
                  </Motion.button>
                  <span className={`mt-4 text-xl font-black ${isListening ? 'text-medical-purple' : 'text-medical-dark'}`}>
                    {isListening ? '点击结束' : '点击说话'}
                  </span>
                </div>
              </div>

              {/* Bottom decorative bar */}
              <div className="h-2 w-32 bg-medical-light/30 mx-auto mb-4 rounded-full" />
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
