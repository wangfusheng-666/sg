import React, { useState } from "react";
import { 
  ShieldCheck, 
  Eye, 
  Zap, 
  AlertTriangle, 
  Shield, 
  Heart, 
  Activity, 
  ArrowRight, 
  Bell
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { useHealthMode } from "../context/HealthModeContext";

export function AIProtection() {
  const { isElderlyMode } = useHealthMode();

  const protectionItems = [
    { 
      title: isElderlyMode ? "疾病预报" : "疾病趋势预警", 
      icon: Zap, 
      color: "bg-blue-500", 
      desc: isElderlyMode ? "看看最近大家都在生什么病，教您怎么躲着走。" : "实时分析社区内的流行性疾病趋势，针对个人身体状况提供精准预防方案。" 
    },
    { 
      title: isElderlyMode ? "不对劲就报警" : "异常征兆监控", 
      icon: Eye, 
      color: "bg-indigo-600", 
      desc: isElderlyMode ? "小管家帮您盯着呢，身体要是不舒服，它第一个发现。" : "AI 自动识别生活习惯中的危险征兆，并在第一时间发出警报提示。" 
    },
    { 
      title: isElderlyMode ? "天气好不好" : "环境健康评估", 
      icon: AlertTriangle, 
      color: "bg-orange-500", 
      desc: isElderlyMode ? "帮您看看空气干不干净，天冷了还是天热了，提醒您加件衣服。" : "监测空气质量、温度及湿度对个人健康指标的潜在影响，提供宜居建议。" 
    },
    { 
      title: isElderlyMode ? "防护小妙招" : "智能防护建议", 
      icon: Shield, 
      color: "bg-green-600", 
      desc: isElderlyMode ? "教您怎么吃、怎么动，让您的身体像铁打的一样强壮。" : "根据体检结果动态生成的科学膳食、运动及补充建议，强化免疫系统。" 
    },
    { 
      title: isElderlyMode ? "孩子们也知道" : "家庭互助网络", 
      icon: Heart, 
      color: "bg-red-500", 
      desc: isElderlyMode ? "您的身体情况，孩子们在手机上也能看到，大家一起守护您。" : "连接家庭成员的健康状态，当老人或小孩出现异常时，AI 会全家推送。" 
    },
    { 
      title: isElderlyMode ? "健康小模拟" : "数字孪生分析", 
      icon: Activity, 
      color: "bg-violet-600", 
      desc: isElderlyMode ? "帮您算算，要是坚持锻炼，一个月后身体能好多少。" : "模拟不同生活决策下的健康走势，通过数字分身预演不同防护策略的成效。" 
    },
  ];

  return (
    <div className={`bg-medical-bg/30 min-h-screen pb-24 transition-all duration-500 ${isElderlyMode ? 'text-lg' : ''}`}>
      {/* Hero / Header */}
      <section className={`bg-medical-dark text-white transition-all duration-500 relative overflow-hidden ${isElderlyMode ? 'pt-24 pb-48 px-6' : 'pt-16 pb-32 px-4'}`}>
        <div className="absolute inset-0 z-0 bg-medical-purple/10 opacity-40 animate-pulse pointer-events-none bg-[#6b409c1a]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-2xl">
              <h1 className={`font-black mb-4 tracking-tighter transition-all ${isElderlyMode ? 'text-6xl' : 'text-4xl md:text-5xl'}`}>
                {isElderlyMode ? "看守护：全天候陪着您" : "AI 智能防护中心"}
              </h1>
              <p className={`font-light transition-all ${isElderlyMode ? 'text-2xl text-white/90 leading-relaxed' : 'text-lg text-white/60 leading-relaxed'}`}>
                {isElderlyMode 
                  ? "老人家，这里就像给您的身体穿上了一层看不见的铠甲。智能小助手时刻帮您盯着周围的危险，让您住得舒心，活得安心。" 
                  : "利用深度学习技术，在疾病发生前建立起第一道坚实防线。精准预测，科学防护，让健康更智慧。"}
              </p>
            </div>
            <div className={`bg-white/5 backdrop-blur-3xl rounded-[60px] flex items-center justify-center text-white shadow-2xl animate-pulse transition-all ${isElderlyMode ? 'w-56 h-56' : 'w-40 h-40'}`}>
               <ShieldCheck size={isElderlyMode ? 120 : 80} className="text-white/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Protection Services */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {protectionItems.map((item, i) => (
           <Motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className={`bg-white shadow-2xl shadow-medical-purple/5 border border-medical-light/10 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-all ${isElderlyMode ? 'p-12 rounded-[60px]' : 'p-10 rounded-[50px]'}`}
           >
              <div>
                 <div className={`rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-medical-purple/10 transition-all ${item.color} ${isElderlyMode ? 'w-20 h-20 rounded-3xl' : 'w-14 h-14'}`}>
                    <item.icon size={isElderlyMode ? 36 : 28} />
                 </div>
                 <h3 className={`font-bold text-medical-dark mb-4 transition-all ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>{item.title}</h3>
                 <p className={`text-medical-mid font-light leading-relaxed mb-10 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>{item.desc}</p>
              </div>
              <div className={`flex items-center gap-2 font-black uppercase tracking-widest text-medical-dark group-hover:gap-4 transition-all ${isElderlyMode ? 'text-lg' : 'text-xs'}`}>
                {isElderlyMode ? "点这里开启" : "开启防护功能"} <ArrowRight size={isElderlyMode ? 24 : 14} className="text-medical-purple" />
              </div>
           </Motion.div>
         ))}
      </section>

      {/* Mid Section */}
      <section className="py-24">
         <div className="max-w-7xl mx-auto px-4">
            <div className={`bg-medical-bg/80 backdrop-blur-xl p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 border border-medical-light/30 transition-all ${isElderlyMode ? 'rounded-[80px]' : 'rounded-[60px]'}`}>
               <div className="flex-1">
                  <h2 className={`font-black text-medical-dark mb-8 tracking-tighter transition-all ${isElderlyMode ? 'text-5xl' : 'text-4xl'}`}>
                    {isElderlyMode ? "您的健康防护盾" : "实时健康防护盾"}
                  </h2>
                  <div className="space-y-6 mb-12">
                     <div className={`flex items-center gap-6 bg-white border border-medical-light/10 shadow-xl shadow-medical-purple/5 transition-all ${isElderlyMode ? 'p-8 rounded-[40px]' : 'p-6 rounded-3xl'}`}>
                        <div className={`bg-green-500 text-white rounded-xl flex items-center justify-center shadow-lg transition-all ${isElderlyMode ? 'w-16 h-16 rounded-2xl' : 'w-12 h-12'}`}>
                           <Shield size={isElderlyMode ? 32 : 24} />
                        </div>
                        <div className="flex-1">
                           <div className={`font-black text-medical-dark mb-1 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                             {isElderlyMode ? "管家在岗：正在帮您盯着呢" : "系统状态：高度防御中"}
                           </div>
                           <div className={`text-medical-mid font-medium transition-all ${isElderlyMode ? 'text-lg' : 'text-xs'}`}>
                             {isElderlyMode ? "已经接通了12个帮您查身体的小工具。" : "AI 防护盾已实时接入 12 项体征传感器。"}
                           </div>
                        </div>
                        <div className={`text-green-500 font-bold uppercase tracking-widest animate-pulse transition-all ${isElderlyMode ? 'text-base' : 'text-[10px]'}`}>Active</div>
                     </div>
                     <div className={`flex items-center gap-6 bg-white border border-medical-light/10 shadow-xl shadow-medical-purple/5 opacity-60 transition-all ${isElderlyMode ? 'p-8 rounded-[40px]' : 'p-6 rounded-3xl'}`}>
                        <div className={`bg-medical-purple text-white rounded-xl flex items-center justify-center shadow-lg transition-all ${isElderlyMode ? 'w-16 h-16 rounded-2xl' : 'w-12 h-12'}`}>
                           <Bell size={isElderlyMode ? 32 : 24} />
                        </div>
                        <div className="flex-1">
                           <div className={`font-black text-medical-dark mb-1 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                             {isElderlyMode ? "以前挺安全：没出过岔子" : "历史预警：0 次拦截"}
                           </div>
                           <div className={`text-medical-mid font-medium transition-all ${isElderlyMode ? 'text-lg' : 'text-xs'}`}>
                             {isElderlyMode ? "这两天身体都挺平稳，没发现什么不对劲。" : "近 24 小时内暂无异常体征触发。"}
                           </div>
                        </div>
                     </div>
                  </div>
                  <button className={`bg-medical-dark text-white font-black hover:bg-medical-purple transition-all shadow-2xl ${isElderlyMode ? 'px-16 py-6 text-xl rounded-[40px]' : 'px-12 py-5 text-sm rounded-[32px]'}`}>
                     {isElderlyMode ? "看看详细的报告" : "查看完整防护报告"}
                  </button>
               </div>
               <div className="w-full lg:w-1/3 flex justify-center">
                  <div className={`bg-medical-purple/10 rounded-full flex items-center justify-center relative transition-all ${isElderlyMode ? 'w-80 h-80' : 'w-64 h-64'}`}>
                     <Motion.div 
                        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-medical-purple/30 rounded-full"
                     />
                     <div className={`bg-medical-purple text-white rounded-full flex items-center justify-center shadow-2xl shadow-medical-purple/40 transition-all ${isElderlyMode ? 'w-64 h-64' : 'w-48 h-48'}`}>
                        <ShieldCheck size={isElderlyMode ? 100 : 80} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
