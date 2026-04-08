import React, { useState } from "react";
import { Link } from "react-router";
import { motion as Motion } from "motion/react";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Shield, 
  Bell, 
  MapPin, 
  Plus, 
  Trash2, 
  Settings,
  Activity,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { useHealthMode } from "../context/HealthModeContext";

export function GuardianSettings() {
  const { isElderlyMode } = useHealthMode();
  const [contacts, setContacts] = useState([
    { id: 1, name: "张子豪 (儿子)", phone: "138 0013 5678", relation: "直系亲属", alertOn: true },
    { id: 2, name: "李老师 (邻居)", phone: "139 1234 5678", relation: "紧急增援", alertOn: false },
  ]);

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      <div className="bg-white border-b border-medical-light/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
          <Link to="/ai-protection/monitor" className={`flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-all ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}>
            <ArrowLeft size={isElderlyMode ? 28 : 20} /> 返回守护监控
          </Link>
          <h1 className={`font-black text-medical-dark ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>守护联系人设置</h1>
          <div className="flex gap-4">
             <button className="px-6 py-3 bg-medical-purple text-white rounded-xl font-black text-sm flex items-center gap-2 shadow-lg shadow-medical-purple/20 transition-transform active:scale-95">
                <Plus size={18} /> 新增联系人
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
               <h3 className="text-2xl font-black text-medical-dark mb-10 flex items-center gap-3">
                  <User size={24} className="text-medical-purple" />
                  已绑定的联系人
               </h3>
               <div className="space-y-6">
                 {contacts.map((contact, i) => (
                   <div key={contact.id} className="p-8 rounded-[32px] bg-medical-bg/20 border-2 border-transparent hover:border-medical-purple/20 transition-all group">
                      <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-medical-purple text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-medical-purple/20">
                               {contact.name[0]}
                            </div>
                            <div>
                               <div className="text-xl font-black text-medical-dark flex items-center gap-3">
                                  {contact.name}
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] rounded uppercase">{contact.relation}</span>
                               </div>
                               <div className="text-medical-mid font-bold mt-1 flex items-center gap-2">
                                  <Phone size={14} /> {contact.phone}
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <button className={`px-5 py-3 rounded-2xl font-black text-xs transition-all flex items-center gap-2 ${contact.alertOn ? 'bg-medical-purple text-white shadow-lg' : 'bg-white text-medical-mid border border-medical-light/20'}`}>
                               <Bell size={16} /> {contact.alertOn ? '预警已开启' : '预警已关闭'}
                            </button>
                            <button className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                               <Trash2 size={20} />
                            </button>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
               <h3 className="text-2xl font-black text-medical-dark mb-10 flex items-center gap-3">
                  <Shield size={24} className="text-medical-purple" />
                  全局通知偏好
               </h3>
               <div className="space-y-8">
                  {[
                    { id: "sms", title: "短信快速通道", desc: "在紧急时刻，除了系统推送外额外发送短信提醒。", icon: Phone },
                    { id: "call", title: "AI 语音外呼", desc: "若预警未被确认，系统将自动拨打守护人电话进行语音播报。", icon: Activity },
                    { id: "location", title: "高精定位共享", desc: "预警触发时，同步向守护人开放实时高精度定位权限。", icon: MapPin },
                  ].map((pref, i) => (
                    <div key={pref.id} className="flex items-center justify-between p-6 rounded-3xl bg-medical-bg/20 group hover:bg-medical-bg/40 transition-all">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-medical-purple shadow-sm">
                             <pref.icon size={24} />
                          </div>
                          <div>
                             <div className="font-bold text-medical-dark mb-1">{pref.title}</div>
                             <div className="text-xs text-medical-mid leading-relaxed max-w-sm">{pref.desc}</div>
                          </div>
                       </div>
                       <div className="w-14 h-8 bg-medical-purple rounded-full relative p-1 cursor-pointer">
                          <div className="w-6 h-6 bg-white rounded-full ml-auto shadow-sm" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
             <div className="bg-medical-dark rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
                <CheckCircle2 size={40} className="text-green-400 mb-6" />
                <h3 className="text-xl font-black mb-4">守护网络状态</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-8">
                   您的守护网络目前处于活跃状态，共有 2 名联系人处于监听中，平均预警响应时长约为 15 秒。
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                   <div className="flex items-center gap-3 text-xs font-bold">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      所有节点连接正常
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/10">
                <h3 className="text-lg font-black text-medical-dark mb-6">安全贴士</h3>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-orange-50 text-orange-700">
                   <AlertTriangle size={20} className="shrink-0" />
                   <p className="text-xs leading-relaxed font-medium">
                      建议至少绑定一名同城联系人，以便在紧急突发状况下能快速提供线下支持。
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
