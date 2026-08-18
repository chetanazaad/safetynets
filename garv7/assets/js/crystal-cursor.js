/**
 * Premium Crystalline Gold Cursor — v2 Glassmorphism Edition
 * Vanilla JS cursor trail: gold crystal filaments + shatter shards,
 * a soft trailing dot, and a hover ring that reacts to links/buttons.
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
        this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Configuration — gold + white crystal palette to match the navy/gold brand
        this.crystalColor = "hsla(43, 80%, 70%, ";
        this.shatterColor = "hsla(43, 95%, 82%, ";
        this.dotColor = "hsla(43, 90%, 60%, ";
        this.ringColor = "hsla(43, 90%, 68%, ";

        // Trailing dot & hover ring
        this.dot = { x: this.mouse.x, y: this.mouse.y, scale: 1 };
        this.ring = { x: this.mouse.x, y: this.mouse.y, targetScale: 1, scale: 1, opacity: 0 };

        this.init();
    }

    init() {
        // Skip on mobile and when the user prefers reduced motion
        if (this.isMobile || this.reducedMotion) return;

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
        window.addEventListener("mousemove", (e) => this.handleMouseMove(e), { passive: true });
        window.addEventListener("click", (e) => this.handleClick(e));
        window.addEventListener("resize", () => this.resizeCanvas());
        document.addEventListener("mouseover", (e) => this.handleHover(e));
        document.addEventListener("mouseout", (e) => this.handleHoverOut(e));
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) this.stopAnimation();
        });
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

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.isRunning = false;
        if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        // Keep the dot trail always animating; particles are throttled
        this.startAnimation();

        // Performance check: throttle crystal spawns
        if (Math.random() > 0.65) {
            this.crystals.push(new Crystal(
                this.mouse.x + (Math.random() - 0.5) * 24,
                this.mouse.y + (Math.random() - 0.5) * 24,
                this.ctx,
                this.crystalColor
            ));
        }
    }

    handleClick(e) {
        // Spawn a graceful shatter burst on click
        const shardCount = this.isMobile ? 12 : 24;
        for (let i = 0; i < shardCount; i++) {
            this.shards.push(new Shard(e.clientX, e.clientY, this.ctx, this.shatterColor));
        }
        this.startAnimation();
    }

    handleHover(e) {
        const el = e.target.closest("a, button, .btn, .faq-trigger, .service-card-link, input, select, textarea, .check-card");
        if (!el) return;
        this.ring.targetScale = 2.2;
        this.ring.opacity = 0.9;
        this.startAnimation();
    }

    handleHoverOut(e) {
        const el = e.target.closest("a, button, .btn, .faq-trigger, .service-card-link, input, select, textarea, .check-card");
        if (!el) return;
        this.ring.targetScale = 1;
        this.ring.opacity = 0.35;
    }

    animate() {
        const hasCrystals = this.crystals.length > 0;
        const hasShards = this.shards.length > 0;
        const dotActive = this.movedRecently;

        // Stop the loop when there is nothing left to draw
        if (!hasCrystals && !hasShards && !dotActive && this.ring.opacity <= 0.01) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.isRunning = false;
            this.animationFrameId = null;
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw crystals
        this.crystals = this.crystals.filter(c => c.life > 0);
        this.crystals.forEach(c => { c.update(); c.draw(); });

        // Update and draw shards
        this.shards = this.shards.filter(s => s.life > 0);
        this.shards.forEach(s => { s.update(); s.draw(); });

        this.drawDotAndRing();

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }

    drawDotAndRing() {
        // Trailing dot — eases toward the real cursor
        const ease = 0.32;
        const dx = this.mouse.x - this.dot.x;
        const dy = this.mouse.y - this.dot.y;
        this.dot.x += dx * ease;
        this.dot.y += dy * ease;

        const moved = Math.abs(dx) + Math.abs(dy);
        this.movedRecently = moved > 0.4;
        this.dot.scale = Math.min(1, this.dot.scale + 0.1);
        if (!this.movedRecently) this.dot.scale = Math.max(0.2, this.dot.scale - 0.03);

        const ctx = this.ctx;

        // Hover ring
        this.ring.x = this.mouse.x;
        this.ring.y = this.mouse.y;
        this.ring.scale += (this.ring.targetScale - this.ring.scale) * 0.18;
        ctx.beginPath();
        ctx.strokeStyle = `${this.ringColor}${this.ring.opacity})`;
        ctx.lineWidth = 1.6;
        ctx.arc(this.ring.x, this.ring.y, 20 * this.ring.scale, 0, Math.PI * 2);
        ctx.stroke();

        // Soft outer glow
        ctx.beginPath();
        ctx.fillStyle = `${this.ringColor}${this.ring.opacity * 0.12})`;
        ctx.arc(this.ring.x, this.ring.y, 20 * this.ring.scale, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `${this.dotColor}1)`;
        ctx.arc(this.dot.x, this.dot.y, 3.5 * this.dot.scale, 0, Math.PI * 2);
        ctx.fill();

        // Dot glow halo
        ctx.beginPath();
        ctx.fillStyle = `${this.dotColor}0.18)`;
        ctx.arc(this.dot.x, this.dot.y, 10 * this.dot.scale, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Crystal {
    constructor(x, y, context, colorPrefix) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = 0;
        this.targetRadius = Math.random() * 42 + 12; // Slightly reduced radius for elegant trail
        this.life = 110;
        this.context = context;
        this.colorPrefix = colorPrefix;
        this.lineWidth = Math.random() * 1 + 0.4;
        this.turnAngle = (Math.random() - 0.5) * 0.07;
    }

    draw() {
        const alpha = Math.min(1, this.life / 110);
        this.context.strokeStyle = `${this.colorPrefix}${alpha})`;
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
            this.radius += 0.9;
        }
        this.life -= 1.5;
        this.angle += this.turnAngle;
    }
}

class Shard {
    constructor(x, y, context, colorPrefix) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.4 + 1.2;
        this.vx = Math.cos(this.angle) * speed;
        this.vy = Math.sin(this.angle) * speed;
        this.life = 70;
        this.size = Math.random() * 2.2 + 0.7;
        this.context = context;
        this.colorPrefix = colorPrefix;
    }

    draw() {
        const alpha = Math.min(1, this.life / 70);
        this.context.fillStyle = `${this.colorPrefix}${alpha})`;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.context.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1.7;
    }
}

// Instantiate cursor trail
document.addEventListener("DOMContentLoaded", () => {
    new CrystalCursor();
});
