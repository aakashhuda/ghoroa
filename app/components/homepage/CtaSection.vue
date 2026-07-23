<template>
  <section class="cta-section">
    <div class="max-w-3xl mx-auto px-6 py-24 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">
        Ready to digitize your property management?
      </h2>
      <p class="text-gray-200 mb-8">
        Join 500+ property managers who trust Ghoroa.
      </p>
      <a-button
        class="cta-white-btn"
        href="/auth/signup"
      >
        Get Started Free
      </a-button>
      <p class="text-sm text-gray-300 mt-4">No credit card required. Free to start.</p>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  background: linear-gradient(135deg, #16a34a 0%, #0891b2 100%);
}

.cta-white-btn {
  height: 52px !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  padding: 0 36px !important;
  background: #ffffff !important;
  color: #16a34a !important;
  border: none !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
}

.cta-white-btn:hover {
  background: #f4f6fb !important;
  color: #15803d !important;
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2) !important;
}
</style>
