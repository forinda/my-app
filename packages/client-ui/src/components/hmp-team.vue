<script setup lang="ts"></script>
<template>
  <div>
    <!-- Our team -->
    <section class="bg-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center">
          <h2 class="text-3xl font-bold">Our Team</h2>
          <p class="text-dark/50">Meet the team behind Pay X</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div v-for="i in 4" class="bg-white border shadow-lg p-4 rounded-lg">
            <div class="flex flex-col">
              <img src="@/assets/img/tm-1.png" alt="Team Member" class="" />
              <div>
                <h3 class="text-xl font-bold">John Doe</h3>
                <p class="text-dark/50">CEO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
