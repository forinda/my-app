<script setup lang="ts">
import { ref } from 'vue'
import {
  Tab as HuiTab,
  TabGroup as HuiTabGroup,
  TabPanel as HuiTabPanel,
  TabPanels as HuiTabPanels,
  TabList as HuiTabList,
} from '@headlessui/vue'
import { Icon } from '@iconify/vue'

const categories = ref({
  Recent: [
    {
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },
  ],
  Popular: [
    {
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
  ],
  Trending: [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ],
})
const tabs = [
  {
    icon: 'lucide-home',
    name: 'Home',
  },
  {
    icon: 'lucide-chart-bar',
    name: 'Analytics',
  },
  {
    icon: 'lucide-bell',
    name: 'Notifications',
  },
  {
    icon: 'lucide-cog',
    name: 'Settings',
  },
]
</script>
<template>
  <div class="w-full px-2 sm:px-0">
    <hui-tab-group as="div" class="border-b bg-white">
      <hui-tab-list class="flex items-center gap-1 border-b">
        <hui-tab
          v-for="{ icon: iconName, name } in tabs"
          as="template"
          :key="name"
          v-slot="{ selected }"
        >
          <button
            class="py-4 px-2 bg-white min-w-10 flex items-center gap-2 cursor-pointer"
            :class="{
              'border-b border-primary': selected,
            }"
          >
            <Icon :icon="iconName" class="h-6 w-6" />
            <span>
              {{ name }}
            </span>
          </button>
        </hui-tab>
      </hui-tab-list>

      <hui-tab-panels class="mt-2">
        <hui-tab-panel
          v-for="(posts, idx) in Object.values(categories)"
          :key="idx"
          class="bg-white w-full"
        >
          <ul>
            <li
              v-for="post in posts"
              :key="post.id"
              class="relative rounded-md p-3 hover:bg-gray-100"
            >
              <h3 class="text-sm font-medium leading-5">
                {{ post.title }}
              </h3>

              <ul class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                <li>{{ post.date }}</li>
                <li>&middot;</li>
                <li>{{ post.commentCount }} comments</li>
                <li>&middot;</li>
                <li>{{ post.shareCount }} shares</li>
              </ul>

              <a
                href="#"
                :class="[
                  'absolute inset-0 rounded-md',
                  'ring-blue-400 focus:outline-none focus:ring-2',
                ]"
              />
            </li>
          </ul>
        </hui-tab-panel>
      </hui-tab-panels>
    </hui-tab-group>
  </div>
</template>

<style scoped></style>
