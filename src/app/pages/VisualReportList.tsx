import React from "react";
import { Link } from "react-router";
import { motion as Motion } from "motion/react";
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  Activity, 
  ChevronRight, 
  FileText, 
  Filter,
  Users,
  Eye,
  Microscope,
  Stethoscope
} from "lucide-react";
import { useHealthMode } from "../context/HealthModeContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function VisualReportList() {
  const { isElderlyMode } = useHealthMode();

  const reports = [
    { id: "v01", title: "舌苔视觉辅助诊断报告", date: "2026-03-25", type: "中医视觉", result: "脾胃虚寒", score: "85", icon: Microscope, color: "bg-medical-purple" },
    { id: "v02", title: "日常步态平衡性分析", date: "2026-03-20", type: "骨科康复", result: "状态良好", score: "92", icon: Activity, color: "bg-green-500" },
    { id: "v03", title: "面部气色健康监测", date: "2026-03-15", type: "基础筛查", result: "气血不足", score: "78", icon: Eye, color: "bg-blue-500" },
    { id: "v04", title: "皮肤异常斑点识别", date: "2026-03-01", type: "皮肤专科", result: "需随诊观察", score: "60", icon: Stethoscope, color: "bg-orange-500" },
  ];

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      <div className="bg-white border-b border-medical-light/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
          <Link to="/ai-visual" className={`flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-all ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}>
            <ArrowLeft size={isElderlyMode ? 28 : 20} /> 返回视觉诊疗
          </Link>
          <div className="flex gap-4">
             <div className="relative flex items-center">
                <Search size={16} className="absolute left-4 text-medical-mid" />
                <input 
                  type="text" 
                  placeholder="搜索报告..." 
                  className="pl-12 pr-6 py-3 bg-medical-bg rounded-xl border-none text-xs w-[240px]" 
                />
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
               <h2 className={`font-black text-medical-dark ${isElderlyMode ? 'text-4xl' : 'text-2xl'}`}>所有健康报告</h2>
               <div className="flex items-center gap-2">
                  <button className="p-3 bg-white rounded-xl text-medical-mid border border-medical-light/10 shadow-sm"><Filter size={18} /></button>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
               {reports.map((report, i) => (
                 <Motion.div 
                   key={report.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white rounded-[32px] p-8 shadow-xl border border-medical-light/10 hover:shadow-medical-purple/10 hover:scale-[1.01] transition-all group"
                 >
                   <div className="flex flex-col md:flex-row md:items-center gap-8">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 ${report.color} shadow-lg shadow-medical-purple/10`}>
                         <report.icon size={32} />
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start mb-2">
                            <span className="px-3 py-1 bg-medical-bg text-medical-purple text-[10px] font-black rounded-lg uppercase tracking-widest">{report.type}</span>
                            <div className="flex items-center gap-2 text-medical-mid text-xs font-bold">
                               <Calendar size={14} /> {report.date}
                            </div>
                         </div>
                         <h3 className={`font-black text-medical-dark mb-4 transition-colors group-hover:text-medical-purple ${isElderlyMode ? 'text-2xl' : 'text-xl'}`}>
                            {report.title}
                         </h3>
                         <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-medical-mid font-bold text-xs">
                               结论：<span className="text-medical-dark">{report.result}</span>
                            </div>
                            <div className="flex items-center gap-2 text-medical-mid font-bold text-xs">
                               AI 评分：<span className="text-medical-purple">{report.score}</span>
                            </div>
                         </div>
                      </div>
                      <Link 
                        to={`/ai-visual/reports/${report.id}`}
                        className={`px-8 py-4 bg-medical-bg text-medical-purple rounded-2xl font-black flex items-center gap-2 hover:bg-medical-purple hover:text-white transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}
                      >
                         详细解读 <ChevronRight size={18} />
                      </Link>
                   </div>
                 </Motion.div>
               ))}
            </div>

            <button className="w-full py-5 border-2 border-dashed border-medical-light/50 rounded-[32px] text-medical-mid font-bold hover:bg-white transition-all">
               加载更早的历史报告
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
             <div className="bg-medical-dark rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="text-xl font-black mb-8">报告统计 (近3个月)</h3>
                   <div className="space-y-8">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-2 h-10 bg-green-500 rounded-full" />
                            <div className="font-bold">状态良好</div>
                         </div>
                         <div className="text-2xl font-black">12</div>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-2 h-10 bg-medical-purple rounded-full" />
                            <div className="font-bold">轻度异常</div>
                         </div>
                         <div className="text-2xl font-black">4</div>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-2 h-10 bg-orange-500 rounded-full" />
                            <div className="font-bold">需随诊</div>
                         </div>
                         <div className="text-2xl font-black">1</div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/10">
                <h3 className="text-lg font-black text-medical-dark mb-8 flex items-center gap-3">
                   <Users size={20} className="text-medical-purple" />
                   报告接收人
                </h3>
                <div className="space-y-4">
                   {[
                     { name: "李阿姨 (本人)", status: "已查阅" },
                     { name: "张子豪 (家属)", status: "待推送" },
                   ].map((user, i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-medical-bg/40">
                        <span className="font-bold text-sm text-medical-dark">{user.name}</span>
                        <span className={`text-[10px] font-black uppercase ${user.status === '已查阅' ? 'text-green-600' : 'text-medical-mid'}`}>{user.status}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
