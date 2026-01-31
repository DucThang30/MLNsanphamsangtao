'use client';

import { useState, useEffect, useRef } from 'react';
import { Timeline1945 } from '@/components/timeline/timeline-1945';
import { Timeline1954 } from '@/components/timeline/timeline-1954';
import { Timeline1975 } from '@/components/timeline/timeline-1975';
import { Timeline1986 } from '@/components/timeline/timeline-1986';
import { Timeline1991 } from '@/components/timeline/timeline-1991';
import { Timeline2011 } from '@/components/timeline/timeline-2011';
import { ChevronRight, Star, Quote, History, Volume2, VolumeX, Home, Menu, X } from 'lucide-react';

// Dữ liệu timeline với nhạc nền phù hợp từng giai đoạn
const TIMELINE_YEARS = [
  { 
    year: 1945, 
    label: '1945', 
    title: 'ĐỘC LẬP', 
    sub: 'Khai sinh nước VNDCCH',
    bgImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/H%E1%BB%93_Ch%C3%AD_Minh_1946.jpg/1280px-H%E1%BB%93_Ch%C3%AD_Minh_1946.jpg',
    musicId: '0J0lwj4HBAuSAGeFZ5WlaE', // Nhạc cách mạng Việt Nam
    color: 'from-red-900 via-amber-800 to-red-950'
  },
  { 
    year: 1954, 
    label: '1954', 
    title: 'ĐIỆN BIÊN', 
    sub: 'Lừng lẫy năm châu',
    bgImage: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Castries_de_h%C3%A2m.jpg',
    musicId: '6GhVJ_lcRjQ', // Hò kéo pháo
    color: 'from-green-900 via-emerald-800 to-green-950'
  },
  { 
    year: 1975, 
    label: '1975', 
    title: 'THỐNG NHẤT', 
    sub: 'Non sông thu về một mối',
    bgImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Tank_390_crashing_through_the_gates_of_the_Independence_Palace.jpg/1024px-Tank_390_crashing_through_the_gates_of_the_Independence_Palace.jpg',
    musicId: 'n-ixwAqMp_w', // Như có Bác trong ngày vui đại thắng
    color: 'from-blue-900 via-sky-800 to-blue-950'
  },
  { 
    year: 1986, 
    label: '1986', 
    title: 'ĐỔI MỚI', 
    sub: 'Kỷ nguyên hội nhập',
    bgImage: 'https://cafefcdn.com/2019/3/13/photo-1-15524456570391282216597.jpg',
    musicId: 'hN_faFbOSGA', // Bài ca người thợ mỏ
    color: 'from-purple-900 via-violet-800 to-purple-950'
  },
  { 
    year: 1991, 
    label: '1991', 
    title: 'CƯƠNG LĨNH', 
    sub: 'Xây dựng đất nước',
    bgImage: 'https://dangcongsan.vn/DATA/0/2015/12/28/Dangcongsan/dhoi_7_vn_s_b_w-16_01_35_812.jpg',
    musicId: 'U_6GlkCTi8Q', // Việt Nam quê hương tôi
    color: 'from-pink-900 via-rose-800 to-pink-950'
  },
  { 
    year: 2011, 
    label: '2011', 
    title: 'PHÁT TRIỂN', 
    sub: 'Công nghiệp hóa',
    bgImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Landmark_81_view_from_Saigon_Bridge_2020.jpg',
    musicId: 'kOoM7jlfhSA', // Khát vọng
    color: 'from-teal-900 via-cyan-800 to-teal-950'
  },
];

export default function Home() {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [isExpandedView, setIsExpandedView] = useState(true);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const playerRef = useRef<any>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout>();
  const currentInfo = TIMELINE_YEARS.find(i => i.year === activeYear) || TIMELINE_YEARS[0];

  // YouTube Player API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: currentInfo.musicId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(30);
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Xử lý nhạc nền tự động bật sau 1s không tương tác
  useEffect(() => {
    const checkInactivity = () => {
      const currentTime = Date.now();
      const timeSinceLastInteraction = currentTime - lastInteractionTime;
      
      if (timeSinceLastInteraction > 1000 && isExpandedView && !isMusicPlaying) {
        setIsMusicPlaying(true);
        if (playerRef.current && playerRef.current.playVideo) {
          playerRef.current.playVideo();
        }
      }
    };

    inactivityTimerRef.current = setInterval(checkInactivity, 500);

    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  }, [lastInteractionTime, isExpandedView, isMusicPlaying]);

  // Cập nhật nhạc khi chuyển timeline
  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(currentInfo.musicId);
      if (isMusicPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [currentInfo.musicId, isMusicPlaying]);

  // Xử lý tương tác người dùng
  const handleUserInteraction = () => {
    setLastInteractionTime(Date.now());
    if (isMusicPlaying) {
      setIsMusicPlaying(false);
      if (playerRef.current && playerRef.current.pauseVideo) {
        playerRef.current.pauseVideo();
      }
    }
  };

  const handleYearSelect = (year: number) => {
    handleUserInteraction();
    setActiveYear(year);
    setShowTimeline(true);
    setIsExpandedView(false);
  };

  const handleBackToHome = () => {
    handleUserInteraction();
    setActiveYear(null);
    setShowTimeline(false);
    setIsExpandedView(true);
  };

  const toggleMusic = () => {
    handleUserInteraction();
    if (isMusicPlaying) {
      if (playerRef.current && playerRef.current.pauseVideo) {
        playerRef.current.pauseVideo();
      }
    } else {
      if (playerRef.current && playerRef.current.playVideo) {
        playerRef.current.playVideo();
      }
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const renderTimelineContent = () => {
    if (!activeYear) return null;
    
    switch (activeYear) {
      case 1945: return <Timeline1945 />;
      case 1954: return <Timeline1954 />;
      case 1975: return <Timeline1975 />;
      case 1986: return <Timeline1986 />;
      case 1991: return <Timeline1991 />;
      case 2011: return <Timeline2011 />;
      default: return null;
    }
  };

  return (
    <div 
      className="h-screen w-full bg-black overflow-hidden relative font-sans"
      onClick={handleUserInteraction}
    >
      {/* YouTube Player Ẩn */}
      <div id="youtube-player" className="hidden"></div>
      
      {/* Control Bar */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button
          onClick={toggleMusic}
          className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
            isMusicPlaying 
              ? 'bg-green-900/30 border-green-500/50 text-green-300 hover:bg-green-900/50' 
              : 'bg-red-900/30 border-red-500/50 text-red-300 hover:bg-red-900/50'
          }`}
          title={isMusicPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        >
          {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        
        {showTimeline && (
          <button
            onClick={handleBackToHome}
            className="p-3 rounded-full backdrop-blur-md bg-amber-900/30 border border-amber-500/50 text-amber-300 hover:bg-amber-900/50 hover:scale-110 transition-all duration-300"
            title="Về trang chủ"
          >
            <Home size={20} />
          </button>
        )}
        
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="p-3 rounded-full backdrop-blur-md bg-gray-900/30 border border-gray-500/50 text-gray-300 hover:bg-gray-900/50 hover:scale-110 transition-all duration-300 lg:hidden"
          title={showTimeline ? "Ẩn timeline" : "Hiện timeline"}
        >
          {showTimeline ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Music Status Indicator */}
      {isMusicPlaying && (
        <div className="fixed top-6 left-6 z-50">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-green-500/30">
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-green-400 animate-pulse" style={{animationDelay: '0ms'}}></div>
              <div className="w-1 h-6 bg-green-400 animate-pulse" style={{animationDelay: '100ms'}}></div>
              <div className="w-1 h-3 bg-green-400 animate-pulse" style={{animationDelay: '200ms'}}></div>
              <div className="w-1 h-5 bg-green-400 animate-pulse" style={{animationDelay: '300ms'}}></div>
            </div>
            <span className="text-xs text-green-300">Nhạc nền</span>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className={`h-full w-full transition-all duration-1000 ease-in-out ${
        showTimeline ? 'lg:grid lg:grid-cols-12' : ''
      }`}>
        
        {/* LEFT COLUMN - Hero Section (Fullscreen when not selected) */}
        <section className={`relative h-full overflow-hidden transition-all duration-1000 ease-in-out ${
          showTimeline ? 'lg:col-span-5' : 'w-full'
        }`}>
          
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1500 ease-in-out"
              style={{ 
                backgroundImage: `url('${currentInfo.bgImage}')`,
                filter: showTimeline ? 'brightness(0.7)' : 'brightness(0.9)'
              }}
            />
            
            {/* Animated Gradient Overlay */}
            <div className={`absolute inset-0 transition-all duration-1500 ${
              showTimeline 
                ? `bg-gradient-to-br ${currentInfo.color} opacity-90`
                : 'bg-gradient-to-br from-black/80 via-black/60 to-black/80 opacity-80'
            }`} />
            
            {/* Particle Animation */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[2px] h-[2px] bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-12">
            
            {/* Logo/Title */}
            <div className="animate-in fade-in slide-in-from-top duration-1000">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-red-600 flex items-center justify-center shadow-2xl">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-white text-sm font-bold tracking-widest uppercase opacity-80">
                    Dòng thời gian lịch sử
                  </h1>
                  <div className="text-xs text-amber-300/60 font-medium mt-1">
                    Việt Nam - Hành trình phát triển
                  </div>
                </div>
              </div>
            </div>

            {/* Year Display */}
            <div className="space-y-4 animate-in slide-in-from-left duration-1000 fade-in fill-mode-both">
              <div className="overflow-hidden">
                <h1 className={`font-serif font-black leading-none transition-all duration-1000 ${
                  showTimeline 
                    ? 'text-[8rem] lg:text-[12rem] text-white drop-shadow-2xl' 
                    : 'text-[12rem] lg:text-[18rem] text-white/90 drop-shadow-2xl'
                }`}>
                  {currentInfo.year}
                </h1>
              </div>
              
              <div className="space-y-2">
                <h2 className={`font-bold uppercase tracking-wider transition-all duration-1000 ${
                  showTimeline 
                    ? 'text-3xl lg:text-4xl text-amber-300 drop-shadow-lg' 
                    : 'text-4xl lg:text-5xl text-amber-300 drop-shadow-lg'
                }`}>
                  {currentInfo.title}
                </h2>
                
                <div className="flex items-start gap-4 max-w-lg">
                  <div className="w-2 h-full bg-gradient-to-b from-amber-500 to-red-600 rounded-full shadow-lg flex-shrink-0" />
                  <p className={`font-serif italic transition-all duration-1000 ${
                    showTimeline 
                      ? 'text-lg text-gray-300 leading-relaxed' 
                      : 'text-xl text-gray-300 leading-relaxed'
                  }`}>
                    "{currentInfo.sub}"
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Navigation */}
            <div className="animate-in fade-in slide-in-from-bottom duration-1000">
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-px bg-gradient-to-r from-amber-500 to-transparent" />
                  <span className="text-xs uppercase text-amber-300/70 tracking-widest font-bold">
                    Chọn giai đoạn khám phá
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {TIMELINE_YEARS.map((item) => {
                  const isActive = activeYear === item.year;
                  return (
                    <button
                      key={item.year}
                      onClick={() => handleYearSelect(item.year)}
                      className={`relative group rounded-xl p-4 transition-all duration-500 overflow-hidden ${
                        isActive
                          ? `scale-105 shadow-2xl border-2 ${item.color.replace('from-', 'border-').split(' ')[0]}/50`
                          : 'bg-black/20 hover:bg-black/40 border border-white/10 hover:border-amber-500/30'
                      }`}
                    >
                      {/* Item Background */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                        style={{ backgroundImage: `url('${item.bgImage}')` }}
                      />
                      
                      {/* Color Overlay */}
                      <div className={`absolute inset-0 transition-opacity duration-500 ${
                        isActive 
                          ? `opacity-80 ${item.color}` 
                          : 'opacity-0 group-hover:opacity-40 bg-gradient-to-br from-gray-900/80 to-black/80'
                      }`} />
                      
                      {/* Glow Effect */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent animate-pulse" />
                      )}
                      
                      {/* Content */}
                      <div className="relative z-10 text-left">
                        <span className={`text-2xl font-black font-serif block mb-1 ${
                          isActive 
                            ? 'text-white drop-shadow-lg' 
                            : 'text-amber-200/80 group-hover:text-white'
                        }`}>
                          {item.year}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider block ${
                          isActive 
                            ? 'text-amber-300' 
                            : 'text-white/60 group-hover:text-amber-200'
                        }`}>
                          {item.title}
                        </span>
                        
                        {isActive && (
                          <div className="absolute bottom-2 right-2 animate-bounce">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-red-500 flex items-center justify-center shadow-lg">
                              <ChevronRight className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Indicator */}
                      {!isActive && (
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-red-500/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* RIGHT COLUMN - Timeline Content */}
        {showTimeline && (
          <section className={`relative h-full overflow-hidden bg-gradient-to-br from-gray-50 to-amber-50/30 lg:col-span-7 animate-in slide-in-from-right duration-1000`}>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            {/* Content Container */}
            <div className="relative h-full overflow-y-auto custom-scrollbar">
              <div className="p-6 lg:p-12 max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="mb-8 animate-in fade-in slide-in-from-top duration-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-amber-900/60 font-semibold text-sm uppercase tracking-wider">
                        <History className="w-5 h-5" />
                        <span>Nội dung chi tiết</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-red-800 border-b border-red-800/30">
                          Giai đoạn {currentInfo.year}
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">
                        {currentInfo.title} - {currentInfo.sub}
                      </h2>
                    </div>
                    
                    {/* Music Info */}
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-amber-200">
                      <div className={`w-2 h-2 rounded-full ${isMusicPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-700">
                        {isMusicPlaying ? 'Đang phát nhạc nền' : 'Nhạc tạm dừng'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline Content */}
                <div className="animate-in fade-in slide-in-from-bottom duration-700">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-amber-200/50 shadow-lg overflow-hidden">
                    <div className="p-1">
                      <div className="bg-gradient-to-r from-amber-50/50 to-white rounded-[1.3rem] p-6 lg:p-8">
                        {renderTimelineContent()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Quote */}
                <div className="mt-16 text-center animate-in fade-in duration-1000 delay-700">
                  <div className="inline-block relative">
                    <Quote className="w-12 h-12 text-amber-900/20 absolute -top-6 -left-6" />
                    <p className="font-serif italic text-amber-900/70 text-lg px-8 py-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-amber-200/30">
                      "Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam"
                    </p>
                    <div className="text-sm text-amber-900/50 mt-4">
                      — Hồ Chí Minh
                    </div>
                  </div>
                </div>

                {/* Navigation Hint */}
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm border border-black/10">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-sm text-gray-600">
                      Chọn giai đoạn khác để khám phá thêm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-500/5 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />
          </section>
        )}

        {/* Instruction Overlay (Only shows on initial load) */}
        {isExpandedView && (
          <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none animate-in fade-in duration-1000">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <div className="relative z-50 text-center space-y-6 p-8">
              <div className="inline-block p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/20 animate-pulse">
                <div className="text-white text-4xl font-bold mb-2">👈</div>
                <p className="text-white text-lg font-medium max-w-md">
                  Chọn một mốc thời gian để bắt đầu hành trình
                </p>
                <p className="text-gray-300 text-sm mt-4">
                  Nhạc nền sẽ tự động phát sau 1 giây không tương tác
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #dc2626);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #d97706, #b91c1c);
        }
      `}</style>
    </div>
  );
}
