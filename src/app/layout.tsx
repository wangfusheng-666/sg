import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { 
  Home, 
  BookOpen, 
  ShieldCheck, 
  Activity, 
  Monitor, 
  MessageSquare, 
  User, 
  Search, 
  PhoneCall, 
  LayoutGrid,
  ChevronDown,
  Baby,
  Bell,
  BarChart3,
  FileText
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { toast, Toaster } from "sonner";
import { useHealthMode } from "./context/HealthModeContext";

import { VoiceAssistant } from "./components/VoiceAssistant";
import { MegaMenu } from "./components/MegaMenu";

export function RootLayout() {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { isElderlyMode, toggleElderlyMode } = useHealthMode();
  const location = useLocation();

  const navItems = [
    { 
      name: isElderlyMode ? "首页" : "首页", 
      path: "/", 
      icon: Home 
    },
    { 
      name: isElderlyMode ? "听健康" : "健康课堂", 
      path: "/health-class", 
      icon: BookOpen,
      children: [
        { 
          name: "知识库", 
          items: [
            { name: "慢病管理", path: "/health-class/慢病管理" },
            { name: "急救常识", path: "/health-class/急救知识" },
            { name: "营养膳食", path: "/health-class/营养膳食" },
            { name: "心理健康", path: "/health-class/心理健康" }
          ] 
        },
        { 
          name: "学习中心", 
          items: [
            { name: "热门视频", path: "/health-class" },
            { name: "康复教程", path: "/health-class/慢病管理/3" },
            { name: "专家讲堂", path: "/health-class/急救知识/4" }
          ] 
        }
      ]
    },
    { 
      name: isElderlyMode ? "养健康" : "AI康养", 
      path: "/ai-health", 
      icon: Activity,
      children: [
        { 
          name: "智能管理", 
          items: [
            { name: "健康概览", path: "/ai-health" },
            { name: "运动建议", path: "/ai-health/exercise" },
            { name: "膳食计划", path: "/ai-health/diet" }
          ] 
        },
        { 
          name: "专项服务", 
          items: [
            { name: "心率分析", path: "/ai-health" },
            { name: "睡眠质量", path: "/ai-health" },
            { name: "智能提醒", path: "/ai-health" }
          ] 
        }
      ]
    },
    { 
      name: isElderlyMode ? "急救中心" : "紧急救援", 
      path: "/emergency", 
      icon: PhoneCall,
      children: [
        { 
          name: "实操模拟", 
          items: [
            { name: "模拟器列表", path: "/emergency/simulations" },
            { name: "CPR 练习", path: "/emergency/simulations/cpr" },
            { name: "海姆立克", path: "/emergency/simulations/heimlich" }
          ] 
        },
        { 
          name: "救援状态", 
          items: [
            { name: "实时派遣", path: "/emergency" },
            { name: "AED 地图", path: "/emergency" },
            { name: "志愿申请", path: "/emergency" }
          ] 
        }
      ]
    },
    { 
      name: isElderlyMode ? "看守护" : "安全守护", 
      path: "/ai-protection", 
      icon: BarChart3,
      children: [
        { 
          name: "实时监控", 
          items: [
            { name: "守护看板", path: "/ai-protection/monitor" },
            { name: "位置动态", path: "/ai-protection/monitor" },
            { name: "跌倒报告", path: "/ai-protection/monitor" }
          ] 
        },
        { 
          name: "守护配置", 
          items: [
            { name: "联系人设置", path: "/ai-protection/settings" },
            { name: "预警开关", path: "/ai-protection/settings" },
            { name: "设备连接", path: "/ai-protection/settings" }
          ] 
        }
      ]
    },
    { 
      name: isElderlyMode ? "视诊疗" : "视觉诊疗", 
      path: "/ai-visual", 
      icon: FileText,
      children: [
        { 
          name: "识别诊断", 
          items: [
            { name: "舌苔健康", path: "/ai-visual/reports/v01" },
            { name: "面部气色", path: "/ai-visual/reports/v03" },
            { name: "步态分析报告", path: "/ai-visual/reports/v02" }
          ] 
        },
        { 
          name: "报告档案", 
          items: [
            { name: "报告列表", path: "/ai-visual/reports" },
            { name: "历史对比", path: "/ai-visual/reports" },
            { name: "家属同步", path: "/ai-visual/reports" }
          ] 
        }
      ]
    },
    { name: "消息中心", path: "/messages", icon: Bell },
    { name: "个人中心", path: "/profile", icon: User },
  ];

  const toggleEmergency = () => {
    setIsEmergencyMode(!isEmergencyMode);
    if (!isEmergencyMode) {
      toast.error("急救模式已开启！正在连接最近的急救中心...", {
        duration: 5000,
        position: "top-center",
      });
    } else {
      toast.success("已退出急救模式");
    }
  };

  return (
    <div className={`min-h-screen bg-medical-bg flex flex-col font-sans transition-all duration-500 ${isElderlyMode ? 'text-lg' : ''} ${isEmergencyMode ? 'ring-8 ring-emergency inset-0 overflow-hidden' : ''}`}>
      <Toaster position="top-center" richColors />
      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white border-b border-medical-light/10 shadow-sm transition-all duration-500 ${isElderlyMode ? 'h-24' : 'h-16'}`}>
        <div className="max-w-[1440px] mx-auto px-4 h-full flex items-center gap-4 lg:gap-8">
          {/* Logo & Badge */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className={`bg-medical-dark rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-all ${isElderlyMode ? 'w-12 h-12' : 'w-9 h-9'}`}>
              <Activity size={isElderlyMode ? 28 : 22} />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2">
              <span className={`font-black text-medical-dark tracking-tighter transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>智健小康</span>
              {!isElderlyMode && (
                <span className="px-2 py-0.5 bg-[#F5F1FA] text-medical-purple text-[10px] font-bold rounded-full border border-medical-purple/10 whitespace-nowrap">AI CARE HUB</span>
              )}
            </div>
          </Link>

          {/* Search Bar - Mimicking image */}
          <div className="flex-1 max-w-sm hidden lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-medical-purple/50" size={isElderlyMode ? 22 : 18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isElderlyMode ? "搜搜看..." : "搜索疾病、症状或健康知识..."}
                className={`w-full pl-12 pr-4 bg-[#F5F1FA] border-none rounded-full focus:outline-none focus:ring-2 focus:ring-medical-purple/20 transition-all ${isElderlyMode ? 'py-4 text-xl' : 'py-2.5 text-xs'}`}
              />
            </div>
          </div>

          {/* Navigation - Horizontal Icon + Text */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              if (isElderlyMode && (item.path === "/messages" || item.path === "/profile")) return null;
              
              const isActive = location.pathname === item.path;
              return (
                <div 
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setHoveredNav(item.path)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all group relative ${
                      isActive 
                        ? 'bg-[#F5F1FA] text-medical-purple shadow-sm' 
                        : 'text-medical-mid hover:text-medical-purple hover:bg-[#F5F1FA]/50'
                    }`}
                  >
                    <item.icon size={isElderlyMode ? 24 : 18} className={`transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`} />
                    <span className={`font-bold transition-all ${isElderlyMode ? 'text-lg' : 'text-[13px]'} whitespace-nowrap`}>
                      {item.name}
                    </span>
                    {item.children && !isElderlyMode && (
                      <ChevronDown size={12} className={`transition-transform duration-300 ${hoveredNav === item.path ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {item.children && !isElderlyMode && (
                    <MegaMenu 
                      isOpen={hoveredNav === item.path} 
                      children={item.children} 
                      isElderlyMode={isElderlyMode}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <button 
              onClick={toggleElderlyMode}
              className={`flex items-center justify-center border-2 border-medical-purple rounded-full font-black transition-all hover:bg-medical-purple hover:text-white group whitespace-nowrap ${
                isElderlyMode 
                  ? 'bg-medical-purple text-white px-8 py-3 text-xl' 
                  : 'bg-white text-medical-purple px-5 py-2 text-[13px]'
              }`}
            >
              {isElderlyMode ? (
                <div className="flex items-center gap-2">
                  <Baby size={22} className="animate-bounce" />
                  <span>退出长辈模式</span>
                </div>
              ) : (
                "长辈模式"
              )}
            </button>
            
            <div className={`rounded-full flex items-center justify-center text-medical-purple bg-[#F5F1FA] border border-medical-purple/10 transition-all ${isElderlyMode ? 'w-14 h-14' : 'w-10 h-10'}`}>
              <User size={isElderlyMode ? 28 : 22} />
            </div>
          </div>
        </div>
      </header>

      {/* Floating Emergency Button (Always present, styled for quick access) */}
      <AnimatePresence>
        {!isEmergencyMode && (
          <Motion.button
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            onClick={toggleEmergency}
            className={`fixed bottom-8 right-8 z-[60] bg-emergency text-white rounded-full shadow-2xl flex flex-col items-center justify-center gap-1 hover:scale-110 active:scale-95 transition-transform ${isElderlyMode ? 'w-24 h-24' : 'w-20 h-20'}`}
          >
            <PhoneCall size={isElderlyMode ? 40 : 32} className="animate-pulse" />
            <span className={`font-black uppercase ${isElderlyMode ? 'text-sm' : 'text-[10px]'}`}>SOS 急救</span>
          </Motion.button>
        )}
      </AnimatePresence>

      {/* Emergency Overlay */}
      <AnimatePresence>
        {isEmergencyMode && (
          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-emergency/90 backdrop-blur-xl flex items-center justify-center p-6 text-white text-center"
          >
            <div className="max-w-2xl w-full">
              <Motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-emergency mx-auto mb-8 shadow-2xl"
              >
                <PhoneCall size={64} />
              </Motion.div>
              <h1 className="text-5xl font-black mb-4 tracking-tighter">紧急救援已启动</h1>
              <p className="text-xl opacity-90 mb-12 leading-relaxed">
                您的位置信息已发送至最近的急救中心。医生正在通过语音与您建立连接，请保持通话畅通并寻找安全空旷处。
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-md">
                  <div className="text-sm opacity-80 mb-1">当前位置</div>
                  <div className="font-bold text-lg leading-tight">北京市朝阳区建国路 88 号 社区医疗站附近</div>
                </div>
                <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-md">
                  <div className="text-sm opacity-80 mb-1">预计到达</div>
                  <div className="font-bold text-3xl tabular-nums">04:25</div>
                </div>
              </div>

              <button 
                onClick={toggleEmergency}
                className="px-12 py-5 bg-white text-emergency rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl active:scale-95"
              >
                取消救援
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative">
        <Outlet />
      </main>

      {/* Voice Assistant (Elderly Mode Only) */}
      <VoiceAssistant />

      {/* Footer */}
      <footer className="bg-medical-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-medical-dark">
                <Activity size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">智健小康</span>
            </div>
            <p className="text-medical-light/80 text-sm leading-relaxed mb-8">
              致力于利用人工智能深度赋能社区健康管理体系。通过数据驱动的精准预防与响应式急救，守���每一个家庭的幸福与健康。
            </p>
            <div className="flex gap-4">
              {['Wx', 'Wb', 'Zh'].map(icon => (
                <div key={icon} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-white hover:text-medical-dark transition-colors cursor-pointer">
                  {icon}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">平台服务</h4>
            <ul className="space-y-4 text-medical-light/60 text-sm">
              <li><Link to="/health-class" className="hover:text-white transition-colors">健康课堂</Link></li>
              <li><Link to="/ai-health" className="hover:text-white transition-colors">AI 智能管理</Link></li>
              <li><Link to="/data-visual" className="hover:text-white transition-colors">数据可视化</Link></li>
              <li><Link to="/ai-visual" className="hover:text-white transition-colors">AI 智能文件</Link></li>
              <li><Link to="/emergency" className="hover:text-white transition-colors">紧急急救中心</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">关于我们</h4>
            <ul className="space-y-4 text-medical-light/60 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">平台愿景</Link></li>
              <li><Link to="/cooperation" className="hover:text-white transition-colors">社区合作</Link></li>
              <li><Link to="/experts" className="hover:text-white transition-colors">专家团队</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">隐私保障</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">联系支持</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <PhoneCall size={20} className="text-medical-light/40 shrink-0" />
                <div className="text-sm">
                  <p className="text-medical-light/40 mb-1">24小时服务热线</p>
                  <p className="font-bold text-lg">400-888-999</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare size={20} className="text-medical-light/40 shrink-0" />
                <div className="text-sm">
                  <p className="text-medical-light/40 mb-1">官方邮箱</p>
                  <p className="font-medium">service@zhjkx.com</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-medical-light/40">
                智健科创园区 A区 13层
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-medical-light/30">
          <p>© 2026 智健小康. 保留所有权利. 京ICP备2026000000号-1</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">服务协议</span>
            <span className="cursor-pointer hover:text-white">隐私政策</span>
            <span className="cursor-pointer hover:text-white">Cookie设置</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
