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

const DATA_2011: TimelineEvent[] = [
  {
    date: '2011 – 2013',
    title: 'Bối Cảnh Mới Và Yêu Cầu Đổi Mới Thể Chế',
    content: `Năm 2011 đánh dấu thời điểm Việt Nam bước sang một giai đoạn phát triển mới của thời kỳ quá độ lên chủ nghĩa xã hội. Sau hơn 25 năm đổi mới, đất nước đã đạt được nhiều thành tựu quan trọng về kinh tế – xã hội, thoát khỏi tình trạng kém phát triển, đồng thời hội nhập ngày càng sâu rộng vào nền kinh tế thế giới.
Trong bối cảnh đó, theo lý luận Chủ nghĩa xã hội khoa học, khi lực lượng sản xuất phát triển ở trình độ cao hơn và các quan hệ xã hội trở nên đa dạng, phức tạp, thì việc quản lý xã hội bằng pháp luật và hoàn thiện thể chế chính trị trở thành yêu cầu tất yếu. Thực tiễn đặt ra đòi hỏi Nhà nước không chỉ điều hành kinh tế mà còn phải bảo đảm dân chủ, công bằng xã hội và ổn định chính trị.
Giai đoạn 2011–2013 vì vậy được xem là giai đoạn định hình tư duy xây dựng Nhà nước pháp quyền xã hội chủ nghĩa, chuẩn bị cơ sở lý luận và thực tiễn cho những cải cách thể chế sâu rộng trong các giai đoạn tiếp theo.
Video giới thiệu những nội dung cơ bản và đổi mới quan trọng của Hiến pháp 2013 – nền tảng pháp lý cho Nhà nước pháp quyền XHCN.
`,
    media: [
      { 
        type: 'image', 
        src: 'https://i.ex-cdn.com/nongnghiepmoitruong.vn/files/content/2025/05/05/bieu-quyet-o-quoc-hoi-edited-1739930784932jpeg-083604_215-085819.jpg', 
        caption: 'Phiên họp Quốc hội thông qua Hiến pháp 2013' 
      },
      { 
        type: 'video', 
        src: 'jDMeEJp9o7U', 
        caption: 'Giới thiệu Hiến pháp 2013' 
      }
    ]
  },
  {
    date: '2013',
    title: 'Hiến Pháp 2013 – Nền Tảng Pháp Lý Của Nhà Nước Pháp Quyền XHCN',
    content: `Năm 2013, Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam được thông qua, đánh dấu một bước phát triển quan trọng trong quá trình hoàn thiện thể chế chính trị ở Việt Nam. Hiến pháp năm 2013 đã chính thức hiến định bản chất của Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam là Nhà nước của Nhân dân, do Nhân dân và vì Nhân dân, qua đó khẳng định rõ quyền lực nhà nước thuộc về Nhân dân và được thực hiện thông qua hệ thống pháp luật.
Theo quan điểm của Chủ nghĩa xã hội khoa học, Nhà nước trong thời kỳ quá độ lên chủ nghĩa xã hội không chỉ giữ vai trò là công cụ quản lý xã hội mà còn là nhân tố tổ chức, định hướng và thúc đẩy sự phát triển xã hội theo con đường xã hội chủ nghĩa. Hiến pháp năm 2013 đã cụ thể hóa vai trò đó bằng việc đề cao và bảo đảm quyền con người, quyền và nghĩa vụ cơ bản của công dân, đồng thời xác lập nguyên tắc quyền lực nhà nước là thống nhất nhưng có sự phân công, phối hợp và kiểm soát giữa các cơ quan trong bộ máy nhà nước. Bên cạnh đó, Hiến pháp cũng khẳng định vị trí trung tâm của pháp luật trong quản lý xã hội, góp phần xây dựng nền dân chủ xã hội chủ nghĩa ngày càng hoàn thiện.
Với những nội dung mang tính nền tảng đó, giai đoạn 2013–2016 được xem là giai đoạn đặt cơ sở pháp lý quan trọng cho việc xây dựng và vận hành Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam trong thời kỳ mới.
 Video tổng quan về Hiến pháp Việt Nam, lịch sử hiến pháp và vai trò hiến pháp trong xây dựng Nhà nước pháp quyền
`,
    media: [
      { 
        type: 'video', 
        src: 'MtPR4JDzcJ8', 
        caption: 'Hiến pháp Việt Nam - xây dựng Nhà nước của dân, do dân và vì dân' 
      }
    ]
  },
  {
    date: '2016 – 2020',
    title: 'Cải Cách Bộ Máy Nhà Nước Và Phòng, Chống Tham Nhũng',
    content: `Từ năm 2016, quá trình hoàn thiện thể chế xã hội chủ nghĩa được đẩy mạnh thông qua cải cách tổ chức bộ máy nhà nước và tăng cường phòng, chống tham nhũng. Đây là yêu cầu khách quan xuất phát từ thực tiễn phát triển kinh tế thị trường định hướng xã hội chủ nghĩa, nơi tồn tại nhiều thành phần kinh tế đan xen.
Theo lý luận CNXH khoa học, để bảo đảm bản chất xã hội chủ nghĩa, Nhà nước phải hoạt động liêm chính, hiệu lực và hiệu quả, đặt lợi ích của Nhân dân lên trên hết. Vì vậy, việc tinh gọn bộ máy, cải cách hành chính và đấu tranh chống tham nhũng không chỉ mang ý nghĩa quản lý mà còn mang ý nghĩa bảo vệ bản chất của chế độ xã hội chủ nghĩa.
Trong giai đoạn này, vai trò của Nhà nước pháp quyền XHCN được thể hiện rõ thông qua việc tăng cường kỷ cương pháp luật, củng cố niềm tin của Nhân dân và tạo môi trường ổn định cho phát triển kinh tế – xã hội.
`,
    media: [
      { 
        type: 'image', 
        src: 'https://bcp.cdnchinhphu.vn/334894974524682240/2022/10/13/img0671-16656254057851714890667.jpg', 
        caption: ' Họp Chính phủ, tiếp xúc cử tri' 
      },
      { 
        type: 'image', 
        src: 'https://media.thanhtra.com.vn/public/data/images/0/2024/09/24/nguyennhuan/gb.jpg?w=600&h=400', 
        caption: 'hoạt động thanh tra, kiểm tra pháp luật, chiến dịch phòng, chống tham nhũng' 
      },
      { 
        type: 'video', 
        src: 'aC9d8eBq5Re', 
        caption: 'Việt Nam hội nhập: Hành trình 2011-2015' 
      }
    ]
  },
  {
    date: '2021 – Nay',
    title: 'Hoàn Thiện Nhà Nước Pháp Quyền XHCN Gắn Với Tầm Nhìn Phát Triển Dài Hạn',
    content: `Từ năm 2021 đến nay, Việt Nam bước vào giai đoạn hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa theo hướng hiện đại, gắn với Chiến lược phát triển kinh tế – xã hội giai đoạn 2021–2030 và tầm nhìn phát triển đất nước đến năm 2045. Đây là giai đoạn thể hiện rõ sự chuyển dịch từ yêu cầu phát triển kinh tế đơn thuần sang yêu cầu phát triển toàn diện, bền vững trên nền tảng thể chế chính trị và pháp luật ngày càng hoàn thiện.
Theo quan điểm của Chủ nghĩa xã hội khoa học, đây là bước phát triển tất yếu của thời kỳ quá độ lên chủ nghĩa xã hội, khi nhiệm vụ trung tâm của Nhà nước không chỉ dừng lại ở việc thúc đẩy tăng trưởng kinh tế mà còn tập trung vào hoàn thiện thể chế, phát huy dân chủ xã hội chủ nghĩa, đồng thời bảo đảm và bảo vệ quyền con người, quyền công dân. Trong bối cảnh đó, Nhà nước pháp quyền xã hội chủ nghĩa được xác định là công cụ quan trọng để tổ chức, quản lý và định hướng sự phát triển xã hội theo đúng mục tiêu xã hội chủ nghĩa.
Trọng tâm của giai đoạn này được thể hiện thông qua việc xây dựng Nhà nước pháp quyền xã hội chủ nghĩa hoạt động ngày càng hiệu lực, hiệu quả; tiếp tục hoàn thiện hệ thống pháp luật theo hướng đồng bộ, thống nhất và khả thi; phát huy vai trò giám sát của Nhân dân và các tổ chức chính trị – xã hội trong quản lý nhà nước; đồng thời gắn việc thực thi pháp quyền với quá trình chuyển đổi số và hội nhập quốc tế sâu rộng. Những định hướng này tạo nền tảng chính trị – pháp lý vững chắc, góp phần đưa Việt Nam phát triển ổn định và tiến từng bước vững chắc trên con đường đi lên chủ nghĩa xã hội.
Từ năm 2011 đến nay, quá trình hoàn thiện thể chế xã hội chủ nghĩa ở Việt Nam là sự tiếp nối và phát triển của con đường quá độ gián tiếp lên chủ nghĩa xã hội, phù hợp với lý luận Chủ nghĩa xã hội khoa học và điều kiện thực tiễn của đất nước. Qua từng giai đoạn, Nhà nước pháp quyền xã hội chủ nghĩa ngày càng được hoàn thiện, góp phần bảo đảm ổn định chính trị, phát triển kinh tế và nâng cao đời sống Nhân dân.
`,
    media: [
      
      { 
        type: 'video', 
        src: 'CvS7qu3CK-U', 
        caption: 'Xây dựng và hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam' 
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
                  target.src = 'https://via.placeholder.com/800x600/0d9488/ffffff?text=Không+tải+được+ảnh';
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

export function Timeline2011({ containerRef }: TimelineProps) {
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
        {/* Header với màu xanh ngọc/turquoise */}
        <div className="bg-gradient-to-r from-teal-900/20 via-emerald-900/20 to-teal-900/20 rounded-2xl p-8 border border-teal-200/30 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-600 flex items-center justify-center shadow-xl">
                <span className="text-2xl font-bold text-white">2011</span>
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 tracking-tighter">
                  Nhà Nước Pháp Quyền XHCN
                </h1>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  Hoàn thiện thể chế xã hội chủ nghĩa trong thời kỳ mới
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {DATA_2011.map((event, idx) => {
            const isShortContent = event.content.split(/\s+/).length < 150;

            return (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 flex items-center justify-center">
                      <span className="text-white font-bold">{event.date.charAt(0)}</span>
                    </div>
                    <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 font-bold rounded-full">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {event.title}
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
                          className="w-full text-left rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                                  <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center">
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
    </>
  );
}
