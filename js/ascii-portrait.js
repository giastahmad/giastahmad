/**
 * ASCII Portrait — Giast Ahmad
 * -----------------------------------------------------------------------
 * Ini satu-satunya tempat art perlu ditambah/diganti — cukup tambahkan
 * variabel string baru dan masukkan ke `RAW_ART_POOL` di bawah. Semua
 * baris dalam satu art harus sama panjang (padding spasi di kanan) supaya
 * bloknya tetap persegi.
 *
 * Arsitektur:
 * - Satu <pre id="asciiPortrait"> di dalam .hero__ascii-layer (full-bleed
 *   background layer, lihat css/style.css).
 * - fitAsciiToContainer() melakukan scale "cover": art diperbesar/diperkecil
 *   secara uniform (tanpa distorsi) supaya menutupi seluruh container.
 * - Semua art di-normalize ke satu grid (baris x kolom) yang sama persis
 *   sebelum dipakai (lihat normalizeArtPool). Ini penting: karena grid-nya
 *   identik antar art, posisi newline & panjang string SELALU sama antara
 *   art sumber dan art tujuan, jadi efek scramble/decrypt bisa 1:1 per
 *   karakter tanpa pernah "loncat bentuk" duluan atau bikin baris jadi
 *   lebih panjang/pendek di tengah transisi (itu penyebab bug geser
 *   ke kiri & ukuran yang tiba-tiba mengecil/hilang).
 * - Pergantian antar art memakai efek scramble/decrypt murni: SEMUA
 *   karakter (termasuk spasi/background) diacak dari sebuah charset lalu
 *   "lock-in" ke karakter tujuan di titik acak masing-masing. Hanya
 *   newline struktural yang tidak diacak (karena posisinya sudah pasti
 *   sama di semua art setelah normalisasi) — bukan lagi spasi biasa.
 *   Efeknya: tidak ada lagi kesan "ganti foto dulu baru decrypt", karena
 *   siluet ikut terbentuk lewat proses decrypt yang sama.
 */

const ASCII_PORTRAIT = `                                         ,g@@@@@@@@@@@@g,                                           
                                        g@@@@@@@@@@@@@@@@@L,,,,,                                    
                                      ,@@@@@@@@@@@@@@@@@@@@@@@@@@g                                  
                                  ,g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g,                               
                               ,g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,                             
                             ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g                            
                            g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                           
                           g@@@@@@@@@@@@@@@@@@@@@@@M$M$$@$@@@@@@@@@@@@@@@@                          
                          ;@@@@@@@@@@@@@@@@@@@@@$$$$$$$$$%$$@@@@@@@@@@@@@@@                         
                         j@@@@@@@@@@@@@@@@@$@@M$$$$$$$$$$$$$$@@@@@@@@@@@@@@@L                       
                        g@@@@@@@@@@@@@@@$$$$$$$$$$$$ll$$$$$$$@$@@@@@@@@@@@@@@                       
                        $@@@@@@@@@@@@@@@@$$$$llllll$lllll$&$$$$@@@@@@@@@@@@@@                       
                        %@@@@@@@@@@@@@@@@@@@@@@@@@$$ll$gglg$$$$$@@@@@@@@@@@@@                       
                         $@@@@@@@@@@@@@@@@@$$$$$$$&$$@@@@MM%%@@@@@@@@@@@@@@@@                       
                         ]@@@@@@@@@@@$$@@@@@@@@@Mlll$$@lllll$$@@@@@@@@@@@@@@                        
                         ]%@@@@@@@@@@$$$@@@@@@Ml$lll$$@$T|%@@@@@$@@@@@@@@@M                         
                          $@@@@@@@@@@$$$$$$$$$$&lllll$@$$MMNNNMM$$@@@@@@F                           
                          ]@@@@@@@@@@@$$$$$$@$llllgll$$j@llllll$$$@@@@@F                            
                          ]@@@@@@@@@@@@@$@@Mll%M$l%@@@@@@@lllll$$$@@@@@L                            
                          |$@@@@@@@@@@@@@@$@$lllll$$ll$$$$llll$@$@@@@@@@                            
                           j@@@@@@@@@@@$$$$@@@MMMMMMM@@@@@&l$$$@@@@@@@@F                            
                            "%@@@@@@@@@$$$$$$$$$@$$$$@@$@|$l$$@@@@@@@@F                             
                              "%@@@@@@@@@$$$$$$$$$$$$$$@@@@$$@@@@@@@@F                              
                                %@@@@@@@@$$$$$lll$&$$$$@@@@@@@@@@@@M'                               
                                ]@@@@@@@@@$$$$$l$$$$$$$@@@@@@@@@@@"                                 
                                 $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@M                                   
                                 ]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@L                                   
                                 ]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g                                  
                                ,@@@@@@@@@@@$$$$%@@@@@@@@@@@@@@@@@@g                                
                             ,g@@@$%@@@@@@@@$$$$$$$@@@@@@@@@@@$@@@@@@g,                             
                           ;@@@@@@@$lT%@@@@@@@@@$@@@@@@@@@NN%@$@@@@@@@@@@g                          
                        ,g@@@@@@@@@@$@@||%$$$$$$@@$$$$$*  ,*',@@@@@@@@@@@@@@g,                      
                     ,g@@@@@@@@@@@@@$T||||'"%$$$$$$@F   ='   @@@@@@@@@@@@@@@@@@g,                   
                 ,g@@@@@@@@@@@@@@@@@@@|| ',gg@|,$$ggg,     ,&T]@@@@@@@@@@@@@@@@@@@@gggg,,,          
             ,gg@@@@@@@@@@@@@@@@@@@@@$$|-g@@@@@@@@@@@@@N, !||$]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@gg,    
         ,g@@@@@@@@@@@@@@@@@@@@@@@@@@||l#@@@@@@@@@@@@@@@@N'j@)@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g,
    ,gg@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|,@@M|%@@@@@@@@@@@@@@P$j@ $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 gg@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$@|||j$%@@@@@@@@@@@" 'BF ]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`;

const ASCII_ART_2 = `                                                   ,g@@@@@@@@@@g,,                                  
                                             ,,g@@@@@@@@@@@@@@@@@@@g                                
                                          ,g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@gg,                      
                                        g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g                    
                                      ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g                  
                                     g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,                
                                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g               
                                   $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@              
                                   $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@             
                                   $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@            
                                   %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@            
                                   ]$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@            
                                    '%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@             
                                      %@$$T%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*              
                                       $$$%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@M                
                                       ]@$@@@@$$%@@@$$$$%$$@@@$@@@@@@@@@@@@@@@M''                   
                                       ]$@$$l$$$$$@@$$$$$$@$@@@@@$@@@@@@@@@@@"                      
                                        $@lMWl$$$$$$$$$$$$$$$$@@$@@@@@@@@@@@F                       
                                        ]@@@g@@$@@$$$$$$$$$$$$$%@@@@MTl$$@@F                        
                                        @N%@@$@@$$$$@@@$$$$@$$$$$$@Tllll$$F                         
                                     ,g@}@$$$@@$@@$$$$$$$$$$$$@@@M@lllg$$$                          
                                   ,@@@Pj$$$@$$$@@$$$$$$$$@$@@@@l$$$M@@@@"                          
                                 ,@@@@@K %$$$$$$$@$@@@$$$$@@@$$$$$g@@@@@                            
                               ,@@@@@@@@| *$$$$$$$$$@@@@@@@$@@@$$@@@@@@@@g,                         
                            ,g@@@@@@@@@@@ ' "%$$$$@@@$$$@@@@@@@@@@@@@@@@@@@@@g,                     
                       ,,g@@@@@@@@@@@@@@@@ |,, "&$$$@@@@@@@@@@@$$$@@@@@@@@@@@@@@@@@g,,,,            
                   ,g@@@@@@@@@@@@@@@@@@@@@@     ' "%$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g,       
              ,g@@@@@@@@@@@@@@@@@@@@@@@@@@@@g    ' gg;gg@N@g*M@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g     
          g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'| 'g@@@@@@@@@@@@,]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g    
       ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   g@@@@@@@@@@@@@@1@"%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@L   
      ]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ,@N'"%@@@@@@@@@@'!% ]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g   
     ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@''   ;| ]@@@@@@@P  ||]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  | || ''g@@@@@@F  | j@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@L  
    $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  | ||L']@@@@@@@C  |L-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
   j@@@@@@@@@@@@@@@@@@@@@@@@@@@@@N@@@@@@@@@@@    ||| @@@@@@@@@- |L @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
   $@@@@@@@@@@@@@@@@@@@@@@@@@M$@@@@b&@@@@@@@@   ||$L]@@@@@@@@@@p L @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@L
  -PPPPPPPPPPPPPPPPPPPPPPPP**P**P**"P**]PPPP*'' ''*'******PPPPPP-''PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP*`;

const ASCII_ART_3 = `                                         ,;g@@@@ggg,,                                               
                                        g@@@$@@@@@@@@@@gg,                                          
                                 ,g@@@@@@@@@@@@@@@@@@@$$@@@                                         
                               g@$@@@@@@@@@@$@@@@@@@@@@@@$$@,                                       
                            ,@@@@@@@@@@@@@@@$@@@@@@@@@@@@$$@@g                                      
                          ,@@@@@@@@@@@@@@@@@@@$@@@@@@@@@@@@@@@@g                                    
                        g@@@@@$@@@@@@@@@@$@@@@@@@@@@@@@@@@@@@@@@@L                                  
                      ,@@@@@@@@@@@@@@@@@@@@@@@@@@$$$T%M%@@@@@@@@@@g                                 
                    ,g@@@@@@@@@@@@@@@@@@@@@@@@@@%$$$l$lll|%@@@@@@@@g                                
                   j@@@@@@@@@$$@@@@@@@@@@@@@@@@M$llllLll|||||%@@@@@@@                               
                  ,@@@@@@@@@@@@@@@@@@@@@@@@@@@$llL|||llLll$$@@@$@@@@@k                              
                 g@@@@@@@@@@@@@@@@@@@@@@@@@@@$l$$@$@@@@g$$$$@@&&$%@@@@                              
                ]@@@@@@@@@@@@@@@@@@@@@@@@@@@$$@@@@NN@@@@@@l$$$ggg@$@"                               
               ]@@@@@@@@@@@@@@@@@@@@@@@@@@@$@@@@$$g@@g%@M$@L||%&%N$@                                
              ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@NMl$&$l$$$$lL|l&Wk                               
              $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@MTl$$@$$l@@@@@||lL                             
             j@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$llllT|||||l|lj@@@@@@@@BFlll$,                           
             ]@@@@@@@@@@@@@@@@@@@@@@@@@@@@$$@$$$@ll||||||l$@@MMT||@@@lllj                           
              $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$$llLlll$$l@@@@@@@@l$$                          
              j@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$$$$$$$$$@@N$$g|g$l@lj                          
               $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$$$$$$%@@@@@@@@@MlllL                         
                %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$@$$$$$MTT||||l&F                         
                 %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$$$@@$$$$l$                         
                  ]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                         
                    %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g,                     
                      *N@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,                   
                         *RBNNNNB@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                  
                                   "%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@g                
                                     '$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@F%@@@@@@@@@@@@@@g              
                                       %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@L-%@@@@@@@@@@@@@@@@@gg,       
                                       $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  "%@@@@@@@@@@@@@@@@@@@@ggg, 
                                      ,@$$$@@@@@@@@@@@@@@@@@@@@@@@$@@$F    %@@@@@@@@@@@@@@@@@@@@@@@@
                                     g@@@@@@$$$@@@@@@@@@@@@@@@@@@@@@@$L '  ]@@@@@@@@@@@@@@@@@@@@@@@@
                                ,g@@@@@@@@@@@$$$$$@@@@@@@@@@@@@@@@@@$$   ,| "%$@@@@@@@@@@@@@@@@@@@@@
                           ,,,g@@@$@@@@@@@@$@@@@@@@@$$@@@@@@@@@@@$$@@'|'      '$@@@@@@@@@@@@@@@@@@@@
                       ,@@@@@@@@@@@@@@@@$@$$$$$$@@$$@@@@@$$$@@@@@@$*|g@@@@@g||,@@@@@@@@@@@@@@@@@@@@@
                  ,g@@@@@@@@@@@@@@@@@@@@@@@@@@$@$$@@@@@@@@@@@@@@$@@@@@@@@@@@@l@@@@@@@@@@@@@@@@@@@@@@
            ,,g@@@@@@@@@@@@@@@@@@@@@@@@@$@@@@@@$@@@@@@@@@@@@@@@@@@@@@@@@$$@@@@@$@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$$$$@@@@@$@@@@@@@@@@@@$$$@$$$@@@@ $@@@@@@@@@@@@@@@@@@@@@
         ]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$@@@@@@@@@@@@@@@@@@@@@@@|j@@@@@@@@@@@@@@@@@@@@@|
         @$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$@$$@@@@@@$$@@@@@@@@@$$@@@@@@L|]@@@@@$@@|||||||*%@@Mll`;

(function () {
  const layer = document.querySelector('.hero__ascii-layer');
  const pre = document.getElementById('asciiPortrait');

  // Guard: bail out silently kalau elemen atau GSAP belum siap, jangan
  // biarkan seluruh file JS berikutnya gagal jalan.
  if (!layer || !pre || typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const SCRAMBLE_CHARSET = '@$%&*#+=-.:0982inwoBSnwW';
  const CYCLE_INTERVAL_MS = 6000;
  const TRANSITION_DURATION = 1.9;

  /**
   * Menyamakan dimensi (baris x kolom) semua art di pool dengan padding
   * spasi, dipusatkan secara horizontal & vertikal per art. Setelah ini,
   * SEMUA art punya panjang string yang identik dan posisi newline yang
   * identik pula — jadi transisi antar art manapun selalu 1:1 per index,
   * tanpa perlu measure ulang / tanpa risiko baris "molor" di tengah
   * transisi (itu penyebab bug geser & hilang sesaat).
   */
  function normalizeArtPool(arts) {
    const grids = arts.map((art) => art.split('\n'));
    const maxCols = Math.max(
      ...grids.flatMap((lines) => lines.map((l) => l.length))
    );
    const maxRows = Math.max(...grids.map((lines) => lines.length));

    return grids.map((lines) => {
      const paddedLines = lines.map((line) => {
        const totalPad = maxCols - line.length;
        const left = Math.floor(totalPad / 2);
        const right = totalPad - left;
        return ' '.repeat(left) + line + ' '.repeat(right);
      });

      const rowsToAdd = maxRows - paddedLines.length;
      const top = Math.floor(rowsToAdd / 2);
      const bottom = rowsToAdd - top;
      const blankRow = ' '.repeat(maxCols);

      return [
        ...Array(top).fill(blankRow),
        ...paddedLines,
        ...Array(bottom).fill(blankRow),
      ].join('\n');
    });
  }

  const artPool = normalizeArtPool([ASCII_PORTRAIT, ASCII_ART_2, ASCII_ART_3]);

  /**
   * Scale "cover": pre diperbesar/diperkecil secara uniform (bukan resize
   * font) supaya menutupi penuh container tanpa distorsi bentuk karakter.
   * Karena semua art di `artPool` sudah punya dimensi grid yang sama
   * persis, fungsi ini cukup dipanggil sekali di awal + saat resize —
   * tidak perlu lagi dipanggil ulang tiap ganti art.
   */
  function fitAsciiToContainer(target, container) {
    target.style.transform = 'scale(1)';
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const pw = target.scrollWidth;
    const ph = target.scrollHeight;
    if (!pw || !ph) return;
    const scale = Math.max(cw / pw, ch / ph) * 0.68;
    const offsetX = Math.min(window.innerWidth * 0.03, 60);
    const offsetY = Math.min(window.innerHeight * 0.02, 20);
    target.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }

  function pickRandomExcept(pool, excludeIdx) {
    if (pool.length <= 1) return 0;
    let idx;
    do {
      idx = Math.floor(Math.random() * pool.length);
    } while (idx === excludeIdx);
    return idx;
  }

  function randomScrambleChar() {
    return SCRAMBLE_CHARSET.charAt(
      Math.floor(Math.random() * SCRAMBLE_CHARSET.length)
    );
  }

  let currentTween = null;

  /**
   * Mengganti isi `pre` dari teks sekarang menuju `nextText` dengan efek
   * scramble/decrypt: tiap karakter (termasuk spasi/background) diacak
   * dari SCRAMBLE_CHARSET sampai titik lock-in acaknya tercapai, lalu
   * menetap ke karakter tujuan. Hanya newline ('\n') yang langsung
   * diterapkan tanpa diacak — dan itu aman karena posisinya sudah pasti
   * identik antara art sumber & tujuan (lihat normalizeArtPool), jadi
   * tidak akan pernah membuat siluet "loncat" ke bentuk tujuan duluan.
   * Karakter yang kebetulan sama antara sumber & tujuan tidak diberi
   * animasi (lockPoint = 0) supaya hanya bagian yang benar-benar berubah
   * yang terlihat "decrypt".
   */
  function transitionAsciiTo(nextText, duration) {
    if (currentTween) currentTween.kill();

    const fromText = pre.textContent || nextText;
    const toText = nextText;
    const len = toText.length; // sama panjang untuk semua art (sudah dinormalisasi)

    const lockPoints = new Array(len);
    for (let i = 0; i < len; i++) {
      lockPoints[i] = fromText[i] === toText[i] ? 0 : Math.random();
    }

    const state = { progress: 0 };
    currentTween = gsap.to(state, {
      progress: 1,
      duration: duration,
      ease: 'power2.out',
      onUpdate: function () {
        let out = '';
        for (let i = 0; i < len; i++) {
          const target = toText[i];
          if (target === '\n') {
            out += target;
          } else if (state.progress >= lockPoints[i]) {
            out += target;
          } else {
            out += randomScrambleChar();
          }
        }
        pre.textContent = out;
      },
      onComplete: function () {
        pre.textContent = toText;
        currentTween = null;
      },
    });
  }

  let activeIdx = 0;

  // Render awal saat load — jangan tunggu tick pertama dari setInterval.
  pre.textContent = artPool[activeIdx];
  fitAsciiToContainer(pre, layer);

  function cycleAscii() {
    const nextIdx = pickRandomExcept(artPool, activeIdx);
    const nextText = artPool[nextIdx];

    if (prefersReducedMotion) {
      pre.textContent = nextText;
    } else {
      transitionAsciiTo(nextText, TRANSITION_DURATION);
    }
    activeIdx = nextIdx;
  }

  setInterval(cycleAscii, CYCLE_INTERVAL_MS);

  window.addEventListener('resize', function () {
    // Kalau sedang di tengah transisi, biarkan transisi selesai dulu —
    // fit ulang otomatis kepakai lagi di siklus berikutnya.
    if (!currentTween) fitAsciiToContainer(pre, layer);
  });
})();