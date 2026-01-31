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

const DATA_1954: TimelineEvent[] = [
  {
    date: '1954 - 1957',
    title: '1. Bối cảnh lịch sử và sự xác lập con đường quá độ',
    content: `Sau chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu", Hiệp định Giơnevơ năm 1954 về Đông Dương đã được ký kết, đánh dấu một bước ngoặt quyết định trong tiến trình cách mạng Việt Nam.

Với các điều khoản của hiệp định, nước Việt Nam tạm thời bị chia cắt thành hai miền qua vĩ tuyến 17, với hai chế độ chính trị khác nhau. Miền Bắc hoàn toàn được giải phóng, tạo điều kiện cho Đảng Lao động Việt Nam triển khai những bước đi đầu tiên của thời kỳ quá độ lên chủ nghĩa xã hội.`,
    images: [
      { type: 'image', src: 'https://file3.qdnd.vn/data/images/0/2024/05/08/upload_2072/dien%20bien%20phu%201954.jpg', caption: 'Bộ đội tiến về tiếp quản Thủ đô (10/10/1954)' },
      { type: 'image', src: 'https://www.nxbctqg.org.vn/img_data/images/HiepdinhGionevo.jpg', caption: 'Hiệp định Giơnevơ' }
    ],
    videos: [
      { type: 'video', src: 'rHB7aQG72po', caption: 'Phim tài liệu - Giải phóng Thủ đô 10/10/1954 [GLS số 16]' }
    ]
  },
  {
    date: '10-10-1954',
    title: '1.1. Tiếp quản Thủ đô và củng cố chính quyền cách mạng',
    content: `Sự kiện ngày 10-10-1954, khi bộ đội Việt Nam tiến vào tiếp quản Thủ đô Hà Nội trong không khí hào hùng, đã mở đầu cho công cuộc xây dựng cuộc sống mới. Quá trình này hoàn tất khi toán lính Pháp cuối cùng rút khỏi đảo Cát Bà vào ngày 16-5-1955, đánh dấu việc miền Bắc sạch bóng quân xâm lược. Ngay sau đó, nhiệm vụ chính trị cấp thiết là củng cố chính quyền và ổn định đời sống nhân dân.

Về mặt tổ chức bộ máy, Nhà nước đã thực hiện những điều chỉnh lớn để phù hợp với yêu cầu quản lý kinh tế và xã hội trong thời kỳ mới. Tại kỳ họp thứ 5 Quốc hội khóa I (tháng 9-1955), hệ thống lãnh đạo cấp cao được kiện toàn với việc bầu Cụ Tôn Đức Thắng làm Trưởng ban Thường trực Quốc hội, ông Phạm Văn Đồng giữ chức Thủ tướng, và các ông Phan Kế Toại, Võ Nguyên Giáp giữ chức Phó Thủ tướng.`,
    images: [
      { type: 'image', src: 'https://upload.wikimedia.org/wikipedia/vi/7/73/Tonducthang.jpg', caption: 'Tôn Đức Thắng' },
      { type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Ph%E1%BA%A1m_V%C4%83n_%C4%90%E1%BB%93ng_1972.jpg/500px-Ph%E1%BA%A1m_V%C4%83n_%C4%90%E1%BB%93ng_1972.jpg', caption: 'Phạm Văn Đồng' },
      { type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Phan_K%E1%BA%BF_To%E1%BA%A1i%2C_Souverains_et_notabilites_d%27Indochine_%28cropped%29.jpg/330px-Phan_K%E1%BA%BF_To%E1%BA%A1i%2C_Souverains_et_notabilites_d%27Indochine_%28cropped%29.jpg', caption: 'Ông Phan Kế Toại' },
      { type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Mr._Vo_Nguyen_Giap.jpg/500px-Mr._Vo_Nguyen_Giap.jpg', caption: 'Ông Võ Nguyên Giáp' }
    ],
    videos: []
  },
  {
    date: '7-1954',
    title: '1.2. Cải cách ruộng đất',
    content: `Nhiệm vụ trọng tâm và triệt để nhất trong giai đoạn 1954 – 1956 là hoàn thành cải cách ruộng đất để thực hiện mục tiêu "Người cày có ruộng", xóa bỏ tàn dư phong kiến đã tồn tại hàng thế kỷ.

Về mặt tổ chức bộ máy, Nhà nước đã thực hiện những điều chỉnh lớn để phù hợp với yêu cầu quản lý kinh tế và xã hội trong thời kỳ mới. Tại kỳ họp thứ 5 Quốc hội khóa I (tháng 9-1955), hệ thống lãnh đạo cấp cao được kiện toàn với việc bầu Cụ Tôn Đức Thắng làm Trưởng ban Thường trực Quốc hội, ông Phạm Văn Đồng giữ chức Thủ tướng, và các ông Phan Kế Toại, Võ Nguyên Giáp giữ chức Phó Thủ tướng.`,
    images: [
      { type: 'image', src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUqmKxDcoByDdzzd1_D_lA2yz1OJ9rp5BL06Q647LHwySqThyphenhyphenGial34r2wXl2_85AhTpczl4a0hp5J7OipMfd5YLrVB7ZOUJ_2_rYZ5rhVCFC4vX96HtfNqpBZUWan1yXpzeOi0Cj3EdTz/s1600/6f6r8z.jpg', caption: 'Chia ruộng' },
      { type: 'image', src: 'https://thinhvuongvietnam.com/Content/UploadFiles/EditorFiles/images/2023/Quy4/images1165016109122023112156.jpg', caption: 'Cắm thẻ nhận ruộng trong cải cách ruộng đất' }
    ],
    videos: []
  },
  {
    date: '1955 – 1957',
    title: '1.3. Khôi phục kinh tế và ổn định xã hội',
    content: `Bên cạnh cải cách ruộng đất, Chính phủ đã ban hành "Tám chính sách khuyến khích sản xuất nông nghiệp" và triển khai các đợt phát động thi đua tiết kiệm để khôi phục các cơ sở hạ tầng bị tàn phá trong chiến tranh. Việc ban hành các chính sách về dân tộc (thành lập Khu tự trị Thái - Mèo năm 1955) và tôn giáo (bảo đảm tự do tín ngưỡng) đã góp phần tạo ra một môi trường chính trị ổn định, thu hút sự đóng góp của mọi tầng lớp nhân dân vào công cuộc kiến thiết.`,
    images: [
      { type: 'image', src: 'https://baotangsonla.vn/data/2/images/tin-tuc/z4351850391454_899a29d6fe8350dabee6e88e391b4acb.jpg', caption: 'Kỷ niệm 5 năm chiến thắng Điện Biên Phủ' }
    ],
    videos: []
  },
  {
    date: '1958 - 1960',
    title: '2. Chuyển dịch sang mô hình xã hội chủ nghĩa và Kế hoạch 3 năm (1958 - 1960)',
    content: `Mục tiêu cốt lõi của giai đoạn này là đưa nông dân vào các hợp tác xã, cải tạo các thành phần kinh tế tư nhân và thiết lập sự thống trị của thành phần kinh tế quốc doanh.

2.1 Hợp tác hóa và Công tư hợp doanh
Việc xây dựng các hợp tác xã (HTX) được coi là con đường tất yếu để đưa nông nghiệp từ sản xuất nhỏ, lạc hậu lên sản xuất lớn xã hội chủ nghĩa. Tính đến năm 1960, phần lớn hộ nông dân ở miền Bắc đã tham gia vào các HTX nông nghiệp bậc thấp. Đồng thời, Nhà nước thực hiện cải tạo đối với thủ công nghiệp và công thương nghiệp tư bản tư doanh bằng hình thức công tư hợp doanh, đưa các nhà tư sản vào guồng máy sản xuất chung dưới sự quản lý của Nhà nước`,
    images: [
      { type: 'image', src: 'https://thinhvuongvietnam.com/Content/UploadFiles/Thumb/2023/Quy4/redsvn-ha-noi-sau-1954-12-9251-155626924527102023101530.jpg', caption: 'Phong trào hợp tác hóa nông nghiệp ở miền Bắc (1958-1960)' }
    ],
    videos: []
  },
  {
    date: '1961 - 1965',
    title: '3. Đường lối chiến lược từ Đại hội III và Kế hoạch 5 năm lần thứ nhất (1961 – 1965)',
    content: `Tháng 9-1960, Đại hội đại biểu toàn quốc lần thứ III của Đảng Lao động Việt Nam đã họp tại Hà Nội, xác lập một chiến lược cách mạng song song: xây dựng chủ nghĩa xã hội ở miền Bắc và đấu tranh giải phóng dân tộc ở miền Nam. Đại hội khẳng định miền Bắc là "hậu phương lớn", có vai trò quyết định nhất đối với sự nghiệp thống nhất đất nước.

3.1 Ưu tiên phát triển công nghiệp nặng và cơ sở hạ tầng
Kế hoạch 5 năm lần thứ nhất (1961 - 1965) đặt trọng tâm vào việc xây dựng nền tảng vật chất - kỹ thuật cho chủ nghĩa xã hội. 
Khu gang thép Thái Nguyên. Được thành lập theo Quyết định ngày 04-6-1959, đây là công trình trọng điểm nhằm thực hiện Nghị quyết Trung ương 14 khóa II, biểu tượng cho "ngọn lửa thép gang" của miền Bắc xã hội chủ nghĩa. Sự hình thành các khu công nghiệp lớn tại Hà Nội, Hải Phòng, Việt Trì và Thái Nguyên đã tạo ra một diện mạo mới cho nền kinh tế, cung cấp tư liệu sản xuất cho nông nghiệp và vật chất cho tiền tuyến.`,
    images: [
      { type: 'image', src: 'https://thainguyen.dcs.vn/uploads/hoat-dong-cua-cac-dang-bo/2024_06/image-20240604134132-2.png', caption: 'Khu công nghiệp Gang thép Thái Nguyên - Những người đầu tiên góp phần xây nên Khu Gang thép đầu tiên của đất nước' }
    ],
    videos: [
      { type: 'video', src: 'LabfX3in-UY', caption: 'ĐẠI HỘI ĐẢNG LẦN THỨ III' },
      { type: 'video', src: '80YzScAW3Cw', caption: 'Những người đầu tiên góp phần xây nên Khu Gang thép đầu tiên của đất nước' }
    ]
  },
  {
    date: '1961 - 1965',
    title: '3.2 Các phong trào thi đua biểu tượng',
    content: `Điểm đặc biệt của giai đoạn 1954 – 1965 là sự bùng nổ của các phong trào thi đua yêu nước, tạo nên sức mạnh tinh thần to lớn để bù đắp cho sự thiếu hụt về vật chất. 

Gió Đại Phong (Nông nghiệp): Xuất phát từ Hợp tác xã Đại Phong tại Quảng Bình dưới sự chỉ đạo của Đại tướng Nguyễn Chí Thanh. Với điều kiện đất chiêm trũng, nhiễm mặn thường xuyên, HTX Đại Phong đã vươn lên nhờ cải tiến quản lý và kỹ thuật, trở thành lá cờ đầu với mục tiêu tăng năng suất và số ngày công lao động. 

Sóng Duyên Hải (Công nghiệp): Bắt đầu từ Nhà máy Cơ khí Duyên Hải (Hải Phòng) vào năm 1960. Phong trào tập trung vào phát huy sáng kiến, phá vỡ các định mức lao động cũ để tăng năng suất từ 50% đến hơn 600%.

Cờ Ba Nhất (Quân đội): Khởi nguồn từ Trung đoàn Pháo binh 68 thuộc Sư đoàn 304, được tuyên dương với ba tiêu chí: " (Bắn giỏi nhất, nhiều người tham gia nhất, thành tích đều nhất)" trong huấn luyện và sẵn sàng chiến đấu.   

Tiếng Trống Bắc Lý (Giáo dục): Từ trường THCS Bắc Lý (Hà Nam), phong trào "Dạy thật tốt, học thật tốt" đã lan tỏa triết lý giáo dục gắn liền với lao động sản xuất và thực tiễn đời sống. 

Những phong trào này không chỉ là những điển hình tiên tiến mà còn là biểu tượng của sự đoàn kết Công-Nông-Binh dưới sự lãnh đạo của Đảng, được Chủ tịch Hồ Chí Minh biểu dương như những tấm gương sáng của thời đại.`,
    images: [
      { type: 'image', src: 'https://file3.qdnd.vn/data/images/0/2023/12/30/upload_1021/30.jpg?dpi=150&quality=100&w=870', caption: 'Đại tướng Nguyễn Chí Thanh cấy lúa cùng bà con xã viên Hợp tác xã Chiến Thắng (1-1962)' },
      { type: 'image', src: 'https://file3.qdnd.vn/data/images/0/2023/12/30/upload_1021/dai%20tuong%20nong%20dan%202.jpg?dpi=150&quality=100&w=870', caption: 'Đại tướng Nguyễn Chí Thanh thăm trại chăn nuôi bò sữa' },
      { type: 'image', src: 'https://media.vov.vn/sites/default/files/styles/large/public/2025-04/quan_va_dan_tp_hai_phong_chuan_bi_chien_dau_chong_cuoc_tap_kich_duong_khong_cua_de_quoc_my_cuoi_nam_1972_anh_tu_lieu.jpg', caption: 'Quân và dân TP Hải Phòng (Quê hương Sóng Duyên Hải)' },
      { type: 'image', src: 'https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785100c961dd66b3261bcca1b5c657b6240393be9827672d40f22c951d39e7aa076/kien_an.jpg', caption: 'Tiếng trống Bắc Lý - Thông điệp lịch sử' }
    ],
    videos: [
      { type: 'video', src: 'e25QJiVJq6c', caption: 'Gió Đại Phong: Động lực hùng mạnh thúc đẩy nông nghiệp Việt | Đảng với Dân' },
      { type: 'video', src: 'fgOchEORDgM', caption: 'Thông điệp lịch sử. Tiếng trống Bắc Lý - VNEWS' }
    ]
  }
];

// --- COMPONENT CHÍNH - Giao diện giống Timeline1945 với màu chủ đạo xanh lá (Lime) ---
export function Timeline1954() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'gallery'>('timeline');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showAllMedia, setShowAllMedia] = useState<boolean>(false);

  // Gom tất cả media thành một mảng
  const allMedia = DATA_1954.flatMap(event => 
    [...event.images, ...event.videos].map(m => ({ 
      ...m, 
      eventDate: event.date, 
      eventTitle: event.title 
    }))
  );

  const featuredMedia = allMedia.slice(0, 8);

  // Hàm kiểm tra nội dung ngắn (giống 1945)
  const isShortContent = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return wordCount < 150; // Nếu ít hơn 150 từ coi là ngắn
  };

  return (
    <div className="space-y-8">
      {/* Header - Màu xanh lá (Lime) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-lime-900/20 via-emerald-900/20 to-lime-900/20 p-8 border border-lime-200/30 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-700 to-emerald-600 flex items-center justify-center shadow-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-800 via-emerald-700 to-lime-800 tracking-tighter">
                  1954 - 1965
                </h2>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  Miền Bắc Bắt Đầu Quá Độ Lên Chủ Nghĩa Xã Hội
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Màu xanh lá */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 justify-center ${
            activeTab === 'timeline' 
              ? 'bg-gradient-to-r from-lime-600 to-emerald-600 text-white shadow-lg' 
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
              ? 'bg-gradient-to-r from-lime-600 to-emerald-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Film className="w-5 h-5" />
          <span>Thư viện tư liệu</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px] animate-in fade-in duration-700">
        
        {/* TAB DÒNG THỜI GIAN - Layout giống 1945 */}
        {activeTab === 'timeline' && (
          <div className="space-y-12">
            {DATA_1954.map((event, idx) => {
              const contentIsShort = isShortContent(event.content);
              const allEventMedia = [...event.images, ...event.videos];
              
              return (
                <div key={idx} className="relative group">
                  {/* Timeline line and dot - Màu xanh lá */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-400 via-emerald-300 to-transparent hidden md:block"></div>
                  <div className="absolute left-6 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-lime-600 to-emerald-500 border-4 border-white shadow-lg hidden md:block"></div>
                  
                  {/* Content Card */}
                  <div className="ml-0 md:ml-12 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                    {/* Date Header - Màu xanh lá */}
                    <div className="bg-gradient-to-r from-lime-50 to-emerald-50 p-6 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-600 to-emerald-500 flex items-center justify-center shadow-md">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="inline-block px-4 py-2 bg-white rounded-full text-lime-700 font-bold border border-lime-200">
                            {event.date}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900 mt-3 leading-tight">{event.title}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Content and Media - Layout 2/3 - 1/3 hoặc grid ngang khi nội dung ngắn */}
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
                                  <ImageIcon className="w-5 h-5 text-lime-600" />
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
                                              e.currentTarget.src = "https://placehold.co/600x400/84cc16/ffffff?text=Tư+Liệu+Lịch+Sử";
                                            }}
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </>
                                      ) : (
                                        <div className="relative w-full h-full">
                                          <div className="absolute inset-0 bg-gradient-to-r from-lime-900/50 to-emerald-900/50 flex items-center justify-center">
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
                                          media.type === 'image' ? 'bg-lime-500' : 'bg-emerald-500'
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
                                  <ImageIcon className="w-5 h-5 text-lime-600" />
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
                                          <div className="absolute inset-0 bg-gradient-to-r from-lime-900/50 to-emerald-900/50 flex items-center justify-center">
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
                                          media.type === 'image' ? 'bg-lime-500' : 'bg-emerald-500'
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

        {/* TAB THƯ VIỆN TƯ LIỆU - Giống Timeline 1945 */}
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
                            e.currentTarget.src = "https://placehold.co/600x400/84cc16/ffffff?text=Ảnh+Tư+Liệu";
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
                          <div className="w-12 h-12 rounded-full bg-lime-600/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-lime-700 transition-colors">
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
                          media.type === 'image' ? 'bg-lime-500' : 'bg-emerald-500'
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
                  className="px-6 py-3 bg-gradient-to-r from-lime-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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
            className="absolute top-6 right-6 text-white hover:text-lime-300 transition-colors p-3 bg-black/50 rounded-full z-10 hover:bg-black/70"
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
                        e.currentTarget.src = "https://placehold.co/800x600/84cc16/ffffff?text=Không+thể+tải+ảnh";
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
                    selectedMedia.type === 'image' ? 'bg-lime-500' : 'bg-emerald-500'
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
    </div>
  );
}
