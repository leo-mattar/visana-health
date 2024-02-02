gsap.registerPlugin(ScrollTrigger);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

// --- GLOBAL - RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- PAGES
let landingPage = document.querySelector("[landing-page]");
let learningCenter = document.querySelector("[learning-center]");

// --- SLIDERS START ---
function testimonialsSlider() {
  // TESTIMONIALS SLIDER
  let swiperReviews = new Swiper(".swiper.reviews", {
    speed: 400,
    autoHeight: true,
    simulateTouch: false,
    navigation: {
      nextEl: ".swiper-next.reviews",
      prevEl: ".swiper-prev.reviews",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
}

function visanaSlide() {
  // VISANA'S CARE MODEL THUMB SLIDER
  let swiperHealthcareThumb = new Swiper(".swiper.healthcare-thumb", {
    speed: 400,
    simulateTouch: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });

  let swiperHealthcare = new Swiper(".swiper.healthcare", {
    // VISANA'S CARE MODEL CONTENT SLIDER
    speed: 400,
    simulateTouch: false,
    navigation: {
      nextEl: ".swiper-next.healthcare",
      prevEl: ".swiper-prev.healthcare",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: {
      swiper: swiperHealthcareThumb,
    },
  });

  let slideCount = $(".swiper-slide.healthcare").length;
  $("[sliderLength]").text(slideCount);

  swiperHealthcare.on("slideChange", function (e) {
    let slideNumber = e.realIndex + 1;
    $("[sliderCurrentIndex]").text(slideNumber);
  });
}
// --- SLIDERS END ---

// --- MARQUEE
function marquee() {
  $("[marquee-left]").each(function () {
    let marqueeList = $(this).find(".c-marquee-list");

    let tl = gsap.timeline({ repeat: -1 });

    tl.to(marqueeList, { xPercent: -100, ease: "none", duration: 70 });
  });

  $("[marquee-right]").each(function () {
    let marqueeList = $(this).find(".c-marquee-list");

    let tl = gsap.timeline({ repeat: -1 });

    tl.to(marqueeList, { xPercent: 100, ease: "none", duration: 70 });
  });
}

// --- TABBER
function tabber() {
  let allItems = $(".c-tab");

  function openItem(currentItem) {
    let tab = currentItem;
    let tabContent = currentItem.find(".c-tab-content");
    let tabPhoto = currentItem.find(".c-img-contain.tab");

    let tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.to(tab, { width: "100%", backgroundColor: "#F3EEFF" });
    tl.to(tabContent, { opacity: 1 }, 0);
    tl.to(tabPhoto, { scale: 1 }, 0);

    let otherItems = allItems.not(currentItem);
    let tab2 = otherItems;
    let tabContent2 = otherItems.find(".c-tab-content");
    let tabPhoto2 = otherItems.find(".c-img-contain.tab");

    tl.to(
      tab2,
      { width: "0%", backgroundColor: "rgba(155, 132, 210, 0.7)" },
      0
    );
    tl.to(tabContent2, { opacity: 0.6 }, 0);
    tl.to(tabPhoto2, { scale: 0.7 }, 0);
  }

  openItem(allItems.first());

  allItems.on("click", function () {
    openItem($(this));
  });
}

// --- TEAM PANEL
function teamPanel() {
  $(".c-team-item").each(function () {
    let panel = $(this).find(".c-team-panel");
    let panelTrigger = $(this).find(".c-team-link");
    let panelOverlay = $(this).find(".c-team-panel-overlay");
    let panelClose = $(this).find(".c-team-panel-close");
    let panelTriggerIcon = $(this).find(".c-icon.team");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut", duration: 0.8 },
    });

    tl.to(panel, { x: "0%" });
    tl.to(panelOverlay, { autoAlpha: 1 }, 0);
    tl.to(panelTriggerIcon, { rotate: 135 }, 0);

    panelTrigger.on("click", function () {
      lenis.stop();
      tl.restart();
    });

    panelClose.on("click", function () {
      lenis.start();
      tl.reverse();
    });

    panelOverlay.on("click", function () {
      panelClose.click();
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        panelClose.click();
      }
    });
  });
}

// --- BUTTONS HOVER
function buttonHover() {
  let button = $(".c-btn");

  button.each(function () {
    let buttonArrow = $(this).find(".c-btn-arrow");
    let buttonBackground = $(this).find(".c-btn-arrow-bg");
    let buttonText = $(this).find(".c-btn-txt");
    let buttonIcon = $(this).find(".c-icon.btn-arrow");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut", duration: 0.8 },
    });

    tl.set(buttonArrow, { autoAlpha: 1 });
    tl.set(buttonIcon, { x: "-200%", autoAlpha: 0 });

    tl.to($(this), { backgroundColor: "#C9BEE3" });
    tl.to(buttonArrow, { x: "0.75em" }, 0);
    tl.to(buttonText, { x: "-0.75em" }, 0);
    tl.to(buttonBackground, { scale: 1 }, 0);
    tl.to(buttonIcon, { x: "0%", autoAlpha: 1 }, 0);

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// --- NAV DROPDOWN - DESKTOP
function headerDropdownDesktop() {
  $(".c-dd-link").each(function () {
    let dropdownList = $(this).find(".c-dd-list");
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.inOut" },
    });

    let ddLinkTxt = $(this).find(".c-dd-link_top .t-body-3");

    gsap.set(dropdownList, { display: "flex", visibility: "hidden" });

    tl.to(dropdownList, { autoAlpha: 1, y: 8 });
    tl.to($(this).find(".c-icon.dd-arrow"), { rotation: 180 }, 0);

    $(this).on("click", function () {
      $(".c-dd-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    $(document).mouseup(function (e) {
      if ($(e.target).closest(".c-dd-link").length === 0) {
        $(".c-dd-link.is-open").click();
      }
    });
  });
}

// --- NAV DROPDOWN - MOBILE
function headerDropdownMobile() {
  $(".c-dd-link").each(function () {
    let dropdownList = $(this).find(".c-dd-list");
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.inOut" },
    });

    gsap.set(dropdownList, { height: 0 });

    tl.to(dropdownList, { height: "auto", marginTop: 16 });
    tl.to($(this).find(".c-icon.dd-arrow"), { rotation: 180 }, 0);

    $(this).on("click", function () {
      $(".c-dd-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    $(document).mouseup(function (e) {
      if ($(e.target).closest(".c-dd-link").length === 0) {
        $(".c-dd-link.is-open").click();
      }
    });
  });
}

// --- HOMEPAGE - LOAD
function loader() {
  let heroLeft = $("[hm-load-left]");
  let heroImg2 = $(".c-img-contain.hm-hero-2");
  let heroImg1 = $(".c-img-contain.hm-hero-1");

  let tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

  tl.set(heroLeft, { yPercent: 30 });

  tl.to(heroLeft, { yPercent: 0, autoAlpha: 1 });

  tl.fromTo(
    heroImg2,
    { clipPath: "inset(50% round 1.5em)" },
    { clipPath: "inset(0% round 1.5em)" },
    "<0.2"
  );

  tl.fromTo(
    heroImg1,
    { clipPath: "inset(50% round 1.5em)" },
    { clipPath: "inset(0% round 1.5em)" },
    "<0.4"
  );
}

// --- HEADER - MOBILE

function headerMobile() {
  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power4.inOut", duration: 1 },
  });

  let navButton = $(".c-nav-btn");
  let header = $(".c-header_center");

  tl.to(header, { clipPath: "inset(0% 0% 0% 0%)" });
  tl.to(".c-nav-icon-bar.is-1", { rotate: -45, y: 2 }, 0);
  tl.to(".c-nav-icon-bar.is-2", { rotate: 45, y: -4 }, 0);

  navButton.on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      lenis.stop();
      tl.restart();
    } else {
      lenis.start();
      tl.reverse();
    }
  });

  if (!landingPage) {
    $(".c-btn-wrap.contact").appendTo(".c-header-nav");
    $(".c-btn-wrap.contact").css("display", "flex");
  }
}

// --- ACCORDION
function accordion() {
  $(".c-accordion").each(function () {
    let accordion = $(this);
    let accordionContent = $(this).find(".c-accordion_bt");
    let accordionIcon = $(this).find(".c-accordion-icon");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut", duration: 0.8 },
    });

    gsap.set(accordionContent, { height: 0 });

    tl.to(accordionContent, { height: "auto" });
    tl.to(accordionIcon, { rotate: 45 }, 0);
    tl.to(accordion, { opacity: 1 }, 0);

    accordion.on("click", function () {
      $(".c-accordion.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });

  $(".c-accordion").eq(0).click();
}

// --- LEARNING CENTER - FILTER ACCORDION
function learningAccordion() {
  $("[c-blog-sidebar-item]").each(function () {
    let accordion = $(this);
    let accordionTrigger = $(this).find("[c-blog-sidebar-item-trigger]");
    let accordionContent = $(this).find("[c-blog-sidebar-item-content]");
    let accordionIcon = $(this).find("[filter-arrow]");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut", duration: 0.8 },
    });

    gsap.set(accordionContent, { height: 0 });

    tl.to(accordionContent, { height: "auto" });
    tl.to(accordionIcon, { rotate: 180 }, 0);
    tl.to(accordion, { opacity: 1 }, 0);

    accordionTrigger.on("click", function () {
      $(this).parent().toggleClass("is-open");
      if ($(this).parent().hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });

  $(".c-blog-sidebar-item-trigger").click();
}

// --- LEARNING CENTER - FILTER ACTIVE STATE
function filterActiveState() {
  $(".c-blog-radio-field").each(function () {
    $(this).on("click", function () {
      $(".c-blog-radio-field").removeClass("is-active");
      $(this).addClass("is-active");
    });
  });
}

// --- LEARNING CENTER - FILTER SETTINGS
function filterSettings() {
  $(".c-blog-radio-field, .c-blog-checkbox-field").on("click", function () {
    lenis.scrollTo(".c-scroll-position", { offset: -132 });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });
}

// --- LEARNING CENTER - FILTERS MOBILE
function filtersMobile() {
  $(".c-blog-sidebar-mobile-trigger").on("click", function () {
    $(".c-blog-sidebar").toggleClass("is-open");
    if ($(".c-blog-sidebar").hasClass("is-open")) {
      $("[filter-icon-open]").css("display", "none");
      $("[filter-icon-close]").css("display", "block");
      lenis.stop();
    } else {
      $("[filter-icon-open]").css("display", "block");
      $("[filter-icon-close]").css("display", "none");
      lenis.start();
    }
  });
}

// --- PATIENT LANDINGS - TOP BAR MENU
function barMenu() {
  let bar = $(".o-row.bar");
  let barIcon = $(".c-icon.bar");
  let barTrigger = $(".c-bar_lt");
  let barMenu = $(".c-bar-menu");
  let barMenuItem = $(".c-bar-menu-link");
  let barMenuCTA = $(".c-bar-menu-cta");
  let barMenuClose = $(".c-bar-menu-close");
  let barOverlay = $(".o-row.bar .c-team-panel-overlay");

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "expo.inOut", duration: 1 },
  });

  gsap.set(barMenu, {
    clipPath: "inset(0% 99% 99% 0% round 1em)",
    autoAlpha: 1,
  });
  gsap.set(barMenuItem, { yPercent: 200, autoAlpha: 0 });
  gsap.set(barMenuCTA, { yPercent: 200, autoAlpha: 0 });

  tl.to(barIcon, { rotation: 180 });
  tl.to(barOverlay, { autoAlpha: 1 }, 0);
  tl.to(barMenu, { clipPath: "inset(0% 0% 0% 0% round 1em)", autoAlpha: 1 }, 0);
  tl.to(barMenuItem, { yPercent: 0, autoAlpha: 1, stagger: 0.05 }, 0);
  tl.to(barMenuCTA, { yPercent: 0, autoAlpha: 1 }, "<0.4");

  barTrigger.on("click", function () {
    tl.timeScale(1);
    tl.restart();
    barOverlay.css("pointer-events", "auto");
    lenis.stop();
  });

  barMenuClose.on("click", function () {
    tl.timeScale(1);
    tl.reverse();
    barOverlay.css("pointer-events", "none");
    lenis.start();
  });

  barMenuItem.on("click", function () {
    barMenuClose.click();
  });

  barOverlay.on("click", function () {
    barMenuClose.click();
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      barMenuClose.click();
    }
  });

  // Menu Numbers
  $("[bar-menu-index]").each(function (index) {
    $(this).text(index + 1);
  });
}

function barMenuMobile() {
  // Menu Numbers
  $("[bar-menu-index]").each(function (index) {
    $(this).text(index + 1);
  });

  $(".c-bar-menu").appendTo(".c-header_center.lp");

  $(".c-bar-menu-link").on("click", function () {
    $(".c-nav-btn").click();
  });
}

// --- PATIENT LANDINGS - CONDITIONS ACCORDION
function conditionAccordion() {
  $(".c-lp-condition-item").each(function () {
    let conditionLink = $(this);
    let conditionIcon = $(this).find(".c-icon.team");
    let conditionContent = $(this).find(".c-lp-condition-item-desc");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut", duration: 0.8 },
    });

    gsap.set(conditionLink, { backgroundColor: "rgba(243, 238, 255, 0)" });

    tl.to(conditionLink, {
      backgroundColor: "#f3eeff",
    });
    tl.to(conditionIcon, { rotate: 45 }, 0);
    tl.to(conditionContent, { height: "auto" }, 0);

    conditionLink.on("click", function () {
      $(".c-lp-condition-item.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}

// --- PATIENT LANDINGS - SYMPTOMS SLIDER
function symptomsSlider() {
  let swiperSymptoms = new Swiper(".swiper.symp", {
    slidesPerView: "auto",
    spaceBetween: "24",
    speed: 400,
    slideToClickedSlide: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-next.symp",
      prevEl: ".swiper-prev.symp",
    },
    breakpoints: {
      320: {
        spaceBetween: "16",
        slidesPerView: "1.25",
      },
      992: {
        spaceBetween: "24",
        slidesPerView: "auto",
      },
    },
  });

  let symptomsTitle = $(".c-symp-title");

  mm.add("(min-width: 992px)", function (matches) {
    if (matches) {
      swiperSymptoms.on("slideChange", function () {
        if (swiperSymptoms.activeIndex === 0) {
          symptomsTitle.css("opacity", "1");
        } else {
          symptomsTitle.css("opacity", "0");
        }
      });
    }
  });
}

// PATIENT LANDINGS --- LOADER
function patientLoader() {
  let wrapper = $(".o-page-wrapper");

  gsap.set(wrapper, { autoAlpha: 0 });

  let tl = gsap.timeline({
    defaults: { ease: "expo.out", duration: 1.2 },
  });

  tl.to(wrapper, { autoAlpha: 1 });
}

function patientBenefitsSlider() {
  let swiperBenefits = null;
  let swiperBenefitsVisual = null;

  function initSwipers() {
    swiperBenefits = new Swiper(".swiper.benefits", {
      slidesPerView: "auto",
    });

    swiperBenefitsVisual = new Swiper(".swiper.benefits-visual", {
      slidesPerView: 1,
      speed: 400,
      simulateTouch: false,
      navigation: {
        nextEl: ".swiper-next.benefits",
        prevEl: ".swiper-prev.benefits",
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      thumbs: {
        swiper: swiperBenefits,
      },
    });
  }

  function destroySwipers() {
    if (swiperBenefits && swiperBenefitsVisual) {
      swiperBenefits.destroy();
      swiperBenefitsVisual.destroy();
      swiperBenefits = null;
      swiperBenefitsVisual = null;
    }
  }

  function handleResize() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 992) {
      if (!swiperBenefits || !swiperBenefitsVisual) {
        initSwipers();
      }
    } else {
      destroySwipers();
    }
  }

  // Initial setup
  handleResize();

  // Add event listener for window resize
  window.addEventListener("resize", handleResize);
}

//
///
//

// --- MATCHMEDIA
let mm = gsap.matchMedia();

// --- INIT
window.addEventListener("DOMContentLoaded", (event) => {
  testimonialsSlider();
  visanaSlide();
  marquee();
  teamPanel();
  loader();
  accordion();
  if (learningCenter) {
    learningAccordion();
    filterActiveState();
  }
  if (landingPage) {
    conditionAccordion();

    patientLoader();
  }
  if ($(".swiper.symp").is(":visible")) {
    symptomsSlider();
  }

  if ($(".swiper.benefits-visual").is(":visible")) {
    patientBenefitsSlider();
  }
});

// DESKTOP
mm.add("(min-width: 992px)", () => {
  buttonHover();
  headerDropdownDesktop();
  tabber();
  if (learningCenter) {
    filterSettings();
    setTimeout(() => {
      buttonHover();
    }, 1000);
  }
  if (landingPage) {
    barMenu();
  }
  return () => {
    $(".c-tab").unbind();
    $(".c-dd-link").unbind();
    $(".c-dd-link").removeClass("is-open");
    gsap.set(".c-tab", { clearProps: "all" });
    gsap.set(".c-tab-content", { clearProps: "all" });
    gsap.set(".c-img-contain.tab", { clearProps: "all" });
  };
});

// TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  headerDropdownMobile();
  headerMobile();
  $(".c-footer-list_bt").appendTo(".o-row.footer");

  if (landingPage) {
    barMenuMobile();
    gsap.set(".c-bar-menu", {
      clipPath: "inset(0% 0% 0% 0% round 1em)",
      autoAlpha: 1,
    });
    gsap.set(".c-bar-menu-link", { yPercent: 0, autoAlpha: 1 });
    gsap.set(".c-bar-menu-cta", { yPercent: 0, autoAlpha: 1 });
  }

  if (learningCenter) {
    filtersMobile();
  }
  return () => {
    if (!landingPage) {
      $(".c-btn-wrap.contact").prependTo(".c-header_rt");
      $(".c-btn-wrap.contact").css("display", "block");
    }
    $(".c-footer-list_bt").appendTo(".c-footer-list.info");
    $(".c-nav-btn").unbind();
    $(".c-nav-btn").removeClass("is-open");
    $(".c-dd-link").unbind();
    $(".c-dd-link").removeClass("is-open");
    if (landingPage) {
      gsap.set(".c-bar-menu", {
        clipPath: "inset(0% 80% 80% 0% round 1em)",
        autoAlpha: 1,
      });
      gsap.set(".c-bar-menu-link", { yPercent: 200, autoAlpha: 0 });
      gsap.set(".c-bar-menu-cta", { yPercent: 200, autoAlpha: 0 });
      $(".c-bar-menu").appendTo(".o-row.bar");
    }
  };
});
