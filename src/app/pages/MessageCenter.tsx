import React, { useState, useMemo } from "react";
import { 
  Bell, 
  MessageSquare, 
  ShieldAlert, 
  Activity, 
  Calendar, 
  Search,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Heart,
  Star,
  Phone,
  Video,
  FileText,
  TrendingUp,
  Award,
  Gift,
  AlertCircle,
  Download,
  Share2,
  Trash2,
  Pin,
  Bookmark,
  Radar as RadarIcon,
  LayoutDashboard,
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { 
  ResponsiveContainer, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell
} from "recharts";
import { useHealthMode } from "../context/HealthModeContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// --- Types ---
type ViewType = "dashboard" | "category" | "detail" | "report";

// --- Mock Data ---

const MOCK_CATEGORIES = [
  { id: "emergency", name: "紧急响应", icon: ShieldAlert, color: "bg-red-500", desc: "专家预约与健康预警", unread: 1, urgent: true },
  { id: "reports", name: "健康档案", icon: Activity, color: "bg-purple-500", desc: "指标走势与风险评估", unread: 1 },
  { id: "system", name: "官方消息", icon: Bell, color: "bg-blue-500", desc: "平台公告与账户安全", unread: 2 },
  { id: "activity", name: "社区邻里", icon: Calendar, color: "bg-green-500", desc: "健康讲座与社区互动", unread: 0 },
  { id: "rewards", name: "积分商城", icon: Award, color: "bg-orange-500", desc: "积分兑换与优惠礼券", unread: 2 },
];

const MOCK_MESSAGES = [
  { id: 101, category: "system", title: "智健小康 V2.4 版本已上线", content: "智健小康 V2.4 版本已上线，新增 AI 步态分析功能，帮助您更科学地进行日常行走监测。点击查看更新详情。", time: "10:25", read: false, pinned: true, timestamp: 1712478300000 },
  { id: 102, category: "system", title: "账户登录安全提醒", content: "您的账户于今日 09:15 在新设备登录。如非本人操作，请立即修改密码并联系客服。", time: "09:15", read: false, timestamp: 1712474100000 },
  { id: 201, category: "emergency", title: "【紧急】心率过速预警 (128bpm)", content: "智能穿戴设备监测到您的心率在 02:15 出现异常升高。建议您立即坐下休息，并深呼吸。如果您感到胸闷，请立即预约专家问诊。", time: "08:30", read: false, urgent: true, timestamp: 1712471400000 },
  { id: 401, category: "rewards", title: "新积分到账通知：+500", content: "恭喜您连续 7 天完成“晨起健步”任务，获得 500 健康积分。当前总积分为：1280。", time: "09:50", read: false, timestamp: 1712476200000 },
  { id: 501, category: "reports", title: "3 月份个人健康报告已生成", content: "报告显示您的心血管机能稳中有升，但睡眠质量略有波动。点击查看多维数据分析与专家建议。", time: "昨天", read: false, type: "report_summary", timestamp: 1712390400000 },
];

const HEALTH_CHART_DATA = [
  { name: '心血管', value: 85 }, { name: '睡眠', value: 65 }, { name: '运动', value: 78 }, { name: '饮食', value: 92 }, { name: '心理', value: 70 }
];

const HEALTH_TREND_DATA = [
  { date: '3-01', bp: 120, heart: 72 }, { date: '3-07', bp: 125, heart: 75 }, { date: '3-14', bp: 118, heart: 70 }, { date: '3-21', bp: 122, heart: 73 }, { date: '3-28', bp: 115, heart: 68 }
];

const RISK_BAR_DATA = [
  { name: '高血压', level: 20 }, { name: '糖尿病', level: 15 }, { name: '冠心病', level: 35 }, { name: '肥胖', level: 10 }
];

// --- Sub-Components ---

const DashboardView = ({ isElderlyMode, onCategorySelect }: { isElderlyMode: boolean, onCategorySelect: (id: string) => void }) => (
  <div className="space-y-12 pb-48">
    <div className="flex flex-col gap-2 relative z-10">
      <h1 className={`font-black text-[#422670] tracking-tighter transition-all ${isElderlyMode ? 'text-7xl' : 'text-5xl'}`}>
        {isElderlyMode ? "消息中心：帮您记着呢" : "信息枢纽中心"}
      </h1>
      <p className={`font-bold uppercase tracking-[0.4em] text-[#42267099] transition-all ${isElderlyMode ? 'text-lg' : 'text-[10px]'}`}>
        Integrated Messaging Hub
      </p>
      <div className="w-24 h-2 bg-yellow-400 rounded-full mt-6 shadow-xl shadow-yellow-400/20" />
    </div>

    {/* Quick Advice Bar */}
    <div className="bg-[#422670] rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-700" />
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md">
          <Sparkles size={40} className="text-yellow-400 animate-pulse" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className={`font-black mb-2 transition-all ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>
            {isElderlyMode ? "王爷爷，今天也要开开心心哦" : "智能健康摘要"}
          </h3>
          <p className={`opacity-80 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
            {isElderlyMode ? "您今天的心跳很稳，已经连续5天完成运动任务啦！保持住！" : "基于您的最新数据：心肺机能提升 2.3%，建议午后进行 15 分钟冥想。"}
          </p>
        </div>
        <button className={`bg-white text-[#422670] font-black rounded-2xl shadow-xl hover:scale-105 transition-all ${isElderlyMode ? 'px-12 py-5 text-xl' : 'px-8 py-3 text-sm'}`}>
          {isElderlyMode ? "看看详细" : "查看详情"}
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {MOCK_CATEGORIES.map((cat) => (
        <Motion.div
          key={cat.id}
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategorySelect(cat.id)}
          className={`bg-white rounded-[50px] p-10 shadow-xl border-2 relative cursor-pointer group transition-all ${cat.urgent ? 'border-red-500/20 ring-8 ring-red-500/5 animate-pulse-slow' : 'border-medical-light/5 hover:border-medical-purple/20'}`}
        >
          <div className="flex justify-between items-start mb-8">
            <div className={`${cat.color} text-white w-16 h-16 rounded-[24px] flex items-center justify-center shadow-2xl shadow-medical-purple/10 transition-transform group-hover:rotate-12`}>
              <cat.icon size={32} />
            </div>
            {cat.unread > 0 && (
              <div className={`px-5 py-2 rounded-full font-black text-white shadow-lg transition-all ${isElderlyMode ? 'text-xl' : 'text-xs'} ${cat.urgent ? 'bg-red-500' : 'bg-[#422670]'}`}>
                {cat.unread} {isElderlyMode ? "个新消息" : "条未读"}
              </div>
            )}
          </div>
          <div>
            <h2 className={`font-black text-medical-dark mb-2 transition-all ${isElderlyMode ? 'text-4xl' : 'text-2xl'}`}>{cat.name}</h2>
            <p className={`text-medical-mid font-medium line-clamp-2 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>{cat.desc}</p>
          </div>
          <div className="mt-8 flex items-center gap-3 text-medical-purple font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
            {isElderlyMode ? "点这里看全部" : "立即进入列表"} <ArrowRight size={18} />
          </div>
        </Motion.div>
      ))}
    </div>
  </div>
);

const CategoryListView = ({ isElderlyMode, category, messages, onBack, onMessageSelect }: any) => (
  <div className="space-y-10 pb-48">
    <div className="flex items-center gap-6 mb-12">
      <button onClick={onBack} className="w-16 h-16 rounded-[24px] bg-white flex items-center justify-center text-[#422670] shadow-xl hover:scale-110 transition-all">
        <ChevronLeft size={32} />
      </button>
      <div className="flex-1">
        <h1 className={`font-black text-[#422670] tracking-tighter transition-all ${isElderlyMode ? 'text-6xl' : 'text-5xl'}`}>{category?.name}</h1>
        <p className="font-bold text-[#42267080] uppercase tracking-[0.3em] text-[11px] mt-1">{category?.desc}</p>
      </div>
    </div>
    
    <div className="space-y-6">
      {messages.map((msg: any) => (
        <Motion.div 
          key={msg.id} 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onMessageSelect(msg.id)} 
          className="bg-white p-10 rounded-[50px] shadow-xl border border-medical-light/5 cursor-pointer hover:border-medical-purple/20 hover:scale-[1.01] transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className={`font-black text-medical-dark group-hover:text-medical-purple transition-colors ${isElderlyMode ? 'text-3xl' : 'text-2xl'}`}>{msg.title}</h3>
            <span className="text-xs font-bold text-medical-mid/60">{msg.time}</span>
          </div>
          <p className={`text-medical-mid leading-relaxed line-clamp-2 ${isElderlyMode ? 'text-xl font-medium' : 'text-base font-light'}`}>{msg.content}</p>
          <div className="mt-8 pt-6 border-t border-medical-light/10 flex items-center justify-between">
            {!msg.read ? (
              <span className="flex items-center gap-2 text-[#422670] font-black text-[10px] uppercase tracking-widest">
                <div className="w-2 h-2 bg-[#422670] rounded-full animate-pulse" /> 未读新消息
              </span>
            ) : (
              <span className="flex items-center gap-2 text-medical-mid/40 font-bold text-[10px] uppercase tracking-widest">
                <CheckCircle2 size={12} /> 已阅
              </span>
            )}
            <div className="text-medical-purple opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={20} /></div>
          </div>
        </Motion.div>
      ))}
      {messages.length === 0 && (
        <div className="py-40 text-center">
          <Bell size={64} className="mx-auto text-medical-light/30 mb-8" />
          <p className="text-[#422670] font-black opacity-30 text-2xl">暂无此类消息</p>
        </div>
      )}
    </div>
  </div>
);

const MessageDetailView = ({ isElderlyMode, message, category, onBack, onCallExpert }: any) => (
  <div className="space-y-12 pb-48">
    <div className="flex items-center gap-6">
      <button onClick={onBack} className="w-16 h-16 rounded-[24px] bg-white flex items-center justify-center text-[#422670] shadow-xl hover:scale-110 transition-all">
        <ChevronLeft size={32} />
      </button>
      <h2 className="text-[#42267060] font-black uppercase tracking-[0.4em] text-xs">Message Detail</h2>
    </div>
    <Motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[60px] overflow-hidden shadow-2xl border border-medical-light/10"
    >
      <div className={`${category?.color || 'bg-[#422670]'} h-32 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center px-12 justify-between text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              {category && <category.icon size={28} />}
            </div>
            <span className="font-black tracking-[0.2em] uppercase text-xs">{category?.name}</span>
          </div>
          <span className="text-sm font-bold opacity-60 italic">{message?.time} 发送</span>
        </div>
      </div>
      <div className="p-16">
        <h1 className={`font-black text-medical-dark mb-10 leading-tight tracking-tighter ${isElderlyMode ? 'text-6xl' : 'text-4xl'}`}>
          {message?.title}
        </h1>
        <div className={`text-medical-mid leading-relaxed mb-16 border-b border-medical-light/10 pb-16 transition-all ${isElderlyMode ? 'text-3xl font-medium' : 'text-2xl font-light'}`}>
          {message?.content}
        </div>
        
        {category?.id === "emergency" && (
          <div className="bg-red-50 rounded-[45px] p-10 border-2 border-red-100 mb-12 flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 rounded-full overflow-hidden border-8 border-white shadow-2xl shrink-0">
               <ImageWithFallback src="https://images.unsplash.com/photo-1612349317150-e413f6a5b1f8?w=200" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h4 className="font-black text-medical-dark text-2xl mb-1">张德胜 教授</h4>
               <p className="text-medical-mid text-sm font-bold mb-6">心内科主任医师 · 在线待命</p>
               <button onClick={onCallExpert} className="bg-red-500 text-white px-12 py-5 rounded-[25px] font-black shadow-xl hover:scale-105 transition-all flex items-center gap-4 mx-auto md:mx-0">
                 <Phone size={24} fill="currentColor" /> {isElderlyMode ? "点这里找张医生" : "拨打专家咨询热线"}
               </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-6">
          <button className="flex-1 min-w-[280px] bg-[#422670] text-white py-8 rounded-[35px] font-black text-2xl shadow-2xl shadow-medical-purple/30 hover:bg-medical-purple transition-all flex items-center justify-center gap-4">
            {isElderlyMode ? "我知道了" : "立即办理"} <ChevronRight size={28} />
          </button>
          <button className="px-12 bg-medical-bg text-medical-dark py-8 rounded-[35px] font-black text-2xl border border-medical-light/10 hover:bg-medical-light/30 transition-all flex items-center gap-4">
            <Share2 size={24} /> {isElderlyMode ? "发给孩子们" : "转发"}
          </button>
        </div>
      </div>
    </Motion.div>
  </div>
);

const HealthReportView = ({ isElderlyMode, onBack }: any) => (
  <div className="space-y-12 pb-48">
    <div className="flex items-center gap-6 mb-12">
      <button onClick={onBack} className="w-16 h-16 rounded-[24px] bg-white flex items-center justify-center text-[#422670] shadow-xl hover:scale-110 transition-all">
        <ChevronLeft size={32} />
      </button>
      <h1 className={`font-black text-[#422670] tracking-tighter ${isElderlyMode ? 'text-6xl' : 'text-5xl'}`}>健康数据分析</h1>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white rounded-[60px] p-12 shadow-2xl border border-medical-light/10 min-h-[500px]">
        <h3 className="text-3xl font-black text-medical-dark mb-12 flex items-center gap-3">
          <RadarIcon className="text-medical-purple" /> {isElderlyMode ? "身体哪儿最棒" : "多维评估雷达"}
        </h3>
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={HEALTH_CHART_DATA}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#422670', fontWeight: 'bold' }} />
              <Radar dataKey="value" stroke="#6B409C" fill="#6B409C" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-[60px] p-12 shadow-2xl border border-medical-light/10 min-h-[500px]">
        <h3 className="text-3xl font-black text-medical-dark mb-12 flex items-center gap-3">
          <TrendingUp className="text-blue-500" /> {isElderlyMode ? "最近几天的变化" : "指标走势分析"}
        </h3>
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HEALTH_TREND_DATA}>
              <defs>
                <linearGradient id="colorBP_center" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9371B4', fontWeight: 'bold' }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '25px', border: 'none', shadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="bp" stroke="#3B82F6" strokeWidth={5} fillOpacity={1} fill="url(#colorBP_center)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const MessageBottomNav = ({ isElderlyMode, categories, activeCatId, onSelect, latestImportantMsg, view }: any) => (
  <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-60px)] max-w-2xl z-[70] transition-all">
    <AnimatePresence>
      {latestImportantMsg && view !== "detail" && (
        <Motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, y: 10, scale: 0.9 }} 
          className="mb-6 bg-[#422670] text-white p-6 rounded-[35px] shadow-[0_20px_50px_rgba(66,38,112,0.4)] flex items-center gap-6 border border-white/10 backdrop-blur-2xl"
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${latestImportantMsg.urgent ? 'bg-red-500 animate-pulse' : 'bg-medical-purple'}`}>
            {latestImportantMsg.urgent ? <ShieldAlert size={28} /> : <Bell size={28} />}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 mb-1">Top Priority</div>
            <div className="text-lg font-black truncate">{latestImportantMsg.title}</div>
          </div>
          <button 
            onClick={() => onSelect(latestImportantMsg.category)} 
            className="px-8 py-3 bg-white text-[#422670] rounded-2xl text-xs font-black uppercase hover:bg-yellow-400 transition-all shadow-xl"
          >
            {isElderlyMode ? "点我处理" : "立即处理"}
          </button>
        </Motion.div>
      )}
    </AnimatePresence>
    
    <div className="bg-white/95 backdrop-blur-3xl rounded-[40px] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white flex items-center justify-between">
      <button 
        onClick={() => onSelect("dashboard")} 
        className={`flex flex-col items-center gap-1.5 p-4 rounded-[30px] transition-all flex-1 ${view === "dashboard" ? 'bg-[#422670] text-white shadow-2xl' : 'text-medical-mid hover:text-[#422670]'}`}
      >
        <LayoutDashboard size={24} />
        <span className="text-[10px] font-black uppercase tracking-widest">{isElderlyMode ? "首页" : "概览"}</span>
      </button>
      
      <div className="w-px h-10 bg-medical-light/20 mx-3" />
      
      {categories.map((cat: any) => (
        <button 
          key={cat.id} 
          onClick={() => onSelect(cat.id)} 
          className={`flex flex-col items-center gap-1.5 p-4 rounded-[30px] transition-all flex-1 relative ${activeCatId === cat.id && view !== "dashboard" ? 'bg-[#422670] text-white shadow-2xl' : 'text-medical-mid hover:text-[#422670]'}`}
        >
          <cat.icon size={24} />
          <span className="text-[10px] font-black uppercase tracking-widest truncate w-full text-center">
            {isElderlyMode ? cat.name.substring(0,2) : cat.name.substring(0,2)}
          </span>
          {cat.unread > 0 && (
            <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-xl ${cat.urgent ? 'bg-red-500' : 'bg-medical-purple'}`}>
              {cat.unread}
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

export function MessageCenter() {
  const { isElderlyMode } = useHealthMode();
  const [view, setView] = useState<ViewType>("dashboard");
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [selectedMsgId, setSelectedMsgId] = useState<number | null>(null);

  const selectedCategory = useMemo(() => MOCK_CATEGORIES.find(c => c.id === selectedCatId), [selectedCatId]);
  const selectedMessage = useMemo(() => MOCK_MESSAGES.find(m => m.id === selectedMsgId), [selectedMsgId]);
  const filteredMessages = useMemo(() => MOCK_MESSAGES.filter(m => m.category === selectedCatId), [selectedCatId]);
  const latestImportantMsg = useMemo(() => MOCK_MESSAGES.find(m => m.urgent && !m.read) || MOCK_MESSAGES[0], []);

  const handleSelect = (id: string | "dashboard") => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id === "dashboard") { setView("dashboard"); setSelectedCatId(null); }
    else { setSelectedCatId(id); setView(id === "reports" ? "report" : "category"); }
  };

  return (
    <div className={`min-h-screen bg-[#F2EBF5] relative py-20 px-4 md:px-12 transition-all duration-500`}>
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 to-transparent -z-10" />
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {view === "dashboard" && <Motion.div key="v-dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}><DashboardView isElderlyMode={isElderlyMode} onCategorySelect={handleSelect} /></Motion.div>}
          {view === "category" && <Motion.div key="v-cat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><CategoryListView isElderlyMode={isElderlyMode} category={selectedCategory} messages={filteredMessages} onBack={() => setView("dashboard")} onMessageSelect={(id: any) => { setSelectedMsgId(id); setView("detail"); }} /></Motion.div>}
          {view === "detail" && <Motion.div key="v-det" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}><MessageDetailView isElderlyMode={isElderlyMode} message={selectedMessage} category={selectedCategory} onBack={() => setView("category")} onCallExpert={() => alert("正在连接紧急专家热线，请保持通话...")} /></Motion.div>}
          {view === "report" && <Motion.div key="v-rep" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}><HealthReportView isElderlyMode={isElderlyMode} onBack={() => setView("dashboard")} /></Motion.div>}
        </AnimatePresence>
      </div>
      <MessageBottomNav isElderlyMode={isElderlyMode} categories={MOCK_CATEGORIES} activeCatId={selectedCatId} onSelect={handleSelect} latestImportantMsg={latestImportantMsg} view={view} />
    </div>
  );
}
