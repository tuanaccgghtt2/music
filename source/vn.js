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
// --vn01.tuandb.name.vn/11111121111111.mp3--
// --gitlab.com/3x5/temps/-/raw/a/1111211.mp3--
// --raw.githubusercontent.com/5fp/vn01/a/111121111.mp3--
//’

// {
//   name: '111111111111211111111',
//   singer: 'aaanaaaaaaaanaaaaaa',
//   time: 'ttbtbtttttttt',
//   path: 'https://gitlab.com/3x5/vn01/-/raw/a/mp3/1111212111121111111.mp3',
//   image: '/img/vn/1111212111121111111.jpg'
// },

// { ////
//   name: '1111111111111111211111',
//   singer: 'aaaananaaaaaaaaaaaa',
//   time: 'tttttbttttbttt',//https://vn01.tuandb.name.vn/11121111111112112111.mp3',
//   path: 'https://raw.githubusercontent.com/5fp/vn01/a/11121111111112112111.mp3',
//   image: '/img/vn/11121111111112112111.jpg'
// },


{
  name: 'Nói Dối',
  singer: 'Pháo;HIEUTHUHAI',
  time: '2021-12-23',
  path: 'https://vn01.tuandb.name.vn/Noi.Doi.-.Phao_HIEUTHUHAI.mp3',
  image: '/img/vn/Noi.Doi.-.Phao_HIEUTHUHAI.jpg'
},
{
  name: 'Tết Nô Lo (Ăn Bánh Uống Trà)',
  singer: 'Bích Phương',
  time: '2021-12-22',
  path: 'https://vn01.tuandb.name.vn/Tet.No.Lo_An.Banh.Uong.Tra.-.Bich.Phuong.mp3',
  image: '/img/vn/Tet.No.Lo_An.Banh.Uong.Tra.-.Bich.Phuong.jpg'
},
{
  name: 'Phận Hoa Rơi',
  singer: 'K-ICM;Vicky Nhung',
  time: '2021-12-03',
  path: 'https://vn01.tuandb.name.vn/Phan.Hoa.Roi.-.K-ICM_Vicky.Nhung.mp3',
  image: '/img/vn/Phan.Hoa.Roi.-.K-ICM_Vicky.Nhung.jpg'
},
{
  name: 'Mười Năm (Lộn Xộn 3) [From "Rừng Thế Mạng"]',
  singer: 'Đen;Ngọc Linh',
  time: '2021-11-29',
  path: 'https://vn01.tuandb.name.vn/Muoi.Nam._Lon.Xon.3._From._Rung.The.Mang.-.Den_.Ngoc.Linh.mp3',
  image: '/img/vn/Muoi.Nam._Lon.Xon.3._From._Rung.The.Mang.-.Den_.Ngoc.Linh.jpg'
},
{
  name: 'Đế Vương',
  singer: 'Đình Dũng;ACV',
  time: '2021-11-28',
  path: 'https://vn01.tuandb.name.vn/De.Vuong.-.Dinh.Dung_ACV.mp3',
  image: '/img/vn/De.Vuong.-.Dinh.Dung_ACV.jpg'
},
{
  name: 'Bởi Vì Yêu',
  singer: 'Juky San;Rick',
  time: '2021-11-25',
  path: 'https://vn01.tuandb.name.vn/Boi.Vi.Yeu.-.Juky.San.mp3',
  image: '/img/vn/Boi.Vi.Yeu.-.Juky.San.jpg'
},
{
  name: 'Miss Toàn Thư Bách Khoa',
  singer: 'AMee',
  time: '2021-11-25',
  path: 'https://vn01.tuandb.name.vn/Miss.Toan.Thu.Bach.Khoa.-.AMee.mp3',
  image: '/img/vn/Miss.Toan.Thu.Bach.Khoa.-.AMee.jpg'
},
{
  name: 'Là Ai Từ Bỏ, Là Ai Vô Tình',
  singer: 'Hương Ly;Jombie',
  time: '2021-11-19',
  path: 'https://vn01.tuandb.name.vn/La.Ai.Tu.Bo_.La.Ai.Vo.Tinh.-.Huong.Ly_Jombie.mp3',
  image: '/img/vn/La.Ai.Tu.Bo_.La.Ai.Vo.Tinh.-.Huong.Ly_Jombie.jpg'
},
{
  name: 'Là Ai Từ Bỏ, Là Ai Vô Tình (RIN Music Remix)',
  singer: 'Hương Ly;Jombie',
  time: '2021-11-19',
  path: 'https://vn01.tuandb.name.vn/La.Ai.Tu.Bo_.La.Ai.Vo.Tinh_RIN.Music.Remix.-.Huong.Ly_.Jombie.mp3',
  image: '/img/vn/La.Ai.Tu.Bo_.La.Ai.Vo.Tinh.-.Huong.Ly_Jombie.jpg'
},
{//128
  name: 'Váy Cưới (Remix)',
  singer: 'HuyLee;Duyn203',
  time: '2021-11-12',
  path: 'https://vn01.tuandb.name.vn/Vay.Cuoi_Remix.-.HuyLee_Duyn203.mp3',
  image: '/img/vn/Vay.Cuoi_Remix.-.HuyLee_Duyn203.jpg'
},
{
  name: 'Bước Qua Nhau',
  singer: 'Vũ',
  time: '2021-11-11',
  path: 'https://vn01.tuandb.name.vn/Buoc.Qua.Nhau.-.Vu.mp3',
  image: '/img/vn/Buoc.Qua.Nhau.-.Vu.jpg'
},
{
  name: 'Luyến Lưu Tình',
  singer: 'YuniBoo;Goctoi Mixer',
  time: '2021-11-07',
  path: 'https://vn01.tuandb.name.vn/Luyen.Luu.Tinh.-.YuniBoo_Goctoi.Mixer.mp3',
  image: '/img/vn/Luyen.Luu.Tinh.-.YuniBoo_Goctoi.Mixer.jpg'
},
{
  name: 'Ái Nộ',
  singer: 'Yến Tatoo;Masew;Great',
  time: '2021-11-05',
  path: 'https://vn01.tuandb.name.vn/Ai.No.-.Yen.Tatoo_Masew_Great.mp3',
  image: '/img/vn/Ai.No.-.Yen.Tatoo_Masew_Great.jpg'
},
{
  name: 'Đừng Bỏ Lỡ (Lofi Music)',
  singer: 'Hà Nhi x Tio',
  time: '2021-10-28',
  path: 'https://vn01.tuandb.name.vn/Dung.Bo.Lo_Lofi.Music.-.Ha.Nhi.x.Tio.mp3',
  image: '/img/vn/Dung.Bo.Lo_Lofi.Music.-.Ha.Nhi.x.Tio.jpg'
},
{
  name: 'Kathy Kathy',
  singer: 'Bảo Anh',
  time: '2021-10-22',
  path: 'https://vn01.tuandb.name.vn/Kathy.Kathy.-.Bao.Anh.mp3',
  image: '/img/vn/Kathy.Kathy.-.Bao.Anh.jpg'
},
{
  name: 'Mình Cưới Thôi Anh',
  singer: 'TVk;Huỳnh Mộng Như',
  time: '2021-10-19',
  path: 'https://vn01.tuandb.name.vn/Minh.Cuoi.Thoi.Anh.-.TVk_.Huynh.Mong.Nhu.mp3',
  image: '/img/vn/Minh.Cuoi.Thoi.Anh.-.TVk_.Huynh.Mong.Nhu.jpg'
},
{
  name: 'Cưa Là Đổ',
  singer: 'Phát Hồ;X2X',
  time: '2021-10-17',
  path: 'https://vn01.tuandb.name.vn/Cua.La.Do.-.Phat.Ho_.X2X.mp3',
  image: '/img/vn/Cua.La.Do.-.Phat.Ho_.X2X.jpg'
},
{
  name: 'Đông Phai Mờ Dáng Ai',
  singer: 'DatKaa;QT Beatz',
  time: '2021-10-10',
  path: 'https://vn01.tuandb.name.vn/Dong.Phai.Mo.Dang.Ai.-.DatKaa_.QT.Beatz.mp3',
  image: '/img/vn/Dong.Phai.Mo.Dang.Ai.-.DatKaa_.QT.Beatz.jpg'
},
{
  name: 'Váy Cưới (Lofi Ver)',
  singer: 'Trung Tự',
  time: '2021-10-07',
  path: 'https://vn01.tuandb.name.vn/Vay.Cuoi.Lofi.Ver.-.Trung.Tu.mp3',
  image: '/img/vn/Vay.Cuoi.Lofi.Ver.-.Trung.Tu.jpg'
},
{
  name: 'Bao Lâu Ta Lại Yêu Một Người',
  singer: 'Doãn Hiếu;B.',
  time: '2021-10-02',
  path: 'https://vn01.tuandb.name.vn/Bao.Lau.Ta.Lai.Yeu.Mot.Nguoi.-.Doan.Hieu_.B..mp3',
  image: '/img/vn/Bao.Lau.Ta.Lai.Yeu.Mot.Nguoi.-.Doan.Hieu_.B..jpg'
},
{
  name: 'Chưa Bao Giờ Em Quên',
  singer: 'Hương Ly',
  time: '2021-10-01',
  path: 'https://vn01.tuandb.name.vn/Chua.Bao.Gio.Em.Quen.-.Huong.Ly.mp3',
  image: '/img/vn/Chua.Bao.Gio.Em.Quen.-.Huong.Ly.jpg'
},
{
  name: 'Thay Lòng',
  singer: 'DIMZ;TVk;NH4T',
  time: '2021-09-30',
  path: 'https://vn01.tuandb.name.vn/Thay.Long.-.DIMZ_.TVk_.NH4T.mp3',
  image: '/img/vn/Thay.Long.-.DIMZ_.TVk_.NH4T.jpg'
},
{
  name: 'Tell Ur Mom II (Cukak Remix)',
  singer: 'Winno;Heily;CUKAK',
  time: '2021-09-29',
  path: 'https://vn01.tuandb.name.vn/Tell.Ur.Mom.II._Cukak.Remix.-.Winno_.Heily_.CUKAK.mp3',
  image: '/img/vn/Tell.Ur.Mom.II._Cukak.Remix.-.Winno_.Heily_.CUKAK.jpg'
},
{
  name: 'Phi Hành Gia',
  singer: 'Renja;Slow T;Lil Wuyn;Sugar Cane',
  time: '2021-09-25',
  path: 'https://vn01.tuandb.name.vn/Phi.Hanh.Gia.-.Renja_.Slow.T_.Lil.Wuyn_.Sugar.Cane.mp3',
  image: '/img/vn/Phi.Hanh.Gia.-.Renja_.Slow.T_.Lil.Wuyn_.Sugar.Cane.jpg'
},
{
  name: 'Cưới Luôn Được Không?',
  singer: 'YuniBoo;Goctoi Mixer',
  time: '2021-09-19',
  path: 'https://vn01.tuandb.name.vn/Cuoi.Luon.Duoc.Khong.-.YuniBoo_Goctoi.Mixer.mp3',
  image: '/img/vn/Cuoi.Luon.Duoc.Khong.-.YuniBoo_Goctoi.Mixer.jpg'
},
{
  name: 'Hương (Haozi x RinV Remix)',
  singer: 'Văn Mai Hương;Negav',
  time: '2021-09-11',
  path: 'https://vn01.tuandb.name.vn/Huong._Haozi.x.RinV.Remix.-.Van.Mai.Huong_Negav.mp3',
  image: '/img/vn/Huong._Haozi.x.RinV.Remix.-.Van.Mai.Huong_Negav.jpg'
},
{
  name: 'Cưới Thôi',
  singer: 'Masew;Masiu;B Ray;TAP',
  time: '2021-09-09',
  path: 'https://vn01.tuandb.name.vn/Cuoi.Thoi.-.Masew.Masiu.B.Ray.TAP.mp3',
  image: '/img/vn/Cuoi.Thoi.-.Masew.Masiu.B.Ray.TAP.jpg'
},
{
  name: 'Yêu Là Cưới',
  singer: 'Phát Hồ',
  time: '2021-09-06',
  path: 'https://vn01.tuandb.name.vn/Yeu.La.Cuoi.-.Phat.Ho.mp3',
  image: '/img/vn/Yeu.La.Cuoi.-.Phat.Ho.jpg'
},
{
  name: 'Thương Nhau Tới Bến',
  singer: 'Nal',
  time: '2021-08-31',
  path: 'https://vn01.tuandb.name.vn/Thuong.Nhau.Toi.Ben.-.Nal.mp3',
  image: '/img/vn/Thuong.Nhau.Toi.Ben.-.Nal.jpg'
},
{
  name: 'Khuê Mộc Lang',
  singer: 'Hương Ly;Jombie',
  time: '2021-08-20',
  path: 'https://vn01.tuandb.name.vn/Khue.Moc.Lang.-.Huong.Ly.Jombie.mp3',
  image: '/img/vn/Khue.Moc.Lang.-.Huong.Ly.Jombie.jpg'
},
{
  name: 'Em Hát Ai Nghe',
  singer: 'Orange',
  time: '2021-08-18',
  path: 'https://vn01.tuandb.name.vn/Em.Hat.Ai.Nghe.-.Orange.mp3',
  image: '/img/vn/Em.Hat.Ai.Nghe.-.Orange.jpg'
},
{
  name: 'Độ Tộc 2',
  singer: 'Độ Mixi;Phúc Du;Pháo;Masew',
  time: '2021-08-07',
  path: 'https://vn01.tuandb.name.vn/Do.Toc.2.-.Do.Mixi.Phuc.Du.Phao.Masew.mp3',
  image: '/img/vn/Do.Toc.2.-.Do.Mixi.Phuc.Du.Phao.Masew.jpg'
},
{
  name: 'Rồi Tới Luôn',
  singer: 'Nal',
  time: '2021-07-25',
  path: 'https://vn01.tuandb.name.vn/Roi.Toi.Luon.-.Nal.mp3',
  image: '/img/vn/Roi.Toi.Luon.-.Nal.jpg'
},
{
  name: 'Tự Em Đa Tình',
  singer: 'Quinn',
  time: '2021-05-15',
  path: 'https://vn01.tuandb.name.vn/Tu.Em.Da.Tinh.-.Quinn.mp3',
  image: '/img/vn/Tu.Em.Da.Tinh.-.Quinn.jpg'
},
{
  name: 'Hạ Còn Vương Nắng',
  singer: 'DatKaa',
  time: '2021-04-04',
  path: 'https://vn01.tuandb.name.vn/Ha.Con.Vuong.Nang.-.DatKaa.mp3',
  image: '/img/vn/Ha.Con.Vuong.Nang.-.DatKaa.jpg'
},
{
  name: 'Chỉ Là Không Cùng Nhau (Live Version)',
  singer: 'Tăng Phúc;Trương Thảo Nhi',
  time: '2021-03-29',
  path: 'https://vn01.tuandb.name.vn/Chi.La.Khong.Cung.Nhau._Live.Version.-.Tang.PhucTruong.Thao.Nhi.mp3',
  image: '/img/vn/Chi.La.Khong.Cung.Nhau._Live.Version.-.Tang.PhucTruong.Thao.Nhi.jpg'
},
{
  name: 'Tình Bạn Diệu Kỳ',
  singer: 'AMee;Ricky Star;Lăng LD',
  time: '2021-02-23',
  path: 'https://vn01.tuandb.name.vn/Tinh.Ban.Dieu.Ky.-.AMeeRicky.StarLang.LD.mp3',
  image: '/img/vn/Tinh.Ban.Dieu.Ky.-.AMeeRicky.StarLang.LD.jpg'
},
{
  name: 'Phải Chăng Em Đã Yêu',
  singer: 'Juky San;RedT',
  time: '2021-02-12',
  path: 'https://vn01.tuandb.name.vn/Phai.Chang.Em.Da.Yeu.-.Juky.SanRedT.mp3',
  image: '/img/vn/Phai.Chang.Em.Da.Yeu.-.Juky.SanRedT.jpg'
},
{
  name: 'Yêu Em Từ Bé',
  singer: 'HuyR;Phi Nhung',
  time: '2021-02-08',
  path: 'https://vn01.tuandb.name.vn/Yeu.Em.Tu.Be.-.HuyR.Phi.Nhung.mp3',
  image: '/img/vn/Yeu.Em.Tu.Be.-.HuyR.Phi.Nhung.jpg'
},
{
  name: 'Tình Yêu Khủng Long',
  singer: 'FAY;Kvprox;Dino',
  time: '2021-02-01',
  path: 'https://vn01.tuandb.name.vn/Tinh.Yeu.Khung.Long.-.FAY.Kvprox.Dino.mp3',
  image: '/img/vn/Tinh.Yeu.Khung.Long.-.FAY.Kvprox.Dino.jpg'
},
{
  name: 'Lỡ Say Bye Là Bye',
  singer: 'Lemese;Changg',
  time: '2021-01-22',
  path: 'https://vn01.tuandb.name.vn/Lo.Say.Bye.La.Bye.-.Lemese_Changg.mp3',
  image: '/img/vn/Lo.Say.Bye.La.Bye.-.Lemese_Changg.jpg'
},
{
  name: 'Em Là Châu Báu',
  singer: 'MCK;Tlinh',
  time: '2020-11-22',
  path: 'https://vn01.tuandb.name.vn/Em.La.Chau.Bau.-.MCK_Tlinh.mp3',
  image: '/img/vn/Em.La.Chau.Bau.-.MCK_Tlinh.jpg'
},
{
  name: 'Trên Tình Bạn Dưới Tình Yêu',
  singer: 'Min',
  time: '2020-11-05',
  path: 'https://vn01.tuandb.name.vn/Tren.Tinh.Ban.Duoi.Tinh.Yeu.-.Min.mp3',
  image: '/img/vn/Tren.Tinh.Ban.Duoi.Tinh.Yeu.-.Min.jpg'
},
{
  name: 'Như Bến Đợi Đò',
  singer: 'Khánh Ân;Hana Cẩm Tiên',
  time: '2020-10-22',
  path: 'https://vn01.tuandb.name.vn/Nhu.Ben.Doi.Do.-.Khanh.An_Hana.Cam.Tien.mp3',
  image: '/img/vn/Nhu.Ben.Doi.Do.-.Khanh.An_Hana.Cam.Tien.jpg'
},
{
  name: 'Em Bé',
  singer: 'AMee;Karik',
  time: '2020-09-20',
  path: 'https://vn01.tuandb.name.vn/Em.Be.-.AMee_Karik.mp3',
  image: '/img/vn/Em.Be.-.AMee_Karik.jpg'
},
{
  name: 'Em Đã Thương Người Ta Hơn Anh',
  singer: 'Noo Phước Thịnh',
  time: '2020-09-09',
  path: 'https://vn01.tuandb.name.vn/Em.Da.Thuong.Nguoi.Ta.Hon.Anh.-.Noo.Phuoc.Thinh.mp3',
  image: '/img/vn/Em.Da.Thuong.Nguoi.Ta.Hon.Anh.-.Noo.Phuoc.Thinh.jpg'
},
{
  name: 'Bông Hoa Đẹp Nhất',
  singer: 'Quân A.P',
  time: '2020-09-07',
  path: 'https://vn01.tuandb.name.vn/Bong.Hoa.Dep.Nhat.-.Quan.A.P.mp3',
  image: '/img/vn/Bong.Hoa.Dep.Nhat.-.Quan.A.P.jpg'
},
{
  name: 'Mama Boy',
  singer: 'Amee',
  time: '2020-09-06',
  path: 'https://vn01.tuandb.name.vn/Mama.Boy.-.Amee.mp3',
  image: '/img/vn/Mama.Boy.-.Amee.jpg'
},
{
  name: 'Ngây Thơ',
  singer: 'Tăng Duy Tân;Phong Max',
  time: '2020-09-04',
  path: 'https://vn01.tuandb.name.vn/Ngay.Tho.-.Tang.Duy.Tan_Phong.Max.mp3',
  image: '/img/vn/Ngay.Tho.-.Tang.Duy.Tan_Phong.Max.jpg'
},
{
  name: 'Tình Nào Không Như Tình Đầu',
  singer: 'Trung Quân',
  time: '2020-09-03',
  path: 'https://vn01.tuandb.name.vn/Tinh.Nao.Khong.Nhu.Tinh.Dau.-.Trung.Quan.mp3',
  image: '/img/vn/Tinh.Nao.Khong.Nhu.Tinh.Dau.-.Trung.Quan.jpg'
},
{
  name: 'Cưới Đi',
  singer: 'ChangC;2T',
  time: '2020-08-28',
  path: 'https://vn01.tuandb.name.vn/Cuoi.Di.-.ChangC.2T.mp3',
  image: '/img/vn/Cuoi.Di.-.ChangC.2T.jpg'
},
{
  name: 'Ai Mang Cô Đơn Đi',
  singer: 'K-ICM;APJ',
  time: '2020-08-18',
  path: 'https://vn01.tuandb.name.vn/Ai.Mang.Co.Don.Di.-.K-ICM.APJ.mp3',
  image: '/img/vn/Ai.Mang.Co.Don.Di.-.K-ICM.APJ.jpg'
},
{
  name: 'Nàng Thơ',
  singer: 'Hoàng Dũng',
  time: '2020-08-03',
  path: 'https://vn01.tuandb.name.vn/Nang.Tho.-.Hoang.Dung.mp3',
  image: '/img/vn/Nang.Tho.-.Hoang.Dung.jpg'
},
{
  name: 'Khác Biệt To Lớn',
  singer: 'Trịnh Thăng Bình;Liz Kim Cương',
  time: '2020-07-26',
  path: 'https://vn01.tuandb.name.vn/Khac.Biet.To.Lon.-.Trinh.Thang.Binh.Liz.Kim.Cuong.mp3',
  image: '/img/vn/Khac.Biet.To.Lon.-.Trinh.Thang.Binh.Liz.Kim.Cuong.jpg'
},
{
  name: 'Gác Lại Âu Lo',
  singer: 'Da LAB;Miu Lê',
  time: '2020-07-25',
  path: 'https://vn01.tuandb.name.vn/Gac.Lai.Au.Lo.-.Da.LAB_Miu.Le.mp3',
  image: '/img/vn/Gac.Lai.Au.Lo.-.Da.LAB_Miu.Le.jpg'
},
{
  name: 'Ex’s Hate Me (Part 2)',
  singer: 'Amee;B Ray',
  time: '2020-07-22',
  path: 'https://vn01.tuandb.name.vn/Exs.Hate.Me._Part.2.-.Amee_B.Ray.mp3',
  image: '/img/vn/Exs.Hate.Me._Part.2.-.Amee_B.Ray.jpg'
},
{
  name: 'Cứ Chill Thôi',
  singer: 'Chillies;Suni Hạ Linh;Rhymastic',
  time: '2020-07-11',
  path: 'https://vn01.tuandb.name.vn/Cu.Chill.Thoi.-.Chillies_Suni.Ha.Linh_Rhymastic.mp3',
  image: '/img/vn/Cu.Chill.Thoi.-.Chillies_Suni.Ha.Linh_Rhymastic.jpg'
},
{
  name: 'Yêu Thì Yêu Không Yêu Thì Yêu',
  singer: 'Amee',
  time: '2020-06-18',
  path: 'https://vn01.tuandb.name.vn/Yeu.Thi.Yeu.Khong.Yeu.Thi.Yeu.-.Amee.mp3',
  image: '/img/vn/Yeu.Thi.Yeu.Khong.Yeu.Thi.Yeu.-.Amee.jpg'
},
{
  name: 'Một Cú Lừa',
  singer: 'Bích Phương',
  time: '2020-05-31',
  path: 'https://vn01.tuandb.name.vn/Mot.Cu.Lua.-.Bich.Phuong.mp3',
  image: '/img/vn/Mot.Cu.Lua.-.Bich.Phuong.jpg'
},
{
  name: 'Hoa Nở Không Màu',
  singer: 'Hoài Lâm',
  time: '2020-05-25',
  path: 'https://vn01.tuandb.name.vn/Hoa.No.Khong.Mau.-.Hoai.Lam.mp3',
  image: '/img/vn/Hoa.No.Khong.Mau.-.Hoai.Lam.jpg'
},
{
  name: 'Em Không Sai Chúng Ta Sai',
  singer: 'Erik',
  time: '2020-05-06',
  path: 'https://vn01.tuandb.name.vn/Em.Khong.Sai.Chung.Ta.Sai.-.Erik.mp3',
  image: '/img/vn/Em.Khong.Sai.Chung.Ta.Sai.-.Erik.jpg'
},
{
  name: 'Thích Quá Rùi Nà',
  singer: 'Trung Trần;TLinh',
  time: '2020-04-20',
  path: 'https://vn01.tuandb.name.vn/Thich.Qua.Rui.Na.-.Trung.Tran_TLinh.mp3',
  image: '/img/vn/Thich.Qua.Rui.Na.-.Trung.Tran_TLinh.jpg'
},
{
  name: 'Sao Anh Chưa Về Nhà',
  singer: 'Amee;Ricky Star',
  time: '2020-03-05',
  path: 'https://vn01.tuandb.name.vn/Sao.Anh.Chua.Ve.Nha.-.Amee_Ricky.Star.mp3',
  image: '/img/vn/Sao.Anh.Chua.Ve.Nha.-.Amee_Ricky.Star.jpg'
},
{
  name: 'Khóc Cùng Em',
  singer: 'Mr.Siro;Gray;Wind',
  time: '2020-02-20',
  path: 'https://vn01.tuandb.name.vn/Khoc.Cung.Em.-.Mr.Siro_Gray_Wind.mp3',
  image: '/img/vn/Khoc.Cung.Em.-.Mr.Siro_Gray_Wind.jpg'
},
{
  name: 'Chân Ái',
  singer: 'Orange;Khói',
  time: '2020-02-17',
  path: 'https://vn01.tuandb.name.vn/Chan.Ai.-.Orange;Khoi.mp3',
  image: '/img/vn/Chan.Ai.-.Orange;Khoi.jpg'
},
{
  name: 'Hơn Cả Yêu',
  singer: 'Đức Phúc',
  time: '2020-02-11',
  path: 'https://vn01.tuandb.name.vn/Hon.Ca.Yeu.-.Duc.Phuc.mp3',
  image: '/img/vn/Hon.Ca.Yeu.-.Duc.Phuc.jpg'
},
{
  name: 'Anh Thanh Niên',
  singer: 'HuyR',
  time: '2020-01-21',
  path: 'https://vn01.tuandb.name.vn/Anh.Thanh.Niên.-.HuyR.mp3',
  image: '/img/vn//Anh.Thanh.Niên.-.HuyR.jpg'
},
{
  name: 'Làm Gì Phải Hốt',
  singer: 'JustaTee;Hoàng Thuỳ Linh;Đen',
  time: '2020-01-05',
  path: 'https://vn01.tuandb.name.vn/Lam.Gi.Phai.Hot.-.JustaTee_Hoang.Thuy.Linh_Den.mp3',
  image: '/img/vn/Lam.Gi.Phai.Hot.-.JustaTee_Hoang.Thuy.Linh_Den.jpg'
},
{
  name: 'Duyên Âm',
  singer: 'Hoàng Thuỳ Linh',
  time: '2019-12-19',
  path: 'https://vn01.tuandb.name.vn/Duyen.Am.-.Hoang.Thuy.Linh.mp3',
  image: '/img/vn/Duyen.Am.-.Hoang.Thuy.Linh.jpg'
},
{
  name: 'Mascara',
  singer: 'Chillies',
  time: '2019-12-19',
  path: 'https://vn01.tuandb.name.vn/Mascara.-.Chillies.mp3',
  image: '/img/vn/Mascara.-.Chillies.jpg'
},
{
  name: 'Bánh Mì Không',
  singer: 'Đạt G;DuUyen',
  time: '2019-12-12',
  path: 'https://vn01.tuandb.name.vn/Banh.Mi.Khong.-.Dat.G_DuUyen.mp3',
  image: '/img/vn/Banh.Mi.Khong.-.Dat.G_DuUyen.jpg'
},
{
  name: 'Vì Yêu Cứ Đâm Đầu',
  singer: 'Min;Đen;JustaTee',
  time: '2019-11-10',
  path: 'https://vn01.tuandb.name.vn/Vi.Yeu.Cu.Dam.Dau.-.Min_Den_JustaTee.mp3',
  image: '/img/vn/Vi.Yeu.Cu.Dam.Dau.-.Min_Den_JustaTee.jpg'
},
{
  name: 'Lắm Mối Tối Ngồi Không',
  singer: 'Hoàng Thuỳ Linh',
  time: '2019-11-09',
  path: 'https://vn01.tuandb.name.vn/Lam.Moi.Toi.Ngoi.Khong.-.Hoang.Thuy.Linh.mp3',
  image: '/img/vn/Lam.Moi.Toi.Ngoi.Khong.-.Hoang.Thuy.Linh.jpg'
},
{
  name: 'Kẻ Cắp Gặp Bà Già',
  singer: 'Hoàng Thuỳ Linh;Binz',
  time: '2019-10-21',
  path: 'https://vn01.tuandb.name.vn/Ke.Cap.Gap.Ba.Gia.-.Hoang.Thuy.Linh_Binz.mp3',
  image: '/img/vn/Ke.Cap.Gap.Ba.Gia.-.Hoang.Thuy.Linh_Binz.jpg'
},
{
  name: 'Em Mỉm Cười Trông Thật Đẹp',
  singer: 'Trịnh Đình Quang',
  time: '2019-10-10',
  path: 'https://vn01.tuandb.name.vn/Em.Mim.Cuoi.Trong.That.Dep.-.Trinh.Dinh.Quang.mp3',
  image: '/img/vn/Em.Mim.Cuoi.Trong.That.Dep.-.Trinh.Dinh.Quang.jpg'
},
{
  name: 'Tướng Quân',
  singer: 'Nhật Phong',
  time: '2019-07-31',
  path: 'https://vn01.tuandb.name.vn/Tuong.Quan.-.Nhat.Phong.mp3',
  image: '/img/vn/Tuong.Quan.-.Nhat.Phong.jpg'
},
{
  name: 'Không Sao Mà Em Đây Rồi',
  singer: 'Suni Hạ Linh;Lou Hoàng',
  time: '2019-07-25',
  path: 'https://vn01.tuandb.name.vn/Khong.Sao.Ma.Em.Day.Roi.-.Suni.Ha.Linh_Lou.Hoang.mp3',
  image: '/img/vn/Khong.Sao.Ma.Em.Day.Roi.-.Suni.Ha.Linh_Lou.Hoang.jpg'
},
{
  name: 'Cần Xa',
  singer: 'Hiền Hồ;Phúc Bồ;SlimV',
  time: '2019-07-10',
  path: 'https://vn01.tuandb.name.vn/Can.Xa.-.Hien.Ho_Phuc.Bo_SlimV.mp3',
  image: '/img/vn/Can.Xa.-.Hien.Ho_Phuc.Bo_SlimV.jpg'
},
{
  name: 'Để Mị Nói Cho Mà Nghe',
  singer: 'Hoàng Thùy Linh',
  time: '2019-06-19',
  path: 'https://vn01.tuandb.name.vn/De.Mi.Noi.Cho.Ma.Nghe.-.Hoang.Thuy.Linh.mp3',
  image: '/img/vn/De.Mi.Noi.Cho.Ma.Nghe.-.Hoang.Thuy.Linh.jpg'
},
{
  name: 'Đen Đá Không Đường',
  singer: 'Amee',
  time: '2019-05-09',
  path: 'https://vn01.tuandb.name.vn/Den.Da.Khong.Duong.-.Amee.mp3',
  image: '/img/vn/Den.Da.Khong.Duong.-.Amee.jpg'
},
{
  name: 'Đâu Cần Một Bài Ca Tình Yêu',
  singer: 'Tiên Tiên;Trang',
  time: '2019-04-20',
  path: 'https://vn01.tuandb.name.vn/Dau.Can.Mot.Bai.Ca.Tinh.Yeu.-.Tien.Tien_Trang.mp3',
  image: '/img/vn/Dau.Can.Mot.Bai.Ca.Tinh.Yeu.-.Tien.Tien_Trang.jpg'
},
{
  name: 'Tôi Thất Tình (Ugly)',
  singer: 'Orange;Superbrothers',
  time: '2019-03-19',
  path: 'https://vn01.tuandb.name.vn/Toi.That.Tinh.Ugly-.Orange_Superbrothers.mp3',
  image: '/img/vn/Toi.That.Tinh.Ugly-.Orange_Superbrothers.jpg'
},
{
  name: 'Hồng Nhan',
  singer: 'Jack',
  time: '2019-02-19',
  path: 'https://vn01.tuandb.name.vn/Hong.Nhan.-.Jack.mp3',
  image: '/img/vn/Hong.Nhan.-.Jack.jpg'
},
{
  name: 'Ex’s Hate Me',
  singer: 'B Ray;Masew;Amee',
  time: '2019-02-13',
  path: 'https://vn01.tuandb.name.vn/Exs.Hate.Me.-.B.Ray_Masew_Amee.mp3',
  image: '/img/vn/Exs.Hate.Me.-.B.Ray_Masew_Amee.jpg'
},
{
  name: 'Mượn Rượu Tỏ Tình',
  singer: 'BigDaddy;Emily',
  time: '2019-02-08',
  path: 'https://vn01.tuandb.name.vn/Muon.Ruou.To.Tinh.-.BigDaddy_Emily.mp3',
  image: '/img/vn/Muon.Ruou.To.Tinh.-.BigDaddy_Emily.jpg'
},
{
  name: 'Em Có Thể',
  singer: 'Osad;VRT',
  time: '2018-12-21',
  path: 'https://vn01.tuandb.name.vn/Em.Co.The.-.Osad_VRT.mp3',
  image: '/img/vn/Em.Co.The.-.Osad_VRT.jpg'
},
{
  name: '24h',
  singer: 'LyLy;Magazine',
  time: '2018-11-22',
  path: 'https://vn01.tuandb.name.vn/24h.-.LyLy_Magazine.mp3',
  image: '/img/vn/24h.-.LyLy_Magazine.jpg'
},
{
  name: 'Người Âm Phủ (EDM Version)',
  singer: 'Osad;Khánh Vy',
  time: '2018-10-08',
  path: 'https://vn01.tuandb.name.vn/Nguoi.Am.Phu_EDM.Version-.Osad_Khanh.Vy.mp3',
  image: '/img/vn/Nguoi.Am.Phu_EDM.Version-.Osad_Khanh.Vy.jpg'
},
{
  name: 'Nevada x Đi Đi Đi Daniel Mastro Remix',
  singer: 'K-ICM;T-ICM;Kelsey;Zickky',
  time: '2018-10-06',
  path: 'https://vn01.tuandb.name.vn/Nevada.x.Di.Di.Di.Daniel.Mastro.Remix.-.K-ICM_T-ICM_Kelsey_Zickky.mp3',
  image: '/img/vn/Nevada.x.Di.Di.Di.Daniel.Mastro.Remix.-.K-ICM_T-ICM_Kelsey_Zickky.jpg'
},
{
  name: 'Đến Với Nhau Là Sai',
  singer: 'Noo Phước Thịnh',
  time: '2018-06-28',
  path: 'https://vn01.tuandb.name.vn/Den.Voi.Nhau.La.Sai.-.Noo.Phuoc.Thinh.mp3',
  image: '/img/vn/Den.Voi.Nhau.La.Sai.-.Noo.Phuoc.Thinh.jpg'
},
{
  name: 'Mắt Nhắm Môi Chạm',
  singer: 'Lou Hoàng;CARA',
  time: '2018-06-07',
  path: 'https://vn01.tuandb.name.vn/Mat.Nham.Moi.Cham.-.Lou.Hoang_CARA.mp3',
  image: '/img/vn/Mat.Nham.Moi.Cham.-.Lou.Hoang_CARA.jpg'
},
{
  name: 'Em Mới Là Người Yêu Anh',
  singer: 'Min',
  time: '2018-05-22',
  path: 'https://vn01.tuandb.name.vn/Em.Moi.La.Nguoi.Yeu.Anh.-.Min.mp3',
  image: '/img/vn/Em.Moi.La.Nguoi.Yeu.Anh.-.Min.jpg'
},
{
  name: 'Vì Yêu Là Nhớ',
  singer: 'Han Saraa',
  time: '2018-04-04',
  path: 'https://vn01.tuandb.name.vn/Vi.Yeu.La.Nho.-.Han.Saraa.mp3',
  image: '/img/vn/Vi.Yeu.La.Nho.-.Han.Saraa.jpg'
},
{
  name: 'Người Lạ Ơi (Solo Version)',
  singer: 'Orange;Superbrothers',
  time: '2018-03-28',
  path: 'https://vn01.tuandb.name.vn/Nguoi.La.Oi_Solo.Version-.Orange_Superbrothers.mp3',
  image: '/img/vn/Nguoi.La.Oi_Solo.Version-.Orange_Superbrothers.jpg'
},
{
  name: 'Mình Cưới Nhau Đi',
  singer: 'Huỳnh James;Pjnboys',
  time: '2018-02-02',
  path: 'https://vn01.tuandb.name.vn/Minh.Cuoi.Nhau.Di.-.Huynh.James_Pjnboys.mp3',
  image: '/img/vn/Minh.Cuoi.Nhau.Di.-.Huynh.James_Pjnboys.jpg'
},
{
  name: 'Hôm Nay Tôi Buồn',
  singer: 'Phùng Khánh Linh',
  time: '2018-02-01',
  path: 'https://vn01.tuandb.name.vn/Hom.Nay.Toi.Buon.-.Phung.Khanh.Linh.mp3',
  image: '/img/vn/Hom.Nay.Toi.Buon.-.Phung.Khanh.Linh.jpg'
},
{
  name: 'Đừng Xin Lỗi Nữa',
  singer: 'Erik;Min',
  time: '2018-01-18',
  path: 'https://vn01.tuandb.name.vn/Dung.Xin.Loi.Nua.-.Erik_Min.mp3',
  image: '/img/vn/Dung.Xin.Loi.Nua.-.Erik_Min.jpg'
},
{
  name: 'Người Lạ Ơi',
  singer: 'Karik;Orange',
  time: '2018-01-06',
  path: 'https://vn01.tuandb.name.vn/Nguoi.La.Oi.-.Karik_Orange.mp3',
  image: '/img/vn/Nguoi.La.Oi.-.Karik_Orange.jpg'
},
{
  name: 'Vài Tháng Sau',
  singer: 'Jaykii',
  time: '2017-12-28',
  path: 'https://vn01.tuandb.name.vn/Vai.Thang.Sau.-.Jaykii.mp3',
  image: '/img/vn/Vai.Thang.Sau.-.Jaykii.jpg'
},
{
  name: 'Cùng Anh (VRT Mix)',
  singer: 'Ngọc Dolil;VRT',
  time: '2017-12-07',
  path: 'https://vn01.tuandb.name.vn/Cung.Anh_VRT.Mix-.Ngoc.Dolil_VRT.mp3',
  image: '/img/vn/Cung.Anh_VRT.Mix-.Ngoc.Dolil_VRT.jpg'
},
{
  name: 'Ừ Có Anh Đây',
  singer: 'Tino',
  time: '2017-11-19',
  path: 'https://vn01.tuandb.name.vn/U.Co.Anh.Day.-.Tino.mp3',
  image: '/img/vn/U.Co.Anh.Day.-.Tino.jpg'
},
{
  name: 'Chạm Khẽ Tim Anh Một Chút Thôi (KynBB Remix)',
  singer: 'Noo Phước Thịnh',
  time: '2017-11-18',
  path: 'https://vn01.tuandb.name.vn/Cham.Khe.Tim.Anh.Mot.Chut.Thoi_KynBB.Remix-.Noo.Phuoc.Thinh.mp3',
  image: '/img/vn/Cham.Khe.Tim.Anh.Mot.Chut.Thoi.-.Noo.Phuoc.Thinh.jpg'
},
{
  name: 'Thấy Là Yêu Thương',
  singer: 'OnlyC',
  time: '2017-11-18',
  path: 'https://vn01.tuandb.name.vn/Thay.La.Yeu.Thuong.-.OnlyC.mp3',
  image: '/img/vn/Thay.La.Yeu.Thuong.-.OnlyC.jpg'
},
{
  name: 'Mặt Trời Của Em',
  singer: 'Phương Ly;JustaTee',
  time: '2017-10-28',
  path: 'https://vn01.tuandb.name.vn/Mat.Troi.Cua.Em.-.Phuong.Ly_JustaTee.mp3',
  image: '/img/vn/Mat.Troi.Cua.Em.-.Phuong.Ly_JustaTee.jpg'
},
{
  name: 'Độc Ẩm (Feliks Alvin Remix)',
  singer: 'Nguyễn Kiều Anh',
  time: '2017-10-27',
  path: 'https://vn01.tuandb.name.vn/Doc.Am.-.Nguyen.Kieu.Anh_Feliks.Alvin.Remix.mp3',
  image: '/img/vn/Doc.Am.-.Nguyen.Kieu.Anh_Feliks.Alvin.Remix.jpg'
},
{
  name: 'Ta Cứ Đi Cùng Nhau',
  singer: 'Đen;Linh Cáo',
  time: '2017-09-11',
  path: 'https://vn01.tuandb.name.vn/Ta.Cu.Di.Cung.Nhau.-.Den_Linh.Cao.mp3',
  image: '/img/vn/Ta.Cu.Di.Cung.Nhau.-.Den_Linh.Cao.jpg'
},
{
  name: 'Ghen',
  singer: 'Erik;Min',
  time: '2017-05-23',
  path: 'https://vn01.tuandb.name.vn/Ghen.-.Erik_Min.mp3',
  image: '/img/vn/Ghen.-.Erik_Min.jpg'
},
{
  name: 'Nơi Này Có Anh',
  singer: 'Sơn Tùng M-TP',
  time: '2017-02-14',
  path: 'https://vn01.tuandb.name.vn/Noi.Nay.Co.Anh.-.Son.Tung.M-TP.mp3',
  image: '/img/vn/Noi.Nay.Co.Anh.-.Son.Tung.M-TP.jpg'
},
{
  name: 'Yêu 5',
  singer: 'Rhymastic',
  time: '2017-01-22',
  path: 'https://vn01.tuandb.name.vn/Yeu.5.-.Rhymastic.mp3',
  image: '/img/vn/Yeu.5.-.Rhymastic.jpg'
},
{
  name: 'Vài Lần Đón Đưa',
  singer: 'Soobin Hoàng Sơn;Touliver',
  time: '2017-01-20',
  path: 'https://vn01.tuandb.name.vn/Vai.Lan.Don.Dua.-.Soobin.Hoang.Son_Touliver.mp3',
  image: '/img/vn/Vai.Lan.Don.Dua.-.Soobin.Hoang.Son_Touliver.jpg'
},
{
  name: 'Đời Là Đi',
  singer: 'Da LAB',
  time: '2017-01-04',
  path: 'https://vn01.tuandb.name.vn/Doi.La.Di.-.Da.LAB.mp3',
  image: '/img/vn/Doi.La.Di.-.Da.LAB.jpg'
},
{
  name: 'Đi Để Trở Về',
  singer: 'Soobin Hoàng Sơn',
  time: '2017-01-02',
  path: 'https://vn01.tuandb.name.vn/Di.De.Tro.Ve.-.Soobin.Hoang.Son.mp3',
  image: '/img/vn/Di.De.Tro.Ve.-.Soobin.Hoang.Son.jpg'
},
{
  name: 'Đường Một Chiều',
  singer: 'Huỳnh Tú;Magazine',
  time: '2016-12-23',
  path: 'https://vn01.tuandb.name.vn/Duong.Mot.Chieu.-.Huynh.Tu_Magazine.mp3',
  image: '/img/vn/Duong.Mot.Chieu.-.Huynh.Tu_Magazine.jpg'
},
{
  name: 'I Belong To You Bae',
  singer: 'HUI',
  time: '2015-10-09',
  path: 'https://vn01.tuandb.name.vn/I.Belong.To.You.Bae.-.HUI.mp3',
  image: '/img/vn/I.Belong.To.You.Bae.-.HUI.jpg'
},
{//128
  name: 'Đưa Nhau Đi Trốn',
  singer: 'Đen;Linh Cáo',
  time: '2015-09-11',
  path: 'https://vn01.tuandb.name.vn/Dua.Nhau.Di.Tron.-.Den_Linh.Cao.mp3',
  image: '/img/vn/Dua.Nhau.Di.Tron.-.Den_Linh.Cao.jpg'
},
{
  name: 'Thu Cuối',
  singer: 'Yanbi;Mr.T;Hằng BingBoong',
  time: '2012-01-06',
  path: 'https://vn01.tuandb.name.vn/Thu.Cuoi.-.Yanbi_Mr.T_Hang.BingBoong.mp3',
  image: '/img/vn/Thu.Cuoi.-.Yanbi_Mr.T_Hang.BingBoong.jpg'
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
