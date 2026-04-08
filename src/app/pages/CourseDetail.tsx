import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { motion as Motion } from "motion/react";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  Star, 
  ThumbsUp, 
  Share2, 
  MessageCircle,
  Bookmark,
  ChevronDown,
  ChevronRight,
  UserPlus
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useHealthMode } from "../context/HealthModeContext";

export function CourseDetail() {
  const { category, courseId } = useParams();
  const { isElderlyMode } = useHealthMode();
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock course data
  const course = {
    title: "高血压患者的低盐生活指南",
    teacher: "刘德海 教授",
    hospital: "国家心血管病中心",
    views: "15,230",
    likes: "2,410",
    summary: "长期高盐摄入是引发和加重高血压的关键因素。本视频将由权威专家带您科学认识钠盐，揭秘生活中的“隐形盐”，并手把手教您如何通过科学烹饪与合理搭配，在保证美味的同时控盐限盐。",
    chapters: [
      { title: "���识钠盐与高血压的关系", duration: "04:15" },
      { title: "警惕餐桌上的隐形盐", duration: "03:45" },
      { title: "科学限盐的实战技巧", duration: "05:20" },
      { title: "常见限盐误区解析", duration: "02:40" },
    ],
    comments: [
      { user: "李大爷", content: "讲得很实在，原来调料里的盐这么多！", date: "2小时前" },
      { user: "张阿姨", content: "给家里人都看了，以后炒菜少放两勺盐。", date: "5小时前" },
    ]
  };

  return (
    <div className={`min-h-screen bg-medical-bg/20 ${isElderlyMode ? 'pb-32' : 'pb-16'}`}>
      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-medical-light/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={`/health-class/${category}`} className={`flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-colors ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
            <ArrowLeft size={isElderlyMode ? 24 : 18} /> 返回{category}列表
          </Link>
          <div className="flex items-center gap-6">
             <button className="flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-all text-sm">
                <Share2 size={16} /> 分享给家人
             </button>
             <button className="flex items-center gap-2 text-medical-mid font-bold hover:text-medical-purple transition-all text-sm">
                <Bookmark size={16} /> 收藏
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            {/* Video Player Placeholder */}
            <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-black group border-4 border-white">
              {!isPlaying ? (
                <>
                  <ImageWithFallback src="https://images.unsplash.com/photo-1675270745543-883eae091a5c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <Motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(true)}
                      className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-medical-purple shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                    >
                      <Play size={48} fill="currentColor" className="ml-2" />
                    </Motion.button>
                    <p className="text-white font-black text-2xl tracking-widest drop-shadow-lg">立即播放视频课程</p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                   <div className="text-center">
                     <div className="animate-spin mb-4"><Play size={40} /></div>
                     <p>正在为您连接医学云端课堂...</p>
                   </div>
                </div>
              )}
              {/* Overlay Bottom Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-6">
                 <div className="h-1 bg-white/20 flex-1 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-medical-purple" />
                 </div>
                 <span className="text-white text-xs font-bold font-mono">04:15 / 15:00</span>
              </div>
            </div>

            {/* Course Information */}
            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
              <h1 className={`font-black text-medical-dark mb-6 tracking-tight ${isElderlyMode ? 'text-4xl' : 'text-3xl'}`}>
                {course.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 mb-10 pt-6 border-t border-medical-light/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-medical-bg overflow-hidden">
                    <ImageWithFallback src="https://i.pravatar.cc/150?u=doc1" />
                  </div>
                  <div>
                    <div className="font-bold text-medical-dark flex items-center gap-2">
                       {course.teacher}
                       <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] rounded">已认证</span>
                    </div>
                    <div className="text-xs text-medical-mid">{course.hospital}</div>
                  </div>
                  <button className="ml-4 px-6 py-2 bg-medical-purple text-white rounded-xl text-xs font-bold hover:bg-medical-dark transition-all flex items-center gap-2">
                    <UserPlus size={14} /> 关注
                  </button>
                </div>

                <div className="flex gap-6 ml-auto">
                   <div className="flex items-center gap-2 text-medical-mid font-bold text-sm">
                      <Users size={18} className="text-medical-light" /> {course.views} 正在学习
                   </div>
                   <div className="flex items-center gap-2 text-medical-mid font-bold text-sm">
                      <Star size={18} className="text-yellow-400 fill-current" /> 4.9 分
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-medical-dark flex items-center gap-3">
                   <span className="w-1 h-6 bg-medical-purple rounded-full" />
                   课程简介
                </h3>
                <p className={`text-medical-mid leading-relaxed font-light ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>
                   {course.summary}
                </p>
              </div>

              <div className="mt-12 flex gap-4">
                 <button className="flex-1 py-4 bg-medical-bg text-medical-purple rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-medical-purple hover:text-white transition-all">
                    <ThumbsUp size={24} /> 觉得有帮助 ({course.likes})
                 </button>
                 <button className="px-8 py-4 bg-white border-2 border-medical-light/20 text-medical-mid rounded-2xl font-black flex items-center gap-3 hover:border-medical-purple transition-all">
                    <MessageCircle size={24} /> 咨询医生
                 </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-medical-light/10">
               <h3 className="text-xl font-black text-medical-dark mb-10 flex items-center justify-between">
                  听课心得 (48)
                  <button className="text-sm text-medical-purple underline">写下我的心得</button>
               </h3>
               <div className="space-y-10">
                 {course.comments.map((comment, i) => (
                   <div key={i} className="flex gap-6">
                     <div className="w-14 h-14 bg-medical-bg rounded-2xl flex items-center justify-center font-bold text-medical-purple text-xl">
                       {comment.user[0]}
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                           <span className="font-bold text-medical-dark">{comment.user}</span>
                           <span className="text-xs text-medical-mid/60">{comment.date}</span>
                        </div>
                        <p className="text-medical-mid leading-relaxed">{comment.content}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-10">
            {/* Chapters List */}
            <div className="bg-white rounded-[40px] shadow-xl border border-medical-light/10 overflow-hidden">
               <div className="p-8 bg-medical-dark text-white">
                  <h3 className="text-xl font-black">课程章节</h3>
                  <p className="text-white/40 text-xs font-light">本课程共 4 个小节 · 总时长 15:00</p>
               </div>
               <div className="p-4 space-y-2">
                 {course.chapters.map((chapter, i) => (
                   <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer group ${i === 0 ? 'bg-medical-bg border border-medical-purple/20' : 'hover:bg-medical-bg'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black transition-all ${i === 0 ? 'bg-medical-purple text-white shadow-lg' : 'bg-medical-light/10 text-medical-mid'}`}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-sm ${i === 0 ? 'text-medical-purple' : 'text-medical-dark'}`}>{i === 0 ? "识钠盐与高血压的关系" : chapter.title}</div>
                        <div className="text-[10px] text-medical-mid">{chapter.duration}</div>
                      </div>
                      <ChevronRight size={16} className={i === 0 ? 'text-medical-purple' : 'text-medical-mid/40 group-hover:text-medical-purple transition-all'} />
                   </div>
                 ))}
               </div>
            </div>

            {/* Related Courses */}
            <div className="bg-white rounded-[40px] p-8 shadow-xl border border-medical-light/10">
               <h3 className="text-lg font-black text-medical-dark mb-8">看了还想看</h3>
               <div className="space-y-8">
                 {[1, 2].map((_, i) => (
                   <div key={i} className="group cursor-pointer">
                      <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative">
                        <ImageWithFallback src={`https://images.unsplash.com/photo-1762939079730-23708c0dd337?w=400&u=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                           <Play size={24} className="text-white fill-current opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-medical-dark group-hover:text-medical-purple transition-colors line-clamp-2 leading-tight">
                        {i === 0 ? "心脏健康：预防比治疗更重要" : "糖尿病老人的饮食控制"}
                      </h4>
                      <div className="mt-2 text-[10px] text-medical-mid font-bold flex items-center gap-3">
                         <span>李博士</span>
                         <span className="w-1 h-1 bg-medical-light/40 rounded-full" />
                         <span>2.4k 次播放</span>
                      </div>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-10 py-4 border-2 border-medical-bg rounded-2xl font-black text-medical-purple hover:bg-medical-bg transition-all">
                  查看更多推荐
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
