<script setup lang="ts">
import { whyChooseUsReasons } from '@/lib/data/why-choose-us'
import { Icon } from '@iconify/vue'
</script>
<template>
  <div class="relative space-y-10">
    <section class="max-w-7xl mt-10 mx-auto flex flex-col items-center space-y-8">
      <h2 class="text-4xl font-bold">Why choose us?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="reason in whyChooseUsReasons"
          :key="reason.title"
          class="flex flex-col items-center space-y-4 border p-4"
        >
          <Icon :icon="reason.icon" class="text-4xl" />
          <h3 class="text-2xl font-bold">{{ reason.title }}</h3>
          <p class="text-center">{{ reason.description }}</p>
          <button class="text-primary bg-white px-4 py-2 rounded">Learn More</button>
        </div>
      </div>
    </section>
    <section class="max-w-7xl mx-auto flex flex-col items-center space-y-8 py-10">
      <div>
        <h2 class="text-4xl font-bold text-center py-4" id="about-us">About us</h2>
        <div class="flex flex-row-reverse gap-4 items-center">
          <div class="flex-[6]">
            <h3 class="text-2xl font-bold">What is Pay X?</h3>
            <p>
              Pay X is an online payment platform that allows you to send and receive money online.
              We provide a fast, secure, and convenient way to send and receive money online. Our
              platform is easy to use and has low fees. We use the latest security technology to
              keep your money safe. No need to visit a bank, you can send and receive money from the
              comfort of your home. Get your money in minutes with Pay X.
            </p>
          </div>
          <div class="max-h-80 flex-[6] overflow-hidden">
            <img
              src="@/assets/img/card-pay.jpeg"
              alt=""
              class="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
