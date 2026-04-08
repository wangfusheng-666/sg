import React from "react";
import { Link } from "react-router";
import { motion as Motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Leaf, Utensils, Apple, Coffee, Calendar, Plus } from "lucide-react";
import { useHealthMode } from "../context/HealthModeContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function DietPlan() {
  const { isElderlyMode } = useHealthMode();

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      <div className="bg-white border-b border-medical-light/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
          <Link to="/ai-health" className={`flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-all ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}>
            <ArrowLeft size={isElderlyMode ? 28 : 20} /> 返回智能管理
          </Link>
          <h1 className={`font-black text-medical-dark ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>AI 智能食谱</h1>
          <div className="flex gap-4">
             <button className="px-6 py-2 bg-medical-bg text-medical-purple rounded-xl font-bold text-xs">调整口味</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-black text-medical-dark flex items-center gap-3">
                     <span className="w-1.5 h-6 bg-medical-purple rounded-full" />
                     今日食谱建议
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-bold text-medical-mid">
                     <Calendar size={14} /> 2026年4月1日
                  </div>
               </div>

               <div className="space-y-8">
                 {[
                   { type: "早餐", time: "07:30 - 08:30", icon: Coffee, title: "燕麦牛奶 + 全麦面包 + 煮鸡蛋", kcal: "350", ingredients: ["燕麦 50g", "牛奶 250ml", "鸡蛋 1个"], img: "https://images.unsplash.com/photo-1564093497595-593b96d80180" },
                   { type: "午餐", time: "11:30 - 12:30", icon: Utensils, title: "清蒸鲈鱼 + 糙米饭 + 蒜蓉菜心", kcal: "550", ingredients: ["鲈鱼 150g", "糙米 80g", "菜心 200g"], img: "https://images.unsplash.com/photo-1564093497595-593b96d80180" },
                   { type: "晚餐", time: "18:00 - 19:00", icon: Apple, title: "西红柿炒蛋 + 杂粮粥", kcal: "400", ingredients: ["鸡蛋 2个", "西红柿 2个", "杂粮 50g"], img: "https://images.unsplash.com/photo-1564093497595-593b96d80180" },
                 ].map((meal, i) => (
                   <div key={i} className="flex flex-col md:flex-row gap-8 p-8 rounded-[32px] bg-medical-bg/20 border border-transparent hover:border-medical-purple/20 transition-all group">
                      <div className="md:w-1/3 aspect-video md:aspect-square rounded-[24px] overflow-hidden shrink-0 shadow-lg">
                         <ImageWithFallback src={`${meal.img}?w=400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 space-y-4">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-medical-purple shadow-sm">
                                  <meal.icon size={20} />
                               </div>
                               <span className="font-black text-medical-dark text-xl">{meal.type}</span>
                               <span className="text-xs text-medical-mid/60 font-bold">{meal.time}</span>
                            </div>
                            <div className="px-4 py-1.5 bg-medical-purple/10 text-medical-purple text-xs font-black rounded-full">
                               {meal.kcal} kcal
                            </div>
                         </div>
                         <h3 className="text-lg font-bold text-medical-dark">{meal.title}</h3>
                         <div className="flex flex-wrap gap-2 pt-2">
                            {meal.ingredients.map((ing, idx) => (
                               <span key={idx} className="px-3 py-1 bg-white text-medical-mid text-[10px] font-bold rounded-lg shadow-sm border border-medical-light/10">{ing}</span>
                            ))}
                         </div>
                         <div className="pt-4 flex items-center justify-between">
                            <button className="text-medical-purple text-sm font-black flex items-center gap-2">
                               查看制作流程 <ArrowLeft className="rotate-180" size={16} />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-medical-purple text-white flex items-center justify-center shadow-lg shadow-medical-purple/20">
                               <Plus size={16} />
                            </button>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <div className="bg-medical-dark rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                <Leaf size={40} className="text-green-400 mb-6" />
                <h3 className="text-2xl font-black mb-4">营养分析</h3>
                <div className="space-y-6">
                   <div>
                      <div className="flex justify-between text-xs font-bold mb-2">
                         <span>碳水化合物</span>
                         <span className="text-white/40">55%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full w-[55%] bg-blue-400" />
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-xs font-bold mb-2">
                         <span>蛋白质</span>
                         <span className="text-white/40">25%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full w-[25%] bg-medical-purple" />
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-xs font-bold mb-2">
                         <span>脂肪</span>
                         <span className="text-white/40">20%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full w-[20%] bg-orange-400" />
                      </div>
                   </div>
                </div>
                <div className="mt-10 p-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] text-white/60 leading-relaxed italic">
                  “今天的食谱富含欧米伽-3脂肪酸，对心血管健康极佳。”
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/10">
                <h3 className="text-lg font-black text-medical-dark mb-6">禁忌食材提醒</h3>
                <div className="space-y-4">
                   {[
                     { name: "腌制蔬菜", reason: "含盐量过高" },
                     { name: "油炸食品", reason: "饱和脂肪过多" },
                     { name: "含糖饮料", reason: "血糖波动剧烈" },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-red-50 text-red-600 font-bold text-xs">
                        <span>{item.name}</span>
                        <span className="text-[10px] opacity-60">{item.reason}</span>
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
