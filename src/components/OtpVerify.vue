<script lang="ts" setup>
import { ref, watch } from 'vue'
import focusDirective from '@/directives/focusDirective'
import axios from 'axios'

const initial = ref('initial')
const inputs = ref(['', '', '', ''])

const emits = defineEmits(['update:showError', 'update:isVeirfy', 'update:isLoading'])


watch(inputs.value, (newInputs) => {
  if (newInputs.every(input => input.trim().length === 1)) {
    emits('update:showError', false)
    onSubmitHandler()
  }
})

const onSubmitHandler = () => {
  const code = inputs.value.join("")
  getVerify(code)
}

interface Item {
  valid: boolean
  token: string
}
const data = ref<Item[]>([])
const error = ref<string | null>(null)

const getVerify = async (code) => {
  try {
    emits('update:isLoading', true)
    const response = await axios.post('/api/verify',
      {
        "code": code,
      }
    )
    console.log('Verify:', response.data)
    if (!response.data.valid) {
      emits('update:showError', true)
    } else {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        emits('update:isVerify', true)
      }
      emits('update:showError', false)
    }
  } catch (err) {
    error.value = err.message
  } finally {
    emits('update:isLoading', false)
  }
}

</script>

<template>
    <form @submit.prevent="onSubmitHandler">
      <div class="otp-container">
        <h3 class="otp-title">Enter verification</h3>
        <div class="input-group">
          <input v-model="inputs[0]" class="input" ref="input1" v-focus="initial">
          <input v-model="inputs[1]" class="input" ref="input2" v-focus>
          <input v-model="inputs[2]" class="input" ref="input3" v-focus>
          <input v-model="inputs[3]" class="input" ref="input4" v-focus>
        </div>
      </div>
    </form>
</template>
<style scoped>
.otp-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
.otp-title {
  font-size: 2rem;
}

.input-group {
  display: flex;
  gap: 1rem;
}

.input-group > .input {
  width: 8rem;
  height: 12rem;
  text-align: center;
  font-size: 2rem;
}
</style>
