
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
  content.className = "content";
  //let contentInner = `<p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">X</p>`;
  //content.innerHTML = contentInner;
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
