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
  {
    date: 'BỐI CẢNH',
    title: '1) BỐI CẢNH LỊCH SỬ – CHÍNH TRỊ',
    content: `**Trong nước**
Sau 5 năm triển khai đường lối Đổi mới từ Đại hội VI (1986), Việt Nam từng bước thoát khỏi tình trạng khủng hoảng kinh tế – xã hội kéo dài, đặc trưng bởi lạm phát cao, thiếu hụt lương thực và cơ chế quản lý tập trung quan liêu bao cấp. Nền kinh tế bắt đầu hình thành rõ nét cơ cấu kinh tế hàng hóa nhiều thành phần, trong đó kinh tế nhà nước, kinh tế tập thể, kinh tế tư nhân và kinh tế cá thể cùng tồn tại và phát triển trong khuôn khổ quản lý của Nhà nước. Các quan hệ thị trường từng bước được thừa nhận như một công cụ điều tiết sản xuất và phân phối, tạo động lực nâng cao năng suất lao động và thu hút các nguồn lực xã hội. Trong bối cảnh đó, yêu cầu cấp thiết đặt ra là phải chuẩn hóa và hệ thống hóa nhận thức lý luận về chủ nghĩa xã hội và con đường đi lên chủ nghĩa xã hội ở Việt Nam, nhằm bảo đảm quá trình cải cách kinh tế không đi chệch định hướng chính trị – xã hội, đồng thời tạo nền tảng tư tưởng vững chắc cho công cuộc đổi mới lâu dài.

**Quốc tế**
Bước sang đầu thập niên 1990, tình hình thế giới có những biến động sâu sắc, đặc biệt là sự tan rã của hệ thống xã hội chủ nghĩa ở Liên Xô và Đông Âu, kéo theo sự thay đổi căn bản trong tương quan lực lượng quốc tế và trật tự thế giới. Toàn cầu hóa và khu vực hóa kinh tế gia tăng mạnh mẽ, các quốc gia ngày càng phụ thuộc lẫn nhau thông qua thương mại, đầu tư và chuyển giao công nghệ. Đối với Việt Nam, bối cảnh này vừa tạo ra thách thức lớn về an ninh chính trị, định hướng phát triển và vị thế quốc tế, vừa mở ra cơ hội tiếp cận nguồn vốn, khoa học – công nghệ và thị trường toàn cầu. Do đó, yêu cầu đặt ra là phải mở rộng quan hệ đối ngoại, đa phương hóa và đa dạng hóa hợp tác quốc tế, đồng thời kiên định mục tiêu xây dựng chủ nghĩa xã hội phù hợp với điều kiện lịch sử và thực tiễn của đất nước trong môi trường cạnh tranh và hội nhập ngày càng sâu rộng.

**Sự kiện mốc: Đại hội VII (6/1991)**
Trong bối cảnh trong nước đang chuyển mình mạnh mẽ và môi trường quốc tế biến động sâu sắc, Đại hội đại biểu toàn quốc lần thứ VII của Đảng Cộng sản Việt Nam (tháng 6 năm 1991) đã trở thành dấu mốc lý luận và chính trị quan trọng. Đại hội thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội, lần đầu tiên xác định một cách hệ thống và tương đối hoàn chỉnh mô hình chủ nghĩa xã hội Việt Nam bằng sáu đặc trưng cơ bản, chuyển nhận thức từ mức độ định hướng, định tính sang trình độ định hình rõ ràng về mục tiêu, nội dung và phương thức phát triển. Cương lĩnh không chỉ khẳng định vai trò làm chủ của nhân dân và mục tiêu phát triển con người toàn diện, mà còn nhấn mạnh sự kết hợp giữa phát triển kinh tế, xây dựng văn hóa, củng cố quốc phòng – an ninh và mở rộng quan hệ đối ngoại hòa bình, hợp tác. Từ đó, văn kiện này trở thành nền tảng tư tưởng – chiến lược định hướng cho toàn bộ quá trình phát triển đất nước trong giai đoạn mới.`,
    media: [
      { 
        type: 'image', 
        src: 'https://dangcongsan.vn/DATA/0/2018/12/28/Dangcongsan/vhoai%20_3_16_22_800.jpg', 
        caption: 'Đại hội Đảng toàn quốc lần thứ VII (1991)' 
      }
    ]
  },
  {
    date: 'LÝ LUẬN',
    title: '2) PHẦN LÝ LUẬN (TỪ GIÁO TRÌNH CNXHKH & CƯƠNG LĨNH)',
    content: `**2.1. Khái niệm "Quá độ gián tiếp"**
"Quá độ gián tiếp" là con đường đi lên chủ nghĩa xã hội của Việt Nam từ một xã hội nông nghiệp lạc hậu, chưa trải qua giai đoạn phát triển tư bản chủ nghĩa đầy đủ, thông qua việc tiếp thu có chọn lọc những thành tựu của nền kinh tế thị trường hiện đại và văn minh nhân loại để phát triển lực lượng sản xuất. Về bản chất, đây không phải là sự phủ định vai trò của thị trường, mà là việc sử dụng thị trường như một công cụ kinh tế trong khuôn khổ định hướng xã hội chủ nghĩa, dưới sự quản lý của Nhà nước, nhằm rút ngắn quá trình công nghiệp hóa, hiện đại hóa và tạo nền tảng vật chất cho xã hội mới. Quá độ gián tiếp thể hiện tính sáng tạo của cách mạng Việt Nam khi kết hợp giữa mục tiêu xã hội chủ nghĩa với điều kiện lịch sử cụ thể của một quốc gia đi lên từ điểm xuất phát thấp, trong bối cảnh hội nhập và toàn cầu hóa.

**2.2. Đặc điểm thời kỳ quá độ**
Thời kỳ quá độ ở Việt Nam mang đặc trưng của sự đan xen, tồn tại song song và tác động lẫn nhau giữa nhiều hình thức sở hữu và nhiều thành phần kinh tế, bao gồm kinh tế nhà nước, kinh tế tập thể, kinh tế tư nhân, kinh tế cá thể và kinh tế có vốn đầu tư nước ngoài. Trong giai đoạn này, lực lượng sản xuất chưa phát triển đồng đều, trong khi quan hệ sản xuất đang từng bước được cải biến để phù hợp với trình độ phát triển mới của nền kinh tế. Nhà nước giữ vai trò định hướng, điều tiết và dẫnắt sự phát triển thông qua hệ thống pháp luật, chính sách và chiến lược phát triển quốc gia, nhằm bảo đảm mục tiêu tăng trưởng kinh tế gắn liền với tiến bộ và công bằng xã hội. Đặc điểm nổi bật của thời kỳ này là sự vận động vừa cải cách kinh tế, vừa ổn định chính trị – xã hội, tạo nền tảng vững chắc cho việc xây dựng xã hội xã hội chủ nghĩa trong dài hạn.

**2.3. Mục tiêu chiến lược**
Mục tiêu chiến lược của thời kỳ quá độ là xây dựng cơ sở vật chất – kỹ thuật của chủ nghĩa xã hội thông qua quá trình công nghiệp hóa, hiện đại hóa đất nước gắn với phát triển khoa học, công nghệ và nguồn nhân lực chất lượng cao. Song song với đó là từng bước hoàn thiện quan hệ sản xuất mới phù hợp với trình độ phát triển của lực lượng sản xuất, bảo đảm nguyên tắc phân phối theo lao động và hiệu quả kinh tế, đồng thời thực hiện các chính sách xã hội nhằm nâng cao đời sống vật chất và tinh thần của nhân dân. Mục tiêu này không chỉ hướng tới tăng trưởng kinh tế thuần túy, mà còn nhấn mạnh sự phát triển toàn diện của con người, xây dựng nền dân chủ xã hội chủ nghĩa và củng cố vai trò quản lý của Nhà nước pháp quyền, qua đó tạo nền tảng cho sự phát triển bền vững và lâu dài của đất nước.

**2.4. Sáu đặc trưng của CNXH Việt Nam (Cương lĩnh 1991)**
Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội năm 1991 đã xác định rõ mô hình xã hội xã hội chủ nghĩa ở Việt Nam với sáu đặc trưng cơ bản:
1) Do nhân dân lao động làm chủ; 
2) Có một nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và chế độ công hữu về các tư liệu sản xuất chủ yếu; 
3) Có nền văn hóa tiên tiến, đậm đà bản sắc dân tộc; 
4) Con người được giải phóng khỏi áp bức, bóc lột, bất công, làm theo năng lực, hưởng theo lao động, có cuộc sống ấm no, tự do, hạnh phúc, có điều kiện phát triển toàn diện cá nhân; 
5) Các dân tộc trong nước bình đẳng, đoàn kết và giúp đỡ lẫn nhau cùng tiến bộ; 
6) Có quan hệ hữu nghị và hợp tác với nhân dân tất cả các nước trên thế giới.`,
    media: [
      { 
        type: 'image', 
        src: 'https://media.baodautu.vn/Images/chicuong/2021/06/27/cuong-linh-1991-1.jpg', 
        caption: 'Cương lĩnh xây dựng đất nước 1991' 
      }
    ]
  },
  {
    date: 'THỰC TIỄN',
    title: '3) PHẦN THỰC TIỄN – DẪN CHỨNG LỊCH SỬ & XÃ HỘI',
    content: `**3.1. Chuỗi sự kiện tạo nền cho Cương lĩnh 1991**
1954–1957: Khôi phục kinh tế miền Bắc sau chiến tranh. Từ sau Hiệp định Giơ-ne-vơ năm 1954, miền Bắc Việt Nam bước vào giai đoạn khôi phục kinh tế và xây dựng những cơ sở đầu tiên của nền sản xuất xã hội chủ nghĩa.
1960: Đại hội III xác định xây dựng CNXH ở miền Bắc. Đại hội III của Đảng (1960) xác định rõ nhiệm vụ xây dựng CNXH ở miền Bắc như một hậu phương chiến lược cho sự nghiệp thống nhất đất nước, đặt trọng tâm vào phát triển công nghiệp nặng, hợp tác hóa nông nghiệp và xây dựng cơ sở vật chất – kỹ thuật.
1986: Đổi mới (Đại hội VI) – chuyển sang kinh tế hàng hóa nhiều thành phần. Đại hội VI (1986) với đường lối Đổi mới, chuyển sang phát triển nền kinh tế hàng hóa nhiều thành phần vận hành theo cơ chế thị trường có sự quản lý của Nhà nước.
1991: Đại hội VII – Cương lĩnh 1991 – định hình mô hình CNXH Việt Nam. Đại hội VII (1991) đã thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH, đánh dấu sự chuyển từ nhận thức định hướng sang định hình mô hình phát triển một cách hệ thống và lâu dài.

**3.2. Phong trào – mô hình tiêu biểu (minh họa thực hành lý luận)**
Thi đua xã hội: "Ba sẵn sàng", "Năm xung phong".
Hợp tác xã kiểu mẫu: "Gió Đại Phong", "Sóng Duyên Hải".
Trong quá trình xây dựng CNXH, nhiều phong trào quần chúng và mô hình sản xuất tiêu biểu đã trở thành minh chứng sinh động cho nguyên lý "nhân dân lao động làm chủ" và vai trò của kinh tế tập thể. Các phong trào thi đua như "Ba sẵn sàng" của thanh niên và "Năm xung phong" của phụ nữ trong những năm 1960–1970 không chỉ mang ý nghĩa chính trị – xã hội mà còn trực tiếp đóng góp vào sản xuất, quốc phòng và phát triển cộng đồng.

**3.3. Kết quả giai đoạn đầu Đổi mới (đến 1991)**
Sau 5 năm triển khai đường lối Đổi mới, Việt Nam đạt được những kết quả bước đầu quan trọng, tạo tiền đề trực tiếp cho việc hình thành Cương lĩnh 1991. Nền kinh tế thoát dần tình trạng khủng hoảng kéo dài, lạm phát được kiềm chế từng bước, sản xuất nông nghiệp tăng trưởng rõ rệt, đặc biệt là nhờ khoán trong nông nghiệp giúp Việt Nam từ nước thiếu lương thực trở thành nước xuất khẩu gạo.`,
    media: []
  },
  {
    date: 'PHÂN TÍCH',
    title: '4) PHÂN TÍCH HỆ THỐNG (LÝ LUẬN ↔ THỰC TIỄN)',
    content: `**Tính nhất quán:** Quá độ gián tiếp → dùng thị trường để phát triển lực lượng sản xuất → Nhà nước định hướng XHCN.
Quá độ gián tiếp, như được xác lập trong Cương lĩnh năm 1991, thể hiện sự lựa chọn mang tính hệ thống của Việt Nam khi sử dụng cơ chế thị trường như một công cụ phát triển lực lượng sản xuất, chứ không như một mô hình chính trị – xã hội thay thế cho định hướng xã hội chủ nghĩa. Về mặt lý luận, điều này phù hợp với quan điểm của chủ nghĩa Mác – Lênin về vai trò quyết định của lực lượng sản xuất đối với sự vận động và biến đổi của quan hệ sản xuất.

**Tính khả thi:** Đa thành phần kinh tế tạo động lực tăng trưởng; công hữu "chủ yếu" giữ vai trò dẫn dắt ở lĩnh vực then chốt.
Việc thừa nhận và phát triển đa thành phần kinh tế đã chứng minh tính khả thi của mô hình quá độ gián tiếp trong điều kiện một nước đang phát triển. Khu vực kinh tế tư nhân và đầu tư nước ngoài trở thành động lực quan trọng thúc đẩy tăng trưởng, tạo việc làm và nâng cao năng suất lao động, trong khi khu vực kinh tế nhà nước và tập thể giữ vai trò dẫn dắt ở các lĩnh vực then chốt như năng lượng, hạ tầng, tài chính – tín dụng và các ngành có ảnh hưởng lớn đến an ninh kinh tế quốc gia.

**Thách thức:** Cân bằng hiệu quả thị trường và công bằng xã hội; quản trị nhà nước, tham nhũng, chênh lệch vùng miền.
Dù đạt được nhiều kết quả tích cực, mô hình phát triển dựa trên sự kết hợp giữa thị trường và định hướng xã hội chủ nghĩa cũng bộc lộ những mâu thuẫn nội tại. Một mặt, cơ chế thị trường thúc đẩy cạnh tranh và tối ưu hóa nguồn lực, nhưng mặt khác lại có xu hướng tạo ra phân hóa giàu nghèo và chênh lệch phát triển giữa các vùng, các nhóm xã hội.`,
    media: []
  },
  {
    date: 'TẦM NHÌN',
    title: '5) DỰ BÁO & HÀM Ý CHIẾN LƯỢC (1–30 NĂM)',
    content: `**Ngắn hạn (1–5 năm):** Hoàn thiện thể chế thị trường định hướng XHCN; chuyển đổi số quản trị công.
Trong giai đoạn ngắn hạn, trọng tâm chiến lược của Việt Nam là hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa nhằm bảo đảm sự vận hành thông suốt, minh bạch và công bằng giữa các thành phần kinh tế. Điều này bao gồm việc tiếp tục cải cách hệ thống pháp luật về đất đai, đầu tư, doanh nghiệp và cạnh tranh để vừa khuyến khích sáng tạo, tích lũy tư bản xã hội, vừa giữ vững vai trò điều tiết của Nhà nước đối với các lĩnh vực then chốt.

**Trung hạn (5–10 năm):** Công nghiệp công nghệ cao, chuỗi giá trị khu vực; văn hóa – con người là động lực cạnh tranh.
Trong trung hạn, chiến lược phát triển tập trung vào xây dựng nền công nghiệp công nghệ cao gắn với tham gia sâu vào chuỗi giá trị khu vực và toàn cầu, từng bước chuyển từ vai trò "gia công – lắp ráp" sang "thiết kế – sáng tạo – làm chủ công nghệ". Nhà nước định hướng nguồn lực vào các ngành có hàm lượng tri thức và giá trị gia tăng cao như công nghệ thông tin, tự động hóa, năng lượng tái tạo, vật liệu mới và y sinh.

**Dài hạn (10–30 năm):** Kinh tế tri thức, xanh – bền vững; vị thế trung tâm hợp tác khu vực, đối ngoại đa phương sâu.
Ở tầm nhìn dài hạn, mục tiêu chiến lược là hình thành nền kinh tế tri thức xanh và bền vững, trong đó tri thức, đổi mới sáng tạo và công nghệ cao trở thành nguồn lực sản xuất chủ yếu, thay thế dần sự phụ thuộc vào khai thác tài nguyên và lao động giá rẻ. Phát triển bền vững được đặt trong mối quan hệ hài hòa giữa tăng trưởng kinh tế, bảo vệ môi trường và công bằng xã hội.`,
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
