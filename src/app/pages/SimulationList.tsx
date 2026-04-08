import React from "react";
import { Link } from "react-router";
import { motion as Motion } from "motion/react";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  ChevronRight, 
  AlertTriangle,
  Flame,
  Activity,
  Heart
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useHealthMode } from "../context/HealthModeContext";

export function SimulationList() {
  const { isElderlyMode } = useHealthMode();

  const simulations = [
    { 
      id: "cpr", 
      title: "成人心肺复苏 (CPR)", 
      desc: "学习如何在紧急时刻进行有效的人工呼吸与胸外按压。", 
      level: "专业", 
      duration: "10min", 
      icon: Activity,
      color: "bg-red-500",
      img: "https://images.unsplash.com/photo-1765996796562-ce301df337a0"
    },
    { 
      id: "heimlich", 
      title: "海姆立克急救法", 
      desc: "针对异物梗阻的快速施救方案，全家都应掌握。", 
      level: "基础", 
      duration: "5min", 
      icon: AlertTriangle,
      color: "bg-orange-500",
      img: "https://images.unsplash.com/photo-1771946428523-dd98df0ca9a6"
    },
    { 
      id: "burn", 
      title: "烧烫伤初步处理", 
      desc: "不仅是冲水，更要学会如何评估伤情与预防感染。", 
      level: "基础", 
      duration: "8min", 
      icon: Flame,
      color: "bg-yellow-500",
      img: "https://images.unsplash.com/photo-1758274526138-4da003a5a936"
    },
    { 
      id: "stroke", 
      title: "中风快速识别与救治", 
      desc: "通过“FAST”法则识别中风先兆，争取黄金时间。", 
      level: "进阶", 
      duration: "12min", 
      icon: Heart,
      color: "bg-purple-500",
      img: "https://images.unsplash.com/photo-1675270745543-883eae091a5c"
    }
  ];

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      <div className="bg-medical-dark text-white pt-16 pb-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/emergency" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} /> 返回急救中心
          </Link>
          <h1 className={`font-black tracking-tighter mb-4 ${isElderlyMode ? 'text-6xl' : 'text-4xl'}`}>急救实操模拟器</h1>
          <p className={`font-light max-w-2xl ${isElderlyMode ? 'text-2xl text-white/80' : 'text-lg text-white/60'}`}>
            在这里，通过高拟真度的场景还原，您可以反复练习各项急救技能。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {simulations.map((sim, i) => (
            <Motion.div 
              key={sim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-medical-light/10 hover:shadow-medical-purple/20 transition-all group"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="sm:w-2/5 aspect-square sm:aspect-auto relative overflow-hidden">
                   <ImageWithFallback src={`${sim.img}?auto=format&fit=crop&q=80&w=600`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${sim.color} shadow-xl`}>
                         <sim.icon size={24} />
                      </div>
                   </div>
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                   <div>
                     <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-medical-bg text-medical-purple text-[10px] font-black rounded-lg uppercase tracking-widest">{sim.level}</span>
                        <div className="flex items-center gap-2 text-medical-mid text-xs font-bold">
                           <Clock size={14} /> {sim.duration}
                        </div>
                     </div>
                     <h3 className={`font-black text-medical-dark mb-4 group-hover:text-medical-purple transition-colors ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>
                        {sim.title}
                     </h3>
                     <p className={`text-medical-mid line-clamp-2 font-light mb-6 ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                        {sim.desc}
                     </p>
                   </div>
                   <Link 
                     to={`/emergency/simulations/${sim.id}`}
                     className={`w-full py-4 bg-medical-bg text-medical-purple rounded-2xl font-black flex items-center justify-center gap-2 group-hover:bg-medical-purple group-hover:text-white transition-all ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}
                   >
                     进入练习 <ChevronRight size={18} />
                   </Link>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
