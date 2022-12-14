import { TweenLite, Circ } from 'gsap';

export class CanvasBackground {
  private width: number | null = null;
  private height: number | null = null;
  private target = null;
  private containerEle: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private points: any[] = [];
  private animateHeader: boolean = false;

  constructor(containerId: string, canvasId: string) {
    const containerEle = (this.containerEle =
      document.getElementById(containerId));
    const width = (this.width = containerEle.clientWidth);
    const height = (this.height = containerEle.clientHeight);
    this.target = { x: width / 2, y: height / 2 };

    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');

    this.initHeader();
    this.initAnimation();
    this.addListeners();
  }

  private initHeader() {
    const width = this.width;
    const height = this.height;
    const points = this.points;

    // create points
    for (let x = 0; x < width; x = x + width / 20) {
      for (let y = 0; y < height; y = y + height / 20) {
        const px = x + (Math.random() * width) / 20;
        const py = y + (Math.random() * height) / 20;
        const p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // for each point find the 5 closest points
    for (let i = 0; i < points.length; i++) {
      const closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j];
        if (!(p1 == p2)) {
          var placed = false;
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (let i in points) {
      const c = new Circle(
        points[i],
        2 + Math.random() * 2,
        'rgba(255,255,255,0.3)',
        this.ctx
      );
      points[i].circle = c;
    }
  }

  private initAnimation() {
    this.animate();
    for (let i in this.points) {
      this.shiftPoint(this.points[i]);
    }
  }

  private animate() {
    const width = this.width;
    const height = this.height;
    const points = this.points;
    const target = this.target;

    if (this.animateHeader) {
      this.ctx.clearRect(0, 0, width, height);
      for (var i in points) {
        // detect points in range
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          points[i].active = 0.3;
          points[i].circle.active = 0.6;
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          points[i].active = 0.1;
          points[i].circle.active = 0.3;
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          points[i].active = 0.02;
          points[i].circle.active = 0.1;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        this.drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  private shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: () => {
        this.shiftPoint(p);
      },
    });
  }

  private drawLines(p) {
    const ctx = this.ctx;

    if (!p.active) return;
    for (var i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
      ctx.stroke();
    }
  }

  private addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', this.mouseMove.bind(this));
    }
    window.addEventListener('scroll', this.scrollCheck.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }

  private mouseMove(e) {
    let posx = 0;
    let posy = 0;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    this.target.x = posx;
    this.target.y = posy;
  }

  private scrollCheck() {
    if (document.body.scrollTop > this.height) this.animateHeader = false;
    else this.animateHeader = true;
  }

  private resize() {
    this.width = this.containerEle.clientWidth;
    this.height = this.containerEle.clientHeight;
    // largeHeader.style.height = height + 'px';
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}

export function canvasAnimation(containerId: string, canvasId: string) {
  let width = null;
  let height = null;
  let target = null;
  // let largeHeader: HTMLElement = null;
  let canvas: HTMLCanvasElement = null;
  let ctx: CanvasRenderingContext2D = null;
  const points = [];
  let animateHeader = true;

  const headerEle = document.getElementById(containerId);

  // Main
  initHeader();
  initAnimation();
  addListeners();

  function initHeader() {
    width = headerEle.clientWidth;
    height = headerEle.clientHeight;
    target = { x: width / 2, y: height / 2 };

    // largeHeader = document.getElementById('large-header');
    // largeHeader.style.height = height + 'px';

    canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // create points
    for (let x = 0; x < width; x = x + width / 20) {
      for (let y = 0; y < height; y = y + height / 20) {
        const px = x + (Math.random() * width) / 20;
        const py = y + (Math.random() * height) / 20;
        const p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // for each point find the 5 closest points
    for (let i = 0; i < points.length; i++) {
      const closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j];
        if (!(p1 == p2)) {
          var placed = false;
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (let i in points) {
      const c = new Circle(
        points[i],
        2 + Math.random() * 2,
        'rgba(255,255,255,0.3)',
        ctx
      );
      points[i].circle = c;
    }
  }

  // Event handling
  function addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

  function mouseMove(e) {
    // var posx = (posy = 0);
    let posx = 0;
    let posy = 0;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    const { top, left } = headerEle.getBoundingClientRect();

    posx = e.clientX - left;
    posy = e.clientY - top;
    target.x = posx;
    target.y = posy;
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    width = headerEle.clientWidth;
    height = headerEle.clientHeight;
    // largeHeader.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
  }

  // animation
  function initAnimation() {
    animate();
    for (var i in points) {
      shiftPoint(points[i]);
    }
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in points) {
        // detect points in range
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          points[i].active = 0.3;
          points[i].circle.active = 0.6;
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          points[i].active = 0.1;
          points[i].circle.active = 0.3;
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          points[i].active = 0.02;
          points[i].circle.active = 0.1;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: function () {
        shiftPoint(p);
      },
    });
  }

  // Canvas manipulation
  function drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
      ctx.stroke();
    }
  }

  // function Circle(pos, rad, color) {
  //   var _this = this;

  //   // constructor
  //   (function () {
  //     _this.pos = pos || null;
  //     _this.radius = rad || null;
  //     _this.color = color || null;
  //   })();

  //   this.draw = function () {
  //     if (!_this.active) return;
  //     ctx.beginPath();
  //     ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
  //     ctx.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
  //     ctx.fill();
  //   };
  // }
}

class Circle {
  private pos = null;
  private radius = null;
  private color = null;
  private ctx = null;
  public active = null;

  constructor(pos, radius, color, ctx) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
  }

  public draw() {
    if (!this.active) return;
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')';
    this.ctx.fill();
  }
}

// Util
function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}
