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
// --ot01.tuandb.name.vn/11111111211111.mp3--
// --gitlab.com/3x5/temps/-/raw/a/1112111.mp3--
// --raw.githubusercontent.com/5fp/ot01/a/111111211.mp3--
//’

// {
//   name: '111111111121111111111',
//   singer: 'aaabaaaaaaaaaaaaaaa',
//   time: 'ttttttttttbt',
//   path: 'https://gitlab.com/3x5/ot01/-/raw/a/mp3/111111211111111111111.mp3',
//   image: '/img/ot/111111211111111111111.jpg'
// },

// { ////
//   name: '1111111111111111211111',
//   singer: 'aaaaaaaaaaabaaaaaaaa',
//   time: 'tttttttbtttttt',//https://ot01.tuandb.name.vn/11112111121112111111.mp3',
//   path: 'https://raw.githubusercontent.com/5fp/ot01/a/11112111121112111111.mp3',
//   image: '/img/ot/11112111121112111111.jpg'
// },


{//128
  name: 'Dj Salting Ko Paling Manis Slow',
  singer: 'DJ Topeng',
  time: '2021-11-19',
  path: 'https://ot01.tuandb.name.vn/Dj.Salting.Ko.Paling.Manis.Slow.-.DJ.Topeng.mp3',
  image: '/img/ot/Dj.Salting.Ko.Paling.Manis.Slow.-.DJ.Topeng.jpg'
},
{//128
  name: 'Taca a Xereca pra Mim',
  singer: 'MC Kaique da VP',
  time: '2021-07-29',
  path: 'https://ot01.tuandb.name.vn/Taca.a.Xereca.pra.Mim.-.MC.Kaique.da.VP.mp3',
  image: '/img/ot/Taca.a.Xereca.pra.Mim.-.MC.Kaique.da.VP.jpg'
},
{//128
  name: 'Tutututititu (Tutu)',
  singer: 'Alma Zarza;Camilo;Pedro Capó',
  time: '2021-07-04',
  path: 'https://ot01.tuandb.name.vn/Tutututititu_Tutu.-.Alma.Zarza_Camilo_Pedro.Capo.mp3',
  image: '/img/ot/Tutututititu_Tutu.-.Alma.Zarza_Camilo_Pedro.Capo.jpg'
},
{
  name: 'Simple Dimple Pop It! Squish',
  singer: 'M&A; Бэтси',
  time: '2021-06-10',
  path: 'https://ot01.tuandb.name.vn/Simple.Dimple.Pop.It_.Squish.-.M&A_---.mp3',
  image: '/img/ot/Simple.Dimple.Pop.It_.Squish.-.M&A_---.jpg'
},
{//128
  name: 'Nyanpasu Remix',
  singer: 'Renge Miyauchi',
  time: '2021-02-18',
  path: 'https://ot01.tuandb.name.vn/Nyanpasu.Remix.-.Renge.Miyauchi.mp3',
  image: '/img/ot/Nyanpasu.Remix.-.Renge.Miyauchi.jpg'
},
{//128
  name: 'De Yang Gatal Gatal Sa (EXTENDED Version)',
  singer: 'Mirriam Eka;Reza Darmawangsa',
  time: '2020-11-18',
  path: 'https://ot01.tuandb.name.vn/De.Yang.Gatal.Gatal.Sa_Bukan.PHO_EXTENDED.Version.-.Mirriam.Eka_Reza.Darmawangsa.mp3',
  image: '/img/ot/De.Yang.Gatal.Gatal.Sa_Bukan.PHO_EXTENDED.Version.-.Mirriam.Eka_Reza.Darmawangsa.jpg'
},
{//128
  name: 'De Yang Gatal Gatal Sa (Original Remix)',
  singer: 'Deasy Agaki;Aldo Bz',
  time: '2020-10-31',
  path: 'https://ot01.tuandb.name.vn/De.Yang.Gatal.Gatal.Sa_Bukan.PHO_Original.Remix.-.Bukan.PHO_Aldo.Bz_Deasy.Agaki_.mp3',
  image: '/img/ot/De.Yang.Gatal.Gatal.Sa_Bukan.PHO_Original.Remix.-.Bukan.PHO_Aldo.Bz_Deasy.Agaki_.jpg'
},
{//128
  name: 'De Yang Gatal Gatal Sa (DJ DESA Remix)',
  singer: 'Liany Panmuma;Aldo Bz',
  time: '2020-10-28',
  path: 'https://ot01.tuandb.name.vn/De.Yang.Gatal.Gatal.Sa_Bukan.PHO_DJ.DESA.Remix.-.Bukan.PHO_Liany.Panmuma_Aldo.Bz.mp3',
  image: '/img/ot/De.Yang.Gatal.Gatal.Sa_Bukan.PHO_DJ.DESA.Remix.-.Bukan.PHO_Liany.Panmuma_Aldo.Bz.jpg'
},
{//128
  name: 'De Yang Gatal Gatal Sa (Official)',
  singer: 'Liany Panmuma;Aldo Bz',
  time: '2020-02-12',
  path: 'https://ot01.tuandb.name.vn/De.Yang.Gatal.Gatal.Sa_Bukan.PHO.-._Aldo.Bz_Liany.Panmuma.mp3',
  image: '/img/ot/De.Yang.Gatal.Gatal.Sa_Bukan.PHO.-._Aldo.Bz_Liany.Panmuma.jpg'
},
{
  name: 'Hai Kerry Ma Song Dai Bor (ให้เคอรี่มาส่งได้บ่)',
  singer: 'Bell Nipada;Bính Âm Sư (拼音师)',
  time: '2019-12-19',
  path: 'https://ot01.tuandb.name.vn/Hai.Kerry.Ma.Song.Dai.Bor.Remix.-.Bell.Nipada_Binh.Am.Su.mp3',
  image: '/img/ot/Hai.Kerry.Ma.Song.Dai.Bor.Remix.-.Bell.Nipada_Binh.Am.Su.jpg'
},
{//128
  name: 'Summertime',
  singer: '麦吉_Maggie;盖盖Nyan',
  time: '2019-11-11',
  path: 'https://ot01.tuandb.name.vn/Summertime.-.Maggie_Nyan.mp3',
  image: '/img/ot/Summertime.-.Maggie_Nyan.jpg'
},
{//128
  name: 'Harehare Ya (Ngày Nắng)',
  singer: 'Kityod 猫瑾醒了吗 ',
  time: '2019-06-15',
  path: 'https://ot01.tuandb.name.vn/Harehare.Ya_Ngay.Nang.-.Kityod.mp3',
  image: '/img/ot/Harehare.Ya_Ngay.Nang.-.Kityod.jpg'
},
{
  name: 'Tokyo (Nya! arigato)',
  singer: 'Leat’eq',
  time: '2018-05-12',
  path: 'https://ot01.tuandb.name.vn/Tokyo_Nya_.arigato.-.Leateq.mp3',
  image: '/img/ot/Tokyo_Nya_.arigato.-.Leateq.jpg'
},
{
  name: 'Michino Chimoshi',
  singer: 'Chitose Morinaga',
  time: '2017-04-20',
  path: 'https://ot01.tuandb.name.vn/Michino.Chimoshi.-.Chitose.Morinaga.mp3',
  image: '/img/ot/Michino.Chimoshi.-.Chitose.Morinaga.jpg'
},
{
  name: 'Indoor Kei Nara Trackmaker',
  singer: 'Yunomi & nicamoq',
  time: '2016-08-02',
  path: 'https://ot01.tuandb.name.vn/Indoor.Kei.Nara.Trackmaker.-.Yunomi_Nicamoq.mp3',
  image: '/img/ot/Indoor.Kei.Nara.Trackmaker.-.Yunomi_Nicamoq.jpg'
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
