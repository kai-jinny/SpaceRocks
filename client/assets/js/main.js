(function() {
  "use strict";
  
  function animateMenu() {
    let menu = document.getElementByClassName("menuBg");
    let nav = document.getElementByClassName("mobileNav");

    if (menu.classList.contains("showMenu")) { 
        menu.classList.remove("showMenu").classList.add("hideMenu");
        nav.classList.remove("fadeIn");
    } else if (menu.classList.contains("hideMenu")) { 
        menu.classList.remove("hideMenu").classList.add("showMenu");
        nav.classList.add("fadeIn")
    } else {
        menu.classList.add("showMenu"); 
        nav.classList.add("fadeIn");
    }
};

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Floating Buttons
   */
  let floatingButton = select('.floatingButton')
  let floatingButton2 = select('#export');
  if (floatingButton) {
    const togglefloatingButton = () => {
      if (window.scrollY > 100) {
        floatingButton.classList.add('active');
        floatingButton2.classList.add('active');
      } else {
        floatingButton.classList.remove('active');
        floatingButton2.classList.remove('active');
      }
    }
    window.addEventListener('load', togglefloatingButton);
    onscroll(document, togglefloatingButton);
  }

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

