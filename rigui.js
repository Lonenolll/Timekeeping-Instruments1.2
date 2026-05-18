const sdCanvas = document.getElementById('sundial-canvas'), sdCtx = sdCanvas.getContext('2d');
    sdCanvas.width = sdCanvas.height = 800;
    const earth = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
    function getIdx(h){ if(h>=23||h<1) return 0; if(h>=1&&h<3) return 1; if(h>=3&&h<5) return 2; if(h>=5&&h<7) return 3; if(h>=7&&h<9) return 4; if(h>=9&&h<11) return 5; if(h>=11&&h<13) return 6; if(h>=13&&h<15) return 7; if(h>=15&&h<17) return 8; if(h>=17&&h<19) return 9; if(h>=19&&h<21) return 10; return 11; }
    function drawSundial(hour){
        const cx=400,cy=400,R=340;
        sdCtx.clearRect(0,0,800,800); sdCtx.fillStyle='#0c1730'; sdCtx.beginPath(); sdCtx.arc(cx,cy,R+5,0,2*Math.PI); sdCtx.fill(); sdCtx.strokeStyle='#6f9ef0'; sdCtx.lineWidth=2; sdCtx.stroke();
        for(let i=0;i<12;i++){ let ang=(i*30-90)*Math.PI/180; let x1=cx+(R-10)*Math.cos(ang),y1=cy+(R-10)*Math.sin(ang),x2=cx+(R+12)*Math.cos(ang),y2=cy+(R+12)*Math.sin(ang); sdCtx.beginPath(); sdCtx.moveTo(x1,y1); sdCtx.lineTo(x2,y2); sdCtx.strokeStyle='#b7d4ff'; sdCtx.stroke(); let tx=cx+(R-32)*Math.cos(ang),ty=cy+(R-32)*Math.sin(ang); sdCtx.font=`500 32px "Noto Serif SC"`; sdCtx.fillStyle='#e0f0ff'; sdCtx.fillText(earth[i],tx-14,ty+8); }
        let idx=getIdx(hour), angShadow=(idx*30-90)*Math.PI/180; let ex=cx+(R-14)*Math.cos(angShadow), ey=cy+(R-14)*Math.sin(angShadow);
        sdCtx.beginPath(); sdCtx.moveTo(cx,cy); sdCtx.lineTo(ex,ey); sdCtx.lineWidth=5; sdCtx.strokeStyle='#1f2e47'; sdCtx.stroke();
        sdCtx.beginPath(); sdCtx.arc(cx,cy,10,0,2*Math.PI); sdCtx.fillStyle='#e8c48c'; sdCtx.fill();
    }
    function updateTime(){ let d=new Date(); let h=d.getHours(),m=d.getMinutes(); document.getElementById('clockText').innerText=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; let idx=getIdx(h); document.getElementById('doubleHourText').innerText=`对应十二时辰中的${earth[idx]}时`; drawSundial(h); }
    setInterval(updateTime,1000); updateTime();