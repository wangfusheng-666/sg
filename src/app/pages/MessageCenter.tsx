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
  LayoutDashboard
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
  { id: "emergency", name: "紧急通知", icon: ShieldAlert, color: "bg-red-500", desc: "专家预约与健康预警", unread: 1, urgent: true },
  { id: "reports", name: "健康中心", icon: Activity, color: "bg-purple-500", desc: "指标走势与风险评估", unread: 1 },
  { id: "system", name: "系统通知", icon: Bell, color: "bg-blue-500", desc: "平台公告与账户安全", unread: 2 },
  { id: "activity", name: "活动中心", icon: Calendar, color: "bg-green-500", desc: "健康讲座与社区互动", unread: 0 },
  { id: "rewards", name: "活动奖励", icon: Award, color: "bg-orange-500", desc: "积分兑换与优惠礼券", unread: 2 },
];

const MOCK_MESSAGES = [
  { id: 101, category: "system", title: "应用功能更新提示", content: "智健小康 V2.4 版本已上线，新增 AI 步态分析功能，帮助您更科学地进行日常行走监测。点击查看更新详情。", time: "10:25", read: false, pinned: true, timestamp: 1712478300000 },
  { id: 102, category: "system", title: "账户安全提醒", content: "您的账户于今日 09:15 在新设备登录。如非本人操作，请立即修改密码并联系客服。", time: "09:15", read: false, timestamp: 1712474100000 },
  { id: 201, category: "emergency", title: "【紧急】心率过载预警", content: "监测到您在 02:15 出现短时间心率异常（128bpm）。建议您立即减少剧烈运动，并预约心内科专家进行详细咨询。", time: "08:30", read: false, urgent: true, timestamp: 1712471400000 },
  { id: 401, category: "rewards", title: "积分到账通知", content: "恭喜您连续 7 天完成运动目标，获得 500 健康积分。当前总积分为：1280。", time: "09:50", read: false, timestamp: 1712476200000 },
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
  <div className="space-y-10 pb-40">
    <div className="flex flex-col gap-2 relative z-10">
      <h1 className={`font-black text-[#422670] tracking-tighter ${isElderlyMode ? 'text-6xl' : 'text-5xl'}`}>消息中心</h1>
      <p className={`font-bold uppercase tracking-[0.4em] text-[#42267099] ${isElderlyMode ? 'text-sm' : 'text-[10px]'}`}>Integrated Messaging Hub</p>
      <div className="w-20 h-1.5 bg-yellow-400 rounded-full mt-4 shadow-lg shadow-yellow-400/20" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_CATEGORIES.map((cat) => (
        <Motion.div
          key={cat.id}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategorySelect(cat.id)}
          className={`bg-white rounded-[45px] p-8 shadow-xl border relative cursor-pointer group transition-all ${cat.urgent ? 'border-red-500/30 ring-4 ring-red-500/5 animate-pulse-slow' : 'border-medical-light/10'}`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className={`${cat.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}><cat.icon size={28} /></div>
            {cat.unread > 0 && <div className={`px-4 py-1.5 rounded-full font-black text-white shadow-lg ${isElderlyMode ? 'text-lg' : 'text-xs'} ${cat.urgent ? 'bg-red-500 animate-bounce' : 'bg-medical-purple'}`}>{cat.unread} 条未读</div>}
          </div>
          <h2 className={`font-black text-medical-dark mb-1 ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>{cat.name}</h2>
          <p className={`text-medical-mid font-medium line-clamp-1 ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>{cat.desc}</p>
        </Motion.div>
      ))}
    </div>
  </div>
);

const CategoryListView = ({ isElderlyMode, category, messages, activeTab, setActiveTab, onBack, onMessageSelect }: any) => (
  <div className="space-y-8 pb-40">
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-medical-dark shadow-lg"><ChevronLeft size={24} /></button>
      <div className="flex-1">
        <h1 className={`font-black text-[#422670] tracking-tighter ${isElderlyMode ? 'text-5xl' : 'text-4xl'}`}>{category?.name}</h1>
        <p className="font-bold text-[#42267080] uppercase tracking-widest text-[11px]">{category?.desc}</p>
      </div>
    </div>
    <div className="space-y-6">
      {messages.map((msg: any) => (
        <Motion.div key={msg.id} onClick={() => onMessageSelect(msg.id)} className="bg-white p-8 rounded-[40px] shadow-xl border cursor-pointer hover:scale-[1.01] transition-all">
          <h3 className="font-black text-medical-dark mb-2 text-xl">{msg.title}</h3>
          <p className="text-medical-mid text-sm line-clamp-2">{msg.content}</p>
        </Motion.div>
      ))}
    </div>
  </div>
);

const MessageDetailView = ({ isElderlyMode, message, category, onBack, onCallExpert }: any) => (
  <div className="space-y-10 pb-40">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-medical-dark shadow-lg"><ChevronLeft size={24} /></button>
      <h2 className="text-[#422670] opacity-50 font-black uppercase tracking-widest text-[10px]">消息详情</h2>
    </div>
    <div className="bg-white rounded-[50px] overflow-hidden shadow-2xl p-12">
      <h1 className="font-black text-medical-dark mb-8 text-3xl">{message?.title}</h1>
      <div className="text-medical-mid leading-relaxed text-lg">{message?.content}</div>
      {category?.id === "emergency" && (
        <button onClick={onCallExpert} className="mt-8 w-full bg-red-500 text-white py-6 rounded-[25px] font-black flex items-center justify-center gap-3">
          <Phone size={24} /> 拨打专家热线
        </button>
      )}
    </div>
  </div>
);

const HealthReportView = ({ isElderlyMode, onBack }: any) => (
  <div className="space-y-10 pb-40">
    <div className="flex items-center gap-4"><button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-medical-dark shadow-lg"><ChevronLeft size={24} /></button></div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="bg-white rounded-[50px] p-10 shadow-2xl h-[450px]">
        <h3 className="text-2xl font-black text-medical-dark mb-8">健康评估雷达</h3>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={HEALTH_CHART_DATA}>
            <PolarGrid stroke="#E2E8F0" /><PolarAngleAxis dataKey="name" /><Radar dataKey="value" stroke="#6B409C" fill="#6B409C" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-[50px] p-10 shadow-2xl h-[450px]">
        <h3 className="text-2xl font-black text-medical-dark mb-8">生理指标趋势</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={HEALTH_TREND_DATA}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Area dataKey="bp" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} /></AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const MessageBottomNav = ({ isElderlyMode, categories, activeCatId, onSelect, latestImportantMsg, view }: any) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-2xl z-[70] transition-all">
    <AnimatePresence>
      {latestImportantMsg && view !== "detail" && (
        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mb-4 bg-[#422670] text-white p-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${latestImportantMsg.urgent ? 'bg-red-500 animate-pulse' : 'bg-medical-purple'}`}>
            {latestImportantMsg.urgent ? <ShieldAlert size={18} /> : <Bell size={18} />}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-50">最新重要</div>
            <div className="text-sm font-bold truncate">{latestImportantMsg.title}</div>
          </div>
          <button onClick={() => onSelect(latestImportantMsg.category)} className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase">处理</button>
        </Motion.div>
      )}
    </AnimatePresence>
    <div className="bg-white/90 backdrop-blur-2xl rounded-[35px] p-3 shadow-2xl border border-white/40 flex items-center justify-between">
      <button onClick={() => onSelect("dashboard")} className={`flex flex-col items-center gap-1 p-3 rounded-[25px] flex-1 ${view === "dashboard" ? 'bg-[#422670] text-white' : 'text-medical-mid'}`}><LayoutDashboard size={20} /><span className="text-[9px] font-black uppercase">概览</span></button>
      <div className="w-px h-8 bg-medical-light/20 mx-2" />
      {categories.map((cat: any) => (
        <button key={cat.id} onClick={() => onSelect(cat.id)} className={`flex flex-col items-center gap-1 p-3 rounded-[25px] flex-1 relative ${activeCatId === cat.id && view !== "dashboard" ? 'bg-[#422670] text-white' : 'text-medical-mid'}`}>
          <cat.icon size={20} />
          <span className="text-[9px] font-black uppercase truncate w-full text-center">{cat.name.substring(0,2)}</span>
          {cat.unread > 0 && <div className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white ${cat.urgent ? 'bg-red-500' : 'bg-medical-purple'}`}>{cat.unread}</div>}
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
    if (id === "dashboard") { setView("dashboard"); setSelectedCatId(null); }
    else { setSelectedCatId(id); setView(id === "reports" ? "report" : "category"); }
  };

  return (
    <div className="min-h-screen bg-[#F2EBF5] relative py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === "dashboard" && <Motion.div key="v-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><DashboardView isElderlyMode={isElderlyMode} onCategorySelect={handleSelect} /></Motion.div>}
          {view === "category" && <Motion.div key="v-cat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><CategoryListView isElderlyMode={isElderlyMode} category={selectedCategory} messages={filteredMessages} onBack={() => setView("dashboard")} onMessageSelect={(id: any) => { setSelectedMsgId(id); setView("detail"); }} /></Motion.div>}
          {view === "detail" && <Motion.div key="v-det" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageDetailView isElderlyMode={isElderlyMode} message={selectedMessage} category={selectedCategory} onBack={() => setView("category")} onCallExpert={() => alert("呼叫中...")} /></Motion.div>}
          {view === "report" && <Motion.div key="v-rep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><HealthReportView isElderlyMode={isElderlyMode} onBack={() => setView("dashboard")} /></Motion.div>}
        </AnimatePresence>
      </div>
      <MessageBottomNav isElderlyMode={isElderlyMode} categories={MOCK_CATEGORIES} activeCatId={selectedCatId} onSelect={handleSelect} latestImportantMsg={latestImportantMsg} view={view} />
    </div>
  );
}
