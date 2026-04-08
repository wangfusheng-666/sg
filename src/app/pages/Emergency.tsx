import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  PhoneCall, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  Settings, 
  Share2, 
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Activity,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Emergency() {
  const [activeTab, setActiveTab] = useState("dispatch");
  
  const stats = [
    { label: "活跃救援点", value: "48", icon: MapPin, color: "text-blue-500" },
    { label: "平均到达时间", value: "05:42", icon: Clock, color: "text-green-500" },
    { label: "在线急救师", value: "126", icon: Users, color: "text-orange-500" },
    { label: "今日成功救援", value: "12", icon: Shield, color: "text-red-500" },
  ];

  const emergencyEvents = [
    { id: 1, type: "心脏骤停", location: "建国路社区 A栋", status: "已到达", time: "08:24", severity: "high" },
    { id: 2, type: "老人摔伤", location: "朝阳园 12号楼", status: "前往中", time: "08:35", severity: "medium" },
    { id: 3, type: "急���哮喘", location: "阳光小区 3号楼", status: "调度中", time: "08:42", severity: "high" },
  ];

  return (
    <div className="bg-medical-bg/30 min-h-screen pb-24">
      {/* Hero / Header */}
      <section className="bg-medical-dark text-white pt-16 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1630443319593-261711fc8a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">紧急救援中心</h1>
              <p className="text-white/60 text-lg font-light">
                连接全社区的智慧急救网络。通过 AI 毫秒级响应，将救治时间缩短至黄金 4 分钟。
              </p>
            </div>
            <Link 
              to="/emergency/active"
              className="px-10 py-5 bg-emergency text-white rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-emergency/40 flex items-center gap-4 group"
            >
              <div className="bg-white/20 p-2 rounded-full group-hover:bg-white group-hover:text-emergency transition-colors">
                <PhoneCall size={24} />
              </div>
              一键快速呼救
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[32px] shadow-xl shadow-medical-purple/5 border border-medical-light/20 flex flex-col gap-4"
            >
              <div className={`p-3 w-fit rounded-2xl bg-medical-bg/50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-3xl font-black text-medical-dark tabular-nums">{stat.value}</div>
                <div className="text-xs text-medical-mid font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Navigation & Tools */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-medical-purple/5 rounded-bl-full -mr-12 -mt-12" />
            <h2 className="text-xl font-black text-medical-dark mb-8 flex items-center gap-2">
              <Activity size={20} className="text-medical-purple" />
              急救中心管理
            </h2>
            <nav className="space-y-2">
              {[
                { id: "dispatch", name: "外勤派驻", icon: MapPin },
                { id: "equipment", name: "设施检查", icon: Settings },
                { id: "training", name: "急救培训", icon: Users },
                { id: "exchange", name: "业务交流", icon: MessageSquare },
                { id: "share", name: "共享数据", icon: Share2 },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                    activeTab === item.id 
                      ? 'bg-medical-purple text-white shadow-lg shadow-medical-purple/30' 
                      : 'hover:bg-medical-bg/50 text-medical-dark'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-medical-mid group-hover:text-medical-purple'} />
                    <span className="font-bold">{item.name}</span>
                  </div>
                  <ChevronRight size={18} className={`transition-transform ${activeTab === item.id ? 'translate-x-1' : 'opacity-0'}`} />
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-medical-purple text-white rounded-[40px] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
               <ImageWithFallback 
                src="https://images.unsplash.com/photo-1630443319593-261711fc8a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold mb-4 relative z-10">急救知识快速通道</h3>
            <p className="text-white/60 text-sm mb-6 relative z-10 leading-relaxed font-light">
              遇到紧急情况不知道如何操作？查看我们的 AI 引导式急救指南。
            </p>
            <Link to="/emergency/simulations" className="w-full py-4 bg-white text-medical-purple rounded-2xl font-black text-sm hover:bg-medical-light transition-colors relative z-10 flex items-center justify-center">
              立即进入模拟实操
            </Link>
          </div>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <Motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {activeTab === "dispatch" && (
                <>
                  <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/20 min-h-[400px]">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-black text-medical-dark">实时派遣状态</h2>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">48 在线</span>
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">5 任务中</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {emergencyEvents.map((event) => (
                        <div key={event.id} className="p-6 rounded-3xl border border-medical-light/10 bg-medical-bg/10 hover:bg-medical-bg/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-2xl ${event.severity === 'high' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-orange-100 text-orange-600'}`}>
                              <AlertCircle size={24} />
                            </div>
                            <div>
                              <div className="text-lg font-bold text-medical-dark">{event.type}</div>
                              <div className="text-sm text-medical-mid flex items-center gap-1">
                                <MapPin size={14} /> {event.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-xs text-medical-mid font-medium mb-1">派遣时间</div>
                              <div className="font-bold text-medical-dark">{event.time}</div>
                            </div>
                            <div className={`px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest ${
                              event.status === '已到达' ? 'bg-green-500 text-white' : 'bg-medical-purple text-white'
                            }`}>
                              {event.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-8 py-4 border-2 border-dashed border-medical-light/50 rounded-3xl text-medical-mid font-bold hover:bg-medical-bg/20 transition-all">
                      加载更多派遣记录
                    </button>
                  </div>
                </>
              )}

              {activeTab === "training" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "AED 自动体外除颤器使用", date: "2026-04-10", duration: "2h", level: "基础" },
                    { title: "心肺复苏 (CPR) 进阶培训", date: "2026-04-12", duration: "4h", level: "专业" },
                    { title: "止血与包扎急救技巧", date: "2026-04-15", duration: "1.5h", level: "基础" },
                    { title: "灾难紧急逃生与救援自护", date: "2026-04-20", duration: "3h", level: "进阶" },
                  ].map((course, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 shadow-xl border border-medical-light/20 hover:scale-[1.02] transition-transform cursor-pointer">
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-medical-bg p-3 rounded-2xl text-medical-purple">
                          <BookOpen size={24} />
                        </div>
                        <span className="px-3 py-1 bg-medical-purple/10 text-medical-purple rounded-full text-[10px] font-black uppercase">
                          {course.level}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-medical-dark mb-4 leading-tight">{course.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-medical-mid font-medium">
                        <div className="flex items-center gap-1"><Clock size={12} /> {course.duration}</div>
                        <div className="flex items-center gap-1"><Clock size={12} /> {course.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(activeTab === "equipment" || activeTab === "exchange" || activeTab === "share") && (
                <div className="bg-white rounded-[40px] p-12 shadow-xl border border-medical-light/20 text-center">
                  <div className="w-20 h-20 bg-medical-bg rounded-full flex items-center justify-center text-medical-mid mx-auto mb-6">
                    <Activity size={40} className="animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <h3 className="text-xl font-bold text-medical-dark mb-2">正在同步最新数据...</h3>
                  <p className="text-medical-mid text-sm font-light">正在连接急救中心数据库以获取实时信息</p>
                </div>
              )}
            </Motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
