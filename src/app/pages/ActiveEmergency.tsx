import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { 
  X, 
  MapPin, 
  PhoneCall, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  AlertTriangle,
  Volume2,
  Mic,
  Navigation,
  User,
  Heart
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useHealthMode } from "../context/HealthModeContext";

type Step = "countdown" | "location" | "medical" | "active";

export function ActiveEmergency() {
  const navigate = useNavigate();
  const { isElderlyMode } = useHealthMode();
  const [currentStep, setCurrentStep] = useState<Step>("countdown");
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCancelled, setIsCancelled] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [medicalCategory, setMedicalCategory] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("正在为您发起紧急呼救...");
  const [autoProgressTimer, setAutoProgressTimer] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-progress Logic for Location and Medical steps
  useEffect(() => {
    if (currentStep === "location" || currentStep === "medical") {
      setAutoProgressTimer(3);
      autoNextRef.current = setInterval(() => {
        setAutoProgressTimer((prev) => {
          if (prev !== null && prev <= 1) {
            clearInterval(autoNextRef.current!);
            proceedToNextStep();
            return null;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);
    } else {
      if (autoNextRef.current) clearInterval(autoNextRef.current);
      setAutoProgressTimer(null);
    }
    return () => {
      if (autoNextRef.current) clearInterval(autoNextRef.current);
    };
  }, [currentStep]);

  // Countdown Logic for initial 5s
  useEffect(() => {
    if (currentStep === "countdown" && timeLeft > 0 && !isCancelled) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentStep === "countdown") {
      proceedToNextStep();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, currentStep, isCancelled]);

  const proceedToNextStep = () => {
    if (currentStep === "countdown") {
      setCurrentStep("location");
      setStatusMessage("第一步：已发送基础身份信号，正在锁定您的位置...");
    } else if (currentStep === "location") {
      setCurrentStep("medical");
      setStatusMessage("第二步：位置已发送，正在同步您的医疗档案...");
    } else if (currentStep === "medical") {
      setCurrentStep("active");
      setStatusMessage("第三步：正在为您拨打 120 并在语音播报给紧急联系人...");
    }
  };

  const handleCancel = () => {
    setIsCancelled(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    navigate("/emergency");
  };

  const handleConfirmLocation = () => {
    if (autoNextRef.current) clearInterval(autoNextRef.current);
    setAutoProgressTimer(null);
    setLocationConfirmed(true);
    setTimeout(() => {
      proceedToNextStep();
    }, 1000);
  };

  const handleSelectMedicalCategory = (cat: string) => {
    if (autoNextRef.current) clearInterval(autoNextRef.current);
    setAutoProgressTimer(null);
    setMedicalCategory(cat);
    setTimeout(() => {
      proceedToNextStep();
    }, 1000);
  };

  // UI Constants based on Mode
  const baseFontSize = isElderlyMode ? "text-2xl" : "text-base";
  const titleFontSize = isElderlyMode ? "text-4xl" : "text-2xl";
  const iconSize = isElderlyMode ? 32 : 24;

  return (
    <div className={`fixed inset-0 z-50 bg-emergency flex flex-col items-center justify-center p-6 text-white overflow-hidden ${isElderlyMode ? 'font-black' : ''}`}>
      {/* Background Pulse Effect */}
      <div className="absolute inset-0 z-0">
        <Motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emergency animate-pulse">
                <AlertTriangle size={30} />
             </div>
             <div>
                <h1 className={`${titleFontSize} font-black uppercase tracking-tighter`}>紧急救援模式</h1>
                <p className={`${baseFontSize} text-white/60 font-medium`}>智能救援调度进行中</p>
             </div>
          </div>
          <button 
            onClick={handleCancel}
            className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Status Tracker (The 4 Modules) */}
        <div className="grid grid-cols-4 gap-2 mb-12">
          {[
            { id: "countdown", icon: ShieldCheck, label: "信号" },
            { id: "location", icon: MapPin, label: "定位" },
            { id: "medical", icon: Activity, label: "档案" },
            { id: "active", icon: PhoneCall, label: "救援" },
          ].map((step, idx) => {
            const isCompleted = idx < ["countdown", "location", "medical", "active"].indexOf(currentStep);
            const isActive = step.id === currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div className={`w-full h-2 rounded-full mb-1 transition-all ${isCompleted || isActive ? 'bg-white' : 'bg-white/20'}`} />
                <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-white text-emergency scale-110 shadow-lg' : isCompleted ? 'bg-white/40 text-white' : 'bg-white/10 text-white/40'}`}>
                  <step.icon size={18} />
                </div>
                {!isElderlyMode && <span className="text-[10px] font-bold uppercase tracking-widest">{step.label}</span>}
              </div>
            );
          })}
        </div>

        {/* Main Content Card */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {currentStep === "countdown" && (
              <Motion.div 
                key="countdown"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="relative">
                   <svg className="w-48 h-48 transform -rotate-90">
                      <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/20" />
                      <Motion.circle 
                        cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray="552.92"
                        animate={{ strokeDashoffset: 552.92 - (timeLeft / 5) * 552.92 }}
                        className="text-white"
                      />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center text-7xl font-black">{timeLeft}</div>
                </div>
                <div className="space-y-4">
                  <h2 className={`${titleFontSize} font-black`}>呼救倒计时</h2>
                  <p className={`${baseFontSize} text-white/80 max-w-md`}>系统将在 {timeLeft} 秒后自动联系救援中心和您的紧急联系人。</p>
                </div>
                <button 
                  onClick={handleCancel}
                  className={`mt-6 px-12 py-5 bg-white text-emergency rounded-[30px] font-black ${isElderlyMode ? 'text-4xl px-20' : 'text-xl'} hover:scale-105 active:scale-95 transition-all shadow-2xl`}
                >
                  取消呼救
                </button>
              </Motion.div>
            )}

            {currentStep === "location" && (
              <Motion.div 
                key="location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-8"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-[40px] p-8 border border-white/20 relative overflow-hidden">
                   {autoProgressTimer !== null && (
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                        <span className="text-xs font-bold">{autoProgressTimer}秒后自动确认并继续...</span>
                     </div>
                   )}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-12 -mt-12" />
                   <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-white rounded-3xl text-emergency shadow-xl">
                        <Navigation size={32} />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold uppercase tracking-wider text-white/60">当前位置确认 (GPS 已锁定)</div>
                        <div className={`font-black ${isElderlyMode ? 'text-3xl' : 'text-xl'} mt-1`}>建国路 88 号 华贸商务楼 A座</div>
                      </div>
                   </div>
                   
                   <div className="h-48 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 mb-8 overflow-hidden">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
                        className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <div className="w-12 h-12 bg-emergency rounded-full flex items-center justify-center border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.5)] animate-bounce">
                            <MapPin size={20} fill="white" />
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button 
                        onClick={handleConfirmLocation}
                        className={`py-5 bg-white text-emergency rounded-[25px] font-black ${isElderlyMode ? 'text-2xl' : 'text-lg'} hover:bg-white/90 transition-all shadow-xl`}
                      >
                        确认此位置
                      </button>
                      <button className={`py-5 bg-white/10 border-2 border-white/20 text-white rounded-[25px] font-black ${isElderlyMode ? 'text-2xl' : 'text-lg'} hover:bg-white/20 transition-all`}>
                        修正位置信息
                      </button>
                   </div>
                </div>
              </Motion.div>
            )}

            {currentStep === "medical" && (
              <Motion.div 
                key="medical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-8 relative"
              >
                {autoProgressTimer !== null && (
                  <div className="flex items-center justify-center gap-2 bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10 mx-auto w-fit animate-pulse mb-4">
                     <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                     <span className="text-xs font-bold">{autoProgressTimer}秒后自动发起语音呼救...</span>
                  </div>
                )}
                <h2 className={`${titleFontSize} font-black text-center mb-4`}>请告知您的症状</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "heart", label: "胸痛/心脏", icon: Heart, color: "bg-red-500" },
                    { id: "breath", label: "呼吸困难", icon: Activity, color: "bg-blue-500" },
                    { id: "trauma", label: "意外受伤", icon: ShieldCheck, color: "bg-orange-500" },
                    { id: "faint", label: "晕厥不适", icon: User, color: "bg-purple-500" },
                  ].map((cat) => (
                    <button 
                      key={cat.id}
                      onClick={() => handleSelectMedicalCategory(cat.label)}
                      className={`p-6 bg-white/10 backdrop-blur-md rounded-[35px] border-2 border-white/10 flex flex-col items-center gap-4 transition-all hover:bg-white hover:text-emergency group ${medicalCategory === cat.label ? 'bg-white text-emergency border-white' : ''}`}
                    >
                      <div className={`p-4 rounded-2xl ${cat.color} text-white transition-transform group-hover:scale-110`}>
                        <cat.icon size={32} />
                      </div>
                      <span className={`${isElderlyMode ? 'text-2xl' : 'text-lg'} font-black`}>{cat.label}</span>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => proceedToNextStep()}
                  className={`w-full py-5 bg-white/20 border-2 border-white/20 text-white rounded-[25px] font-black ${isElderlyMode ? 'text-2xl' : 'text-lg'} hover:bg-white/30 transition-all`}
                >
                  不确定，直接联系医生
                </button>
              </Motion.div>
            )}

            {currentStep === "active" && (
              <Motion.div 
                key="active"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full space-y-10"
              >
                <div className="flex flex-col items-center gap-6">
                   <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-20 animate-pulse" />
                      <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-emergency relative z-10 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                        <PhoneCall size={64} className="animate-bounce" />
                      </div>
                   </div>
                   <div className="text-center space-y-2">
                      <h2 className={`${titleFontSize} font-black`}>已连接专业调度中心</h2>
                      <div className="flex items-center justify-center gap-2 text-white/80">
                         <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                         <span className={`${baseFontSize} font-bold`}>通话中: 120 紧急救援中心</span>
                      </div>
                   </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-[40px] p-8 border border-white/20">
                   <div className="flex items-start gap-4 mb-8 text-left">
                      <div className="p-3 bg-green-500 rounded-2xl text-white">
                         <Volume2 size={24} />
                      </div>
                      <div>
                         <div className="text-xs font-bold uppercase tracking-wider text-white/60">智能播报状态 (亲属同步中)</div>
                         <p className={`${isElderlyMode ? 'text-xl' : 'text-sm'} mt-2 leading-relaxed italic opacity-90`}>
                           “正在向紧急联系人播报：用户张先生在建国路触发呼救，初步症状：{medicalCategory || '待确认为胸痛'}，救援队已派遣...”
                         </p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <button className={`w-full py-6 bg-green-500 text-white rounded-[30px] font-black ${isElderlyMode ? 'text-3xl' : 'text-xl'} flex items-center justify-center gap-4 hover:bg-green-600 transition-all shadow-xl shadow-green-500/20`}>
                        <Mic size={iconSize} /> 开启语音对讲
                      </button>
                      <Link 
                        to="/emergency"
                        className={`w-full py-5 bg-white/10 border-2 border-white/20 text-white rounded-[25px] font-black ${isElderlyMode ? 'text-xl' : 'text-sm'} flex items-center justify-center gap-2`}
                      >
                        <X size={18} /> 结束本次呼救
                      </Link>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                      <div className="text-[10px] font-bold text-white/40 uppercase mb-2">救援队预计</div>
                      <div className="text-3xl font-black text-white">4:20</div>
                      <div className="text-[10px] font-bold text-white/60">分钟后到达</div>
                   </div>
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                      <div className="text-[10px] font-bold text-white/40 uppercase mb-2">紧急联系人</div>
                      <div className="text-3xl font-black text-white">已送达</div>
                      <div className="text-[10px] font-bold text-white/60">正在呼叫</div>
                   </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Tip */}
        <div className="mt-8 py-4 border-t border-white/10 flex items-center justify-center gap-2 opacity-60">
           <ShieldCheck size={16} />
           <span className="text-[10px] font-bold uppercase tracking-widest">您的实时数据受 AI 保护，仅用于本次生命救援</span>
        </div>
      </div>
    </div>
  );
}
