'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { createPortal } from 'react-dom';

// --- CẤU TRÚC DỮ LIỆU ---
interface MediaItem {
  type: 'image' | 'video';
  src: string;
  caption: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  content: string;
  media: MediaItem[];
}

const DATA_1975: TimelineEvent[] = [
  {
    date: '04-08/03/1975',
    title: 'Chiến dịch Tây Nguyên - Trận then chốt Buôn Ma Thuột',
    content: `04/03: Quân Giải phóng bắt đầu tiến công khu vực Tây Nguyên.
10/03: Mở màn trận then chốt Buôn Ma Thuột.
14/03: Giải phóng hoàn toàn Buôn Ma Thuột.

Chiến dịch Tây Nguyên là đòn tiến công chiến lược đầu tiên, tạo bước ngoặt quan trọng, đánh bại Quân đoàn 2 của chính quyền Sài Gòn, mở ra cục diện mới cho toàn chiến trường.`,
    media: [
      { 
        type: 'image', 
        src: 'https://cdnmedia.baotintuc.vn/2015/03/10/15/44/taynguyen4.jpg', 
        caption: 'Bồ đội tiến đánh chiến dịch Tây Nguyên' 
      },
      { 
        type: 'image', 
        src: 'https://image.sggp.org.vn/w1000/Uploaded/2026/ohpohuo/2023_03_10/j3a-8878.jpg.webp', 
        caption: 'Trận đánh tại Buôn Ma Thuột' 
      },
      { 
        type: 'video', 
        src: 'h98d6lr09qA', 
        caption: 'Chiến dịch Tây Nguyên 1975' 
      }
    ]
  },
  {
    date: '19-25/03/1975',
    title: 'Giải phóng Quảng Trị, Thừa Thiên Huế',
    content: `19/03: Giải phóng thị xã Quảng Trị.
21/03: Cô Lô - Ái Tử hoàn toàn giải phóng.
24/03: Các hướng tiến công vào Huế.
25/03: Tập đoàn phòng ngự Huế bị chia cắt.
26/03: Giải phóng hoàn toàn thành phố Huế.

Huế - cố đô của dân tộc được giải phóng, đánh dấu sự sụp đổ của hệ thống phòng thủ từ xa của đối phương.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_03_26/hue_giaiphong_ykqu.jpg', 
        caption: 'Cờ giải phóng tung bay trên Kỳ Đài Huế' 
      },
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_03_26/hue_1975_1_vquh.jpg', 
        caption: 'Nhân dân Huế đón chào bộ đội' 
      }
    ]
  },
  {
    date: '28-29/03/1975',
    title: 'Giải phóng Đà Nẵng',
    content: `28/03: Các cánh quân tiến vào Đà Nẵng.
29/03: 10h30 - Giải phóng hoàn toàn Đà Nẵng.

Đà Nẵng - thành phố lớn thứ hai miền Nam, trung tâm quân sự quan trọng bị giải phóng chỉ sau 2 ngày tiến công. Sự sụp đổ của Đà Nẵng khiến toàn bộ hệ thống phòng thủ của đối phương ở miền Trung tan rã.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_03_29/danang_oyag.jpg', 
        caption: 'Bộ đội tiến vào Đà Nẵng' 
      },
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_03_29/danang_1975_2_yapm.jpg', 
        caption: 'Nhân dân Đà Nẵng chào đón giải phóng' 
      },
      { 
        type: 'video', 
        src: 'mce2FvKZ-PI', 
        caption: 'Giải phóng Đà Nẵng 1975' 
      }
    ]
  },
  {
    date: '09/04/1975',
    title: 'Chiến dịch Xuân Lộc bắt đầu',
    content: `09/04: Mở màn Chiến dịch Xuân Lộc - cửa ngõ phía Đông Sài Gòn.
21/04: Sau 12 ngày chiến đấu, Xuân Lộc hoàn toàn giải phóng.

Xuân Lộc là trận then chốt cuối cùng trên đường tiến vào Sài Gòn. Việc giải phóng Xuân Lộc đã chọc thủng tuyến phòng thủ vòng ngoài của Sài Gòn.`,
    media: [
      { 
        type: 'image', 
        src: 'https://baotanglichsu.vn/uploads/news/2021_04/xuan-loc-1975-1.jpg', 
        caption: 'Trận Xuân Lộc - cửa ngõ Sài Gòn' 
      }
    ]
  },
  {
    date: '21/04/1975',
    title: 'Tổng thống Nguyễn Văn Thiệu từ chức',
    content: `Trước thất bại quân sự liên tiếp, Tổng thống Nguyễn Văn Thiệu tuyên bố từ chức trong bài diễn văn dài trên đài truyền hình Sài Gòn.

Ông giao quyền lại cho Phó tổng thống Trần Văn Hương. Sự kiện này cho thấy sự khủng hoảng sâu sắc của chính quyền Sài Gòn.`,
    media: [
      { 
        type: 'image', 
        src: 'https://baotanglichsu.vn/uploads/news/2020_04/nguyen-van-thieu-tu-chuc-ngay-21-4-1975-1.jpg', 
        caption: 'Nguyễn Văn Thiệu từ chức ngày 21/4/1975' 
      }
    ]
  },
  {
    date: '26-28/04/1975',
    title: 'Chiến dịch Hồ Chí Minh - Tổng tiến công',
    content: `26/04: 5 cánh quân của Chiến dịch Hồ Chí Minh bắt đầu tổng tiến công.
27/04: Đánh chiếm các căn cứ quân sự quan trọng quanh Sài Gòn.
28/04: Bao vây và siết chặt vòng vây quanh Sài Gòn.

Đây là chiến dịch quyết định cuối cùng nhằm giải phóng hoàn toàn miền Nam.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_04_26/chiendichhcm_1975_1_ypfy.jpg', 
        caption: 'Bộ đội hành quân trong Chiến dịch Hồ Chí Minh' 
      },
      { 
        type: 'video', 
        src: 'c4IRIvwmGL8', 
        caption: 'Chiến dịch Hồ Chí Minh' 
      }
    ]
  },
  {
    date: '30/04/1975',
    title: 'GIẢI PHÓNG HOÀN TOÀN MIỀN NAM',
    content: `10h45: Xe tăng 843 (390) húc đổ cổng chính Dinh Độc Lập.
11h30: Xe tăng 843 tiến vào sân Dinh Độc Lập.
Quân Giải phóng chiếm Dinh, bắt toàn bộ nội các chính quyền Sài Gòn.

Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện.

11h30 cùng ngày: Lá cờ Mặt trận Dân tộc Giải phóng tung bay trên nóc Dinh Độc Lập, đánh dấu miền Nam hoàn toàn giải phóng, đất nước thống nhất.`,
    media: [
      { 
        type: 'image', 
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Tank_390_crashing_through_the_gates_of_the_Independence_Palace.jpg/1024px-Tank_390_crashing_through_the_gates_of_the_Independence_Palace.jpg', 
        caption: 'Xe tăng 390 húc đổ cổng Dinh Độc Lập' 
      },
      { 
        type: 'image', 
        src: 'https://media.vov.vn/sites/default/files/styles/large/public/2024-04/30.4.1975.jpg', 
        caption: 'Cờ giải phóng trên nóc Dinh Độc Lập' 
      },
      { 
        type: 'image', 
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Surrender_of_South_Vietnam.jpg/800px-Surrender_of_South_Vietnam.jpg', 
        caption: 'Tổng thống Dương Văn Minh tuyên bố đầu hàng' 
      },
      { 
        type: 'video', 
        src: 'mce2FvKZ-PI', 
        caption: 'Toàn cảnh ngày 30/4/1975' 
      }
    ]
  },
  {
    date: '01/05/1975',
    title: 'Toàn miền Nam được giải phóng',
    content: `Sau khi Sài Gòn giải phóng, các tỉnh còn lại ở miền Nam lần lượt được giải phóng:

- Cần Thơ: 30/4
- Vĩnh Long: 30/4
- Cà Mau: 01/5
- Các tỉnh Đồng bằng sông Cửu Long: 01-02/5

Đến ngày 02/5/1975, toàn bộ lãnh thổ miền Nam Việt Nam hoàn toàn giải phóng.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_05_01/giaiphong_mien_nam_1_oxpv.jpg', 
        caption: 'Lễ chào cờ đầu tiên sau giải phóng' 
      }
    ]
  }
];

// ==================== MODAL COMPONENT DÙNG PORTAL ====================
function ModalPortal({ media, onClose }: { media: MediaItem; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-portal-open');

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-portal-open');
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div 
        className="fixed inset-0 z-[9998] bg-black/95 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div 
          ref={modalRef}
          className="relative w-full max-w-6xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl animate-zoom-in pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/80 hover:bg-black text-white rounded-full p-3 transition-all hover:scale-110 hover:rotate-90"
            aria-label="Đóng"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          {media.type === 'video' ? (
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${media.src}?autoplay=1&rel=0&modestbranding=1`}
                title={media.caption}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full h-[70vh] flex items-center justify-center p-8">
              <img
                src={media.src}
                className="max-w-full max-h-full object-contain rounded-lg"
                alt={media.caption}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x600/333333/cccccc?text=Không+tải+được+ảnh';
                  target.className = 'max-w-full max-h-full object-contain opacity-60 rounded-lg';
                }}
              />
            </div>
          )}
          
          <div className="bg-gradient-to-t from-black via-black to-transparent px-6 py-4">
            <p className="text-white text-lg font-semibold text-center">
              {media.caption}
            </p>
            <p className="text-gray-400 text-sm text-center mt-1">
              {media.type === 'image' ? 'Ảnh' : 'Video'} • 
              {isMobile ? ' Chạm ra ngoài' : ' Click ra ngoài'} để đóng • Nhấn ESC
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

// ==================== COMPONENT CHÍNH ====================
interface TimelineProps {
  containerRef?: React.RefObject<HTMLDivElement>;
}

export function Timeline1975({ containerRef }: TimelineProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMedia(null);
    };
    
    if (selectedMedia) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [selectedMedia]);

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-12">
          {DATA_1975.map((event, idx) => {
            const isShortContent = event.content.split(/\s+/).length < 150;

            return (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {event.date} – {event.title}
                  </h3>
                </div>

                <div className={isShortContent ? 'grid grid-cols-1 lg:grid-cols-3 gap-8' : 'space-y-6'}>
                  <div className={isShortContent ? 'lg:col-span-2' : ''}>
                    {event.content.split('\n\n').map((p, i) => (
                      <p key={i} className="mb-4 text-gray-700 text-lg leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  {event.media.length > 0 && (
                    <div className="space-y-4">
                      {event.media.map((m, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedMedia(m)}
                          className="w-full text-left rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <div className="aspect-video bg-gray-100 relative">
                            {m.type === 'image' ? (
                              <img
                                src={m.src}
                                className="w-full h-full object-cover"
                                alt={m.caption}
                                loading="lazy"
                              />
                            ) : (
                              <>
                                <img
                                  src={`https://img.youtube.com/vi/${m.src}/hqdefault.jpg`}
                                  className="w-full h-full object-cover"
                                  alt={m.caption}
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
                                    <Play className="w-7 h-7 text-white ml-1" />
                                  </div>
                                </div>
                              </>
                            )}
                            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {m.type === 'image' ? 'ẢNH' : 'VIDEO'}
                            </div>
                          </div>
                          <div className="p-4 bg-white">
                            <div className="font-semibold text-gray-900">{m.caption}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedMedia && (
        <ModalPortal 
          media={selectedMedia} 
          onClose={() => setSelectedMedia(null)} 
        />
      )}

      {/* Footer đơn giản */}
      <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
        <p>Nguồn tư liệu: Bảo tàng Lịch sử Quân sự Việt Nam, Thông tấn xã Việt Nam</p>
        <p className="mt-1">© 1975-2024 - Kỷ niệm 49 năm Ngày Giải phóng miền Nam, thống nhất đất nước</p>
      </div>
    </>
  );
}
