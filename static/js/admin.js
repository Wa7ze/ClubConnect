let btn = document.getElementById("burger");
let menu = document.getElementById("sidebar");
let unv = document.querySelectorAll(".unv");
let burger_cont = document.getElementById("burger-cont");
let courses = document.getElementById("courses");
let course = document.querySelectorAll(".course");
let left = document.getElementById("left");
let scroll_down = document.getElementById("scroll");
let fix_width = document.getElementById("fix-width");

btn.addEventListener('click',()=>{
    
    menu.classList.toggle('active');
    menu.classList.toggle('nothing');
    burger_cont.classList.toggle('move');
    unv.forEach(e =>{
      e.classList.toggle('op')
    });
       
});


  menu.addEventListener('mouseover',()=>{
    if(menu.classList.contains('sidebar')){
      if(menu.classList.contains('active')){
    menu.classList.remove('active');
    burger_cont.classList.remove('move');
    unv.forEach(e =>{
      e.classList.remove('op')
    });
  }}
  });
    menu.addEventListener('mouseout',()=>{
    if(menu.classList.contains('sidebar')){
      if(menu.classList.contains('nothing')){
    menu.classList.add('active');
    burger_cont.classList.add('move');
      unv.forEach(e =>{
        e.classList.add('op')
      });
      }}
  });


courses.addEventListener('click',()=>{
    
  left.classList.toggle("down");
  course.forEach(e =>{
    e.classList.toggle('show')
  });
  scroll_down.classList.toggle('overflow');
  fix_width.classList.toggle('bigger');
  courses.classList.toggle('color');
   
});




