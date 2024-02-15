window.onload = function () {
    const body = document.querySelector("body");
    const nav = document.querySelector("nav");
    const toggleList = document.querySelectorAll(".toggleSwitch");
    const toggleImg = document.querySelector(".display_mode_icon");
    const menuBtn = document.querySelector(".menu_btn");
    const menu = document.querySelector(".menu");
    const navBar = document.querySelector(".nav_bar");
    const menuLink = document.querySelectorAll(".menu_container a");
    const footer = document.querySelector("footer");

    const normalTxt = document.querySelector(".normal");
    const editorTxt = document.querySelector(".editor");
    const memo = document.querySelector("#memo");
    const memoEditor = document.querySelector(".note-editor.note-frame");
    const option = document.querySelector('.options');
    const about = document.querySelector('.about');

    const noteToolBar = document.querySelector('.note-toolbar');
    const noteToolBarBtn = noteToolBar.querySelectorAll('button');

    let txtValue = "";
    var isActive = true;

    // 다크모드
    toggleList.forEach(($toggle) => {
      $toggle.onclick = () => {
        isActive = $toggle.classList.contains("active");
        let noteEditable = document.querySelector(".note-editable");

        if (isActive) {
          $toggle.classList.remove("active");
          toggleImg.setAttribute("src", "/images/sun.png");
          body.classList.remove("dark");

          nav.classList.remove("nav_dark");

          menuBtn.classList.remove("menu_btn_dark");
          menu.classList.remove("menu_dark");
          for (item of menuLink) {
            item.classList.remove("link_dark");
          }

          option.classList.remove('option-dark');
          normalTxt.classList.remove('btn-dark');
          editorTxt.classList.remove('btn-dark');
          about.classList.remove('about-dark');

          noteToolBar.style.backgroundColor = "#f5f5f5";
          for(let i of noteToolBarBtn){
            i.style.backgroundColor = 'fff';
            i.style.color = '#333';
          }
          noteEditable.style.color = '#333';
          memo.classList.remove('memo-dark');
        } else {
          $toggle.classList.add("active");
          toggleImg.setAttribute("src", "/images/moon.png");
          body.classList.add("dark");

          nav.classList.add("nav_dark");

          menuBtn.classList.add("menu_btn_dark");
          menu.classList.add("menu_dark");
          for(item of menuLink){
            item.classList.add("link_dark");
          }

          option.classList.add('option-dark');
          normalTxt.classList.add('btn-dark');
          editorTxt.classList.add('btn-dark');
          about.classList.add('about-dark');

          noteToolBar.style.backgroundColor = "#3a3a3a";
          for(let i of noteToolBarBtn){
            i.style.backgroundColor = '#151515';
            i.style.color = '#a8a8a8';
          }
          noteEditable.style.color = '#a8a8a8';
          memo.classList.add('memo-dark');
        }
      };
    });

    normalTxt.addEventListener("click", function () {
      if (!normalTxt.classList.contains("active")) {
        normalTxt.classList.add("active");
        editorTxt.classList.remove("active");

        let noteEditable = document.querySelector(".note-editable");
        let pTag = noteEditable.querySelectorAll("p");

        txtValue = "";
        for (let i = 0; i < pTag.length; i++) {
          if (i == pTag.length - 1) {
            txtValue += pTag[i].textContent;
          } else {
            txtValue += pTag[i].textContent + "\n";
          }
        }
        console.log(txtValue);
        memo.value = txtValue;

        memo.style.display = "block";
        memoEditor.style.display = "none";
      }
    });
    editorTxt.addEventListener("click", function () {
      if (!editorTxt.classList.contains("active")) {
        let noteEditable = document.querySelector(".note-editable");
        while (noteEditable.firstChild) {
          noteEditable.removeChild(noteEditable.firstChild);
        }
        console.log("editorBnt click");

        editorTxt.classList.add("active");
        normalTxt.classList.remove("active");

        if (txtValue) {
          txtValue = memo.value
            .split("\n")
            .map((line) => `<p>${line}</p>`)
            .join("");
        }
        noteEditable.innerHTML = txtValue;
        console.log(txtValue);

        memoEditor.style.display = "block";
        memo.style.display = "none";
      }
    });

    // 페이지 로드 시 저장된 메모 불러오기
    window.onload = function () {
      loadMemo();
    };

    memo.addEventListener("input", saveMemo);
    memoEditor.addEventListener("input", saveMemo);

    function saveMemo() {
      if (normalTxt.classList.contains("active")) {
        const memoText = memo.value;
        localStorage.setItem("memo", memoText);
      } else {
        const memoEditorText = memoEditor.value;
        console.log(memoEditorText);
        let noteEditable = document.querySelector(".note-editable");
        let pTag = noteEditable.querySelectorAll("p");

        txtValue = "";
        for (let p of pTag) {
          txtValue += p.textContent + "\n";
        }

        localStorage.setItem("memo", txtValue);
      }
    }
    // 저장된 메모 불러오기
    function loadMemo() {
      const storedMemo = localStorage.getItem("memo");
      console.log(storedMemo);
      if (storedMemo) {
        const memoText = storedMemo;

        // Set the memo and memoEditor values
        memo.value = memoText;
        txtValue = memoText;
      }
    }
    loadMemo();
  };