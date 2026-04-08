import React, { useState } from "react";
import { ShieldCheck, Eye, Zap, AlertTriangle, Shield, Heart, Activity, ArrowRight, Activity as ActivityIcon } from "lucide-react";
import { motion as Motion } from "motion/react";

export function AIProtection() {
  return (
    <div className="bg-medical-bg/30 min-h-screen pb-24">
      {/* Hero / Header */}
      <section className="bg-medical-dark text-white pt-16 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-medical-purple/10 opacity-40 animate-pulse pointer-events-none bg-[#6b409c1a]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">AI 智能防护中心</h1>
              <p className="text-white/60 text-lg font-light leading-relaxed">
                利用深度学习技术，在疾病发生前建立起第一道坚实防线。精准预测，科学防护，让健康更智慧。
              </p>
            </div>
            <div className="w-40 h-40 bg-white/5 backdrop-blur-3xl rounded-[60px] flex items-center justify-center text-white shadow-2xl animate-pulse">
               <ShieldCheck size={80} className="text-white/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Protection Services */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {[
           { title: "疾病趋势预警", icon: Zap, color: "bg-blue-500", desc: "实时分析社区内的流行性疾病趋势，针对个人身体状况提供精准预防方案。" },
           { title: "异常征兆监控", icon: Eye, color: "bg-indigo-600", desc: "AI 自动识别生活习惯中的危险征兆，并在第一时间发出警报提示。" },
           { title: "环境健康评估", icon: AlertTriangle, color: "bg-orange-500", desc: "监测空气质量、温度及湿度对个人健康指标的潜在影响，提供宜居建议。" },
           { title: "智能防护建议", icon: Shield, color: "bg-green-600", desc: "根据体检结果动态生成的科学膳食、运动及补充建议，强化免疫系统。" },
           { title: "家庭互助网络", icon: Heart, color: "bg-red-500", desc: "连接家庭成员的健康状态，当老人或小孩出现异常时，AI 会全家推送。" },
           { title: "数字孪生分析", icon: Activity, color: "bg-violet-600", desc: "模拟不同生活决策下的健康走势，通过数字分身预演不同防护策略的成效。" },
         ].map((item, i) => (
           <Motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-10 rounded-[50px] shadow-2xl shadow-medical-purple/5 border border-medical-light/10 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-transform"
           >
              <div>
                 <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-medical-purple/10`}>
                    <item.icon size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-medical-dark mb-4">{item.title}</h3>
                 <p className="text-medical-mid text-sm font-light leading-relaxed mb-10">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-medical-dark group-hover:gap-4 transition-all">
                开启防护功能 <ArrowRight size={14} className="text-medical-purple" />
              </div>
           </Motion.div>
         ))}
      </section>

      {/* Mid Section */}
      <section className="py-24">
         <div className="max-w-7xl mx-auto px-4">
            <div className="bg-medical-bg/80 backdrop-blur-xl rounded-[60px] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 border border-medical-light/30">
               <div className="flex-1">
                  <h2 className="text-4xl font-black text-medical-dark mb-8 tracking-tighter">实时健康防护盾</h2>
                  <div className="space-y-6 mb-12">
                     <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-medical-light/10 shadow-xl shadow-medical-purple/5">
                        <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                           <Shield size={24} />
                        </div>
                        <div className="flex-1">
                           <div className="text-sm font-black text-medical-dark mb-1">系统状态：高度防御中</div>
                           <div className="text-xs text-medical-mid font-medium">AI 防护盾已实时接入 12 项体征传感器。</div>
                        </div>
                        <div className="text-[10px] text-green-500 font-bold uppercase tracking-widest animate-pulse">Active</div>
                     </div>
                     <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-medical-light/10 shadow-xl shadow-medical-purple/5 opacity-60">
                        <div className="w-12 h-12 bg-medical-purple text-white rounded-xl flex items-center justify-center shadow-lg">
                           <ActivityIcon size={24} />
                        </div>
                        <div className="flex-1">
                           <div className="text-sm font-black text-medical-dark mb-1">历史预警：0 次拦截</div>
                           <div className="text-xs text-medical-mid font-medium">近 24 小时内暂无异常体征触发。</div>
                        </div>
                     </div>
                  </div>
                  <button className="px-12 py-5 bg-medical-dark text-white rounded-[32px] font-black text-sm hover:bg-medical-purple transition-all shadow-2xl">
                     查看完整防护报告
                  </button>
               </div>
               <div className="w-full lg:w-1/3 flex justify-center">
                  <div className="w-64 h-64 bg-medical-purple/10 rounded-full flex items-center justify-center relative">
                     <Motion.div 
                        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-medical-purple/30 rounded-full"
                     />
                     <div className="w-48 h-48 bg-medical-purple text-white rounded-full flex items-center justify-center shadow-2xl shadow-medical-purple/40">
                        <ShieldCheck size={80} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
