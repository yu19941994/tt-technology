<script lang="ts" setup>
import { PropType } from 'vue'

interface userDataObj {
  username: string
  quote: string
  photo: string
}
const props = defineProps<{ userData: userDataObj }>()
const emits = defineEmits(['update:isVeirfy'])

const logoutHandler = () => {
  emits('update:isVerify', false)
  localStorage.removeItem('token')
}
</script>

<template>
  <figure class="profile">
    <img class="profile-photo" :src="userData?.photo" alt="" width="300" height="512">
    <div class="profile-details">
      <blockquote>
        <p class="profile-quote font-medium">
        {{ userData?.quote }}
        </p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-sky-500">
          {{ userData?.username }}
        </div>
      </figcaption>
    </div>
  </figure>
  <div class="button-area">
    <button class="button" @click="logoutHandler">Logout</button>
  </div>
</template>

<style scoped>
.profile {
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-color: #3b82f680;
  --tw-bg-opacity: 1;
  display: flex;
  overflow: hidden;
  padding: 0;
  justify-content: center;
  border-radius: 0.75rem;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  --un-bg-opacity: 1;
  background-color:rgb(30 41 59/var(--tw-bg-opacity));
}


.profile-photo {
  border-radius: 0;
  width: 12rem;
  height: auto;
}

.profile-details {
  margin-top: 1rem;
  padding: 2rem;
  text-align: left;
}
.font-medium {
  font-weight: 500;
}
.profile-quote {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sky-500 {
  --un-text-opacity: 1;
  color: rgba(14, 165, 233, var(--un-text-opacity));
}

.button-area {
  display: flex;
  justify-content: flex-end;
  margin: 0 40px;
}

.button {
  padding: 12px 18px;
  color: white;
  background: #FF359A;
}

</style>
