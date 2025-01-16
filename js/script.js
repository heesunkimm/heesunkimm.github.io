    document.addEventListener("DOMContentLoaded", () => {
        gsap.registerPlugin(ScrollTrigger);

        const ani5 = gsap.timeline();
        ani5.to("#home .main_sub", {xPercent: 300}, "text")
            .to("#home .main_tit", {xPercent: -300}, "text")
            .to("#home .main_desc", {xPercent: 300}, "text");

        ScrollTrigger.create({
            animation: ani5,
            trigger: "#home",
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: false,
            markers: false,
            anticipatePin: 1
        });

        document.querySelectorAll("section.content:not(#home) > div").forEach((section) => {
            gsap.fromTo(
                section, 
                {autoAlpha: 0, y: 50}, 
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%", 
                        // end: "top 20%", 
                        scrub: false, 
                        toggleActions: "play reverse play reverse", 
                        markers: false
                    }
                }
            );
        });

        let ptSwiper = null;
        $(window).off('.portfolio_container').on('scroll.portfolio_container resize.portfolio_container', function() {
            if (window.innerWidth <= 768) {
                if (ptSwiper == null) {
                    ptSwiper = new Swiper('.portfolio_container', {
                        slidesPerView: 'auto',
                        loop : true,
                        pagination: {
                            el: '.portfolio_pagination',
                            type: 'bullets',
                        },
                        autoplay : {
                            delay : 3000,
                            disableOnInteraction : false,
                        },
                        breakpoints: {
                            769: {
                                allowTouchMove: false
                            }
                        }
                    });
                }
            } else {
                if (ptSwiper != null) {
                    ptSwiper.destroy(true);
                    ptSwiper = null;
                }
            }
        });

        const header = document.querySelector("header");
        const menubarBox = document.querySelector(".menubar_box");
        const navBox = document.querySelector(".nav_box");
        const dimm = document.querySelector(".dimm");

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (scrollTop > 50) {
                header.classList.add("fixed");
            } else {
                header.classList.remove("fixed");
            }

            document.querySelectorAll(".nav_list li a").forEach((li) => {
                li.addEventListener("click", (e) => {
                    e.preventDefault();
                    document.querySelector(li.getAttribute("href")).scrollIntoView({
                        behavior: "smooth", 
                        block: "start", 
                    });
        
                    if (window.innerWidth <= 768 && navBox.classList.contains("active")) {
                        hideNav();
                    }
                });
            });
        };

        const showNav = () => {
            navBox.classList.add("active");
            dimm.classList.add("active");
        };
        
        const hideNav = () => {
            navBox.classList.remove("active");
            dimm.classList.remove("active");
        };
        
        const handleNavToggle = () => {
            menubarBox.removeEventListener("click", showNav);
            dimm.removeEventListener("click", hideNav);
        
            if (window.innerWidth <= 768) {
                menubarBox.addEventListener("click", showNav);
                dimm.addEventListener("click", hideNav);
            }
        };

        const handleResize = () => {
            hideNav();
            handleNavToggle();
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        handleNavToggle();
    });
