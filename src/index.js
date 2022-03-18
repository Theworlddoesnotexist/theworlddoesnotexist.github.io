
let app = document.getElementById("app");

const secctions = ["Portafolio", "Sobre mi", "Proyectos", "Contactame"];

//Nav
let nav = document.createElement("div");
nav.className = "nav";

for (let i = 0; i < secctions.length; i++) {
  let li = document.createElement("a");
  li.classList.add("nav-list");
  li.setAttribute("href", `#tab-${secctions[i].replace(/\s/g, "")}`);
  li.textContent = secctions[i];
  li.addEventListener("click", function () {
    app.querySelector(".nav .active").classList.remove("active");
    li.classList.add("active");
  });
  if (i == 0) {
    li.classList.add("active");
  }
  nav.appendChild(li);
}

app.appendChild(nav);

//Main
let container = document.createElement("main");
container.className = "container";

const domParser = async (proyect) => {
  let url = `https://raw.githubusercontent.com/Theworlddoesnotexist/${proyect}/main/`;
  const urlHtml = url + `index.html`;
  const resHtml = await fetch(urlHtml);
  const html = await resHtml.text();
  //console.log(html)
  const urlCss = url + `src/style.css`;
  let resCss = await fetch(urlCss);
  let styleString = await resCss.text();
  //
  //console.log(styleString)
  const urlJs = url + `src/script.js`;
  let resJs = await fetch(urlJs);
  let jsString = await resJs.text();
  //console.log(jsString)

  const doc = new DOMParser();
  var doc3 = doc.parseFromString(html, "text/html");
  //Style div
  const styleSecction = doc3.createElement("style");
  styleSecction.innerHTML = styleString;
  doc3.head.append(styleSecction);
  //Js div
  const jsSecction = doc3.createElement("script");
  jsSecction.innerHTML = jsString;
  doc3.body.append(jsSecction);
  console.log(doc3.documentElement.innerHTML);
  //app.srcdoc = doc3.documentElement.innerHTML;
  let app = document.getElementById(`${proyect}`);
  app.srcdoc = doc3.documentElement.innerHTML;
};

//main

for (let i = 0; i < secctions.length; i++) {
  let secction = document.createElement("secction");
  if (i == 0) {
    secction.innerHTML = `<h1>${secctions[i]}</h1>
    <h3>Something about ${secctions[i]}</h3>`;
  }
  if (i == 2) {
    secction.innerHTML = ``;
  }
  if (i == 1) {
    secction.innerHTML = `<h1>${secctions[i]}</h1>
                          <p>Soy un programador de 21 años, sin experiencia laboral</p>
                          <h2>Conocimientos</h2>
                          <ul>Fronted:
                          <li>Html-Css</li>
                          <li>Diseño responsivo</li>
                          Backend:
                          <li>Javascript</li>
                          <li>Node</li>
                          <li>RestApi</li>
                          Utilidades
                          <li>Github</li>
                          <li>Fundamentos de Programación</li>
                          </ul>`;
  }
  //secction.innerHTML = innerSection;
  secction.classList.add("secction-slide");
  secction.id = `tab-${secctions[i].replace(/\s/g, "")}`;
  container.appendChild(secction);
}
app.appendChild(container);

//Proyects display and swipe

const wrapperSwiper = document.createElement("div");
wrapperSwiper.className = "swiper-container";

const proyectDiv = document.createElement("div");
proyectDiv.className = "swiper-wrapper";
const proyects = ["weatherApp", "newsWebsite", "Algorithms"];

for (let i = 0; i < proyects.length; i++) {
  let iframeContainer = document.createElement("div");
  iframeContainer.className = "iframeContainer";
  let iframe = document.createElement("iframe");
  iframeContainer.classList.add("swiper-slide");
  iframe.id = proyects[i];
  iframe.className = "iframe-list";

  let content = document.createElement("div");
  content.className = "iconGit";
  content.setAttribute('data-swiper-parallax','-30%');
  content.setAttribute('data-swiper-parallax-scale','.7')
  //let contentInner = `<p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">X</p>`;
  let contentInner = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
  content.innerHTML = contentInner;
  content.addEventListener("click", function(){
     window.open(proyects[i].link, '_blank');})
  iframe.appendChild(content);
  iframeContainer.appendChild(iframe);
  iframeContainer.appendChild(content);
  proyectDiv.appendChild(iframeContainer);
  domParser(proyects[i]);
}

wrapperSwiper.appendChild(proyectDiv);

//
const swiperPagination = document.createElement("div");
swiperPagination.className = "";
const paginationInner = `<div class="swiper-button-prev"></div>
 <div class="swiper-button-next"></div>`;
swiperPagination.innerHTML = paginationInner;
//

wrapperSwiper.appendChild(swiperPagination);

//document.getElementById("tab-Projectos").innerHTML = ``;
document.getElementById(`tab-${secctions[2]}`).appendChild(wrapperSwiper);

var swiper = new Swiper(".swiper-container", {
  grabCursor: true,
  speed: 800,
  centeredSlides: true,
  freeMode: true,
  slidesPerView: 2,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false
  },
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
        800: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      }

});
