import React from "react";
import { Link } from "react-router";
import { motion as Motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Circle, Activity, Flame, Timer, Calendar } from "lucide-react";
import { useHealthMode } from "../context/HealthModeContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ExercisePlan() {
  const { isElderlyMode } = useHealthMode();

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      <div className="bg-white border-b border-medical-light/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
          <Link to="/ai-health" className={`flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-all ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}>
            <ArrowLeft size={isElderlyMode ? 28 : 20} /> 返回智能管理
          </Link>
          <h1 className={`font-black text-medical-dark ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>每日运动处方</h1>
          <div className="flex gap-4">
             <button className="px-6 py-2 bg-medical-bg text-medical-purple rounded-xl font-bold text-xs">调整强度</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Progress Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-medical-dark rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-medical-purple/20 blur-3xl -mr-32 -mt-32" />
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold border border-white/20">今日目标：30分钟有氧</span>
                    <span className="text-white/40 text-xs">AI 实时计算中...</span>
                  </div>
                  <div className="flex items-end gap-4 mb-10">
                     <div className="text-7xl font-black">24</div>
                     <div className="text-2xl font-bold text-white/60 mb-2">/ 30 MIN</div>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-12">
                     <Motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-medical-purple" 
                     />
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                     <div className="flex flex-col gap-2">
                        <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">消耗热量</div>
                        <div className="text-2xl font-black flex items-center gap-2"><Flame size={20} className="text-orange-500" /> 185 <span className="text-xs text-white/40 font-normal">kcal</span></div>
                     </div>
                     <div className="flex flex-col gap-2">
                        <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">当前配速</div>
                        <div className="text-2xl font-black flex items-center gap-2"><Timer size={20} className="text-blue-500" /> 6'45"</div>
                     </div>
                     <div className="flex flex-col gap-2">
                        <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">心率区间</div>
                        <div className="text-2xl font-black flex items-center gap-2"><Activity size={20} className="text-green-500" /> 112 <span className="text-xs text-white/40 font-normal">bpm</span></div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
               <h2 className="text-2xl font-black text-medical-dark mb-10 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-medical-purple rounded-full" />
                  动作分解教学
               </h2>
               <div className="space-y-6">
                 {[
                   { title: "热身：关节环绕", time: "5分钟", difficulty: "简单", img: "https://images.unsplash.com/photo-1758274526138-4da003a5a936" },
                   { title: "核心：公园漫步", time: "20分钟", difficulty: "适中", img: "https://images.unsplash.com/photo-1658314755811-73c806249f31" },
                   { title: "拉伸：深呼吸整理", time: "5分钟", difficulty: "简单", img: "https://images.unsplash.com/photo-1762894110556-741b8e066722" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-medical-bg/20 border border-transparent hover:border-medical-purple/20 transition-all cursor-pointer group">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                         <ImageWithFallback src={`${item.img}?w=200`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1">
                         <div className="font-bold text-medical-dark text-lg mb-1">{item.title}</div>
                         <div className="flex items-center gap-4 text-xs text-medical-mid font-bold">
                            <span>时长：{item.time}</span>
                            <span className="w-1 h-1 bg-medical-light rounded-full" />
                            <span>难度：{item.difficulty}</span>
                         </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-medical-purple shadow-sm">
                         <CheckCircle2 size={24} />
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/10">
                <h3 className="text-lg font-black text-medical-dark mb-6 flex items-center gap-2">
                   <Calendar size={18} className="text-medical-purple" />
                   运动排期
                </h3>
                <div className="grid grid-cols-7 gap-2 mb-8">
                   {['一','二','三','四','五','六','日'].map((day, i) => (
                     <div key={i} className="flex flex-col items-center gap-2">
                        <span className="text-[10px] text-medical-mid font-bold">{day}</span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${i < 3 ? 'bg-medical-purple text-white shadow-lg' : 'bg-medical-bg text-medical-mid'}`}>
                           {1 + i}
                        </div>
                     </div>
                   ))}
                </div>
                <div className="p-4 bg-medical-bg/50 rounded-2xl">
                   <p className="text-xs text-medical-mid leading-relaxed">
                     <span className="font-black text-medical-purple">AI 建议：</span> 连续运动 3 天后，建议在明天进行一次轻量休息，让肌肉得到恢复。
                   </p>
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/10">
                <h3 className="text-lg font-black text-medical-dark mb-6">运动风险提示</h3>
                <div className="space-y-4">
                   <div className="flex items-start gap-3">
                      <Circle size={12} className="text-red-500 fill-current mt-1" />
                      <p className="text-xs text-medical-mid leading-relaxed">运动中如感到胸闷、心悸或头晕，请立即停止并休息。</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <Circle size={12} className="text-orange-500 fill-current mt-1" />
                      <p className="text-xs text-medical-mid leading-relaxed">建议在餐后 1 小时再开始运动。</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
