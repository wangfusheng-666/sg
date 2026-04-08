import React from "react";
import { Link } from "react-router";
import { motion as Motion } from "motion/react";
import { 
  ArrowLeft, 
  Shield, 
  MapPin, 
  Battery, 
  Activity, 
  AlertCircle,
  Bell,
  Settings,
  ChevronRight,
  User,
  Heart
} from "lucide-react";
import { useHealthMode } from "../context/HealthModeContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ProtectionMonitor() {
  const { isElderlyMode } = useHealthMode();

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      <div className="bg-white border-b border-medical-light/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
          <Link to="/ai-protection" className={`flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-all ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}>
            <ArrowLeft size={isElderlyMode ? 28 : 20} /> 返回智能守护
          </Link>
          <div className="flex gap-4">
             <Link to="/ai-protection/settings" className="px-6 py-3 bg-medical-bg text-medical-purple rounded-xl font-black text-sm flex items-center gap-2">
                <Settings size={18} /> 设置联系人
             </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Status Grid */}
          <div className="lg:col-span-2 space-y-10">
            {/* Real-time Map / Location Card */}
            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10 relative overflow-hidden group">
               <div className="absolute inset-0 z-0 opacity-20">
                  <ImageWithFallback src="https://images.unsplash.com/photo-1630443319593-261711fc8a7a?w=1200" className="w-full h-full object-cover grayscale" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                     <h2 className="text-2xl font-black text-medical-dark flex items-center gap-3">
                        <MapPin size={24} className="text-medical-purple" />
                        当前位置状态
                     </h2>
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-green-600">实时追踪中</span>
                     </div>
                  </div>
                  <div className="p-8 rounded-3xl bg-medical-bg/40 backdrop-blur-md border border-white/40 mb-10">
                     <div className="text-4xl font-black text-medical-dark mb-4">朝阳园 12号楼 2单元</div>
                     <div className="text-medical-mid font-medium flex items-center gap-2">
                        <Activity size={16} /> 居家范围内 · 信号良好
                     </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                     <div className="p-6 rounded-2xl bg-white/60 border border-white shadow-sm text-center">
                        <Battery size={20} className="mx-auto mb-3 text-green-500" />
                        <div className="font-black text-medical-dark">82%</div>
                        <div className="text-[10px] text-medical-mid font-bold uppercase">电量剩余</div>
                     </div>
                     <div className="p-6 rounded-2xl bg-white/60 border border-white shadow-sm text-center">
                        <Activity size={20} className="mx-auto mb-3 text-blue-500" />
                        <div className="font-black text-medical-dark">65 bpm</div>
                        <div className="text-[10px] text-medical-mid font-bold uppercase">实时心率</div>
                     </div>
                     <div className="p-6 rounded-2xl bg-white/60 border border-white shadow-sm text-center">
                        <Shield size={20} className="mx-auto mb-3 text-medical-purple" />
                        <div className="font-black text-medical-dark">安全</div>
                        <div className="text-[10px] text-medical-mid font-bold uppercase">跌倒监测</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Alert Logs */}
            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
               <h3 className="text-xl font-black text-medical-dark mb-10 flex items-center justify-between">
                  最近守护动态 (24h)
                  <button className="text-xs text-medical-purple font-bold">查看更多历史</button>
               </h3>
               <div className="space-y-6">
                 {[
                   { type: "出门提醒", time: "10:32 AM", content: "离开居家安全范围，目的地：朝阳公园。", icon: MapPin, color: "bg-blue-500" },
                   { type: "电量提醒", time: "09:15 AM", content: "守护设备电量低于 20%，请及时充电。", icon: AlertCircle, color: "bg-orange-500" },
                   { type: "日常打卡", time: "08:00 AM", content: "早起体征监测：血压 120/80，���率 72，状态正常。", icon: Bell, color: "bg-green-500" },
                 ].map((log, i) => (
                   <div key={i} className="flex gap-6 p-6 rounded-3xl bg-medical-bg/20 border border-transparent hover:border-medical-light/20 transition-all">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 ${log.color} shadow-lg`}>
                         <log.icon size={24} />
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-center mb-2">
                            <span className="font-black text-medical-dark">{log.type}</span>
                            <span className="text-xs text-medical-mid font-medium">{log.time}</span>
                         </div>
                         <p className="text-sm text-medical-mid font-light leading-relaxed">{log.content}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-10">
             <div className="bg-medical-dark rounded-[40px] p-10 text-white shadow-2xl">
                <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                   <User size={24} className="text-medical-purple" />
                   紧急联系人
                </h3>
                <div className="space-y-8">
                   {[
                     { name: "张子豪 (儿子)", phone: "138 **** 5678", relation: "直系亲属" },
                     { name: "李老师 (邻居)", phone: "139 **** 1234", relation: "紧急增援" },
                   ].map((contact, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-black">
                           {contact.name[0]}
                        </div>
                        <div className="flex-1">
                           <div className="font-bold">{contact.name}</div>
                           <div className="text-xs text-white/40">{contact.phone}</div>
                        </div>
                        <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                           <ChevronRight size={18} />
                        </button>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-12 py-4 border-2 border-dashed border-white/20 rounded-2xl text-white/40 font-bold hover:bg-white/10 transition-all">
                   + 添加联系人
                </button>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/10">
                <h3 className="text-lg font-black text-medical-dark mb-6">守护建议</h3>
                <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100 flex gap-4">
                   <AlertCircle className="text-orange-500 shrink-0" size={20} />
                   <p className="text-xs text-orange-700 leading-relaxed font-medium">
                      今天户外紫外线较强，且气温波动大，建议老人家减少户外活动时间，并多补充水分。
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
