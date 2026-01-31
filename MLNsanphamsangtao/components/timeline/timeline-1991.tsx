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

const DATA_1991: TimelineEvent[] = [
 const DATA_HE_THONG_LY_LUAN: TimelineEvent[] = [
  {
    date: 'PHẦN 1',
    title: 'BỐI CẢNH LỊCH SỬ – CHÍNH TRỊ',
    content: `### Trong nước
Sau 5 năm triển khai đường lối Đổi mới từ Đại hội VI (1986), Việt Nam từng bước thoát khỏi tình trạng khủng hoảng kinh tế – xã hội kéo dài, đặc trưng bởi lạm phát cao, thiếu hụt lương thực và cơ chế quản lý tập trung quan liêu bao cấp. Nền kinh tế bắt đầu hình thành rõ nét cơ cấu kinh tế hàng hóa nhiều thành phần: nhà nước, tập thể, tư nhân và cá thể cùng tồn tại và phát triển trong khuôn khổ quản lý của Nhà nước. Các quan hệ thị trường từng bước được thừa nhận như một công cụ điều tiết sản xuất và phân phối, tạo động lực nâng cao năng suất lao động và thu hút các nguồn lực xã hội.

### Quốc tế
Bước sang đầu thập niên 1990, tình hình thế giới có những biến động sâu sắc, đặc biệt là sự tan rã của hệ thống xã hội chủ nghĩa ở Liên Xô và Đông Âu, kéo theo sự thay đổi căn bản trong tương quan lực lượng quốc tế và trật tự thế giới. Toàn cầu hóa và khu vực hóa kinh tế gia tăng mạnh mẽ. Đối với Việt Nam, bối cảnh này vừa tạo ra thách thức lớn về an ninh chính trị, vừa mở ra cơ hội tiếp cận nguồn vốn, khoa học – công nghệ và thị trường toàn cầu thông qua đa phương hóa, đa dạng hóa hợp tác quốc tế.

### Sự kiện mốc: Đại hội VII (6/1991)
Đại hội đại biểu toàn quốc lần thứ VII đã thông qua **Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội**. Đây là dấu mốc lý luận quan trọng, lần đầu tiên xác định hệ thống mô hình CNXH Việt Nam bằng sáu đặc trưng cơ bản, chuyển nhận thức từ định tính sang định hình rõ ràng về mục tiêu và phương thức phát triển.`,
    media: [
       { 
        type: 'image', 
        src: 'https://file3.qdnd.vn/data/images/0/2025/01/30/upload_2105/1.jpg', 
        caption: 'Đại hội đảng lần thứ VII' 
      }
    ]
  },
  {
    date: 'PHẦN 2',
    title: 'PHẦN LÝ LUẬN (TỪ GIÁO TRÌNH CNXHKH & CƯƠNG LĨNH)',
    content: `### 2.1. Khái niệm “Quá độ gián tiếp”
Là con đường đi lên CNXH từ một xã hội nông nghiệp lạc hậu, chưa trải qua giai đoạn phát triển tư bản chủ nghĩa đầy đủ, thông qua việc tiếp thu có chọn lọc những thành tựu của văn minh nhân loại để phát triển lực lượng sản xuất. 
* **Hàm ý:** Không “nhảy cóc” kỹ thuật – quản trị; sử dụng cơ chế thị trường như công cụ dưới định hướng XHCN để rút ngắn thời gian công nghiệp hóa.

### 2.2. Đặc điểm thời kỳ quá độ
Sự đan xen, tồn tại song song nhiều hình thức sở hữu và thành phần kinh tế (nhà nước, tập thể, tư nhân, cá thể, FDI). Lực lượng sản xuất chưa phát triển đồng đều, quan hệ sản xuất được cải biến từng bước. Nhà nước giữ vai trò định hướng, điều tiết nhằm bảo đảm mục tiêu tăng trưởng gắn liền với tiến bộ và công bằng xã hội.

### 2.3. Mục tiêu chiến lược
Xây dựng cơ sở vật chất – kỹ thuật của CNXH thông qua công nghiệp hóa, hiện đại hóa gắn với KH-CN và nhân lực chất lượng cao. Từng bước hoàn thiện quan hệ sản xuất mới phù hợp lực lượng sản xuất, bảo đảm nguyên tắc phân phối theo lao động và hiệu quả.

### 2.4. Sáu đặc trưng của CNXH Việt Nam (Cương lĩnh 1991)
1) Do nhân dân lao động làm chủ.
2) Có nền kinh tế phát triển cao dựa trên LLSX hiện đại và chế độ công hữu về các TLSX chủ yếu.
3) Có nền văn hóa tiên tiến, đậm đà bản sắc dân tộc.
4) Con người được giải phóng khỏi áp bức, bất công, có cuộc sống ấm no, tự do, hạnh phúc.
5) Các dân tộc trong nước bình đẳng, đoàn kết và giúp đỡ lẫn nhau cùng tiến bộ.
6) Có quan hệ hữu nghị và hợp tác với nhân dân tất cả các nước trên thế giới.`,
    media: [
       { 
        type: 'image', 
        src: 'https://btgdvtukhanhhoa.vn/Media/Articles/110225100420/daihoidaibieutoanquoclanthuviicuadangdoimoitoandienduadatnuoctienlenconduongxhcn1121582810202110022025083322.jpg', 
        caption: 'Nguyên văn Cương lĩnh xây dựng đất nước trong thời kỳ quá độ (1991)' 
      }
    ]
  },
  {
    date: 'PHẦN 3',
    title: 'PHẦN THỰC TIỄN – DẪN CHỨNG LỊCH SỬ & XÃ HỘI',
    content: `### 3.1. Chuỗi sự kiện tạo nền cho Cương lĩnh 1991
- **1954–1957:** Khôi phục kinh tế miền Bắc sau chiến tranh.
- **1960:** Đại hội III xác định xây dựng CNXH ở miền Bắc là hậu phương chiến lược, trọng tâm là công nghiệp nặng và hợp tác hóa nông nghiệp.
- **1986:** Đại hội VI Đổi mới, chuyển sang kinh tế hàng hóa nhiều thành phần.
- **1991:** Đại hội VII thông qua Cương lĩnh định hình mô hình phát triển hệ thống và lâu dài.

### 3.2. Phong trào – mô hình tiêu biểu
- **Thi đua xã hội:** “Ba sẵn sàng”, “Năm xung phong” (1960-1970).
- **Hợp tác xã kiểu mẫu:** “Gió Đại Phong” (Quảng Bình), “Sóng Duyên Hải” (Thái Bình).
Minh chứng cho tinh thần nhân dân làm chủ và vai trò của kinh tế tập thể. Các chuyến thăm của Hồ Chí Minh tại Gang thép Thái Nguyên, Thủy điện Thác Bà lan tỏa tinh thần thi đua lao động sản xuất.

### 3.3. Kết quả giai đoạn đầu Đổi mới (đến 1991)
Việt Nam thoát dần khủng hoảng, kiềm chế lạm phát, từ nước thiếu lương thực trở thành nước xuất khẩu gạo. Hình thành thị trường hàng hóa – lao động sơ khai và mở rộng đối ngoại đa phương hóa, phá thế bao vây cô lập. Những thành tựu này củng cố cơ sở thực tiễn để Đảng xác lập mô hình CNXH năm 1991.`,
    media: [
      { 
        type: 'image', 
        src: 'https://phapluat.tuoitrethudo.vn/stores/news_dataimages/nguyentuananh/032021/17/09/5714-ba-san-sang-220210317090110.4251730.jpg', 
        caption: 'Thanh niên Thủ đô hăng hái hưởng ứng phong trào "Ba sẵn sàng"' 
      }
    ]
  },
  {
    date: 'PHẦN 4',
    title: 'PHÂN TÍCH HỆ THỐNG (LÝ LUẬN ↔ THỰC TIỄN)',
    content: `### Tính nhất quán
Quá độ gián tiếp thể hiện việc sử dụng cơ chế thị trường như một công cụ phát triển lực lượng sản xuất, không phải mô hình thay thế cho định hướng XHCN. Điều này phù hợp với quan điểm Marxist về vai trò quyết định của LLSX đối với QHSX.

### Tính khả thi
Đa thành phần kinh tế tạo động lực tăng trưởng. Khu vực tư nhân và FDI thúc đẩy năng suất, trong khi kinh tế Nhà nước giữ vai trò dẫn dắt ở các lĩnh vực “điểm tựa chiến lược” (năng lượng, hạ tầng, tài chính). Sự kết hợp này giúp Việt Nam vừa linh hoạt với thị trường, vừa duy trì khả năng điều tiết vĩ mô.

### Thách thức
Mâu thuẫn giữa hiệu quả thị trường và công bằng xã hội (phân hóa giàu nghèo, chênh lệch vùng miền). Quá trình mở rộng quyền tự chủ nếu thiếu giám sát minh bạch sẽ gia tăng nguy cơ tham nhũng, lợi ích nhóm. Đây chính là điểm căng thẳng đòi hỏi cải cách thể chế và xây dựng văn hóa pháp quyền để phát triển bền vững.`,
    media: [
      { 
        type: 'image', 
        src: 'https://i.ex-cdn.com/phapluatphattrien.vn/files/content/2025/04/04/085100084831vidan1-0703.jpg', 
        caption: 'Hạ tầng cảng biển hiện đại – minh chứng cho tính dẫn dắt của kinh tế nhà nước' 
      }
    ]
  },
  {
    date: 'PHẦN 5',
    title: 'DỰ BÁO & HÀM Ý CHIẾN LƯỢC (1–30 NĂM)',
    content: `### Ngắn hạn (1–5 năm)
Hoàn thiện thể chế kinh tế thị trường định hướng XHCN; chuyển đổi số quản trị công nhằm nâng cao hiệu lực bộ máy, giảm chi phí giao dịch và hạn chế tham nhũng.

### Trung hạn (5–10 năm)
Xây dựng nền công nghiệp công nghệ cao, chuyển từ “gia công – lắp ráp” sang “thiết kế – sáng tạo”. Lấy văn hóa và con người làm trụ cột cạnh tranh quốc gia thông qua giáo dục sáng tạo.

### Dài hạn (10–30 năm)
Hình thành nền kinh tế tri thức xanh và bền vững. Tri thức và đổi mới sáng tạo trở thành nguồn lực sản xuất chủ yếu. Việt Nam giữ vị thế trung tâm hợp tác khu vực và đối tác tin cậy trong hệ thống đa phương quốc tế, hội nhập sâu nhưng vẫn giữ vững bản sắc và quyền tự chủ quốc gia theo mục tiêu Cương lĩnh 1991.`,
    media: [
      { 
        type: 'image', 
        src: 'https://udc.com.vn/datafiles/34093/upload/images/tin-tuc/2025/38TS%20-%20CBCNV%20hoc%20AI/z6990006250393_cdf42a316f990715c86b82d214654cea.jpg', 
        caption: 'Chuyển đổi số và công nghệ cao – động lực chính cho giai đoạn 10-30 năm tới' 
      },
      { 
        type: 'video', 
        src: 'sucASmKqgnY', 
        caption: 'Tầm nhìn Việt Nam 2045: Đất nước phát triển, thu nhập cao' 
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
                  target.src = 'https://via.placeholder.com/800x600/9333ea/ffffff?text=Không+tải+được+ảnh';
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

export function Timeline1991({ containerRef }: TimelineProps) {
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
        {/* Header với màu tím/hồng */}
        <div className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 rounded-2xl p-8 border border-purple-200/30 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-700 to-pink-600 flex items-center justify-center shadow-xl">
                <span className="text-2xl font-bold text-white">1991</span>
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-700 to-purple-800 tracking-tighter">
                  Cương Lĩnh 1991
                </h1>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  Nền tảng lý luận cho công cuộc Đổi mới và hội nhập quốc tế
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {DATA_1991.map((event, idx) => {
            const isShortContent = event.content.split(/\s+/).length < 150;

            return (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-bold">{event.date.charAt(0)}</span>
                    </div>
                    <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 font-bold rounded-full">
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
                          className="w-full text-left rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                  <div className="w-14 h-14 bg-pink-600 rounded-full flex items-center justify-center">
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
