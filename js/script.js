//font-----------------------------------------------------
(function(d) {
  var config = {
    kitId: 'eyo3zyv',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

//background-----------------------------------------------------
var nBalls = 20;
var x = new Array(nBalls);
var y = new Array(nBalls);
var vx = new Array(nBalls);
var vy = new Array(nBalls);
var rSize = new Array(nBalls);
var c = new Array(nBalls);

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    
  for(var i=0; i<nBalls; i++){
    x[i] = random(0, width)
    y[i] = random(0, height)
    vx[i] = random(-1, 1);
    vy[i] = random(-1, 1);
    rSize[i] = random(10, 40);
    c[i] = color ( random(100, 255), random(100, 255), random(100, 255));
  } 
}
function draw() {
  background(255, 255, 255);

  for(var i=0; i<nBalls; i++){
    fill(c[i]);
    ellipse(x[i], y[i], rSize[i], rSize[i]);
    noStroke();
    
    x[i] = x[i] + vx[i];     
    y[i] = y[i] + vy[i];    

    if( x[i] > width || x[i] <0 ) {
      vx[i] = -vx[i];
      c[i] = color ( random(100, 255), random(100, 255), random(100, 255));
      rSize[i] = random(10, 40);
    }
  
    if( y[i] > height || y[i] < 0){
      vy[i] = - vy[i];
      c[i] = color ( random(100, 255), random(100, 255), random(100, 255));
      rSize[i] = random(10, 40);
    }
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
}

$(document).ready(function(){
  
  //+ follow mouse rotate----------------------------------------------------------
  var plus = $('#rotate span');
  var plusX = plus.offset().left + plus.outerWidth(true) / 2;
  var plusY = plus.offset().top + plus.outerHeight(true) / 2;

  $(document).on('mousemove', function(event) {
    var rad = Math.atan2(event.pageY - plusY, event.pageX - plusX);
    plus.css('transform', 'rotate('+rad+ 'rad)');
  });

  const info = $('#about .left');
  const span = info.find('span');
  let hoverImg = $('#about figure').find('img');
  span.hover(function(){
      var name = $(this).attr('class');
      hoverImg.attr('src', `img/hover/${name}.png`);
      hoverImg.stop().fadeIn(100);
  }, function(){
      hoverImg.stop().fadeOut(100);
  });
  span.on('taphold', function(e){
    var name = $(this).attr('class');
    hoverImg.attr('src', `img/hover/${name}.png`);
    hoverImg.stop().fadeIn(100);
}, function(){
    hoverImg.stop().fadeOut(100);
});


  //modal---------------------------------------
  $('section .gomodal').click(function(){
    $(this).parent().find('.modal').fadeIn(500);
  });
  $('section .modal .modal-exit').click(function(){
    $(this).parent().parent().fadeOut(500);
  });
  

  //menu easy slide--------------------------------------------------
  const menuA = $('nav ul li a');
  const menuB = $('ul.top li a');
  $('nav ul li a, ul.top li a').click(function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    var target = (href == '#' || href == '') ? $('html') : $(href);
    $('html,body').animate({scrollTop:target.offset().top}, 500);
  });

  var total_section = 7; //전체 원페이지 수
  var current_idx = 0;
  var screen_h = $(window).height(); // 화면 높이
  var page_h = $(window).height();
  var last_y = 0; // 스크롤 마지막 하단 높이
  var onpage_on = true;
  var isScroll = false;

  init();
	
	// full page scroll------------------------------------------------
	$('#wrap').on('scroll touchmove mousewheel', function(event) {	
		
		//console.log(current_idx);

		if(last_y > $("html").scrollTop() && !onpage_on){
			
			//원페이지 스크롤 진입
			onpage_on = true;
			isScroll = false;
		}
		
		if(!onpage_on) return;
		
		//스크롤 이벤트 막기
		event.preventDefault();
		event.stopPropagation();		
		if(isScroll) return; // 현재 스크롤이 동작중이면 종료
		
		isScroll = true;		
		var direction = event.originalEvent.wheelDelta; //마우스 휠 방향
		var y = 0;

		if(direction > 0){
			// up
			current_idx --;
			if(current_idx < 0){current_idx = -1;}
			y = current_idx * page_h;
		}
		else{
			// down
			current_idx ++;
			if(current_idx > total_section){
				current_idx = total_section;
				onpage_on = false;
				return;
			}
			
			y = current_idx * page_h;		
		}

		$('html').animate({scrollTop: y}, 600, function(){isScroll=false;});	
	});

});

function init(){
	
	setHeight();
	
	total_section = $('#wrap > section').length;
	last_y = page_h * total_section;
}	

function setHeight(){
	
	// 높이 설정
	screen_h = document.body.windowHeight;
	page_h = screen_h;
	$("#wrap > section").height(page_h);
}
