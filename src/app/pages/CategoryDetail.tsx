import React from "react";
import { useParams, Link } from "react-router";
import { motion as Motion } from "motion/react";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  Star, 
  ChevronRight, 
  Filter, 
  Search,
  BookOpen,
  Volume2
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useHealthMode } from "../context/HealthModeContext";

export function CategoryDetail() {
  const { category } = useParams();
  const { isElderlyMode } = useHealthMode();

  // Mock data based on category
  const getCategoryData = (cat: string | undefined) => {
    switch(cat) {
      case "慢病管理":
        return {
          title: "慢病健康管理中心",
          description: "专业医生团队为您提供长期、科学的慢性病预防与管理方案。",
          banner: "https://images.unsplash.com/photo-1675270745543-883eae091a5c",
          subCategories: ["高血压", "糖尿病", "高血脂", "心脏康复"],
          courses: [
            { id: "1", title: "高血压患者的低盐生活指南", teacher: "刘医生", views: "12k", duration: "15:00", img: "https://images.unsplash.com/photo-1675270745543-883eae091a5c" },
            { id: "2", title: "糖尿病日常监测与用药", teacher: "陈护士", views: "8k", duration: "12:30", img: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770" },
            { id: "3", title: "心脏病术后居家康复要点", teacher: "王教授", views: "5.4k", duration: "25:00", img: "https://images.unsplash.com/photo-1762939079730-23708c0dd337" },
          ]
        };
      case "急救知识":
        return {
          title: "全民急救大课堂",
          description: "黄金四分钟，挽救一个生命。在这里学习最实用的急救技能。",
          banner: "https://images.unsplash.com/photo-1771946428523-dd98df0ca9a6",
          subCategories: ["CPR/AED", "异物梗阻", "止血包扎", "户外急救"],
          courses: [
            { id: "4", title: "CPR 心肺复苏实操演练", teacher: "救援队", views: "25k", duration: "08:00", img: "https://images.unsplash.com/photo-1765996796562-ce301df337a0" },
            { id: "5", title: "海姆立克急救法详解", teacher: "张教官", views: "18k", duration: "06:00", img: "https://images.unsplash.com/photo-1771946428523-dd98df0ca9a6" },
          ]
        };
      default:
        return {
          title: "健康知识深度探索",
          description: "探索更多专业的健康医疗内容。",
          banner: "https://images.unsplash.com/photo-1758274526138-4da003a5a936",
          subCategories: ["全部内容", "专家推荐", "最新上传"],
          courses: [
            { id: "6", title: "秋季养生与身体调理", teacher: "赵大夫", views: "3.2k", duration: "10:00", img: "https://images.unsplash.com/photo-1758274526138-4da003a5a936" },
          ]
        };
    }
  };

  const data = getCategoryData(category);

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      {/* Hero Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <ImageWithFallback src={`${data.banner}?auto=format&fit=crop&q=80&w=1600`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-medical-dark via-medical-dark/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <Motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
              <Link to="/health-class" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={20} /> 返回健康课堂
              </Link>
              <h1 className={`font-black text-white tracking-tighter mb-6 ${isElderlyMode ? 'text-6xl' : 'text-5xl'}`}>
                {category}
              </h1>
              <p className={`text-white/80 leading-relaxed font-light ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>
                {data.description}
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        {/* Filters / Sub-categories */}
        <div className="bg-white rounded-[40px] shadow-2xl p-4 flex flex-wrap items-center gap-4 mb-16 border border-medical-light/10">
          <div className="bg-medical-purple text-white px-8 py-4 rounded-[24px] font-black flex items-center gap-3">
             <Filter size={20} />
             <span>筛选内容</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.subCategories.map((sub, i) => (
              <button key={i} className={`px-6 py-4 rounded-[24px] font-bold transition-all ${i === 0 ? 'bg-medical-bg text-medical-purple' : 'text-medical-mid hover:bg-medical-bg'} ${isElderlyMode ? 'text-2xl px-10' : 'text-sm'}`}>
                {sub}
              </button>
            ))}
          </div>
          <div className="ml-auto hidden lg:flex items-center gap-4 px-6">
             <div className="flex items-center gap-2 text-medical-mid font-bold">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               1.2k 人在线学
             </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className={`font-black text-medical-dark ${isElderlyMode ? 'text-4xl' : 'text-2xl'}`}>全部课程</h2>
              <div className="flex items-center gap-4">
                 <button className="p-3 bg-white rounded-xl text-medical-mid shadow-sm"><LayoutGrid size={20} /></button>
                 <button className="p-3 bg-white rounded-xl text-medical-mid shadow-sm opacity-50"><BookOpen size={20} /></button>
              </div>
            </div>

            {data.courses.map((course, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-xl border border-medical-light/10 hover:shadow-2xl hover:border-medical-purple/20 transition-all"
              >
                <div className="md:w-1/3 aspect-video md:aspect-auto relative overflow-hidden">
                  <ImageWithFallback src={`${course.img}?auto=format&fit=crop&q=80&w=600`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-medical-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Link to={`/health-class/${category}/${course.id}`} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-medical-purple shadow-2xl">
                       <Play size={32} fill="currentColor" className="ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="flex-1 p-8 flex flex-col">
                   <div className="flex justify-between items-start mb-4">
                     <span className="px-3 py-1 bg-medical-bg text-medical-purple text-[10px] font-black rounded-lg uppercase tracking-widest">{category} · {data.subCategories[0]}</span>
                     <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                   </div>
                   <h3 className={`font-black text-medical-dark mb-4 transition-colors group-hover:text-medical-purple ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>
                     {course.title}
                   </h3>
                   <p className={`text-medical-mid mb-6 line-clamp-2 font-light ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                     本课程将由专业{course.teacher}为您深入讲解如何通过日常点滴管理提升生命质量，减少并发症风险。
                   </p>
                   <div className="mt-auto pt-6 border-t border-medical-light/10 flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-medical-mid font-bold text-xs">
                          <Clock size={14} /> {course.duration}
                        </div>
                        <div className="flex items-center gap-2 text-medical-mid font-bold text-xs">
                          <Users size={14} /> {course.views} 次播放
                        </div>
                     </div>
                     <Link to={`/health-class/${category}/${course.id}`} className={`flex items-center gap-2 font-black text-medical-purple ${isElderlyMode ? 'text-2xl' : 'text-sm'}`}>
                       立即学习 <ChevronRight size={18} />
                     </Link>
                   </div>
                </div>
              </Motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div className="bg-medical-dark rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-medical-purple/20 blur-3xl -mr-16 -mt-16 group-hover:bg-medical-purple/40 transition-all duration-700" />
               <Volume2 size={40} className="text-medical-purple mb-6" />
               <h3 className="text-2xl font-black mb-4 tracking-tight">为您语音播报</h3>
               <p className="text-white/60 font-light mb-8 leading-relaxed">
                 不想看字？开启老年专属语音课堂，我们为您读。
               </p>
               <button className="w-full py-4 bg-white text-medical-dark rounded-2xl font-black transition-transform active:scale-95 shadow-lg">
                  立即开启
               </button>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-medical-light/10 shadow-xl">
               <h3 className="text-xl font-black text-medical-dark mb-8">本月专家排班</h3>
               <div className="space-y-6">
                 {[1,2,3].map((_, i) => (
                   <div key={i} className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-medical-bg overflow-hidden">
                       <ImageWithFallback src={`https://i.pravatar.cc/150?u=${i}`} />
                     </div>
                     <div className="flex-1">
                       <div className="font-bold text-medical-dark">王{i+1}名 教授</div>
                       <div className="text-xs text-medical-mid">内科专家 · 30年经验</div>
                     </div>
                     <button className="px-4 py-2 bg-medical-bg text-medical-purple text-xs font-bold rounded-xl hover:bg-medical-purple hover:text-white transition-all">
                       咨询
                     </button>
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

function LayoutGrid(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}
