import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;

    if (this.experience.world.floor !== undefined) {
      this.circle1 = this.experience.world.floor.circle1;
      this.circle2 = this.experience.world.floor.circle2;
      this.circle3 = this.experience.world.floor.circle3;
      this.circle4 = this.experience.world.floor.circle4;
    }

    if (this.experience.world.room !== undefined) {
      this.room = this.experience.world.room.actualRoom;

      this.room.children.forEach((child) => {
        if (child.type === "RectAreaLight") {
          this.rectLight = child;
        }
      });
    }

    // console.log(this.room);

    gsap.registerPlugin(ScrollTrigger);

    this.setScroll();
  }

  setScroll() {
    if (this.room !== undefined) {
      ScrollTrigger.matchMedia({
        // desktop
        "(min-width: 969px)": () => {
          this.rectLight.width = 0.3;
          this.rectLight.height = 0.3;

          this.room.scale.set(0.1, 0.1, 0.1);

          //   first section
          this.firstMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".first-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );
          this.firstMoveTimeline.to(
            this.room.position,
            {
              x: () => {
                return this.sizes.width * 0.0014;
              },
            },
            "same"
          );

          //   second section
          this.secondMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".second-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );
          this.secondMoveTimeline.to(
            this.room.position,
            {
              x: 0.99,
              z: () => {
                return this.sizes.height * 0.0018;
              },
            },
            "same"
          );

          this.secondMoveTimeline.to(
            this.room.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
            },
            "same"
          );

          this.secondMoveTimeline.to(
            this.rectLight,
            {
              width: 0.3 * 4,
              height: 0.3 * 4,
            },
            "same"
          );

          //   third section
          this.thirdMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".third-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );
          this.thirdMoveTimeline.to(
            this.room.position,
            {
              x: -0.5,
              //   y: -2.5,
              z: 13,
            },
            "same"
          );

          //   fourth section
          this.fourthMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".fourth-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );
          this.fourthMoveTimeline.to(
            this.room.position,
            {
              x: -0.1,
              z: -7.5,
            },
            "same"
          );
        },

        // mobile
        "(max-width: 968px)": () => {
          //   reset
          this.room.scale.set(0.06, 0.06, 0.06);
          this.room.position.set(0, 0, 0);

          //   first section
          this.firstMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".first-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );
          this.firstMoveTimeline.to(
            this.room.scale,
            {
              x: 0.07,
              y: 0.07,
              z: 0.07,
            },
            "same"
          );

          //   second section
          this.secondMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".second-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );
          this.secondMoveTimeline.to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            "same"
          );
          this.secondMoveTimeline.to(
            this.room.position,
            {
              x: 2,
              z: -0.5,
            },
            "same"
          );
          this.secondMoveTimeline.to(
            this.rectLight,
            {
              width: 0.2 * 4,
              height: 0.2 * 4,
            },
            "same"
          );

          //   third section
          this.thirdMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".third-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );
          this.thirdMoveTimeline.to(
            this.room.position,
            {
              x: -1.75,
              y: 1,
              z: 7.5,
            },
            "same"
          );

          //   fourth section
          this.fourthMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".fourth-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );
          this.fourthMoveTimeline.to(
            this.room.position,
            {
              x: 1.5,
              y: 3,
              z: -1,
            },
            "same"
          );
        },
        // all
        all: () => {
          this.sections = document.querySelectorAll(".section");
          this.sections.forEach((section) => {
            if (section.classList.contains("right")) {
              gsap.to(section, {
                borderTopLeftRadius: 10,
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "top top",
                  scrub: 0.5,
                },
              });
              gsap.to(section, {
                borderBottomLeftRadius: 700,
                scrollTrigger: {
                  trigger: section,
                  start: "bottom bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              });
            }

            if (section.classList.contains("left")) {
              gsap.to(section, {
                borderTopRightRadius: 10,
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "top top",
                  scrub: 0.5,
                },
              });
              gsap.to(section, {
                borderBottomRightRadius: 700,
                scrollTrigger: {
                  trigger: section,
                  start: "bottom bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              });
            }
          });

          // cicle floor animations
          //   first section
          this.firstMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".first-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );

          this.firstMoveTimeline.to(
            this.circle1.scale,
            {
              x: 3,
              y: 3,
              z: 3,
            },
            "same"
          );

          //   second section
          this.secondMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".second-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );

          this.secondMoveTimeline.to(
            this.circle2.scale,
            {
              x: 3,
              y: 3,
              z: 3,
            },
            "same"
          );

          this.secondMoveTimeline.to(
            this.room.position,
            {
              y: 0.7,
            },
            "same"
          );

          //   third section
          this.thirdMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".third-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );

          this.thirdMoveTimeline.to(
            this.circle3.scale,
            {
              x: 3,
              y: 3,
              z: 3,
            },
            "same"
          );

          //   fourth section
          this.fourthMoveTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".fourth-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );

          this.fourthMoveTimeline.to(
            this.circle4.scale,
            {
              x: 3,
              y: 3,
              z: 3,
            },
            "same"
          );

          //   console.log(this.room.children);
          //   mini_floor
          this.secondPartTimeline = new gsap.timeline(
            {
              scrollTrigger: {
                trigger: ".fourth-move",
                start: "center center",
                end: "bottom bottom",
                scrub: 0.5,
                //   markers: true,
                invalidateOnRefresh: true,
              },
            },
            "same"
          );

          this.room.children.forEach((child) => {
            if (child.name === "minifloor") {
              this.first = gsap.to(child.position, {
                x: -11.0818,
                z: 18.1987,
                duration: 1,
                ease: "back.out(2)",
              });
            }
            if (child.name === "mailbox") {
              this.second = gsap.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "back.out(2)",
              });
            }
            if (child.name === "minifloor_lamp") {
              this.third = gsap.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "back.out(2)",
              });
            }
            if (child.name === "minifloor_mat1") {
              this.fourth = gsap.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "back.out(2)",
              });
            }
            if (child.name === "minifloor_mat2") {
              this.fifth = gsap.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "back.out(2)",
              });
            }
            if (child.name === "minifloor_mat3") {
              this.sixth = gsap.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "back.out(2)",
              });
            }
            if (child.name === "soil") {
              this.seventh = gsap.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "back.out(2)",
              });
            }
            if (child.name === "grass_1") {
              this.eighth = gsap.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "back.out(2)",
              });
            }
            if (child.name === "grass_2") {
              this.nineth = gsap.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "back.out(2)",
              });
            }
          });

          this.secondPartTimeline.add(this.first);
          this.secondPartTimeline.add(this.second);
          this.secondPartTimeline.add(this.third);
          this.secondPartTimeline.add(this.fourth);
          this.secondPartTimeline.add(this.fifth);
          this.secondPartTimeline.add(this.sixth);
          this.secondPartTimeline.add(this.seventh);
          this.secondPartTimeline.add(this.eighth);
          this.secondPartTimeline.add(this.nineth);
        },
      });
    }
  }

  resize() {}

  update() {}
}
