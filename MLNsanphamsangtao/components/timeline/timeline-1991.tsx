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
    images: [
      { 
        type: 'image', 
        src: 'https://dangcongsan.vn/DATA/0/2018/12/28/Dangcongsan/vhoai%20_3_16_22_800.jpg', 
        caption: 'Đại hội Đảng toàn quốc lần thứ VII (1991)' 
      }
    ],
    videos: []
  },
  {
    date: 'LÝ LUẬN',
    title: '2) PHẦN LÝ LUẬN (TỪ GIÁO TRÌNH CNXHKH & CƯƠNG LĨNH)',
    content: `**2.1. Khái niệm “Quá độ gián tiếp”**
“Quá độ gián tiếp” là con đường đi lên chủ nghĩa xã hội của Việt Nam từ một xã hội nông nghiệp lạc hậu, chưa trải qua giai đoạn phát triển tư bản chủ nghĩa đầy đủ, thông qua việc tiếp thu có chọn lọc những thành tựu của nền kinh tế thị trường hiện đại và văn minh nhân loại để phát triển lực lượng sản xuất. Về bản chất, đây không phải là sự phủ định vai trò của thị trường, mà là việc sử dụng thị trường như một công cụ kinh tế trong khuôn khổ định hướng xã hội chủ nghĩa, dưới sự quản lý của Nhà nước, nhằm rút ngắn quá trình công nghiệp hóa, hiện đại hóa và tạo nền tảng vật chất cho xã hội mới. Quá độ gián tiếp thể hiện tính sáng tạo của cách mạng Việt Nam khi kết hợp giữa mục tiêu xã hội chủ nghĩa với điều kiện lịch sử cụ thể của một quốc gia đi lên từ điểm xuất phát thấp, trong bối cảnh hội nhập và toàn cầu hóa.
Hàm ý: Không “nhảy cóc” kỹ thuật – quản trị; sử dụng cơ chế thị trường như công cụ, dưới định hướng XHCN để rút ngắn thời gian công nghiệp hóa.

**2.2. Đặc điểm thời kỳ quá độ**
Thời kỳ quá độ ở Việt Nam mang đặc trưng của sự đan xen, tồn tại song song và tác động lẫn nhau giữa nhiều hình thức sở hữu và nhiều thành phần kinh tế, bao gồm kinh tế nhà nước, kinh tế tập thể, kinh tế tư nhân, kinh tế cá thể và kinh tế có vốn đầu tư nước ngoài. Trong giai đoạn này, lực lượng sản xuất chưa phát triển đồng đều, trong khi quan hệ sản xuất đang từng bước được cải biến để phù hợp với trình độ phát triển mới của nền kinh tế. Nhà nước giữ vai trò định hướng, điều tiết và dẫnắt sự phát triển thông qua hệ thống pháp luật, chính sách và chiến lược phát triển quốc gia, nhằm bảo đảm mục tiêu tăng trưởng kinh tế gắn liền với tiến bộ và công bằng xã hội. Đặc điểm nổi bật của thời kỳ này là sự vận động vừa cải cách kinh tế, vừa ổn định chính trị – xã hội, tạo nền tảng vững chắc cho việc xây dựng xã hội xã hội chủ nghĩa trong dài hạn.
Song hành đổi mới quan hệ sản xuất & phát triển lực lượng sản xuất: Hoàn thiện thể chế, pháp luật, quyền sở hữu, phân phối theo lao động và hiệu quả.

**2.3. Mục tiêu chiến lược**
Mục tiêu chiến lược của thời kỳ quá độ là xây dựng cơ sở vật chất – kỹ thuật của chủ nghĩa xã hội thông qua quá trình công nghiệp hóa, hiện đại hóa đất nước gắn với phát triển khoa học, công nghệ và nguồn nhân lực chất lượng cao. Song song với đó là từng bước hoàn thiện quan hệ sản xuất mới phù hợp với trình độ phát triển của lực lượng sản xuất, bảo đảm nguyên tắc phân phối theo lao động và hiệu quả kinh tế, đồng thời thực hiện các chính sách xã hội nhằm nâng cao đời sống vật chất và tinh thần của nhân dân. Mục tiêu này không chỉ hướng tới tăng trưởng kinh tế thuần túy, mà còn nhấn mạnh sự phát triển toàn diện của con người, xây dựng nền dân chủ xã hội chủ nghĩa và củng cố vai trò quản lý của Nhà nước pháp quyền, qua đó tạo nền tảng cho sự phát triển bền vững và lâu dài của đất nước.
Cách mạng về quan hệ sản xuất: Thể chế hóa thị trường định hướng XHCN, nâng cao vai trò quản trị của Nhà nước pháp quyền XHCN.

**2.4. Sáu đặc trưng của CNXH Việt Nam (Cương lĩnh 1991)**
Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội năm 1991 đã xác định rõ mô hình xã hội xã hội chủ nghĩa ở Việt Nam với sáu đặc trưng cơ bản:
1) Do nhân dân lao động làm chủ; 
2) Có một nền kinh tế phát triển cao. dựa trên lực lượng sản xuất hiện đại và chế độ công hữu về các tư liệu sản xuất chủ yếu; 
3) Có nền văn hóa tiên tiến, đậm đà bản sắc dân tộc; 
4) Con người được giải phóng khỏi áp bức, bóc lột, bất công, làm theo năng lực, hưởng theo lao động, có cuộc sống ấm no, tự do, hạnh phúc, có điều kiện phát triển toàn diện cá nhân; 
5) Các dân tộc trong nước bình. đẳng, đoàn kết và giúp đỡ lẫn nhau cùng tiến bộ; 
6) Có quan hệ hữu nghị và hợp tác với nhân dân tất cả các nước trên thế giới.`,
    images: [
      { 
        type: 'image', 
        src: 'https://media.baodautu.vn/Images/chicuong/2021/06/27/cuong-linh-1991-1.jpg', 
        caption: 'Cương lĩnh xây dựng đất nước 1991' 
      }
    ],
    videos: []
  },
  {
    date: 'THỰC TIỄN',
    title: '3) PHẦN THỰC TIỄN – DẪN CHỨNG LỊCH SỬ & XÃ HỘI',
    content: `**3.1. Chuỗi sự kiện tạo nền cho Cương lĩnh 1991**
1954–1957: Khôi phục kinh tế miền Bắc sau chiến tranh. Từ sau Hiệp định Giơ-ne-vơ năm 1954, miền Bắc Việt Nam bước vào giai đoạn khôi phục kinh tế và xây dựng những cơ sở đầu tiên của nền sản xuất xã hội chủ nghĩa.
1960: Đại hội III xác định xây dựng CNXH ở miền Bắc. Đại hội III của Đảng (1960) xác định rõ nhiệm vụ xây dựng CNXH ở miền Bắc như một hậu phương chiến lược cho sự nghiệp thống nhất đất nước, đặt trọng tâm vào phát triển công nghiệp nặng, hợp tác hóa nông nghiệp và xây dựng cơ sở vật chất – kỹ thuật. Sau năm 1975, đất nước thống nhất nhưng rơi vào khủng hoảng kinh tế – xã hội kéo dài do mô hình quản lý tập trung, bao cấp bộc lộ nhiều hạn chế. Bước ngoặt lịch sử diễn ra tại
1986: Đổi mới (Đại hội VI) – chuyển sang kinh tế hàng hóa nhiều thành phần. Đại hội VI (1986) với đường lối Đổi mới, chuyển sang phát triển nền kinh tế hàng hóa nhiều thành phần vận hành theo cơ chế thị trường có sự quản lý của Nhà nước. Trong bối cảnh quốc tế biến động mạnh đầu thập niên 1990 và yêu cầu trong nước về một khung lý luận rõ ràng cho con đường phát triển,
1991: Đại hội VII – Cương lĩnh 1991 – định hình mô hình CNXH Việt Nam. Đại hội VII (1991) đã thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH, đánh dấu sự chuyển từ nhận thức định hướng sang định hình mô hình phát triển một cách hệ thống và lâu dài.

**3.2. Phong trào – mô hình tiêu biểu (minh họa thực hành lý luận)**
Thi đua xã hội: “Ba sẵn sàng”, “Năm xung phong”.
Hợp tác xã kiểu mẫu: “Gió Đại Phong”, “Sóng Duyên Hải”.
→ Thể hiện tinh thần làm chủ tập thể, huy động xã hội cho phát triển.
Trong quá trình xây dựng CNXH, nhiều phong trào quần chúng và mô hình sản xuất tiêu biểu đã trở thành minh chứng sinh động cho nguyên lý “nhân dân lao động làm chủ” và vai trò của kinh tế tập thể. Các phong trào thi đua như “Ba sẵn sàng” của thanh niên và “Năm xung phong” của phụ nữ trong những năm 1960–1970 không chỉ mang ý nghĩa chính trị – xã hội mà còn trực tiếp đóng góp vào sản xuất, quốc phòng và phát triển cộng đồng. Trong lĩnh vực kinh tế, các hợp tác xã kiểu mẫu như “Gió Đại Phong” (Quảng Bình) hay “Sóng Duyên Hải” (Thái Bình) trở thành biểu tượng của việc tổ chức lại sản xuất nông nghiệp theo hướng tập thể hóa, nâng cao năng suất lao động và cải thiện đời sống nông dân. Những chuyến thăm, động viên sản xuất của Hồ Chí Minh tại các nhà máy, công trường lớn như Gang thép Thái Nguyên hay Thủy điện Thác Bà cũng góp phần lan tỏa tinh thần thi đua, thể hiện mối liên hệ giữa đường lối lý luận của Đảng với thực tiễn lao động và sản xuất trong toàn xã hội.

**3.3. Kết quả giai đoạn đầu Đổi mới (đến 1991)**
Hình thành thị trường hàng hóa – lao động – vốn sơ khai. Mở rộng đối ngoại, thu hút đầu tư, từng bước hội nhập. Cải thiện đời sống, ổn định vĩ mô tương đối.
Sau 5 năm triển khai đường lối Đổi mới, Việt Nam đạt được những kết quả bước đầu quan trọng, tạo tiền đề trực tiếp cho việc hình thành Cương lĩnh 1991. Nền kinh tế thoát dần tình trạng khủng hoảng kéo dài, lạm phát được kiềm chế từng bước, sản xuất nông nghiệp tăng trưởng rõ rệt, đặc biệt là nhờ khoán trong nông nghiệp giúp Việt Nam từ nước thiếu lương thực trở thành nước xuất khẩu gạo. Các thành phần kinh tế ngoài quốc doanh và đầu tư nước ngoài bắt đầu phát triển, hình thành thị trường hàng hóa và lao động sơ khai. Đối ngoại được mở rộng theo hướng đa phương hóa, từng bước phá thế bao vây, cô lập, tạo môi trường quốc tế thuận lợi cho phát triển. Tuy còn nhiều hạn chế về cơ sở hạ tầng, trình độ quản lý và chênh lệch xã hội, nhưng những thành tựu này đã chứng minh tính đúng đắn của việc vận dụng cơ chế thị trường trong thời kỳ quá độ, qua đó củng cố cơ sở thực tiễn để Đảng xác lập mô hình CNXH Việt Nam trong Cương lĩnh 1991.`,
    images: [],
    videos: []
  },
  {
    date: 'PHÂN TÍCH',
    title: '4) PHÂN TÍCH HỆ THỐNG (LÝ LUẬN ↔ THỰC TIỄN)',
    content: `**Tính nhất quán:** Quá độ gián tiếp → dùng thị trường để phát triển lực lượng sản xuất → Nhà nước định hướng XHCN.
Quá độ gián tiếp, như được xác lập trong Cương lĩnh năm 1991, thể hiện sự lựa chọn mang tính hệ thống của Việt Nam khi sử dụng cơ chế thị trường như một công cụ phát triển lực lượng sản xuất, chứ không như một mô hình chính trị – xã hội thay thế cho định hướng xã hội chủ nghĩa. Về mặt lý luận, điều này phù hợp với quan điểm của chủ nghĩa Mác – Lênin về vai trò quyết định của lực lượng sản xuất đối với sự vận động và biến đổi của quan hệ sản xuất. Trong thực tiễn Việt Nam sau Đổi mới, sự hình thành nền kinh tế hàng hóa nhiều thành phần đã tạo điều kiện huy động vốn, lao động và công nghệ từ toàn xã hội, đồng thời mở rộng quan hệ kinh tế đối ngoại. Tuy nhiên, khác với mô hình thị trường thuần túy, Nhà nước xã hội chủ nghĩa vẫn giữ vai trò định hướng phát triển thông qua pháp luật, chiến lược và chính sách vĩ mô, nhằm bảo đảm tăng trưởng kinh tế gắn với mục tiêu công bằng xã hội, ổn định chính trị và giữ vững chủ quyền quốc gia. Sự nhất quán ở đây không nằm ở việc phủ định thị trường, mà ở việc đặt thị trường trong khuôn khổ mục tiêu xã hội chủ nghĩa, tạo nên một mô hình phát triển đặc thù của Việt Nam trong bối cảnh toàn cầu hóa.

**Tính khả thi:** Đa thành phần kinh tế tạo động lực tăng trưởng; công hữu “chủ yếu” giữ vai trò dẫn dắt ở lĩnh vực then chốt.
Việc thừa nhận và phát triển đa thành phần kinh tế đã chứng minh tính khả thi của mô hình quá độ gián tiếp trong điều kiện một nước đang phát triển. Khu vực kinh tế tư nhân và đầu tư nước ngoài trở thành động lực quan trọng thúc đẩy tăng trưởng, tạo việc làm và nâng cao năng suất lao động, trong khi khu vực kinh tế nhà nước và tập thể giữ vai trò dẫn dắt ở các lĩnh vực then chốt như năng lượng, hạ tầng, tài chính – tín dụng và các ngành có ảnh hưởng lớn đến an ninh kinh tế quốc gia. Trên phương diện lý luận, điều này phản ánh quan điểm “công hữu về tư liệu sản xuất chủ yếu” không đồng nghĩa với xóa bỏ mọi hình thức sở hữu khác, mà là bảo đảm Nhà nước nắm giữ những “điểm tựa chiến lược” của nền kinh tế. Trong thực tiễn, sự kết hợp này cho phép Việt Nam vừa tận dụng được tính linh hoạt và hiệu quả của thị trường, vừa duy trì khả năng điều tiết vĩ mô để tránh các cú sốc kinh tế – xã hội lớn. Chính sự song hành giữa các khu vực kinh tế đã tạo nên một cấu trúc phát triển tương đối ổn định, giúp nền kinh tế thích ứng tốt hơn với biến động khu vực và toàn cầu.

**Thách thức:** Cân bằng hiệu quả thị trường và công bằng xã hội; quản trị nhà nước, tham nhũng, chênh lệch vùng miền.
Dù đạt được nhiều kết quả tích cực, mô hình phát triển dựa trên sự kết hợp giữa thị trường và định hướng xã hội chủ nghĩa cũng bộc lộ những mâu thuẫn nội tại. Một mặt, cơ chế thị trường thúc đẩy cạnh tranh và tối ưu hóa nguồn lực, nhưng mặt khác lại có xu hướng tạo ra phân hóa giàu nghèo và chênh lệch phát triển giữa các vùng, các nhóm xã hội. Điều này đặt ra yêu cầu ngày càng cao đối với năng lực quản trị nhà nước và hiệu quả của hệ thống pháp luật trong việc phân phối lại nguồn lực thông qua chính sách thuế, an sinh xã hội và đầu tư công. Bên cạnh đó, quá trình mở rộng quyền tự chủ kinh tế và phân cấp quản lý, nếu không đi kèm với cơ chế giám sát minh bạch, có thể làm gia tăng nguy cơ tham nhũng, lợi ích nhóm và lãng phí tài sản công. Về mặt lý luận, đây chính là điểm căng thẳng giữa mục tiêu hiệu quả kinh tế và lý tưởng công bằng xã hội trong thời kỳ quá độ. Việc giải quyết thách thức này không chỉ đòi hỏi cải cách thể chế và nâng cao năng lực bộ máy nhà nước, mà còn cần xây dựng một nền văn hóa pháp quyền và trách nhiệm xã hội, coi đó là điều kiện nền tảng để mô hình phát triển bền vững trong dài hạn.`,
    images: [],
    videos: []
  },
  {
    date: 'TẦM NHÌN',
    title: '5) DỰ BÁO & HÀM Ý CHIẾN LƯỢC (1–30 NĂM)',
    content: `**Ngắn hạn (1–5 năm): Hoàn thiện thể chế thị trường định hướng XHCN; chuyển đổi số quản trị công.**
Trong giai đoạn ngắn hạn, trọng tâm chiến lược của Việt Nam là hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa nhằm bảo đảm sự vận hành thông suốt, minh bạch và công bằng giữa các thành phần kinh tế. Điều này bao gồm việc tiếp tục cải cách hệ thống pháp luật về đất đai, đầu tư, doanh nghiệp và cạnh tranh để vừa khuyến khích sáng tạo, tích lũy tư bản xã hội, vừa giữ vững vai trò điều tiết của Nhà nước đối với các lĩnh vực then chốt. Song song, chuyển đổi số trong quản trị công được xác định là công cụ nền tảng để nâng cao hiệu lực bộ máy nhà nước, giảm chi phí giao dịch xã hội, hạn chế tham nhũng và tăng cường sự tham gia của người dân vào quá trình hoạch định và giám sát chính sách. Giai đoạn này có ý nghĩa “đặt móng”, tạo môi trường thể chế ổn định cho các bước phát triển cao hơn của lực lượng sản xuất và quan hệ sản xuất.

**Trung hạn (5–10 năm): Công nghiệp công nghệ cao, chuỗi giá trị khu vực; văn hóa – con người là động lực cạnh tranh.**
Trong trung hạn, chiến lược phát triển tập trung vào xây dựng nền công nghiệp công nghệ cao gắn với tham gia sâu vào chuỗi giá trị khu vực và toàn cầu, từng bước chuyển từ vai trò “gia công – lắp ráp” sang “thiết kế – sáng tạo – làm chủ công nghệ”. Nhà nước định hướng nguồn lực vào các ngành có hàm lượng tri thức và giá trị gia tăng cao như công nghệ thông tin, tự động hóa, năng lượng tái tạo, vật liệu mới và y sinh. Đồng thời, văn hóa và con người được xác định là trụ cột cạnh tranh quốc gia, thể hiện qua chiến lược phát triển nguồn nhân lực chất lượng cao, giáo dục sáng tạo và xây dựng môi trường xã hội khuyến khích đổi mới, kỷ luật lao động và tinh thần trách nhiệm công dân. Mối quan hệ giữa tăng trưởng kinh tế và tiến bộ xã hội trong giai đoạn này mang tính quyết định đối với việc củng cố niềm tin của nhân dân vào mô hình phát triển xã hội chủ nghĩa trong bối cảnh hội nhập xâu rộng.

**Dài hạn (10–30 năm): Kinh tế tri thức, xanh – bền vững; vị thế trung tâm hợp tác khu vực, đối ngoại đa phương sâu.**
Ở tầm nhìn dài hạn, mục tiêu chiến lược là hình thành nền kinh tế tri thức xanh và bền vững, trong đó tri thức, đổi mới sáng tạo và công nghệ cao trở thành nguồn lực sản xuất chủ yếu, thay thế dần sự phụ thuộc vào khai thác tài nguyên và lao động giá rẻ. Phát triển bền vững được đặt trong mối quan hệ hài hòa giữa tăng trưởng kinh tế, bảo vệ môi trường và công bằng xã hội, hướng tới mô hình xã hội trong đó con người được phát triển toàn diện cả về vật chất lẫn tinh thần. Trên bình diện đối ngoại, Việt Nam hướng tới vị thế trung tâm hợp tác khu vực và đối tác tin cậy trong hệ thống đa phương quốc tế, chủ động tham gia xây dựng luật chơi toàn cầu về thương mại, môi trường, công nghệ và an ninh phi truyền thống. Đây là giai đoạn thể hiện rõ nhất mục tiêu của Cương lĩnh 1991: một xã hội xã hội chủ nghĩa hiện đại, hội nhập sâu, nhưng vẫn giữ vững bản sắc và quyền tự chủ quốc gia.`,
    images: [],
    videos: []
  }
];

// --- COMPONENT CHÍNH - Giao diện giống Timeline1945, 1954, 1975, 1986 với màu chủ đạo tím/hồng ---
export function Timeline1991() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'gallery'>('timeline');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showAllMedia, setShowAllMedia] = useState<boolean>(false);

  // Gom tất cả media thành một mảng
  const allMedia = DATA_1991.flatMap(event => 
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
      {/* Header - Màu tím/hồng */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 p-8 border border-pink-200/30 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-700 to-pink-600 flex items-center justify-center shadow-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-700 to-purple-800 tracking-tighter">
                  1991 - 1995
                </h2>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  Cương Lĩnh 1991 & Hội Nhập Quốc Tế Sâu Rộng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Màu tím/hồng */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 justify-center ${
            activeTab === 'timeline' 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
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
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
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
            {DATA_1991.map((event, idx) => {
              const contentIsShort = isShortContent(event.content);
              const allEventMedia = [...event.images, ...event.videos];
              
              return (
                <div key={idx} className="relative group">
                  {/* Timeline line and dot - Màu tím/hồng */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-300 to-transparent hidden md:block"></div>
                  <div className="absolute left-6 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 border-4 border-white shadow-lg hidden md:block"></div>
                  
                  {/* Content Card */}
                  <div className="ml-0 md:ml-12 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                    {/* Date Header - Màu tím/hồng */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-md">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="inline-block px-4 py-2 bg-white rounded-full text-purple-700 font-bold border border-purple-200">
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
                                  <ImageIcon className="w-5 h-5 text-purple-600" />
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
                                              e.currentTarget.src = "https://placehold.co/600x400/9333ea/ffffff?text=Tư+Liệu+Lịch+Sử";
                                            }}
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </>
                                      ) : (
                                        <div className="relative w-full h-full">
                                          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50 flex items-center justify-center">
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
                                          media.type === 'image' ? 'bg-purple-500' : 'bg-pink-500'
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
                                  <ImageIcon className="w-5 h-5 text-purple-600" />
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
                                          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50 flex items-center justify-center">
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
                                          media.type === 'image' ? 'bg-purple-500' : 'bg-pink-500'
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
                            e.currentTarget.src = "https://placehold.co/600x400/9333ea/ffffff?text=Ảnh+Tư+Liệu";
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
                          <div className="w-12 h-12 rounded-full bg-purple-600/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-purple-700 transition-colors">
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
                          media.type === 'image' ? 'bg-purple-500' : 'bg-pink-500'
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
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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
            className="absolute top-6 right-6 text-white hover:text-purple-300 transition-colors p-3 bg-black/50 rounded-full z-10 hover:bg-black/70"
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
                        e.currentTarget.src = "https://placehold.co/800x600/9333ea/ffffff?text=Không+thể+tải+ảnh";
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
                    selectedMedia.type === 'image' ? 'bg-purple-500' : 'bg-pink-500'
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
        <p className="mt-1">© 1991-2024 - Kỷ niệm Cương lĩnh 1991 và Hội nhập quốc tế</p>
      </div>
    </div>
  );
}
