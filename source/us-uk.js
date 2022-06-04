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
// --us-uk01.tuandb.name.vn/11111211111111.mp3--
// --gitlab.com/3x5/temps/-/raw/a/1111211.mp3--
// --raw.githubusercontent.com/5fp/us-uk01/a/111112111.mp3--
//’

// {
//   name: '111111112111112111111',
//   singer: 'aaaanaaaaanaaaaaaaa',
//   time: 'tttbttttbtttt',
//   path: 'https://gitlab.com/3x5/us-uk01/-/raw/a/mp3/111121111211121111111.mp3',
//   image: '/img/us-uk/111121111211121111111.jpg'
// },

// { ////
//   name: '1111211111111111112111',
//   singer: 'aaaaaannaaaaanaaaaaa',
//   time: 'ttttbttbtttttt',//https://us-uk01.tuandb.name.vn/11112111121112111111.mp3',
//   path: 'https://raw.githubusercontent.com/5fp/us-uk01/a/11112111121112111111.mp3',
//   image: '/img/us-uk/11112111121112111111.jpg'
// },


{
  name: 'Happy Loner',
  singer: 'Marina',
  time: '2021-12-03',
  path: 'https://us-uk01.tuandb.name.vn/Happy.Loner.-.Marina.mp3',
  image: '/img/us-uk/Happy.Loner.-.Marina.jpg'
},
{
  name: 'Heathens',
  singer: 'Aurora',
  time: '2021-12-03',
  path: 'https://us-uk01.tuandb.name.vn/Heathens.-.Aurora.mp3',
  image: '/img/us-uk/Heathens.-.Aurora.jpg'
},
{
  name: 'Bum Bum',
  singer: 'Bodybangers;Alex Parker;Alis Shuka',
  time: '2021-11-02',
  path: 'https://us-uk01.tuandb.name.vn/Bum.Bum.-.Bodybangers_Alex.Parker_Alis.Shuka.mp3',
  image: '/img/us-uk/Bum.Bum.-.Bodybangers_Alex.Parker_Alis.Shuka.jpg'
},
{
  name: 'Every Second',
  singer: 'Mina Okabe',
  time: '2021-05-21',
  path: 'https://us-uk01.tuandb.name.vn/Every.Second.-.Mina.Okabe.mp3',
  image: '/img/us-uk/Every.Second.-.Mina.Okabe.jpg'
},
{
  name: 'Build A Bitch',
  singer: 'Bella Poarch',
  time: '2021-05-14',
  path: 'https://us-uk01.tuandb.name.vn/Build.A.Bitch.-.Bella.Poarch.mp3',
  image: '/img/us-uk/Build.A.Bitch.-.Bella.Poarch.jpg'
},
{
  name: 'Thunder',
  singer: 'Gabry Ponte;LUM!X;Prezioso',
  time: '2021-05-07',
  path: 'https://us-uk01.tuandb.name.vn/Thunder.-.Gabry.Ponte_LUM_X_Prezioso.mp3',
  image: '/img/us-uk/Thunder.-.Gabry.Ponte_LUM_X_Prezioso.jpg'
},
{
  name: 'Kiss Me More',
  singer: 'Doja Cat;SZA',
  time: '2021-04-09',
  path: 'https://us-uk01.tuandb.name.vn/Kiss.Me.More.-.Doja.Cat_SZA.mp3',
  image: '/img/us-uk/Kiss.Me.More.-.Doja.Cat_SZA.jpg'
},
{
  name: 'Sugar Crash !',
  singer: 'ElyOtto',
  time: '2021-02-11',
  path: 'https://us-uk01.tuandb.name.vn/Sugar.Crash.-.ElyOtto.mp3',
  image: '/img/us-uk/Sugar.Crash.-.ElyOtto.jpg'
},
{//128
  name: 'Mood NightTiks',
  singer: '24kGoldn;Iann dior;Ro Ryon',
  time: '2020-12-19',
  path: 'https://us-uk01.tuandb.name.vn/Mood.NightTiks.-.24kGoldn_Iann.dior_Ro.Ryon.mp3',
  image: '/img/us-uk/Mood.NightTiks.-.24kGoldn_Iann.dior_Ro.Ryon.jpg'
},
{
  name: 'Levitating',
  singer: 'Dua Lipa',
  time: '2020-10-02',
  path: 'https://us-uk01.tuandb.name.vn/Levitating.-.Dua.Lipa.mp3',
  image: '/img/us-uk/Levitating.-.Dua.Lipa.jpg'
},
{
  name: 'At My Worst',
  singer: 'Pink Sweat$;Kehlani',
  time: '2020-09-25',
  path: 'https://us-uk01.tuandb.name.vn/At.My.Worst.-.Pink.Sweat_Kehlani.mp3',
  image: '/img/us-uk/At.My.Worst.-.Pink.Sweat_Kehlani.jpg'
},
{//128
  name: 'Lemon Tree',
  singer: 'DJ Desa',
  time: '2020-09-16',
  path: 'https://gitlab.com/3x5/ot01/-/raw/a/mp3/Lemon.Tree.-.DJ.Desa.mp3',
  image: '/img/us-uk/Lemon.Tree.-.DJ.Desa.jpg'
},
{
  name: 'Power (In Your Soul)',
  singer: 'Interupt;Luna LePage',
  time: '2020-06-04',
  path: 'https://us-uk01.tuandb.name.vn/Power_In.Your.Soul.-.Interupt_Luna.LePage.mp3',
  image: '/img/us-uk/Power_In.Your.Soul.-.Interupt_Luna.LePage.jpg'
},
{
  name: 'Savage Love',
  singer: 'Jason Derulo;Jawsh 685',
  time: '2020-05-27',
  path: 'https://us-uk01.tuandb.name.vn/Savage.Love.-.Jason.Derulo_Jawsh.685.mp3',
  image: '/img/us-uk/Savage.Love.-.Jason.Derulo_Jawsh.685.jpg'
},
{
  name: 'Normal No More',
  singer: 'TYSM',
  time: '2020-04-17',
  path: 'https://us-uk01.tuandb.name.vn/Normal.No.More.-.TYSM.mp3',
  image: '/img/us-uk/Normal.No.More.-.TYSM.jpg'
},
{
  name: 'Death Bed (Coffee For Your Head)',
  singer: 'Powfu;beabadoobee',
  time: '2020-04-02',
  path: 'https://us-uk01.tuandb.name.vn/Death.Bed_Coffee.For.Your.Head.-.Powfu_beabadoobee.mp3',
  image: '/img/us-uk/Death.Bed_Coffee.For.Your.Head.-.Powfu_beabadoobee.jpg'
},
{
  name: 'Hate You',
  singer: 'Jim Yosef;Riell Phillipos',
  time: '2020-02-28',
  path: 'https://us-uk01.tuandb.name.vn/Hate.You.-.Jim.Yosef_Riell.Phillipos.mp3',
  image: '/img/us-uk/Hate.You.-.Jim.Yosef_Riell.Phillipos.jpg'
},
{//128
  name: 'Zombie',
  singer: 'Alan Walker;Albert Vishi;Ane Flem',
  time: '2020-02-04',
  path: 'https://us-uk01.tuandb.name.vn/Zombie.-.Alan.Walker_Albert.Vishi_Ane.Flem.mp3',
  image: '/img/us-uk/Zombie.-.Alan.Walker_Albert.Vishi_Ane.Flem.jpg'
},
{
  name: 'Dance Monkey',
  singer: 'Tones And I',
  time: '2019-06-25',
  path: 'https://us-uk01.tuandb.name.vn/Dance.Monkey.-.Tones.And.I.mp3',
  image: '/img/us-uk/Dance.Monkey.-.Tones.And.I.jpg'
},
{
  name: 'Salt',
  singer: 'Ava Max',
  time: '2019-12-12',
  path: 'https://us-uk01.tuandb.name.vn/Salt.-.Ava.Max.mp3',
  image: '/img/us-uk/Salt.-.Ava.Max.jpg'
},
{
  name: 'Señorita',
  singer: 'Shawn Mendes;Camila Cabello',
  time: '2019-06-21',
  path: 'https://us-uk01.tuandb.name.vn/Senorita.-.Shawn.Mendes_Camila.Cabello.mp3',
  image: '/img/us-uk/Senorita.-.Shawn.Mendes_Camila.Cabello.jpg'
},
{
  name: 'Let Me Down Slowly',
  singer: 'Alec Benjamin;Alessia Cara',
  time: '2019-02-06',
  path: 'https://us-uk01.tuandb.name.vn/Let.Me.Down.Slowly.-.Alec.Benjamin_Alessia.Cara.mp3',
  image: '/img/us-uk/Let.Me.Down.Slowly.-.Alec.Benjamin_Alessia.Cara.jpg'
},
{
  name: 'Island',
  singer: 'SSeven Lions;Trivecta;Wooli;Nevve',
  time: '2019-01-05',
  path: 'https://us-uk01.tuandb.name.vn/Island.-.SSeven.Lions_Trivecta_Wooli_Nevve.mp3',
  image: '/img/us-uk/Island.-.SSeven.Lions_Trivecta_Wooli_Nevve.jpg'
},
{
  name: 'I Don’t Wanna Go',
  singer: 'Alan Walker',
  time: '2018-11-21',
  path: 'https://us-uk01.tuandb.name.vn/I.Dont.Wanna.Go.-.Alan.Walker.mp3',
  image: '/img/us-uk/Different.World.jpg'
},
{
  name: 'Lily',
  singer: 'Alan Walker;K-391;Emelie Hollow',
  time: '2018-12-13',
  path: 'https://us-uk01.tuandb.name.vn/Lily.-.Alan.Walker_K-391_Emelie.Hollow.mp3',
  image: '/img/us-uk/Different.World.jpg'
},
{
  name: 'Different World',
  singer: 'Alan Walker;Sofia Carson;K-391;Corsak',
  time: '2018-11-30',
  path: 'https://us-uk01.tuandb.name.vn/Different.World.-.Alan.Walker_Sofia.Carson_K-391_Corsak.mp3',
  image: '/img/us-uk/Different.World.jpg'
},
{
  name: 'Can We Kiss Forever',
  singer: 'Kina;Adriana Proenza',
  time: '2018-08-31',
  path: 'https://us-uk01.tuandb.name.vn/Can.We.Kiss.Forever.-.Kina_Adriana.Proenza.mp3',
  image: '/img/us-uk/Can.We.Kiss.Forever.-.Kina_Adriana.Proenza.jpg'
},
{
  name: 'Ignite',
  singer: 'K-391;Alan Walker;Julie Bergan;SeungRi',
  time: '2018-05-11',
  path: 'https://us-uk01.tuandb.name.vn/Ignite.-.K-391_Alan.Walker_Julie.Bergan_SeungRi.mp3',
  image: '/img/us-uk/Ignite.-.K-391_Alan.Walker_Julie.Bergan_SeungRi.jpg'
},
{
  name: '2002',
  singer: 'Anne-Marie',
  time: '2018-04-20',
  path: 'https://us-uk01.tuandb.name.vn/2002.-.Anne-Marie.mp3',
  image: '/img/us-uk/2002.-.Anne-Marie.jpg'
},
{
  name: 'Want You Back',
  singer: '5 Seconds Of Summer',
  time: '2018-02-22',
  path: 'https://us-uk01.tuandb.name.vn/Want.You.Back.-.5.Seconds.Of.Summer.mp3',
  image: '/img/us-uk/Want.You.Back.-.5.Seconds.Of.Summer.jpg'
},
{
  name: 'Stranger Things (Alan Walker Remix)',
  singer: 'Kygo;OneRepublic',
  time: '2018-02-15',
  path: 'https://us-uk01.tuandb.name.vn/Stranger.Things_Alan.Walker.Remix-.Kygo_OneRepublic.mp3',
  image: '/img/us-uk/Stranger.Things_Alan.Walker.Remix-.Kygo_OneRepublic.jpg'
},
{
  name: 'So Far Away',
  singer: 'Martin Garrix;David Guetta;Jamie Scott;Romy Dya',
  time: '2017-12-01',
  path: 'https://us-uk01.tuandb.name.vn/So.Far.Away.-.Martin.Garrix_David.Guetta_Jamie.Scott_Romy.Dya.mp3',
  image: '/img/us-uk/So.Far.Away.-.Martin.Garrix_David.Guetta_Jamie.Scott_Romy.Dya.jpg'
},
{
  name: 'Strongest (Alan Walker Remix)',
  singer: 'Ina Wroldsen',
  time: '2017-12-01',
  path: 'https://us-uk01.tuandb.name.vn/Strongest_Alan.Walker.Remix-.Ina.Wroldsen.mp3',
  image: '/img/us-uk/Strongest_Alan.Walker.Remix-.Ina.Wroldsen.jpg'
},
{
  name: 'The River',
  singer: 'Axel Johansson;Tina Stachowiak',
  time: '2017-11-28',
  path: 'https://us-uk01.tuandb.name.vn/The.River.-.Axel.Johansson_Tina.Stachowiak.mp3',
  image: '/img/us-uk/The.River.-.Axel.Johansson_Tina.Stachowiak.jpg'
},
{
  name: 'Wrap Me In Plastic',
  singer: 'Chromance',
  time: '2017-10-27',
  path: 'https://us-uk01.tuandb.name.vn/Wrap.Me.In.Plastic.-.Chromance.mp3',
  image: '/img/us-uk/Wrap.Me.In.Plastic.-.Chromance.jpg'
},
{
  name: 'Wolves',
  singer: 'Selena Gomez;Marshmello',
  time: '2017-10-25',
  path: 'https://us-uk01.tuandb.name.vn/Wolves.-.Selena.Gomez_Marshmello.mp3',
  image: '/img/us-uk/Wolves.-.Selena.Gomez_Marshmello.jpg'
},
{
  name: 'Rendezvous',
  singer: 'DEAMN',
  time: '2017-10-13',
  path: 'https://us-uk01.tuandb.name.vn/Rendezvous.-.DEAMN.mp3',
  image: '/img/us-uk/Rendezvous.-.DEAMN.jpg'
},
{
  name: 'Collide',
  singer: 'Vicetone;Rosi Golan',
  time: '2017-08-11',
  path: 'https://us-uk01.tuandb.name.vn/Collide.-.Vicetone_Rosi.Golan.mp3',
  image: '/img/us-uk/Collide.-.Vicetone_Rosi.Golan.jpg'
},
{
  name: 'Havana',
  singer: 'Camilla Cabello;Young Thug',
  time: '2017-08-03',
  path: 'https://us-uk01.tuandb.name.vn/Havana.-.Camilla.Cabello_Young.Thug.mp3',
  image: '/img/us-uk/Havana.-.Camilla.Cabello_Young.Thug.jpg'
},
{
  name: 'More Than You Know',
  singer: 'Axwell Λ Ingrosso',
  time: '2017-06-13',
  path: 'https://us-uk01.tuandb.name.vn/More.Than.You.Know.-.Axwell_Ingrosso.mp3',
  image: '/img/us-uk/More.Than.You.Know.-.Axwell_Ingrosso.jpg'
},
{
  name: 'Symphony',
  singer: 'Clean Bandit;Zara Larsson',
  time: '2017-03-17',
  path: 'https://us-uk01.tuandb.name.vn/Symphony.-.Clean.Bandit_Zara.Larsson.mp3',
  image: '/img/us-uk/Symphony.-.Clean.Bandit_Zara.Larsson.jpg'
},
{
  name: 'Believer',
  singer: 'Imagine Dragons',
  time: '2017-03-07',
  path: 'https://us-uk01.tuandb.name.vn/Believer.-.Imagine.Dragons.mp3',
  image: '/img/us-uk/Believer.-.Imagine.Dragons.jpg'
},
{
  name: 'Scared To Be Lonely',
  singer: 'Martin Garrix;Dua Lipa',
  time: '2017-01-27',
  path: 'https://us-uk01.tuandb.name.vn/Scared.To.Be.Lonely.-.Martin.Garrix_Dua.Lipa.mp3',
  image: '/img/us-uk/Scared.To.Be.Lonely.-.Martin.Garrix_Dua.Lipa.jpg'
},
{
  name: 'Despacito',
  singer: 'Luis Fonsi;Daddy Yankee',
  time: '2017-01-13',
  path: 'https://us-uk01.tuandb.name.vn/Despacito.-.Luis.Fonsi_Daddy.Yankee.mp3',
  image: '/img/us-uk/Despacito.-.Luis.Fonsi_Daddy.Yankee.jpg'
},
{
  name: 'That Girl',
  singer: 'Olly Murs',
  time: '2016-11-11',
  path: 'https://us-uk01.tuandb.name.vn/That.Girl.-.Olly.Murs.mp3',
  image: '/img/us-uk/That.Girl.-.Olly.Murs.jpg'
},
{
  name: 'Move Your Body',
  singer: 'Sia',
  time: '2016-10-21',
  path: 'https://us-uk01.tuandb.name.vn/Move.Your.Body.-.Sia.mp3',
  image: '/img/us-uk/Move.Your.Body.-.Sia.jpg'
},
{
  name: 'Let Me Love You',
  singer: 'DJ Snake;Justin Bieber',
  time: '2016-08-05',
  path: 'https://us-uk01.tuandb.name.vn/Let.Me.Love.You.-.DJ.Snake_Justin.Bieber.mp3',
  image: '/img/us-uk/Let.Me.Love.You.-.DJ.Snake_Justin.Bieber.jpg'
},
{
  name: 'Nevada',
  singer: 'Vicetone;Cozi Zuehlsdorff',
  time: '2016-06-26',
  path: 'https://us-uk01.tuandb.name.vn/Nevada.-.Vicetone_Cozi.Zuehlsdorff.mp3',
  image: '/img/us-uk/Nevada.-.Vicetone_Cozi.Zuehlsdorff.jpg'
},
{
  name: 'Sing Me To Sleep',
  singer: 'Alan Walker',
  time: '2016-06-03',
  path: 'https://us-uk01.tuandb.name.vn/Sing.Me.To.Sleep.-.Alan.Walker.mp3',
  image: '/img/us-uk/Sing.Me.To.Sleep.-.Alan.Walker.jpg'
},
{
  name: 'The Ocean',
  singer: 'Mike Perry;Shy Martin',
  time: '2016-04-15',
  path: 'https://us-uk01.tuandb.name.vn/The.Ocean.-.Mike.Perry_Shy.Martin.mp3',
  image: '/img/us-uk/The.Ocean.-.Mike.Perry_Shy.Martin.jpg'
},
{
  name: 'You Don’t Know Me',
  singer: 'Ofenbach;Brodie Barclay',
  time: '2015-11-27',
  path: 'https://us-uk01.tuandb.name.vn/You.Dont.Know.Me.-.Ofenbach_Brodie.Barclay.mp3',
  image: '/img/us-uk/You.Dont.Know.Me.-.Ofenbach_Brodie.Barclay.jpg'
},
{
  name: 'Play Date',
  singer: 'Melanie Martinez',
  time: '2015-08-14',
  path: 'https://us-uk01.tuandb.name.vn/Play.Date.-.Melanie.Martinez.mp3',
  image: '/img/us-uk/Play.Date.-.Melanie.Martinez.jpg'
},
{//128
  name: 'Never Look Back',
  singer: 'Djerem',
  time: '2015-07-06',
  path: 'https://us-uk01.tuandb.name.vn/Never.Look.Back.-.Djerem.mp3',
  image: '/img/us-uk/Never.Look.Back.-.Djerem.jpg'
},
{
  name: 'Reality',
  singer: 'Lost Frequencies;Janieck Devy',
  time: '2015-05-28',
  path: 'https://us-uk01.tuandb.name.vn/Reality.-.Lost.Frequencies_Janieck.Devy.mp3',
  image: '/img/us-uk/Reality.-.Lost.Frequencies_Janieck.Devy.jpg'
},
{
  name: 'Monster',
  singer: 'Boondox',
  time: '2014-06-18',
  path: 'https://us-uk01.tuandb.name.vn/Monster.-.Boondox.mp3',
  image: '/img/us-uk/Monster.-.Boondox.jpg'
},
{
  name: 'Dancin (Krono Remix)',
  singer: 'Aaron Smith;Luvli',
  time: '2013-04-15',
  path: 'https://us-uk01.tuandb.name.vn/Dancin_Krono.Remix.-.Aaron.Smith_Luvli.mp3',
  image: '/img/us-uk/Dancin_Krono.Remix.-.Aaron.Smith_Luvli.jpg'
},
{
  name: 'A Little Love',
  singer: 'Fiona Fung',
  time: '2008-11-20',
  path: 'https://us-uk01.tuandb.name.vn/A.Little.Love.-.Fiona.Fung.mp3',
  image: '/img/us-uk/A.Little.Love.-.Fiona.Fung.jpg'
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
