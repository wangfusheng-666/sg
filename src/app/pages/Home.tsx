import React from "react";
import { Link } from "react-router";
import { 
  ArrowRight, 
  FileText, 
  BookOpen, 
  Activity, 
  Map, 
  PhoneCall, 
  UserCircle,
  Play,
  Heart,
  TrendingUp,
  Mail,
  Volume2,
  Stethoscope,
  Smile,
  ShieldAlert
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useHealthMode } from "../context/HealthModeContext";

const mockChartData = [
  { name: 'Mon', val: 72 },
  { name: 'Tue', val: 78 },
  { name: 'Wed', val: 75 },
  { name: 'Thu', val: 82 },
  { name: 'Fri', val: 88 },
  { name: 'Sat', val: 85 },
  { name: 'Sun', val: 80 },
];

export function Home() {
  const { isElderlyMode } = useHealthMode();

  return (
    <div className={`overflow-x-hidden transition-all duration-500 ${isElderlyMode ? 'text-lg' : ''}`}>
      {/* Hero Section */}
      <section className={`relative flex items-center pt-20 pb-32 transition-all duration-500 ${isElderlyMode ? 'min-h-[800px]' : 'min-h-[700px]'}`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwY29uc3VsdGF0aW9uJTIwY29tbXVuaXR5JTIwZWxkZXJseSUyMGNhcmUlMjBoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzUwMTAxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-dark/95 via-medical-dark/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full font-medium mb-6 border border-white/20 transition-all ${isElderlyMode ? 'text-base' : 'text-xs'}`}>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {isElderlyMode ? "您的健康管家已就绪" : "智能社区医疗服务领航者"}
            </div>
            <h1 className={`font-black mb-6 leading-[1.1] tracking-tighter transition-all ${isElderlyMode ? 'text-6xl md:text-8xl' : 'text-5xl md:text-7xl'}`}>
              {isElderlyMode ? (
                <>智慧养老<br />就在身边</>
              ) : (
                <>智慧赋能<br />领航健康</>
              )}
            </h1>
            <p className={`max-w-xl mb-10 leading-relaxed font-light transition-all ${isElderlyMode ? 'text-2xl text-white/90' : 'text-lg text-white/70'}`}>
              {isElderlyMode 
                ? "老人家，这里有会说话的医生，还有能帮您记健康的小管家。点一点，医生就在您身边。" 
                : "融合 AI 智能诊断、远程会诊与紧急救援，智健小康为您提供全生命周期的社区健康管理方案，守护您与家人的每一刻。"}
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <Link to="/health-class" className={`bg-medical-purple text-white rounded-2xl flex items-center gap-3 hover:bg-medical-dark transition-all shadow-xl shadow-medical-purple/30 group ${isElderlyMode ? 'px-12 py-6 text-2xl' : 'px-8 py-4 text-base'} font-bold`}>
                {isElderlyMode ? "听听怎么变健康" : "开启健康学习"} <Play size={isElderlyMode ? 28 : 18} className="fill-current" />
              </Link>
              <Link to="/ai-health" className={`bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/20 transition-all ${isElderlyMode ? 'px-12 py-6 text-2xl' : 'px-8 py-4 text-base'}`}>
                {isElderlyMode ? "找小管家帮帮忙" : "AI 智能诊断"} <ArrowRight size={isElderlyMode ? 28 : 18} />
              </Link>
            </div>

            <div className={`grid grid-cols-3 gap-8 transition-all ${isElderlyMode ? 'bg-white/5 p-6 rounded-3xl' : ''}`}>
              <div>
                <div className={`font-black tabular-nums transition-all ${isElderlyMode ? 'text-5xl' : 'text-3xl'}`}>24.5k</div>
                <div className={`mt-1 transition-all ${isElderlyMode ? 'text-lg text-white/80' : 'text-xs text-white/50'}`}>{isElderlyMode ? "一起用的老伙计" : "活跃用户"}</div>
              </div>
              <div>
                <div className={`font-black tabular-nums transition-all ${isElderlyMode ? 'text-5xl' : 'text-3xl'}`}>98%</div>
                <div className={`mt-1 transition-all ${isElderlyMode ? 'text-lg text-white/80' : 'text-xs text-white/50'}`}>{isElderlyMode ? "都能找得到的服务" : "服务覆盖"}</div>
              </div>
              <div>
                <div className={`font-black tabular-nums transition-all ${isElderlyMode ? 'text-5xl' : 'text-3xl'}`}>120+</div>
                <div className={`mt-1 transition-all ${isElderlyMode ? 'text-lg text-white/80' : 'text-xs text-white/50'}`}>{isElderlyMode ? "在线等您的好医生" : "在线专家"}</div>
              </div>
            </div>
          </Motion.div>

          {/* Floating Widgets Section */}
          <div className="relative hidden lg:block h-[500px]">
            <Motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`absolute top-0 right-0 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-6 shadow-2xl overflow-hidden transition-all ${isElderlyMode ? 'w-[400px] p-8' : 'w-[320px] p-6'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`bg-green-500 rounded-full flex items-center justify-center text-white transition-all ${isElderlyMode ? 'w-10 h-10' : 'w-8 h-8'}`}>
                    <TrendingUp size={isElderlyMode ? 20 : 16} />
                  </div>
                  <span className={`text-white font-medium transition-all ${isElderlyMode ? 'text-lg' : 'text-sm'}`}>{isElderlyMode ? "身体棒不棒" : "实时健康监测"}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 bg-yellow-400 rounded-full font-bold text-medical-dark transition-all ${isElderlyMode ? 'text-xs' : 'text-[10px]'}`}>
                   <Activity size={isElderlyMode ? 14 : 10} /> {isElderlyMode ? "管家提醒" : "智能提醒"}
                </div>
              </div>
              <div className="w-full mb-4 min-h-[100px]">
                <ResponsiveContainer width="100%" height={isElderlyMode ? 120 : 100} minWidth={0} minHeight={0}>
                  <AreaChart data={mockChartData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#A855F7" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className={`text-white opacity-60 mb-1 transition-all ${isElderlyMode ? 'text-sm' : 'text-xs'}`}>{isElderlyMode ? "小管家想对您说：" : "AI 实时分析："}</div>
              <div className={`text-white font-bold mb-2 transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>{isElderlyMode ? "老人家，今天心跳很稳，身体真好！" : "您的心率正处于理想状态"}</div>
              <div className="flex items-center gap-2 mb-4">
                <div className={`bg-green-500/20 text-green-400 rounded-full flex items-center justify-center font-bold transition-all ${isElderlyMode ? 'w-12 h-12 text-lg' : 'w-8 h-8 text-[10px]'}`}>
                  86分
                </div>
                <div className={`text-white/50 transition-all ${isElderlyMode ? 'text-sm' : 'text-[10px]'}`}>{isElderlyMode ? "比昨天更精神了" : "健康指数上升 2.3%"}</div>
              </div>
              <Link to="/ai-health" className={`block w-full bg-medical-purple/50 hover:bg-medical-purple text-white rounded-xl font-bold transition-all text-center ${isElderlyMode ? 'py-4 text-lg' : 'py-2 text-xs'}`}>
                {isElderlyMode ? "点这里看报告" : "查看详情报告"}
              </Link>
            </Motion.div>

            <Motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className={`absolute bottom-20 right-[280px] bg-white rounded-3xl shadow-2xl border border-medical-light/20 transition-all ${isElderlyMode ? 'w-[220px] p-8' : 'w-[180px] p-6'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-red-100 text-red-500 rounded-xl transition-all ${isElderlyMode ? 'p-3' : 'p-2'}`}>
                  <Heart size={isElderlyMode ? 28 : 20} fill="currentColor" />
                </div>
                <span className={`font-bold text-medical-dark transition-all ${isElderlyMode ? 'text-lg' : 'text-xs'}`}>{isElderlyMode ? "心脏跳动" : "心率数据"}</span>
              </div>
              <div className={`font-black text-medical-dark tracking-tight transition-all ${isElderlyMode ? 'text-5xl' : 'text-3xl'}`}>120<span className={`font-medium ml-1 transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>次</span></div>
              <div className={`text-medical-mid mt-1 font-medium italic transition-all ${isElderlyMode ? 'text-xs' : 'text-[10px]'}`}>{isElderlyMode ? "正在帮您测心跳" : "实时心率数据检测"}</div>
            </Motion.div>

            <Motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className={`absolute bottom-0 right-0 bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-medical-light/20 transition-all ${isElderlyMode ? 'w-[200px]' : 'w-[160px]'}`}
            >
              <div className={`w-full bg-medical-purple/20 rounded-2xl flex items-center justify-center text-medical-purple transition-all ${isElderlyMode ? 'h-32' : 'h-24'}`}>
                 <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1630443319593-261711fc8a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className={`text-center font-bold text-medical-dark mt-2 transition-all ${isElderlyMode ? 'text-sm' : 'text-[10px]'}`}>{isElderlyMode ? "最近的救护车在哪" : "就近急救站分布"}</div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section className={`py-24 bg-white transition-all duration-500 ${isElderlyMode ? 'py-32' : 'py-24'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className={`font-black text-medical-dark mb-4 transition-all ${isElderlyMode ? 'text-5xl' : 'text-3xl'}`}>
            {isElderlyMode ? "我们能帮您做点啥" : "智能健康核心模块"}
          </h2>
          <p className={`text-medical-mid max-w-2xl mx-auto transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>
            {isElderlyMode ? "简单好用，点开就能看，还有小管家帮您读" : "集成最先端 AI 技术的社区综合健康管理服务体系"}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: isElderlyMode ? "看健康" : "AI 智能文件", 
              desc: isElderlyMode ? "看健康：您的病历和体检表，小管家都帮您收好了，随时能翻看。" : "数字化管理电子病历、体检及体检报告，支持一键调取和多端同步。", 
              icon: FileText, 
              color: "bg-blue-500", 
              light: "bg-blue-50",
              tag: isElderlyMode ? "帮您记" : "Hot",
              path: "/ai-visual/reports"
            },
            { 
              title: isElderlyMode ? "听健康" : "健康知识库", 
              desc: isElderlyMode ? "听健康：这里有医生讲的长寿秘诀，不用看字，点开就能听。" : "根据个人身体状况推送专家视频和科普文章，协助建立科学生活习惯。", 
              icon: Volume2, 
              color: "bg-indigo-600", 
              light: "bg-indigo-50",
              path: "/health-class"
            },
            { 
              title: isElderlyMode ? "养健康" : "AI 健康管理", 
              desc: isElderlyMode ? "养健康：帮您看每天走多少路，吃得够不够营养，觉睡得香不香。" : "针对睡眠、运动及饮食的自动评分与个性化改善建议。", 
              icon: Activity, 
              color: "bg-violet-500", 
              light: "bg-violet-50",
              path: "/ai-health"
            },
            { 
              title: isElderlyMode ? "找专家" : "医疗全景图", 
              desc: isElderlyMode ? "找专家：帮您看看社区里有哪些好医生，怎么去医院最方便。" : "单位社区多级网络，汇总区域内所有专家门诊和救助资源。", 
              icon: Stethoscope, 
              color: "bg-teal-500", 
              light: "bg-teal-50",
              path: "/emergency"
            },
            { 
              title: isElderlyMode ? "叫急救" : "智慧急救站", 
              desc: isElderlyMode ? "叫急救：遇到急事点红按钮，医生马上跟您说话，救护车这就来。" : "一键触发 SOS 紧急呼救，实时位置追踪并与医疗中心视频通话。", 
              icon: ShieldAlert, 
              color: "bg-red-500", 
              light: "bg-red-50",
              path: "/emergency"
            },
            { 
              title: isElderlyMode ? "数字管家" : "个人数字分身", 
              desc: isElderlyMode ? "数字管家：在手机里变出一个健康的您，帮您算算怎么活得更久。" : "构建您专属的健康数字模型，模拟不同生活习惯对身体的长期影响。", 
              icon: Smile, 
              color: "bg-orange-500", 
              light: "bg-orange-50",
              path: "/ai-health"
            },
          ].map((item, i) => (
            <Link key={i} to={item.path} className="block">
              <Motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-10 rounded-[40px] bg-medical-bg/20 hover:bg-white border border-transparent hover:border-medical-light/30 hover:shadow-2xl hover:shadow-medical-purple/10 transition-all cursor-pointer group flex flex-col items-center text-center h-full`}
              >
                <div className="flex justify-between items-start mb-8 w-full">
                  <div className={`${isElderlyMode ? 'w-20 h-20' : 'w-14 h-14'} ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-all`}>
                    <item.icon size={isElderlyMode ? 40 : 28} />
                  </div>
                  {item.tag && (
                    <span className={`bg-medical-dark text-white px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-all ${isElderlyMode ? 'text-sm' : 'text-[10px]'}`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <h3 className={`font-bold text-medical-dark mb-4 group-hover:text-medical-purple transition-all ${isElderlyMode ? 'text-3xl' : 'text-xl'}`}>{item.title}</h3>
                <p className={`text-medical-mid leading-relaxed mb-8 font-light transition-all ${isElderlyMode ? 'text-xl' : 'text-sm'}`}>
                  {item.desc}
                </p>
                <div className={`flex items-center gap-2 text-medical-dark font-black uppercase tracking-widest group-hover:gap-4 transition-all mt-auto ${isElderlyMode ? 'text-lg' : 'text-xs'}`}>
                  {isElderlyMode ? "点这里进入" : "立即进入"} <ArrowRight size={isElderlyMode ? 20 : 14} className="text-medical-purple" />
                </div>
              </Motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative rounded-[60px] overflow-hidden bg-medical-dark text-white flex flex-col lg:flex-row items-center min-h-[500px]">
            <div className="absolute inset-0 z-0">
               <ImageWithFallback 
                src="https://images.unsplash.com/photo-1704475686860-ab71b444df6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY2FyZSUyMGNvbW11bml0eSUyMGhhcHBpbmVzcyUyMGhlYWx0aGNhcmUlMjBzdXBwb3J0JTIwaG9tZSUyMGNhcmUlMjBwcm9mZXNzaW9uYWwlMjBzbWlsaW5nJTIwc2VuaW9yJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NzUwMTAxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            
            <div className={`relative z-10 flex-1 p-12 lg:p-20 transition-all ${isElderlyMode ? 'lg:p-24' : 'lg:p-20'}`}>
              <h2 className={`font-black mb-8 leading-tight tracking-tighter transition-all ${isElderlyMode ? 'text-5xl lg:text-7xl' : 'text-4xl lg:text-5xl'}`}>
                {isElderlyMode ? <>陪伴，是最好的<br />健康良药</> : <>连接每一份<br />温暖的守护</>}
              </h2>
              <p className={`text-white/70 max-w-lg mb-12 font-light leading-relaxed transition-all ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}>
                {isElderlyMode ? "我们这有上百位热心的社区医生，24小时等着跟您聊天。不管哪里不舒服，尽管找我们，像家里人一样照顾您。" : "智健小康不仅是一套 AI 系统，更链接了社区居民与专业医疗人员的桥梁。我们组建了近百人的社区医生专家团队，为您提供 7x24 小时的在线问诊与健康指导。"}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/messages" className={`bg-white text-medical-dark rounded-2xl font-bold hover:scale-105 transition-all shadow-xl flex items-center justify-center ${isElderlyMode ? 'px-14 py-6 text-2xl' : 'px-10 py-4 text-base'}`}>
                  {isElderlyMode ? "点这就找好医生" : "预约在线专家"}
                </Link>
                <Link to="/health-class" className={`bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center ${isElderlyMode ? 'px-14 py-6 text-2xl' : 'px-10 py-4 text-base'}`}>
                  {isElderlyMode ? "看看家门口的义诊" : "了解社区义诊计划"}
                </Link>
              </div>
            </div>

            <div className="relative z-10 w-full lg:w-1/3 flex justify-center p-12 lg:p-0">
              <div className={`bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center animate-pulse transition-all ${isElderlyMode ? 'w-80 h-80' : 'w-64 h-64'}`}>
                <div className={`bg-white/10 rounded-full flex items-center justify-center transition-all ${isElderlyMode ? 'w-64 h-64' : 'w-48 h-48'}`}>
                  <Heart size={isElderlyMode ? 120 : 80} className="text-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className={`font-black text-medical-dark mb-4 transition-all ${isElderlyMode ? 'text-4xl' : 'text-3xl'}`}>
            {isElderlyMode ? "每月送您一份健康贴士" : "订阅您的个性化健康月报"}
          </h2>
          <p className={`text-medical-mid mb-10 transition-all ${isElderlyMode ? 'text-xl' : 'text-base'}`}>
            {isElderlyMode ? "留下您的邮箱，我们每个月帮您看看身体，给您最贴心的建议。" : "我们会根据您的日常记录，每月为您提供深度的健康走势与建议。"}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 p-2 bg-medical-bg/30 rounded-3xl border border-medical-light/20 transition-all ${isElderlyMode ? 'p-4 rounded-[40px]' : 'p-2'}`}>
            <div className="flex-1 flex items-center px-4 gap-3">
              <Mail className="text-medical-mid" size={isElderlyMode ? 28 : 20} />
              <input 
                type="email" 
                placeholder={isElderlyMode ? "写下您的邮箱地址" : "输入您的电子邮箱地址"} 
                className={`bg-transparent border-none focus:ring-0 text-medical-dark w-full transition-all ${isElderlyMode ? 'py-5 text-xl' : 'py-3 text-base'}`}
              />
            </div>
            <button className={`bg-medical-dark text-white rounded-2xl font-bold hover:bg-medical-purple transition-all shadow-lg whitespace-nowrap ${isElderlyMode ? 'px-14 py-6 text-2xl' : 'px-10 py-4 text-base'}`}>
              {isElderlyMode ? "这就订阅" : "立即订阅"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
