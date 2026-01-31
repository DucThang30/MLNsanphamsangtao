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
        src: 'https://icdn.dantri.com.vn/k:8b823cd4eb/2015/08/22/2287-74a41/ky-uc-nguoi-keo-ngon-co-cach-mang-dau-tien-tren-dat-hue.jpg', 
        caption: 'Cờ giải phóng tung bay trên Kỳ Đài Huế' 
      },
      { 
        type: 'image', 
        src: 'https://bcp.cdnchinhphu.vn/zoom/600_315/Uploaded/nguyenvanhuan/2015_03_25/images616388_xe_tang.jpg', 
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
        src: 'https://file3.qdnd.vn/DATA/OLD_IMG/xuandung/2014/12/19/200114dung37407150544945.jpg', 
        caption: 'Bộ đội tiến vào Đà Nẵng' 
      },
  
      { 
        type: 'video', 
        src: 'rd5s1RLtU58', 
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
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2tgylXtQ0JCN3gBfK3eUuI-gvTr-7b9qIgA&s', 
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
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZY7KvjE54Y4uJbJEq8ZM3ktGrKMgnXhN9AQ&s', 
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
        src: 'https://cdnmedia.baotintuc.vn/2015/03/20/14/04/hanhquan.jpg', 
        caption: 'Bộ đội hành quân trong Chiến dịch Hồ Chí Minh' 
      },
      { 
        type: 'video', 
        src: 'YCdUWoXi8eo', 
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
        src: 'https://cdnphoto.dantri.com.vn/XEnd6V0jN24l7wRjcQW4kMA4918=/zoom/1200_630/2020/04/17/images-13086351-1587098124624.jpg', 
        caption: 'Xe tăng 390 húc đổ cổng Dinh Độc Lập' 
      },
      { 
        type: 'image', 
        src: 'https://media.baosonla.org.vn/Uploads/Image2021/oh5mqbn2.jpg', 
        caption: 'Cờ giải phóng trên nóc Dinh Độc Lập' 
      },
      { 
        type: 'image', 
        src: 'https://nguoiduatin.mediacdn.vn/zoom/700_438/media/nguyen-ngoc-hoai-thanh/2024/04/30/anh-1-trungtuongthe.jpg', 
        caption: 'Tổng thống Dương Văn Minh tuyên bố đầu hàng' 
      },
      { 
        type: 'video', 
        src: 'J6NAA0Mzgtw', 
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
    media: []
  },
  {
    date: '1976 - 1980',
    title: 'Giai đoạn Toàn thắng và Khát vọng Tiến thẳng lên Chủ nghĩa xã hội',
    content: `Sau khi thống nhất đất nước về mặt Nhà nước vào tháng 7/1976, Việt Nam bước vào thời kỳ quá độ với tâm thế của một dân tộc vừa giành chiến thắng vĩ đại. Đại hội IV (12/1976) đã xác định đường lối chiến lược: đưa cả nước tiến nhanh, tiến mạnh, tiến vững chắc lên CNXH.

Về mặt lý luận, đây là thời kỳ áp dụng mô hình "Quá độ gián tiếp" nhưng với tư duy có phần nóng vội. Đảng xác định nhiệm vụ trọng tâm là "Ba cuộc cách mạng": Cách mạng về quan hệ sản xuất, Cách mạng khoa học - kỹ thuật và Cách mạng tư tưởng - văn hóa (trong đó Cách mạng KH-KT là then chốt). Kế hoạch 5 năm (1976-1980) đặt ra những chỉ tiêu kinh tế khổng lồ dựa trên niềm tin rằng sức mạnh chính trị và tinh thần của ngày chiến thắng có thể thay thế cho các quy luật kinh tế khách quan. Tuy nhiên, việc ưu tiên công nghiệp nặng trong khi nền tảng nông nghiệp còn yếu kém đã bắt đầu tạo ra những vết nứt trong hệ thống cung ứng quốc gia.`,
    media: [
      {
        type: 'image',
        src: 'https://file3.qdnd.vn/data/images/0/2022/11/29/huyentrang_km/dai%20hoi%20dai%20bieu%20toan%20quoc%20lan%20thu%204.jpg',
        caption: 'Đại hội IV - Điểm khởi đầu của khát vọng xây dựng CNXH trên quy mô toàn quốc'
      }
    ]
  },
  {
    date: '1977 - 1979',
    title: 'Cuộc "Đại phẫu thuật" Quan hệ sản xuất tại Miền Nam và Hệ quả',
    content: `Để thực hiện quá độ, Nhà nước tiến hành cải tạo XHCN đối với các thành phần kinh tế tư nhân tại miền Nam. Hàng loạt chiến dịch (tiêu biểu là X1, X2) nhằm xóa bỏ giai cấp tư sản, quốc hữu hóa tư liệu sản xuất và ép các cơ sở kinh doanh tư nhân vào hình thức công tư hợp doanh.

Trong nông nghiệp, mô hình Hợp tác hóa kiểu cũ từ miền Bắc được áp đặt nhanh chóng vào miền Nam. Lý luận thời bấy giờ cho rằng phải thay đổi Quan hệ sản xuất (tập thể hóa) trước để mở đường cho Lực lượng sản xuất phát triển. Thế nhưng, thực tế lại diễn ra ngược lại: việc người nông dân mất quyền tự chủ trên mảnh đất của mình dẫn đến tình trạng bỏ ruộng, sản xuất đình trệ. Cùng với cuộc chiến tranh biên giới Tây Nam và phía Bắc (1979), Việt Nam rơi vào tình trạng bị bao vây cấm vận, đẩy nền kinh tế vào thời kỳ đen tối của sự khan hiếm trầm trọng.`,
    media: []
  },
  {
    date: '1979 - 1981',
    title: 'Hội nghị Trung ương 6 và Chỉ thị 100: Những "Lỗ hổng" đầu tiên của Cơ chế Bao cấp',
    content: `Đứng trước nguy cơ sụp đổ kinh tế, Hội nghị Trung ương 6 (khóa IV) năm 1979 là một sự "thức tỉnh" lý luận quan trọng. Đảng bắt đầu thừa nhận sự tồn tại của các thành phần kinh tế khác ngoài quốc doanh và tập thể, đưa ra chủ trương "làm cho sản xuất bung ra".

Bước đột phá lớn nhất diễn ra vào tháng 1/1981 với Chỉ thị 100 của Ban Bí thư về "Khoán sản phẩm" (Khoán 100). Đây là lần đầu tiên sau 5 năm quá độ, lợi ích cá nhân của người lao động được thừa nhận chính thức trong hệ thống XHCN. Khoán 100 đã giải phóng sức lao động bị kìm hãm trong các HTX, tạo ra sự tăng trưởng đột biến về sản lượng lương thực. Đây là minh chứng thực tiễn đầu tiên cho thấy: trong thời kỳ quá độ, không thể áp dụng mô hình XHCN hoàn chỉnh khi trình độ lực lượng sản xuất còn quá thấp.`,
    media: [
      {
        type: 'image',
        src: 'https://i.ytimg.com/vi/SBlc3jbMX9I/maxresdefault.jpg',
        caption: 'Chỉ thị 100 - Luồng sinh khí mới cho nông nghiệp Việt Nam thời kỳ quá độ'
      }
    ]
  },
  {
    date: '1982 - 1984',
    title: 'Đại hội V và Cuộc đấu tranh giữa Bảo thủ và Đổi mới',
    content: `Đại hội V (3/1982) là một bước lùi để tiến. Đảng nhận định Việt Nam đang ở "Chặng đường đầu tiên" của thời kỳ quá độ — một quá trình cực kỳ lâu dài và phức tạp. Thứ tự ưu tiên được điều chỉnh: Nông nghiệp là mặt trận hàng đầu, Công nghiệp nhẹ là trọng tâm để phục vụ tiêu dùng và xuất khẩu.

Tuy nhiên, đây cũng là giai đoạn diễn ra cuộc đấu tranh gay gắt về tư tưởng giữa phái bảo thủ (muốn giữ vững cơ chế kế hoạch hóa tập trung) và phái đổi mới (muốn thừa nhận kinh tế thị trường). Trong khi Trung ương còn đang thảo luận, các địa phương (đặc biệt là TP.HCM, Long An, An Giang) đã chủ động "phá rào", thực hiện mua bán theo giá thỏa thuận, phá vỡ sự kìm kẹp của cơ chế "ngăn sông cấm chợ". Những thực tế này đã làm lung lay tận gốc rễ lý luận về mô hình CNXH kiểu cũ.`,
    media: []
  },
  {
    date: '1985',
    title: 'Thất bại của "Giá - Lương - Tiền" và Điểm tới hạn của Mô hình cũ',
    content: `Tháng 9/1985, Nhà nước thực hiện cuộc tổng điều chỉnh Giá - Lương - Tiền nhằm xóa bỏ bao cấp bằng một cuộc "tổng tiến công" hành chính. Tuy nhiên, do thực hiện đổi tiền khi hàng hóa trong kho của Nhà nước còn quá ít, cuộc cải cách đã biến thành một thảm họa kinh tế.

Lạm phát bùng nổ vượt tầm kiểm soát (phi mã), đồng tiền mất giá theo từng giờ, đời sống cán bộ và nhân dân rơi vào cảnh khốn cùng. Thất bại của "Giá - Lương - Tiền" năm 1985 là sự kết thúc của một tư duy duy ý chí: dùng mệnh lệnh hành chính để thay thế quy luật giá trị của thị trường. Chính sự đổ vỡ này đã tạo ra sức ép không thể đảo ngược, buộc toàn bộ hệ thống chính trị phải tiến tới cuộc Đổi mới toàn diện tại Đại hội VI vào năm sau.`,
    media: [
      {
        type: 'image',
        src: 'https://vcdn1-vnexpress.vnecdn.net/2016/12/15/10-8005-1481814589.png?w=680&h=0&q=100&dpr=2&fit=crop&s=n2qvupDTGS0ljOqDCf7FkA',
        caption: 'Dân làng đào kênh dẫn nước vào đồng ruộng thời hợp tác xã'
      }
    ]
  },
  {
    date: 'Tổng kết 1976 - 1985',
    title: 'Sự hình thành Hình thái Lý luận mới về Chủ nghĩa xã hội',
    content: `Mười năm (1976-1985) không đơn thuần là 10 năm khủng hoảng, mà là 10 năm "thử và sai" để tìm ra con đường quá độ thực sự phù hợp với Việt Nam. Bài học lớn nhất rút ra là: Không được nóng vội chủ quan, không được đồng nhất CNXH với kinh tế bao cấp, và phải tôn trọng quy luật khách quan.

Giai đoạn này đã trả lời cho câu hỏi trọng tâm: CNXH không phải là một mô hình cứng nhắc có sẵn để áp đặt, mà là kết quả của một quá trình phát triển lực lượng sản xuất lâu dài. Mọi nỗ lực thay đổi quan hệ sản xuất một cách cưỡng ép mà không dựa trên trình độ kỹ thuật đều dẫn đến thất bại. Đây chính là tiền đề lý luận cực kỳ quý giá để Đảng Cộng sản Việt Nam khởi xướng công cuộc Đổi mới, mở ra một kỷ nguyên phát triển mới cho dân tộc.`,
    media: []
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
