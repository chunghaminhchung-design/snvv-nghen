/* =========================================================
   NGÂN HÀNG CÂU HỎI — LỊCH SỬ 12
   Đợt 1: 3 chuyên đề mở đầu chương trình
     - un      : Liên hợp quốc
     - coldwar : Trật tự thế giới trong và sau Chiến tranh lạnh
     - asean   : ASEAN — Hình thành và phát triển

   Cấu trúc mỗi câu hỏi:
     { id, topic, q: "nội dung câu hỏi", options: [4 phương án], answer: index (0-3) đáp án đúng }

   Muốn thêm câu hỏi mới: thêm một object vào mảng QUIZ_QUESTIONS,
   dùng đúng "topic" đã khai báo trong QUIZ_TOPICS (hoặc khai báo
   chuyên đề mới trong QUIZ_TOPICS trước).
   ========================================================= */

const QUIZ_TOPICS = [
  { id: "un",      name: "Liên hợp quốc",                                  code: "Bài 1" },
  { id: "coldwar", name: "Trật tự thế giới trong và sau Chiến tranh lạnh", code: "Bài 2–3" },
  { id: "asean",   name: "ASEAN — Hình thành và phát triển",              code: "Bài 4–5" },
];

const QUIZ_QUESTIONS = [

  /* ---------------- LIÊN HỢP QUỐC ---------------- */
  { id:"un-01", topic:"un", q:"Hội nghị quốc tế nào đã thông qua bản Hiến chương Liên hợp quốc?", options:["Hội nghị Ianta","Hội nghị San Francisco","Hội nghị Pốt-xđam","Hội nghị Bàn Môn Điếm"], answer:1 },
  { id:"un-02", topic:"un", q:"Hiến chương Liên hợp quốc chính thức có hiệu lực vào ngày tháng năm nào?", options:["26/6/1945","24/10/1945","25/4/1945","20/9/1977"], answer:1 },
  { id:"un-03", topic:"un", q:"Hội nghị San Francisco diễn ra trong khoảng thời gian nào?", options:["4/2 – 11/2/1945","25/4 – 26/6/1945","17/7 – 2/8/1945","14/8 – 2/9/1945"], answer:1 },
  { id:"un-04", topic:"un", q:"Có bao nhiêu quốc gia tham gia sáng lập tổ chức Liên hợp quốc?", options:["50 nước","51 nước","5 nước","15 nước"], answer:1 },
  { id:"un-05", topic:"un", q:"Trụ sở chính của Liên hợp quốc đặt tại đâu?", options:["Genève, Thụy Sĩ","Bruxelles, Bỉ","New York, Mỹ","Paris, Pháp"], answer:2 },
  { id:"un-06", topic:"un", q:"Cơ quan nào của Liên hợp quốc giữ vai trò trọng yếu trong việc duy trì hòa bình, an ninh thế giới?", options:["Đại hội đồng","Hội đồng Bảo an","Ban Thư ký","Hội đồng Kinh tế và Xã hội"], answer:1 },
  { id:"un-07", topic:"un", q:"Hội đồng Bảo an Liên hợp quốc có bao nhiêu ủy viên thường trực?", options:["3","4","5","6"], answer:2 },
  { id:"un-08", topic:"un", q:"Quốc gia nào sau đây KHÔNG phải là ủy viên thường trực của Hội đồng Bảo an?", options:["Mỹ","Anh","Đức","Pháp"], answer:2 },
  { id:"un-09", topic:"un", q:"Nguyên tắc nào cho phép 5 ủy viên thường trực Hội đồng Bảo an có quyền phủ quyết?", options:["Bình đẳng chủ quyền","Nhất trí giữa 5 ủy viên thường trực","Không can thiệp nội bộ","Giải quyết tranh chấp bằng biện pháp hòa bình"], answer:1 },
  { id:"un-10", topic:"un", q:"Việt Nam chính thức gia nhập Liên hợp quốc vào thời gian nào?", options:["20/9/1977","28/7/1995","25/6/1950","2/9/1945"], answer:0 },
  { id:"un-11", topic:"un", q:"Việt Nam là thành viên thứ bao nhiêu của Liên hợp quốc?", options:["129","149","159","195"], answer:1 },
  { id:"un-12", topic:"un", q:"Mục tiêu hàng đầu của Liên hợp quốc được nêu trong Hiến chương là gì?", options:["Phát triển kinh tế toàn cầu","Duy trì hòa bình và an ninh thế giới","Bảo vệ môi trường","Thúc đẩy thương mại tự do"], answer:1 },
  { id:"un-13", topic:"un", q:"Cơ quan nào của Liên hợp quốc gồm đại diện của tất cả các quốc gia thành viên, mỗi nước một phiếu?", options:["Hội đồng Bảo an","Đại hội đồng","Ban Thư ký","Tòa án Công lý Quốc tế"], answer:1 },
  { id:"un-14", topic:"un", q:"Người đứng đầu Ban Thư ký Liên hợp quốc được gọi là gì?", options:["Chủ tịch","Tổng thư ký","Tổng giám đốc","Chủ tịch Hội đồng"], answer:1 },
  { id:"un-15", topic:"un", q:"Cơ quan tư pháp chính của Liên hợp quốc là cơ quan nào?", options:["Tòa án Công lý Quốc tế","Hội đồng Bảo an","Ban Thư ký","Hội đồng Quản thác"], answer:0 },
  { id:"un-16", topic:"un", q:"Việc Việt Nam gia nhập Liên hợp quốc năm 1977 có ý nghĩa như thế nào?", options:["Khẳng định vị thế, tạo điều kiện tranh thủ sự ủng hộ và hợp tác quốc tế","Chấm dứt hoàn toàn chiến tranh ở Việt Nam","Giúp Việt Nam gia nhập ASEAN ngay lập tức","Xóa bỏ ngay lệnh cấm vận của Mỹ"], answer:0 },
  { id:"un-17", topic:"un", q:"Nguyên tắc nào sau đây KHÔNG phải là nguyên tắc hoạt động của Liên hợp quốc?", options:["Bình đẳng chủ quyền giữa các quốc gia","Không can thiệp vào công việc nội bộ của các nước","Giải quyết tranh chấp quốc tế bằng biện pháp hòa bình","Ưu tiên lợi ích của các nước lớn"], answer:3 },
  { id:"un-18", topic:"un", q:"Liên hợp quốc ra đời nhằm thay thế cho tổ chức quốc tế nào được thành lập trước Chiến tranh thế giới thứ hai?", options:["Hội Quốc liên","Khối Thịnh vượng chung","Liên minh châu Âu","Phong trào Không liên kết"], answer:0 },
  { id:"un-19", topic:"un", q:"Trong hệ thống Liên hợp quốc, cơ quan nào phụ trách hợp tác quốc tế về kinh tế, văn hóa, xã hội, giáo dục, y tế?", options:["Hội đồng Bảo an","Hội đồng Kinh tế và Xã hội","Ban Thư ký","Hội đồng Quản thác"], answer:1 },
  { id:"un-20", topic:"un", q:"Việt Nam đã trúng cử Ủy viên không thường trực Hội đồng Bảo an Liên hợp quốc vào các nhiệm kỳ nào?", options:["2008–2009 và 2020–2021","1995–1996 và 2005–2006","1977–1978 và 1987–1988","2015–2016 và 2018–2019"], answer:0 },

  /* ---------------- TRẬT TỰ THẾ GIỚI TRONG VÀ SAU CHIẾN TRANH LẠNH ---------------- */
  { id:"cw-01", topic:"coldwar", q:"Hội nghị Ianta (Yalta) diễn ra vào thời gian nào?", options:["4/2 – 11/2/1945","17/7 – 2/8/1945","25/4 – 26/6/1945","14/8/1945"], answer:0 },
  { id:"cw-02", topic:"coldwar", q:"Hội nghị Ianta có sự tham gia của nguyên thủ ba cường quốc nào?", options:["Mỹ, Anh, Pháp","Mỹ, Anh, Liên Xô","Mỹ, Liên Xô, Trung Quốc","Anh, Pháp, Liên Xô"], answer:1 },
  { id:"cw-03", topic:"coldwar", q:"Ai là người đại diện cho Liên Xô tại Hội nghị Ianta?", options:["Lenin","Khrushchev","Stalin","Gorbachev"], answer:2 },
  { id:"cw-04", topic:"coldwar", q:"“Trật tự hai cực Ianta” là trật tự thế giới do các cường quốc nào chi phối?", options:["Mỹ và Liên Xô","Mỹ và Trung Quốc","Anh và Pháp","Liên Xô và Trung Quốc"], answer:0 },
  { id:"cw-05", topic:"coldwar", q:"Khối quân sự NATO do Mỹ đứng đầu được thành lập vào năm nào?", options:["1947","1949","1955","1957"], answer:1 },
  { id:"cw-06", topic:"coldwar", q:"Tổ chức Hiệp ước Vác-sa-va do Liên Xô đứng đầu được thành lập vào năm nào?", options:["1949","1950","1955","1961"], answer:2 },
  { id:"cw-07", topic:"coldwar", q:"Sự kiện nào được xem là mốc chính thức tuyên bố chấm dứt Chiến tranh lạnh?", options:["Cuộc gặp không chính thức tại Malta (12/1989)","Liên Xô tan rã (1991)","Bức tường Berlin sụp đổ (1989)","Hiệp định Pari về Việt Nam (1973)"], answer:0 },
  { id:"cw-08", topic:"coldwar", q:"Cuộc gặp gỡ không chính thức tại Malta (12/1989) diễn ra giữa hai nhà lãnh đạo nào?", options:["Reagan và Brezhnev","Bush (cha) và Gorbachev","Nixon và Khrushchev","Bush (cha) và Yeltsin"], answer:1 },
  { id:"cw-09", topic:"coldwar", q:"Liên bang Xô viết chính thức tan rã vào năm nào?", options:["1989","1990","1991","1993"], answer:2 },
  { id:"cw-10", topic:"coldwar", q:"Sau khi Chiến tranh lạnh chấm dứt, trật tự thế giới có xu hướng phát triển theo hướng nào?", options:["Đơn cực do Mỹ chi phối tuyệt đối","Đa cực, nhiều trung tâm quyền lực","Trở lại lưỡng cực như trước","Không hình thành trật tự rõ ràng"], answer:1 },
  { id:"cw-11", topic:"coldwar", q:"Trong trật tự thế giới sau Chiến tranh lạnh, yếu tố nào được xem là trọng tâm trong chiến lược phát triển của nhiều quốc gia?", options:["Sức mạnh quân sự","Sức mạnh tổng hợp quốc gia, trong đó kinh tế là trọng tâm","Mở rộng lãnh thổ","Chạy đua vũ trang hạt nhân"], answer:1 },
  { id:"cw-12", topic:"coldwar", q:"Theo thỏa thuận tại Hội nghị Ianta, châu Âu bị phân chia thành mấy phạm vi ảnh hưởng chính?", options:["2 (Đông Âu – Liên Xô, Tây Âu – Mỹ/Anh/Pháp)","3","4","5"], answer:0 },
  { id:"cw-13", topic:"coldwar", q:"Sau Chiến tranh thế giới thứ hai, nước Đức bị chia cắt thành hai nhà nước nào?", options:["Cộng hòa Liên bang Đức và Cộng hòa Dân chủ Đức","Đông Đức và Nam Đức","Bắc Đức và Tây Đức","Phổ và Bavaria"], answer:0 },
  { id:"cw-14", topic:"coldwar", q:"Học thuyết Truman (1947) đánh dấu sự khởi đầu của sự kiện lịch sử nào?", options:["Chiến tranh lạnh giữa Mỹ và Liên Xô","Chiến tranh thế giới thứ ba","Sự hình thành ASEAN","Phong trào Không liên kết"], answer:0 },
  { id:"cw-15", topic:"coldwar", q:"“Kế hoạch Marshall” (1947) được Mỹ đề ra nhằm mục đích gì?", options:["Viện trợ kinh tế phục hưng Tây Âu, qua đó lôi kéo đồng minh chống Liên Xô","Viện trợ quân sự cho Nhật Bản","Xây dựng trụ sở Liên hợp quốc","Hỗ trợ thành lập ASEAN"], answer:0 },
  { id:"cw-16", topic:"coldwar", q:"Xu thế toàn cầu hóa diễn ra mạnh mẽ nhất từ khoảng thời gian nào?", options:["Những năm 1970","Những năm 1980, đặc biệt từ đầu thập niên 90 của thế kỷ XX","Ngay sau Chiến tranh thế giới thứ nhất","Ngay sau khi Liên hợp quốc thành lập"], answer:1 },
  { id:"cw-17", topic:"coldwar", q:"Trong xu thế đa cực hóa sau Chiến tranh lạnh, nhận định nào sau đây là KHÔNG đúng?", options:["Trung Quốc trở thành một trung tâm quyền lực đáng kể","Liên minh châu Âu (EU) là một trung tâm kinh tế lớn","Nhật Bản vẫn là một cường quốc kinh tế","Một siêu cường duy nhất chi phối tuyệt đối toàn bộ thế giới"], answer:3 },
  { id:"cw-18", topic:"coldwar", q:"Cục diện đối đầu Đông – Tây trong Chiến tranh lạnh được phản ánh rõ nét qua cuộc chiến tranh nào ở châu Á?", options:["Chiến tranh Triều Tiên (1950–1953)","Cách mạng Tân Hợi","Chiến tranh Nha phiến","Khởi nghĩa Yên Bái"], answer:0 },
  { id:"cw-19", topic:"coldwar", q:"Sau khi Liên Xô tan rã, Liên bang Nga đảm nhận vị trí nào tại Hội đồng Bảo an Liên hợp quốc?", options:["Ủy viên không thường trực","Ủy viên thường trực (kế tục Liên Xô)","Quan sát viên","Không còn là thành viên"], answer:1 },
  { id:"cw-20", topic:"coldwar", q:"Đặc điểm nổi bật của quan hệ quốc tế trong những năm đầu sau Chiến tranh lạnh là gì?", options:["Hòa bình tuyệt đối, không còn xung đột","Vừa hợp tác vừa cạnh tranh giữa các nước lớn, xen lẫn xung đột cục bộ ở một số khu vực","Đối đầu quân sự trực tiếp giữa các siêu cường","Trở lại nguyên trạng trật tự hai cực như thời Chiến tranh lạnh"], answer:1 },

  /* ---------------- ASEAN ---------------- */
  { id:"as-01", topic:"asean", q:"Hiệp hội các quốc gia Đông Nam Á (ASEAN) được thành lập vào ngày tháng năm nào?", options:["8/8/1967","8/8/1976","28/7/1995","31/12/2015"], answer:0 },
  { id:"as-02", topic:"asean", q:"ASEAN được thành lập tại thành phố nào?", options:["Jakarta, Indonesia","Bangkok, Thái Lan","Manila, Philippines","Kuala Lumpur, Malaysia"], answer:1 },
  { id:"as-03", topic:"asean", q:"Văn kiện nào đánh dấu sự ra đời của ASEAN?", options:["Tuyên bố Bangkok","Hiệp ước Bali","Hiến chương ASEAN","Tuyên bố Cebu"], answer:0 },
  { id:"as-04", topic:"asean", q:"ASEAN được thành lập với bao nhiêu quốc gia sáng lập?", options:["4","5","6","10"], answer:1 },
  { id:"as-05", topic:"asean", q:"Quốc gia nào sau đây KHÔNG phải là thành viên sáng lập ASEAN?", options:["Indonesia","Malaysia","Việt Nam","Philippines"], answer:2 },
  { id:"as-06", topic:"asean", q:"Việt Nam chính thức gia nhập ASEAN vào thời gian nào?", options:["28/7/1995","8/8/1967","23/7/1997","30/4/1999"], answer:0 },
  { id:"as-07", topic:"asean", q:"Hai quốc gia nào gia nhập ASEAN cùng trong năm 1997?", options:["Lào và Myanmar","Lào và Campuchia","Myanmar và Campuchia","Việt Nam và Lào"], answer:0 },
  { id:"as-08", topic:"asean", q:"Campuchia chính thức trở thành thành viên ASEAN vào năm nào, hoàn thiện “ASEAN 10”?", options:["1995","1997","1999","2003"], answer:2 },
  { id:"as-09", topic:"asean", q:"Quốc gia nào gia nhập ASEAN năm 1984, không lâu sau khi giành độc lập?", options:["Brunei","Đông Timor","Singapore","Lào"], answer:0 },
  { id:"as-10", topic:"asean", q:"Hiến chương ASEAN được ký kết vào năm nào?", options:["1967","1976","2007","2015"], answer:2 },
  { id:"as-11", topic:"asean", q:"Hiến chương ASEAN chính thức có hiệu lực từ khi nào?", options:["12/2007","12/2008","12/2009","1/2010"], answer:1 },
  { id:"as-12", topic:"asean", q:"Cộng đồng ASEAN chính thức được thành lập vào ngày nào?", options:["8/8/2015","31/12/2015","22/11/2015","1/1/2016"], answer:1 },
  { id:"as-13", topic:"asean", q:"Cộng đồng ASEAN được xây dựng trên bao nhiêu trụ cột chính?", options:["2","3","4","5"], answer:1 },
  { id:"as-14", topic:"asean", q:"Ba trụ cột của Cộng đồng ASEAN gồm những trụ cột nào?", options:["Chính trị–An ninh, Kinh tế, Văn hóa–Xã hội","Kinh tế, Quân sự, Ngoại giao","Chính trị, Văn hóa, Môi trường","An ninh, Giáo dục, Y tế"], answer:0 },
  { id:"as-15", topic:"asean", q:"Hiệp ước Bali (1976) có ý nghĩa như thế nào đối với ASEAN?", options:["Xác định các nguyên tắc cơ bản trong quan hệ giữa các nước thành viên","Thành lập đồng tiền chung ASEAN","Kết nạp thêm 5 thành viên mới","Giải thể ASEAN cũ để thành lập lại"], answer:0 },
  { id:"as-16", topic:"asean", q:"Mục tiêu ban đầu khi thành lập ASEAN năm 1967 là gì?", options:["Thúc đẩy hợp tác kinh tế, văn hóa, hòa bình và ổn định khu vực Đông Nam Á","Thành lập liên minh quân sự chống lại một cường quốc cụ thể","Sáp nhập các nước thành viên thành một quốc gia","Cạnh tranh trực tiếp với Liên hợp quốc"], answer:0 },
  { id:"as-17", topic:"asean", q:"ASEAN theo đuổi nguyên tắc nào trong việc ra quyết định giữa các nước thành viên?", options:["Đa số áp đảo","Đồng thuận (nhất trí)","Do nước thành viên lớn nhất quyết định","Bỏ phiếu theo quy mô dân số"], answer:1 },
  { id:"as-18", topic:"asean", q:"Quá trình ASEAN mở rộng từ 6 lên 10 thành viên gắn với việc kết nạp những quốc gia nào?", options:["Việt Nam, Lào, Myanmar, Campuchia","Ấn Độ, Trung Quốc, Nhật Bản","Hàn Quốc, Triều Tiên","Đông Timor, Papua New Guinea"], answer:0 },
  { id:"as-19", topic:"asean", q:"Việc Việt Nam gia nhập ASEAN năm 1995 có ý nghĩa như thế nào?", options:["Góp phần củng cố hòa bình, ổn định khu vực và mở rộng quan hệ hợp tác quốc tế của Việt Nam","Chấm dứt hoàn toàn quan hệ với các nước ngoài khu vực","Việt Nam trở thành nước dẫn đầu ASEAN ngay lập tức","ASEAN giải thể để thành lập một tổ chức mới"], answer:0 },
  { id:"as-20", topic:"asean", q:"So với 5 nước sáng lập, các nước gia nhập ASEAN sau (Việt Nam, Lào, Myanmar, Campuchia, Brunei) thường được gọi chung là gì?", options:["Nhóm ASEAN cũ","Nhóm ASEAN mở rộng","Nhóm phi ASEAN","Nhóm quan sát viên"], answer:1 },

];
