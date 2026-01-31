'use client';

import React, { useState } from 'react';
import { FileText, Film, Calendar, Play, Image as ImageIcon, Video, X, ChevronRight, ChevronLeft } from 'lucide-react';

// --- CẤU TRÚC DỮ LIỆU (đã xóa audio) ---
interface MediaItem {
  type: 'image' | 'video';
  src: string;
  caption: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  content: string;
  images: MediaItem[];
  videos: MediaItem[];
}

const DATA_1986: TimelineEvent[] = [
  {
    date: '1986',
    title: 'Năm 1986 - Đỉnh Điểm Của Khủng Hoảng Kinh Tế - Xã Hội',
    content: `Năm 1986 thường được nhắc đến như một năm của những con số kinh hoàng về kinh tế, là minh chứng rõ nét nhất cho sự thất bại của mô hình cũ.`,
    images: [
      { 
        type: 'image', 
        src: 'https://media.vneconomy.vn/images/upload/2024/12/12/bao-cap.jpg', 
        caption: 'Cảnh xếp hàng thời bao cấp trước Đổi Mới' 
      }
    ],
    videos: [
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
    content: `Dữ liệu lịch sử ghi nhận tỷ lệ lạm phát phi mã lên tới 774% vào cuối năm 1986. Để hình dung con số này trong một sản phẩm sáng tạo, hãy tưởng tượng giá trị đồng lương của một công nhân viên chức bốc hơi từng ngày, thậm chí từng giờ. Một người lao động nhận lương đầu tháng có thể mua được một lượng gạo nhất định, nhưng đến cuối tháng, số tiền đó chỉ còn mua được vài phần nhỏ. Tiền mặt trở nên "nóng bỏng tay", người dân tìm cách quy đổi ngay sang hiện vật như vàng, đô la, gạo, hay bất cứ thứ gì có giá trị tích trữ.

Sự mất giá của đồng tiền kéo theo sự đảo lộn các giá trị xã hội. Những người làm công ăn lương, trí thức, cán bộ nhà nước vốn là rường cột của chế độ lại trở thành tầng lớp dễ bị tổn thương nhất vì thu nhập cố định không đuổi kịp đà tăng giá. Trong khi đó, giới đầu cơ, buôn bán "chợ đen" lại phất lên nhanh chóng. Điều này tạo ra một nghịch lý đau xót trong một xã hội đang hướng tới công bằng, và chính nghịch lý này là động lực buộc Đảng phải nhìn thẳng vào sự thật.`,
    images: [
      { 
        type: 'image', 
        src: 'https://media.vneconomy.vn/images/upload/2023/12/24/lam-phat-1986.jpg', 
        caption: 'Lạm phát 774% năm 1986 - Đồng tiền mất giá nhanh chóng' 
      }
    ],
    videos: []
  },
  {
    date: '1986',
    title: '1.2. Nền Kinh Tế Khan Hiếm',
    content: `Khái niệm "nền kinh tế thiếu" của Janos Kornai hoàn toàn đúng với Việt Nam năm 1986. Không chỉ thiếu vốn, thiếu công nghệ, mà cái thiếu hiện hữu ngay trong đời sống thường nhật: thiếu gạo, thiếu vải, thiếu thuốc men, thiếu xà phòng, thiếu giấy viết cho học sinh. Các cửa hàng mậu dịch quốc doanh biểu tượng của hệ thống phân phối XHCN thường xuyên trong tình trạng trống rỗng hoặc chỉ bày bán những mặt hàng kém chất lượng, tồn kho.

Tình trạng khan hiếm này không phải do năng lực sản xuất của người dân Việt Nam yếu kém bẩm sinh, mà do cơ chế "ngăn sông cấm chợ". Hàng hóa sản xuất ra không được lưu thông tự do mà phải đi qua hệ thống thu mua - phân phối tầng tầng lớp lớp của nhà nước. Nông dân làm ra lúa gạo nhưng không muốn bán cho nhà nước vì giá thu mua quá thấp so với giá thị trường, dẫn đến hiện tượng "lưu thông ách tắc". Những trạm kiểm soát thuế quan mọc lên khắp nơi, ngăn chặn việc mang vác vài cân gạo hay vài mét vải đi qua ranh giới các tỉnh.`,
    images: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/sites/default/files/styles/large/public/2022-08/cua-hang-mau-dich.jpg', 
        caption: 'Cửa hàng mậu dịch quốc doanh trống rỗng thời bao cấp' 
      }
    ],
    videos: []
  },
  {
    date: 'Tết Bính Dần 1986',
    title: '1.3. Bức Tranh Xã Hội Qua Lăng Kính Tết Bính Dần 1986',
    content: `Để sản phẩm sáng tạo có tính nhân văn và chạm đến cảm xúc người xem, việc tái hiện không khí Tết Bính Dần 1986 là một lựa chọn tuyệt vời. Đây được coi là "cái Tết bao cấp cuối cùng", một cột mốc văn hóa gói gọn cả nỗi gian truân và niềm hy vọng của một thế hệ.

Tết năm 1986 diễn ra vào tháng 2 dương lịch, đúng vào giai đoạn khó khăn nhất sau cuộc đổi tiền năm 1985. Ký ức về cái Tết này không phải là sự đủ đầy của bánh chưng thịt mỡ, mà là nỗi lo âu thường trực về tiêu chuẩn, định mức. Người dân Hà Nội và các thành phố lớn phải xếp hàng từ tờ mờ sáng, sử dụng gạch, đá, nón mê để "xí chỗ" tại các cửa hàng mậu dịch hòng mua được chút nhu yếu phẩm theo tiêu chuẩn bìa phiếu.

Tuy nhiên, trong sự thiếu thốn vật chất ấy, tinh thần cộng đồng lại trỗi dậy mạnh mẽ. Hiện tượng "đụng lợn" là một nét văn hóa đặc sắc: các hộ gia đình hoặc cơ quan chung nhau nuôi lợn, đến Tết thì mổ chia nhau từng phần thịt, bộ lòng. Tiếng lợn kêu, tiếng dao thớt, sự phân chia tỉ mỉ từng lạng thịt nạc, thịt mỡ phản ánh sự chắt chiu và trân trọng thực phẩm đến tột cùng. Hình ảnh ga Hàng Cỏ (Ga Hà Nội) năm 1986 với những đoàn tàu chạy bằng đầu máy hơi nước hoặc diesel cũ kỹ, người dân chen chúc, đu bám trên các toa xe để về quê ăn Tết cũng là một biểu tượng hùng hồn cho khát vọng đoàn viên vượt lên trên nghịch cảnh.

Sự đối lập giữa không khí u ám của kinh tế và sắc đỏ của pháo, của hoa đào, hoa quất tại chợ hoa Hàng Lược tạo nên một chất liệu điện ảnh tuyệt vời. Tiếng pháo nổ đì đùng trong đêm giao thừa năm ấy không chỉ là phong tục, mà dường như còn là tiếng nổ giải tỏa những ức chế, lo toan dồn nén của cả một năm dài, gửi gắm hy vọng vào một sự thay đổi mà lúc đó chưa ai biết rõ hình hài sẽ ra sao.`,
    images: [
      { 
        type: 'image', 
        src: 'https://media.vneconomy.vn/images/upload/2024/01/25/tet-binh-dan-1986.jpg', 
        caption: 'Tết Bính Dần 1986 - "Cái Tết bao cấp cuối cùng"' 
      }
    ],
    videos: []
  },
  {
    date: '12/1986',
    title: '2. Đại Hội VI - Nhìn Thẳng Vào Sự Thật',
    content: `Đại hội đại biểu toàn quốc lần thứ VI của Đảng diễn ra vào tháng 12/1986 tại Hà Nội không mang màu sắc của những lời ca tụng sáo rỗng thường thấy trước đó. Phương châm của Đại hội là "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật". Báo cáo chính trị đã nghiêm khắc thừa nhận những sai lầm trong lãnh đạo kinh tế: bệnh chủ quan, duy ý chí, nóng vội muốn đốt cháy giai đoạn, ham làm lớn, thiên về phát triển công nghiệp nặng trong khi chưa đủ điều kiện.

Sự thừa nhận này không làm giảm uy tín của Đảng, mà ngược lại, đã khôi phục niềm tin trong nhân dân. Nó chứng minh rằng Đảng có khả năng tự sửa sai và tự đổi mới để tiếp tục sứ mệnh lãnh đạo. Đây là luận cứ quan trọng để bảo vệ quan điểm "không chệch hướng CNXH": Đổi mới để củng cố vai trò lãnh đạo của Đảng và tính ưu việt của chế độ, chứ không phải để phủ nhận nó.`,
    images: [
      { 
        type: 'image', 
        src: 'https://dangcongsan.vn/DATA/0/2016/12/15/Dangcongsan/dhoi%20vi%20_16_18_35_234.jpg', 
        caption: 'Đại hội Đảng toàn quốc lần thứ VI (12/1986)' 
      }
    ],
    videos: [
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
    content: `Đại hội VI đã đề ra nội dung cốt lõi của Đổi mới kinh tế, tạo ra "phương thức" mới cho con đường phát triển XHCN ở Việt Nam. Có ba chương trình kinh tế lớn: Chương trình Lương thực – Thực phẩm được xác định là ưu tiên hàng đầu, Chương trình Hàng tiêu dùng ra đời nhằm khắc phục tình trạng khan hiếm, và Chương trình Hàng xuất khẩu được triển khai trong bối cảnh nền kinh tế thiếu ngoại tệ.

Đại hội VI đã tạo ra một cuộc cách mạng khi chính thức thừa nhận sự tồn tại khách quan và lâu dài của nền kinh tế nhiều thành phần trong thời kỳ quá độ. Điều này có nghĩa là Đảng chấp nhận cho kinh tế tư nhân, kinh tế cá thể được hoạt động, phát triển.`,
    images: [
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
    ],
    videos: []
  }
];

// --- COMPONENT CHÍNH - Giao diện giống Timeline1945, 1954, 1975 với màu chủ đạo xanh dương/indigo ---
export function Timeline1986() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'gallery'>('timeline');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showAllMedia, setShowAllMedia] = useState<boolean>(false);

  // Gom tất cả media thành một mảng
  const allMedia = DATA_1986.flatMap(event => 
    [...event.images, ...event.videos].map(m => ({ 
      ...m, 
      eventDate: event.date, 
      eventTitle: event.title 
    }))
  );

  const featuredMedia = allMedia.slice(0, 8);

  // Hàm kiểm tra nội dung ngắn (giống các timeline khác)
  const isShortContent = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return wordCount < 150; // Nếu ít hơn 150 từ coi là ngắn
  };

  return (
    <div className="space-y-8">
      {/* Header - Màu xanh dương/indigo */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-blue-900/20 p-8 border border-indigo-200/30 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-600 flex items-center justify-center shadow-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-800 tracking-tighter">
                  1986
                </h2>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  Đổi Mới - Bước Ngoặt Từ Khủng Hoảng Đến Đột Phá
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Màu xanh dương/indigo */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 justify-center ${
            activeTab === 'timeline' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Dòng thời gian</span>
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 justify-center ${
            activeTab === 'gallery' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Film className="w-5 h-5" />
          <span>Thư viện tư liệu</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px] animate-in fade-in duration-700">
        
        {/* TAB DÒNG THỜI GIAN - Layout giống các timeline khác */}
        {activeTab === 'timeline' && (
          <div className="space-y-12">
            {DATA_1986.map((event, idx) => {
              const contentIsShort = isShortContent(event.content);
              const allEventMedia = [...event.images, ...event.videos];
              
              return (
                <div key={idx} className="relative group">
                  {/* Timeline line and dot - Màu xanh dương/indigo */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-indigo-300 to-transparent hidden md:block"></div>
                  <div className="absolute left-6 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 border-4 border-white shadow-lg hidden md:block"></div>
                  
                  {/* Content Card */}
                  <div className="ml-0 md:ml-12 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                    {/* Date Header - Màu xanh dương/indigo */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="inline-block px-4 py-2 bg-white rounded-full text-blue-700 font-bold border border-blue-200">
                            {event.date}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900 mt-3 leading-tight">{event.title}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Content and Media - Layout grid ngang khi nội dung ngắn */}
                    <div className="p-6">
                      {allEventMedia.length > 0 ? (
                        <div className={`${contentIsShort ? 'grid grid-cols-1 lg:grid-cols-3 gap-8' : 'space-y-8'}`}>
                          {/* Text Content */}
                          <div className={`${contentIsShort ? 'lg:col-span-2' : 'w-full'}`}>
                            <div className="prose prose-lg max-w-none">
                              <div className="text-gray-700 leading-relaxed space-y-4">
                                {event.content.split('\n\n').map((paragraph, pIdx) => (
                                  <p key={pIdx} className="text-lg">
                                    {paragraph}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Media Gallery - Grid ngang hoặc dọc tùy vào độ dài nội dung */}
                          {contentIsShort ? (
                            // Grid ngang khi nội dung ngắn
                            <div className="lg:col-span-1 space-y-4">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                  <ImageIcon className="w-5 h-5 text-blue-600" />
                                  <span>Tư liệu ({allEventMedia.length})</span>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                {allEventMedia.slice(0, 3).map((media, mediaIdx) => (
                                  <div 
                                    key={mediaIdx} 
                                    className="group relative rounded-xl overflow-hidden border border-gray-300 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                                    onClick={() => setSelectedMedia(media)}
                                  >
                                    <div className="aspect-video overflow-hidden bg-gray-100">
                                      {media.type === 'image' ? (
                                        <>
                                          <img 
                                            src={media.src} 
                                            alt={media.caption}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                            onError={(e) => {
                                              e.currentTarget.src = "https://placehold.co/600x400/2563eb/ffffff?text=Tư+Liệu+Lịch+Sử";
                                            }}
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </>
                                      ) : (
                                        <div className="relative w-full h-full">
                                          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                              <Play className="w-8 h-8 text-white" />
                                            </div>
                                          </div>
                                          <img 
                                            src={`https://img.youtube.com/vi/${media.src}/hqdefault.jpg`}
                                            alt={media.caption}
                                            className="w-full h-full object-cover opacity-60"
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-3 h-3 rounded-full ${
                                          media.type === 'image' ? 'bg-blue-500' : 'bg-indigo-500'
                                        }`}></div>
                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                          {media.type === 'image' ? 'Ảnh' : 'Video'}
                                        </span>
                                      </div>
                                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{media.caption}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            // Grid dọc phía dưới khi nội dung dài
                            <div className="w-full pt-8 border-t border-gray-100">
                              <div className="flex items-center gap-2 mb-6">
                                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                  <ImageIcon className="w-5 h-5 text-blue-600" />
                                  <span>Tư liệu liên quan ({allEventMedia.length})</span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {allEventMedia.map((media, mediaIdx) => (
                                  <div 
                                    key={mediaIdx} 
                                    className="group relative rounded-xl overflow-hidden border border-gray-300 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                                    onClick={() => setSelectedMedia(media)}
                                  >
                                    <div className="aspect-video overflow-hidden bg-gray-100">
                                      {media.type === 'image' ? (
                                        <>
                                          <img 
                                            src={media.src} 
                                            alt={media.caption}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </>
                                      ) : (
                                        <div className="relative w-full h-full">
                                          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                              <Play className="w-8 h-8 text-white" />
                                            </div>
                                          </div>
                                          <img 
                                            src={`https://img.youtube.com/vi/${media.src}/hqdefault.jpg`}
                                            alt={media.caption}
                                            className="w-full h-full object-cover opacity-60"
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-3 h-3 rounded-full ${
                                          media.type === 'image' ? 'bg-blue-500' : 'bg-indigo-500'
                                        }`}></div>
                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                          {media.type === 'image' ? 'Ảnh' : 'Video'}
                                        </span>
                                      </div>
                                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{media.caption}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Không có media
                        <div className="prose prose-lg max-w-none">
                          <div className="text-gray-700 leading-relaxed space-y-4">
                            {event.content.split('\n\n').map((paragraph, pIdx) => (
                              <p key={pIdx} className="text-lg">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB THƯ VIỆN TƯ LIỆU - Giống các timeline khác */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(showAllMedia ? allMedia : featuredMedia).map((media, idx) => (
                <div 
                  key={idx} 
                  className="group relative rounded-2xl overflow-hidden border border-gray-300 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedMedia(media)}
                >
                  {/* Media Preview */}
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {media.type === 'image' ? (
                      <>
                        <img 
                          src={media.src} 
                          alt={media.caption}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/2563eb/ffffff?text=Ảnh+Tư+Liệu";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    ) : (
                      <div className="relative w-full h-full">
                        <img 
                          src={`https://img.youtube.com/vi/${media.src}/hqdefault.jpg`}
                          alt={media.caption}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-4">
                          <div className="w-12 h-12 rounded-full bg-blue-600/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Media Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          media.type === 'image' ? 'bg-blue-500' : 'bg-indigo-500'
                        }`}></div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          {media.type === 'image' ? 'Ảnh' : 'Video'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {media.eventDate}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 line-clamp-2 mb-2" title={media.caption}>
                      {media.caption}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2" title={media.eventTitle}>
                      {media.eventTitle}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <div className="text-sm font-medium mb-1">Xem chi tiết</div>
                      <div className="text-xs opacity-90">Nhấn để mở rộng</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {allMedia.length > 8 && !showAllMedia && (
              <div className="text-center pt-6">
                <button
                  onClick={() => setShowAllMedia(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Xem tất cả {allMedia.length} tư liệu
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Media Modal - Đã cập nhật với design mới */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMedia(null);
            }}
            className="absolute top-6 right-6 text-white hover:text-blue-300 transition-colors p-3 bg-black/50 rounded-full z-10 hover:bg-black/70"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative w-full max-w-6xl flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Container chính với max-height cố định */}
            <div className="w-full bg-gray-900 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Nội dung video/ảnh - luôn visible */}
              <div className="flex-1 min-h-0">
                {selectedMedia.type === 'image' ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={selectedMedia.src} 
                      alt={selectedMedia.caption}
                      className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/800x600/2563eb/ffffff?text=Không+thể+tải+ảnh";
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedMedia.src}?autoplay=1&rel=0`}
                      title={selectedMedia.caption}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                )}
              </div>
              
              {/* Thông tin caption - có thể scroll nếu dài */}
              <div className="p-6 bg-gray-800 border-t border-gray-700">
                <div className="flex items-start gap-4">
                  <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                    selectedMedia.type === 'image' ? 'bg-blue-500' : 'bg-indigo-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-300 bg-gray-700 px-3 py-1 rounded-full">
                        {selectedMedia.type === 'image' ? 'Ảnh tư liệu' : 'Video tư liệu'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {selectedMedia.type === 'video' ? 'Nhấn phát để xem' : 'Nhấn để phóng to'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{selectedMedia.caption}</h3>
                    
                    {/* Hiển thị thêm các video khác nếu có */}
                    {selectedMedia.type === 'video' && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-300 mb-2">Video khác</p>
                        <div className="text-lg font-semibold text-white">
                          ĐẠI HỘI ĐẢNG LẦN THỨ III
                          <span className="block text-sm text-gray-300 mt-1">Video tư liệu lịch sử</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons nếu có nhiều media */}
            {allMedia.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = allMedia.findIndex(m => 
                      m.src === selectedMedia.src && m.type === selectedMedia.type
                    );
                    const prevIndex = (currentIndex - 1 + allMedia.length) % allMedia.length;
                    setSelectedMedia(allMedia[prevIndex]);
                  }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <div className="text-white text-sm">
                  {allMedia.findIndex(m => 
                    m.src === selectedMedia.src && m.type === selectedMedia.type
                  ) + 1} / {allMedia.length}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = allMedia.findIndex(m => 
                      m.src === selectedMedia.src && m.type === selectedMedia.type
                    );
                    const nextIndex = (currentIndex + 1) % allMedia.length;
                    setSelectedMedia(allMedia[nextIndex]);
                  }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
        <p>Nguồn tư liệu: Bảo tàng Lịch sử Quân sự Việt Nam, Thông tấn xã Việt Nam</p>
        <p className="mt-1">© 1986-2024 - Kỷ niệm Đổi Mới - Bước ngoặt lịch sử của Việt Nam</p>
      </div>
    </div>
  );
}
