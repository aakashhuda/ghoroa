<template>
  <section class="testimonial-section">
    <div class="section-title">
      <h2 class="text-3xl font-bold text-[#1a1d2e] mb-4">
        Trusted by Property Managers
      </h2>
      <p class="text-[#5a6075] max-w-2xl mx-auto">
        Hear from the people who use Ghoroa every day to run their properties.
      </p>
    </div>

    <div class="marquee">
      <div class="marquee-content">
        <!-- First set -->
        <div
          v-for="t in testimonials"
          :key="'a-' + t.name"
          class="testimonial-card"
        >
          <div class="stars">★★★★★</div>
          <span class="testimonial-quote" :style="{ color: t.color }">"</span>
          <p class="testimonial-text">"{{ t.text }}"</p>
          <div class="user-row">
            <div
              class="testimonial-avatar"
              :style="{
                background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
              }"
            >
              <span class="testimonial-initials">{{ t.initials }}</span>
            </div>
            <div>
              <p class="user-name">{{ t.name }}</p>
              <p class="user-role">{{ t.role }}</p>
            </div>
          </div>
          <div class="testimonial-accent" :style="{ background: t.color }" />
        </div>

        <!-- Duplicate set for seamless infinite scroll -->
        <div
          v-for="t in testimonials"
          :key="'b-' + t.name"
          class="testimonial-card"
        >
          <div class="stars">★★★★★</div>
          <span class="testimonial-quote" :style="{ color: t.color }">"</span>
          <p class="testimonial-text">"{{ t.text }}"</p>
          <div class="user-row">
            <div
              class="testimonial-avatar"
              :style="{
                background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
              }"
            >
              <span class="testimonial-initials">{{ t.initials }}</span>
            </div>
            <div>
              <p class="user-name">{{ t.name }}</p>
              <p class="user-role">{{ t.role }}</p>
            </div>
          </div>
          <div class="testimonial-accent" :style="{ background: t.color }" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: "Rafiq Hasan",
    role: "Building Owner",
    text: "Ghoroa has completely transformed how we manage our 12 buildings. Rent collection is now seamless.",
    color: "#16a34a",
    initials: "RH",
  },
  {
    name: "Fatima Begum",
    role: "Property Manager",
    text: "The rooftop farm module is brilliant. We turned unused space into a revenue stream.",
    color: "#0891b2",
    initials: "FB",
  },
  {
    name: "Kamal Hossain",
    role: "Admin",
    text: "Tenant requests and notices are now organized. No more paper slips everywhere.",
    color: "#7c3aed",
    initials: "KH",
  },
  {
    name: "Nasrin Sultana",
    role: "Landlord",
    text: "The financial reports are a game-changer. I can finally see where every taka goes.",
    color: "#ea580c",
    initials: "NS",
  },
  {
    name: "Arif Mahmud",
    role: "Property Manager",
    text: "Employee salary tracking alone saved us hours every month. Highly recommended.",
    color: "#2563eb",
    initials: "AM",
  },
  {
    name: "Rubina Akhter",
    role: "Building Owner",
    text: "Tenants love the portal. Complaints are down and satisfaction is at an all-time high.",
    color: "#16a34a",
    initials: "RA",
  },
];
</script>

<style scoped>
/* ── Section ────────────────────────────── */
.testimonial-section {
  padding: 100px 0;
  overflow: hidden;
  background: #f4f6fb;
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
  padding: 0 24px;
}

/* ── Marquee container ──────────────────── */
.marquee {
  overflow: hidden;
  position: relative;
}

/* ── Edge fade masks ────────────────────── */
.marquee::before,
.marquee::after {
  content: "";
  position: absolute;
  top: 0;
  width: 120px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.marquee::before {
  left: 0;
  background: linear-gradient(to right, #f4f6fb, transparent);
}

.marquee::after {
  right: 0;
  background: linear-gradient(to left, #f4f6fb, transparent);
}

/* ── Scrolling track ────────────────────── */
.marquee-content {
  display: flex;
  gap: 24px;
  width: max-content;
  padding: 20px;
  animation: marqueeScroll 40s linear infinite;
}

.marquee:hover .marquee-content {
  animation-play-state: paused;
}

@keyframes marqueeScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 12px));
  }
}

/* ── Card ────────────────────────────────── */
.testimonial-card {
  width: 370px;
  flex-shrink: 0;
  padding: 28px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  border-color: rgba(22, 163, 74, 0.25);
  box-shadow:
    0 8px 24px rgba(22, 163, 74, 0.1),
    0 16px 48px rgba(22, 163, 74, 0.06);
}

/* ── Stars ───────────────────────────────── */
.stars {
  color: #faad14;
  font-size: 18px;
  letter-spacing: 2px;
  margin-bottom: 16px;
  line-height: 1;
}

/* ── Quote mark ──────────────────────────── */
.testimonial-quote {
  position: absolute;
  top: 18px;
  right: 24px;
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  opacity: 0.06;
  font-family: Georgia, serif;
  pointer-events: none;
  user-select: none;
}

/* ── Text ────────────────────────────────── */
.testimonial-text {
  font-size: 14px;
  color: #5a6075;
  line-height: 1.75;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
  flex: 1;
}

/* ── User row ────────────────────────────── */
.user-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.testimonial-initials {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}

.user-name {
  font-size: 15px;
  font-weight: 600;
  color: #1a1d2e;
}

.user-role {
  font-size: 13px;
  color: #5a6075;
}

/* ── Left accent ─────────────────────────── */
.testimonial-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 56px;
  border-radius: 0 3px 3px 0;
  opacity: 0.35;
}
</style>
