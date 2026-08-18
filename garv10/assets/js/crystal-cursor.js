/**
 * Premium Crystalline Echo Cursor Animation
 * Vanilla JS conversion and optimization of the CrystalCursor component.
 */

class CrystalCursor {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animationFrameId = null;
        this.isRunning = false;
        
        // State
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.crystals = [];
        this.shards = [];
        this.isMobile = window.matchMedia("(max-width: 768px)").matches;
        
        // Configuration
        this.crystalColor = "hsla(220, 100%, 80%, ";
        this.shatterColor = "hsla(220, 100%, 90%, ";
        
        this.init();
    }

    init() {
        // Performance optimization: skip loading cursor trail on mobile devices
        if (this.isMobile) return;

        // Create canvas element
        this.canvas = document.createElement("canvas");
        this.canvas.id = "crystal-cursor-canvas";
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100vh";
        this.canvas.style.pointerEvents = "none"; // Let clicks pass through to page elements
        this.canvas.style.zIndex = "99999999";    // Render above everything
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
        this.resizeCanvas();

        // Bind event listeners
        window.addEventListener("mousemove", (e) => this.handleMouseMove(e));
        window.addEventListener("click", (e) => this.handleClick(e));
        window.addEventListener("resize", () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    startAnimation() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        // Performance check: throttle crystal spawns
        if (Math.random() > 0.6) {
            this.crystals.push(new Crystal(
                this.mouse.x + (Math.random() - 0.5) * 30,
                this.mouse.y + (Math.random() - 0.5) * 30,
                this.ctx,
                this.crystalColor
            ));
            this.startAnimation();
        }
    }

    handleClick(e) {
        // Spawn 35 shatter shards on click (reduced from 50 for performance optimization)
        const shardCount = this.isMobile ? 15 : 35;
        for (let i = 0; i < shardCount; i++) {
            this.shards.push(new Shard(e.clientX, e.clientY, this.ctx, this.shatterColor));
        }
        this.startAnimation();
    }

    animate() {
        // Performance optimization: stop animation loop when there are no active particles
        if (this.crystals.length === 0 && this.shards.length === 0) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.isRunning = false;
            this.animationFrameId = null;
            return;
        }

        // Clear canvas on every frame (fully transparent so homepage is visible underneath)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw crystals
        this.crystals = this.crystals.filter(c => c.life > 0);
        this.crystals.forEach(c => {
            c.update();
            c.draw();
        });

        // Update and draw shards
        this.shards = this.shards.filter(s => s.life > 0);
        this.shards.forEach(s => {
            s.update();
            s.draw();
        });

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
}

class Crystal {
    constructor(x, y, context, colorPrefix) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = 0;
        this.targetRadius = Math.random() * 50 + 15; // Slightly reduced radius for elegant trail
        this.life = 120; // life duration
        this.context = context;
        this.colorPrefix = colorPrefix;
        this.lineWidth = Math.random() * 1.2 + 0.4;
        this.turnAngle = (Math.random() - 0.5) * 0.08;
    }

    draw() {
        this.context.strokeStyle = `${this.colorPrefix}${this.life / 120})`;
        this.context.lineWidth = this.lineWidth;
        this.context.beginPath();
        this.context.moveTo(this.x, this.y);
        const endX = this.x + Math.cos(this.angle) * this.radius;
        const endY = this.y + Math.sin(this.angle) * this.radius;
        this.context.lineTo(endX, endY);
        this.context.stroke();
    }

    update() {
        if (this.radius < this.targetRadius) {
            this.radius += 0.8; // Speed up crystal growth
        }
        this.life -= 1.5; // Fade slightly faster
        this.angle += this.turnAngle;
    }
}

class Shard {
    constructor(x, y, context, colorPrefix) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        this.vx = Math.cos(this.angle) * speed;
        this.vy = Math.sin(this.angle) * speed;
        this.life = 80;
        this.size = Math.random() * 2.5 + 0.8;
        this.context = context;
        this.colorPrefix = colorPrefix;
    }

    draw() {
        this.context.fillStyle = `${this.colorPrefix}${this.life / 80})`;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.context.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1.8; // Fade shard particles
    }
}

// Instantiate cursor trail
document.addEventListener("DOMContentLoaded", () => {
    new CrystalCursor();
});
