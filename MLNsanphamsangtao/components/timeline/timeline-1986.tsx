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
    media: []
  },
  {
    date: '1986',
    title: '1.1. Siêu Lạm Phát Và Sự Sụp Đổ Của Niềm Tin Vào Đồng Tiền',
    content: `Dữ liệu lịch sử ghi nhận tỷ lệ lạm phát phi mã lên tới 774% vào cuối năm 1986. Để hình dung con số này trong một sản phẩm sáng tạo, hãy tưởng tượng giá trị đồng lương của một công nhân viên chức bốc hơi từng ngày, thậm chí từng giờ. Một người lao động nhận lương đầu tháng có thể mua được một lượng gạo nhất định, nhưng đến cuối tháng, số tiền đó chỉ còn mua được vài phần nhỏ.`,
    media: [
       { 
        type: 'image', 
        src: 'https://cafefcdn.com/203337114487263232/2025/8/27/anh-1-1756263646237-1756263646594875433795.jpg', 
        caption: 'Người dân quy đổi sang gạo để làm vật tích trữ ' 
      }
    ]
  },
  {
    date: '1986',
    title: '1.2. Nền Kinh Tế Khan Hiếm',
    content: `Khái niệm "nền kinh tế thiếu" của Janos Kornai hoàn toàn đúng với Việt Nam năm 1986. Không chỉ thiếu vốn, thiếu công nghệ, mà cái thiếu hiện hữu ngay trong đời sống thường nhật: thiếu gạo, thiếu vải, thiếu thuốc men, thiếu xà phòng, thiếu giấy viết cho học sinh. Các cửa hàng mậu dịch quốc doanh biểu tượng của hệ thống phân phối XHCN thường xuyên trong tình trạng trống rỗng hoặc chỉ bày bán những mặt hàng kém chất lượng, tồn kho.Tình trạng khan hiếm này không phải do năng lực sản xuất của người dân Việt Nam yếu kém bẩm sinh, mà do cơ chế "ngăn sông cấm chợ". Hàng hóa sản xuất ra không được lưu thông tự do mà phải đi qua hệ thống thu mua - phân phối tầng tầng lớp lớp của nhà nước. Nông dân làm ra lúa gạo nhưng không muốn bán cho nhà nước vì giá thu mua quá thấp so với giá thị trường, dẫn đến hiện tượng "lưu thông ách tắc". Những trạm kiểm soát thuế quan mọc lên khắp nơi, ngăn chặn việc mang vác vài cân gạo hay vài mét vải đi qua ranh giới các tỉnh.
`,
    media: [
      { 
        type: 'image', 
        src: 'https://vcdn1-ngoisao.vnecdn.net/2016/11/14/mau-dich-9-1479096584.jpg?w=460&h=0&q=100&dpr=1&fit=crop&s=QK6ZCuFQSwJt0fxQgrsa-w', 
        caption: 'Cừa hàng mậu dịch quốc doanh' 
      },
       { 
        type: 'image', 
        src: 'https://i2-vnexpress.vnecdn.net/2016/12/07/top-1481100949.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=R5EZDK5EsEMRe_w34uAXvQ', 
        caption: 'Tình trạng bán hàng ở cửa hàng mậu dịch quốc doanh' 
      }
    ]
  },
  {
    date: 'Tết Bính Dần 1986',
    title: '1.3. Bức Tranh Xã Hội Qua Lăng Kính Tết Bính Dần 1986',
    content: `Để sản phẩm sáng tạo có tính nhân văn và chạm đến cảm xúc người xem, việc tái hiện không khí Tết Bính Dần 1986 là một lựa chọn tuyệt vời. Đây được coi là "cái Tết bao cấp cuối cùng", một cột mốc văn hóa gói gọn cả nỗi gian truân và niềm hy vọng của một thế hệ.

Tết năm 1986 diễn ra vào tháng 2 dương lịch, đúng vào giai đoạn khó khăn nhất sau cuộc đổi tiền năm 1985. Ký ức về cái Tết này không phải là sự đủ đầy của bánh chưng thịt mỡ, mà là nỗi lo âu thường trực về tiêu chuẩn, định mức. Người dân Hà Nội và các thành phố lớn phải xếp hàng từ tờ mờ sáng, sử dụng gạch, đá, nón mê để "xí chỗ" tại các cửa hàng mậu dịch hòng mua được chút nhu yếu phẩm theo tiêu chuẩn bìa phiếu.
Tuy nhiên, trong sự thiếu thốn vật chất ấy, tinh thần cộng đồng lại trỗi dậy mạnh mẽ. Hiện tượng "đụng lợn" là một nét văn hóa đặc sắc: các hộ gia đình hoặc cơ quan chung nhau nuôi lợn, đến Tết thì mổ chia nhau từng phần thịt, bộ lòng. Tiếng lợn kêu, tiếng dao thớt, sự phân chia tỉ mỉ từng lạng thịt nạc, thịt mỡ phản ánh sự chắt chiu và trân trọng thực phẩm đến tột cùng. Hình ảnh ga Hàng Cỏ (Ga Hà Nội) năm 1986 với những đoàn tàu chạy bằng đầu máy hơi nước hoặc diesel cũ kỹ, người dân chen chúc, đu bám trên các toa xe để về quê ăn Tết cũng là một biểu tượng hùng hồn cho khát vọng đoàn viên vượt lên trên nghịch cảnh.Sự đối lập giữa không khí u ám của kinh tế và sắc đỏ của pháo, của hoa đào, hoa quất tại chợ hoa Hàng Lược tạo nên một chất liệu điện ảnh tuyệt vời. Tiếng pháo nổ đì đùng trong đêm giao thừa năm ấy không chỉ là phong tục, mà dường như còn là tiếng nổ giải tỏa những ức chế, lo toan dồn nén của cả một năm dài, gửi gắm hy vọng vào một sự thay đổi mà lúc đó chưa ai biết rõ hình hài sẽ ra sao.`,
    media: [
      { 
        type: 'image', 
        src: 'https://imgs.vietnamnet.vn/Images/2016/02/05/10/20160205095611-tet-1.jpg?width=0&s=xKyi1BBtCaUllgWNajtppA', 
        caption: 'Người dân xếp hàng tại Hàng Tết để mua được chút nhu yếu phẩm' 
      },
      { 
        type: 'image', 
        src: 'https://thanhnien.mediacdn.vn/Uploaded/congthang/2015_05_17/temphieu_PUHU.jpg', 
        caption: 'Người dân xếp hàng mua lương thực' 
      },
      { 
        type: 'image', 
        src: 'https://giadinh.mediacdn.vn/296230595582509056/2022/1/17/27160058320042532130884846383251729519533034n-16423928674631941914914.jpg', 
        caption: 'Người dân nô nức về quê ăn Tết tại Ga Hàng Cỏ (Ga Hà Nội)' 
      },
       { 
        type: 'video', 
        src: 'Vhzq_GYQO8Y', 
        caption: 'TẾT THỜI BAO CẤP - Những ký ức khó quên của một thời khốn khó' 
      }
    ]
  },
  {
    date: '12/1986',
    title: '2. Đại Hội VI - Nhìn Thẳng Vào Sự Thật',
    content: `Nếu năm 1986 là một vở kịch lớn của lịch sử Việt Nam, thì Tổng Bí thư Trường Chinh chính là nhân vật trung tâm đầy kịch tính. Được biết đến như một nhà lý luận kiên định và nguyên tắc, nhưng trước thực tế đau xót của đất nước, chính ông là người đã dũng cảm thực hiện cuộc "lột xác" về tư duy. Sau khi Tổng Bí thư Lê Duẩn từ trần vào tháng 7/1986, đồng chí Trường Chinh giữ cương vị Tổng Bí thư và trực tiếp chỉ đạo quá trình soạn thảo Báo cáo chính trị cho Đại hội VI.Quá trình này không hề suôn sẻ. Đã có những cuộc tranh luận nảy lửa giữa quan điểm bảo thủ (muốn giữ nguyên cơ chế cũ, coi mọi cải cách thị trường là chệch hướng CNXH) và quan điểm đổi mới (nhìn thẳng vào sự thật để cứu vãn nền kinh tế). Hội nghị Bộ Chính trị từ ngày 25 đến 30/8/1986 là một mốc son chói lọi. Tại đây, Tổng Bí thư Trường Chinh đã đưa ra kết luận mang tính quyết định: "Đổi mới là yêu cầu bức thiết của sự nghiệp cách mạng, là vấn đề sống còn". Ông nhấn mạnh việc phải tôn trọng quy luật khách quan, thừa nhận cơ cấu kinh tế nhiều thành phần. Cuộc họp này có thể ví như "Hội nghị Diên Hồng" của thời kỳ đổi mới, nơi ý chí của Đảng hòa quyện với lòng dân và thực tiễn cuộc sống. Việc viết lại Báo cáo chính trị dựa trên quan điểm mới là một hành động dũng cảm, bác bỏ những định kiến giáo điều đã ăn sâu bám rễ hàng chục năm
.Đại hội đại biểu toàn quốc lần thứ VI của Đảng diễn ra vào tháng 12/1986 tại Hà Nội không mang màu sắc của những lời ca tụng sáo rỗng thường thấy trước đó. Phương châm của Đại hội là "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật". Báo cáo chính trị đã nghiêm khắc thừa nhận những sai lầm trong lãnh đạo kinh tế: bệnh chủ quan, duy ý chí, nóng vội muốn đốt cháy giai đoạn, ham làm lớn, thiên về phát triển công nghiệp nặng trong khi chưa đủ điều kiện.

Sự thừa nhận này không làm giảm uy tín của Đảng, mà ngược lại, đã khôi phục niềm tin trong nhân dân. Nó chứng minh rằng Đảng có khả năng tự sửa sai và tự đổi mới để tiếp tục sứ mệnh lãnh đạo. Đây là luận cứ quan trọng để bảo vệ quan điểm "không chệch hướng CNXH": Đổi mới để củng cố vai trò lãnh đạo của Đảng và tính ưu việt của chế độ, chứ không phải để phủ nhận nó.
`,
    media: [
      { 
        type: 'image', 
        src: 'https://cdnimage.daihoidang.vn/t400/Media/Graphic/Profile/2020/12/02/truong-chinh-edit.jpg', 
        caption: 'Tổng bí thư Trường Chinh' 
      },
       { 
        type: 'image', 
        src: 'https://img.baoninhbinh.org.vn/namdinh/file/e7837c02816d130b0181a995d7ad7e96/dataimages/202209/original/images1344381_1.jpg', 
        caption: 'Đồng chí Trường Chinh với Đại hội Đại biểu toàn quốc lần thứ VI của Đảng (kỳ 3)' 
      },
      { 
        type: 'video', 
        src: 'pxSYk_Pg3TY', 
        caption: 'Tổng Bí thư Trường Chinh - "Kiến trúc sư" của công cuộc đổi mới' 
      }
    ]
  },
  {
    date: '1986',
    title: '3. Nội Dung Cốt Lõi Của Đổi Mới Kinh Tế',
    content: `3.1. Ba Chương trình Kinh tế lớn: Sự đảo chiều chiến lược
Chương trình Lương thực – Thực phẩm được xác định là ưu tiên hàng đầu trong bối cảnh Việt Nam là nước nông nghiệp nhưng người dân vẫn thiếu ăn, phải nhập khẩu lương thực. Đại hội VI đã đặt nông nghiệp vào vị trí “mặt trận hàng đầu”, tập trung nguồn lực cho sản xuất lúa gạo và thực phẩm, đồng thời khuyến khích cơ chế khoán để tạo động lực cho nông dân. Việc giải quyết được vấn đề cái ăn không chỉ đáp ứng nhu cầu sống còn mà còn tạo nền tảng ổn định xã hội, làm tiền đề cho phát triển các ngành kinh tế khác.

Chương trình Hàng tiêu dùng ra đời nhằm khắc phục tình trạng khan hiếm hàng hóa thiết yếu gây bức xúc xã hội và lạm phát kéo dài. Nhà nước khuyến khích sản xuất các mặt hàng phục vụ đời sống hằng ngày như quần áo, vải vóc, đồ dùng sinh hoạt, giấy vở… Qua đó, chương trình góp phần cải thiện đời sống nhân dân, thu hút lượng tiền mặt trong lưu thông để kiềm chế lạm phát, đồng thời tạo thêm việc làm cho khu vực tiểu thủ công nghiệp.
Chương trình Hàng xuất khẩu được triển khai trong bối cảnh nền kinh tế thiếu ngoại tệ, cán cân thanh toán thâm hụt và bị bao vây cấm vận. Đại hội VI chủ trương mở rộng sản xuất các mặt hàng có lợi thế như nông sản, thủy hải sản, thủ công mỹ nghệ để đẩy mạnh xuất khẩu, từng bước chuyển từ cơ chế đóng cửa sang mở cửa hội nhập. Chương trình này giúp tạo nguồn ngoại tệ cho tái đầu tư, phá thế cô lập kinh tế và gắn nền kinh tế Việt Nam với thị trường quốc tế.
3.2. Thừa nhận nền kinh tế nhiều thành phần
Trước năm 1986, chỉ có hai thành phần kinh tế được coi là "chính thống" và XHCN: Kinh tế Quốc doanh và Kinh tế Tập thể. Các thành phần khác như cá thể, tư nhân bị coi là tàn dư của chế độ cũ cần phải xóa bỏ.

Đại hội VI đã tạo ra một cuộc cách mạng khi chính thức thừa nhận sự tồn tại khách quan và lâu dài của nền kinh tế nhiều thành phần trong thời kỳ quá độ. Điều này có nghĩa là Đảng chấp nhận cho kinh tế tư nhân, kinh tế cá thể được hoạt động, phát triển. Đây chính là "phương thức" mới: sử dụng động lực lợi ích cá nhân của người sản xuất nhỏ và tư nhân để đóng góp vào sự phát triển chung của xã hội. Việc "cởi trói" này đã giải phóng nguồn lực khổng lồ đang bị kìm nén trong dân, khơi dậy tinh thần khởi nghiệp và làm giàu.

Tuy nhiên, để "không chệch hướng", Nhà nước vẫn giữ vai trò chủ đạo, nắm giữ các ngành then chốt (như năng lượng, viễn thông, tài chính) và sử dụng các công cụ vĩ mô (pháp luật, thuế, chính sách) để điều tiết thị trường, đảm bảo định hướng xã hội chủ nghĩa và công bằng xã hội.

3.3. Xóa bỏ cơ chế tập trung quan liêu bao cấp
Đại hội VI đã tuyên bố xóa bỏ cơ chế tập trung quan liêu bao cấp với đặc trưng “xin – cho”, giá cả do Nhà nước ấn định bất chấp quy luật cung – cầu, doanh nghiệp thua lỗ thì được bù, có lãi thì bị thu về. Thay vào đó, nền kinh tế chuyển sang cơ chế hạch toán kinh doanh xã hội chủ nghĩa, trong đó doanh nghiệp phải tự chủ về tài chính, tự vay – tự trả và tự chịu trách nhiệm về kết quả lỗ lãi của mình. Giá cả từng bước được điều chỉnh để phản ánh đúng giá trị sức lao động và quan hệ cung cầu, đồng thời xóa bỏ chế độ giao nộp sản phẩm, chuyển sang quan hệ mua bán bình đẳng và thực hiện nghĩa vụ nộp thuế. Mặc dù đây là   quá trình chuyển đổi khó khăn, gây ra tình trạng giải thể hoặc sáp nhập nhiều xí nghiệp quốc doanh yếu kém và dẫn tới thất nghiệp tạm thời, nhưng về lâu dài đã tạo nền tảng cho một nền kinh tế năng động và hiệu quả hơn.
`,
    media: [
      { 
        type: 'image', 
        src: 'https://dddn.1cdn.vn/2021/03/16/diendandoanhnghiep.vn-media-uploaded-346-2021-03-16-_kinhtetunhan2.jpg', 
        caption: 'Xưởng may vải' 
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
