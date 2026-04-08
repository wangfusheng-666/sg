import React, { useState } from "react";
import { Link } from "react-router";
import { 
  Activity, 
  Shield, 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  Heart, 
  Brain, 
  Wind, 
  Sparkles, 
  MessageCircleHeart,
  Zap,
  Info,
  Clock
} from "lucide-react";
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
      <section className={`bg-medical-dark text-white transition-all duration-500 relative overflow-hidden ${isElderlyMode ? 'pt-24 pb-48 px-6' : 'pt-16 pb-32 px-4'}`}>
        <div className="absolute inset-0 z-0 bg-medical-purple/10 opacity-40 animate-pulse pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20 transition-all ${isElderlyMode ? 'text-lg' : 'text-xs'}`}>
              <Sparkles size={isElderlyMode ? 20 : 14} className="text-yellow-400" />
              <span className="font-bold tracking-widest uppercase">{isElderlyMode ? "您的私人健康管家" : "AI Health Intelligence"}</span>
            </div>
            <h1 className={`font-black mb-6 tracking-tighter transition-all leading-tight ${isElderlyMode ? 'text-7xl' : 'text-5xl md:text-6xl'}`}>
              {isElderlyMode ? "养健康：天天好精神" : "AI 智能康养中心"}
            </h1>
            <p className={`font-light transition-all leading-relaxed ${isElderlyMode ? 'text-2xl text-white/90' : 'text-xl text-white/60'}`}>
              {isElderlyMode 
                ? "王爷爷，这里能帮您记下每天的心跳、睡眠和吃饭。小康管家时刻陪着您，让您身体一年比一年硬朗。" 
                : "基于深度学习的大模型系统，为您提供 24/7 的个人健康数据监控、风险预警与精准改善建议。"}
            </p>
          </div>
          <div className={`flex gap-4 p-3 bg-white/5 backdrop-blur-xl rounded-[24px] border border-white/10 transition-all`}>
            <button className={`bg-white text-medical-dark rounded-xl font-black shadow-2xl transition-all ${isElderlyMode ? 'px-14 py-5 text-2xl rounded-2xl' : 'px-8 py-3 text-sm'}`}>
              {isElderlyMode ? "看今天的" : "当日数据"}
            </button>
            <button className={`text-white/60 hover:text-white rounded-xl font-bold transition-all ${isElderlyMode ? 'px-14 py-5 text-2xl' : 'px-8 py-3 text-sm'}`}>
              {isElderlyMode ? "看以前的" : "趋势分析"}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column - Real-time metrics */}
        <div className="lg:col-span-2 space-y-10">
          <div className={`bg-white shadow-2xl border border-medical-light/10 transition-all ${isElderlyMode ? 'p-12 rounded-[60px]' : 'p-10 rounded-[50px]'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className={`bg-medical-bg rounded-2xl flex items-center justify-center text-medical-purple transition-all ${isElderlyMode ? 'w-16 h-16' : 'w-12 h-12'}`}>
                  <Activity size={isElderlyMode ? 32 : 24} />
                </div>
                <h2 className={`font-black text-medical-dark transition-all ${isElderlyMode ? 'text-4xl' : 'text-3xl'}`}>
                  {isElderlyMode ? "身体最近怎么样" : "健康指标监控"}
                </h2>
              </div>
              <div className={`flex p-1.5 bg-medical-bg rounded-2xl border border-medical-light/10`}>
                <button 
                  onClick={() => setSelectedMetric("heart")}
                  className={`rounded-xl font-black transition-all ${selectedMetric === 'heart' ? 'bg-[#422670] text-white shadow-xl' : 'text-medical-mid hover:text-medical-dark'} ${isElderlyMode ? 'px-10 py-4 text-xl' : 'px-6 py-2.5 text-xs'}`}
                >
                  {isElderlyMode ? "看心跳" : "实时心率"}
                </button>
                <button 
                  onClick={() => setSelectedMetric("sleep")}
                  className={`rounded-xl font-black transition-all ${selectedMetric === 'sleep' ? 'bg-[#422670] text-white shadow-xl' : 'text-medical-mid hover:text-medical-dark'} ${isElderlyMode ? 'px-10 py-4 text-xl' : 'px-6 py-2.5 text-xs'}`}
                >
                  {isElderlyMode ? "看睡觉" : "深度睡眠"}
                </button>
              </div>
            </div>

            <div className="w-full mb-12 relative min-h-[350px]">
              <ResponsiveContainer width="100%" height={isElderlyMode ? 500 : 400}>
                <AreaChart data={healthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMetricHealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6B409C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6B409C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#9371B4" fontSize={isElderlyMode ? 18 : 12} tickLine={false} axisLine={false} dy={10} fontWeight="bold" />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '25px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                    itemStyle={{ color: '#6B409C' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke="#6B409C" 
                    strokeWidth={isElderlyMode ? 8 : 5} 
                    fillOpacity={1} 
                    fill="url(#colorMetricHealth)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
              {isElderlyMode && (
                <Motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-0 right-0 bg-[#422670] text-white p-6 rounded-[30px] shadow-2xl flex items-center gap-4 border border-white/10"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Zap size={24} className="text-yellow-400" /></div>
                  <span className="font-black text-xl">心跳曲线越平，代表您睡得越香哦！</span>
                </Motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-medical-light/10">
              {[
                { id: "hr", label: isElderlyMode ? "现在的心跳" : "实时心率", value: "72", unit: isElderlyMode ? "次/分" : "bpm", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
                { id: "ox", label: isElderlyMode ? "血液里的氧气" : "平均血氧", value: "98", unit: "%", icon: Wind, color: "text-blue-500", bg: "bg-blue-50" },
                { id: "pr", label: isElderlyMode ? "心情放松度" : "压力指数", value: "24", unit: isElderlyMode ? "挺稳" : "低", icon: Brain, color: "text-purple-500", bg: "bg-purple-50" },
                { id: "sq", label: isElderlyMode ? "觉睡得香不香" : "睡眠评分", value: "88", unit: "分", icon: Clock, color: "text-green-500", bg: "bg-green-50" },
              ].map((metric) => (
                <div key={metric.id} className={`flex flex-col gap-4 p-8 rounded-[35px] border border-medical-light/5 hover:bg-medical-bg/20 transition-all group`}>
                  <div className={`flex items-center justify-center transition-all ${metric.bg} ${metric.color} rounded-[20px] shadow-sm group-hover:scale-110 ${isElderlyMode ? 'w-16 h-16' : 'w-12 h-12'}`}>
                    <metric.icon size={isElderlyMode ? 32 : 24} />
                  </div>
                  <div>
                    <div className={`font-black text-medical-dark tabular-nums transition-all ${isElderlyMode ? 'text-5xl' : 'text-3xl'}`}>{metric.value}<span className={`font-medium ml-1 transition-all ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}>{metric.unit}</span></div>
                    <div className={`font-black uppercase tracking-widest text-medical-mid mt-2 transition-all ${isElderlyMode ? 'text-lg' : 'text-[10px]'}`}>{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className={`bg-white shadow-2xl border border-medical-light/10 flex flex-col justify-between transition-all hover:border-medical-purple/20 ${isElderlyMode ? 'p-12 rounded-[60px]' : 'p-10 rounded-[50px]'}`}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><Zap size={20} /></div>
                  <h3 className={`font-black text-medical-dark transition-all ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>{isElderlyMode ? "今天怎么动一动" : "AI 运动处方"}</h3>
                </div>
                <p className={`text-medical-mid font-light leading-relaxed mb-10 transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>
                  {isElderlyMode 
                    ? "王爷爷，今天太阳不错，建议您下午 3 点去楼下小花园散步 20 分钟，记着带上水壶。" 
                    : "系统检测到您连续久坐 3 小时，建议立即进行 10 分钟拉伸，今日有氧目标已完成 60%。"}
                </p>
              </div>
              <Link to="/ai-health/exercise" className={`flex items-center justify-between w-full bg-[#422670] text-white rounded-[24px] group hover:bg-medical-purple transition-all shadow-xl shadow-medical-purple/20 ${isElderlyMode ? 'p-8 rounded-[32px]' : 'p-6'}`}>
                <span className={`font-black transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>{isElderlyMode ? "点这里教您散步" : "查看完整运动计划"}</span>
                <ArrowRight size={isElderlyMode ? 32 : 24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className={`bg-white shadow-2xl border border-medical-light/10 flex flex-col justify-between transition-all hover:border-medical-purple/20 ${isElderlyMode ? 'p-12 rounded-[60px]' : 'p-10 rounded-[50px]'}`}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><Sparkles size={20} /></div>
                  <h3 className={`font-black text-medical-dark transition-all ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>{isElderlyMode ? "今天吃点啥好" : "AI 膳食指南"}</h3>
                </div>
                <div className="flex items-end gap-3 mb-6">
                  <div className={`font-black text-[#422670] transition-all ${isElderlyMode ? 'text-8xl' : 'text-6xl'}`}>82</div>
                  <div className={`font-black text-medical-mid mb-3 transition-all ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>/ 100</div>
                </div>
                <p className={`text-medical-mid font-light leading-relaxed mb-10 transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>
                  {isElderlyMode 
                    ? "今天饭菜挺香，就是盐稍微多放了一捏捏。晚上多喝两口白开水，对嗓子好。" 
                    : "今日钠盐摄入略微超标，建议晚间饮食保持清淡，增加钾元素摄入（如香蕉、菠菜）。"}
                </p>
              </div>
              <Link to="/ai-health/diet" className={`flex items-center justify-between w-full bg-[#422670] text-white rounded-[24px] group hover:bg-medical-purple transition-all shadow-xl shadow-medical-purple/20 ${isElderlyMode ? 'p-8 rounded-[32px]' : 'p-6'}`}>
                <span className={`font-black transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>{isElderlyMode ? "点这里看食谱" : "查看营养分析报告"}</span>
                <ArrowRight size={isElderlyMode ? 32 : 24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Warnings & Actions */}
        <div className="space-y-10">
          <div className={`bg-white shadow-2xl border border-medical-light/10 transition-all ${isElderlyMode ? 'p-12 rounded-[60px]' : 'p-10 rounded-[50px]'}`}>
            <h2 className={`font-black text-medical-dark mb-10 flex items-center gap-4 transition-all ${isElderlyMode ? 'text-4xl' : 'text-2xl'}`}>
              <Shield size={isElderlyMode ? 36 : 24} className="text-[#422670]" />
              {isElderlyMode ? "健康小贴士" : "实时安全预警"}
            </h2>
            <div className="space-y-6">
              <div className={`rounded-[30px] bg-red-50 border border-red-100 flex gap-5 transition-all p-8 relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-100/50 rounded-bl-full pointer-events-none" />
                <div className={`bg-red-500 text-white shrink-0 shadow-xl shadow-red-200 transition-all flex items-center justify-center ${isElderlyMode ? 'w-16 h-16 rounded-[20px]' : 'w-12 h-12 rounded-[16px]'}`}>
                  <Activity size={isElderlyMode ? 32 : 24} />
                </div>
                <div className="relative z-10">
                  <div className={`font-black text-red-600 mb-2 transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>{isElderlyMode ? "夜里心跳稍微快了点" : "异常提醒：夜间心律不齐"}</div>
                  <p className={`leading-relaxed font-medium transition-all ${isElderlyMode ? 'text-xl text-red-500/90' : 'text-sm text-red-500/80'}`}>
                    {isElderlyMode ? "昨晚 2 点心跳快了一下。要是不舒服，赶紧点右下角的大红按钮找医生。" : "今日 02:15 监测到 30s 心律波动，已同步至您的私人医生。"}
                  </p>
                </div>
              </div>
              <div className={`rounded-[30px] bg-orange-50 border border-orange-100 flex gap-5 transition-all p-8 relative overflow-hidden`}>
                <div className={`bg-orange-500 text-white shrink-0 shadow-xl shadow-orange-200 transition-all flex items-center justify-center ${isElderlyMode ? 'w-16 h-16 rounded-[20px]' : 'w-12 h-12 rounded-[16px]'}`}>
                  <Shield size={isElderlyMode ? 32 : 24} />
                </div>
                <div>
                  <div className={`font-black text-orange-600 mb-2 transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>{isElderlyMode ? "天冷记得加件衣服" : "健康防护：寒潮预警"}</div>
                  <p className={`leading-relaxed font-medium transition-all ${isElderlyMode ? 'text-xl text-orange-500/90' : 'text-sm text-orange-500/80'}`}>
                    {isElderlyMode ? "小区里感冒的人变多了。老人家出门多穿件厚衣服，别被冻着了。" : "未来 48 小时降温 8°C，心血管疾病高发期，请减少晨练。"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-[#422670] text-white shadow-2xl relative overflow-hidden group cursor-pointer transition-all ${isElderlyMode ? 'p-12 rounded-[60px]' : 'p-10 rounded-[50px]'}`}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full transition-transform group-hover:scale-125 duration-1000" />
            <div className="relative z-10 text-center md:text-left">
              <div className={`bg-white rounded-[24px] flex items-center justify-center text-[#422670] mb-10 shadow-2xl transition-all mx-auto md:mx-0 ${isElderlyMode ? 'w-24 h-24 rounded-[32px]' : 'w-16 h-16'}`}>
                {isElderlyMode ? <MessageCircleHeart size={48} className="text-red-500 animate-pulse" /> : <Calendar size={32} />}
              </div>
              <h3 className={`font-black mb-6 transition-all ${isElderlyMode ? 'text-5xl' : 'text-3xl'}`}>{isElderlyMode ? "这就找医生聊聊天" : "远程专家视诊"}</h3>
              <p className={`text-white/60 font-light leading-relaxed mb-12 transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>
                {isElderlyMode 
                  ? "哪里拿不准，点这里找医生问问。医生就在网上等您，说说话就放心了。" 
                  : "AI 监测到潜在风险？立即连线我们的三甲医院专家，获取权威诊断建议。"}
              </p>
              <button className={`bg-white text-[#422670] rounded-[24px] font-black hover:scale-105 transition-all shadow-2xl w-full ${isElderlyMode ? 'py-8 text-3xl rounded-[32px]' : 'py-5 text-lg'}`}>
                {isElderlyMode ? "点这里 找医生" : "立即预约视诊"}
              </button>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-md p-10 rounded-[50px] border border-white/50 text-center">
             <div className="flex justify-center gap-4 mb-6">
                {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-lg"><ImageWithFallback src={`https://images.unsplash.com/photo-1612349317150-e413f6a5b1f8?w=100&q=80`} /></div>)}
             </div>
             <p className="text-medical-dark font-black mb-2 text-xl">{isElderlyMode ? "您的家庭医生群" : "专属守护团队"}</p>
             <p className="text-medical-mid text-sm font-medium">{isElderlyMode ? "张医生、李护士都在线" : "3 位专家正在实时监护您的数据"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
