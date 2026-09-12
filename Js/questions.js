/* =========================================================
   NGÂN HÀNG CÂU HỎI — LỊCH SỬ 12 (TẬP 1)
   12 bài học kỳ 1
   ========================================================= */

const QUIZ_TOPICS = [
  { id: "bai1",  name: "Bài 1 — Liên hợp quốc",                              code: "Bài 1" },
  { id: "bai2",  name: "Bài 2 — Trật tự thế giới trong Chiến tranh lạnh",    code: "Bài 2" },
  { id: "bai3",  name: "Bài 3 — Trật tự thế giới sau Chiến tranh lạnh",      code: "Bài 3" },
  { id: "bai4",  name: "Bài 4 — Sự ra đời và phát triển của ASEAN",          code: "Bài 4" },
  { id: "bai5",  name: "Bài 5 — Cộng đồng ASEAN",                            code: "Bài 5" },
  { id: "bai6",  name: "Bài 6 — Cách mạng tháng Tám năm 1945",               code: "Bài 6" },
  { id: "bai7",  name: "Bài 7 — Kháng chiến chống Pháp (1945–1954)",         code: "Bài 7" },
  { id: "bai8",  name: "Bài 8 — Kháng chiến chống Mỹ (1954–1975)",           code: "Bài 8" },
  { id: "bai9",  name: "Bài 9 — Việt Nam sau năm 1975",                      code: "Bài 9" },
  { id: "bai10", name: "Bài 10 — Công cuộc Đổi mới từ năm 1986",             code: "Bài 10" },
  { id: "bai11", name: "Bài 11 — Việt Nam hội nhập quốc tế",                 code: "Bài 11" },
  { id: "bai12", name: "Bài 12 — Lịch sử địa phương",                        code: "Bài 12" },
];

const QUIZ_QUESTIONS = [
  /* ================= BÀI 1: LIÊN HỢP QUỐC ================= */
  { id:"b1-01", topic:"bai1", q:"Hội nghị quốc tế nào đã thông qua bản Hiến chương Liên hợp quốc?", options:["Hội nghị Ianta","Hội nghị San Francisco","Hội nghị Pốt-xđam","Hội nghị Bàn Môn Điếm"], answer:1 },
  { id:"b1-02", topic:"bai1", q:"Hiến chương Liên hợp quốc chính thức có hiệu lực vào ngày tháng năm nào?", options:["26/6/1945","24/10/1945","25/4/1945","20/9/1977"], answer:1 },
  { id:"b1-03", topic:"bai1", q:"Có bao nhiêu quốc gia tham gia sáng lập tổ chức Liên hợp quốc?", options:["50 nước","51 nước","5 nước","15 nước"], answer:1 },
  { id:"b1-04", topic:"bai1", q:"Trụ sở chính của Liên hợp quốc đặt tại đâu?", options:["Genève, Thụy Sĩ","Bruxelles, Bỉ","New York, Mỹ","Paris, Pháp"], answer:2 },
  { id:"b1-05", topic:"bai1", q:"Cơ quan nào của Liên hợp quốc giữ vai trò trọng yếu trong việc duy trì hòa bình, an ninh thế giới?", options:["Đại hội đồng","Hội đồng Bảo an","Ban Thư ký","Hội đồng Kinh tế và Xã hội"], answer:1 },
  { id:"b1-06", topic:"bai1", q:"Hội đồng Bảo an Liên hợp quốc có bao nhiêu ủy viên thường trực?", options:["3","4","5","6"], answer:2 },
  { id:"b1-07", topic:"bai1", q:"Quốc gia nào sau đây KHÔNG phải là ủy viên thường trực của Hội đồng Bảo an?", options:["Mỹ","Anh","Đức","Pháp"], answer:2 },
  { id:"b1-08", topic:"bai1", q:"Nguyên tắc nào cho phép 5 ủy viên thường trực Hội đồng Bảo an có quyền phủ quyết?", options:["Bình đẳng chủ quyền","Nhất trí giữa 5 ủy viên thường trực","Không can thiệp nội bộ","Giải quyết tranh chấp bằng biện pháp hòa bình"], answer:1 },
  { id:"b1-09", topic:"bai1", q:"Việt Nam chính thức gia nhập Liên hợp quốc vào thời gian nào?", options:["20/9/1977","28/7/1995","25/6/1950","2/9/1945"], answer:0 },
  { id:"b1-10", topic:"bai1", q:"Mục tiêu hàng đầu của Liên hợp quốc được nêu trong Hiến chương là gì?", options:["Phát triển kinh tế toàn cầu","Duy trì hòa bình và an ninh thế giới","Bảo vệ môi trường","Thúc đẩy thương mại tự do"], answer:1 },
  { id:"b1-11", topic:"bai1", q:"Cơ quan nào của Liên hợp quốc gồm đại diện của tất cả các quốc gia thành viên, mỗi nước một phiếu?", options:["Hội đồng Bảo an","Đại hội đồng","Ban Thư ký","Tòa án Công lý Quốc tế"], answer:1 },
  { id:"b1-12", topic:"bai1", q:"Người đứng đầu Ban Thư ký Liên hợp quốc được gọi là gì?", options:["Chủ tịch","Tổng thư ký","Tổng giám đốc","Chủ tịch Hội đồng"], answer:1 },
  { id:"b1-13", topic:"bai1", q:"Cơ quan tư pháp chính của Liên hợp quốc là cơ quan nào?", options:["Tòa án Công lý Quốc tế","Hội đồng Bảo an","Ban Thư ký","Hội đồng Quản thác"], answer:0 },
  { id:"b1-14", topic:"bai1", q:"Liên hợp quốc ra đời nhằm thay thế cho tổ chức quốc tế nào được thành lập trước Chiến tranh thế giới thứ hai?", options:["Hội Quốc liên","Khối Thịnh vượng chung","Liên minh châu Âu","Phong trào Không liên kết"], answer:0 },
  { id:"b1-15", topic:"bai1", q:"Việt Nam đã trúng cử Ủy viên không thường trực Hội đồng Bảo an Liên hợp quốc vào các nhiệm kỳ nào?", options:["2008–2009 và 2020–2021","1995–1996 và 2005–2006","1977–1978 và 1987–1988","2015–2016 và 2018–2019"], answer:0 },

  /* ================= BÀI 2: TRẬT TỰ THẾ GIỚI TRONG CHIẾN TRANH LẠNH ================= */
  { id:"b2-01", topic:"bai2", q:"Hội nghị Ianta (Yalta) diễn ra vào thời gian nào?", options:["4/2 – 11/2/1945","17/7 – 2/8/1945","25/4 – 26/6/1945","14/8/1945"], answer:0 },
  { id:"b2-02", topic:"bai2", q:"Hội nghị Ianta có sự tham gia của nguyên thủ ba cường quốc nào?", options:["Mỹ, Anh, Pháp","Mỹ, Anh, Liên Xô","Mỹ, Liên Xô, Trung Quốc","Anh, Pháp, Liên Xô"], answer:1 },
  { id:"b2-03", topic:"bai2", q:"Ai là người đại diện cho Liên Xô tại Hội nghị Ianta?", options:["Lenin","Khrushchev","Stalin","Gorbachev"], answer:2 },
  { id:"b2-04", topic:"bai2", q:"“Trật tự hai cực Ianta” là trật tự thế giới do các cường quốc nào chi phối?", options:["Mỹ và Liên Xô","Mỹ và Trung Quốc","Anh và Pháp","Liên Xô và Trung Quốc"], answer:0 },
  { id:"b2-05", topic:"bai2", q:"Khối quân sự NATO do Mỹ đứng đầu được thành lập vào năm nào?", options:["1947","1949","1955","1957"], answer:1 },
  { id:"b2-06", topic:"bai2", q:"Tổ chức Hiệp ước Vác-sa-va do Liên Xô đứng đầu được thành lập vào năm nào?", options:["1949","1950","1955","1961"], answer:2 },
  { id:"b2-07", topic:"bai2", q:"Học thuyết Truman (1947) đánh dấu sự khởi đầu của sự kiện lịch sử nào?", options:["Chiến tranh lạnh giữa Mỹ và Liên Xô","Chiến tranh thế giới thứ ba","Sự hình thành ASEAN","Phong trào Không liên kết"], answer:0 },
  { id:"b2-08", topic:"bai2", q:"“Kế hoạch Marshall” (1947) được Mỹ đề ra nhằm mục đích gì?", options:["Viện trợ kinh tế phục hưng Tây Âu, qua đó lôi kéo đồng minh chống Liên Xô","Viện trợ quân sự cho Nhật Bản","Xây dựng trụ sở Liên hợp quốc","Hỗ trợ thành lập ASEAN"], answer:0 },
  { id:"b2-09", topic:"bai2", q:"Theo thỏa thuận tại Hội nghị Ianta, châu Âu bị phân chia thành mấy phạm vi ảnh hưởng chính?", options:["2 (Đông Âu – Liên Xô, Tây Âu – Mỹ/Anh/Pháp)","3","4","5"], answer:0 },
  { id:"b2-10", topic:"bai2", q:"Sau Chiến tranh thế giới thứ hai, nước Đức bị chia cắt thành hai nhà nước nào?", options:["Cộng hòa Liên bang Đức và Cộng hòa Dân chủ Đức","Đông Đức và Nam Đức","Bắc Đức và Tây Đức","Phổ và Bavaria"], answer:0 },
  { id:"b2-11", topic:"bai2", q:"Cục diện đối đầu Đông – Tây trong Chiến tranh lạnh được phản ánh rõ nét qua cuộc chiến tranh nào ở châu Á?", options:["Chiến tranh Triều Tiên (1950–1953)","Cách mạng Tân Hợi","Chiến tranh Nha phiến","Khởi nghĩa Yên Bái"], answer:0 },
  { id:"b2-12", topic:"bai2", q:"Chiến tranh lạnh kết thúc đánh dấu bằng sự kiện nào?", options:["Bức tường Berlin sụp đổ (1989) và Liên Xô tan rã (1991)","Hiệp định Pari 1973","Hội nghị Ianta","NATO thành lập"], answer:0 },

  /* ================= BÀI 3: TRẬT TỰ THẾ GIỚI SAU CHIẾN TRANH LẠNH ================= */
  { id:"b3-01", topic:"bai3", q:"Sự kiện nào được xem là mốc chính thức tuyên bố chấm dứt Chiến tranh lạnh?", options:["Cuộc gặp không chính thức tại Malta (12/1989)","Liên Xô tan rã (1991)","Bức tường Berlin sụp đổ (1989)","Hiệp định Pari về Việt Nam (1973)"], answer:0 },
  { id:"b3-02", topic:"bai3", q:"Cuộc gặp gỡ không chính thức tại Malta (12/1989) diễn ra giữa hai nhà lãnh đạo nào?", options:["Reagan và Brezhnev","Bush (cha) và Gorbachev","Nixon và Khrushchev","Bush (cha) và Yeltsin"], answer:1 },
  { id:"b3-03", topic:"bai3", q:"Liên bang Xô viết chính thức tan rã vào năm nào?", options:["1989","1990","1991","1993"], answer:2 },
  { id:"b3-04", topic:"bai3", q:"Sau khi Chiến tranh lạnh chấm dứt, trật tự thế giới có xu hướng phát triển theo hướng nào?", options:["Đơn cực do Mỹ chi phối tuyệt đối","Đa cực, nhiều trung tâm quyền lực","Trở lại lưỡng cực như trước","Không hình thành trật tự rõ ràng"], answer:1 },
  { id:"b3-05", topic:"bai3", q:"Trong trật tự thế giới sau Chiến tranh lạnh, yếu tố nào được xem là trọng tâm trong chiến lược phát triển của nhiều quốc gia?", options:["Sức mạnh quân sự","Sức mạnh tổng hợp quốc gia, trong đó kinh tế là trọng tâm","Mở rộng lãnh thổ","Chạy đua vũ trang hạt nhân"], answer:1 },
  { id:"b3-06", topic:"bai3", q:"Sau khi Liên Xô tan rã, Liên bang Nga đảm nhận vị trí nào tại Hội đồng Bảo an Liên hợp quốc?", options:["Ủy viên không thường trực","Ủy viên thường trực (kế tục Liên Xô)","Quan sát viên","Không còn là thành viên"], answer:1 },
  { id:"b3-07", topic:"bai3", q:"Đặc điểm nổi bật của quan hệ quốc tế trong những năm đầu sau Chiến tranh lạnh là gì?", options:["Hòa bình tuyệt đối, không còn xung đột","Vừa hợp tác vừa cạnh tranh giữa các nước lớn, xen lẫn xung đột cục bộ ở một số khu vực","Đối đầu quân sự trực tiếp giữa các siêu cường","Trở lại nguyên trạng trật tự hai cực như thời Chiến tranh lạnh"], answer:1 },
  { id:"b3-08", topic:"bai3", q:"Xu thế toàn cầu hóa diễn ra mạnh mẽ nhất từ khoảng thời gian nào?", options:["Những năm 1970","Những năm 1980, đặc biệt từ đầu thập niên 90 của thế kỷ XX","Ngay sau Chiến tranh thế giới thứ nhất","Ngay sau khi Liên hợp quốc thành lập"], answer:1 },
  { id:"b3-09", topic:"bai3", q:"Trong xu thế đa cực hóa sau Chiến tranh lạnh, nhận định nào sau đây là KHÔNG đúng?", options:["Trung Quốc trở thành một trung tâm quyền lực đáng kể","Liên minh châu Âu (EU) là một trung tâm kinh tế lớn","Nhật Bản vẫn là một cường quốc kinh tế","Một siêu cường duy nhất chi phối tuyệt đối toàn bộ thế giới"], answer:3 },

  /* ================= BÀI 4: ASEAN — HÌNH THÀNH VÀ PHÁT TRIỂN ================= */
  { id:"b4-01", topic:"bai4", q:"Hiệp hội các quốc gia Đông Nam Á (ASEAN) được thành lập vào ngày tháng năm nào?", options:["8/8/1967","8/8/1976","28/7/1995","31/12/2015"], answer:0 },
  { id:"b4-02", topic:"bai4", q:"ASEAN được thành lập tại thành phố nào?", options:["Jakarta, Indonesia","Bangkok, Thái Lan","Manila, Philippines","Kuala Lumpur, Malaysia"], answer:1 },
  { id:"b4-03", topic:"bai4", q:"Văn kiện nào đánh dấu sự ra đời của ASEAN?", options:["Tuyên bố Bangkok","Hiệp ước Bali","Hiến chương ASEAN","Tuyên bố Cebu"], answer:0 },
  { id:"b4-04", topic:"bai4", q:"ASEAN được thành lập với bao nhiêu quốc gia sáng lập?", options:["4","5","6","10"], answer:1 },
  { id:"b4-05", topic:"bai4", q:"Quốc gia nào sau đây KHÔNG phải là thành viên sáng lập ASEAN?", options:["Indonesia","Malaysia","Việt Nam","Philippines"], answer:2 },
  { id:"b4-06", topic:"bai4", q:"Việt Nam chính thức gia nhập ASEAN vào thời gian nào?", options:["28/7/1995","8/8/1967","23/7/1997","30/4/1999"], answer:0 },
  { id:"b4-07", topic:"bai4", q:"Hai quốc gia nào gia nhập ASEAN cùng trong năm 1997?", options:["Lào và Myanmar","Lào và Campuchia","Myanmar và Campuchia","Việt Nam và Lào"], answer:0 },
  { id:"b4-08", topic:"bai4", q:"Campuchia chính thức trở thành thành viên ASEAN vào năm nào, hoàn thiện “ASEAN 10”?", options:["1995","1997","1999","2003"], answer:2 },
  { id:"b4-09", topic:"bai4", q:"Quốc gia nào gia nhập ASEAN năm 1984, không lâu sau khi giành độc lập?", options:["Brunei","Đông Timor","Singapore","Lào"], answer:0 },
  { id:"b4-10", topic:"bai4", q:"Mục tiêu ban đầu khi thành lập ASEAN năm 1967 là gì?", options:["Thúc đẩy hợp tác kinh tế, văn hóa, hòa bình và ổn định khu vực Đông Nam Á","Thành lập liên minh quân sự chống lại một cường quốc cụ thể","Sáp nhập các nước thành viên thành một quốc gia","Cạnh tranh trực tiếp với Liên hợp quốc"], answer:0 },

  /* ================= BÀI 5: CỘNG ĐỒNG ASEAN ================= */
  { id:"b5-01", topic:"bai5", q:"Hiến chương ASEAN được ký kết vào năm nào?", options:["1967","1976","2007","2015"], answer:2 },
  { id:"b5-02", topic:"bai5", q:"Hiến chương ASEAN chính thức có hiệu lực từ khi nào?", options:["12/2007","12/2008","12/2009","1/2010"], answer:1 },
  { id:"b5-03", topic:"bai5", q:"Cộng đồng ASEAN chính thức được thành lập vào ngày nào?", options:["8/8/2015","31/12/2015","22/11/2015","1/1/2016"], answer:1 },
  { id:"b5-04", topic:"bai5", q:"Cộng đồng ASEAN được xây dựng trên bao nhiêu trụ cột chính?", options:["2","3","4","5"], answer:1 },
  { id:"b5-05", topic:"bai5", q:"Ba trụ cột của Cộng đồng ASEAN gồm những trụ cột nào?", options:["Chính trị–An ninh, Kinh tế, Văn hóa–Xã hội","Kinh tế, Quân sự, Ngoại giao","Chính trị, Văn hóa, Môi trường","An ninh, Giáo dục, Y tế"], answer:0 },
  { id:"b5-06", topic:"bai5", q:"Hiệp ước Bali (1976) có ý nghĩa như thế nào đối với ASEAN?", options:["Xác định các nguyên tắc cơ bản trong quan hệ giữa các nước thành viên","Thành lập đồng tiền chung ASEAN","Kết nạp thêm 5 thành viên mới","Giải thể ASEAN cũ để thành lập lại"], answer:0 },
  { id:"b5-07", topic:"bai5", q:"ASEAN theo đuổi nguyên tắc nào trong việc ra quyết định giữa các nước thành viên?", options:["Đa số áp đảo","Đồng thuận (nhất trí)","Do nước thành viên lớn nhất quyết định","Bỏ phiếu theo quy mô dân số"], answer:1 },

  /* ================= BÀI 6: CÁCH MẠNG THÁNG TÁM 1945 ================= */
  { id:"b6-01", topic:"bai6", q:"Cách mạng tháng Tám năm 1945 nổ ra trong bối cảnh lịch sử nào?", options:["Phát xít Nhật đầu hàng Đồng minh","Pháp đảo chính Nhật","Chiến tranh thế giới thứ hai bùng nổ","Liên Xô tấn công Nhật"], answer:0 },
  { id:"b6-02", topic:"bai6", q:"Sự kiện nào đánh dấu Cách mạng tháng Tám 1945 giành thắng lợi hoàn toàn?", options:["Nhật đảo chính Pháp","Khởi nghĩa giành chính quyền ở Hà Nội","Bác Hồ đọc Tuyên ngôn Độc lập","Pháp ký Hiệp định Sơ bộ"], answer:2 },
  { id:"b6-03", topic:"bai6", q:"Hội nghị nào đã quyết định phát động Tổng khởi nghĩa giành chính quyền trong cả nước?", options:["Hội nghị Trung ương 8 (5/1941)","Hội nghị Tân Trào (8/1945)","Hội nghị Bắc Pó","Hội nghị Pắc Bó"], answer:1 },
  { id:"b6-04", topic:"bai6", q:"Ngày 2/9/1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đã làm gì?", options:["Đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa","Ký Hiệp định Sơ bộ với Pháp","Thành lập Đảng Cộng sản Việt Nam","Phát động toàn quốc kháng chiến"], answer:0 },
  { id:"b6-05", topic:"bai6", q:"Lực lượng nào đóng vai trò chủ yếu trong Cách mạng tháng Tám 1945?", options:["Quân đội chính quy","Quần chúng nhân dân, đặc biệt là công nhân và nông dân","Tầng lớp trí thức","Giai cấp tư sản dân tộc"], answer:1 },
  { id:"b6-06", topic:"bai6", q:"Nguyên nhân khách quan nào tạo điều kiện thuận lợi cho Cách mạng tháng Tám?", options:["Phát xít Nhật đầu hàng Đồng minh (8/1945)","Pháp đảo chính Nhật","Mỹ ném bom nguyên tử xuống Nhật","Liên Xô tấn công Nhật"], answer:0 },
  { id:"b6-07", topic:"bai6", q:"Bài học kinh nghiệm lớn nhất của Cách mạng tháng Tám 1945 là gì?", options:["Nắm bắt thời cơ, phát huy sức mạnh đoàn kết toàn dân tộc","Chỉ dựa vào sự giúp đỡ của quốc tế","Đấu tranh vũ trang là duy nhất","Chờ đợi thời cơ chín muồi"], answer:0 },

  /* ================= BÀI 7: KHÁNG CHIẾN CHỐNG PHÁP ================= */
  { id:"b7-01", topic:"bai7", q:"Cuộc kháng chiến chống Pháp của nhân dân ta chính thức bắt đầu bằng sự kiện nào?", options:["Pháp tấn công Đà Nẵng (1858)","Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến (12/1946)","Hiệp định Sơ bộ 1946","Chiến dịch Việt Bắc 1947"], answer:1 },
  { id:"b7-02", topic:"bai7", q:"Chiến dịch nào đã kết thúc thắng lợi cuộc kháng chiến chống Pháp?", options:["Chiến dịch Việt Bắc","Chiến dịch Biên giới","Chiến dịch Điện Biên Phủ","Chiến dịch Tây Bắc"], answer:2 },
  { id:"b7-03", topic:"bai7", q:"Hiệp định Genève về Đông Dương được ký kết vào năm nào?", options:["1950","1954","1956","1962"], answer:1 },
  { id:"b7-04", topic:"bai7", q:"Chiến dịch Điện Biên Phủ diễn ra trong bao nhiêu ngày đêm?", options:["30 ngày","56 ngày đêm","75 ngày","100 ngày"], answer:1 },
  { id:"b7-05", topic:"bai7", q:"Đường lối kháng chiến của Đảng ta trong cuộc kháng chiến chống Pháp là gì?", options:["Toàn dân, toàn diện, trường kỳ, tự lực cánh sinh","Đánh nhanh thắng nhanh","Chỉ dựa vào quân đội chính quy","Chờ đợi quốc tế can thiệp"], answer:0 },
  { id:"b7-06", topic:"bai7", q:"Chiến thắng nào được coi là mốc mở đầu thắng lợi của quân ta trong kháng chiến chống Pháp?", options:["Việt Bắc 1947","Biên giới 1950","Điện Biên Phủ 1954","Tây Bắc 1952"], answer:1 },
  { id:"b7-07", topic:"bai7", q:"Tướng Pháp nào đã bị bắt sống tại Điện Biên Phủ?", options:["Đờ Cát (De Castries)","Na-va (Navarre)","Bô-la-e (Bollaert)","Sao (Salan)"], answer:0 },
  { id:"b7-08", topic:"bai7", q:"Hiệp định Genève 1954 quy định vĩ tuyến nào là giới tuyến quân sự tạm thời ở Việt Nam?", options:["Vĩ tuyến 17","Vĩ tuyến 16","Vĩ tuyến 18","Vĩ tuyến 20"], answer:0 },

  /* ================= BÀI 8: KHÁNG CHIẾN CHỐNG MỸ ================= */
  { id:"b8-01", topic:"bai8", q:"Cuộc kháng chiến chống Mỹ cứu nước của nhân dân ta kéo dài trong bao nhiêu năm?", options:["20 năm (1955–1975)","21 năm (1954–1975)","15 năm (1960–1975)","10 năm (1965–1975)"], answer:1 },
  { id:"b8-02", topic:"bai8", q:"Chiến thắng nào đánh dấu bước ngoặt của cuộc kháng chiến chống Mỹ?", options:["Chiến thắng Ấp Bắc","Chiến thắng Vạn Tường","Tổng tiến công Mậu Thân 1968","Chiến thắng Điện Biên Phủ trên không 1972"], answer:1 },
  { id:"b8-03", topic:"bai8", q:"Hiệp định Pari về Việt Nam được ký kết vào năm nào?", options:["1968","1970","1973","1975"], answer:2 },
  { id:"b8-04", topic:"bai8", q:"Chiến dịch Hồ Chí Minh kết thúc vào ngày nào?", options:["30/4/1975","1/5/1975","2/9/1975","26/3/1975"], answer:0 },
  { id:"b8-05", topic:"bai8", q:"“Điện Biên Phủ trên không” là chiến thắng của quân dân miền Bắc chống lại cuộc tập kích bằng máy bay nào của Mỹ?", options:["B-52","F-4","B-1","F-16"], answer:0 },
  { id:"b8-06", topic:"bai8", q:"Chiến lược “Chiến tranh đặc biệt” của Mỹ được thực hiện ở miền Nam Việt Nam trong giai đoạn nào?", options:["1954–1960","1961–1965","1965–1968","1969–1972"], answer:1 },
  { id:"b8-07", topic:"bai8", q:"Sự kiện nào buộc Mỹ phải tuyên bố “Mỹ hóa trở lại” chiến tranh?", options:["Tổng tiến công Mậu Thân 1968","Hiệp định Pari 1973","Chiến thắng Điện Biên Phủ trên không 1972","Chiến thắng Ấp Bắc 1963"], answer:0 },
  { id:"b8-08", topic:"bai8", q:"Ý nghĩa lớn nhất của cuộc kháng chiến chống Mỹ cứu nước là gì?", options:["Giải phóng hoàn toàn miền Nam, thống nhất đất nước","Chấm dứt ách thống trị của Pháp","Mở rộng quan hệ với các nước xã hội chủ nghĩa","Gia nhập ASEAN"], answer:0 },

  /* ================= BÀI 9: VIỆT NAM SAU 1975 ================= */
  { id:"b9-01", topic:"bai9", q:"Sau ngày 30/4/1975, Việt Nam bước vào giai đoạn lịch sử nào?", options:["Xây dựng và bảo vệ Tổ quốc","Kháng chiến chống Pháp","Kháng chiến chống Mỹ","Thời kỳ Pháp thuộc"], answer:0 },
  { id:"b9-02", topic:"bai9", q:"Quốc hội khóa VI (1976) đã có quyết định quan trọng nào?", options:["Đổi tên nước thành CHXHCN Việt Nam","Thành lập Đảng Cộng sản Việt Nam","Ký Hiệp định Pari","Gia nhập ASEAN"], answer:0 },
  { id:"b9-03", topic:"bai9", q:"Việt Nam gặp khó khăn gì sau năm 1975 trong công cuộc xây dựng đất nước?", options:["Hậu quả chiến tranh nặng nề, bị bao vây cấm vận","Được quốc tế viện trợ dồi dào","Kinh tế phát triển nhanh chóng","Không gặp khó khăn gì"], answer:0 },
  { id:"b9-04", topic:"bai9", q:"Chiến tranh biên giới Tây Nam (1978–1979) diễn ra giữa Việt Nam và lực lượng nào?", options:["Khơ-me Đỏ (Pol Pot)","Quân Pháp","Quân Mỹ","Quân Nhật"], answer:0 },
  { id:"b9-05", topic:"bai9", q:"Chiến tranh biên giới phía Bắc (1979) diễn ra giữa Việt Nam và quốc gia nào?", options:["Trung Quốc","Lào","Campuchia","Thái Lan"], answer:0 },

  /* ================= BÀI 10: ĐỔI MỚI TỪ 1986 ================= */
  { id:"b10-01", topic:"bai10", q:"Đại hội Đảng nào đã khởi xướng công cuộc Đổi mới đất nước?", options:["Đại hội IV (1976)","Đại hội V (1982)","Đại hội VI (1986)","Đại hội VII (1991)"], answer:2 },
  { id:"b10-02", topic:"bai10", q:"Công cuộc Đổi mới ở Việt Nam được khởi xướng từ năm nào?", options:["1975","1980","1986","1991"], answer:2 },
  { id:"b10-03", topic:"bai10", q:"Đại hội VI (1986) đã xác định trọng tâm của công cuộc Đổi mới là gì?", options:["Đổi mới kinh tế","Đổi mới chính trị","Đổi mới văn hóa","Đổi mới quân sự"], answer:0 },
  { id:"b10-04", topic:"bai10", q:"Đường lối Đổi mới của Đảng ta được thực hiện theo cơ chế nào?", options:["Kinh tế thị trường định hướng xã hội chủ nghĩa","Kinh tế bao cấp","Kinh tế tự cung tự cấp","Kinh tế tư bản chủ nghĩa thuần túy"], answer:0 },
  { id:"b10-05", topic:"bai10", q:"Thành tựu nổi bật của công cuộc Đổi mới từ 1986 đến nay là gì?", options:["Đưa Việt Nam thoát khỏi khủng hoảng kinh tế – xã hội, trở thành nước đang phát triển","Trở thành nước phát triển nhất châu Á","Gia nhập NATO","Trở thành cường quốc quân sự"], answer:0 },
  { id:"b10-06", topic:"bai10", q:"Việt Nam chính thức trở thành thành viên của WTO vào năm nào?", options:["1995","2000","2007","2010"], answer:2 },

  /* ================= BÀI 11: HỘI NHẬP QUỐC TẾ ================= */
  { id:"b11-01", topic:"bai11", q:"Việt Nam gia nhập ASEAN vào năm nào?", options:["1995","1997","1999","2000"], answer:0 },
  { id:"b11-02", topic:"bai11", q:"Việt Nam bình thường hóa quan hệ với Mỹ vào năm nào?", options:["1990","1995","2000","2007"], answer:1 },
  { id:"b11-03", topic:"bai11", q:"Việt Nam gia nhập WTO vào năm nào?", options:["1995","2000","2007","2010"], answer:2 },
  { id:"b11-04", topic:"bai11", q:"Việt Nam đảm nhận vai trò Ủy viên không thường trực Hội đồng Bảo an Liên hợp quốc nhiệm kỳ 2008–2009 và nhiệm kỳ nào nữa?", options:["2018–2019","2020–2021","2015–2016","2010–2011"], answer:1 },
  { id:"b11-05", topic:"bai11", q:"Việt Nam là thành viên của tổ chức nào sau đây?", options:["ASEAN, WTO, Liên hợp quốc","NATO","EU","OPEC"], answer:0 },

  /* ================= BÀI 12: LỊCH SỬ ĐỊA PHƯƠNG ================= */
  { id:"b12-01", topic:"bai12", q:"Lịch sử địa phương là gì?", options:["Lịch sử của một vùng, địa phương cụ thể","Lịch sử thế giới","Lịch sử quốc gia","Lịch sử khu vực"], answer:0 },
  { id:"b12-02", topic:"bai12", q:"Việc học lịch sử địa phương có ý nghĩa gì?", options:["Hiểu rõ truyền thống quê hương, bồi dưỡng lòng yêu nước","Chỉ để thi cử","Không có ý nghĩa gì","Chỉ dành cho người lớn"], answer:0 },
  { id:"b12-03", topic:"bai12", q:"Nguồn tư liệu nào thường được sử dụng để nghiên cứu lịch sử địa phương?", options:["Di tích, hiện vật, tài liệu lưu trữ, truyền thuyết","Chỉ sách giáo khoa","Chỉ phim ảnh","Chỉ lời kể dân gian"], answer:0 },
];