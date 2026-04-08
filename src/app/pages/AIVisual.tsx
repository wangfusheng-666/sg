import React, { useState } from "react";
import { Monitor, Mic, FileText, Speaker, Eye, Volume2, ArrowRight, Zap } from "lucide-react";
import { motion as Motion } from "motion/react";

export function AIVisual() {
  const [activeService, setActiveService] = useState("transcribe");

  const services = [
    { id: "transcribe", name: "实时语音转文字", icon: Mic, desc: "精准捕捉诊疗对话，自动生成电子病历与用药提醒。" },
    { id: "visual", name: "AI 视觉诊断辅助", icon: Eye, desc: "通过手机摄像头实时分析体态、面色等健康微表征。" },
    { id: "read", name: "视障人士辅助朗读", icon: Speaker, desc: "针对药品说明书、检测报告提供高精准度的语音播报。" },
    { id: "document", name: "智能文件数字化", icon: FileText, desc: "快速扫描纸质医疗单据，自动分类并提取关键指标数据。" },
  ];

  return (
    <div className="bg-medical-bg/30 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl font-black text-medical-dark tracking-tighter mb-4">AI 视听文字智能服务</h1>
          <p className="text-medical-mid text-lg font-light max-w-2xl leading-relaxed">
            利用尖端多模态 AI 技术，打破沟通与感官障碍，让医疗服务更具包容性与智能性。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`w-full text-left p-6 rounded-3xl transition-all group ${
                  activeService === service.id 
                    ? 'bg-medical-purple text-white shadow-xl shadow-medical-purple/20 translate-x-2' 
                    : 'bg-white text-medical-dark hover:bg-medical-bg/50 border border-medical-light/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <service.icon size={20} className={activeService === service.id ? 'text-white' : 'text-medical-mid group-hover:text-medical-purple'} />
                  <span className="font-bold text-sm">{service.name}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
             <Motion.div 
               key={activeService}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white rounded-[60px] p-12 shadow-2xl border border-medical-light/10 relative overflow-hidden h-full min-h-[500px] flex flex-col items-center justify-center text-center"
             >
                <div className="absolute top-0 right-0 p-8">
                   <div className="w-12 h-12 bg-medical-purple/10 rounded-2xl flex items-center justify-center text-medical-purple">
                      <Zap size={24} />
                   </div>
                </div>
                
                <div className="w-32 h-32 bg-medical-bg rounded-[48px] flex items-center justify-center text-medical-purple mb-8">
                   {React.createElement(services.find(s => s.id === activeService)?.icon || Monitor, { size: 64 })}
                </div>
                
                <h2 className="text-3xl font-black text-medical-dark mb-6">
                   {services.find(s => s.id === activeService)?.name}
                </h2>
                
                <p className="text-medical-mid text-lg font-light max-w-xl mb-12 leading-relaxed">
                   {services.find(s => s.id === activeService)?.desc}
                </p>

                <div className="flex gap-4">
                   <button className="px-10 py-4 bg-medical-purple text-white rounded-2xl font-black text-sm hover:scale-105 transition-transform shadow-xl">
                      立即开启服务
                   </button>
                   <button className="px-10 py-4 bg-medical-bg text-medical-dark rounded-2xl font-black text-sm hover:bg-medical-light transition-colors">
                      查看使用教程
                   </button>
                </div>

                <div className="mt-16 pt-8 border-t border-medical-light/20 w-full flex items-center justify-center gap-12 text-xs font-black uppercase tracking-widest text-medical-mid">
                   <div className="flex items-center gap-2"><Volume2 size={16} /> 实时处理中</div>
                   <div className="flex items-center gap-2"><FileText size={16} /> 加密传输</div>
                   <div className="flex items-center gap-2"><Eye size={16} /> 智能识别</div>
                </div>
             </Motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
