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
// --kr01.tuandb.name.vn/11111121111111.mp3--
// --gitlab.com/3x5/temps/-/raw/a/1111211.mp3--
// --raw.githubusercontent.com/5fp/kr01/a/111112111.mp3--
//’

// {
//   name: '111111111121111111111',
//   singer: 'aaaaaaanaaanaaaaaa',
//   time: 'tntttbttttttt',
//   path: 'https://gitlab.com/3x5/kr01/-/raw/a/mp3/111111111211111111111.mp3',
//   image: '/img/kr/111111111211111111111.jpg'
// },

// { ////
//   name: '1111111111121111111111',
//   singer: 'aaaanaaaaaaanaaaaaa',
//   time: 'ttttbtbtttttntt',//https://vn01.tuandb.name.vn/11112111121112111111.mp3',
//   path: 'https://raw.githubusercontent.com/5fp/kr01/a/11112111121112111111.mp3',
//   image: '/img/kr/11112111121112111111.jpg'
// },


{
  name: 'Drama',
  singer: 'IU',
  time: '2021-12-29',
  path: 'https://kr01.tuandb.name.vn/Drama.-.IU.mp3',
  image: '/img/kr/Drama.-.IU.jpg'
},
{
  name: 'G999',
  singer: 'MoonByul;Mirani',
  time: '2021-12-13',
  path: 'https://kr01.tuandb.name.vn/G999.-.MoonByul_Mirani.mp3',
  image: '/img/kr/G999.-.MoonByul_Mirani.jpg'
},
{
  name: 'Eleven',
  singer: 'IVE (아이브)',
  time: '2021-12-01',
  path: 'https://kr01.tuandb.name.vn/Eleven.-.IVE_aibeu.mp3',
  image: '/img/kr/Eleven.-.IVE_aibeu.jpg'
},
{
  name: 'FOMO',
  singer: 'Hwasa',
  time: '2021-11-24',
  path: 'https://kr01.tuandb.name.vn/FOMO.-.Hwasa.mp3',
  image: '/img/kr/FOMO.-.Hwasa.jpg'
},
{
  name: 'I’m a B',
  singer: 'Hwasa',
  time: '2021-11-24',
  path: 'https://kr01.tuandb.name.vn/Im.a.B.-.Hwasa.mp3',
  image: '/img/kr/FOMO.-.Hwasa.jpg'
},
{
  name: 'Make You Dance',
  singer: 'Adora;Eunha',
  time: '2021-11-05',
  path: 'https://kr01.tuandb.name.vn/Make.You.Dance.-.Adora_Eunha.mp3',
  image: '/img/kr/Make.You.Dance.-.Adora_Eunha.jpg'
},
{
  name: 'Kiss Kiss',
  singer: 'Laboum',
  time: '2021-11-03',
  path: 'https://kr01.tuandb.name.vn/Kiss.Kiss.-.Laboum.mp3',
  image: '/img/kr/Kiss.Kiss.-.Laboum.jpg'
},
{
  name: 'Anymore',
  singer: 'Jeon Somi',
  time: '2021-10-29',
  path: 'https://kr01.tuandb.name.vn/Anymore.-.Jeon.Somi.mp3',
  image: '/img/kr/XOXO.-.Jeon.Somi.jpg'
},
{
  name: 'Don’t Let Me Go',
  singer: 'Jeon Somi;Giriboy',
  time: '2021-10-29',
  path: 'https://kr01.tuandb.name.vn/Dont.Let.Me.Go.-.Jeon.Somi_Giriboy.mp3',
  image: '/img/kr/XOXO.-.Jeon.Somi.jpg'
},
{
  name: 'XOXO',
  singer: 'Jeon Somi',
  time: '2021-10-29',
  path: 'https://kr01.tuandb.name.vn/XOXO.-.Jeon.Somi.mp3',
  image: '/img/kr/XOXO.-.Jeon.Somi.jpg'
},
{
  name: 'Strawberry Moon',
  singer: 'IU',
  time: '2021-10-18',
  path: 'https://kr01.tuandb.name.vn/Strawberry.Moon.-.IU.mp3',
  image: '/img/kr/Strawberry.Moon.-.IU.jpg'
},
{
  name: 'Savage',
  singer: 'aespa',
  time: '2021-10-05',
  path: 'https://kr01.tuandb.name.vn/Savage.-.aespa.mp3',
  image: '/img/kr/Savage.-.aespa.jpg'
},
{
  name: 'The Feels',
  singer: 'Twice',
  time: '2021-10-01',
  path: 'https://kr01.tuandb.name.vn/The.Feels.-.Twice.mp3',
  image: '/img/kr/The.Feels.-.Twice.jpg'
},
{
  name: 'Loco',
  singer: 'ITZY',
  time: '2021-09-24',
  path: 'https://kr01.tuandb.name.vn/Loco.-.ITZY.mp3',
  image: '/img/kr/Loco.-.ITZY.jpg'
},
{
  name: 'Money',
  singer: 'Lisa',
  time: '2021-09-23',
  path: 'https://kr01.tuandb.name.vn/Money.-.Lisa.mp3',
  image: '/img/kr/Money.-.Lisa.jpg'
},
{
  name: 'ON & ON',
  singer: '보라미유 (Boramiyu);Aster;Neo',
  time: '2021-09-20',
  path: 'https://kr01.tuandb.name.vn/ON_ON.-.Boramiyu_Aster_Neo.mp3',
  image: '/img/kr/ON_ON.-.Boramiyu_Aster_Neo.jpg'
},
{
  name: 'Mumumumuch',
  singer: 'Mamamoo',
  time: '2021-09-15',
  path: 'https://kr01.tuandb.name.vn/Mumumumuch.-.Mamamoo.mp3',
  image: '/img/kr/Mumumumuch.-.Mamamoo.jpg'
},
{
  name: 'Lalisa',
  singer: 'Lisa',
  time: '2021-09-10',
  path: 'https://kr01.tuandb.name.vn/Lalisa.-.Lisa.mp3',
  image: '/img/kr/Lalisa.-.Lisa.jpg'
},
{
  name: 'Ping Pong',
  singer: 'HyunA;Dawn',
  time: '2021-09-09',
  path: 'https://kr01.tuandb.name.vn/Ping.Pong.-.HyunA_Dawn.mp3',
  image: '/img/kr/Ping.Pong.-.HyunA_Dawn.jpg'
},
{
  name: 'Queendom',
  singer: 'Red Velvet',
  time: '2021-08-16',
  path: 'https://kr01.tuandb.name.vn/Queendom.-.Red.Velvet.mp3',
  image: '/img/kr/Queendom.-.Red.Velvet.jpg'
},
{
  name: 'Dumb Dumb',
  singer: 'Jeon Somi',
  time: '2021-08-02',
  path: 'https://kr01.tuandb.name.vn/Dumb.Dumb.-.Jeon.Somi.mp3',
  image: '/img/kr/Dumb.Dumb.-.Jeon.Somi.jpg'
},
{
  name: 'PTT (Paint The Town)',
  singer: 'Loona',
  time: '2021-06-28',
  path: 'https://kr01.tuandb.name.vn/PTT._Paint.The.Town.-.Loona.mp3',
  image: '/img/kr/PTT._Paint.The.Town.-.Loona.jpg'
},
{
  name: 'Chi Mat Ba Ram (치맛바람)',
  singer: 'Brave Girls',
  time: '2021-06-17',
  path: 'https://kr01.tuandb.name.vn/Chi.Mat.Ba.Ram.-.Brave.Girls.mp3',
  image: '/img/kr/Brave.Girls.-.Summer.Queen.jpg'
},
{
  name: 'First',
  singer: 'Everglow',
  time: '2021-05-25',
  path: 'https://kr01.tuandb.name.vn/First.-.Everglow.mp3',
  image: '/img/kr/First.-.Everglow.jpg'
},
{
  name: 'Happen',
  singer: 'Heize',
  time: '2021-05-20',
  path: 'https://kr01.tuandb.name.vn/Happen.-.Heize.mp3',
  image: '/img/kr/Happen.-.Heize.jpg'
},
{
  name: 'Next Level',
  singer: 'aespa',
  time: '2021-05-17',
  path: 'https://kr01.tuandb.name.vn/Next.Level.-.Aespa.mp3',
  image: '/img/kr/Next.Level.-.Aespa.jpg'
},
{
  name: 'In The Morning',
  singer: 'ITZY',
  time: '2021-04-30',
  path: 'https://kr01.tuandb.name.vn/In.The.Morning.-.ITZY.mp3',
  image: '/img/kr/In.The.Morning.-.ITZY.jpg'
},
{
  name: 'Lilac',
  singer: 'IU',
  time: '2021-03-25',
  path: 'https://kr01.tuandb.name.vn/Lilac.-.IU.mp3',
  image: '/img/kr/Lilac.-.IU.jpg'
},
{
  name: 'On The Ground',
  singer: 'Rosé',
  time: '2021-03-12',
  path: 'https://kr01.tuandb.name.vn/On.The.Ground.-.Rose.mp3',
  image: '/img/kr/On.The.Ground.-.Rose.jpg'
},
{
  name: 'Celebrity',
  singer: 'IU',
  time: '2021-01-27',
  path: 'https://kr01.tuandb.name.vn/Celebrity.-.IU.mp3',
  image: '/img/kr/Celebrity.-.IU.jpg'
},
{
  name: 'Black Mamba',
  singer: 'aespa',
  time: '2020-11-17',
  path: 'https://kr01.tuandb.name.vn/Black.Mamba.-.Aespa.mp3',
  image: '/img/kr/Black.Mamba.-.Aespa.jpg'
},
{
  name: 'Beginning (Tầng lớp Itaewon OST)',
  singer: 'Gaho',
  time: '2020-12-02',
  path: 'https://kr01.tuandb.name.vn/Beginning.-.Gaho.mp3',
  image: '/img/kr/Beginning.-.Gaho.jpg'
},
{
  name: 'Crazy Over You',
  singer: 'BlackPink',
  time: '2020-10-02',
  path: 'https://kr01.tuandb.name.vn/Crazy.Over.You.-.BlackPink.mp3',
  image: '/img/kr/Crazy.Over.You.-.BlackPink.jpg'
},
{
  name: 'Lovesick Girls',
  singer: 'BlackPink',
  time: '2020-10-02',
  path: 'https://kr01.tuandb.name.vn/Lovesick.Girls.-.BlackPink.mp3',
  image: '/img/kr/Lovesick.Girls.-.BlackPink.jpg'
},
{
  name: 'Pretty Savage',
  singer: 'BlackPink',
  time: '2020-10-02',
  path: 'https://kr01.tuandb.name.vn/Pretty.Savage.-.BlackPink.mp3',
  image: '/img/kr/Pretty.Savage.-.BlackPink.jpg'
},
{
  name: 'La Di Da',
  singer: 'Everglow',
  time: '2020-09-21',
  path: 'https://kr01.tuandb.name.vn/La.Di.Da.-.Everglow.mp3',
  image: '/img/kr/La.Di.Da.-.Everglow.jpg'
},
{
  name: 'Feel Good (Secret Code)',
  singer: 'Fromis_9',
  time: '2020-09-16',
  path: 'https://kr01.tuandb.name.vn/Feel.Good._Secret.Code.-.fromis_9.mp3',
  image: '/img/kr/Feel.Good._Secret.Code.-.fromis_9.jpg'
},
{
  name: 'Wanna Be Myself',
  singer: 'Mamamoo',
  time: '2020-09-10',
  path: 'https://kr01.tuandb.name.vn/Wanna.Be.Myself.-.Mamamoo.mp3',
  image: '/img/kr/Wanna.Be.Myself.-.Mamamoo.jpg'
},
{
  name: 'Bon Voyage',
  singer: 'YooA',
  time: '2020-09-07',
  path: 'https://kr01.tuandb.name.vn/Bon.Voyage.-.YooA.mp3',
  image: '/img/kr/Bon.Voyage.-.YooA.jpg'
},
{
  name: 'Helicopter',
  singer: 'CLC',
  time: '2020-09-02',
  path: 'https://kr01.tuandb.name.vn/Helicopter.-.CLC.mp3',
  image: '/img/kr/Helicopter.-.CLC.jpg'
},
{
  name: 'BOCA',
  singer: 'Dreamcatcher',
  time: '2020-08-17',
  path: 'https://kr01.tuandb.name.vn/BOCA.-.Dreamcatcher.mp3',
  image: '/img/kr/BOCA.-.Dreamcatcher.jpg'
},
{
  name: 'Not Shy',
  singer: 'ITZY',
  time: '2020-08-17',
  path: 'https://kr01.tuandb.name.vn/Not.Shy.-.ITZY.mp3',
  image: '/img/kr/Not.Shy.-.ITZY.jpg'
},
{
  name: 'DUMDi DUMDi',
  singer: '(G)I-DLE',
  time: '2020-08-03',
  path: 'https://kr01.tuandb.name.vn/DUMDi.DUMDi.-._GI-DLE.mp3',
  image: '/img/kr/DUMDi.DUMDi.-._GI-DLE.jpg'
},
{
  name: 'What You Waiting For',
  singer: 'Jeon Somi',
  time: '2020-07-22',
  path: 'https://kr01.tuandb.name.vn/What.You.Waiting.For.-.Jeon.Somi.mp3',
  image: '/img/kr/What.You.Waiting.For.-.Jeon.Somi.jpg'
},
{
  name: 'Maria',
  singer: 'Hwa Sa',
  time: '2020-06-29',
  path: 'https://kr01.tuandb.name.vn/Maria.-.Hwa.Sa.mp3',
  image: '/img/kr/Maria.-.Hwa.Sa.jpg'
},
{
  name: 'How You Like That',
  singer: 'BlackPink',
  time: '2020-06-26',
  path: 'https://kr01.tuandb.name.vn/How.You.Like.That.-.BlackPink.mp3',
  image: '/img/kr/How.You.Like.That.-.BlackPink.jpg'
},
{
  name: 'Dolphin',
  singer: 'Oh My Girl',
  time: '2020-04-27',
  path: 'https://kr01.tuandb.name.vn/Dolphin.-.Oh.My.Girl.mp3',
  image: '/img/kr/Dolphin.-.Oh.My.Girl.jpg'
},
{
  name: 'Nonstop',
  singer: 'Oh My Girl',
  time: '2020-04-27',
  path: 'https://kr01.tuandb.name.vn/Nonstop.-.Oh.My.Girl.mp3',
  image: '/img/kr/Nonstop.-.Oh.My.Girl.jpg'
},
{
  name: 'Dumhdurum',
  singer: 'Apink',
  time: '2020-04-13',
  path: 'https://kr01.tuandb.name.vn/Dumhdurum.-.Apink.mp3',
  image: '/img/kr/Dumhdurum.-.Apink.jpg'
},
{
  name: 'Wannabe',
  singer: 'ITZY',
  time: '2020-03-09',
  path: 'https://kr01.tuandb.name.vn/Wannabe.-.ITZY.mp3',
  image: '/img/kr/Wannabe.-.ITZY.jpg'
},
{
  name: 'Scream',
  singer: 'Dreamcatcher',
  time: '2020-02-18',
  path: 'https://kr01.tuandb.name.vn/Scream.-.Dreamcatcher.mp3',
  image: '/img/kr/Scream.-.Dreamcatcher.jpg'
},
{
  name: 'So What',
  singer: 'Loona',
  time: '2020-02-05',
  path: 'https://kr01.tuandb.name.vn/So.What.-.Loona.mp3',
  image: '/img/kr/So.What.-.Loona.jpg'
},
{
  name: 'Dun Dun',
  singer: 'Everglow',
  time: '2020-02-03',
  path: 'https://kr01.tuandb.name.vn/Dun.Dun.-.Everglow.mp3',
  image: '/img/kr/Dun.Dun.-.Everglow.jpg'
},
{
  name: 'Sunset (Hạ Cánh Nơi Anh OST)',
  singer: 'Davichi',
  time: '2019-12-29',
  path: 'https://kr01.tuandb.name.vn/Sunset.-.Davichi.mp3',
  image: '/img/kr/Sunset.-.Davichi.jpg'
},
{
  name: 'Psycho',
  singer: 'Red Velvet',
  time: '2019-12-23',
  path: 'https://kr01.tuandb.name.vn/Psycho.-.Red.Velvet.mp3',
  image: '/img/kr/Psycho.-.Red.Velvet.jpg'
},
{
  name: 'Blueming',
  singer: 'IU',
  time: '2019-11-18',
  path: 'https://kr01.tuandb.name.vn/Blueming.-.IU.mp3',
  image: '/img/kr/Blueming.-.IU.jpg'
},
{
  name: 'HIP',
  singer: 'Mamamoo',
  time: '2019-11-14',
  path: 'https://kr01.tuandb.name.vn/Hip.-.Mamamoo.mp3',
  image: '/img/kr/Hip.-.Mamamoo.jpg'
},
{
  name: 'Devil',
  singer: 'CLC',
  time: '2019-09-06',
  path: 'https://kr01.tuandb.name.vn/Devil.-.CLC.mp3',
  image: '/img/kr/Devil.-.CLC.jpg'
},
{
  name: 'Adios',
  singer: 'Everglow',
  time: '2019-08-19',
  path: 'https://kr01.tuandb.name.vn/Adios.-.Everglow.mp3',
  image: '/img/kr/Adios.-.Everglow.jpg'
},
{
  name: 'Cherry',
  singer: 'ITZY',
  time: '2019-07-29',
  path: 'https://kr01.tuandb.name.vn/Cherry.-.ITZY.mp3',
  image: '/img/kr/Icy.-.ITZY.jpg'
},
{
  name: 'Icy',
  singer: 'ITZY',
  time: '2019-07-28',
  path: 'https://kr01.tuandb.name.vn/Icy.-.ITZY.mp3',
  image: '/img/kr/Icy.-.ITZY.jpg'
},
{
  name: 'Gleam',
  singer: 'Mamamoo',
  time: '2019-07-24',
  path: 'https://kr01.tuandb.name.vn/Gleam.-.Mamamoo.mp3',
  image: '/img/kr/Gleam.-.Mamamoo.jpg'
},
{
  name: 'Uh-Oh',
  singer: '(G)I-DLE',
  time: '2019-06-26',
  path: 'https://kr01.tuandb.name.vn/Uh-Oh.-._GI-DLE.mp3',
  image: '/img/kr/Uh-Oh.-._GI-DLE.jpg'
},
{
  name: 'Snapping',
  singer: 'Chung ha',
  time: '2019-06-24',
  path: 'https://kr01.tuandb.name.vn/Snapping.-.Chung.ha.mp3',
  image: '/img/kr/Snapping.-.Chung.ha.jpg'
},
{
  name: 'Zimzalabim',
  singer: 'Red Velvet',
  time: '2019-06-19',
  path: 'https://kr01.tuandb.name.vn/Zimzalabim.-.Red.Velvet.mp3',
  image: '/img/kr/Zimzalabim.-.Red.Velvet.jpg'
},
{
  name: 'Breakthrough',
  singer: 'Twice',
  time: '2019-06-12',
  path: 'https://kr01.tuandb.name.vn/Breakthrough.-.Twice.mp3',
  image: '/img/kr/Breakthrough.-.Twice.jpg'
},
{
  name: 'Me (美)',
  singer: 'CLC',
  time: '2019-05-29',
  path: 'https://kr01.tuandb.name.vn/Me._mi.-.CLC.mp3',
  image: '/img/kr/Me._mi.-.CLC.jpg'
},
{
  name: 'Me & You',
  singer: 'EXID',
  time: '2019-05-14',
  path: 'https://kr01.tuandb.name.vn/Me.and.You.-.EXID.mp3',
  image: '/img/kr/Me.and.You.-.EXID.jpg'
},
{
  name: 'Boy With Luv',
  singer: 'BTS;Halsey',
  time: '2019-04-12',
  path: 'https://kr01.tuandb.name.vn/Boy.With.Luv.-.BTS_Halsey.mp3',
  image: '/img/kr/Boy.With.Luv.-.BTS_Halsey.jpg'
},
{
  name: 'Kill This Love',
  singer: 'BlackPink',
  time: '2019-04-04',
  path: 'https://kr01.tuandb.name.vn/Kill.This.Love.-.Blackpink.mp3',
  image: '/img/kr/Kill.This.Love.-.Blackpink.jpg'
},
{
  name: 'I’m So Hot',
  singer: 'Momoland',
  time: '2019-03-20',
  path: 'https://kr01.tuandb.name.vn/Im.So.Hot.-.Momoland.mp3',
  image: '/img/kr/Im.So.Hot.-.Momoland.jpg'
},
{
  name: 'gogobebe',
  singer: 'Mamamoo',
  time: '2019-03-14',
  path: 'https://kr01.tuandb.name.vn/gogobebe.-.Mamamoo.mp3',
  image: '/img/kr/gogobebe.-.Mamamoo.jpg'
},
{
  name: 'Dalla Dalla',
  singer: 'ITZY',
  time: '2019-02-12',
  path: 'https://kr01.tuandb.name.vn/Dalla.Dalla.-.ITZY.mp3',
  image: '/img/kr/Dalla.Dalla.-.ITZY.jpg'
},
{
  name: 'La La Love',
  singer: 'WJSN',
  time: '2019-01-08',
  path: 'https://kr01.tuandb.name.vn/La.La.Love.-.WJSN.mp3',
  image: '/img/kr/La.La.Love.-.WJSN.jpg'
},
{
  name: '%% (Eung Eung)',
  singer: 'Apink',
  time: '2019-01-07',
  path: 'https://kr01.tuandb.name.vn/Eung.Eung.-.Apink.mp3',
  image: '/img/kr/Eung.Eung.-.Apink.jpg'
},
{
  name: 'Way Back Home',
  singer: 'SHAUN',
  time: '2018-12-21',
  path: 'https://kr01.tuandb.name.vn/Way.Back.Home.-.SHAUN.mp3',
  image: '/img/kr/Way.Back.Home.-.SHAUN.jpg'
},
{
  name: 'I Love You',
  singer: 'EXID',
  time: '2018-11-21',
  path: 'https://kr01.tuandb.name.vn/I.Love.You.-.EXID.mp3',
  image: '/img/kr/I.Love.You.-.EXID.jpg'
},
{
  name: 'Wind Flower',
  singer: 'Mamamoo',
  time: '2018-11-19',
  path: 'https://kr01.tuandb.name.vn/Wind.Flower.-.Mamamoo.mp3',
  image: '/img/kr/Wind.Flower.-.Mamamoo.jpg'
},
{
  name: 'Solo',
  singer: 'Jennie',
  time: '2018-11-12',
  path: 'https://kr01.tuandb.name.vn/Solo.-.Jennie.mp3',
  image: '/img/kr/Solo.-.Jennie.jpg'
},
{
  name: 'Bbibbi',
  singer: 'IU',
  time: '2018-10-10',
  path: 'https://kr01.tuandb.name.vn/Bbibbi.-.IU.mp3',
  image: '/img/kr/Bbibbi.-.IU.jpg'
},
{
  name: 'Siren',
  singer: 'Sunmi',
  time: '2018-09-04',
  path: 'https://kr01.tuandb.name.vn/Siren.-.Sunmi.mp3',
  image: '/img/kr/Siren.-.Sunmi.jpg'
},
{
  name: 'Hann (Alone)',
  singer: '(G)I-DLE',
  time: '2018-08-14',
  path: 'https://kr01.tuandb.name.vn/Hann._Alone.-._GI-DLE.mp3',
  image: '/img/kr/Hann._Alone.-._GI-DLE.jpg'
},
{
  name: 'Egotistic',
  singer: 'Mamamoo',
  time: '2018-07-16',
  path: 'https://kr01.tuandb.name.vn/Egotistic.-.Mamamoo.mp3',
  image: '/img/kr/Egotistic.-.Mamamoo.jpg'
},
{
  name: 'I’m So Sick',
  singer: 'Apink',
  time: '2018-07-02',
  path: 'https://kr01.tuandb.name.vn/Im.So.Sick.-.Apink.mp3',
  image: '/img/kr/Im.So.Sick.-.Apink.jpg'
},
{
  name: 'BAAM',
  singer: 'Momoland',
  time: '2018-06-26',
  path: 'https://kr01.tuandb.name.vn/BAAM.-.Momoland.mp3',
  image: '/img/kr/BAAM.-.Momoland.jpg'
},
{
  name: 'Ddu-Du Ddu-Du',
  singer: 'Blackpink',
  time: '2018-06-15',
  path: 'https://kr01.tuandb.name.vn/Ddu-Du.Ddu-Du.-.Blackpink.mp3',
  image: '/img/kr/Ddu-Du.Ddu-Du.-.Blackpink.jpg'
},
{
  name: 'Latata',
  singer: '(G)I-DLE',
  time: '2018-05-02',
  path: 'https://kr01.tuandb.name.vn/Latata.-._GI-DLE.mp3',
  image: '/img/kr/Latata.-._GI-DLE.jpg'
},
{
  name: 'Lady',
  singer: 'EXID',
  time: '2018-04-02',
  path: 'https://kr01.tuandb.name.vn/Lady.-.EXID.mp3',
  image: '/img/kr/Lady.-.EXID.jpg'
},
{
  name: 'Egoist',
  singer: 'Loona',
  time: '2018-03-30',
  path: 'https://kr01.tuandb.name.vn/Egoist.-.Loona.mp3',
  image: '/img/kr/Egoist.-.Loona.jpg'
},
{
  name: 'Starry Night',
  singer: 'Mamamoo',
  time: '2018-03-07',
  path: 'https://kr01.tuandb.name.vn/Starry.Night.-.Mamamoo.mp3',
  image: '/img/kr/Starry.Night.-.Mamamoo.jpg'
},
{
  name: 'Black Dress',
  singer: 'CLC',
  time: '2018-02-22',
  path: 'https://kr01.tuandb.name.vn/Black.Dress.-.CLC.mp3',
  image: '/img/kr/Black.Dress.-.CLC.jpg'
},
{
  name: 'Heroine',
  singer: 'Sunmi',
  time: '2018-01-18',
  path: 'https://kr01.tuandb.name.vn/Heroine.-.Sunmi.mp3',
  image: '/img/kr/Heroine.-.Sunmi.jpg'
},
{
  name: 'Bboom Bboom',
  singer: 'Momoland',
  time: '2018-01-03',
  path: 'https://kr01.tuandb.name.vn/Bboom.Bboom.-.Momoland.mp3',
  image: '/img/kr/Bboom.Bboom.-.Momoland.jpg'
},
{
  name: 'Autumn Morning',
  singer: 'IU',
  time: '2017-09-19',
  path: 'https://kr01.tuandb.name.vn/Autumn.Morning.-.IU.mp3',
  image: '/img/kr/Autumn.Morning.-.IU.jpg'
},
{
  name: 'Gashina',
  singer: 'Sunmi',
  time: '2017-08-22',
  path: 'https://kr01.tuandb.name.vn/Gashina.-.Sunmi.mp3',
  image: '/img/kr/Siren.-.Sunmi.jpg'
},
{
  name: 'As If It’s Your Last',
  singer: 'Blackpink',
  time: '2017-06-22',
  path: 'https://kr01.tuandb.name.vn/As.If.Its.Your.Last.-.Blackpink.mp3',
  image: '/img/kr/As.If.Its.Your.Last.-.Blackpink.jpg'
},
{
  name: 'Rollin’',
  singer: 'Brave Girls',
  time: '2017-03-22',
  path: 'https://kr01.tuandb.name.vn/Rollin.-.Brave.Girls.mp3',
  image: '/img/kr/Rollin.-.Brave.Girls.jpg'
},
{
  name: 'Playing With Fire',
  singer: 'Blackpink',
  time: '2016-10-31',
  path: 'https://kr01.tuandb.name.vn/Playing.With.Fire.-.Blackpink.mp3',
  image: '/img/kr/Playing.With.Fire.-.Blackpink.jpg'
},
{
  name: 'Say Yes (Người Tình Ánh Trăng OST)',
  singer: 'Loco;Punch',
  time: '2016-08-29',
  path: 'https://kr01.tuandb.name.vn/Say.Yes.-.Loco_Punch.mp3',
  image: '/img/kr/Say.Yes.-.Loco_Punch.jpg'
},
{
  name: 'Cheer Up (산다는 건)',
  singer: 'Hong Jin Young',
  time: '2014-11-06',
  path: 'https://kr01.tuandb.name.vn/Cheer.Up._sandaneun.geon.-.Hong.Jin.Young.mp3',
  image: '/img/kr/Cheer.Up._sandaneun.geon.-.Hong.Jin.Young.jpg'
},
{//128
  name: 'Kiyomi Song (귀요미송)',
  singer: 'Hari (하리)',
  time: '2013-03-28',
  path: 'https://kr01.tuandb.name.vn/Kiyomi.Song._gwiyomisong.-.Hari._hali.mp3',
  image: '/img/kr/Kiyomi.Song._gwiyomisong.-.Hari._hali.jpg'
},
{
  name: 'Cry Cry',
  singer: 'T-Ara',
  time: '2011-11-09',
  path: 'https://kr01.tuandb.name.vn/Cry.Cry.-.T-Ara.mp3',
  image: '/img/kr/Cry.Cry.-.T-Ara.jpg'
},
{
  name: 'I Am The Best',
  singer: '2NE1',
  time: '2011-06-28',
  path: 'https://kr01.tuandb.name.vn/I.Am.The.Best.-.2NE1.mp3',
  image: '/img/kr/I.Am.The.Best.-.2NE1.jpg'
},
{
  name: 'Gee',
  singer: 'Girls’ Generation',
  time: '2009-06-08',
  path: 'https://kr01.tuandb.name.vn/Gee.-.Girls.Generation.mp3',
  image: '/img/kr/Gee.-.Girls.Generation.jpg'
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
