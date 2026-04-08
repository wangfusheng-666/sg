import React, { useState } from "react";
import { Link } from "react-router";
import { Activity, Shield, TrendingUp, Calendar, ArrowRight, Heart, Brain, Wind, Sparkles, MessageCircleHeart } from "lucide-react";
import { motion as Motion } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useHealthMode } from "../context/HealthModeContext";

const healthData = [
  { time: "00:00", heart: 65, sleep: 95 },
  { time: "04:00", heart: 62, sleep: 98 },
  { time: "08:00", heart: 78, sleep: 20 },
  { time: "12:00", heart: 85, sleep: 0 },
  { time: "16:00", heart: 82, sleep: 0 },
  { time: "20:00", heart: 75, sleep: 10 },
  { time: "23:59", heart: 68, sleep: 90 },
];

export function AIHealth() {
  const [selectedMetric, setSelectedMetric] = useState("heart");
  const { isElderlyMode } = useHealthMode();

  return (
    <div className={`bg-medical-bg/30 min-h-screen pb-24 transition-all duration-500 ${isElderlyMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <section className={`bg-medical-dark text-white transition-all duration-500 ${isElderlyMode ? 'pt-24 pb-40 px-6' : 'pt-16 pb-32 px-4'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-xl">
            <h1 className={`font-black mb-4 tracking-tighter transition-all ${isElderlyMode ? 'text-6xl' : 'text-4xl'}`}>
              {isElderlyMode ? "养健康：您的生活好帮手" : "AI 智能管理中心"}
            </h1>
            <p className={`font-light transition-all ${isElderlyMode ? 'text-2xl text-white/90' : 'text-lg text-white/60'}`}>
              {isElderlyMode 
                ? "老人家，这里能帮您记下每天的心跳、睡眠和吃饭。小管家时刻陪着您，让您身体更硬朗。" 
                : "基于大模型的全方位健康监测与预警系统。为您提供 24/7 的个人健康数据管家服务。"}
            </p>
          </div>
          <div className={`flex gap-4 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all ${isElderlyMode ? 'p-4 rounded-3xl' : 'p-2'}`}>
            <button className={`bg-white text-medical-dark rounded-xl font-bold shadow-xl transition-all ${isElderlyMode ? 'px-10 py-4 text-xl rounded-2xl' : 'px-6 py-2.5 text-sm'}`}>
              {isElderlyMode ? "看今天的" : "当日数据"}
            </button>
            <button className={`text-white/60 hover:text-white rounded-xl font-bold transition-all ${isElderlyMode ? 'px-10 py-4 text-xl' : 'px-6 py-2.5 text-sm'}`}>
              {isElderlyMode ? "看以前的" : "历史走势"}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Real-time metrics */}
        <div className="lg:col-span-2 space-y-8">
          <div className={`bg-white rounded-[40px] shadow-xl border border-medical-light/20 transition-all ${isElderlyMode ? 'p-12' : 'p-10'}`}>
            <div className="flex items-center justify-between mb-12">
              <h2 className={`font-black text-medical-dark transition-all ${isElderlyMode ? 'text-4xl' : 'text-2xl'}`}>
                {isElderlyMode ? "身体怎么样了" : "健康指标监控"}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedMetric("heart")}
                  className={`rounded-xl font-bold transition-all ${selectedMetric === 'heart' ? 'bg-medical-purple text-white shadow-lg shadow-medical-purple/20' : 'bg-medical-bg text-medical-mid'} ${isElderlyMode ? 'px-8 py-3 text-lg' : 'px-4 py-2 text-xs'}`}
                >
                  {isElderlyMode ? "看心跳" : "心率"}
                </button>
                <button 
                  onClick={() => setSelectedMetric("sleep")}
                  className={`rounded-xl font-bold transition-all ${selectedMetric === 'sleep' ? 'bg-medical-purple text-white shadow-lg shadow-medical-purple/20' : 'bg-medical-bg text-medical-mid'} ${isElderlyMode ? 'px-8 py-3 text-lg' : 'px-4 py-2 text-xs'}`}
                >
                  {isElderlyMode ? "看睡觉" : "睡眠"}
                </button>
              </div>
            </div>

            <div className="w-full mb-12 relative min-h-[300px]">
              <ResponsiveContainer width="100%" height={isElderlyMode ? 450 : 350} minWidth={0} minHeight={0}>
                <AreaChart data={healthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs key="defs">
                    <linearGradient id="colorMetricHealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6B409C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6B409C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis key="xaxis" dataKey="time" stroke="#9371B4" fontSize={isElderlyMode ? 16 : 12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis key="yaxis" hide />
                  <Tooltip 
                    key="tooltip"
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                    itemStyle={{ color: '#6B409C' }}
                  />
                  <Area 
                    key={`area-${selectedMetric}`}
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke="#6B409C" 
                    strokeWidth={isElderlyMode ? 6 : 4} 
                    fillOpacity={1} 
                    fill="url(#colorMetricHealth)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
              {isElderlyMode && (
                <div className="absolute top-0 left-0 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-medical-light/20 flex items-center gap-2">
                  <Sparkles className="text-yellow-500" size={24} />
                  <span className="font-bold text-medical-dark">心跳曲线越平，身体越稳哦！</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: "hr", label: isElderlyMode ? "现在的心跳" : "当前心率", value: "72", unit: isElderlyMode ? "次/分" : "bpm", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
                { id: "ox", label: isElderlyMode ? "血氧饱满度" : "平均血氧", value: "98", unit: "%", icon: Wind, color: "text-blue-500", bg: "bg-blue-50" },
                { id: "pr", label: isElderlyMode ? "放松心情" : "压力指数", value: "24", unit: isElderlyMode ? "挺好" : "低", icon: Brain, color: "text-purple-500", bg: "bg-purple-50" },
                { id: "sq", label: isElderlyMode ? "睡觉好不好" : "睡眠质量", value: "88", unit: "分", icon: Activity, color: "text-green-500", bg: "bg-green-50" },
              ].map((metric) => (
                <div key={metric.id} className={`flex flex-col gap-4 p-6 rounded-3xl border border-medical-light/10 hover:bg-medical-bg/10 transition-all ${isElderlyMode ? 'p-8 rounded-[40px]' : 'p-6'}`}>
                  <div className={`flex items-center justify-center transition-all ${metric.bg} ${metric.color} rounded-xl ${isElderlyMode ? 'w-14 h-14 rounded-2xl' : 'w-10 h-10'}`}>
                    <metric.icon size={isElderlyMode ? 28 : 20} />
                  </div>
                  <div>
                    <div className={`font-black text-medical-dark tabular-nums transition-all ${isElderlyMode ? 'text-4xl' : 'text-2xl'}`}>{metric.value}<span className={`font-medium ml-1 transition-all ${isElderlyMode ? 'text-xl' : 'text-xs'}`}>{metric.unit}</span></div>
                    <div className={`font-bold uppercase tracking-widest text-medical-mid transition-all ${isElderlyMode ? 'text-base mt-2' : 'text-[10px]'}`}>{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`bg-white rounded-[40px] shadow-xl border border-medical-light/20 flex flex-col justify-between transition-all ${isElderlyMode ? 'p-12' : 'p-10'}`}>
              <div>
                <h3 className={`font-bold text-medical-dark mb-4 transition-all ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>{isElderlyMode ? "运动小建议" : "AI 运动推荐"}</h3>
                <p className={`text-medical-mid font-light leading-relaxed mb-8 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                  {isElderlyMode 
                    ? "老人家，看您昨天睡得不错，今天去公园散散步，走上30分钟，对腿脚好。" 
                    : "根据您昨日的睡眠与今日的心率水平，建议您进行 30 分钟的轻量有氧慢跑。"}
                </p>
              </div>
              <Link to="/ai-health/exercise" className={`flex items-center justify-between w-full bg-medical-bg/50 rounded-2xl group hover:bg-medical-purple hover:text-white transition-all ${isElderlyMode ? 'p-6 rounded-3xl' : 'p-4'}`}>
                <span className={`font-bold transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>{isElderlyMode ? "点这里教您怎么走" : "查看详情方案"}</span>
                <ArrowRight size={isElderlyMode ? 24 : 18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className={`bg-white rounded-[40px] shadow-xl border border-medical-light/20 flex flex-col justify-between transition-all ${isElderlyMode ? 'p-12' : 'p-10'}`}>
              <div>
                <h3 className={`font-bold text-medical-dark mb-4 transition-all ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>{isElderlyMode ? "吃饭香不香" : "饮食建议评分"}</h3>
                <div className="flex items-end gap-2 mb-4">
                  <div className={`font-black text-medical-purple transition-all ${isElderlyMode ? 'text-7xl' : 'text-5xl'}`}>82</div>
                  <div className={`font-bold text-medical-mid mb-2 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>/ 100</div>
                </div>
                <p className={`text-medical-mid font-light leading-relaxed mb-8 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                  {isElderlyMode 
                    ? "今天吃得挺好，就是肉稍微多了一点点。晚上多喝两口青菜汤，身体更舒服。" 
                    : "午餐摄入脂肪略高，建议晚餐以高纤维蔬菜为主。"}
                </p>
              </div>
              <Link to="/ai-health/diet" className={`flex items-center justify-between w-full bg-medical-bg/50 rounded-2xl group hover:bg-medical-purple hover:text-white transition-all ${isElderlyMode ? 'p-6 rounded-3xl' : 'p-4'}`}>
                <span className={`font-bold transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>{isElderlyMode ? "点这里看食谱" : "查看食谱推荐"}</span>
                <ArrowRight size={isElderlyMode ? 24 : 18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Warnings & Actions */}
        <div className="space-y-8">
          <div className={`bg-white rounded-[40px] shadow-xl border border-medical-light/20 transition-all ${isElderlyMode ? 'p-10' : 'p-8'}`}>
            <h2 className={`font-black text-medical-dark mb-6 flex items-center gap-2 transition-all ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>
              <Shield size={isElderlyMode ? 28 : 20} className="text-medical-purple" />
              {isElderlyMode ? "健康小贴士" : "健康预警系统"}
            </h2>
            <div className="space-y-4">
              <div className={`rounded-3xl bg-red-50 border border-red-100 flex gap-4 transition-all ${isElderlyMode ? 'p-7' : 'p-5'}`}>
                <div className={`bg-red-500 text-white shrink-0 shadow-lg shadow-red-200 transition-all flex items-center justify-center ${isElderlyMode ? 'w-14 h-14 rounded-3xl' : 'w-10 h-10 rounded-2xl'}`}>
                  <Activity size={isElderlyMode ? 28 : 20} />
                </div>
                <div>
                  <div className={`font-black text-red-600 mb-1 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>{isElderlyMode ? "心跳快了一下" : "异常预警：夜间心律不齐"}</div>
                  <p className={`leading-relaxed font-light transition-all ${isElderlyMode ? 'text-lg text-red-500/90' : 'text-xs text-red-500/80'}`}>
                    {isElderlyMode ? "昨晚夜里心跳稍微快了点。如果有哪里难受，一定要点右下角的红按钮找医生哦。" : "昨日凌晨 02:15 监测到短时间心律波动，建议预约心内科医生。"}
                  </p>
                </div>
              </div>
              <div className={`rounded-3xl bg-orange-50 border border-orange-100 flex gap-4 transition-all ${isElderlyMode ? 'p-7' : 'p-5'}`}>
                <div className={`bg-orange-500 text-white shrink-0 shadow-lg shadow-orange-200 transition-all flex items-center justify-center ${isElderlyMode ? 'w-14 h-14 rounded-3xl' : 'w-10 h-10 rounded-2xl'}`}>
                  <Shield size={isElderlyMode ? 28 : 20} />
                </div>
                <div>
                  <div className={`font-black text-orange-600 mb-1 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>{isElderlyMode ? "最近天冷别着凉" : "健康防护：感冒高发预警"}</div>
                  <p className={`leading-relaxed font-light transition-all ${isElderlyMode ? 'text-lg text-orange-500/90' : 'text-xs text-orange-500/80'}`}>
                    {isElderlyMode ? "小区里最近感冒的人挺多。老人家出门多穿件衣服，家里窗户开个缝通通风。" : "社区近期感冒病例增加 15%，请注意日常保暖并按时通风。"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-medical-dark text-white rounded-[40px] shadow-2xl relative overflow-hidden group cursor-pointer transition-all ${isElderlyMode ? 'p-12' : 'p-10'}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-medical-purple/20 rounded-bl-full transition-transform group-hover:scale-150 duration-700" />
            <div className="relative z-10">
              <div className={`bg-white rounded-3xl flex items-center justify-center text-medical-dark mb-8 shadow-xl transition-all ${isElderlyMode ? 'w-20 h-20 rounded-[30px]' : 'w-16 h-16 rounded-3xl'}`}>
                {isElderlyMode ? <MessageCircleHeart size={40} className="text-red-500" /> : <Calendar size={32} />}
              </div>
              <h3 className={`font-black mb-4 transition-all ${isElderlyMode ? 'text-4xl' : 'text-2xl'}`}>{isElderlyMode ? "这就找医生聊天" : "专家在线问诊"}</h3>
              <p className={`text-white/60 font-light leading-relaxed mb-10 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                {isElderlyMode 
                  ? "有什么拿不准的，点这里找医生问问。医生就在网上等您，说说话就放心了。" 
                  : "AI 监测到您的健康风险了吗？立即预约我们的专业医生，获取更权威的诊断建议。"}
              </p>
              <button className={`bg-white text-medical-dark rounded-2xl font-black hover:scale-105 transition-all shadow-xl w-full ${isElderlyMode ? 'px-14 py-6 text-2xl' : 'px-10 py-4 text-sm'}`}>
                {isElderlyMode ? "找医生问问" : "立即预约"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
