<template>
  <button
    type="button"
    class="absolute top-4 right-4 rounded-full bg-slate-300 dark:bg-slate-700 p-2 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 hover:opacity-100 transition-opacity"
    :class="firstOpen ? 'opacity-100' : 'opacity-0'"
    @click="
      open = true;
      firstOpen = false;
    "
  >
    <Cog6ToothIcon class="h-5 w-5" aria-hidden="true" />
  </button>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-slate-700 py-6 shadow-xl"
                >
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle
                        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                      >
                        Settings
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative rounded-md bg-slate-100 dark:bg-slate-600 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                          @click="open = false"
                        >
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close settings</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <ul
                      role="list"
                      class="flex flex-1 flex-col space-y-4 h-full"
                    >

                      <!-- credentials -->
                      <li class="mb-20">
                        <TwitchLogin />
                      </li>

                      <!-- settings -->
                      <li><Darkmode /></li>
                      <!-- <li><SevenTv /></li> -->
                      <li><Timeout /></li>
                    </ul>
                    <div class="dark:text-gray-400 text-center mt-auto">
                      Built by
                      <a href="https://nulltvt.com" class="underline">
                        NullVT
                      </a>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import Darkmode from "./settings/darkmode.vue";
// import SevenTv from "./settings/sevenTv.vue";
import TwitchLogin from "./settings/twitchLogin.vue";
import Timeout from "./settings/timeout.vue";

const open = ref(false);
const firstOpen = ref(true);
</script>
