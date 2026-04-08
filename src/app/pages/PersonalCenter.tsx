import React from "react";
import { Link } from "react-router";
import { 
  FileText, 
  Shield, 
  CreditCard, 
  Settings, 
  LogOut, 
  MapPin, 
  PhoneCall, 
  ChevronRight, 
  Watch, 
  Share2,
  CheckCircle2,
  Calendar,
  AlertCircle
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { useHealthMode } from "../context/HealthModeContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function PersonalCenter() {
  const { isElderlyMode } = useHealthMode();

  const user = {
    name: "王建国",
    age: "72岁",
    bloodType: "A+ 型",
    level: "黄金会员",
    points: "1280",
    monitorDays: "1280",
    address: "幸福里社区 3 号楼 201 室",
    emergencyContact: "王小明 (儿子)",
    avatar: "https://images.unsplash.com/photo-1527735219999-77fb0815941e?auto=format&fit=crop&q=80&w=400"
  };

  const actionCards = [
    { title: "健康档案库", desc: "查看您的电子病历、体检报告与处方", icon: FileText, color: "bg-blue-100 text-blue-500", delay: 0.1, path: "/ai-visual/reports" },
    { title: "监护人管理", desc: "绑定紧急联系人并管理子女访问权限", icon: Shield, color: "bg-purple-100 text-purple-500", delay: 0.2, path: "/ai-protection/settings" },
    { title: "医保与资产", desc: "查询医保个人账户余额与商业保险详情", icon: CreditCard, color: "bg-green-100 text-green-500", delay: 0.3, path: "/profile" },
    { title: "个性化设置", desc: "调整语音播报、字体大小与隐私偏好", icon: Settings, color: "bg-orange-100 text-orange-500", delay: 0.4, path: "/profile" },
  ];

  const bottomStats = [
    { label: "历史体检 (次)", value: "12" },
    { label: "待办健康项 (个)", value: "4" },
    { label: "紧急联系人 (位)", value: "2" },
  ];

  return (
    <div className={`min-h-screen bg-medical-bg/20 py-12 px-4 md:px-8 transition-all duration-500 ${isElderlyMode ? 'text-xl' : ''}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar: Profile Card */}
        <Motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-[320px] shrink-0"
        >
          <div className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-medical-light/10">
            {/* Top Purple Header */}
            <div className="h-32 bg-medical-purple relative" />
            
            {/* Profile Info Section */}
            <div className="px-8 pb-10 -mt-16 text-center relative z-10">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-medical-bg">
                  <ImageWithFallback src={user.avatar} className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-1 right-1 w-10 h-10 bg-medical-dark text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:scale-110 transition-transform">
                  <Settings size={18} />
                </button>
              </div>

              <h2 className={`font-black text-medical-dark mb-1 tracking-tight ${isElderlyMode ? 'text-4xl' : 'text-3xl'}`}>
                {user.name}
              </h2>
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="px-3 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-black rounded-full uppercase tracking-wider">
                  {user.level}
                </span>
                <span className="text-xs text-medical-mid font-bold">
                  {user.age} · {user.bloodType}
                </span>
              </div>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="bg-medical-bg/50 p-4 rounded-[25px] border border-medical-light/5 text-center">
                  <div className="text-[10px] text-medical-mid font-black uppercase tracking-widest mb-1">健康积分</div>
                  <div className="text-2xl font-black text-medical-dark">{user.points}</div>
                </div>
                <div className="bg-medical-bg/50 p-4 rounded-[25px] border border-medical-light/5 text-center">
                  <div className="text-[10px] text-medical-mid font-black uppercase tracking-widest mb-1">监测天数</div>
                  <div className={`${isElderlyMode ? 'text-4xl' : 'text-2xl'} font-black text-medical-dark transition-all duration-300`}>{user.monitorDays}</div>
                </div>
              </div>

              {/* Contact Info List */}
              <div className="space-y-6 text-left mb-10 pt-6 border-t border-medical-light/10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-medical-bg rounded-2xl flex items-center justify-center text-medical-purple shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-medical-mid font-black uppercase tracking-widest mb-0.5">居住地址</div>
                    <div className="text-xs font-bold text-medical-dark leading-snug">{user.address}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-medical-bg rounded-2xl flex items-center justify-center text-medical-purple shrink-0">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-medical-mid font-black uppercase tracking-widest mb-0.5">紧急联系人</div>
                    <div className="text-xs font-bold text-medical-dark">{user.emergencyContact}</div>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button className="flex items-center justify-center gap-3 w-full py-4 text-red-500 font-black text-sm hover:bg-red-50 transition-all rounded-2xl group">
                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                退出当前登录
              </button>
            </div>
          </div>
        </Motion.aside>

        {/* Right Main Content Area */}
        <main className="flex-1 space-y-12">
          {/* Header Title Section */}
          <Motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1"
          >
            <h1 className={`font-black text-medical-dark tracking-tighter ${isElderlyMode ? 'text-5xl' : 'text-4xl'}`}>
              账号管理与设置
            </h1>
            <p className="text-xs text-medical-mid font-bold uppercase tracking-[0.4em] opacity-40">
              Personal Account & Security Settings
            </p>
          </Motion.div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {actionCards.map((card, i) => (
              <Link key={i} to={card.path || "/profile"} className="block group">
                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.delay }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-10 rounded-[45px] shadow-xl border border-medical-light/10 cursor-pointer hover:shadow-2xl transition-all h-full"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div className={`rounded-[25px] ${card.color} shadow-lg shadow-current/10 p-[20px] mx-[0px] my-[-15px]`}>
                      <card.icon size={28} />
                    </div>
                    <ChevronRight size={20} className="text-medical-mid/30 group-hover:text-medical-purple transition-all group-hover:translate-x-2" />
                  </div>
                  <div>
                    <h3 className={`font-black text-medical-dark ${isElderlyMode ? 'text-3xl' : 'text-xl'} mb-4`}>
                      {card.title}
                    </h3>
                    <p className={`text-medical-mid font-medium leading-relaxed ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                      {card.desc}
                    </p>
                  </div>
                </Motion.div>
              </Link>
            ))}
          </div>

          {/* Wearable Device Banner */}
          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-[50px] p-12 border-2 border-dashed border-medical-light/20 shadow-xl relative overflow-hidden group hover:border-medical-purple/30 transition-all"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-medical-bg rounded-[35px] flex items-center justify-center relative">
                  <Watch size={48} className="text-medical-purple animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white">
                    <CheckCircle2 size={16} fill="white" className="text-green-500" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className={`font-black text-medical-dark mb-2 ${isElderlyMode ? 'text-4xl' : 'text-2xl'}`}>
                    连接您的智能穿戴设备
                  </h3>
                  <p className={`text-medical-mid font-medium leading-relaxed max-w-md ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                    实时同步心率、血氧、血压及睡眠监测数据，构建完整的数字健康画像。
                  </p>
                </div>
              </div>
              <Link to="/ai-protection" className="px-10 py-5 bg-medical-dark text-white rounded-[25px] font-black flex items-center gap-4 hover:bg-medical-purple transition-all shadow-xl shadow-medical-dark/20 group/btn shrink-0">
                立即绑定设备
                <Share2 size={20} className="group-hover/btn:rotate-12 transition-transform" />
              </Link>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-medical-purple/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Motion.div>

          {/* Bottom Summary Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {bottomStats.map((stat, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="bg-white/40 backdrop-blur-sm rounded-[35px] p-8 text-center border border-white/50"
              >
                <div className="text-5xl font-black text-medical-dark tracking-tighter mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] text-medical-mid font-black uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </Motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
