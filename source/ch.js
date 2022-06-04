/* 
1.Render List Songs:done
2.scrollTop : done
3.Play / Pause /seek:done
4.CD rotate when playing: done
5.Next/ Prev: done
6.Random Song:done
7.Next/repeat khi bai hat ket thuc:done
8.active Song khi play :done
9:scroll active song into view:done
10:Play song when click
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $(".btn.btn-toggle-play");
const player = $('.player');
const progressbar = $('#progress');
const next = $('.btn-next');
const prev = $('.btn-prev');
const randomSong = $('.btn-random')
const repeatSong = $('.btn-repeat');
const playlist = $('.playlist');
const PLAYER_STORAGE = "HOANG_TUAN";
/* volume */
const range = $(".volume input[type=range]");
const barHoverBox = $(".volume .bar-hoverbox");
const fill = $(".volume .bar .bar-fill");
const volumeBtn = $(".icon")
//1 : lay ra play list  va append list vao
const App = {
  //index hien tai gan = 0
  currentIndex: 0,
  //player co dang duoc chay k
  isPlaying: false,
  isActive: false,
  isRepeat: false,
  isMute: false,
  barStillDown:false,
  settings: JSON.parse(localStorage.getItem(PLAYER_STORAGE)) || {},
  songs: [   
// --ch01.tuandb.name.vn/11121111111111.mp3--
// --gitlab.com/3x5/temps/-/raw/a/1112111.mp3--
// --raw.githubusercontent.com/5fp/ch01/a/112111111.mp3--
//’

// {
//   name: '111111121111111111111',
//   singer: 'aanaanaaaamaaaaaaaa',
//   time: 'ttttbttttbttt',
//   path: 'https://gitlab.com/3x5/ch01/-/raw/a/mp3/13111111111111113111.mp3',
//   image: '/img/ch/13111111111111113111.jpg'
// },

// { ////
//   name: '1111111111111211111111',
//   singer: 'aaaaaanaaaanaaaaaaaa',
//   time: 'tttbttttbtttt',//https://ch01.tuandb.name.vn/1113111111111111111111.mp3',
//   path: 'https://raw.githubusercontent.com/5fp/ch01/a/1113111111111111111111.mp3',
//   image: '/img/ch/1113111111111111111111.jpg'
// },


{
  name: 'Tìm (寻)',
  singer: 'Chước Yêu (灼夭)',
  time: '2022-01-21',
  path: 'https://ch01.tuandb.name.vn/Tim.-.Chuoc.Yeu.mp3',
  image: '/img/ch/Tim.-.Chuoc.Yeu.jpg'
},
{
  name: 'Sư Đệ (师弟)',
  singer: 'Từ Mộng Viên; Triệu Phương Tịnh',
  time: '2022-01-21',
  path: 'https://ch01.tuandb.name.vn/Su.De.-.Tu.Mong.Vien_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Su.De.-.Tu.Mong.Vien_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Hảo Nhất Điểm (好一点) (don’t emo)',
  singer: 'Tiểu Lam Bối Tâm',
  time: '2022-01-20',
  path: 'https://ch01.tuandb.name.vn/Hao.Nhat.diem_dont.emo.-.Tieu.Lam.Boi.Tam.mp3',
  image: '/img/ch/Hao.Nhat.diem_dont.emo.-.Tieu.Lam.Boi.Tam.jpg'
},
{
  name: 'Phong Nguyệt Xướng (风月唱)',
  singer: 'Phi Ngư Xuất Thính; Cẩm Linh',
  time: '2022-01-20',
  path: 'https://ch01.tuandb.name.vn/Phong.Nguyet.Xuong.-.Phi.Ngu.Xuat.Thinh_Cam.Linh.mp3',
  image: '/img/ch/Phong.Nguyet.Xuong.-.Phi.Ngu.Xuat.Thinh_Cam.Linh.jpg'
},
{
  name: 'Tiễu Tuyết (悄雪)',
  singer: 'Noãn Noãn Nikki',
  time: '2022-01-20',
  path: 'https://ch01.tuandb.name.vn/Tieu.Tuyet.-.Noan.Noan.Nikki.mp3',
  image: '/img/ch/Tieu.Tuyet.-.Noan.Noan.Nikki.jpg'
},
{
  name: 'Tìm Anh Ấy Phía Tây (西厢寻他)',
  singer: 'Bá Tước Johnny; Đường Bá Hổ Annie',
  time: '2022-01-20',
  path: 'https://ch01.tuandb.name.vn/Tim.Anh.Ay.Phia.Tay.-.Ba.Tuoc.Johnny_Duong.Ba.Ho.Annie.mp3',
  image: '/img/ch/Tim.Anh.Ay.Phia.Tay.-.Ba.Tuoc.Johnny_Duong.Ba.Ho.Annie.jpg'
},
{
  name: 'Trẫm Tâm Hàn Chí Cực (朕心寒至极)',
  singer: 'Lâm Tà Dương; Nhị Cửu Cửu',
  time: '2022-01-20',
  path: 'https://ch01.tuandb.name.vn/Tram.Tam.Han.Chi.Cuc.-.Lam.Ta.Duong_Nhi.Cuu.Cuu.mp3',
  image: '/img/ch/Tram.Tam.Han.Chi.Cuc.-.Lam.Ta.Duong_Nhi.Cuu.Cuu.jpg'
},

{
  name: 'Là Em Bé Của Anh (做你的宝贝)',
  singer: 'Lý Khải Niên; Triệu Xu',
  time: '2022-01-19',
  path: 'https://ch01.tuandb.name.vn/La.Em.Be.Cua.Anh.-.Ly.Khai.Nien.Carl.Lee_Trieu.Xu.mp3',
  image: '/img/ch/La.Em.Be.Cua.Anh.-.Ly.Khai.Nien.Carl.Lee_Trieu.Xu.jpg'
},
{
  name: 'Tác Tửu (作酒)',
  singer: 'Đậu Bao (豆包)',
  time: '2022-01-18',
  path: 'https://ch01.tuandb.name.vn/Tac.Tuu.-.Dau.Bao.mp3',
  image: '/img/ch/Tac.Tuu.-.Dau.Bao.jpg'
},
{
  name: 'Theo Đuổi Anh (追寻你)',
  singer: 'Vương Thiên Qua; Xuyên Thanh',
  time: '2022-01-19',
  path: 'https://ch01.tuandb.name.vn/Theo.Duoi.Anh.-.Vuong.Thien.Qua_Xuyen.Thanh.mp3',
  image: '/img/ch/Theo.Duoi.Anh.-.Vuong.Thien.Qua_Xuyen.Thanh.jpg'
},
{
  name: 'Vết Thương (伤痕)',
  singer: 'Mạc Khiếu Tỷ Tỷ (莫叫姐姐)',
  time: '2022-01-12',
  path: 'https://ch01.tuandb.name.vn/Vet.Thuong.-.Mac.Khieu.Ty.Ty.mp3',
  image: '/img/ch/Vet.Thuong.-.Mac.Khieu.Ty.Ty.jpg'
},
{
  name: 'Uyên Ương (鸳鸯)',
  singer: 'Vương Thiên Trùng',
  time: '2022-01-10',
  path: 'https://ch01.tuandb.name.vn/Uyen.Uong.-.Vuong.Thien.Trung.mp3',
  image: '/img/ch/Uyen.Uong.-.Vuong.Thien.Trung.jpg'
},
{
  name: 'Tình Nhân Một Phút (一分钟恋人)',
  singer: 'Ngận Mỹ Vị (很美味)',
  time: '2022-01-04',
  path: 'https://ch01.tuandb.name.vn/Tinh.Nhan.Mot.Phut.-.Ngan.My.Vi.mp3',
  image: '/img/ch/Tinh.Nhan.Mot.Phut.-.Ngan.My.Vi.jpg'
},
{
  name: 'Hình Bóng (倒影)',
  singer: 'Lam Tâm Vũ (蓝心羽)',
  time: '2022-01-03',
  path: 'https://ch01.tuandb.name.vn/Hinh.Bong.-.Lam.Tam.Vu.mp3',
  image: '/img/ch/Hinh.Bong.-.Lam.Tam.Vu.jpg'
},
{
  name: 'Cô Ấy Biết Phép Thuật (她会魔法吧)',
  singer: 'DJ Tiểu Ngư Nhi',
  time: '2022-01-01',
  path: 'https://ch01.tuandb.name.vn/Co.Ay.Biet.Phep.Thuat.-.DJ.Tieu.Ngu.Nhi.mp3',
  image: '/img/ch/Co.Ay.Biet.Phep.Thuat.-.DJ.Tieu.Ngu.Nhi.jpg'
},
{
  name: 'Cô Ấy Biết Phép Thuật (她会魔法吧) (DJR7版)',
  singer: 'DJ Tiểu Ngư Nhi',
  time: '2022-01-01',
  path: 'https://ch01.tuandb.name.vn/Co.Ay.Biet.Phep.Thuat_DJR7.-.DJ.Tieu.Ngu.Nhi.mp3',
  image: '/img/ch/Co.Ay.Biet.Phep.Thuat.-.DJ.Tieu.Ngu.Nhi.jpg'
},
{
  name: 'Lòng Tham (贪心)',
  singer: 'Vương Hân Thần;Tô Tinh Tiệp',
  time: '2022-01-01',
  path: 'https://ch01.tuandb.name.vn/Long.Tham.-.Vuong.Han.Than_To.Tinh.Tiep.mp3',
  image: '/img/ch/Long.Tham.-.Vuong.Han.Than_To.Tinh.Tiep.jpg'
},
{
  name: 'Bầu Trời Đầy Sao (星空眺望)',
  singer: 'Tô Tinh Tiệp (苏星婕)',
  time: '2021-12-31',
  path: 'https://ch01.tuandb.name.vn/Bau.Troi.Day.Sao.-.To.Tinh.Tiep.mp3',
  image: '/img/ch/Bau.Troi.Day.Sao.-.To.Tinh.Tiep.jpg'
},
{
  name: 'Kết Thúc (结束)',
  singer: 'IN-K;Vương Hân Thần;Dương Du Đình',
  time: '2021-12-31',
  path: 'https://ch01.tuandb.name.vn/Ket.Thuc.-.IN-K_Vuong.Han.Than_Duong.Du.Dinh.mp3',
  image: '/img/ch/Ket.Thuc.-.IN-K_Vuong.Han.Than_Duong.Du.Dinh.jpg'
},
{
  name: 'Lung Lay Sắp Đổ (摇摇欲坠)',
  singer: 'Tiểu Lam Bối Tâm',
  time: '2021-12-31',
  path: 'https://ch01.tuandb.name.vn/Lung.Lay.Sap.Do.-.Tieu.Lam.Boi.Tam.mp3',
  image: '/img/ch/Lung.Lay.Sap.Do.-.Tieu.Lam.Boi.Tam.jpg'
},
{
  name: 'Thử Thách (挑战)',
  singer: 'Hoàng Tiêu Vân',
  time: '2021-12-31',
  path: 'https://ch01.tuandb.name.vn/Thu.Thach.-.Hoang.Tieu.Van.mp3',
  image: '/img/ch/Thu.Thach.-.Hoang.Tieu.Van.jpg'
},
{
  name: 'Tìm Kiếm Các Vì Sao (望星辰)',
  singer: 'Phượng Hoàng Truyền Kỳ',
  time: '2021-12-31',
  path: 'https://ch01.tuandb.name.vn/Tim.Kiem.Cac.Vi.Sao.-.Phuong.Hoang.Truyen.Ky.mp3',
  image: '/img/ch/Tim.Kiem.Cac.Vi.Sao.-.Phuong.Hoang.Truyen.Ky.jpg'
},
{
  name: 'Cô Gái Hư Hỏng (坏女孩)',
  singer: 'Lâm Di Tiệp (林怡婕)',
  time: '2021-12-30',
  path: 'https://ch01.tuandb.name.vn/Co.Gai.Hu.Hong.-.Lam.Di.Tiep.mp3',
  image: '/img/ch/Co.Gai.Hu.Hong.-.Lam.Di.Tiep.jpg'
},
{
  name: 'Cô Nương Của Núi Arxan (DJ A Trác Bản)',
  singer: 'Đậu Bao (豆包)',
  time: '2021-12-28',
  path: 'https://ch01.tuandb.name.vn/Co.Nuong.Cua.Nui.Arxan_DJ.A.Trac.Ban.-.Dau.Bao.mp3',
  image: '/img/ch/Co.Nuong.Cua.Nui.Arxan_DJ.A.Trac.Ban.-.Dau.Bao.jpg'
},
{
  name: 'Poison Kandy (魅)',
  singer: 'Hứa Giai Kỳ',
  time: '2021-12-28',
  path: 'https://ch01.tuandb.name.vn/Poison.Kandy.-.Hua.Giai.Ky.mp3',
  image: '/img/ch/Poison.Kandy.-.Hua.Giai.Ky.jpg'
},
{
  name: 'Thán (叹) (Ngây Thơ Chinese Version)',
  singer: 'Ngải Thần (艾辰)',
  time: '2021-12-25',
  path: 'https://ch01.tuandb.name.vn/Than.-.Ngai.Than.mp3',
  image: '/img/ch/Than.-.Ngai.Than.jpg'
},
{
  name: 'Anh Không Cần Em Quan Tâm (我根本不需要你在意)',
  singer: 'Y-D;Đại Tử;Duzzy;A1 TRIP',
  time: '2021-12-24',
  path: 'https://ch01.tuandb.name.vn/Anh.Khong.Can.Em.Quan.Tam.-.Y-D_Dai.Tu_Duzzy_A1.TRIP.mp3',
  image: '/img/ch/Anh.Khong.Can.Em.Quan.Tam.-.Y-D_Dai.Tu_Duzzy_A1.TRIP.jpg'
},
{
  name: 'Đại Hỉ Đại Bi (大囍大悲) (DJHema Việt Nam Cổ Bản)',
  singer: 'Châu Lâm Phong',
  time: '2021-12-24',
  path: 'https://ch01.tuandb.name.vn/Dai.Hi.Dai.Bi_DJHema.Viet.Nam.Co.Ban.-.Chau.Lam.Phong.mp3',
  image: '/img/ch/Dai.Hi.Dai.Bi_DJHema.Viet.Nam.Co.Ban.-.Chau.Lam.Phong.jpg'
},
{
  name: 'Đại Mộng Nhược Phù Sinh (大梦若浮生)',
  singer: 'Hồng Tư Vũ (洪思雨)',
  time: '2021-12-22',
  path: 'https://ch01.tuandb.name.vn/Dai.Mong.Nhuoc.Phu.Sinh.-.Hong.Tu.Vu.mp3',
  image: '/img/ch/Dai.Mong.Nhuoc.Phu.Sinh.-.Hong.Tu.Vu.jpg'
},
{
  name: 'Trăm Năm Cô Đơn (百年孤寂)',
  singer: 'Ngụy Hàm (魏晗)',
  time: '2021-12-22',
  path: 'https://ch01.tuandb.name.vn/Tram.Nam.Co.Don.-.Nguy.Ham.mp3',
  image: '/img/ch/Tram.Nam.Co.Don.-.Nguy.Ham.jpg'
},
{
  name: 'Đảo Lưu Thời Gian (倒流时间)',
  singer: 'G.E.M. Đặng Tử Kỳ',
  time: '2021-12-21',
  path: 'https://ch01.tuandb.name.vn/Dao.Luu.Thoi.Gian.-.G.E.M..Dang.Tu.Ky.mp3',
  image: '/img/ch/Dao.Luu.Thoi.Gian.-.G.E.M..Dang.Tu.Ky.jpg'
},
{
  name: 'Đắm Chìm (陷入)',
  singer: 'Ngô Đại Lâm;ICE',
  time: '2021-12-21',
  path: 'https://ch01.tuandb.name.vn/Dam.Chim.-.Ngo.Dai.Lam_ICE.mp3',
  image: '/img/ch/Dam.Chim.-.Ngo.Dai.Lam_ICE.jpg'
},
{
  name: 'Hứa Với Chàng (许你)',
  singer: 'Trình Hưởng (程响)',
  time: '2021-12-21',
  path: 'https://ch01.tuandb.name.vn/Hua.Voi.Chang.-.Trinh.Huong.mp3',
  image: '/img/ch/Hua.Voi.Chang.-.Trinh.Huong.jpg'
},
{
  name: 'Nai Sừng Tấm Bị Lạc (迷路麋鹿)',
  singer: 'Vượng Tử Tiểu Kiều;Đảo Huyền Đích Quất Tử',
  time: '2021-12-18',
  path: 'https://ch01.tuandb.name.vn/Nai.Sung.Tam.Bi.Lac.-.Vuong.Tu.Tieu.Kieu_Dao.Huyen.Dich.Quat.Tu.mp3',
  image: '/img/ch/Nai.Sung.Tam.Bi.Lac.-.Vuong.Tu.Tieu.Kieu_Dao.Huyen.Dich.Quat.Tu.jpg'
},
{
  name: 'Thiên Tuyển (天选)',
  singer: 'Vương Dĩ Thái;Khương Vân Thăng',
  time: '2021-12-18',
  path: 'https://ch01.tuandb.name.vn/Thien.Tuyen.-.Vuong.Di.Thai_Khuong.Van.Thang.mp3',
  image: '/img/ch/Thien.Tuyen.-.Vuong.Di.Thai_Khuong.Van.Thang.jpg'
},
{
  name: 'Có Tội Tình Gì (何罪之有)',
  singer: 'Mạc Khiếu Tỷ Tỷ (莫叫姐姐)',
  time: '2021-12-17',
  path: 'https://ch01.tuandb.name.vn/Co.Toi.Tinh.Gi.-.Mac.Khieu.Ty.Ty.mp3',
  image: '/img/ch/Co.Toi.Tinh.Gi.-.Mac.Khieu.Ty.Ty.jpg'
},
{
  name: 'Moonlight Dream (明月入梦来)',
  singer: 'Nha Nha Gagako (伢伢gagako)',
  time: '2021-12-17',
  path: 'https://ch01.tuandb.name.vn/Moonlight.Dream.-.Nha.Nha.Gagako.mp3',
  image: '/img/ch/Moonlight.Dream.-.Nha.Nha.Gagako.jpg'
},
{
  name: 'Truyền Thuyết Thế Giới (传说的世界)',
  singer: 'A-SOUL',
  time: '2021-12-17',
  path: 'https://ch01.tuandb.name.vn/Truyen.Thuyet.The.Gioi.-.A-SOUL.mp3',
  image: '/img/ch/Truyen.Thuyet.The.Gioi.-.A-SOUL.jpg'
},
{
  name: 'Thán (叹) (Ngây Thơ Chinese Version)',
  singer: 'Hoàng Linh (黄龄);Tăng Duy Tân;Phong Max',
  time: '2021-12-09',
  path: 'https://ch01.tuandb.name.vn/Than.-.Hoang.Linh_.Tang.Duy.Tan_.Phong.Max.mp3',
  image: '/img/ch/Than.-.Hoang.Linh_.Tang.Duy.Tan_.Phong.Max.jpg'
},
{//128
  name: 'Cạn Ly (碰杯)',
  singer: 'Lưu Mỹ Lân (劉美麟)',
  time: '2021-12-08',
  path: 'https://ch01.tuandb.name.vn/Can.Ly.-.Luu.My.Lan.mp3',
  image: '/img/ch/Can.Ly.-.Luu.My.Lan.jpg'
},
{
  name: 'Hải Vương Mệnh Danh Là Phi Thường',
  singer: 'Lý Ha Ha (李哈哈)',
  time: '2021-12-05',
  path: 'https://ch01.tuandb.name.vn/Hai.Vuong.Menh.Danh.La.Phi.Thuong_Hai.Vuong.Chi.Ca.-.Ly.Ha.Ha.mp3',
  image: '/img/ch/Hai.Vuong.Menh.Danh.La.Phi.Thuong_Hai.Vuong.Chi.Ca.-.Ly.Ha.Ha.jpg'
},
{
  name: 'Ảo Ảnh  (海市蜃楼)',
  singer: 'Tam Thúc Thuyết (三叔说)',
  time: '2021-12-02',
  path: 'https://ch01.tuandb.name.vn/Ao.Anh.-.Tam.Thuc.Thuyet.mp3',
  image: '/img/ch/Ao.Anh.-.Tam.Thuc.Thuyet.jpg'
},
{
  name: 'Uyên Ương Hí (鸳鸯戏) (Guitar Bản)',
  singer: 'Lược Lược Lược (略略略)',
  time: '2021-12-01',
  path: 'https://ch01.tuandb.name.vn/Uyen.Uong.Hi_yuanyang.xi._Guitar.Ban.-.Luoc.Luoc.Luoc.mp3',
  image: '/img/ch/Uyen.Uong.Hi_yuanyang.xi._Guitar.Ban.-.Luoc.Luoc.Luoc.jpg'
},
{
  name: 'Phàm Nhân Tiên (凡人仙)',
  singer: 'Triều Trần',
  time: '2021-12-05',
  path: 'https://ch01.tuandb.name.vn/Pham.Nhan.Tien.-.Trieu.Tran.mp3',
  image: '/img/ch/Pham.Nhan.Tien.-.Trieu.Tran.jpg'
},
{
  name: 'Chớp Mắt (眨眼睛)',
  singer: 'Tiểu Lam Bối Tâm;Hạ Đề',
  time: '2021-12-05',
  path: 'https://ch01.tuandb.name.vn/Chop.Mat.-.Tieu.Lam.Boi.Tam_Ha.De.mp3',
  image: '/img/ch/Chop.Mat.-.Tieu.Lam.Boi.Tam_Ha.De.jpg'
},
{
  name: 'Chiêu Hoa Tình (昭华情)',
  singer: 'Đẳng Thập Ma Quân',
  time: '2021-12-04',
  path: 'https://ch01.tuandb.name.vn/Chieu.Hoa.Tinh.-.Dang.Thap.Ma.Quan.mp3',
  image: '/img/ch/Chieu.Hoa.Tinh.-.Dang.Thap.Ma.Quan.jpg'
},
{
  name: 'Tửu Quán Nhi (酒馆儿)',
  singer: 'Khương Khương (姜姜)',
  time: '2021-12-01',
  path: 'https://ch01.tuandb.name.vn/Tuu.Quan.Nhi_jiuguan.er.-.Khuong.Khuong.mp3',
  image: '/img/ch/Tuu.Quan.Nhi_jiuguan.er.-.Khuong.Khuong.jpg'
},
{//128
  name: 'Ô Tình Yêu (傘愛)',
  singer: 'Cát Vũ Tình (葛雨晴)',
  time: '2020-11-30',
  path: 'https://ch01.tuandb.name.vn/O.Tinh.Yeu.-.Cat.Vu.Tinh.mp3',
  image: '/img/ch/O.Tinh.Yeu.-.Cat.Vu.Tinh.jpg'
},
{
  name: 'Yêu Anh Mọi Lúc (一整个爱住你)',
  singer: 'Trần Nhất Đồng',
  time: '2021-11-30',
  path: 'https://ch01.tuandb.name.vn/Yeu.Anh.Moi.Luc.-.Tran.Nhat.Dong.mp3',
  image: '/img/ch/Yeu.Anh.Moi.Luc.-.Tran.Nhat.Dong.jpg'
},
{
  name: 'Hồng Trần Bỉ Ngạn Không Có Nàng',
  singer: 'Mại Hề (迈兮)',
  time: '2021-11-26',
  path: 'https://ch01.tuandb.name.vn/Hong.Tran.Bi.Ngan.Khong.Co.Nang.-.Mai.He.mp3',
  image: '/img/ch/Hong.Tran.Bi.Ngan.Khong.Co.Nang.-.Mai.He.jpg'
},
{
  name: 'Thật Muốn Ôm Lấy Anh (好想抱住你)',
  singer: 'Trình jiajia',
  time: '2021-11-26',
  path: 'https://ch01.tuandb.name.vn/That.Muon.Om.Lay.Anh_hao.xiang.bao.zhu.ni.-.Trinh.jiajia.mp3',
  image: '/img/ch/That.Muon.Om.Lay.Anh_hao.xiang.bao.zhu.ni.-.Trinh.jiajia.jpg'
},
{
  name: 'Chiến Binh Cô Độc (孤勇者)',
  singer: 'Hưu Hưu Mãn (咻咻满)',
  time: '2021-11-25',
  path: 'https://ch01.tuandb.name.vn/Chien.Binh.Co.Doc.-.Huu.Huu.Man.mp3',
  image: '/img/ch/Chien.Binh.Co.Doc.-.Huu.Huu.Man.jpg'
},
{
  name: 'Tình Yêu Trong Giây Tiếp Theo (下一秒相爱)',
  singer: 'Kim Vãn Đả Lão Hổ;Tuyệt Thế Tiểu Tuyết Kỳ',
  time: '2021-11-22',
  path: 'https://ch01.tuandb.name.vn/Tinh.Yeu.Trong.Giay.Tiep.Theo.-.Kim.Van.Da.Lao.Ho_Tuyet.The.Tieu.Tuyet.Ky.mp3',
  image: '/img/ch/Tinh.Yeu.Trong.Giay.Tiep.Theo.-.Kim.Van.Da.Lao.Ho_Tuyet.The.Tieu.Tuyet.Ky.jpg'
},
{
  name: 'Thiếu Niên Khí (少年气)',
  singer: 'Cẩm Linh (锦零)',
  time: '2021-11-21',
  path: 'https://ch01.tuandb.name.vn/Thieu.Nien.Khi.-.Cam.Linh.mp3',
  image: '/img/ch/Thieu.Nien.Khi.-.Cam.Linh.jpg'
},
{
  name: 'Cửu Trọng Lâu (九重楼)',
  singer: 'Chỉ Tiêm Tiếu',
  time: '2021-11-19',
  path: 'https://ch01.tuandb.name.vn/Cuu.Trong.Lau.-.Chi.Tiem.Tieu.mp3',
  image: '/img/ch/Cuu.Trong.Lau.-.Chi.Tiem.Tieu.jpg'
},
{
  name: 'Lặn Xuống (下潜)',
  singer: 'Xuyên Thanh;Morerare',
  time: '2021-11-19',
  path: 'https://ch01.tuandb.name.vn/Lan.Xuong.-.Xuyen.Thanh_Morerare.mp3',
  image: '/img/ch/Lan.Xuong.-.Xuyen.Thanh_Morerare.jpg'
},
{
  name: 'Chiến Binh Cô Độc (孤勇者)',
  singer: 'Tổ Á Nạp Tích (祖娅纳惜)',
  time: '2021-11-21',
  path: 'https://ch01.tuandb.name.vn/Chien.Binh.Co.Doc.-.To.A.Nap.Tich.mp3',
  image: '/img/ch/Chien.Binh.Co.Doc.-.To.A.Nap.Tich.jpg'
},
{
  name: 'H2O (氧化氢)',
  singer: 'Lý Tiêm Tiêm (李尖尖)',
  time: '2021-11-16',
  path: 'https://ch01.tuandb.name.vn/H2O.-.Ly.Tiem.Tiem.mp3',
  image: '/img/ch/H2O.-.Ly.Tiem.Tiem.jpg'
},
{
  name: 'Tội Nghiệp Cha Cha (穷叉叉)',
  singer: 'Lạc Thiên Y (洛天依)',
  time: '2021-11-16',
  path: 'https://ch01.tuandb.name.vn/Cung.Xoa.Xoa.-.Lac.Thien.Y.mp3',
  image: '/img/ch/Cung.Xoa.Xoa.-.Lac.Thien.Y.jpg'
},
{
  name: 'Boring Day',
  singer: 'Stake',
  time: '2021-11-12',
  path: 'https://ch01.tuandb.name.vn/Boring.Day.-.Stake.mp3',
  image: '/img/ch/Boring.Day.-.Stake.jpg'
},
{
  name: 'Kim Giây (秒针) (DJR7版)',
  singer: 'A Lê Việt (阿梨粤)',
  time: '2021-11-09',
  path: 'https://ch01.tuandb.name.vn/Kim.Giay_DJR7.-.A.Le.Viet.mp3',
  image: '/img/ch/Kim.Giay.-.A.Le.Viet.jpg'
},
{
  name: 'Khi Tôi Cưới Cô Ấy (当我娶过她)',
  singer: 'Mạc Khiếu Tỷ Tỷ',
  time: '2021-11-09',
  path: 'https://ch01.tuandb.name.vn/Khi.Toi.Cuoi.Co.Ay.-.Mac.Khieu.Ty.Ty.mp3',
  image: '/img/ch/Khi.Toi.Cuoi.Co.Ay.-.Mac.Khieu.Ty.Ty.jpg'
},
{
  name: 'Nếu Như Gặp Lại (如果再见)',
  singer: 'Châu Lâm Phong;Hà Văn Vũ',
  time: '2021-11-06',
  path: 'https://ch01.tuandb.name.vn/Neu.Nhu.Gap.Lai.-.Chau.Lam.Phong_Ha.Van.Vu.mp3',
  image: '/img/ch/Neu.Nhu.Gap.Lai.-.Chau.Lam.Phong_Ha.Van.Vu.jpg'
},
{
  name: 'Hỷ Cùng Bi (囍与悲)',
  singer: 'Tam Nam;Châu Lâm Phong;L (Đào Tử)',
  time: '2021-11-01',
  path: 'https://ch01.tuandb.name.vn/Hy.Cung.Bi.-.Tam.Nam_Chau.Lam.Phong_L._Dao.Tu.mp3',
  image: '/img/ch/Hy.Cung.Bi.-.Tam.Nam_Chau.Lam.Phong_L._Dao.Tu.jpg'
},
{
  name: 'Tai Hoạ Từ Ánh Trăng (DJ Nhiệt Sưu Bản)',
  singer: 'Trần Chi',
  time: '2021-10-28',
  path: 'https://ch01.tuandb.name.vn/Tai.Hoa.Tu.Anh.Trang._DJ.re.sou.ban.-.Tran.Chi.mp3',
  image: '/img/ch/Tai.Hoa.Tu.Anh.Trang._DJ.re.sou.ban.-.Tran.Chi.jpg'
},
{
  name: 'Từng Phân Từng Tấc (一分一寸)',
  singer: 'Bất Thị Hoa Hỏa Nha',
  time: '2021-10-27',
  path: 'https://ch01.tuandb.name.vn/Tung.Phan.Tung.Tac.-.Bat.Thi.Hoa.Hoa.Nha.mp3',
  image: '/img/ch/Tung.Phan.Tung.Tac.-.Bat.Thi.Hoa.Hoa.Nha.jpg'
},
{
  name: 'Kim Ngọc Lương Duyên (金玉良缘)',
  singer: 'Phó Tuyết (付雪)',
  time: '2021-10-22',
  path: 'https://ch01.tuandb.name.vn/Kim.Ngoc.Luong.Duyen.-.Pho.Tuyet.mp3',
  image: '/img/ch/Kim.Ngoc.Luong.Duyen.-.Pho.Tuyet.jpg'
},
{
  name: 'Kim Ngọc Lương Duyên (金玉良缘) (DJR7版)',
  singer: 'Phó Tuyết (付雪)',
  time: '2021-10-22',
  path: 'https://ch01.tuandb.name.vn/Kim.Ngoc.Luong.Duyen_DJR7.-.Pho.Tuyet.mp3',
  image: '/img/ch/Kim.Ngoc.Luong.Duyen.-.Pho.Tuyet.jpg'
},
{
  name: 'Đẳng Phong Tuyết (等风雪)',
  singer: 'Khương Khương',
  time: '2021-10-21',
  path: 'https://ch01.tuandb.name.vn/dang.Phong.Tuyet.-.Khuong.Khuong.mp3',
  image: '/img/ch/dang.Phong.Tuyet.-.Khuong.Khuong.jpg'
},
{
  name: 'Nhân Gian Thán (人间叹)',
  singer: 'Đẳng Thập Ma Quân;Quốc Phong Tân Ngữ',
  time: '2021-10-20',
  path: 'https://ch01.tuandb.name.vn/Nhan.Gian.Than.-.Dang.Thap.Ma.Quan_Quoc.Phong.Tan.Ngu.mp3',
  image: '/img/ch/Nhan.Gian.Than.-.Dang.Thap.Ma.Quan_Quoc.Phong.Tan.Ngu.jpg'
},
{
  name: 'Đào Chi Yêu Yêu (DJheap Cửu Thiên Bản)',
  singer: 'Trương Hòa Hòa (张禾禾)',
  time: '2021-10-19',
  path: 'https://ch01.tuandb.name.vn/Dao.Chi.Yeu.Yeu_DJheap.Cuu.Thien.Ban.-.Truong.Hoa.Hoa.mp3',
  image: '/img/ch/Dao.Chi.Yeu.Yeu.-.Truong.Hoa.Hoa.jpg'
},
{
  name: 'Thời Tiết Mưa Nhỏ (小雨天气)',
  singer: 'yihuik Dĩ Tuệ;Hắc Nhân Lý Quỳ Noisemakers;Thập Thất Thảo',
  time: '2021-10-16',
  path: 'https://ch01.tuandb.name.vn/Thoi.Tiet.Mua.Nho.-.yihuik.Di.Tue_Hac.Nhan.Ly.Quy.Noisemakers_Thap.That.Thao.mp3',
  image: '/img/ch/Thoi.Tiet.Mua.Nho.-.yihuik.Di.Tue_Hac.Nhan.Ly.Quy.Noisemakers_Thap.That.Thao.jpg'
},
{//128
  name: 'Ngôn Ngữ Bí Mật (秘語)',
  singer: 'Nhậm Mị Sảng (任媚爽);Aioz',
  time: '2021-09-28',
  path: 'https://ch01.tuandb.name.vn/Ngon.Ngu.Bi.Mat.-.Nham.Mi.Sang_Aioz.mp3',
  image: '/img/ch/Ngon.Ngu.Bi.Mat.-.Nham.Mi.Sang_Aioz.jpg'
},
{
  name: 'Đêm Chưa Tàn (夜未央)',
  singer: 'Tiểu Điền Âm Nhạc Xã;Doãn Tích Miên;Chước Yêu',
  time: '2021-09-19',
  path: 'https://ch01.tuandb.name.vn/Dem.Chua.Tan.-.Tieu.Dien.Am.Nhac.Xa_Doan.Tich.Mien_Chuoc.Yeu.mp3',
  image: '/img/ch/Dem.Chua.Tan.-.Tieu.Dien.Am.Nhac.Xa_Doan.Tich.Mien_Chuoc.Yeu.jpg'
},
{
  name: 'Sao Trời Cùng Anh (星空与你)',
  singer: 'Tiểu Lam Bối Tâm',
  time: '2021-09-19',
  path: 'https://ch01.tuandb.name.vn/Sao.Troi.Cung.Anh.-.Tieu.Lam.Boi.Tam.mp3',
  image: '/img/ch/Sao.Troi.Cung.Anh.-.Tieu.Lam.Boi.Tam.jpg'
},
{
  name: 'Bữa Tiệc Nguy Hiểm (危险派对)',
  singer: 'Vương Dĩ Thái;Lưu Chí Giai',
  time: '2021-09-17',
  path: 'https://ch01.tuandb.name.vn/Bua.Tiec.Nguy.Hiem.-.Vuong.Di.Thai_Luu.Chi.Giai.mp3',
  image: '/img/ch/Bua.Tiec.Nguy.Hiem.-.Vuong.Di.Thai_Luu.Chi.Giai.jpg'
},
{
  name: 'Bình Thường Một Chút (普通一下)',
  singer: 'Lưu Thuỵ Kỳ',
  time: '2021-09-16',
  path: 'https://ch01.tuandb.name.vn/Binh.Thuong.Mot.Chut._Cu.Chill.Thoi.Ver.China.-.Luu.Thuy.Ky.mp3',
  image: '/img/ch/Binh.Thuong.Mot.Chut._Cu.Chill.Thoi.Ver.China.-.Luu.Thuy.Ky.jpg'
},
{
  name: 'Vũ Hội Hoá Trang (假面舞会)',
  singer: 'Ngận Mỹ Vị',
  time: '2021-09-14',
  path: 'https://ch01.tuandb.name.vn/Vu.Hoi.Hoa.Trang.-.Ngan.My.Vi.mp3',
  image: '/img/ch/Vu.Hoi.Hoa.Trang.-.Ngan.My.Vi.jpg'
},
{
  name: 'Tiểu Tửu Nương (小酒娘)',
  singer: 'Hoa Đồng',
  time: '2021-09-10',
  path: 'https://ch01.tuandb.name.vn/Tieu.Tuu.Nuong.-.Hoa.Dong.mp3',
  image: '/img/ch/Tieu.Tuu.Nuong.-.Hoa.Dong.jpg'
},
{
  name: 'Giờ Tý (子时)',
  singer: 'Âm Khuyết Thi Thính;Lý Giai Tư ',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Ty_.-.Am.Khuyet.Thi.Thinh_Ly.Giai.Tu.mp3',
  image: '/img/ch/Gio.Ty_.-.Am.Khuyet.Thi.Thinh_Ly.Giai.Tu.jpg'
},
{
  name: 'Giờ Sửu (丑时)',
  singer: 'Âm Khuyết Thi Thính;Vương Tử Ngọc',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Suu.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Gio.Suu.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Giờ Dần (寅时)',
  singer: 'Âm Khuyết Thi Thính; Triệu Phương Tịnh',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Dan.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Gio.Dan.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Giờ Mão (卯时)',
  singer: 'Âm Khuyết Thi Thính; Vương Tử Ngọc',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Meo.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Gio.Meo.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Giờ Thìn (辰时)',
  singer: 'Âm Khuyết Thi Thính; Côn Ngọc',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Thin.-.Am.Khuyet.Thi.Thinh_Con.Ngoc.mp3',
  image: '/img/ch/Gio.Thin.-.Am.Khuyet.Thi.Thinh_Con.Ngoc.jpg'
},
{
  name: 'Giờ Tỵ (巳时)',
  singer: 'Âm Khuyết Thi Thính; Lý Giai Tư',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Ty..-.Am.Khuyet.Thi.Thinh_Ly.Giai.Tu.mp3',
  image: '/img/ch/Gio.Ty..-.Am.Khuyet.Thi.Thinh_Ly.Giai.Tu.jpg'
},
{
  name: 'Giờ Ngọ (午时)',
  singer: 'Âm Khuyết Thi Thính; Vương Tử Ngọc',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Ngo.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Gio.Ngo.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Giờ Mùi (未时)',
  singer: 'Âm Khuyết Thi Thính;Triệu Phương Tịnh',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Mui.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Gio.Mui.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Giờ Thân (申时)',
  singer: 'Âm Khuyết Thi Thính;Côn Ngọc',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Than.-.Am.Khuyet.Thi.Thinh_Con.Ngoc.mp3',
  image: '/img/ch/Gio.Than.-.Am.Khuyet.Thi.Thinh_Con.Ngoc.jpg'
},
{
  name: 'Giờ Dậu (酉时)',
  singer: 'Âm Khuyết Thi Thính;Triệu Phương Tịnh',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Dau.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Gio.Dau.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Giờ Tuất (戌时)',
  singer: 'Âm Khuyết Thi Thính;Vương Tử Ngọc',
  time: '2021-08-28',
  path: 'https://ch01.tuandb.name.vn/Gio.Tuat.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Gio.Tuat.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Vận Đào Hoa (桃花运) (DJR7版)',
  singer: 'R7',
  time: '2021-09-05',
  path: 'https://ch01.tuandb.name.vn/Van.Dao.Hoa_DJR7.Ban.-.R7.mp3',
  image: '/img/ch/Van.Dao.Hoa_DJR7.Ban.-.R7.jpg'
},
{
  name: 'Phong Dạ Hành (风夜行)',
  singer: 'Tưởng Tuyết Nhi',
  time: '2021-08-27',
  path: 'https://ch01.tuandb.name.vn/Phong.Da.Hanh.-.Tuong.Tuyet.Nhi.mp3',
  image: '/img/ch/Phong.Da.Hanh.-.Tuong.Tuyet.Nhi.jpg'
},
{//128
  name: 'Tôi Sẽ Nuôi Một Chú Chó Thay Vì Có Bạn Trai',
  singer: 'ZouHaoHao',
  time: '2021-08-27',
  path: 'https://ch01.tuandb.name.vn/Toi.Se.Nuoi.Mot.Chu.Cho.Thay.Vi.Co.Ban.Trai.-.ZouHaoHao.mp3',
  image: '/img/ch/Toi.Se.Nuoi.Mot.Chu.Cho.Thay.Vi.Co.Ban.Trai.-.ZouHaoHao.jpg'
},
{
  name: 'Tứ Thư Ngũ Kinh (四书五经)',
  singer: 'Lâm Di Tiệp',
  time: '2021-08-20',
  path: 'https://ch01.tuandb.name.vn/Tu.Thu.Ngu.Kinh.-.Lam.Di.Tiep.mp3',
  image: '/img/ch/Tu.Thu.Ngu.Kinh.-.Lam.Di.Tiep.jpg'
},
{
  name: 'A Y Mạc (阿衣莫) (DJ Thẩm Niệm Bản)',
  singer: 'Tổ Hợp A Cát Thái',
  time: '2021-08-12',
  path: 'https://ch01.tuandb.name.vn/A.Y.Mac._DJ.shen.nian.ban.-.To.Hop.A.Cat.Thai.mp3',
  image: '/img/ch/A.Y.Mac._DJ.shen.nian.ban.-.To.Hop.A.Cat.Thai.jpg'
},
{
  name: 'Nhật Ký Tình Yêu Phi Điểu (飞鸟恋爱日记)',
  singer: 'Bất Thị Hoa Hỏa Nha',
  time: '2021-08-07',
  path: 'https://ch01.tuandb.name.vn/Nhat.Ky.Tinh.Yeu.Phi.Dieu.-.Bat.Thi.Hoa.Hoa.Nha.mp3',
  image: '/img/ch/Nhat.Ky.Tinh.Yeu.Phi.Dieu.-.Bat.Thi.Hoa.Hoa.Nha.jpg'
},
{
  name: 'Chúng Ta Cùng Đẩy Đôi Mái Chèo (DJR7版)',
  singer: 'Đường Tiểu Lực (唐小力)',
  time: '2021-08-06',
  path: 'https://ch01.tuandb.name.vn/Chung.Ta.Cung.Day.Doi.Mai.Cheo_DJR7.-.Duong.Tieu.Luc.mp3',
  image: '/img/ch/Chung.Ta.Cung.Day.Doi.Mai.Cheo_DJR7.-.Duong.Tieu.Luc.jpg'
},
{
  name: 'Đừng Bỏ Lỡ (别错过) (DJ Bản)',
  singer: 'Đới Vũ Đồng',
  time: '2021-08-06',
  path: 'https://ch01.tuandb.name.vn/Dung.Bo.Lo._DJ.ban.-.Doi.Vu.Dong.mp3',
  image: '/img/ch/Dung.Bo.Lo._DJ.ban.-.Doi.Vu.Dong.jpg'
},
{
  name: 'Giang Hồ Quái Già (江湖怪咖)',
  singer: 'Linh Nhất Cửu Linh Nhị',
  time: '2021-08-05',
  path: 'https://ch01.tuandb.name.vn/Giang.Ho.Quai.Gia.-.Linh.Nhat.Cuu.Linh.Nhi.mp3',
  image: '/img/ch/Giang.Ho.Quai.Gia.-.Linh.Nhat.Cuu.Linh.Nhi.jpg'
},
{
  name: 'Giang Hồ Quái Già (江湖怪咖) (DJ Danh Long Bản)',
  singer: 'Linh Nhất Cửu Linh Nhị',
  time: '2021-08-05',
  path: 'https://ch01.tuandb.name.vn/Giang.Ho.Quai.Gia._DJ.ming.long.ban.-.Linh.Nhat.Cuu.Linh.Nhi.mp3',
  image: '/img/ch/Giang.Ho.Quai.Gia.-.Linh.Nhat.Cuu.Linh.Nhi.jpg'
},
{
  name: 'Bảo Bối Thứ Mấy (第几个宝贝)',
  singer: 'Trình Giai Giai',
  time: '2021-07-30',
  path: 'https://ch01.tuandb.name.vn/Bao.Boi.Thu.May.-.Trinh.Giai.Giai.mp3',
  image: '/img/ch/Bao.Boi.Thu.May.-.Trinh.Giai.Giai.jpg'
},
{
  name: 'Công Tử Thán (公子叹)',
  singer: 'Chỉ Tiêm Tiếu',
  time: '2021-07-30',
  path: 'https://ch01.tuandb.name.vn/Cong.Tu.Than.-.Chi.Tiem.Tieu.mp3',
  image: '/img/ch/Cong.Tu.Than.-.Chi.Tiem.Tieu.jpg'
},
{
  name: 'Tình Yêu Cuồng Nhiệt Của Cây Kem',
  singer: 'Yihuik Dĩ Tuệ',
  time: '2021-07-29',
  path: 'https://ch01.tuandb.name.vn/Tinh.Yeu.Cuong.Nhiet.Cua.Cay.Kem.-.Yihuik.Di.Tue.mp3',
  image: '/img/ch/Tinh.Yeu.Cuong.Nhiet.Cua.Cay.Kem.-.Yihuik.Di.Tue.jpg'
},
{
  name: 'Em Sợ Người Tới Không Phải Anh (DJ Bản)',
  singer: 'Tiểu Lam Bối Tâm',
  time: '2021-07-24',
  path: 'https://ch01.tuandb.name.vn/Em.So.Nguoi.Toi.Khong.Phai.Anh._dj_.-.Tieu.Lam.Boi.Tam.mp3',
  image: '/img/ch/Em.So.Nguoi.Toi.Khong.Phai.Anh._dj_.-.Tieu.Lam.Boi.Tam.jpg'
},
{
  name: 'Không Thở Dài (空长叹)',
  singer: 'Y Cách Tái Thính;Cẩm Linh',
  time: '2021-07-23',
  path: 'https://ch01.tuandb.name.vn/Khong.Tho.Dai.-.Y.Cach.Tai.Thinh_Cam.Linh.mp3',
  image: '/img/ch/Khong.Tho.Dai.-.Y.Cach.Tai.Thinh_Cam.Linh.jpg'
},
{
  name: 'Không Bằng (不如)',
  singer: 'Dã Khả',
  time: '2021-07-20',
  path: 'https://ch01.tuandb.name.vn/Khong.Bang.-.Da.Kha.mp3',
  image: '/img/ch/Khong.Bang.-.Da.Kha.jpg'
},
{
  name: 'Kiêu (骁)',
  singer: 'Tỉnh Lung;Tỉnh Địch Nhi',
  time: '2021-07-18',
  path: 'https://ch01.tuandb.name.vn/Kieu.-.Tinh.Lung_Tinh.Dich.Nhi.mp3',
  image: '/img/ch/Kieu.-.Tinh.Lung_Tinh.Dich.Nhi.jpg'
},
{
  name: 'Anh Có Thể Đừng Rời Xa Em (DJ Mặc Hàm Bản)',
  singer: 'Mạc Khiếu Tỷ Tỷ',
  time: '2021-07-05',
  path: 'https://ch01.tuandb.name.vn/Anh.Co.The.Dung.Roi.Xa.Em.Duoc.Khong_DJ.Mo.Han.Ban.-.Mac.Khieu.Ty.Ty.mp3',
  image: '/img/ch/Anh.Co.The.Dung.Roi.Xa.Em.Duoc.Khong_DJ.Mo.Han.Ban.-.Mac.Khieu.Ty.Ty.jpg'
},
{
  name: 'Vấn Kỳ (问棋)',
  singer: 'Phiến Bảo (扇宝)',
  time: '2021-06-29',
  path: 'https://ch01.tuandb.name.vn/Van.Ky.-.Phien.Bao.mp3',
  image: '/img/ch/Van.Ky.-.Phien.Bao.jpg'
},
{
  name: 'Sợ Thấy Hoa Bay (怕见飞花)',
  singer: 'Tuyết Cầu',
  time: '2021-06-25',
  path: 'https://ch01.tuandb.name.vn/So.Thay.Hoa.Bay.-.Tuyet.Cau.mp3',
  image: '/img/ch/So.Thay.Hoa.Bay.-.Tuyet.Cau.jpg'
},
{
  name: 'Ring Ring Ring',
  singer: 'Bất Thị Hoa Hỏa Nha',
  time: '2021-06-25',
  path: 'https://ch01.tuandb.name.vn/Ring.Ring.Ring.-.Bat.Thi.Hoa.Hoa.Nha.mp3',
  image: '/img/ch/Ring.Ring.Ring.-.Bat.Thi.Hoa.Hoa.Nha.jpg'
},
{
  name: 'Black Cupid',
  singer: 'Tạ Khả Dần',
  time: '2021-06-14',
  path: 'https://ch01.tuandb.name.vn/Black.Cupid.-.Ta.Kha.Dan.mp3',
  image: '/img/ch/Black.Cupid.-.Ta.Kha.Dan.jpg'
},
{
  name: 'Piu Piu Piu',
  singer: 'Bính Âm Sư (拼音师)',
  time: '2021-06-13',
  path: 'https://ch01.tuandb.name.vn/Piu.Piu.Piu.-.Binh.Am.Su.mp3',
  image: '/img/ch/Piu.Piu.Piu.-.Binh.Am.Su.jpg'
},
{//128
  name: 'Tửu Quán Nhi (酒馆儿)',
  singer: 'Lạc Thiếu Gia',
  time: '2021-06-13',
  path: 'https://ch01.tuandb.name.vn/Tuu.Quan.Nhi.-.Lac.Thieu.Gia.mp3',
  image: '/img/ch/Tuu.Quan.Nhi.-.Lac.Thieu.Gia.jpg'
},
{
  name: 'Liệu Có Quá Muộn Không (会不会太晚)',
  singer: 'Li-2c',
  time: '2021-06-12',
  path: 'https://ch01.tuandb.name.vn/Lieu.Co.Qua.Muon.Khong.-.Li-2c.mp3',
  image: '/img/ch/Lieu.Co.Qua.Muon.Khong.-.Li-2c.jpg'
},
{
  name: 'Tham (参)',
  singer: 'Hoàn Tử U',
  time: '2021-06-12',
  path: 'https://ch01.tuandb.name.vn/Tham.-.Hoan.Tu.U.mp3',
  image: '/img/ch/Tham.-.Hoan.Tu.U.jpg'
},
{
  name: 'Ngân Hà Và Vì Sao (银河与星斗)',
  singer: 'Yihuik Dĩ Tuệ',
  time: '2021-05-30',
  path: 'https://ch01.tuandb.name.vn/Ngan.Ha.Va.Vi.Sao.-.Yihuik.Di.Tue.mp3',
  image: '/img/ch/Ngan.Ha.Va.Vi.Sao.-.Yihuik.Di.Tue.jpg'
},
{
  name: 'Đến Khiêu Vũ (来跳舞)',
  singer: 'Hải Lai A Mộc (海来阿木)',
  time: '2021-05-29',
  path: 'https://ch01.tuandb.name.vn/Den.Khieu.Vu.-.Hai.Lai.A.Moc.mp3',
  image: '/img/ch/Den.Khieu.Vu.-.Hai.Lai.A.Moc.jpg'
},
{
  name: 'Đến Khiêu Vũ (来跳舞) (DJ Gia Khoái Bản)',
  singer: 'Hải Lai A Mộc (海来阿木)',
  time: '2021-05-29',
  path: 'https://ch01.tuandb.name.vn/Den.Khieu.Vu_DJ.Gia.Khoai.Ban.-.Hai.Lai.A.Moc.mp3',
  image: '/img/ch/Den.Khieu.Vu.-.Hai.Lai.A.Moc.jpg'
},
{
  name: 'Trong Đôi Mắt Đều Là Anh (目及皆是你)',
  singer: 'Tiểu Lam Bối Tâm',
  time: '2021-05-29',
  path: 'https://ch01.tuandb.name.vn/Trong.Doi.Mat.Deu.La.Anh.-.Tieu.Lam.Boi.Tam.mp3',
  image: '/img/ch/Trong.Doi.Mat.Deu.La.Anh.-.Tieu.Lam.Boi.Tam.jpg'
},
{
  name: 'Đôi Mắt Em Tựa Ánh Sao Trời',
  singer: 'Lưu Chí Giai',
  time: '2021-05-28',
  path: 'https://ch01.tuandb.name.vn/Doi.Mat.Em.Tua.Anh.Sao.Troi.-.Luu.Chi.Giai.mp3',
  image: '/img/ch/Doi.Mat.Em.Tua.Anh.Sao.Troi.-.Luu.Chi.Giai.jpg'
},
{
  name: 'Uống Rượu Ngắm Trăng (把酒望月)',
  singer: 'Y Cách Tái Thính; Chỉ Tiêm Tiếu',
  time: '2021-05-27',
  path: 'https://ch01.tuandb.name.vn/Uong.Ruou.Ngam.Trang.-.Y.Cach.Tai.Thinh_Chi.Tiem.Tieu.mp3',
  image: '/img/ch/Uong.Ruou.Ngam.Trang.-.Y.Cach.Tai.Thinh_Chi.Tiem.Tieu.jpg'
},
{
  name: 'Lao Tới Sao Trời (奔赴星空)',
  singer: 'Hạ Kính Hiên (贺敬轩)',
  time: '2021-05-26',
  path: 'https://ch01.tuandb.name.vn/Lao.Toi.Sao.Troi.-.Ha.Kinh.Hien.mp3',
  image: '/img/ch/Lao.Toi.Sao.Troi.-.Ha.Kinh.Hien.jpg'
},
{
  name: 'Lao Tới Sao Trời (奔赴星空) (DJ A Viễn Bản)',
  singer: 'Hạ Kính Hiên (贺敬轩)',
  time: '2021-05-26',
  path: 'https://ch01.tuandb.name.vn/Lao.Toi.Sao.Troi_DJ.A.Vien.Ban.-.Ha.Kinh.Hien.mp3',
  image: '/img/ch/Lao.Toi.Sao.Troi.-.Ha.Kinh.Hien.jpg'
},
{
  name: 'Yêu Anh Đến Khoảnh Khắc Cuối Cùng',
  singer: 'Mạc Khiếu Tỷ Tỷ',
  time: '2021-05-26',
  path: 'https://ch01.tuandb.name.vn/Yeu.Anh.Den.Khoanh.Khac.Cuoi.Cung.-.Mac.Khieu.Ty.Ty.mp3',
  image: '/img/ch/Yeu.Anh.Den.Khoanh.Khac.Cuoi.Cung.-.Mac.Khieu.Ty.Ty.jpg'
},
{
  name: 'Bán Sinh Tuyết (半生雪)',
  singer: 'Tưởng Tuyết Nhi',
  time: '2021-05-22',
  path: 'https://ch01.tuandb.name.vn/Ban.Sinh.Tuyet.-.Tuong.Tuyet.Nhi.mp3',
  image: '/img/ch/Ban.Sinh.Tuyet.-.Tuong.Tuyet.Nhi.jpg'
},
{
  name: 'Sức Hút Cạm Bẫy (引力陷阱)',
  singer: 'Phó Mộng Đồng; Khúc Khốc',
  time: '2021-05-20',
  path: 'https://ch01.tuandb.name.vn/Suc.Hut.Cam.Bay.-.Pho.Mong.Dong_Khuc.Khoc.mp3',
  image: '/img/ch/Suc.Hut.Cam.Bay.-.Pho.Mong.Dong_Khuc.Khoc.jpg'
},
{
  name: 'Đặt Bút (落笔)',
  singer: 'Tình Tiểu Dao',
  time: '2021-05-15',
  path: 'https://ch01.tuandb.name.vn/Dat.But.-.Tinh.Tieu.Dao.mp3',
  image: '/img/ch/Dat.But.-.Tinh.Tieu.Dao.jpg'
},
{
  name: 'Đến Khiêu Vũ (来跳舞)',
  singer: 'Cát Bố Lý Hoành (吉布李宏)',
  time: '2021-05-11',
  path: 'https://ch01.tuandb.name.vn/Den.Khieu.Vu.-.Cat.Bo.Ly.Hoanh.mp3',
  image: '/img/ch/Den.Khieu.Vu.-.Cat.Bo.Ly.Hoanh.jpg'
},
{
  name: 'My Cookie Can',
  singer: 'Ayi',
  time: '2021-05-04',
  path: 'https://ch01.tuandb.name.vn/My.Cookie.Can.-.Ayi.mp3',
  image: '/img/ch/My.Cookie.Can.-.Ayi.jpg'
},
{
  name: 'Lực Hút Trái Tim (心引力)',
  singer: 'Nhĩ Đích Đại Biểu Ca Khúc Giáp;GG Ba!',
  time: '2021-05-01',
  path: 'https://ch01.tuandb.name.vn/Luc.Hut.Trai.Tim.-.Khuc.Giap_GG.Ba.mp3',
  image: '/img/ch/Luc.Hut.Trai.Tim.-.Khuc.Giap_GG.Ba.jpg'
},
{
  name: 'Tài Ảnh Vi Hí (裁影为戏)',
  singer: 'Tam Vô MarBlue; Quốc Phong Vật Ngữ',
  time: '2021-05-01',
  path: 'https://ch01.tuandb.name.vn/Tai.Anh.Vi.Hi.-.Tam.Vo.MarBlue_Quoc.Phong.Vat.Ngu.mp3',
  image: '/img/ch/Tai.Anh.Vi.Hi.-.Tam.Vo.MarBlue_Quoc.Phong.Vat.Ngu.jpg'
},
{//256
  name: 'Hỉ (囍)',
  singer: 'Hưu Hưu Mãn (咻咻满)',
  time: '2021-04-30',
  path: 'https://ch01.tuandb.name.vn/Hi.-.Huu.Huu.Man.mp3',
  image: '/img/ch/Hi.-.Huu.Huu.Man.jpg'
},
{
  name: 'Lặng lẽ (悄悄)',
  singer: 'Trà Nhị Nương',
  time: '2021-04-29',
  path: 'https://ch01.tuandb.name.vn/Lang.Le.-.Tra.Nhi.Nuong.mp3',
  image: '/img/ch/Lang.Le.-.Tra.Nhi.Nuong.jpg'
},
{
  name: 'Mây Mù (云雾)',
  singer: 'Tưởng Tuyết Nhi',
  time: '2021-04-29',
  path: 'https://ch01.tuandb.name.vn/May.Mu.-.Tuong.Tuyet.Nhi.mp3',
  image: '/img/ch/May.Mu.-.Tuong.Tuyet.Nhi.jpg'
},
{
  name: 'Quay Đầu Lần Nữa (再回眸)',
  singer: 'Chỉ Tiêm Tiếu',
  time: '2021-04-28',
  path: 'https://ch01.tuandb.name.vn/Quay.Dau.Lan.Nua.-.Chi.Tiem.Tieu.mp3',
  image: '/img/ch/Quay.Dau.Lan.Nua.-.Chi.Tiem.Tieu.jpg'
},
{
  name: 'Quay Đầu Lần Nữa (再回眸) (DJ A Trác Bản)',
  singer: 'Chỉ Tiêm Tiếu',
  time: '2021-04-28',
  path: 'https://ch01.tuandb.name.vn/Quay.Dau.Lan.Nua._DJ.A.Trac.Ban.-.Chi.Tiem.Tieu.mp3',
  image: '/img/ch/Quay.Dau.Lan.Nua.-.Chi.Tiem.Tieu.jpg'
},
{
  name: 'Kiếp Sau Không Chắc Còn Có Thể Gặp Được Anh',
  singer: 'Mạc Khiếu Tỷ Tỷ',
  time: '2021-04-27',
  path: 'https://ch01.tuandb.name.vn/Kiep.Sau.Khong.Chac.Con.Co.The.Gap.Duoc.Anh.-.Mac.Khieu.Ty.Ty.mp3',
  image: '/img/ch/Kiep.Sau.Khong.Chac.Con.Co.The.Gap.Duoc.Anh.-.Mac.Khieu.Ty.Ty.jpg'
},
{
  name: 'Cơn Bão Tình Yêu (DJ Tiếng Quảng Đông Bản)',
  singer: 'Mộng Hàm',
  time: '2021-04-25',
  path: 'https://ch01.tuandb.name.vn/C-n.Bao.Tinh.Yeu._DJ.Yueyu.Ban.-.Mong.Ham.mp3',
  image: '/img/ch/C-n.Bao.Tinh.Yeu._DJ.Yueyu.Ban.-.Mong.Ham.jpg'
},
{
  name: 'Đáy Biển (海底) (Live)',
  singer: 'Phượng Hoàng Truyền Kỳ',
  time: '2021-04-24',
  path: 'https://ch01.tuandb.name.vn/Day.Bien_Live.-.Phuong.Hoang.Truyen.Ky.mp3',
  image: '/img/ch/Day.Bien_Live.-.Phuong.Hoang.Truyen.Ky.jpg'
},
{
  name: 'Chia Cậu Một Nửa (分你一半)',
  singer: 'Bất Thị Hoa Hỏa Nha',
  time: '2021-04-14',
  path: 'https://ch01.tuandb.name.vn/Chia.Cau.Mot.Nua.-.Bat.Thi.Hoa.Hoa.Nha.mp3',
  image: '/img/ch/Chia.Cau.Mot.Nua.-.Bat.Thi.Hoa.Hoa.Nha.jpg'
},
{
  name: 'Vũ Lạc (羽落)',
  singer: 'Tào Đồ Đồ',
  time: '2021-04-09',
  path: 'https://ch01.tuandb.name.vn/Vu.Lac.-.Tao.Do.Do.mp3',
  image: '/img/ch/Vu.Lac.-.Tao.Do.Do.jpg'
},
{
  name: 'Chậm Nhiệt (慢热)',
  singer: 'Bàn Hổ',
  time: '2021-04-07',
  path: 'https://ch01.tuandb.name.vn/Cham.Nhiet.-.Ban.Ho.mp3',
  image: '/img/ch/Cham.Nhiet.-.Ban.Ho.jpg'
},
{
  name: 'Lao Tới Sao Trời (奔赴星空)',
  singer: 'Doãn Tích Miên (尹昔眠)',
  time: '2021-04-06',
  path: 'https://ch01.tuandb.name.vn/Lao.Toi.Sao.Troi.-.Doan.Tich.Mien.mp3',
  image: '/img/ch/Lao.Toi.Sao.Troi.-.Doan.Tich.Mien.jpg'
},
{
  name: 'Lao Tới Sao Trời (奔赴星空) (DJ Thẩm Niệm Bản)',
  singer: 'Doãn Tích Miên (尹昔眠)',
  time: '2021-04-06',
  path: 'https://ch01.tuandb.name.vn/Lao.Toi.Sao.Troi_DJ.Tham.Niem.Ban-.Doan.Tich.Mien.mp3',
  image: '/img/ch/Lao.Toi.Sao.Troi.-.Doan.Tich.Mien.jpg'
},
{
  name: 'Uyên Ương Hải Đường (鸳鸯海棠)',
  singer: 'Trương Hiểu Hàm',
  time: '2021-04-06',
  path: 'https://ch01.tuandb.name.vn/Uyen.Uong.Hai.Duong.-.Truong.Hieu.Ham.mp3',
  image: '/img/ch/Uyen.Uong.Hai.Duong.-.Truong.Hieu.Ham.jpg'
},
{
  name: 'Hồng Mã (红马)',
  singer: 'Hứa Lam Tâm',
  time: '2021-04-05',
  path: 'https://ch01.tuandb.name.vn/Hong.Ma.-.Hua.Lam.Tam.mp3',
  image: '/img/ch/Hong.Ma.-.Hua.Lam.Tam.jpg'
},
{
  name: 'Chờ Gió Nổi (等风吹)',
  singer: 'Bất Thị Hoa Hỏa Nha;Tiểu Điền Âm Nhạc Xã',
  time: '2021-04-03',
  path: 'https://ch01.tuandb.name.vn/Cho.Gio.Noi.-.Bat.Thi.Hoa.Hoa.Nha_Tieu.Dien.Am.Nhac.Xa.mp3',
  image: '/img/ch/Cho.Gio.Noi.-.Bat.Thi.Hoa.Hoa.Nha_Tieu.Dien.Am.Nhac.Xa.jpg'
},
{
  name: 'Hiệp Tình Khách (侠客情)',
  singer: 'Âm Khuyết Thi Thính;Vương Tử Ngọc',
  time: '2021-04-02',
  path: 'https://ch01.tuandb.name.vn/Hiep.Tinh.Khach.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Hiep.Tinh.Khach.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Gió Lay Nhành Đào (风过谢桃花)',
  singer: 'Tư Nam;Tịch Âm Xã',
  time: '2021-04-02',
  path: 'https://ch01.tuandb.name.vn/Gio.Lay.Nhanh.Dao.-.Tu.Nam_Tich.Am.Xa.mp3',
  image: '/img/ch/Gio.Lay.Nhanh.Dao.-.Tu.Nam_Tich.Am.Xa.jpg'
},
{
  name: 'Thuyết Thư Khách (说书客)',
  singer: 'Mukyo Mộc Tây',
  time: '2021-03-31',
  path: 'https://ch01.tuandb.name.vn/Thuyet.Thu.Khach.-.Mukyo.Moc.Tay.mp3',
  image: '/img/ch/Thuyet.Thu.Khach.-.Mukyo.Moc.Tay.jpg'
},
{
  name: 'Giám Tình Sư (鉴情师)',
  singer: 'Bo Peep;Nhiên Dã Royal',
  time: '2021-03-30',
  path: 'https://ch01.tuandb.name.vn/Giam.Tinh.Su.-.Bo.Peep_Nhien.Da.Royal.mp3',
  image: '/img/ch/Giam.Tinh.Su.-.Bo.Peep_Nhien.Da.Royal.jpg'
},
{
  name: 'Đóa Hoa Tàn Phai (花败)',
  singer: 'Vượng Tử Tiểu Kiều',
  time: '2021-03-27',
  path: 'https://ch01.tuandb.name.vn/Doa.Hoa.Tan.Phai.-.Vuong.Tu.Tieu.Kieu.mp3',
  image: '/img/ch/Doa.Hoa.Tan.Phai.-.Vuong.Tu.Tieu.Kieu.jpg'
},
{
  name: 'Tương Tư Nan Tuyệt (相思难绝)',
  singer: 'Đại Thần Tuệ (大神慧)',
  time: '2021-03-27',
  path: 'https://ch01.tuandb.name.vn/Tuong.Tu.Nan.Tuyet.-.Dai.Than.Tue.mp3',
  image: '/img/ch/Tuong.Tu.Nan.Tuyet.-.Dai.Than.Tue.jpg'
},
{
  name: 'Khó Độ (难渡)',
  singer: 'Đẳng Thập Ma Quân',
  time: '2021-03-25',
  path: 'https://ch01.tuandb.name.vn/Kho.Do.-.Dang.Thap.Ma.Quan.mp3',
  image: '/img/ch/Kho.Do.-.Dang.Thap.Ma.Quan.jpg'
},
{
  name: 'Tu Hoa (羞花)',
  singer: 'Âm Khuyết Thi Thính;Vương Tử Ngọc',
  time: '2021-03-19',
  path: 'https://ch01.tuandb.name.vn/Tu.Hoa.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Tu.Hoa.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Ngày Thất Tịch Yêu Say Đắm (七月七爱恋)',
  singer: 'Tịch Âm Xã;Hóa Ra Là Củ Cải Nha',
  time: '2021-03-13',
  path: 'https://ch01.tuandb.name.vn/Ngay.That.Tich.Yeu.Say.Dam.-.Tich.Am.Xa_Hoa.Ra.La.Cu.Cai.Nha.mp3',
  image: '/img/ch/Ngay.That.Tich.Yeu.Say.Dam.-.Tich.Am.Xa_Hoa.Ra.La.Cu.Cai.Nha.jpg'
},
{
  name: 'Nếu Như (如果)',
  singer: 'Ba La Tái Đông;Bo Peep',
  time: '2021-03-12',
  path: 'https://ch01.tuandb.name.vn/Neu.Nhu.-.Ba.La.Tai.Dong_Bo.Peep.mp3',
  image: '/img/ch/Neu.Nhu.-.Ba.La.Tai.Dong_Bo.Peep.jpg'
},
{
  name: 'Mưa Lớn Vẫn Đang Rơi (大雨还在下)',
  singer: 'Một Quả Bóng',
  time: '2021-03-09',
  path: 'https://ch01.tuandb.name.vn/Mua.Lon.Van.Dang.Roi.-.Mot.Qua.Bong.mp3',
  image: '/img/ch/Mua.Lon.Van.Dang.Roi.-.Mot.Qua.Bong.jpg'
},
{
  name: 'Đại Hỉ (大喜)',
  singer: 'Âm Khuyết Thi Thính;Linh Diên Yousa',
  time: '2021-03-05',
  path: 'https://ch01.tuandb.name.vn/Dai.Hi.-.Am.Khuyet.Thi.Thinh_Linh.Dien.Yousa.mp3',
  image: '/img/ch/Dai.Hi.-.Am.Khuyet.Thi.Thinh_Linh.Dien.Yousa.jpg'
},
{
  name: 'Bá Hổ Thuyết (伯虎说)',
  singer: 'Nhất Khỏa Tiểu Thông;Trương Hiểu Hàm',
  time: '2021-03-02',
  path: 'https://ch01.tuandb.name.vn/Ba.Ho.Thuyet.-.Nhat.Khoa.Tieu.Thong_Truong.Hieu.Ham.mp3',
  image: '/img/ch/Ba.Ho.Thuyet.-.Nhat.Khoa.Tieu.Thong_Truong.Hieu.Ham.jpg'
},
{
  name: 'Hoàng Mai Hí (黄梅戏)',
  singer: 'Đại Thần Tuệ',
  time: '2021-02-28',
  path: 'https://ch01.tuandb.name.vn/Hoang.Mai.Hi.-.Dai.Than.Tue.mp3',
  image: '/img/ch/Hoang.Mai.Hi.-.Dai.Than.Tue.jpg'
},
{
  name: 'Vây Giữ (沦陷)',
  singer: 'Vương Tĩnh Văn Không Mập',
  time: '2021-02-26',
  path: 'https://ch01.tuandb.name.vn/Vay.Giu.-.Vuong.Tinh.Van.Khong.Map.mp3',
  image: '/img/ch/Vay.Giu.-.Vuong.Tinh.Van.Khong.Map.jpg'
},
{
  name: 'Bất Quy Nhạn (不归雁)',
  singer: 'Bàn Hổ',
  time: '2021-02-26',
  path: 'https://ch01.tuandb.name.vn/Bat.Quy.Nhan.-.Ban.Ho.mp3',
  image: '/img/ch/Bat.Quy.Nhan.-.Ban.Ho.jpg'
},
{
  name: 'Trường Nhai Vạn Tượng (长街万象)',
  singer: 'Trình Hưởng',
  time: '2021-02-23',
  path: 'https://ch01.tuandb.name.vn/Truong.Nhai.Van.Tuong.-.Trinh.Huong.mp3',
  image: '/img/ch/Truong.Nhai.Van.Tuong.-.Trinh.Huong.jpg'
},
{
  name: 'Cười Điên Cuồng (笑疯癫)',
  singer: 'Hoa Đồng',
  time: '2021-02-16',
  path: 'https://ch01.tuandb.name.vn/Cuoi.Dien.Cuong.-.Hoa.Dong.mp3',
  image: '/img/ch/Cuoi.Dien.Cuong.-.Hoa.Dong.jpg'
},
{
  name: 'Trạm Khí Tượng (气象站台)',
  singer: 'Uu',
  time: '2021-02-14',
  path: 'https://ch01.tuandb.name.vn/Tram.Khi.Tuong.-.Uu.mp3',
  image: '/img/ch/Tram.Khi.Tuong.-.Uu.jpg'
},
{
  name: 'Ta Tên Trường An, Ngươi Tên Cố Lý',
  singer: 'Doãn Tích Miên;Tiểu Điền Âm Nhạc Xã',
  time: '2021-02-08',
  path: 'https://ch01.tuandb.name.vn/Ta.Ten.Truong.An_.Nguoi.Ten.Co.Ly.-.Doan.Tich.Mien_Tieu.Dien.Am.Nhac.Xa.mp3',
  image: '/img/ch/Ta.Ten.Truong.An_.Nguoi.Ten.Co.Ly.-.Doan.Tich.Mien_Tieu.Dien.Am.Nhac.Xa.jpg'
},
{
  name: 'Hồng Mai Phi (红梅妃)',
  singer: 'Doãn Tích Miên;Tiểu Điền Âm Nhạc Xã',
  time: '2021-02-07',
  path: 'https://ch01.tuandb.name.vn/Hong.Mai.Phi.-.Doan.Tich.Mien_Tieu.Dien.Am.Nhac.Xa.mp3',
  image: '/img/ch/Hong.Mai.Phi.-.Doan.Tich.Mien_Tieu.Dien.Am.Nhac.Xa.jpg'
},
{
  name: 'Đừng Bỏ Lỡ (别错过)',
  singer: 'Trình Giai Giai',
  time: '2021-02-01',
  path: 'https://ch01.tuandb.name.vn/Dung.Bo.Lo.-.Trinh.Giai.Giai.mp3',
  image: '/img/ch/Dung.Bo.Lo.-.Trinh.Giai.Giai.jpg'
},
{
  name: 'Đừng Bỏ Lỡ (别错过) (DJ Bản)',
  singer: 'Trình Giai Giai',
  time: '2021-02-01',
  path: 'https://ch01.tuandb.name.vn/Dung.Bo.Lo._DJ.Ban.-.Trinh.Jiajia.mp3',
  image: '/img/ch/Dung.Bo.Lo.-.Trinh.Giai.Giai.jpg'
},
{
  name: 'Hoa Và Ngựa (花与马)',
  singer: 'Đại Tử',
  time: '2021-02-01',
  path: 'https://ch01.tuandb.name.vn/Hoa.Va.Ngua.-.Dai.Tu.mp3',
  image: '/img/ch/Hoa.Va.Ngua.-.Dai.Tu.jpg'
},
{
  name: 'Trong Sương Mù (雾里) (DJ Thẩm Niệm Bản)',
  singer: 'Diêu Lục Nhất',
  time: '2021-01-27',
  path: 'https://ch01.tuandb.name.vn/Trong.Suong.Mu._DJ.Tham.Niem.Ban.-.Dieu.Luc.Nhat.mp3',
  image: '/img/ch/Trong.Suong.Mu._DJ.Tham.Niem.Ban.-.Dieu.Luc.Nhat.jpg'
},
{
  name: 'TA',
  singer: 'Bất Thị Hoa Hỏa Nha',
  time: '2021-01-22',
  path: 'https://ch01.tuandb.name.vn/TA.-.Bat.Thi.Hoa.Hoa.Nha.mp3',
  image: '/img/ch/TA.-.Bat.Thi.Hoa.Hoa.Nha.jpg'
},
{
  name: 'Một Đường Sinh Hoa (一路生花)',
  singer: 'Ôn Dịch Tâm (温奕心)',
  time: '2021-01-19',
  path: 'https://ch01.tuandb.name.vn/Mot.Duong.Sinh.Hoa.-.On.Dich.Tam.mp3',
  image: '/img/ch/Mot.Duong.Sinh.Hoa.-.On.Dich.Tam.jpg'
},
{
  name: 'Bạch Nguyệt Quang Và Nốt Chu Sa',
  singer: 'Bàn Hổ',
  time: '2021-01-09',
  path: 'https://ch01.tuandb.name.vn/Bach.Nguyet.Quang.Va.Not.Chu.Sa.-.Ban.Ho.mp3',
  image: '/img/ch/Bach.Nguyet.Quang.Va.Not.Chu.Sa.-.Ban.Ho.jpg'
},
{
  name: 'Trời Tròn Đất Vuông (天圆地方)',
  singer: 'Đẳng Thập Ma Quân;Cố Cung',
  time: '2021-01-02',
  path: 'https://ch01.tuandb.name.vn/Troi.Tron.Dat.Vuong.-.Dang.Thap.Ma.Quan_Co.Cung.mp3',
  image: '/img/ch/Troi.Tron.Dat.Vuong.-.Dang.Thap.Ma.Quan_Co.Cung.jpg'
},
{
  name: 'Bạch Nguyệt Quang Và Nốt Chu Sa',
  singer: 'Đại Tử',
  time: '2021-01-01',
  path: 'https://ch01.tuandb.name.vn/Bach.Nguyet.Quang.Va.Not.Chu.Sa.-.Dai.Tu.mp3',
  image: '/img/ch/Bach.Nguyet.Quang.Va.Not.Chu.Sa.-.Dai.Tu.jpg'
},
{
  name: 'Thời Không Sai Lệch (错位时空)',
  singer: 'Ngải Thần',
  time: '2021-01-01',
  path: 'https://ch01.tuandb.name.vn/Thoi.Khong.Sai.Lech.-.Ngai.Than.mp3',
  image: '/img/ch/Thoi.Khong.Sai.Lech.-.Ngai.Than.jpg'
},
{//128
  name: 'Thành Cổ Tình Yêu (古城情) (DJ Thẩm Niệm Bản)',
  singer: 'Hứa Tiêu Nhi',
  time: '2020-12-28',
  path: 'https://ch01.tuandb.name.vn/Thanh.Co.Tinh.Yeu_DJ.Shen.Nian.Ban.-.Hua.Tieu.Nhi.mp3',
  image: '/img/ch/Thanh.Co.Tinh.Yeu_DJ.Shen.Nian.Ban.-.Hua.Tieu.Nhi.jpg'
},
{
  name: 'Comet',
  singer: 'Tạ Khả Dần',
  time: '2020-12-25',
  path: 'https://ch01.tuandb.name.vn/Comet.-.Ta.Kha.Dan.mp3',
  image: '/img/ch//Comet.-.Ta.Kha.Dan.jpg'
},
{
  name: 'Gió Nhỏ Thổi (风儿吹)',
  singer: 'Yếu Bất Yếu Mãi Thái',
  time: '2020-12-21',
  path: 'https://ch01.tuandb.name.vn/Gio.Nho.Thoi.-.Yeu.Bat.Yeu.Mai.Thai.mp3',
  image: '/img/ch/Gio.Nho.Thoi.-.Yeu.Bat.Yeu.Mai.Thai.jpg'
},
{
  name: 'Bốn Mùa Trao Anh (四季予你)',
  singer: 'Trình Hưởng',
  time: '2020-12-19',
  path: 'https://ch01.tuandb.name.vn/Bon.Mua.Trao.Anh.-.Trinh.Huong.mp3',
  image: '/img/ch/Bon.Mua.Trao.Anh.-.Trinh.Huong.jpg'
},
{
  name: 'Nam Sơn Tuyết (南山雪)',
  singer: 'Diệp Lý',
  time: '2020-12-11',
  path: 'https://ch01.tuandb.name.vn/Nam.Son.Tuyet.-.Diep.Ly.mp3',
  image: '/img/ch/Nam.Son.Tuyet.-.Diep.Ly.jpg'
},
{
  name: 'Là Kẻ Địch (为敌)',
  singer: 'Vượng Tử Tiểu Kiều',
  time: '2020-12-10',
  path: 'https://ch01.tuandb.name.vn/La.Ke.Dich.-.Vuong.Tu.Tieu.Kieu.mp3',
  image: '/img/ch/La.Ke.Dich.-.Vuong.Tu.Tieu.Kieu.jpg'
},
{
  name: 'Không Có Cách Nào Đẹp Bẩm Sinh',
  singer: 'Lê Lâm Thiêm Kiều',
  time: '2020-12-06',
  path: 'https://ch01.tuandb.name.vn/Khong.Co.Cach.Nao.Dep.Bam.Sinh.-.Le.Lam.Thiem.Kieu.mp3',
  image: '/img/ch/Khong.Co.Cach.Nao.Dep.Bam.Sinh.-.Le.Lam.Thiem.Kieu.jpg'
},
{
  name: 'Không Có Cách Nào Đẹp Bẩm Sinh (DJ Bản)',
  singer: 'Lê Lâm Thiêm Kiều',
  time: '2020-12-06',
  path: 'https://ch01.tuandb.name.vn/Khong.Co.Cach.Nao.Dep.Bam.Sinh._DJ.Ban.-.Le.Lam.Thiem.Kieu.mp3',
  image: '/img/ch/Khong.Co.Cach.Nao.Dep.Bam.Sinh.-.Le.Lam.Thiem.Kieu.jpg'
},
{
  name: 'Hỉ (囍) [Nữ Sinh Bản (女生版)',
  singer: 'Đẳng Thập Ma Quân',
  time: '2020-11-21',
  path: 'https://ch01.tuandb.name.vn/Hi.-.Dang.Thap.Ma.Quan.mp3',
  image: '/img/ch/Hi.-.Dang.Thap.Ma.Quan.jpg'
},
{//128
  name: 'Tinh Thần Người Lao Động | Dragostea Din Tei;May Ya Hi',
  singer: 'DJ抖音版',
  time: '2020-11-08',
  path: 'https://ch01.tuandb.name.vn/Tinh.Than.Nguoi.Lao.Dong.Remix.-.Dragostea.Din.Tei.X.May.Ya.Hi.-.DJ.Dou.Yin.Ban.mp3',
  image: '/img/ch/Tinh.Than.Nguoi.Lao.Dong.Remix.-.Dragostea.Din.Tei.X.May.Ya.Hi.-.DJ.Dou.Yin.Ban.jpg'
},
{
  name: 'Lãng Tử Nhàn Thoại (浪子闲话)',
  singer: 'Hoa Đồng',
  time: '2020-11-06',
  path: 'https://ch01.tuandb.name.vn/Lang.Tu.Nhan.Thoai.-.Hoa.Dong.mp3',
  image: '/img/ch/Lang.Tu.Nhan.Thoai.-.Hoa.Dong.jpg'
},
{
  name: 'Tự Chính Khang Viên (字正腔圆)',
  singer: 'Luân Tang;Trương Hiểu Hàm',
  time: '2020-11-06',
  path: 'https://ch01.tuandb.name.vn/Tu.Chinh.Khang.Vien.-.Luan.Tang_Truong.Hieu.Ham.mp3',
  image: '/img/ch/Tu.Chinh.Khang.Vien.-.Luan.Tang_Truong.Hieu.Ham.jpg'
},
{
  name: 'Thi Nhân Chớ Làm Hồng Nhan Say',
  singer: 'Đậu Bao',
  time: '2020-11-05',
  path: 'https://ch01.tuandb.name.vn/Thi.Nhan.Cho.Lam.Hong.Nhan.Say.-.Dau.Bao.mp3',
  image: '/img/ch/Thi.Nhan.Cho.Lam.Hong.Nhan.Say.-.Dau.Bao.jpg'
},
{
  name: 'Thủy Triều (潮汐)',
  singer: 'Phó Mộng Đồng',
  time: '2020-10-29',
  path: 'https://ch01.tuandb.name.vn/Thuy.Trieu.-.Pho.Mong.Dong.mp3',
  image: '/img/ch/Thuy.Trieu.-.Pho.Mong.Dong.jpg'
},
{
  name: 'Cô Nàng Mọng Nước (多肉少女)',
  singer: 'Triệu Chỉ Đồng',
  time: '2020-10-21',
  path: 'https://ch01.tuandb.name.vn/Co.Nang.Mong.Nuoc.-.Trieu.Chi.Dong.mp3',
  image: '/img/ch/Co.Nang.Mong.Nuoc.-.Trieu.Chi.Dong.jpg'
},
{
  name: 'Cô Nương Nấu Rượu (煮酒姑)',
  singer: 'Ngải Bắc',
  time: '2020-10-17',
  path: 'https://ch01.tuandb.name.vn/Co.Nuong.Nau.Ruou.-.Ngai.Bac.mp3',
  image: '/img/ch/Co.Nuong.Nau.Ruou.-.Ngai.Bac.jpg'
},
{
  name: 'Mỹ Nhân Họa Quyển (美人畫卷)',
  singer: 'Văn Nhân Thính Thư',
  time: '2020-10-13',
  path: 'https://ch01.tuandb.name.vn/My.Nhan.Hoa.Quyen.-.Van.Nhan.Thinh.Thu.mp3',
  image: '/img/ch/My.Nhan.Hoa.Quyen.-.Van.Nhan.Thinh.Thu.jpg'
},
{
  name: 'Lạc Trong Ảo Cảnh (迷失幻境) (DJ Bản)',
  singer: 'Vương Hân Thần;IN-K',
  time: '2020-09-27',
  path: 'https://ch01.tuandb.name.vn/Lac.Trong.Ao.Canh._DJ.Ban.-.IN-K.-.Vuong.Han.Than.mp3',
  image: '/img/ch/Lac.Trong.Ao.Canh._DJ.Ban.-.IN-K.-.Vuong.Han.Than.jpg'
},
{
  name: 'Người Tình Song Song (Parallel Love)',
  singer: 'Lưu Chí Giai',
  time: '2020-09-24',
  path: 'https://ch01.tuandb.name.vn/Nguoi.Tinh.Song.Song._Parallel.Love.-.Luu.Chi.Giai.mp3',
  image: '/img/ch/Nguoi.Tinh.Song.Song._Parallel.Love.-.Luu.Chi.Giai.jpg'
},
{
  name: 'Tiểu Đạo Đồng (小道童)',
  singer: 'Mạch Tiểu Đâu',
  time: '2020-09-19',
  path: 'https://ch01.tuandb.name.vn/Tieu.Dao.Dong.-.Mach.Tieu.Dau.mp3',
  image: '/img/ch/Tieu.Dao.Dong.-.Mach.Tieu.Dau.jpg'
},
{
  name: 'Tìm Tìm Kiếm Kiếm (寻寻觅觅)',
  singer: 'Khương Trầm Ngư (姜沉鱼)',
  time: '2020-09-14',
  path: 'https://ch01.tuandb.name.vn/Tim.Tim.Kiem.Kiem_xun.xunmi.mi.-.Khuong.Tram.Ngu_jiang.chen.yu.mp3',
  image: '/img/ch/Tim.Tim.Kiem.Kiem_xun.xunmi.mi.-.Khuong.Tram.Ngu_jiang.chen.yu.jpg'
},
{
  name: 'Vẽ Tranh Baby (画画的Baby)',
  singer: 'Nhược Nhược Chạy Tặc Mau',
  time: '2020-09-11',
  path: 'https://ch01.tuandb.name.vn/Hua.Hua.De.Baby.-.Ruo.Ruo.Pao.De.Zei.Kuai.mp3',
  image: '/img/ch/Hua.Hua.De.Baby.-.Ruo.Ruo.Pao.De.Zei.Kuai.jpg'
},
{
  name: 'Ngu Hề Thán (虞兮叹)',
  singer: 'Văn Nhân Thính Thư',
  time: '2020-08-27',
  path: 'https://ch01.tuandb.name.vn/Ngu.He.Than.-.Van.Nhan.Thinh.Thu.mp3',
  image: '/img/ch/Ngu.He.Than.-.Van.Nhan.Thinh.Thu.jpg'
},
{
  name: 'Tiếu Nạp (笑纳)',
  singer: 'Hoa Đồng',
  time: '2020-08-26',
  path: 'https://ch01.tuandb.name.vn/Tieu.Nap.-.Hoa.Dong.mp3',
  image: '/img/ch/Tieu.Nap.-.Hoa.Dong.jpg'
},
{
  name: 'Say Đắm Cả Thanh Xuân (沉醉的青丝)',
  singer: 'Lâm Bảo Hinh',
  time: '2020-08-15',
  path: 'https://ch01.tuandb.name.vn/Say.Dam.Ca.Thanh.Xuan.-.Lam.Bao.Hinh.mp3',
  image: '/img/ch/Say.Dam.Ca.Thanh.Xuan.-.Lam.Bao.Hinh.jpg'
},
{
  name: 'Yến Vô Hiết (燕无歇)',
  singer: 'Tưởng Tuyết Nhi',
  time: '2020-08-09',
  path: 'https://ch01.tuandb.name.vn/Yen.Vo.Hiet.-.Tuong.Tuyet.Nhi.mp3',
  image: '/img/ch/Yen.Vo.Hiet.-.Tuong.Tuyet.Nhi.jpg'
},
{
  name: 'Đào Hoa Tiếu (桃花笑)',
  singer: 'Uông Duệ',
  time: '2020-08-08',
  path: 'https://ch01.tuandb.name.vn/Dao.Hoa.Tieu.-.Uong.Due.mp3',
  image: '/img/ch/Dao.Hoa.Tieu.-.Uong.Due.jpg'
},
{
  name: 'Ở Đây Không Có Hai Trăm Lượng Bạc',
  singer: 'Ma Tước Âm Nhạc Nhân',
  time: '2020-07-31',
  path: 'https://ch01.tuandb.name.vn/O.Day.Khong.Co.Hai.Tram.Luong.Bac.-.Ma.Tuoc.Am.Nhac.Nhan.mp3',
  image: '/img/ch/O.Day.Khong.Co.Hai.Tram.Luong.Bac.-.Ma.Tuoc.Am.Nhac.Nhan.jpg'
},
{
  name: 'Ngủ Ngon Ngủ Ngon (晚安晚安)',
  singer: 'Tiểu Tam Kim ',
  time: '2020-07-21',
  path: 'https://ch01.tuandb.name.vn/Ngu.Ngon.Ngu.Ngon.-.Tieu.Tam.Kim.mp3',
  image: '/img/ch/Ngu.Ngon.Ngu.Ngon.-.Tieu.Tam.Kim.jpg'
},
{
  name: 'Vong Xuyên Bỉ Ngạn (DJ Danh Long Bản)',
  singer: 'Linh Nhất Cửu Linh Nhị',
  time: '2020-07-15',
  path: 'https://ch01.tuandb.name.vn/Vong.Xuyen.Bi.Ngan_DJ.Danh.Long.Ban.-.Linh.Nhat.Cuu.Linh.Nhi.mp3',
  image: '/img/ch/Vong.Xuyen.Bi.Ngan.-.Linh.Nhat.Cuu.Linh.Nhi.jpg'
},
{
  name: 'Swagger',
  singer: 'Quyển Muội;Oánh Tương',
  time: '2020-07-10',
  path: 'https://ch01.tuandb.name.vn/Swagger.-.Quyen.Muoi_Oanh.Tuong.mp3',
  image: '/img/ch/Swagger.-.Quyen.Muoi_Oanh.Tuong.jpg'
},
{
  name: 'Yêu, Tồn Tại (爱，存在)',
  singer: 'Lư Lư Mau Im Lặng',
  time: '2020-07-06',
  path: 'https://ch01.tuandb.name.vn/Yeu_.Ton.Tai.-.Lu.Lu.Mau.Im.Lang.mp3',
  image: '/img/ch/Yeu_.Ton.Tai.-.Lu.Lu.Mau.Im.Lang.jpg'
},
{
  name: 'Âm Thanh Của Nỗi Nhớ Anh (是想你的声音啊)',
  singer: 'Ngạo Thất Gia',
  time: '2020-07-05',
  path: 'https://ch01.tuandb.name.vn/Am.Thanh.Cua.Noi.Nho.Anh.-.Ngao.That.Gia.mp3',
  image: '/img/ch/Am.Thanh.Cua.Noi.Nho.Anh.-.Ngao.That.Gia.jpg'
},
{
  name: 'Follow',
  singer: 'Lê Đống Khẩn;Wiz_H Trương Tử Hào',
  time: '2020-06-20',
  path: 'https://ch01.tuandb.name.vn/Follow.-.Le.Dong.Khan_Wiz_H.Truong.Tu.Hao.mp3',
  image: '/img/ch/Follow.-.Le.Dong.Khan_Wiz_H.Truong.Tu.Hao.jpg'
},
{
  name: 'Điệu Cha Cha Tình Yêu (爱的恰恰)',
  singer: 'Bảo Thạch Gem;Kozay;Evis Wy',
  time: '2020-06-19',
  path: 'https://ch01.tuandb.name.vn/Dieu.Cha.Cha.Tinh.Yeu.-.Bao.Thach.Gem_Kozay_Evis.Wy.mp3',
  image: '/img/ch/Dieu.Cha.Cha.Tinh.Yeu.-.Bao.Thach.Gem_Kozay_Evis.Wy.jpg'
},
{
  name: 'Cách Ngạn (隔岸)',
  singer: 'Diêu Lục Nhất',
  time: '2020-06-18',
  path: 'https://ch01.tuandb.name.vn/Cach.Ngan.-.Dieu.Luc.Nhat.mp3',
  image: '/img/ch/Cach.Ngan.-.Dieu.Luc.Nhat.jpg'
},
{
  name: 'Nói Chuyện Yêu Đương (谈恋爱)',
  singer: 'Vương Thất Thất;Lê Tử',
  time: '2020-06-16',
  path: 'https://ch01.tuandb.name.vn/Noi.Chuyen.Yeu.Duong.-.Vuong.That.That_Le.Tu.mp3',
  image: '/img/ch/Noi.Chuyen.Yeu.Duong.-.Vuong.That.That_Le.Tu.jpg'
},
{
  name: 'Tiếu Khán (笑看)',
  singer: 'Đẳng Thập Ma Quân',
  time: '2020-06-13',
  path: 'https://ch01.tuandb.name.vn/Tieu.Khan.-.Dang.Thap.Ma.Quan.mp3',
  image: '/img/ch/Tieu.Khan.-.Dang.Thap.Ma.Quan.jpg'
},
{
  name: 'Tuyệt Thế Vũ Cơ (绝世舞姬)',
  singer: 'Trương Hiểu Hàm;Thích Kỳ',
  time: '2020-05-30',
  path: 'https://ch01.tuandb.name.vn/Tuyet.The.Vu.Co.-.Nhat.Khoa.Tieu.Thong_Truong.Hieu.Ham_Thich.Ky.mp3',
  image: '/img/ch/Tuyet.The.Vu.Co.-.Nhat.Khoa.Tieu.Thong_Truong.Hieu.Ham_Thich.Ky.jpg'
},
{
  name: 'Mặn Mặn Ngọt Ngọt (甜甜咸咸)',
  singer: 'Triệu Chỉ Đồng',
  time: '2020-05-26',
  path: 'https://ch01.tuandb.name.vn/Man.Man.Ngot.Ngot.-.Trieu.Chi.Dong.mp3',
  image: '/img/ch/Man.Man.Ngot.Ngot.-.Trieu.Chi.Dong.jpg'
},
{
  name: 'Phá Kén (破茧)',
  singer: 'Trương Thiều Hàm (张韶涵)',
  time: '2020-05-23',
  path: 'https://ch01.tuandb.name.vn/Pha.Ken.-.Truong.Thieu.Ham.mp3',
  image: '/img/ch/Pha.Ken.-.Truong.Thieu.Ham.jpg'
},
{
  name: 'Vạn Vật Hấp Dẫn (万有引力)',
  singer: 'F*yy',
  time: '2020-05-13',
  path: 'https://ch01.tuandb.name.vn/Van.Vat.Hap.Dan.-.F_yy.mp3',
  image: '/img/ch/Van.Vat.Hap.Dan.-.F_yy.jpg'
},
{
  name: 'Minimanimo',
  singer: 'Phùng Đề Mạc;Haee;Advanced',
  time: '2020-05-07',
  path: 'https://ch01.tuandb.name.vn/Minimanimo.-.Phung.De.Mac_Haee_Advanced.mp3',
  image: '/img/ch/Minimanimo.-.Phung.De.Mac_Haee_Advanced.jpg'
},
{
  name: 'Nước Trái Cây Chia Em Một Nửa',
  singer: 'Pikachu Đa Đa',
  time: '2020-04-13',
  path: 'https://ch01.tuandb.name.vn/Nuoc.Trai.Cay.Chia.Em.Mot.Nua.-.Pikachu.Da.Da.mp3',
  image: '/img/ch/Nuoc.Trai.Cay.Chia.Em.Mot.Nua.-.Pikachu.Da.Da.jpg'
},
{
  name: 'Tửu Quán Nhi (酒馆儿)',
  singer: 'Đản Hoàng',
  time: '2020-04-10',
  path: 'https://ch01.tuandb.name.vn/Tuu.Quan.Nhi.-.Dan.Hoang.mp3',
  image: '/img/ch/Tuu.Quan.Nhi.-.Dan.Hoang.jpg'
},
{//128
  name: 'Bye Bye (拜拜)',
  singer: 'Si Tiếu;Yến Trấm',
  time: '2020-04-08',
  path: 'https://ch01.tuandb.name.vn/Bye.Bye.-.Si.Tieu_Yen.Tram.mp3',
  image: '/img/ch/Bye.Bye.-.Si.Tieu_Yen.Tram.jpg'
},
{
  name: 'Sau Này Khi Gặp Được Anh Ấy (后来遇见他)',
  singer: 'Hồ 66',
  time: '2020-03-20',
  path: 'https://ch01.tuandb.name.vn/Sau.Nay.Khi.Gap.Duoc.Anh.Ay.-.Ho.66.mp3',
  image: '/img/ch/Sau.Nay.Khi.Gap.Duoc.Anh.Ay.-.Ho.66.jpg'
},
{//128
  name: 'Vết Thương Đẹp Nhất (最美的傷口)',
  singer: 'Mao Quai Quai',
  time: '2020-03-05',
  path: 'https://ch01.tuandb.name.vn/Vet.Thuong.Dep.Nhat.-.Mao.Quai.Quai.mp3',
  image: '/img/ch/Vet.Thuong.Dep.Nhat.-.Mao.Quai.Quai.jpg'
},
{
  name: 'Tình Ca Ngọt Ngào Nhất (最甜情歌)',
  singer: 'Nhất Mân',
  time: '2020-03-03',
  path: 'https://ch01.tuandb.name.vn/Tinh.Ca.Ngot.Ngao.Nhat.-.Nhat.Man.mp3',
  image: '/img/ch/Tinh.Ca.Ngot.Ngao.Nhat.-.Nhat.Man.jpg'
},
{
  name: 'Em Yêu Anh (我爱你)',
  singer: 'Trình Giai Giai',
  time: '2020-02-18',
  path: 'https://ch01.tuandb.name.vn/Em.Yeu.Anh.-.Trinh.Giai.Giai.mp3',
  image: '/img/ch/Em.Yeu.Anh.-.Trinh.Giai.Giai.jpg'
},
{//128
  name: 'Tình Ca Dành Cho Tuổi Teen Nghe',
  singer: 'Yabi',
  time: '2020-02-13',
  path: 'https://ch01.tuandb.name.vn/Tinh.Ca.Danh.Cho.Tuoi.Teen.Nghe.-.Yabi.mp3',
  image: '/img/ch/Tinh.Ca.Danh.Cho.Tuoi.Teen.Nghe.-.Yabi.jpg'
},
{
  name: 'Trích Tiên (谪仙)',
  singer: 'Y Cách Tái Thính;Diệp Lý',
  time: '2020-02-08',
  path: 'https://ch01.tuandb.name.vn/Trich.Tien.-.Y.Cach.Tai.Thinh_Diep.Ly.mp3',
  image: '/img/ch/Trich.Tien.-.Y.Cach.Tai.Thinh_Diep.Ly.jpg'
},
{
  name: 'Nghiện Thức Khuya (熬夜上瘾)',
  singer: 'Lưu Diệc Tâm',
  time: '2020-01-18',
  path: 'https://ch01.tuandb.name.vn/Nghien.Thuc.Khuya.-.Luu.Diec.Tam.mp3',
  image: '/img/ch/Nghien.Thuc.Khuya.-.Luu.Diec.Tam.jpg'
},
{
  name: 'Tình Ca Dành Cho Tuổi Teen Nghe',
  singer: 'AY Dương Lão Tam',
  time: '2020-01-10',
  path: 'https://ch01.tuandb.name.vn/Tinh.Ca.Danh.Cho.Tuoi.Teen.Nghe.-.AY.Duong.Lao.Tam.mp3',
  image: '/img/ch/Tinh.Ca.Danh.Cho.Tuoi.Teen.Nghe.-.AY.Duong.Lao.Tam.jpg'
},
{
  name: 'Tiểu Hàn (小寒)',
  singer: 'Âm Khuyết Thi Thính;Triệu Phương Tịnh',
  time: '2020-01-06',
  path: 'https://ch01.tuandb.name.vn/Tieu.Han.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Tieu.Han.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Xuân Phân (春分)',
  singer: 'Âm Khuyết Thi Thính;Vương Tử Ngọc',
  time: '2019-12-28',
  path: 'https://ch01.tuandb.name.vn/Xuan.Phan.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Xuan.Phan.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Một Người Rất Tốt (一个人挺好)',
  singer: 'Mạnh Dĩnh',
  time: '2019-12-24',
  path: 'https://ch01.tuandb.name.vn/Mot.Nguoi.Rat.Tot.-.Manh.Dinh.mp3',
  image: '/img/ch/Mot.Nguoi.Rat.Tot.-.Manh.Dinh.jpg'
},
{
  name: 'Hạ Sơn (下山)',
  singer: 'Đẳng Thập Ma Quân',
  time: '2019-12-21',
  path: 'https://ch01.tuandb.name.vn/Ha.Son.-.Dang.Thap.Ma.Quan.mp3',
  image: '/img/ch/Ha.Son.-.Dang.Thap.Ma.Quan.jpg'
},
{
  name: 'Hạ Sơn (下山)',
  singer: 'Mạch Tiểu Đâu',
  time: '2019-12-10',
  path: 'https://ch01.tuandb.name.vn/Ha.Son.-.Mach.Tieu.Dau.mp3',
  image: '/img/ch/Ha.Son.-.Mach.Tieu.Dau.jpg'
},
{
  name: 'Đêm Tỏ Tình (告白之夜)',
  singer: 'Dụ Ngôn Gia',
  time: '2019-11-18',
  path: 'https://ch01.tuandb.name.vn/Dem.To.Tinh.-.Du.Ngon.Gia.mp3',
  image: '/img/ch/Dem.To.Tinh.-.Du.Ngon.Gia.jpg'
},
{
  name: 'Thiếu Niên (少年)',
  singer: 'Mộng Nhiên',
  time: '2019-11-14',
  path: 'https://ch01.tuandb.name.vn/Thieu.Nien.-.Mong.Nhien.mp3',
  image: '/img/ch/Thieu.Nien.-.Mong.Nhien.jpg'
},
{//128
  name: 'Đáp Án Của Bạn (你的答案) Remix',
  singer: 'A nhũng;DJOs Đạn Đông Cổ',
  time: '2019-11-01',
  path: 'https://ch01.tuandb.name.vn/Dap.An.Cua.Ban.Remix.-.A.Rong_DJOs.Dan.Dong.Gu.mp3',
  image: '/img/ch/Dap.An.Cua.Ban.Remix.-.A.Rong_DJOs.Dan.Dong.Gu.jpg'
},
{
  name: 'Lên Núi Hái Trà (上山采茶)',
  singer: 'Tam Đồng Thất Điều;Chu Tịnh Tịch JING',
  time: '2019-10-24',
  path: 'https://ch01.tuandb.name.vn/Len.Nui.Hai.Tra.-.Tam.Dong.That.Dieu_Chu.Tinh.Tich.JING.mp3',
  image: '/img/ch/Len.Nui.Hai.Tra.-.Tam.Dong.That.Dieu_Chu.Tinh.Tich.JING.jpg'
},
{
  name: 'Câu Chuyện Nếu Như (如果的事)',
  singer: 'Superluckyqi',
  time: '2019-10-19',
  path: 'https://ch01.tuandb.name.vn/Cau.Chuyen.Neu.Nhu.-.Superluckyqi.mp3',
  image: '/img/ch/Cau.Chuyen.Neu.Nhu.-.Superluckyqi.jpg'
},
{
  name: 'Đại Điền Hậu Sinh Tử  (大田後生仔)',
  singer: 'Nha Đản Đản',
  time: '2019-10-14',
  path: 'https://ch01.tuandb.name.vn/Dai.Dien.Hau.Sinh.Tu.-.Nha.Dan.Dan.mp3',
  image: '/img/ch/Dai.Dien.Hau.Sinh.Tu.-.Nha.Dan.Dan.jpg'
},
{//128
  name: 'Tình Yêu Trên Tik Tok (抖音爱)',
  singer: 'Chia Anh Làm Một Phần Hai Thịt',
  time: '2019-10-07',
  path: 'https://ch01.tuandb.name.vn/Tinh.Yeu.Tren.Tik.Tok.-.Chia.Anh.Lam.Mot.Phan.Hai.Thit.mp3',
  image: '/img/ch/Tinh.Yeu.Tren.Tik.Tok.-.Chia.Anh.Lam.Mot.Phan.Hai.Thit.jpg'
},
{
  name: 'Mang Chủng (芒种)',
  singer: '嘿人李逵Noisemakers;Âm Khuyết Thi Thính;Triệu Phương Tịnh',
  time: '2019-09-29',
  path: 'https://ch01.tuandb.name.vn/Mang.Chung.-.Hei.Ren.LikuiNoisemakers_Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Mang.Chung.-.Hei.Ren.LikuiNoisemakers_Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Phía Ngoài Bầu Trời (天空之外)',
  singer: 'Huyền Tử',
  time: '2019-09-16',
  path: 'https://ch01.tuandb.name.vn/Phia.Ngoai.Bau.Troi.-.Huyen.Tu.mp3',
  image: '/img/ch/Phia.Ngoai.Bau.Troi.-.Huyen.Tu.jpg'
},
{
  name: 'Bạch Lộ (白露)',
  singer: 'Âm Khuyết Thi Thính;Vương Tử Ngọc',
  time: '2019-09-08',
  path: 'https://ch01.tuandb.name.vn/Bach.Lo.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Bach.Lo.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Sương Lạnh (寒露)',
  singer: 'Âm Khuyết Thi Thính;Triệu Phương Tịnh',
  time: '2019-09-08',
  path: 'https://ch01.tuandb.name.vn/Suong.Lanh.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Suong.Lanh.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Xử Thử (处暑)',
  singer: 'Âm Khuyết Thi Thính;Vương Tử Ngọc',
  time: '2019-08-23',
  path: 'https://ch01.tuandb.name.vn/Xu.Thu.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Xu.Thu.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Mộ Hạ (慕夏)',
  singer: 'Đẳng Thập Ma Quân',
  time: '2019-08-03',
  path: 'https://ch01.tuandb.name.vn/Mo.Ha.-.Dang.Thap.Ma.Quan.mp3',
  image: '/img/ch/Mo.Ha.-.Dang.Thap.Ma.Quan.jpg'
},
{
  name: 'Đại Thử (大暑)',
  singer: 'Âm Khuyết Thi Thính;Lý Giai Tư',
  time: '2019-07-23',
  path: 'https://ch01.tuandb.name.vn/Dai.Thu.-.Am.Khuyet.Thi.Thinh_Ly.Giai.Tu.mp3',
  image: '/img/ch/Dai.Thu.-.Am.Khuyet.Thi.Thinh_Ly.Giai.Tu.jpg'
},
{
  name: 'Tiểu Thử (小暑)',
  singer: 'Âm Khuyết Thi Thính;Triệu Phương Tịnh',
  time: '2019-07-07',
  path: 'https://ch01.tuandb.name.vn/Tieu.Thu.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Tieu.Thu.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Nhiệt Tâm 105°C Của Cậu (热爱105°C的你)',
  singer: 'A Tứ',
  time: '2019-07-04',
  path: 'https://ch01.tuandb.name.vn/Nhiet.Tam.105_C.Cua.Cau.-.A.Tu.mp3',
  image: '/img/ch/Nhiet.Tam.105_C.Cua.Cau.-.A.Tu.jpg'
},
{
  name: 'Giữ Chặt Cậu (圈住你)',
  singer: 'Nhất Khẩu Điềm',
  time: '2019-06-12',
  path: 'https://ch01.tuandb.name.vn/Giu.Chat.Cau.-.Nhat.Khau.Diem.mp3',
  image: '/img/ch/Giu.Chat.Cau.-.Nhat.Khau.Diem.jpg'
},
{
  name: 'Mang Chủng (芒种)',
  singer: 'Âm Khuyết Thi Thính;Triệu Phương Tịnh',
  time: '2019-06-06',
  path: 'https://ch01.tuandb.name.vn/Mang.Chung.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Mang.Chung.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Chuyến Bay Thao Thức (失眠飞行)',
  singer: 'Tiếp Cá Vẫn;Khai Nhất Thương;Thẩm Dĩ Thành;Tiết Minh Viện',
  time: '2019-05-19',
  path: 'https://ch01.tuandb.name.vn/Chuyen.Bay.Thao.Thuc.-.Tiep.Ca.Van_Khai.Nhat.Thuong_Tham.Di.Thanh_Tiet.Minh.Vien.mp3',
  image: '/img/ch/Chuyen.Bay.Thao.Thuc.-.Tiep.Ca.Van_Khai.Nhat.Thuong_Tham.Di.Thanh_Tiet.Minh.Vien.jpg'
},
{
  name: 'Yêu Anh 3000 Lần (爱你三千遍)',
  singer: 'Đặng Thiên Vũ',
  time: '2019-05-07',
  path: 'https://ch01.tuandb.name.vn/Yeu.Anh.3000.Lan.-.Dang.Thien.Vu.mp3',
  image: '/img/ch/Yeu.Anh.3000.Lan.-.Dang.Thien.Vu.jpg'
},
{
  name: 'Quảng Hàn Cung (广寒宫)',
  singer: 'Hoàn Tử U',
  time: '2019-04-30',
  path: 'https://ch01.tuandb.name.vn/Quang.Han.Cung.-.Hoan.Tu.U.mp3',
  image: '/img/ch/Quang.Han.Cung.-.Hoan.Tu.U.jpg'
},
{
  name: 'Anh Mỉm Cười Trông Thật Là Đẹp',
  singer: 'Lý Hân Dung;Phan Đồng Chu;Lý Khải Điều',
  time: '2019-04-24',
  path: 'https://ch01.tuandb.name.vn/Anh.Mim.Cuoi.Trong.That.La.Dep.-.Ly.Han.Dung_Phan.Dong.Chu_Ly.Khai.Dieu.mp3',
  image: '/img/ch/Anh.Mim.Cuoi.Trong.That.La.Dep.-.Ly.Han.Dung_Phan.Dong.Chu_Ly.Khai.Dieu.jpg'
},
{
  name: 'Tâm Lặng Như Nước (心如止水)',
  singer: 'Vu Tình',
  time: '2019-04-23',
  path: 'https://ch01.tuandb.name.vn/Tam.Lang.Nhu.Nuoc.-.Vu.Tinh.mp3',
  image: '/img/ch/Tam.Lang.Nhu.Nuoc.-.Vu.Tinh.jpg'
},
{
  name: 'Cốc Vũ (谷雨)',
  singer: 'Âm Khuyết Thi Thính;Triệu Phương Tịnh',
  time: '2019-04-20',
  path: 'https://ch01.tuandb.name.vn/Coc.Vu.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Coc.Vu.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Độ Ta Không Độ Nàng (渡我不渡她)',
  singer: 'A Hạ (阿夏);Uy Tử (威仔)',
  time: '2019-04-02',
  path: 'https://ch01.tuandb.name.vn/Do.Ta.Khong.Do.Nang.-.A.Ha_Uy.Tu.mp3',
  image: '/img/ch/Do.Ta.Khong.Do.Nang.-.A.Ha_Uy.Tu.jpg'
},
{
  name: 'Đào Hoa Am (桃花庵)',
  singer: 'Âm Khuyết Thi Thính;Phong Trà Quýnh Khuẩn',
  time: '2019-03-30',
  path: 'https://ch01.tuandb.name.vn/Dao.Hoa.Am.-.Am.Khuyet.Thi.Thinh_Phong.Tra.Quynh.Khuan.mp3',
  image: '/img/ch/Dao.Hoa.Am.-.Am.Khuyet.Thi.Thinh_Phong.Tra.Quynh.Khuan.jpg'
},
{
  name: 'Em Bằng Lòng Làm Một Người Bình Thường Ở Bên Cạnh Anh',
  singer: 'Vương Thất Thất',
  time: '2019-03-13',
  path: 'https://ch01.tuandb.name.vn/Em.Bang.Long.Lam.Mot.Nguoi.Binh.Thuong.O.Ben.Canh.Anh.-.Vuong.That.That.mp3',
  image: '/img/ch/Em.Bang.Long.Lam.Mot.Nguoi.Binh.Thuong.O.Ben.Canh.Anh.-.Vuong.That.That.jpg'
},
{
  name: 'Một khúc tương tư (一曲相思)',
  singer: 'Á Du Du',
  time: '2019-03-07',
  path: 'https://ch01.tuandb.name.vn/Mot.Khuc.Tuong.Tu.-.A.Du.Du.mp3',
  image: '/img/ch/Mot.Khuc.Tuong.Tu.-.A.Du.Du.jpg'
},
{//128
  name: 'Độ ta không độ nàng (渡我不渡她)',
  singer: 'Doanh Tuyền',
  time: '2019-01-18',
  path: 'https://ch01.tuandb.name.vn/Do.Ta.Khong.Do.Nang.-.Doanh.Tuyen.mp3',
  image: '/img/ch/Do.Ta.Khong.Do.Nang.-.Doanh.Tuyen.jpg'
},
{
  name: 'Dạ Yến Phong Ba (夜宴风波)',
  singer: 'Âm Khuyết Thi Thính;Vương Tử Ngọc',
  time: '2018-12-15',
  path: 'https://ch01.tuandb.name.vn/Da.Yen.Phong.Ba.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Da.Yen.Phong.Ba.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Tiểu Bạch Thỏ Gặp Cappuccino',
  singer: 'Thố Tử Nha',
  time: '2018-11-15',
  path: 'https://ch01.tuandb.name.vn/Tieu.Bach.Tho.Gap.Cappuccino.-.Tho.Tu.Nha.mp3',
  image: '/img/ch/Tieu.Bach.Tho.Gap.Cappuccino.-.Tho.Tu.Nha.jpg'
},
{
  name: 'Sương Giáng (霜降)',
  singer: 'Âm Khuyết Thi Thính;Triệu Phương Tịnh',
  time: '2018-10-23',
  path: 'https://ch01.tuandb.name.vn/Suong.Giang.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.mp3',
  image: '/img/ch/Suong.Giang.-.Am.Khuyet.Thi.Thinh_Trieu.Phuong.Tinh.jpg'
},
{
  name: 'Xuất Sơn (出山)',
  singer: 'Hoa Chúc;Vương Thắng Nam',
  time: '2018-09-28',
  path: 'https://ch01.tuandb.name.vn/Xuat.Son.-.Hoa.Chuc_Vuong.Thang.Nam.mp3',
  image: '/img/ch/Xuat.Son.-.Hoa.Chuc_Vuong.Thang.Nam.jpg'
},
{//128
  name: 'Xích Linh (赤伶) (DJ Danh Long Bản)',
  singer: 'Đẳng Thập Ma Quân',
  time: '2018-09-27',
  path: 'https://ch01.tuandb.name.vn/Xich.Linh_DJ.Danh.Long.Ban.-.Dang.Thap.Ma.Quan.mp3',
  image: '/img/ch/Xich.Linh_DJ.Danh.Long.Ban.-.Dang.Thap.Ma.Quan.jpg'
},
{//128
  name: 'Yêu Thích Của Thế Giới (全世界最喜歡)',
  singer: 'Hà Mạn Đình',
  time: '2018-09-12',
  path: 'https://ch01.tuandb.name.vn/Yeu.Thich.Cua.The.Gioi.-.Ha.Man.Dinh.mp3',
  image: '/img/ch/Yeu.Thich.Cua.The.Gioi.-.Ha.Man.Dinh.jpg'
},
{
  name: 'Siêu Thích Anh Luôn (我超喜欢你)',
  singer: 'Âu Dương Đoá',
  time: '2018-09-01',
  path: 'https://ch01.tuandb.name.vn/Sieu.Thich.Anh.Luon.-.Au.Duong.Doa.mp3',
  image: '/img/ch/Sieu.Thich.Anh.Luon.-.Au.Duong.Doa.jpg'
},
{
  name: 'Kinh Trập (惊蛰)',
  singer: 'Âm Khuyết Thi Thính;Vương Tử Ngọc',
  time: '2018-06-16',
  path: 'https://ch01.tuandb.name.vn/Kinh.Trap.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.mp3',
  image: '/img/ch/Kinh.Trap.-.Am.Khuyet.Thi.Thinh_Vuong.Tu.Ngoc.jpg'
},
{
  name: 'Vừa Hợp Với Anh (对你刚刚好)',
  singer: 'Lý Ha Ha (李哈哈)',
  time: '2018-06-14',
  path: 'https://ch01.tuandb.name.vn/Vua.Hop.Voi.Anh.-.Ly.Ha.Ha.mp3',
  image: '/img/ch/Vua.Hop.Voi.Anh.-.Ly.Ha.Ha.jpg'
},
{
  name: 'Mau Nói Yêu Em (快说你爱我)',
  singer: 'Tân Lạc Trần Phù;Hạ Tử Linh',
  time: '2018-06-10',
  path: 'https://ch01.tuandb.name.vn/Mau.Noi.Yeu.Em.-.Tan.Lac.Tran.Phu_Ha.Tu.Linh.mp3',
  image: '/img/ch/Mau.Noi.Yeu.Em.-.Tan.Lac.Tran.Phu_Ha.Tu.Linh.jpg'
},
{
  name: 'Tam Thiên Tuyết (三千雪)',
  singer: 'Đô Bỉ Dubi',
  time: '2018-04-20',
  path: 'https://ch01.tuandb.name.vn/Tam.Thien.Tuyet.-.Do.Bi.Dubi.mp3',
  image: '/img/ch/Tam.Thien.Tuyet.-.Do.Bi.Dubi.jpg'
},
{
  name: 'Tay Trái Chỉ Trăng (左手指月)',
  singer: 'Tát Đỉnh Đỉnh',
  time: '2018-03-19',
  path: 'https://ch01.tuandb.name.vn/Tay.Trai.Chi.Trang.-.Tat.Dinh.Dinh.mp3',
  image: '/img/ch/Tay.Trai.Chi.Trang.-.Tat.Dinh.Dinh.jpg'
},
{
  name: 'Bệnh Biến (BINGBIAN (病变))',
  singer: 'Cúc Văn Nhàn (女声版)',
  time: '2018-01-27',
  path: 'https://ch01.tuandb.name.vn/Benh.Bien_BINGBIAN.-.Cuc.Van.Nhan.mp3',
  image: '/img/ch/Benh.Bien_BINGBIAN.-.Cuc.Van.Nhan.jpg'
},
{
  name: 'Phi Tù (非酋)',
  singer: 'Tiết Minh Viện',
  time: '2017-12-27',
  path: 'https://ch01.tuandb.name.vn/Phi.Tu.-.Tiet.Minh.Vien.mp3',
  image: '/img/ch/Phi.Tu.-.Tiet.Minh.Vien.jpg'
},
{//128
  name: 'Công Chúa Nhỏ (小公主)',
  singer: 'Tưởng Tưởng;Dương Thanh Ninh',
  time: '2017-12-14',
  path: 'https://ch01.tuandb.name.vn/Cong.Chua.Nho.-.Tuong.Tuong_Duong.Thanh.Ninh.mp3',
  image: '/img/ch/Cong.Chua.Nho.-.Tuong.Tuong_Duong.Thanh.Ninh.jpg'
},
{
  name: 'Sao Trời Tháng Tư (繁星四月)',
  singer: 'Thố Tử Nha',
  time: '2017-01-29',
  path: 'https://ch01.tuandb.name.vn/Sao.Troi.Thang.Tu.-.Tho.Tu.Nha.mp3',
  image: '/img/ch/Sao.Troi.Thang.Tu.-.Tho.Tu.Nha.jpg'
},
{
  name: 'Hồng Chiêu Nguyện (红昭愿)',
  singer: 'Âm Khuyết Thi Thính',
  time: '2017-01-18',
  path: 'https://ch01.tuandb.name.vn/Hong.Chieu.Nguyen.-.Am.Khuyet.Thi.Thinh.mp3',
  image: '/img/ch/Hong.Chieu.Nguyen.-.Am.Khuyet.Thi.Thinh.jpg'
},
{//128
  name: 'Hoắc Nguyên Giáp (霍元甲)',
  singer: 'Ngôn Hòa;Nhạc Chính Lăng;Lạc Thiên Y',
  time: '2016-02-01',
  path: 'https://ch01.tuandb.name.vn/Hoac.Nguyen.Giap.-.Ngon.Hoa_Nhac.Chinh.Lang_Lac.Thien.Y.mp3',
  image: '/img/ch/Hoac.Nguyen.Giap.-.Ngon.Hoa_Nhac.Chinh.Lang_Lac.Thien.Y.jpg'
},
{
  name: 'Khiên Ti Hí (牵丝戏)',
  singer: 'Ngân Lâm;Aki A Kiệt',
  time: '2015-01-01',
  path: 'https://ch01.tuandb.name.vn/Khien.Ti.Hi.-.Ngan.Lam_Aki.A.Kiet.mp3',
  image: '/img/ch/Khien.Ti.Hi.-.Ngan.Lam_Aki.A.Kiet.jpg'
},
{//128
  name: 'Không Có Gì Là Không Thể (有何不可)',
  singer: 'Tiểu Lăng',
  time: '2014-12-31',
  path: 'https://ch01.tuandb.name.vn/Khong.Co.Gi.La.Khong.The.-.Tieu.Lang.mp3',
  image: '/img/ch/Khong.Co.Gi.La.Khong.The.-.Tieu.Lang.jpg'
},
{
  name: 'Hải Hải Hải',
  singer: 'A Tiễu',
  time: '2013-04-10',
  path: 'https://ch01.tuandb.name.vn/Hai.Hai.Hai.-.A.Tieu.mp3',
  image: '/img/ch/Hai.Hai.Hai.-.A.Tieu.jpg'
},
{
  name: 'Ma Pháp Tình Yêu (爱的魔法)',
  singer: 'Kim Sa',
  time: '2012-03-19',
  path: 'https://ch01.tuandb.name.vn/Ma.Phap.Tinh.Yeu.-.Kim.Sa.mp3',
  image: '/img/ch/Ma.Phap.Tinh.Yeu.-.Kim.Sa.jpg'
},
{
  name: 'Quẻ Bói (卜卦)',
  singer: 'Thôi Tử Cách',
  time: '2011-11-17',
  path: 'https://ch01.tuandb.name.vn/Que.Boi.-.Thoi.Tu.Cach.mp3',
  image: '/img/ch/Que.Boi.-.Thoi.Tu.Cach.jpg'
},
{
  name: 'Khách Quan Không Thể Được (客官不可以)',
  singer: 'Tiểu Lương;Tiểu Lăng',
  time: '2010-12-24',
  path: 'https://ch01.tuandb.name.vn/Khach.Quan.Khong.The.Duoc.-.Tieu.Luong_Tieu.Lang.mp3',
  image: '/img/ch/Khach.Quan.Khong.The.Duoc.-.Tieu.Luong_Tieu.Lang.jpg'
},
{
  name: 'Ấm Áp (暖暖)',
  singer: 'Lương Tịnh Như (梁静茹)',
  time: '2006-10-06',
  path: 'https://ch01.tuandb.name.vn/Am.Ap.-.Luong.Tinh.Nhu.mp3',
  image: '/img/ch/Am.Ap.-.Luong.Tinh.Nhu.jpg'
},
    ],

    //tao ra 1 property cho object App co ten currentSong
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    //render ra list cac playlist
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return ` 
         <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    <p class="time">${song.time}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
         </div> `
        })
        playlist.innerHTML = htmls.join('');
    },
    //lien quan den xu ly su kien se nam trong handleEvent nay
    handleEvents: function () {
        //bind this
        const _this = this;
        //lay ra chieu ngang cua CD
        const cdWidth = cd.offsetWidth;
        //xu ly rotate thumb
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 18000,
            iterations: Infinity,
        })

        cdThumbAnimate.pause();
        //phong to thu nho cd
        // document.onscroll = function () {
        //     console.log(window.scrollY)
        //     //neu khong lay duoc phai dung scrollTop
        //     const scrollTop = window.scrollY || document.documentElement.scrollTop
        //     const newcdWidth = cdWidth - scrollTop;
        //     cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
        //     //chia ty le opacity
        //     // cd.style.opacity = newcdWidth / cdWidth;
        // }
        
        // xu ly su kien play 
        playBtn.onclick = function () {
            _this.isPlaying ? audio.pause() : audio.play();

        }
        //khi song duoc play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();

        }
        //khi song pause

        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();

        }
        // progressbar theo video length
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
                progress.value = progressPercent;
            }
        }
        //xu ly khi tua song
        progress.oninput = function (e) {
            console.log(e.target.value)
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }
        //xu ly su kien next Song:
        next.onclick = function () {
            if (_this.isRandom == true) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            //phai goi lai ham play cua audio vi no bi de lai src
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        prev.onclick = function () {
            if (_this.isRandom == true) {
                _this.playRandomSong();
            } else {
                _this.prevSong();

            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();

        }
        //random bai hat
        randomSong.onclick = function () {
            _this.isRandom = !_this.isRandom;
            console.log(_this.isRandom)
            randomSong.classList.toggle("active", _this.isRandom);

        }

        //xu ly next song khi audio ket thuc
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                next.onclick();

            }
        }
        //repeat bai hat
        repeatSong.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatSong.classList.toggle("active", _this.isRepeat);
        }
        ///lang nghe hanh vi click vao playlist
        playlist.onclick = function (e) {
            const nodeSong = e.target.closest('.song:not(.active)');
            if (
                nodeSong && !e.target.closest('.option')
            ) {
                //xu ly khi click vao song
                if (nodeSong) {
                    _this.currentIndex = +nodeSong.dataset.index
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                //khi click vao song option
                if (e.target.closest('.option')) {

                }
            }
        }
        /* volume */
        range.onchange = (e) => {
            console.log("value", e.target.value);
            // if(parseInt(volumeLength, 10) === 0) {
            //     volumeBar.style.height = settings.volume * 100 + '%';
            //     audio.volume = settings.volume;
            //   }
            audio.volume =  e.target.value/100;
            if(audio.volume>0){
                _this.isMute=false;
                volumeBtn.classList.remove("has-muted");
            }
        }
        
        barHoverBox.ontouchstart=function(e){
            _this.barStillDown = true;
            _this.calculateFill(e);
          
        }
        barHoverBox.ontouchmove=function(e){
            if (_this.barStillDown) {
                _this.calculateFill(e);
            }
        }
        barHoverBox.onmousedown=function(e){
            _this.barStillDown = true;
            _this.calculateFill(e);
        }
        barHoverBox.onmouseup=function(e){
            _this.barStillDown = false;
        }
        barHoverBox.ontouchend=function(e){
            _this.barStillDown = false;
        }
        // toggle volume
        volumeBtn.onclick = function(){
            _this.isMute = !_this.isMute;
            if(_this.isMute){
                volumeBtn.classList.add("has-muted");
                audio.volume = 0;
                _this.setValue(0);
            }else{
                volumeBtn.classList.remove("has-muted");
                audio.volume=1;
                fill.style.width= "100" + "%";
            }
            
        }
    },
    //hien thi current playing tqua thuoc tinh currentSong
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = `${this.currentSong.path}`
    },
    // next song dua vao thàng index
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();

    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex == this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();

    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                block: "end", inline: "nearest", behavior: "smooth",
            })
        }, 200);
    },
    // tinh value de fill
    setValue: function (value) {
        fill.style.width = value + "%";
        range.setAttribute("value", value)
        range.dispatchEvent(new Event("change"))
    },
    calculateFill: function (e) {
        let offsetX = e.offsetX

        if (e.type === "touchmove") {
            offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
        }

        const width = e.target.offsetWidth - 30;

        this.setValue(
            Math.max(
                Math.min(
                    (offsetX - 15) / width * 100.0,
                    100.0
                ),
                0
            )
        );
    },
    /* lay value o tren de fill */
    start: function () {
        //ddinh nghia cac thuoc tinh cho object
        this.defineProperties();
        //lang nghe xu ly cac su kien
        this.handleEvents();

        //tai thong tin bai bat dau tien len UI
        this.loadCurrentSong();

        //render playlist
        this.render();
        this.setValue(range.value);
        
    }
}
App.start();
