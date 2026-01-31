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

const DATA_1975: TimelineEvent[] = [
  {
    date: '04-08/03/1975',
    title: 'Chiến dịch Tây Nguyên - Trận then chốt Buôn Ma Thuột',
    content: `04/03: Quân Giải phóng bắt đầu tiến công khu vực Tây Nguyên.
10/03: Mở màn trận then chốt Buôn Ma Thuột.
14/03: Giải phóng hoàn toàn Buôn Ma Thuột.

Chiến dịch Tây Nguyên là đòn tiến công chiến lược đầu tiên, tạo bước ngoặt quan trọng, đánh bại Quân đoàn 2 của chính quyền Sài Gòn, mở ra cục diện mới cho toàn chiến trường.`,
    images: [
      { 
        type: 'image', 
        src: 'https://cdnmedia.baotintuc.vn/2015/03/10/15/44/taynguyen4.jpg', 
        caption: 'Bồ đội tiến đánh chiến dịch Tây Nguyên' 
      },
      { 
        type: 'image', 
        src: 'https://image.sggp.org.vn/w1000/Uploaded/2026/ohpohuo/2023_03_10/j3a-8878.jpg.webp', 
        caption: 'Trận đánh tại Buôn Ma Thuột' 
      }
    ],
    videos: [
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
    images: [
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
    ],
    videos: []
  },
  {
    date: '28-29/03/1975',
    title: 'Giải phóng Đà Nẵng',
    content: `28/03: Các cánh quân tiến vào Đà Nẵng.
29/03: 10h30 - Giải phóng hoàn toàn Đà Nẵng.

Đà Nẵng - thành phố lớn thứ hai miền Nam, trung tâm quân sự quan trọng bị giải phóng chỉ sau 2 ngày tiến công. Sự sụp đổ của Đà Nẵng khiến toàn bộ hệ thống phòng thủ của đối phương ở miền Trung tan rã.`,
    images: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_03_29/danang_oyag.jpg', 
        caption: 'Bộ đội tiến vào Đà Nẵng' 
      },
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_03_29/danang_1975_2_yapm.jpg', 
        caption: 'Nhân dân Đà Nẵng chào đón giải phóng' 
      }
    ],
    videos: [
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
    images: [
      { 
        type: 'image', 
        src: 'https://baotanglichsu.vn/uploads/news/2021_04/xuan-loc-1975-1.jpg', 
        caption: 'Trận Xuân Lộc - cửa ngõ Sài Gòn' 
      }
    ],
    videos: []
  },
  {
    date: '21/04/1975',
    title: 'Tổng thống Nguyễn Văn Thiệu từ chức',
    content: `Trước thất bại quân sự liên tiếp, Tổng thống Nguyễn Văn Thiệu tuyên bố từ chức trong bài diễn văn dài trên đài truyền hình Sài Gòn.

Ông giao quyền lại cho Phó tổng thống Trần Văn Hương. Sự kiện này cho thấy sự khủng hoảng sâu sắc của chính quyền Sài Gòn.`,
    images: [
      { 
        type: 'image', 
        src: 'https://baotanglichsu.vn/uploads/news/2020_04/nguyen-van-thieu-tu-chuc-ngay-21-4-1975-1.jpg', 
        caption: 'Nguyễn Văn Thiệu từ chức ngày 21/4/1975' 
      }
    ],
    videos: []
  },
  {
    date: '26-28/04/1975',
    title: 'Chiến dịch Hồ Chí Minh - Tổng tiến công',
    content: `26/04: 5 cánh quân của Chiến dịch Hồ Chí Minh bắt đầu tổng tiến công.
27/04: Đánh chiếm các căn cứ quân sự quan trọng quanh Sài Gòn.
28/04: Bao vây và siết chặt vòng vây quanh Sài Gòn.

Đây là chiến dịch quyết định cuối cùng nhằm giải phóng hoàn toàn miền Nam.`,
    images: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_04_26/chiendichhcm_1975_1_ypfy.jpg', 
        caption: 'Bộ đội hành quân trong Chiến dịch Hồ Chí Minh' 
      }
    ],
    videos: [
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
    images: [
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
      }
    ],
    videos: [
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
    images: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_05_01/giaiphong_mien_nam_1_oxpv.jpg', 
        caption: 'Lễ chào cờ đầu tiên sau giải phóng' 
      }
    ],
    videos: []
  },
  
  {
    date: '03/1975',
    title: '1. Điểm gãy chiến lược tại "Nóc nhà" Tây Nguyên',
    content: `Mở đầu bằng tiếng súng tại Buôn Ma Thuột ngày 10/3, Chiến dịch Tây Nguyên không chỉ đơn thuần là một thắng lợi quân sự mà còn là minh chứng cho quy luật tích lũy về Lượng dẫn đến sự thay đổi về Chất. Sau hơn hai năm xây dựng hậu phương miền Bắc XHCN, tiềm lực vật chất và ý chí chính trị đã đạt đến "điểm tới hạn" để bùng nổ. Việc chọn Tây Nguyên làm điểm đột phá thể hiện tư duy nhạy bén của Đảng trong việc đánh vào "yết hầu" của chế độ cũ, khiến đối phương hoàn toàn bất ngờ. Kết quả không chỉ là giải phóng đất đai, mà là sự tan rã hoàn toàn về mặt tổ chức của một quân đoàn chính quy, khẳng định ưu thế của mô hình huy động tài lực tập trung trong việc tạo ra sức mạnh áp đảo khiến đối phương không kịp phản ứng.

2. Miền Bắc: Sức nén của niềm tin và tinh thần hỏa tốc
Trong những ngày tháng 3 lịch sử ấy, miền Bắc vận hành như một thực thể thống nhất với tinh thần "Tất cả cho tiền tuyến". Những chuyến xe đêm nối đuôi nhau vượt dãy Trường Sơn, mang theo không chỉ khí tài mà cả niềm hy vọng của cả một dân tộc. Người dân dù vẫn đang thắt lưng buộc bụng với chế độ tem phiếu khắc nghiệt, nhưng ánh mắt luôn hướng về những chiếc loa phát thanh công cộng tại các ngã tư, nín thở đón chờ tin thắng trận dồn dập từ Huế đến Đà Nẵng. Khái niệm "điểm tới hạn" lúc này không chỉ nằm ở kho vũ khí mà nằm ở sức nén của ý chí người dân sau hơn 20 năm chờ đợi ngày đoàn tụ, tạo nên một hậu phương vững chãi, sẵn sàng dồn toàn lực cho chiến thắng cuối cùng.

3. Miền Nam: Cơn địa chấn của sự hoang mang và tan rã
Trái ngược hoàn toàn với bầu không khí hăng hái ấy, miền Nam lại chìm trong một cơn địa chấn của sự hoang mang. Lệnh triệt thoái sai lầm khỏi Tây Nguyên đã tạo ra một cuộc tháo chạy hỗn loạn trên "lộ trình máu" tỉnh lộ 7, nơi hàng vạn binh lính và dân thường kẹt giữa khói lửa, đói khát và sự mất phương hướng cực độ. Tại các đô thị lớn như Sài Gòn, vẻ phồn hoa thường nhật nhanh chóng bị thay thế bằng tâm lý bất an khi giá cả leo thang, đồng tiền sụt giá và những dòng người đổ xô đi tích trữ lương thực hoặc tìm cách di tản. Sự đứt gãy lúc này không chỉ nằm ở các quân đoàn chính quy mà còn nằm ở niềm tin của người dân vào một thể chế đã rệu rã, khiến cấu trúc xã hội cũ sụp đổ nhanh hơn bất cứ dự báo quân sự nào.

4. Cuộc xoay chiều lịch sử thần tốc
Có thể nói, Việt Nam trong tháng 3/1975 như một chiếc lò xo đang bật tung về một phía. Một bên là sức mạnh tập trung đạt đến đỉnh điểm của mô hình miền Bắc, bên kia là sự sụp đổ dây chuyền về cả tổ chức lẫn tâm lý của hệ thống miền Nam. Sự tương phản này đã tạo nên một cục diện xoay chuyển thần tốc, biến những ngày tháng này trở thành khúc quanh kịch tính nhất của lịch sử dân tộc. Khi niềm tin và sức mạnh tổ chức của một phía đã đạt đến độ chín muồi, nó sẽ cuốn phăng mọi rào cản, biến khát vọng thống nhất thành hiện thực chỉ trong một thời gian ngắn ngủi nhưng đầy biến động.`,
    images: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_05_01/giaiphong_mien_nam_1_oxpv.jpg', 
        caption: 'Lễ chào cờ đầu tiên sau giải phóng' 
      }
    ],
    videos: []
  },
  {
    date: '04/1975',
    title: '2. Tháng 4/1975: Thời khắc lịch sử – Giải thể Kiến trúc thượng tầng cũ',
    content: `1. Cuộc tổng tiến công thần tốc và sự tê liệt của bộ máy đầu não
Tháng 4/1975 mở đầu bằng những đòn tấn công dồn dập, đập tan các "cánh cửa thép" phòng ngự từ xa như Phan Rang và Xuân Lộc. Khi tuyến phòng thủ cuối cùng bị chọc thủng, bộ máy chính trị của chế độ cũ rơi vào tình trạng hoảng loạn và tê liệt hoàn toàn. Sự kiện Tổng thống Nguyễn Văn Thiệu từ chức vào ngày 21/4 không chỉ là một sự thay đổi nhân sự cấp cao mà còn đánh dấu sự sụp đổ về mặt tinh thần của toàn bộ Kiến trúc thượng tầng cũ. Hệ thống hành chính vốn dựa trên sự viện trợ và cố vấn nước ngoài nay mất đi điểm tựa, khiến các mệnh lệnh từ trung ương trở nên vô hiệu trước sức ép của năm cánh quân giải phóng đang hội quân về Sài Gòn.

2. Xóa bỏ bộ máy cũ và thiết lập chính quyền nhân dân
Theo quy luật của cách mạng, giai cấp vô sản không kế thừa bộ máy hành chính quan liêu của chế độ cũ mà phải thay thế bằng một trật tự mới. Hình ảnh xe tăng húc đổ cổng Dinh Độc Lập trưa ngày 30/4 chính là biểu tượng lịch sử cho sự kết thúc của một thực thể chính trị đã tồn tại hai thập kỷ. Ngay lập tức, bản chất của quyền lực chính trị được dịch chuyển: từ một chính quyền phụ thuộc vào ngoại bang sang chính quyền của nhân dân lao động. Tại các địa phương, các Ủy ban Quân quản được thành lập để thay thế các ty, sở và hệ thống cảnh sát cũ, thực hiện nhiệm vụ duy trì an ninh, ổn định đời sống và xóa bỏ các tàn dư của văn hóa, chính trị cũ, đặt nền móng cho hệ thống Chuyên chính vô sản.

3. Tiếp quản hạ tầng vật chất và tiềm lực quốc gia
Một trong những điểm đặc biệt nhất của thời khắc lịch sử này là việc tiếp quản gần như nguyên vẹn hệ thống cơ sở hạ tầng cực kỳ hiện đại tại miền Nam. Các "tổng kho" khổng lồ như Long Bình, Tân Sơn Nhất cùng hệ thống cảng biển chiến lược và các khu công nghiệp tại Biên Hòa đã không bị phá hủy trong chiến tranh. Việc bảo vệ nguyên vẹn các cơ sở điện, nước và mạng lưới viễn thông giúp đời sống đô thị không bị gián đoạn. Đây chính là tiền đề vật chất vô cùng quan trọng, tạo ra nguồn lực sẵn có để chính quyền mới bắt đầu công cuộc phục hồi kinh tế, thay vì phải xây dựng lại từ đống đổ nát như các cuộc chiến tranh thông thường khác.

4. Bước chuyển dịch sang thời kỳ quá độ lên Chủ nghĩa xã hội
Sự kiện tháng 4/1975 đã thực hiện một bước ngoặt về quan hệ sở hữu: tài sản quốc gia không còn phục vụ lợi ích của một nhóm tinh hoa hay các tập đoàn nước ngoài mà trở thành sở hữu toàn dân. Toàn bộ hệ thống ngân hàng, đồn điền và các cơ sở sản xuất lớn được quốc hữu hóa, phục vụ cho kế hoạch phát triển kinh tế tập trung. Đây là giai đoạn chuyển tiếp quan trọng, nơi miền Nam bắt đầu bước vào thời kỳ quá độ, hòa nhập vào dòng chảy xã hội chủ nghĩa cùng miền Bắc. Sự thay đổi này không chỉ nằm ở tên gọi hay cờ hiệu, mà là sự thay đổi triệt để về bản chất kinh tế - xã hội, hướng tới mục tiêu xây dựng một đất nước thống nhất và tự chủ.`,
   images: [
      { 
        type: 'image', 
        src: 'https://media.vov.vn/uploaded/gnnlexby/2024_05_01/giaiphong_mien_nam_1_oxpv.jpg', 
        caption: 'Lễ chào cờ đầu tiên sau giải phóng' 
      }
    ],
    videos: []
  },
  {
    date: '05/1975 - 08/1975',
    title: '3. Giai đoạn tháng 5 - tháng 8/1975: Tiếp quản và "Cú sốc" văn hóa - kinh tế đầu tiên',
    content: `1. Thiết lập trật tự quân quản và ổn định mạch máu đô thị
Sau ngày 30/4, các đô thị lớn tại miền Nam, đặc biệt là Sài Gòn, được đặt dưới sự điều hành của các Ủy ban Quân quản nhằm nhanh chóng ổn định tình hình. Nhiệm vụ cấp thiết nhất lúc bấy giờ không còn là tác chiến mà là quản trị một đô thị khổng lồ với hàng triệu dân. Chính quyền mới đã huy động tối đa đội ngũ chuyên gia, kỹ thuật viên của chế độ cũ ở lại làm việc để duy trì hoạt động của các nhà máy điện Đa Nhim, nhà máy nước Thủ Đức và hệ thống viễn thông. Việc đăng ký nhân khẩu ráo riết và thiết lập các tổ tự quản tại từng phường khóm không chỉ giúp giữ vững an ninh trật tự mà còn giúp Nhà nước nắm bắt chính xác nguồn lực con người để chuẩn bị cho những kế hoạch cải tạo xã hội sau này.

2. Cuộc cách mạng tư tưởng và chiến dịch bài trừ văn hóa cũ
Giai đoạn này ghi dấu một "cú sốc" văn hóa mạnh mẽ khi hai lối sống vốn khác biệt sau 20 năm chia cắt bắt đầu va chạm. Để xác lập hệ tư tưởng mới, chính quyền triển khai chiến dịch "bài trừ văn hóa đồi trụy" trên quy mô lớn, tập trung vào việc tịch thu và tiêu hủy các loại sách báo, băng đĩa nhạc vàng và phim ảnh phương Tây vốn bị coi là tàn dư của tư duy thực dân. Thay vào đó, các buổi sinh hoạt chính trị tại địa phương và trường học được tổ chức thường xuyên để phổ biến lý tưởng cách mạng. Những thay đổi về diện mạo như cắt tóc ngắn, bỏ quần loe hay phong trào thanh niên xung phong lao động tập thể đã trở thành những nỗ lực đầu tiên nhằm định hình lại nhân sinh quan cho tầng lớp thị dân miền Nam.

3. Khủng hoảng kinh tế hậu viện trợ và sự ra đời của cơ chế phân phối
Về mặt kinh tế, miền Nam đối mặt với thực tế nghiệt ngã khi nguồn viện trợ khổng lồ từ Mỹ bị cắt đứt hoàn toàn, khiến một nền kinh tế vốn dựa vào nhập khẩu và dịch vụ rơi vào tình trạng hụt hẫng. Tình trạng khan hiếm hàng hóa nhu yếu phẩm bắt đầu xuất hiện, đẩy hàng triệu người dân thành thị vào cảnh khó khăn. Để giải quyết, Nhà nước đã thực hiện các biện pháp "cung cấp" lương thực trực tiếp, điều động hàng chục ngàn tấn gạo từ miền Bắc và các vùng căn cứ để cứu đói khẩn cấp. Đây chính là bước sơ khởi cho việc hình thành cơ chế phân phối bao cấp trên quy mô lớn, khi Nhà nước dần nắm quyền điều phối nguồn lực để đảm bảo mức sống tối thiểu cho nhân dân trong bối cảnh thiếu hụt trầm trọng.

4. Cuộc dịch chuyển dân cư và phong trào đi kinh tế mới
Để giải tỏa áp lực dân số tại các đô thị đang rơi vào tình trạng thất nghiệp và thiếu lương thực, Nhà nước đã phát động phong trào đưa dân đi xây dựng các vùng kinh tế mới. Đây là một cuộc dịch chuyển dân cư mang tính chiến lược nhưng cũng đầy gian khổ, khi hàng vạn gia đình thành phố vốn chỉ quen với nếp sống đô thị phải rời bỏ nhà cửa để khai hoang, phục hồi sản xuất nông nghiệp tại các vùng đất hoang sơ. Sự thay đổi này không chỉ nhằm mục đích tự túc lương thực tại chỗ mà còn là một phần trong kế hoạch tái cấu trúc lại sự phân bổ lao động giữa thành thị và nông thôn, tạo tiền đề vật chất cho công cuộc xây dựng chủ nghĩa xã hội trên toàn quốc.`,
    images: [],
    videos: []
  },
  {
    date: '09/1975',
    title: '4. Tháng 9/1975: Chiến dịch X1 – Cuộc tấn công vào "Lũy quỹ" của Tư sản mại bản',
    content: `1. Bối cảnh mâu thuẫn giữa hai mô hình kinh tế
Đến tháng 9/1975, mâu thuẫn giữa chính quyền mới và giới tư sản lũng đoạn miền Nam đã lên đến đỉnh điểm. Sau ngày 30/4, dù chính quyền quân quản đã nắm giữ bộ máy hành chính, nhưng giới "tư sản mại bản" vẫn nắm trong tay các "mạch máu" kinh tế: kho hàng nhu yếu phẩm, mạng lưới phân phối và đặc biệt là lượng tiền mặt khổng lồ. Sự tồn tại của thị trường tự do nằm ngoài tầm kiểm soát của Nhà nước đã gây ra tình trạng đầu cơ, tích trữ và làm lũng đoạn giá cả, khiến nỗ lực ổn định đời sống nhân dân của chính quyền gặp nhiều thách thức. Điều này buộc Nhà nước phải tiến hành một cuộc đại phẫu thuật để tước bỏ sức mạnh tài chính của giai cấp này.

2. Chiến dịch X1: Đánh vào "Lũy quỹ" của tư sản mại bản
Chiến dịch X1 được triển khai một cách bí mật và bất ngờ nhằm vào các hộ tư sản lớn tại Sài Gòn và các đô thị miền Nam. Mục tiêu của chiến dịch là kiểm kê, tịch thu tài sản của những nhà tư bản có liên quan chặt chẽ với chế độ cũ hoặc đang giữ vai trò thao túng thị trường. Các đoàn cán bộ quân quản cùng lực lượng thanh niên xung phong đã tiến hành kiểm kê các kho hàng, nhà máy và niêm phong tài sản của giới thượng lưu. Về mặt lý luận, đây là quá trình xóa bỏ quyền sở hữu tư nhân đối với tư liệu sản xuất, biến các cơ sở kinh tế này thành sở hữu nhà nước, nhằm phục vụ lợi ích chung của xã hội thay vì lợi ích của một nhóm nhỏ.

3. Cuộc đổi tiền lịch sử và cơ chế kiểm soát tiền tệ
Ngày 22/9/1975, lệnh đổi tiền được ban bố đồng loạt trên toàn miền Nam trong tình trạng thiết quân luật ngắn hạn. Nhà nước phát hành đồng tiền Ngân hàng Việt Nam (thường gọi là tiền giải phóng) để thay thế đồng tiền của chế độ cũ với tỷ lệ 1 đồng mới ăn 500 đồng cũ. Điểm then chốt nằm ở chỗ mỗi hộ gia đình chỉ được đổi ngay một lượng tiền mặt nhất định theo quy định (hạn mức), số tiền còn lại phải gửi vào tài khoản ngân hàng và muốn rút ra phải chứng minh nguồn gốc hoặc có lý do chính đáng. Biện pháp này không chỉ nhằm triệt tiêu khả năng dùng tiền mặt để đầu cơ gây rối loạn thị trường mà còn là cách để Nhà nước kiểm kê tài sản thực tế trong dân, "vô hiệu hóa" các kho tiền mặt khổng lồ của giới tư sản.

4. Quốc hữu hóa và xác lập quan hệ sản xuất mới
Song song với việc đổi tiền, hàng loạt ngân hàng tư nhân, nhà máy sản xuất công nghiệp và hệ thống kho vận tại miền Nam bị quốc hữu hóa hoàn toàn. Các ngân hàng thương mại cũ bị giải thể hoặc sáp nhập vào hệ thống Ngân hàng Nhà nước duy nhất. Tài sản của giới tư sản bị tịch thu hoặc chuyển đổi thành các xí nghiệp hợp doanh dưới sự quản lý của Nhà nước. Đây là bước đi quyết định để thiết lập hệ thống kinh tế kế hoạch hóa tập trung, nơi mọi nguồn lực kinh tế được điều phối từ trung ương. Cuộc chuyển dịch này đã chính thức đóng lại kỷ nguyên của kinh tế thị trường tự do tại miền Nam, mở đầu cho thời kỳ dài của cơ chế bao cấp và quản lý nhà nước tuyệt đối.

5. Hệ quả và sự dịch chuyển vị thế xã hội
Chiến dịch X1 và cuộc đổi tiền đã tạo ra một cuộc "thay máu" xã hội sâu sắc. Giới tư sản và tiểu chủ vốn giàu có trước đây bỗng chốc mất đi ưu thế kinh tế, nhiều người rơi vào cảnh khó khăn hoặc phải chuyển sang lao động trực tiếp. Ngược lại, tầng lớp công nhân và nhân dân lao động nghèo được hỗ trợ lương thực và nhu yếu phẩm thông qua hệ thống mậu dịch quốc doanh mới thành lập. Dù tạo ra sự công bằng tương đối về mức sống trong ngắn hạn và giúp Nhà nước nắm quyền điều tiết xã hội, nhưng các biện pháp này cũng gây ra những xáo trộn lớn trong sản xuất và phân phối, đặt miền Nam vào một lộ trình kinh tế đầy thử thách trong những năm tiếp theo.`,
     images: [],
    videos: []
  },
  {
    date: '11/1975',
    title: '5. Tháng 11/1975: Hội nghị Hiệp thương – Hợp nhất Ý chí và Nhà nước',
    content: `1. Bối cảnh: Một lãnh thổ, hai thực thể chính trị
Sau ngày 30/4/1975, Việt Nam đã thống nhất hoàn toàn về mặt địa lý và quân sự, nhưng về mặt hành chính và pháp lý, chúng ta vẫn tồn tại hai hệ thống song song: miền Bắc dưới sự quản lý của nước Việt Nam Dân chủ Cộng hòa và miền Nam dưới sự điều hành của Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam. Tình trạng này tạo ra những rào cản trong việc quản lý kinh tế thống nhất, lưu thông hàng hóa và hoạch định chính sách quốc gia. Do đó, yêu cầu cấp bách đặt ra là phải "hợp thức hóa" sự thống nhất về mặt nhà nước để tạo sức mạnh tổng hợp cho công cuộc xây dựng mới.

2. Hội nghị Hiệp thương – Cuộc đối thoại lịch sử tại Sài Gòn
Từ ngày 15/11 đến 21/11/1975, tại dinh Độc Lập (lúc đó gọi là Hội trường Thống Nhất), hai đoàn đại biểu đại diện cho hai miền đã gặp gỡ. Đoàn đại biểu miền Bắc do ông Trường Chinh làm trưởng đoàn, đoàn đại biểu miền Nam do ông Phạm Hùng dẫn đầu. Hội nghị diễn ra trong bầu không khí hân hoan nhưng cũng đầy nghiêm túc để thảo luận về tương lai đất nước. Kết quả quan trọng nhất là sự nhất trí hoàn toàn về việc tổ chức Tổng tuyển cử bầu ra Quốc hội chung cho cả nước, chính thức chấm dứt sự chia cắt về hành chính đã kéo dài hơn 20 năm.

3. Ý nghĩa lý luận: Sự đồng bộ hóa Kiến trúc thượng tầng
Về mặt lý luận Mác - Lênin, Hội nghị Hiệp thương là quá trình đồng bộ hóa Kiến trúc thượng tầng (nhà nước, pháp luật, hệ tư tưởng) với Cơ sở hạ tầng (nền kinh tế đã được thống nhất về mặt lãnh thổ). Hội nghị đã khẳng định quyết tâm: Việt Nam không cần trải qua giai đoạn phát triển tư bản chủ nghĩa ở miền Nam mà tiến thẳng lên Chủ nghĩa xã hội trên phạm vi cả nước. Đây được gọi là "Quá độ gián tiếp", một sự vận dụng sáng tạo lý luận vào thực tiễn Việt Nam nhằm nhanh chóng ổn định và phát triển đất nước sau chiến tranh.

4. Thiết lập lộ trình pháp lý cho nước Việt Nam mới
Hội nghị đã thống nhất các bước đi cụ thể để khai sinh ra nước Cộng hòa Xã hội chủ nghĩa Việt Nam. Các đại biểu đã thảo luận về việc thống nhất tên nước, quốc kỳ, quốc ca, quốc huy và thủ đô. Việc quyết định tổ chức Tổng tuyển cử vào mùa xuân năm 1976 chính là cách để người dân cả hai miền trực tiếp thực hiện quyền làm chủ, dùng lá phiếu của mình để khẳng định tính chính danh của chính quyền mới trước cộng đồng quốc tế. Đây là sự chuẩn bị hoàn tất về mặt pháp lý để thế giới công nhận một nước Việt Nam độc lập, thống nhất và toàn vẹn.

5. Bước chuyển mình từ chiến tranh sang hòa bình
Khép lại hội nghị, một thông điệp mạnh mẽ được gửi đi: Thời đại chiến tranh đã thực sự kết thúc, thời đại xây dựng bắt đầu. Sự thống nhất về mặt chính trị tại Hội nghị Hiệp thương tháng 11/1975 đã hóa giải những mặc cảm chia cắt, tập trung mọi nguồn lực con người và tài lực vào một kế hoạch phát triển chung. Nó tạo ra tâm thế tự tin cho dân tộc trước khi bước vào năm 1976 – năm chính thức thành lập nước Cộng hòa Xã hội chủ nghĩa Việt Nam, đánh dấu một kỷ nguyên mới trong dòng chảy lịch sử dân tộc.`,
    images: [],
    videos: []
  },
    {
    date: '1976',
    title: '1. Thiết lập Kiến trúc thượng tầng XHCN trên quy mô Toàn quốc',
    content: `Sau thắng lợi mùa Xuân 1975, Việt Nam đứng trước một bước ngoặt lịch sử: Thống nhất đất nước và đưa cả nước tiến lên CNXH. Tại kỳ họp thứ nhất Quốc hội khóa VI (tháng 7/1976), nước Việt Nam thống nhất được khai sinh với tên gọi Cộng hòa Xã hội chủ nghĩa Việt Nam. Về mặt lý luận, đây là việc đồng bộ hóa Kiến trúc thượng tầng chính trị để tương ứng với một lãnh thổ đã thống nhất. 

Đại hội IV của Đảng (12/1976) đã xác định đường lối chung cho thời kỳ quá độ là: "Nắm vững chuyên chính vô sản, phát huy quyền làm chủ tập thể của nhân dân lao động". Đảng khẳng định đặc điểm lớn nhất của Việt Nam là từ một nền sản xuất nhỏ tiến thẳng lên CNXH, bỏ qua giai đoạn phát triển tư bản chủ nghĩa. Đây là sự lựa chọn con đường "Quá độ gián tiếp" đầy thử thách, đòi hỏi phải tự tạo ra tiền đề vật chất – kỹ thuật mà lẽ ra chủ nghĩa tư bản đã thực hiện trước đó.`,
    images: [],
    videos: []
  },
  {
    date: '1977 – 1978',
    title: '2. Cuộc cải tạo Quan hệ sản xuất tại miền Nam: Xóa bỏ sở hữu tư nhân',
    content: `Trọng tâm lý luận của giai đoạn này là cuộc đấu tranh "ai thắng ai" giữa hai con đường: Xã hội chủ nghĩa và Tư bản chủ nghĩa. Nhà nước triển khai mạnh mẽ công cuộc cải tạo XHCN ở miền Nam trên cả 3 mặt: sở hữu, quản lý và phân phối. 

Về công nghiệp, toàn bộ các xí nghiệp của tư sản mại bản bị quốc hữu hóa, chuyển thành sở hữu nhà nước (toàn dân). Về nông nghiệp, phong trào hợp tác hóa được đẩy nhanh nhằm đưa nông dân vào con đường làm ăn tập thể thông qua các tập đoàn sản xuất và HTX. Mục tiêu là xác lập sự thống trị tuyệt đối của hai hình thức sở hữu: toàn dân và tập thể. Tuy nhiên, việc nóng vội xóa bỏ ngay lập tức các thành phần kinh tế tư nhân và tiểu chủ đã vô tình làm đứt gãy mạch máu lưu thông hàng hóa, gây ra sự hụt hẫng trong cung ứng nhu yếu phẩm cho xã hội.`,
    images: [],
    videos: []
  },
  {
    date: '1979',
    title: '3. Bước chuyển tư duy đầu tiên: Hội nghị Trung ương 6 và sự "Bung ra" của sản xuất',
    content: `Đến năm 1979, mâu thuẫn giữa mô hình quản lý kế hoạch hóa tập trung, quan liêu với trình độ thực tế của lực lượng sản xuất đã trở nên gay gắt. Sản xuất đình trệ, đời sống nhân dân cực kỳ khó khăn. Trước bối cảnh đó, Hội nghị Trung ương 6 (khóa IV) đã đưa ra một quyết sách mang tính đột phá: Cho phép "bung ra" các thành phần kinh tế.

Lần đầu tiên trong thời kỳ quá độ, Đảng thừa nhận việc sử dụng các hình thức kinh tế trung gian và khuyến khích sản xuất nằm ngoài kế hoạch tập trung. Đây là bước nhận thức lại quan trọng: Trong thời kỳ quá độ, không thể ngay lập tức tiêu diệt kinh tế hàng hóa mà phải biết tận dụng nó để phát triển lực lượng sản xuất. Đây chính là những "tiếng súng lệnh" đầu tiên cho sự thay đổi về tư duy kinh tế sau này.`,
     images: [],
    videos: []
  },
  {
    date: '1981',
    title: '4. Cải cách lợi ích kinh tế: Chỉ thị 100 và cơ chế Khoán trong Nông nghiệp',
    content: `Lý luận XHCN thời kỳ này bắt đầu chú trọng đến động lực con người. Sau một thời gian dài nông dân không mặn mà với ruộng đất tập thể, Chỉ thị 100 (tháng 1/1981) ra đời, cho phép "Khoán sản phẩm đến nhóm và người lao động". 

Đây là bước đi chiến lược nhằm hoàn thiện quan hệ sản xuất. Bằng cách để người nông dân trực tiếp nắm giữ khâu cuối cùng của quá trình sản xuất và hưởng lợi từ phần vượt khoán, Nhà nước đã khơi dậy được tiềm năng lao động to lớn. Chỉ thị 100 chính là sự thừa nhận thực tế rằng: Trong thời kỳ quá độ, lợi ích cá nhân chính là động lực trực tiếp thúc đẩy sản xuất, và quan hệ sản xuất phải được điều chỉnh để phù hợp với trình độ tự giác còn hạn chế của người lao động.`,
   images: [],
    videos: []
  },
  {
    date: '1982 – 1985',
    title: '5. Cuộc đấu tranh giữa Mô hình Cũ và Mới – Bài học từ sai lầm "Giá - Lương - Tiền"',
    content: `Đại hội V (1982) đã có những điều chỉnh sâu sắc về bước đi của thời kỳ quá độ, xác định nông nghiệp là "mặt trận hàng đầu". Tuy nhiên, đất nước vẫn chưa thoát khỏi cái bóng của cơ chế tập trung bao cấp. Năm 1985, cuộc tổng điều chỉnh "Giá - Lương - Tiền" với mục tiêu xóa bỏ bao cấp bằng biện pháp hành chính đã thất bại nặng nề. 

Việc đổi tiền (1 đồng mới đổi 10 đồng cũ) cùng lạm phát phi mã lên tới gần 800% đã đẩy nền kinh tế vào tình trạng khủng hoảng nghiêm trọng nhất. Sai lầm này là minh chứng thực tế cho việc duy ý chí, vi phạm quy luật khách quan của kinh tế hàng hóa. Nhưng chính từ đống đổ nát đó, bài học về việc phải tôn trọng quy luật giá trị và thực hiện kinh tế nhiều thành phần đã trở thành nhận thức chung của toàn Đảng, dọn đường cho công cuộc Đổi mới toàn diện năm 1986.`,
    images: [],
    videos: []
  },
  {
    date: 'Tổng kết 1976 – 1985',
    title: 'Sơ kết Chặng đường đầu tiên: Sự hình thành Tư duy Đổi mới',
    content: `Giai đoạn 1976-1985 là chặng đường đầu tiên đầy gian khổ của thời kỳ quá độ lên CNXH trên phạm vi cả nước. Tổng kết giai đoạn này, có thể thấy 3 bài học lớn: 
1. Không được nóng vội chủ quan trong việc xóa bỏ các thành phần kinh tế phi XHCN. 
2. Phải kết hợp hài hòa giữa kế hoạch hóa và thị trường. 
3. Phải tập trung phát triển lực lượng sản xuất làm nền tảng trước khi đẩy mạnh cải tạo quan hệ sản xuất.

Dù có những sai lầm chiến lược về kinh tế, nhưng đây là giai đoạn chuẩn bị quan trọng về mặt nhận thức. Việt Nam đã bảo vệ vững chắc độc lập dân tộc và chủ quyền – tiền đề chính trị không thể thiếu để tiếp tục con đường quá độ lên CNXH một cách đúng đắn và hiệu quả hơn trong kỷ nguyên Đổi mới.`,
    images: [],
    videos: []
  }
];

// --- COMPONENT CHÍNH - Giao diện giống Timeline1945 và 1954 với màu chủ đạo đỏ-vàng ---
export function Timeline1975() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'gallery'>('timeline');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showAllMedia, setShowAllMedia] = useState<boolean>(false);

  // Gom tất cả media thành một mảng
  const allMedia = DATA_1975.flatMap(event => 
    [...event.images, ...event.videos].map(m => ({ 
      ...m, 
      eventDate: event.date, 
      eventTitle: event.title 
    }))
  );

  const featuredMedia = allMedia.slice(0, 8);

  // Hàm kiểm tra nội dung ngắn (giống 1945 và 1954)
  const isShortContent = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return wordCount < 150; // Nếu ít hơn 150 từ coi là ngắn
  };

  return (
    <div className="space-y-8">
      {/* Header - Màu đỏ-vàng */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-900/20 via-yellow-900/20 to-red-900/20 p-8 border border-yellow-200/30 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-700 to-yellow-600 flex items-center justify-center shadow-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-yellow-700 to-red-800 tracking-tighter">
                  1975
                </h2>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  Đại Thắng Mùa Xuân - Giải Phóng Miền Nam, Thống Nhất Đất Nước
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Màu đỏ-vàng */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 justify-center ${
            activeTab === 'timeline' 
              ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg' 
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
              ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Film className="w-5 h-5" />
          <span>Thư viện tư liệu</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px] animate-in fade-in duration-700">
        
        {/* TAB DÒNG THỜI GIAN - Layout giống 1945 và 1954 */}
        {activeTab === 'timeline' && (
          <div className="space-y-12">
            {DATA_1975.map((event, idx) => {
              const contentIsShort = isShortContent(event.content);
              const allEventMedia = [...event.images, ...event.videos];
              
              return (
                <div key={idx} className="relative group">
                  {/* Timeline line and dot - Màu đỏ-vàng */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-400 via-yellow-300 to-transparent hidden md:block"></div>
                  <div className="absolute left-6 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-red-600 to-yellow-500 border-4 border-white shadow-lg hidden md:block"></div>
                  
                  {/* Content Card */}
                  <div className="ml-0 md:ml-12 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                    {/* Date Header - Màu đỏ-vàng */}
                    <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-6 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center shadow-md">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="inline-block px-4 py-2 bg-white rounded-full text-red-700 font-bold border border-red-200">
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
                                  <ImageIcon className="w-5 h-5 text-red-600" />
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
                                              e.currentTarget.src = "https://placehold.co/600x400/dc2626/ffffff?text=Tư+Liệu+Lịch+Sử";
                                            }}
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </>
                                      ) : (
                                        <div className="relative w-full h-full">
                                          <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 to-yellow-900/50 flex items-center justify-center">
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
                                          media.type === 'image' ? 'bg-red-500' : 'bg-yellow-500'
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
                                  <ImageIcon className="w-5 h-5 text-red-600" />
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
                                          <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 to-yellow-900/50 flex items-center justify-center">
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
                                          media.type === 'image' ? 'bg-red-500' : 'bg-yellow-500'
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

        {/* TAB THƯ VIỆN TƯ LIỆU - Giống Timeline 1945 và 1954 */}
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
                            e.currentTarget.src = "https://placehold.co/600x400/dc2626/ffffff?text=Ảnh+Tư+Liệu";
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
                          <div className="w-12 h-12 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-red-700 transition-colors">
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
                          media.type === 'image' ? 'bg-red-500' : 'bg-yellow-500'
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
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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
            className="absolute top-6 right-6 text-white hover:text-red-300 transition-colors p-3 bg-black/50 rounded-full z-10 hover:bg-black/70"
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
                        e.currentTarget.src = "https://placehold.co/800x600/dc2626/ffffff?text=Không+thể+tải+ảnh";
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
                    selectedMedia.type === 'image' ? 'bg-red-500' : 'bg-yellow-500'
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
        <p className="mt-1">© 1975-2024 - Kỷ niệm 49 năm Ngày Giải phóng miền Nam, thống nhất đất nước</p>
      </div>
    </div>
  );
}
