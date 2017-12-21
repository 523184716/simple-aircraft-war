// 获取背景和飞机的位置节点以及视频和音频的节点
var bg = document.getElementById("bg")
var Left = document.getElementById("myaircraft")
var sound = document.getElementById("sound")
var shipin = document.getElementById("shipin")
console.log(bg)
// 设置定时器，每个0.1秒背景图向下移动10px，backgroundPosition主要设置这个xy的位置，图片不可能没有边界，当快
// 超出这个界限的时候，复位
var bgy = -1000;
setInterval(function() {
    if(bgy>=-10){
        bgy = -1000;
    }else {
        bgy += 10;
    }
    bg.style.backgroundPosition="0 "+bgy+"px"
},100)

// 设置键盘事件
window.document.onkeydown=function(evt) {
    // 兼容火狐和IE
    var event = evt || window.event;
    // 获取从键盘输入键的ASCII值
    switch(event.keyCode){
        // 上
        case 87:
        case 38:
            Left.style.top = Math.max(0,Left.offsetTop - 10) + "px";
            // alert(Left.style.top);
        // 下
        break;
        case 83:
        case 40:
            Left.style.top = Math.min(467,Left.offsetTop + 10) + "px";
        // 左
        break;
        case 65:
        case 37:
            Left.style.left = Math.max(0,Left.offsetLeft-10) + "px";
        break;
        // 右
        case 68:
        case 39:
            Left.style.left = Math.min(340,Left.offsetLeft+10) + "px";
        break;
        // 空格来发射子弹，定位当前飞机的位置
        case 32:
            var x = Left.offsetLeft + 30;
            var y = Left.offsetTop;
            doFire(x,y);
            // console.log(x)
        break;
    }
}

// 发射子弹，参数就是当前飞机的位置，把子弹移动到当前发射位置，然后display改为block展示，
function doFire(x,y) {
    for (i=1;i<9;i++){
        var eshot = document.getElementById("eshot"+i);
        if(eshot.style.display=="none"){
            eshot.style.left = x + "px";
            eshot.style.top = y + "px";
            eshot.style.display = "block";
            // /发射子弹的同时播放音效以及播放的时间/
            // sound.play();
            // setTimeout("sound.pause()",10000);
            // 视频播放以及设置停止的时间
            shipin.play();
            setTimeout("shipin.pause()",10000);
            return;
            //  函数直接返回，不在进行下一个循环
        }
    }
}
// 自动发射完后设置定时器自动朝上发型，同时当超出边界时复位,分机向下飞行，当两者交汇时爆炸
function buletFlight() {
    var i = 0;
    while (i < 8) {
        i++;
        var eshot = document.getElementById("eshot"+i);
        if (eshot.style.display == "block"){
            eshot.style.top = (eshot.offsetTop - 5) + "px";
            // 子弹移动，移动过程中判断是否有交汇，有的话直接发生爆炸
            docrash(eshot)
            if (eshot.offsetTop < 10) {
                eshot.style.display = "none";
                eshot.style.top = "0px";
                // console.log(eshot.style.display)
            }
        }
    }
    // 移动，敌机移动，若两者都没有碰撞，达到边界时都自动消失
    for(var i=1;i<10;i++){
        var enemy = document.getElementById("e"+i)
        if (enemy.style.display=="block"){
            enemy.style.top = enemy.offsetTop+5+"px";
            aircrash(enemy)
            if (enemy.offsetTop > 465){
                enemy.style.display="none";
            }
        }
    }
    setTimeout(buletFlight,50)
}
// setInterval(buletFlight,50)

// 生产敌机
function create_enemyair() {
    // 生产随机数，Math.random(),0-1浮点数，Math.ceil()精确的整数
    var i = Math.ceil((Math.random()*100)%9)
    var enemy = document.getElementById("e"+i)
    // 在敌机是不可见的情况下，生产出来，然后设定随机坐标,
    if(enemy.style.display=="none"){
        enemy.style.top = "10px";
        enemy.style.left = Math.ceil((Math.random()*10000)%320)+"px";
        // alert(Math.ceil((Math.random()*10000)%342))
        enemy.style.display="block";
    }
    setTimeout(create_enemyair,2000);
}

function docrash(eshot){
    for (var i=1;i<10;i++){
        var enemy = document.getElementById("e"+i);
        if (enemy.style.display=="block"){
            var eshotx = eshot.offsetLeft;
            var eshoty = eshot.offsetTop;
            var ex = enemy.offsetLeft;
            var ey = enemy.offsetTop;
            if (eshotx>ex && eshotx<(ex+76) && eshoty < (ey-25)){
                var crash = document.createElement("img");
                var imgid = "bz"+Math.ceil((Math.random()*100)%4);
                crash.src="../image/aircraft-war/boom.gif";
                crash.id = imgid
                // console.log(crash.id)
                var bzid = document.getElementById(imgid)
                console.log(bzid)
                crash.style.position = "absolute";
                crash.style.top = eshoty+"px";
                crash.style.left = eshotx+"px";
                crash.style.width = "50px";
                crash.style.height = "50px";
                crash.style.backgroundSize = "100%";
                bg.appendChild(crash);
                eshot.style.display = "none";
                enemy.style.display = "none";
                setTimeout(removeimg(bzid),50)
            }
        }
    }
}
//删除节点
function removeimg(bzid) {
    if (bzid){
        console.log(bzid)
        bg.removeChild(bzid)
    }
}

// 双方飞机相撞，游戏gameover
function aircrash(enemy) {
    var enemyx = enemy.offsetLeft +10;
    var enemyy = enemy.offsetTop ;
    var playx = Left.offsetLeft;
    var playy = Left.offsetTop;
    if (playx > enemyx && playx < (enemyx + 60) && playy < (enemyy+25) ){
        // 发生爆炸，随后弹出gameover，再次跳转到游戏起始页
        var crash = document.createElement("img");
        crash.src="../image/aircraft-war/boom.gif";
        crash.style.position = "absolute";
        crash.style.top = playy+"px";
        crash.style.left = playx+"px";
        crash.style.width = "50px";
        crash.style.height = "50px";
        crash.style.backgroundSize = "100%";
        bg.appendChild(crash);
        Left.style.display = "none";
        enemy.style.display = "none";
        setTimeout(gameover,2000)
        setTimeout(jumpstart,4000)
    }
}
function  gameover() {
    var over = document.getElementById("over")
    over.style.display="block"
}

function jumpstart() {
    window.location = "./Air_war.html"
}
buletFlight()
create_enemyair()