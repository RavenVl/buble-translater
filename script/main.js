var mas = [];
window.onload = function () {

    document.addEventListener("mouseup", selectChanged);
    document.addEventListener("mousedown", cleanDiv);
    var div = document.getElementById("buble");

}

function selectChanged(e) {
    var selObj = window.getSelection();
    var range  = selObj.getRangeAt(0);
    var itog =range.cloneContents();
    if(itog.textContent != ''){
        var docX = e.clientX + "px";
        var docY = e.clientY + "px";
        var div = document.createElement('div');
        div.className = "alert";
        div.id="buble";
        div.style.left = docX;
        div.style.top = docY;
        var mas = getTranslate(itog.textContent);
        var out = getTraslateHtml(mas);
        div.innerHTML = out;
        document.body.appendChild(div);



        var div2 = document.getElementById("buble");
        var elements = div2.getElementsByTagName('div');

        for (let i = 0; i < elements.length; i++) {
            var input = elements[i];


            input.addEventListener("mouseover", function () {
                this.style.fontWeight=800;
                this.style.fontSize="1.2em";
                let val = mas[0]['meanings'];
                let  curImg = val[i]['image_url'];
                var contIimg = document.getElementById("slideshow_display");
                var img =contIimg.firstElementChild;
                img.src = curImg;


            });


            input.addEventListener("mouseout", function () {
                this.style.fontWeight=400;
                this.style.fontSize="1em";
            });
        }
    }

}

function cleanDiv(e) {

    var div = document.getElementById("buble");
    if(div!= null) document.body.removeChild(div);
}

function getTranslate(word){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://dictionary.skyeng.ru/api/v2/search-word-translation?text='+word, false);
    xhr.send();
    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
        // вывести результат

        return JSON.parse(xhr.responseText) //getTraslateHtml(mas);
    }
}

function getTraslateHtml (arr){
    let curImg = arr["0"].meanings["0"].image_url;
    html =`<header id="slideshow_display">
                   <img src=${curImg} alt="">
                   </header>`;
    let name = arr[0]['text'];
    html+=`<main class="rez-name">${name}</main>`;

    let val = arr[0]['meanings'];
    for(let i =0;i<val.length;i++){
        let trans = val[i]['translation'];
        if (i==0){
            html+=`<div class="active rez-mean">${trans}</div>`;
        }
        else  html+=`<div class="rez-mean">${trans}</div>`;
    }


    return html;

}
