/* =========================================================
   EXAMS — Đề thi luyện + đề thi thử THPTQG
   Cấu trúc mỗi đề:
     { id, title, school, year, duration (phút), questions: [...] }
   Câu hỏi giống hệt questions.js: { q, options, answer }
   ========================================================= */

/* ============ ĐỀ LUYỆN (giữa kỳ, cuối kỳ) ============ */
const LUYEN_DE_EXAMS = [
  {
    id: "gk1-2024-thpt-a",
    title: "Đề giữa kỳ 1 — Sở GD Hà Nội",
    school: "THPT Chuyên Hà Nội - Amsterdam",
    year: "2024",
    duration: 45,
    questions: [
      { q:"Hội nghị quốc tế nào đã thông qua bản Hiến chương Liên hợp quốc?", options:["Hội nghị Ianta","Hội nghị San Francisco","Hội nghị Pốt-xđam","Hội nghị Bàn Môn Điếm"], answer:1 },
      { q:"Hiến chương Liên hợp quốc có hiệu lực vào ngày tháng năm nào?", options:["26/6/1945","24/10/1945","25/4/1945","20/9/1977"], answer:1 },
      { q:"Hội đồng Bảo an Liên hợp quốc có bao nhiêu ủy viên thường trực?", options:["3","4","5","6"], answer:2 },
      { q:"Việt Nam gia nhập Liên hợp quốc vào thời gian nào?", options:["20/9/1977","28/7/1995","25/6/1950","2/9/1945"], answer:0 },
      { q:"Hội nghị Ianta diễn ra vào thời gian nào?", options:["4/2 – 11/2/1945","17/7 – 2/8/1945","25/4 – 26/6/1945","14/8/1945"], answer:0 },
      { q:"Chiến tranh lạnh chính thức bắt đầu bằng sự kiện nào?", options:["Học thuyết Truman (1947)","NATO thành lập (1949)","Khối Vác-sa-va thành lập (1955)","Bức tường Berlin dựng lên (1961)"], answer:0 },
      { q:"Khối quân sự NATO được thành lập năm nào?", options:["1947","1949","1955","1957"], answer:1 },
      { q:"Tổ chức Hiệp ước Vác-sa-va được thành lập năm nào?", options:["1949","1950","1955","1961"], answer:2 },
      { q:"ASEAN được thành lập vào ngày tháng năm nào?", options:["8/8/1967","8/8/1976","28/7/1995","31/12/2015"], answer:0 },
      { q:"Việt Nam gia nhập ASEAN vào năm nào?", options:["1995","1997","1999","2000"], answer:0 },
    ]
  },
  {
    id: "gk1-2024-thpt-b",
    title: "Đề giữa kỳ 1 — Sở GD TP.HCM",
    school: "THPT Lê Hồng Phong",
    year: "2024",
    duration: 45,
    questions: [
      { q:"Hội nghị San Francisco diễn ra trong khoảng thời gian nào?", options:["4/2 – 11/2/1945","25/4 – 26/6/1945","17/7 – 2/8/1945","14/8 – 2/9/1945"], answer:1 },
      { q:"Có bao nhiêu quốc gia sáng lập Liên hợp quốc?", options:["50","51","5","15"], answer:1 },
      { q:"Trụ sở Liên hợp quốc đặt tại đâu?", options:["Genève","Bruxelles","New York","Paris"], answer:2 },
      { q:"Cơ quan nào giữ vai trò trọng yếu trong duy trì hòa bình thế giới?", options:["Đại hội đồng","Hội đồng Bảo an","Ban Thư ký","Hội đồng Kinh tế - Xã hội"], answer:1 },
      { q:"Nguyên thủ ba cường quốc tham gia Hội nghị Ianta là ai?", options:["Mỹ, Anh, Pháp","Mỹ, Anh, Liên Xô","Mỹ, Liên Xô, Trung Quốc","Anh, Pháp, Liên Xô"], answer:1 },
      { q:"Trật tự hai cực Ianta do hai cường quốc nào chi phối?", options:["Mỹ và Liên Xô","Mỹ và Trung Quốc","Anh và Pháp","Liên Xô và Trung Quốc"], answer:0 },
      { q:"Kế hoạch Marshall được Mỹ đề ra năm nào?", options:["1945","1947","1949","1955"], answer:1 },
      { q:"Chiến tranh Triều Tiên diễn ra trong giai đoạn nào?", options:["1945–1950","1950–1953","1955–1960","1960–1965"], answer:1 },
      { q:"Cộng đồng ASEAN chính thức thành lập vào ngày nào?", options:["8/8/2015","31/12/2015","22/11/2015","1/1/2016"], answer:1 },
      { q:"Campuchia gia nhập ASEAN vào năm nào?", options:["1995","1997","1999","2003"], answer:2 },
    ]
  },
  {
    id: "ck1-2024-thpt-c",
    title: "Đề cuối kỳ 1 — Sở GD Đà Nẵng",
    school: "THPT Phan Châu Trinh",
    year: "2024",
    duration: 45,
    questions: [
      { q:"Sự kiện nào đánh dấu chấm dứt Chiến tranh lạnh?", options:["Cuộc gặp Malta (12/1989)","Liên Xô tan rã (1991)","Bức tường Berlin sụp đổ (1989)","Hiệp định Pari (1973)"], answer:0 },
      { q:"Liên Xô tan rã vào năm nào?", options:["1989","1990","1991","1993"], answer:2 },
      { q:"Sau Chiến tranh lạnh, thế giới phát triển theo xu hướng nào?", options:["Đơn cực","Đa cực","Lưỡng cực","Vô cực"], answer:1 },
      { q:"Cách mạng tháng Tám 1945 nổ ra trong bối cảnh nào?", options:["Nhật đầu hàng Đồng minh","Pháp đảo chính Nhật","Chiến tranh thế giới thứ hai bùng nổ","Liên Xô tấn công Nhật"], answer:0 },
      { q:"Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập vào ngày nào?", options:["19/8/1945","2/9/1945","25/8/1945","30/8/1945"], answer:1 },
      { q:"Hội nghị Tân Trào diễn ra vào thời gian nào?", options:["5/1941","8/1945","12/1946","3/1945"], answer:1 },
      { q:"Chiến dịch Điện Biên Phủ diễn ra trong bao nhiêu ngày đêm?", options:["30","56","75","100"], answer:1 },
      { q:"Hiệp định Genève được ký kết năm nào?", options:["1950","1954","1956","1962"], answer:1 },
      { q:"Hiệp định Pari được ký kết năm nào?", options:["1968","1970","1973","1975"], answer:2 },
      { q:"Chiến dịch Hồ Chí Minh kết thúc vào ngày nào?", options:["30/4/1975","1/5/1975","2/9/1975","26/3/1975"], answer:0 },
    ]
  },
];

/* ============ ĐỀ THI THỬ THPTQG ============ */
const THI_THU_EXAMS = [
  {
    id: "thptqg-2023",
    title: "Đề thi chính thức THPTQG 2023",
    school: "Bộ GD&ĐT",
    year: "2023",
    duration: 50,
    questions: [
      { q:"Hội nghị Ianta diễn ra trong bối cảnh nào?", options:["Chiến tranh thế giới thứ hai sắp kết thúc","Chiến tranh thế giới thứ hai bùng nổ","Chiến tranh lạnh kết thúc","Liên Xô tan rã"], answer:0 },
      { q:"Theo thỏa thuận Ianta, nước Đức bị chia thành mấy khu vực chiếm đóng?", options:["2","3","4","5"], answer:2 },
      { q:"Tổ chức nào được thành lập năm 1949 do Mỹ đứng đầu?", options:["NATO","SEATO","CENTO","Vác-sa-va"], answer:0 },
      { q:"Việt Nam gia nhập Liên hợp quốc năm nào?", options:["1975","1977","1995","2007"], answer:1 },
      { q:"ASEAN được thành lập với bao nhiêu thành viên sáng lập?", options:["4","5","6","10"], answer:1 },
      { q:"Cách mạng tháng Tám thành công đã mở ra kỷ nguyên gì?", options:["Độc lập, tự do","Phong kiến","Thuộc địa","Chiến tranh"], answer:0 },
      { q:"Chiến thắng Điện Biên Phủ diễn ra năm nào?", options:["1950","1952","1954","1956"], answer:2 },
      { q:"Hiệp định Pari về Việt Nam được ký năm nào?", options:["1968","1970","1973","1975"], answer:2 },
      { q:"Đại hội Đảng nào khởi xướng công cuộc Đổi mới?", options:["IV (1976)","V (1982)","VI (1986)","VII (1991)"], answer:2 },
      { q:"Việt Nam gia nhập WTO năm nào?", options:["1995","2000","2007","2010"], answer:2 },
      { q:"Việt Nam trở thành Ủy viên không thường trực HĐBA nhiệm kỳ nào?", options:["2008–2009","2015–2016","2018–2019","2020–2021"], answer:0 },
      { q:"Cộng đồng ASEAN thành lập năm nào?", options:["2007","2012","2015","2020"], answer:2 },
      { q:"Việt Nam bình thường hóa quan hệ với Mỹ năm nào?", options:["1990","1995","2000","2007"], answer:1 },
      { q:"Sự kiện nào đánh dấu chấm dứt Chiến tranh lạnh?", options:["Malta 1989","Liên Xô tan rã 1991","Berlin sụp đổ 1989","Pari 1973"], answer:0 },
      { q:"Liên Xô tan rã năm nào?", options:["1989","1990","1991","1993"], answer:2 },
      { q:"Việt Nam gia nhập ASEAN năm nào?", options:["1995","1997","1999","2000"], answer:0 },
      { q:"Chiến dịch Hồ Chí Minh kết thúc năm nào?", options:["1973","1974","1975","1976"], answer:2 },
      { q:"Nước Việt Nam Dân chủ Cộng hòa ra đời năm nào?", options:["1930","1945","1954","1975"], answer:1 },
      { q:"Điện Biên Phủ trên không diễn ra năm nào?", options:["1968","1970","1972","1973"], answer:2 },
      { q:"Hiến chương Liên hợp quốc có hiệu lực năm nào?", options:["1945","1947","1949","1950"], answer:0 },
    ]
  },
  {
    id: "thptqg-2022",
    title: "Đề thi chính thức THPTQG 2022",
    school: "Bộ GD&ĐT",
    year: "2022",
    duration: 50,
    questions: [
      { q:"Hội nghị San Francisco thông qua văn kiện nào?", options:["Hiến chương LHQ","Tuyên ngôn Nhân quyền","Hiệp ước hòa bình","Nghị quyết Ianta"], answer:0 },
      { q:"Cơ quan tư pháp chính của LHQ là gì?", options:["Tòa án Công lý Quốc tế","Hội đồng Bảo an","Đại hội đồng","Ban Thư ký"], answer:0 },
      { q:"Trật tự hai cực Ianta sụp đổ cùng với sự kiện nào?", options:["Liên Xô tan rã 1991","Bức tường Berlin sụp đổ 1989","Khối Vác-sa-va giải thể 1991","Cả 3 sự kiện trên"], answer:3 },
      { q:"ASEAN được thành lập tại thành phố nào?", options:["Jakarta","Bangkok","Manila","Kuala Lumpur"], answer:1 },
      { q:"Việt Nam gia nhập ASEAN năm nào?", options:["1995","1997","1999","2000"], answer:0 },
      { q:"Cộng đồng ASEAN gồm mấy trụ cột?", options:["2","3","4","5"], answer:1 },
      { q:"Đảng Cộng sản Việt Nam ra đời năm nào?", options:["1925","1930","1945","1954"], answer:1 },
      { q:"Cách mạng tháng Tám thành công năm nào?", options:["1945","1946","1954","1975"], answer:0 },
      { q:"Chiến dịch Việt Bắc diễn ra năm nào?", options:["1946","1947","1950","1954"], answer:1 },
      { q:"Chiến dịch Biên giới diễn ra năm nào?", options:["1947","1950","1952","1954"], answer:1 },
      { q:"Điện Biên Phủ kết thúc năm nào?", options:["1950","1952","1954","1956"], answer:2 },
      { q:"Hiệp định Genève ký năm nào?", options:["1950","1954","1956","1962"], answer:1 },
      { q:"Chiến lược Chiến tranh đặc biệt diễn ra giai đoạn nào?", options:["1954–1960","1961–1965","1965–1968","1969–1972"], answer:1 },
      { q:"Chiến lược Chiến tranh cục bộ diễn ra giai đoạn nào?", options:["1961–1965","1965–1968","1969–1973","1973–1975"], answer:1 },
      { q:"Tết Mậu Thân diễn ra năm nào?", options:["1965","1968","1972","1975"], answer:1 },
      { q:"Hiệp định Pari ký năm nào?", options:["1968","1970","1973","1975"], answer:2 },
      { q:"Đại thắng mùa Xuân 1975 kết thúc năm nào?", options:["1973","1974","1975","1976"], answer:2 },
      { q:"Đại hội Đổi mới của Đảng diễn ra năm nào?", options:["1976","1982","1986","1991"], answer:2 },
      { q:"Việt Nam gia nhập WTO năm nào?", options:["1995","2000","2007","2010"], answer:2 },
      { q:"Việt Nam bình thường hóa quan hệ với Mỹ năm nào?", options:["1990","1995","2000","2007"], answer:1 },
    ]
  },
];