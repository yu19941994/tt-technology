<script setup lang="ts">
import OtpVerify from '@/components/OtpVerify.vue'
import Profile from '@/components/Profile.vue'
import Loading from '@/components/Loading.vue'
import ErrorCode from '@/components/ErrorCode.vue'
import axios from 'axios'

import { ref, watch, onMounted } from 'vue'
interface Item {
  username: string
  quote: string
  photo: string
}
const showError = ref(false)
const isVerify = ref(false)
const isLoading = ref(false)
const userData = ref<Item[]>([])
const error = ref<string | null>(null)

const handleUpdateShowError = (value: boolean) => {
  showError.value = value
}

const isVerifyHandler = (value: boolean) => {
  isVerify.value = value
}

const isLoadingHandler = (value: boolean) => {
  isLoading.value = value
}


const isAuth = async (token) => {
  try {
    isLoading.value = true
    const response = await axios.get<Item[]>('/api/auth', {
      headers: {
        Authorization: token,
      }
    })
    userData.value = response.data
    isLoading.value = false
  } catch (err) {
    error.value = err.message
    isLoading.value = false
  }
}

watch(isVerify, (newIsVerify) => {
  if (newIsVerify !== isVerify) {
    const token = localStorage.getItem('token')
    isAuth(token)
  }
})

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    isVerify.value = true
    isAuth(token)
  }
})
</script>

<template>
  <Profile
    v-if="isVerify && !isLoading"
    :user-data="userData"
    @update:isVerify="isVerifyHandler"
  />
  <OtpVerify
    @update:showError="handleUpdateShowError"
    @update:isVerify="isVerifyHandler"
    @update:isLoading="isLoadingHandler"
    v-else
  />
  <Loading v-show="isLoading"/>
  <ErrorCode v-show="showError" />
</template>