import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { motion as Motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  ChevronRight, 
  CheckCircle2,
  Circle,
  Activity,
  AlertTriangle,
  Flame,
  Volume2
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useHealthMode } from "../context/HealthModeContext";

export function SimulationDetail() {
  const { id } = useParams();
  const { isElderlyMode } = useHealthMode();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "现场安全评估", desc: "确保您和伤病员的环境安全，无过往车辆或危险物体。", icon: ShieldCheck },
    { title: "判断意识状态", desc: "拍打双肩并大声询问：“喂！你怎么了？”观察是否有反应。", icon: MessageSquare },
    { title: "呼救并拨打120", desc: "指定旁边的人拨打 120，并取回最近的 AED。", icon: PhoneCall },
    { title: "开始胸外按压", desc: "在胸骨下半段，以 100-120 次/分钟的速度持续按压。", icon: HeartPulse },
  ];

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      <div className="bg-white border-b border-medical-light/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
          <Link to="/emergency/simulations" className={`flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-all ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}>
            <ArrowLeft size={isElderlyMode ? 28 : 20} /> 返回模拟列表
          </Link>
          <div className="flex gap-4">
             <button className="px-6 py-3 bg-medical-bg text-medical-purple rounded-xl font-black text-sm flex items-center gap-2">
                <Volume2 size={18} /> 开启语音引导
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Simulation View */}
          <div className="lg:col-span-2 space-y-10">
            <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-black border-4 border-white group">
               <ImageWithFallback 
                 src="https://images.unsplash.com/photo-1765996796562-ce301df337a0?auto=format&fit=crop&q=80&w=1200" 
                 className="w-full h-full object-cover opacity-60" 
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
                  <AnimatePresence mode="wait">
                    <Motion.div
                      key={currentStep}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="max-w-xl"
                    >
                      <div className="bg-medical-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                         {React.createElement(steps[currentStep].icon, { size: 40 })}
                      </div>
                      <h2 className="text-4xl font-black mb-6 tracking-tight">第 {currentStep + 1} 步：{steps[currentStep].title}</h2>
                      <p className="text-xl text-white/80 leading-relaxed font-light">{steps[currentStep].desc}</p>
                    </Motion.div>
                  </AnimatePresence>
               </div>
               {/* Controls */}
               <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center">
                  <button 
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white disabled:opacity-30 transition-all hover:bg-white/20"
                  >
                     <ArrowLeft size={24} />
                  </button>
                  <div className="flex gap-3">
                     {steps.map((_, i) => (
                       <div key={i} className={`h-2 rounded-full transition-all ${i === currentStep ? 'w-12 bg-medical-purple shadow-lg' : 'w-4 bg-white/20'}`} />
                     ))}
                  </div>
                  <button 
                    onClick={() => currentStep < steps.length - 1 ? setCurrentStep(prev => prev + 1) : null}
                    className="px-8 py-4 bg-medical-purple text-white rounded-2xl font-black flex items-center gap-2 hover:bg-medical-dark transition-all shadow-xl"
                  >
                     {currentStep === steps.length - 1 ? "完成练习" : "下一步"} <ChevronRight size={20} />
                  </button>
               </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
               <h3 className="text-2xl font-black text-medical-dark mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-medical-purple rounded-full" />
                  实操关键点
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-3xl bg-green-50 border border-green-100">
                     <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                        <CheckCircle2 size={18} /> 正确姿势
                     </h4>
                     <p className="text-sm text-green-600/80 leading-relaxed">
                        双臂伸直，肘关节不得弯曲，利用身体重量向下压，垂直向下。
                     </p>
                  </div>
                  <div className="p-6 rounded-3xl bg-red-50 border border-red-100">
                     <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                        <AlertTriangle size={18} /> 常见错误
                     </h4>
                     <p className="text-sm text-red-600/80 leading-relaxed">
                        按压过浅或过深（应为 5-6 厘米），按压后胸口未充分回弹。
                     </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
             <div className="bg-medical-dark rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="text-xl font-black mb-6">您的训练进度</h3>
                   <div className="flex items-end gap-3 mb-10">
                      <div className="text-6xl font-black">75</div>
                      <div className="text-xl font-bold text-white/40 mb-2">% 已掌握</div>
                   </div>
                   <div className="space-y-6">
                      {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${i <= currentStep ? 'bg-medical-purple text-white' : 'bg-white/10 text-white/40'}`}>
                              {i < currentStep ? <CheckCircle2 size={16} /> : i + 1}
                           </div>
                           <span className={`text-sm font-bold ${i <= currentStep ? 'text-white' : 'text-white/40'}`}>{step.title}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/10">
                <h3 className="text-lg font-black text-medical-dark mb-8">专家在线辅导</h3>
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 rounded-full bg-medical-bg overflow-hidden">
                      <ImageWithFallback src="https://i.pravatar.cc/150?u=doc1" />
                   </div>
                   <div>
                      <div className="font-bold text-medical-dark text-lg">李明 医生</div>
                      <div className="text-xs text-medical-mid font-bold uppercase tracking-widest">认证急救导师</div>
                   </div>
                </div>
                <button className="w-full py-4 bg-medical-purple text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-medical-dark transition-all shadow-lg">
                   预约视频回看纠错
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
  )
}

function MessageSquare(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  )
}

function PhoneCall(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/></svg>
  )
}

function HeartPulse(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>
  )
}
