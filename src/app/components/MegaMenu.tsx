import React from "react";
import { Link } from "react-router";
import { motion as Motion, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowRight } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

interface NavChild {
  name: string;
  items: (string | NavItem)[];
}

interface MegaMenuProps {
  isOpen: boolean;
  children: NavChild[];
  isElderlyMode: boolean;
}

export function MegaMenu({ isOpen, children, isElderlyMode }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className={`absolute top-full left-0 mt-2 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(66,38,112,0.15)] border border-medical-light/20 overflow-hidden z-[60] transition-all duration-300 ${
            isElderlyMode ? 'w-[600px] p-10' : 'w-[480px] p-8'
          }`}
        >
          <div className="grid grid-cols-2 gap-10">
            {children.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-6">
                <div className="flex items-center justify-between group/title cursor-pointer">
                  <h4 className={`font-black text-medical-dark uppercase tracking-widest flex items-center gap-2 ${isElderlyMode ? 'text-xl' : 'text-xs'}`}>
                    <span className="w-1.5 h-1.5 bg-medical-purple rounded-full" />
                    {section.name}
                  </h4>
                  <ChevronRight size={isElderlyMode ? 20 : 14} className="text-medical-mid group-hover/title:translate-x-1 transition-transform" />
                </div>
                
                <ul className="flex flex-col gap-3">
                  {section.items.map((item, i) => {
                    const itemName = typeof item === 'string' ? item : item.name;
                    const itemPath = typeof item === 'string' ? `/health-class/${item}` : item.path;
                    
                    return (
                      <li key={i}>
                        <Link 
                          to={itemPath} 
                          className={`flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-medical-bg transition-all group/item ${
                            isElderlyMode ? 'text-lg py-4' : 'text-[13px]'
                          }`}
                        >
                          <span className="text-medical-mid font-medium group-hover/item:text-medical-purple transition-colors">
                            {itemName}
                          </span>
                          <ArrowRight size={isElderlyMode ? 18 : 12} className="text-medical-purple opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Bottom decorative bar */}
          <div className="mt-8 pt-6 border-t border-medical-light/10 flex items-center justify-between">
            <p className={`text-medical-mid/60 italic font-light ${isElderlyMode ? 'text-sm' : 'text-[10px]'}`}>
              {isElderlyMode ? "老人家，这里有您想看的所有内容" : "基于 AI 算法为您精准推荐相关板块"}
            </p>
            <button className={`text-medical-purple font-black uppercase tracking-tighter hover:underline ${isElderlyMode ? 'text-base' : 'text-[11px]'}`}>
              探索全部功能
            </button>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
