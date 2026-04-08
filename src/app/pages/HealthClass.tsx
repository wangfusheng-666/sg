import React, { useState } from "react";
import { Link } from "react-router";
import { BookOpen, Video, Mic, Volume2, Search, ArrowRight, Play, Heart, ChevronRight, Star, Clock, Users } from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useHealthMode } from "../context/HealthModeContext";

interface CourseItem {
  id: string;
  title: string;
  teacher: string;
  duration: string;
  views: string;
  image: string;
  category: string;
}

export function HealthClass() {
  const { isElderlyMode } = useHealthMode();
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("热门课程");

  const categories = ["热门课程", "慢病管理", "急救知识", "营养膳食", "心理健康", "育儿护理"];

  const contentData: Record<string, { featured: CourseItem[], list: CourseItem[] }> = {
    "热门课程": {
      featured: [
        { id: "1", title: "心血管病家庭预防指南", teacher: "张德胜 教授", duration: "15:20", views: "1.2k", image: "https://images.unsplash.com/photo-1762939079730-23708c0dd337", category: "热门" },
        { id: "2", title: "糖尿病饮食禁忌全解", teacher: "李丽 营养师", duration: "12:45", views: "850", image: "https://images.unsplash.com/photo-1683638662009-f0d885d7f1e1", category: "热门" },
        { id: "3", title: "老年人居家锻炼实操", teacher: "陈志刚 教练", duration: "20:10", views: "2.5k", image: "https://images.unsplash.com/photo-1658314755811-73c806249f31", category: "热门" },
      ],
      list: [
        { id: "4", title: "如何预防换季感冒？", teacher: "王医生", duration: "08:20", views: "3.1k", image: "", category: "热门" },
        { id: "5", title: "秋季养生小技巧", teacher: "赵专家", duration: "10:15", views: "1.9k", image: "", category: "热门" },
      ]
    },
    "慢病管理": {
      featured: [
        { id: "10", title: "高血压长期管理方案", teacher: "刘医生", duration: "18:30", views: "4.2k", image: "https://images.unsplash.com/photo-1762939079730-23708c0dd337", category: "慢病" },
        { id: "11", title: "痛风患者的自我修养", teacher: "孙大夫", duration: "14:20", views: "2.1k", image: "https://images.unsplash.com/photo-1658314755811-73c806249f31", category: "慢病" },
      ],
      list: [
        { id: "12", title: "测血糖的正确姿势", teacher: "李护士", duration: "05:40", views: "5.6k", image: "", category: "慢病" },
        { id: "13", title: "关节炎缓解操", teacher: "陈教练", duration: "25:00", views: "1.2k", image: "", category: "慢病" },
      ]
    },
    "急救知识": {
      featured: [
        { id: "20", title: "心肺复苏术（CPR）详解", teacher: "紧急救援队", duration: "08:50", views: "15k", image: "https://images.unsplash.com/photo-1765996796562-ce301df337a0", category: "急救" },
        { id: "21", title: "气管异物梗阻急救", teacher: "张教官", duration: "06:15", views: "8.2k", image: "https://images.unsplash.com/photo-1765996796562-ce301df337a0", category: "急救" },
      ],
      list: [
        { id: "22", title: "烧烫伤初步处理", teacher: "医疗站", duration: "04:30", views: "3.4k", image: "", category: "急救" },
        { id: "23", title: "止血包扎技术", teacher: "救援办", duration: "12:00", views: "2.8k", image: "", category: "急救" },
      ]
    },
    "营养膳食": {
      featured: [
        { id: "30", title: "平衡膳食宝塔解读", teacher: "周营养师", duration: "22:10", views: "1.1k", image: "https://images.unsplash.com/photo-1683638662009-f0d885d7f1e1", category: "营养" },
        { id: "31", title: "老年补钙食谱推荐", teacher: "食堂大厨", duration: "15:45", views: "3.5k", image: "https://images.unsplash.com/photo-1683638662009-f0d885d7f1e1", category: "营养" },
      ],
      list: [
        { id: "32", title: "粗粮怎么吃才健康？", teacher: "小王", duration: "07:30", views: "2.2k", image: "", category: "营养" },
        { id: "33", title: "减脂餐制作演示", teacher: "运动博主", duration: "18:00", views: "6.7k", image: "", category: "营养" },
      ]
    },
    "心理健康": {
      featured: [
        { id: "40", title: "正念冥想入门", teacher: "心理咨询师", duration: "30:00", views: "5.2k", image: "https://images.unsplash.com/photo-1762894110556-741b8e066722", category: "心理" },
        { id: "41", title: "退休后的心理调适", teacher: "老专家", duration: "20:20", views: "1.8k", image: "https://images.unsplash.com/photo-1762894110556-741b8e066722", category: "心理" },
      ],
      list: [
        { id: "42", title: "如何面对失眠困扰？", teacher: "助眠师", duration: "15:00", views: "9.1k", image: "", category: "心理" },
        { id: "43", title: "职场压力释放", teacher: "HR主管", duration: "10:45", views: "3.3k", image: "", category: "心理" },
      ]
    },
    "育儿护理": {
      featured: [
        { id: "50", title: "新生儿护理全攻略", teacher: "月嫂王阿姨", duration: "45:00", views: "20k", image: "https://images.unsplash.com/photo-1758748101944-e06cb5fca43b", category: "育儿" },
        { id: "51", title: "辅食添加原则", teacher: "育婴师", duration: "12:30", views: "7.4k", image: "https://images.unsplash.com/photo-1758748101944-e06cb5fca43b", category: "育儿" },
      ],
      list: [
        { id: "52", title: "小儿发热家庭护理", teacher: "儿科主任", duration: "08:15", views: "12k", image: "", category: "育儿" },
        { id: "53", title: "宝宝安睡技巧", teacher: "专家", duration: "14:50", views: "5.5k", image: "", category: "育儿" },
      ]
    },
  };

  const activeContent = contentData[selectedCategory] || contentData["热门课程"];

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      // Small announcement
      if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance("正在为您开启健康课堂老年语音版。您可以选择想要听的内容。");
        msg.lang = 'zh-CN';
        window.speechSynthesis.speak(msg);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isVoiceMode ? 'bg-medical-dark text-white' : 'bg-medical-bg/20'}`}>
      {/* Header Section */}
      <section className={`transition-all duration-500 ${isVoiceMode ? 'bg-medical-dark pt-20 pb-12' : 'bg-white pt-16 pb-12 border-b border-medical-light/10'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-center lg:text-left">
            <h1 className={`font-black tracking-tighter mb-4 transition-all ${isVoiceMode ? 'text-5xl text-white' : 'text-4xl text-medical-dark'}`}>
              健康知识课堂
            </h1>
            <p className={`max-w-xl mx-auto lg:mx-0 transition-all ${isVoiceMode ? 'text-2xl text-white/70 font-light' : 'text-lg text-medical-mid'}`}>
              {isVoiceMode ? "老人家，这里有会说话的医生，点开就能听健康知识。" : "专业的医疗科普知识，助力全民健康素养提升。"}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className={`relative flex items-center transition-all ${isVoiceMode ? 'hidden' : 'block'}`}>
              <Search className="absolute left-4 text-medical-mid" size={18} />
              <input 
                type="text" 
                placeholder="搜一搜您关心的健康问题..."
                className="pl-12 pr-6 py-3 bg-medical-bg rounded-2xl border-none focus:ring-2 focus:ring-medical-purple/20 w-[300px] text-sm"
              />
            </div>
            <button 
              onClick={toggleVoiceMode}
              className={`flex items-center gap-3 px-8 py-4 rounded-3xl font-black transition-all shadow-xl group ${
                isVoiceMode 
                  ? 'bg-white text-medical-dark hover:scale-105' 
                  : 'bg-medical-purple text-white hover:bg-medical-dark'
              }`}
            >
              {isVoiceMode ? <Volume2 size={24} className="animate-pulse" /> : <Mic size={24} />}
              <span className={isVoiceMode ? 'text-xl' : 'text-base'}>
                {isVoiceMode ? "退出播报模式" : "开启语音学习"}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <div className={`sticky top-24 z-40 transition-all duration-500 ${isVoiceMode ? 'bg-medical-dark/80 backdrop-blur-xl border-b border-white/10' : 'bg-white/80 backdrop-blur-xl border-b border-medical-light/10 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? (isVoiceMode ? 'bg-white text-medical-dark scale-105 shadow-lg' : 'bg-medical-purple text-white shadow-xl shadow-medical-purple/20 scale-105')
                  : (isVoiceMode ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-medical-mid hover:text-medical-purple hover:bg-medical-bg')
              } ${isVoiceMode ? 'text-xl' : 'text-sm'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          <Motion.div
            key={selectedCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Featured Section */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <h2 className={`font-black tracking-tight transition-all ${isVoiceMode ? 'text-4xl text-white' : 'text-2xl text-medical-dark'}`}>
                  精选课程
                </h2>
                <Link to={`/health-class/${selectedCategory}`} className={`flex items-center gap-2 font-bold ${isVoiceMode ? 'text-white/40' : 'text-medical-purple'}`}>
                  查看更多 <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeContent.featured.map((item, i) => (
                  <Motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className={`group rounded-[40px] overflow-hidden shadow-2xl transition-all border ${
                      isVoiceMode 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-white border-medical-light/20'
                    }`}
                  >
                    <div className="relative aspect-video bg-medical-bg overflow-hidden">
                      <ImageWithFallback 
                        src={`${item.image}?auto=format&fit=crop&q=80&w=800`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-medical-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 backdrop-blur-[2px]">
                        <Link 
                          to={`/health-class/${selectedCategory}/${item.id}`}
                          className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-medical-purple shadow-2xl cursor-pointer"
                        >
                          <Play size={40} fill="currentColor" className="ml-2" />
                        </Link>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-4 py-1.5 rounded-full font-bold text-white shadow-lg ${isVoiceMode ? 'bg-medical-purple text-lg' : 'bg-medical-dark text-[10px]'}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                        <Clock size={12} /> {item.duration}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <Link to={`/health-class/${selectedCategory}/${item.id}`}>
                          <h3 className={`font-bold leading-tight transition-all group-hover:text-medical-purple ${isVoiceMode ? 'text-2xl text-white' : 'text-xl text-medical-dark'}`}>
                            {item.title}
                          </h3>
                        </Link>
                        <button className={`${isVoiceMode ? 'text-white/40' : 'text-medical-light'} hover:text-red-500 transition-colors`}>
                          <Heart size={24} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-medical-light/10">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-medical-bg flex items-center justify-center text-medical-mid overflow-hidden transition-all ${isVoiceMode ? 'w-14 h-14' : ''}`}>
                             <ImageWithFallback src="https://images.unsplash.com/photo-1559839734-2b71f1e3c770?w=100" />
                          </div>
                          <span className={`font-bold ${isVoiceMode ? 'text-xl text-white/70' : 'text-sm text-medical-mid'}`}>{item.teacher}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 font-bold ${isVoiceMode ? 'text-lg text-white/40' : 'text-[10px] text-medical-mid uppercase tracking-widest'}`}>
                          <Users size={isVoiceMode ? 20 : 12} /> {item.views} 正在学
                        </div>
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </div>
            </div>

            {/* List Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:col-span-2 flex items-center gap-4 mb-4">
                 <Star className="text-yellow-400 fill-current" size={24} />
                 <h2 className={`font-black transition-all ${isVoiceMode ? 'text-3xl text-white' : 'text-xl text-medical-dark'}`}>
                    为您推荐
                 </h2>
              </div>
              
              {activeContent.list.map((item, i) => (
                <Motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center p-6 rounded-[30px] border transition-all cursor-pointer group ${
                    isVoiceMode 
                      ? 'bg-white/5 border-white/5 hover:bg-white/10' 
                      : 'bg-white border-medical-light/10 hover:bg-medical-purple/5 hover:border-medical-purple/20 shadow-sm'
                  }`}
                >
                  <Link to={`/health-class/${selectedCategory}/${item.id}`} className="flex items-center w-full">
                    <div className={`rounded-2xl flex items-center justify-center text-medical-purple shrink-0 mr-8 relative overflow-hidden transition-all ${isVoiceMode ? 'w-24 h-24' : 'w-20 h-20 bg-medical-bg'}`}>
                      <ImageWithFallback 
                        src={`https://images.unsplash.com/photo-1758874960125-0b82f1aa54f9?auto=format&fit=crop&q=80&w=200`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Play size={24} className="text-white fill-current" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold mb-2 transition-all group-hover:text-medical-purple ${isVoiceMode ? 'text-2xl text-white' : 'text-lg text-medical-dark'}`}>
                        {item.title}
                      </div>
                      <div className={`flex items-center gap-4 transition-all ${isVoiceMode ? 'text-lg text-white/40' : 'text-xs text-medical-mid'}`}>
                        <span>主讲：{item.teacher}</span>
                        <span className="w-1 h-1 bg-medical-light rounded-full" />
                        <span>时长：{item.duration}</span>
                        <span className="w-1 h-1 bg-medical-light rounded-full" />
                        <span>{item.views} 学过</span>
                      </div>
                    </div>
                  </Link>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isVoiceMode ? 'bg-white/10 text-white' : 'bg-medical-bg text-medical-mid group-hover:bg-medical-purple group-hover:text-white'}`}>
                    <ChevronRight size={20} />
                  </div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </AnimatePresence>
      </div>
      
      {/* Bottom Floating Advice (Only in Voice Mode) */}
      <AnimatePresence>
        {isVoiceMode && (
          <Motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-8 right-8 z-[60] bg-white rounded-[40px] p-8 shadow-2xl flex items-center gap-8 border-4 border-medical-purple"
          >
            <div className="w-20 h-20 bg-medical-purple rounded-3xl flex items-center justify-center text-white shrink-0">
               <Mic size={40} className="animate-pulse" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-medical-dark mb-2">正在聆听您的指令...</h4>
              <p className="text-xl text-medical-mid">您可以说：“播放高血压防治”或者“我想听秋季养生”</p>
            </div>
            <button 
              onClick={() => setIsVoiceMode(false)}
              className="ml-auto px-8 py-4 bg-medical-bg text-medical-dark rounded-2xl font-black text-xl"
            >
              关闭
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
