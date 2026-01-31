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

const DATA_1986: TimelineEvent[] = [
  {
    date: '1986',
    title: 'Năm 1986 - Đỉnh Điểm Của Khủng Hoảng Kinh Tế - Xã Hội',
    content: `Năm 1986 thường được nhắc đến như một năm của những con số kinh hoàng về kinh tế, là minh chứng rõ nét nhất cho sự thất bại của mô hình cũ.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.vneconomy.vn/images/upload/2024/12/12/bao-cap.jpg', 
        caption: 'Cảnh xếp hàng thời bao cấp trước Đổi Mới' 
      },
      { 
        type: 'video', 
        src: 'ikKM8nB8v44', 
        caption: 'Phim tài liệu: Đêm trước Đổi Mới - Những năm 80' 
      }
    ]
  },
  {
    date: '1986',
    title: '1.1. Siêu Lạm Phát Và Sự Sụp Đổ Của Niềm Tin Vào Đồng Tiền',
    content: `Dữ liệu lịch sử ghi nhận tỷ lệ lạm phát phi mã lên tới 774% vào cuối năm 1986. Để hình dung con số này trong một sản phẩm sáng tạo, hãy tưởng tượng giá trị đồng lương của một công nhân viên chức bốc hơi từng ngày, thậm chí từng giờ. Một người lao động nhận lương đầu tháng có thể mua được một lượng gạo nhất định, nhưng đến cuối tháng, số tiền đó chỉ còn mua được vài phần nhỏ.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.vneconomy.vn/images/upload/2023/12/24/lam-phat-1986.jpg', 
        caption: 'Lạm phát 774% năm 1986 - Đồng tiền mất giá nhanh chóng' 
      }
    ]
  },
  {
    date: '1986',
    title: '1.2. Nền Kinh Tế Khan Hiếm',
    content: `Khái niệm "nền kinh tế thiếu" của Janos Kornai hoàn toàn đúng với Việt Nam năm 1986. Không chỉ thiếu vốn, thiếu công nghệ, mà cái thiếu hiện hữu ngay trong đời sống thường nhật: thiếu gạo, thiếu vải, thiếu thuốc men, thiếu xà phòng, thiếu giấy viết cho học sinh.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/sites/default/files/styles/large/public/2022-08/cua-hang-mau-dich.jpg', 
        caption: 'Cửa hàng mậu dịch quốc doanh trống rỗng thời bao cấp' 
      }
    ]
  },
  {
    date: 'Tết Bính Dần 1986',
    title: '1.3. Bức Tranh Xã Hội Qua Lăng Kính Tết Bính Dần 1986',
    content: `Để sản phẩm sáng tạo có tính nhân văn và chạm đến cảm xúc người xem, việc tái hiện không khí Tết Bính Dần 1986 là một lựa chọn tuyệt vời. Đây được coi là "cái Tết bao cấp cuối cùng", một cột mốc văn hóa gói gọn cả nỗi gian truân và niềm hy vọng của một thế hệ.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.vneconomy.vn/images/upload/2024/01/25/tet-binh-dan-1986.jpg', 
        caption: 'Tết Bính Dần 1986 - "Cái Tết bao cấp cuối cùng"' 
      }
    ]
  },
  {
    date: '12/1986',
    title: '2. Đại Hội VI - Nhìn Thẳng Vào Sự Thật',
    content: `Đại hội đại biểu toàn quốc lần thứ VI của Đảng diễn ra vào tháng 12/1986 tại Hà Nội không mang màu sắc của những lời ca tụng sáo rỗng thường thấy trước đó. Phương châm của Đại hội là "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật".`,
    media: [
      { 
        type: 'image', 
        src: 'https://dangcongsan.vn/DATA/0/2016/12/15/Dangcongsan/dhoi%20vi%20_16_18_35_234.jpg', 
        caption: 'Đại hội Đảng toàn quốc lần thứ VI (12/1986)' 
      },
      { 
        type: 'video', 
        src: 'HH5gF0g8OJ4', 
        caption: 'Đổi Mới 1986 - Bước ngoặt lịch sử của Việt Nam' 
      }
    ]
  },
  {
    date: '1986',
    title: '3. Nội Dung Cốt Lõi Của Đổi Mới Kinh Tế',
    content: `Đại hội VI đã đề ra nội dung cốt lõi của Đổi mới kinh tế, tạo ra "phương thức" mới cho con đường phát triển XHCN ở Việt Nam. Có ba chương trình kinh tế lớn: Chương trình Lương thực – Thực phẩm được xác định là ưu tiên hàng đầu, Chương trình Hàng tiêu dùng ra đời nhằm khắc phục tình trạng khan hiếm, và Chương trình Hàng xuất khẩu được triển khai trong bối cảnh nền kinh tế thiếu ngoại tệ.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.vneconomy.vn/images/upload/2024/06/24/doimoi-kinhte.jpg', 
        caption: 'Ba chương trình kinh tế lớn - Đảo chiều chiến lược phát triển' 
      },
      { 
        type: 'image', 
        src: 'https://media.baodautu.vn/Images/chicuong/2022/08/15/kinh-te-nhieu-thanh-phan.jpg', 
        caption: 'Kinh tế nhiều thành phần được thừa nhận từ Đại hội VI' 
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

export function Timeline1986({ containerRef }: TimelineProps) {
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
          {DATA_1986.map((event, idx) => {
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
                          className="w-full text-left rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
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
        <p className="mt-1">© 1986-2024 - Kỷ niệm Đổi Mới - Bước ngoặt lịch sử của Việt Nam</p>
      </div>
    </>
  );
}
