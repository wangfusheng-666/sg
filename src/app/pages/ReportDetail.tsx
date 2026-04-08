import React from "react";
import { useParams, Link } from "react-router";
import { motion as Motion } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  Activity, 
  ChevronRight, 
  FileText, 
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  Microscope,
  Share2,
  MessageCircle,
  Clock,
  LayoutGrid
} from "lucide-react";
import { useHealthMode } from "../context/HealthModeContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ReportDetail() {
  const { id } = useParams();
  const { isElderlyMode } = useHealthMode();

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      <div className="bg-white border-b border-medical-light/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
          <Link to="/ai-visual/reports" className={`flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-all ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}>
            <ArrowLeft size={isElderlyMode ? 28 : 20} /> 返回报告列表
          </Link>
          <div className="flex gap-4">
             <button className="p-3 bg-medical-bg text-medical-purple rounded-xl hover:bg-medical-purple hover:text-white transition-all">
                <Share2 size={18} />
             </button>
             <button className="px-6 py-3 bg-medical-purple text-white rounded-xl font-black text-sm flex items-center gap-2 shadow-lg shadow-medical-purple/20 transition-transform active:scale-95">
                <MessageCircle size={18} /> 咨询医生
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Report Content */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
               <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-medical-bg flex items-center justify-center text-medical-purple shadow-sm">
                        <Microscope size={32} />
                     </div>
                     <div>
                        <h1 className={`font-black text-medical-dark mb-2 tracking-tight ${isElderlyMode ? 'text-4xl' : 'text-3xl'}`}>舌苔视觉辅助诊断</h1>
                        <div className="flex items-center gap-4 text-xs text-medical-mid font-bold">
                           <Calendar size={14} /> 2026年3月25日 14:30
                           <span className="w-1 h-1 bg-medical-light rounded-full" />
                           报告编号：{id?.toUpperCase()}
                        </div>
                     </div>
                  </div>
                  <div className="bg-medical-purple text-white px-6 py-3 rounded-2xl font-black text-2xl shadow-xl shadow-medical-purple/20">
                     85 分
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="aspect-square rounded-3xl bg-medical-bg/20 overflow-hidden relative group border border-medical-light/10">
                     <ImageWithFallback src="https://images.unsplash.com/photo-1758274526138-4da003a5a936?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                     <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-6">
                        <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-xl text-xs font-black text-medical-dark shadow-sm">
                           AI 识别区域 (ROI)
                        </div>
                     </div>
                  </div>
                  <div className="space-y-6 flex flex-col justify-center">
                     <h3 className="text-xl font-black text-medical-dark flex items-center gap-2">
                        <Activity size={20} className="text-medical-purple" />
                        AI 深度分析
                     </h3>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold">
                           <span className="text-medical-mid">色泽</span>
                           <span className="text-medical-dark">淡红 (正常)</span>
                        </div>
                        <div className="h-1 bg-medical-bg rounded-full overflow-hidden">
                           <div className="h-full w-full bg-green-500" />
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold">
                           <span className="text-medical-mid">苔质</span>
                           <span className="text-medical-dark">薄白腻 (提示湿气)</span>
                        </div>
                        <div className="h-1 bg-medical-bg rounded-full overflow-hidden">
                           <div className="h-full w-[60%] bg-orange-500" />
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold">
                           <span className="text-medical-mid">湿润度</span>
                           <span className="text-medical-dark">润 (正常)</span>
                        </div>
                        <div className="h-1 bg-medical-bg rounded-full overflow-hidden">
                           <div className="h-full w-full bg-green-500" />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-8 rounded-[32px] bg-medical-bg/20 border border-medical-light/10 space-y-6">
                  <h3 className="text-xl font-black text-medical-dark">综合结论</h3>
                  <p className={`text-medical-mid font-light leading-relaxed ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>
                     根据 AI 视觉分析，您的舌象提示近期存在一定的“脾胃虚寒”现象，可能与季节更替或饮食过凉有关。虽然目前处于可控范围，但建议通过日常调理进行改善。
                  </p>
               </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
               <h3 className="text-2xl font-black text-medical-dark mb-10 flex items-center gap-3">
                  <Stethoscope size={24} className="text-medical-purple" />
                  调理方案建议
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-3xl bg-green-50 border border-green-100 flex flex-col gap-4">
                     <h4 className="font-bold text-green-700 text-lg">推荐饮食</h4>
                     <p className="text-sm text-green-600/80 leading-relaxed">
                        多摄入温热属性的食物，如姜汤、红薯、羊肉等。近期避免冰镇饮品。
                     </p>
                  </div>
                  <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col gap-4">
                     <h4 className="font-bold text-blue-700 text-lg">生活建议</h4>
                     <p className="text-sm text-blue-600/80 leading-relaxed">
                        注意腹部保暖，建议进行适度的有氧运动，如太极或散步，增强阳气。
                     </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
             <div className="bg-medical-dark rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-purple/20 blur-3xl -mr-16 -mt-16 group-hover:bg-medical-purple/40 transition-all duration-700" />
                <LayoutGrid size={40} className="text-medical-purple mb-8" />
                <h3 className="text-2xl font-black mb-6">关联诊断数据</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-10">
                   我们将该视觉报告与您的近期心率、步态数据进行了交叉分析，一致性得分为 92%。
                </p>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-sm font-bold">步态平衡性</span>
                      <span className="text-green-500 font-black">良好</span>
                   </div>
                   <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-sm font-bold">平均静息心率</span>
                      <span className="text-white font-black">72 bpm</span>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/10">
                <h3 className="text-lg font-black text-medical-dark mb-6">历史对比</h3>
                <div className="space-y-4">
                   {[
                     { date: "02-15", result: "正常", trend: "down", color: "text-green-500" },
                     { date: "01-10", result: "脾胃失调", trend: "up", color: "text-red-500" },
                   ].map((history, i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-medical-bg/40 border border-transparent hover:border-medical-purple/20 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                           <Clock size={16} className="text-medical-mid" />
                           <span className="text-xs font-bold text-medical-dark">{history.date}</span>
                        </div>
                        <span className={`text-[10px] font-black uppercase ${history.color}`}>{history.result}</span>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-8 py-4 bg-medical-bg text-medical-purple rounded-xl font-black text-xs">查看完整趋势图</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
