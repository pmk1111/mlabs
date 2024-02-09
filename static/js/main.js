
const body = document.querySelector("body");
const nav = document.querySelector("nav");

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const footer = document.querySelector("footer");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");

const searchInput = document.querySelector(".search");
const searchContainer = document.querySelector(".search_container");
const resultContainer = document.querySelector(".result_container");
const resultUl = document.querySelector(".result_ul");

const htu = document.querySelector(".how_to_use");
const htuH3 = document.querySelector(".htu_h3");
const desc = document.querySelectorAll(".step p");

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {
    isActive = $toggle.classList.contains("active");

    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "/images/sun.png");
      body.classList.remove("dark");
      body.classList.add("lite");

      nav.classList.remove("nav_dark");
      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }

      searchContainer.classList.remove("search_container_dark");
      searchInput.classList.remove("searchInput_dark");
      resultContainer.classList.remove("result_container_dark");

      htu.classList.remove("htu_dark");
      htuH3.classList.remove("htu_h3_dark");
      for(item of desc){
        item.classList.remove("p_dark");
      }

      footer.classList.remove("footer_dark");
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.remove("lite");
      body.classList.add("dark");

      nav.classList.add("nav_dark");
      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for(item of menuLink){
        item.classList.add("link_dark");
      }

      searchContainer.classList.add("search_container_dark");
      searchInput.classList.add("searchInput_dark")
      resultContainer.classList.add("result_container_dark");

      htu.classList.add("htu_dark");
      htuH3.classList.add("htu_h3_dark");
      for(item of desc){
        item.classList.add("p_dark");
      }

      footer.classList.add("footer_dark");
    }
  };
});

var isMenuOpened = false;
var isContentOpened = false;
var browserWidth = window.innerWidth;
let contentType = document.querySelectorAll(".content_type");

document.addEventListener("DOMContentLoaded", function () {
  let menuBtn = document.querySelector(".menu_btn");

  menuBtn.addEventListener("click", function () {
    let menu = document.querySelector(".menu");
    slideToggle(menu);
  });

  contentType.forEach(function(item) {
    item.addEventListener("click", function() {
      let list = item.parentNode.querySelector(".content_list");
      slideList(list);
    });
  });

});

function slideToggle(menu) {
  if (isMenuOpened) {
    menu.classList.remove("open");
    isMenuOpened = false;
  } else {
    menu.classList.add("open");
    isMenuOpened = true;
  }
}

function slideList(list){
  let span = list.parentNode.querySelector("span");
  if(isContentOpened){
    list.classList.remove("content_open");
    isContentOpened = false;
    if (window.innerWidth <= 768) {
      span.textContent = "↓";   
    }
  } else{
    list.classList.add("content_open");
    isContentOpened = true;
    if (window.innerWidth <= 768) {
      span.textContent = "↑";   
    }
  }

}

// browserWidth 변화에 따른 content arrow 추가 및 제거
function handleResize() {
  let isSpan = document.querySelector(".arrow");
  if (window.innerWidth <= 768) {
    contentType.forEach(function(item) {
      if(!isSpan){
        let arrow = document.createElement("span");
        arrow.classList.add("arrow")
        arrow.style.float = "right"
        arrow.style.paddingRight = "3px"
        arrow.textContent = "↓";   
        item.appendChild(arrow);
      }
    });
  } else{
    if(isSpan){
      contentType.forEach(function(item) {
        let arrow = item.querySelector(".arrow");
        item.removeChild(arrow);
      });
    }
  }
}

  // 초기 로딩 시에도 한 번 실행
  handleResize();
  
  // 브라우저 크기가 변할 때마다 실행
  window.addEventListener("resize", handleResize);

// 검색 결과 표시
  const noResultMessage = document.createElement("p");
  const menuContents = document.querySelectorAll(".menu_content");

  noResultMessage.classList.add("no_result_found");
  noResultMessage.textContent = "검색 결과가 없습니다.";
  noResultMessage.style.display = "none";
  noResultMessage.style.color = "rgb(166, 166, 166)"
  resultContainer.appendChild(noResultMessage);

  searchInput.addEventListener("keyup", function() {
    var keyword = this.value.trim().toLowerCase();
    resultUl.innerHTML = ""; // 기존 결과 초기화
    noResultMessage.style.display = "none"; // 검색 결과 메시지 초기화

    if (keyword !== "") {
      resultContainer.style.display = "block"; // 검색 결과가 있을 때 result_container를 표시

      menuContents.forEach(function(menuContent) {
        var contentListItems = menuContent.querySelectorAll(".content_list li a");

        contentListItems.forEach(function(item) {
          var content = item.textContent.toLowerCase();

          if (content.includes(keyword)) {
            let li = document.createElement("li");
            let contentImg = document.createElement("img");
            let goToContent = document.createElement("a");

            contentImg.classList.add("result_img");
            goToContent.classList.add("result_link");
            if(!isActive){
              goToContent.classList.add("link_text_dark");
            }

            contentImg.setAttribute("src", "images/logo.png");
            if(content === "간편 복리 계산기"){
              goToContent.setAttribute("href", "https://bokkli.netlify.app/");
            } else if(content === "공학용 계산기"){
              goToContent.setAttribute("href", "https://scientifics.netlify.app/");
            } else if(content === "로또 번호 생성하기"){
              goToContent.setAttribute("href", "https://lotto-generate.netlify.app/");
            } else if(content === "가청 주파수 테스트"){
              goToContent.setAttribute("href", "https://frequecny.netlify.app/");
            } 
            goToContent.textContent = content;
            
            li.classList.add("result_li");
            li.appendChild(contentImg);
            li.appendChild(goToContent);

            resultUl.appendChild(li);
          }
        });
      });

      if (resultUl.childElementCount === 0) {
        noResultMessage.style.display = "block"; // 일치하는 검색 결과가 없을 때 메시지 표시
      }
    } else {
      resultContainer.style.display = "none"; // 검색어가 없을 때 result_container를 숨김
    }
  });

  document.addEventListener('click', function(event) {
    let searchResultContainer = document.querySelector('.search_result_container');
  
    if (!searchResultContainer.contains(event.target)) {
      resultContainer.style.display = 'none';
    }
  });