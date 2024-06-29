<template>
  <div class="loading-area">
    <div class="wavy">
      <span style="--i:1;">L</span>
      <span style="--i:2;">o</span>
      <span style="--i:3;">d</span>
      <span style="--i:4;">i</span>
      <span style="--i:5;">n</span>
      <span style="--i:6;">g</span>
      <span style="--i:7;">.</span>
      <span style="--i:8;">.</span>
      <span style="--i:9;">.</span>
      <span style="--i:10;">.</span>
    </div>
  </div>
</template>

<style scoped>
.loading-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

span {
  color: #000;
  font-size: 24px;
  display: inline-block; 
  text-transform: uppercase; 
  animation: animate 1s ease-in-out infinite;
  animation-delay: calc(0.1s * var(--i)); 
}

.wavy {
  -webkit-box-reflect: below -12px linear-gradient(transparent, rgba(100, 20, 0, 0.2));
}

.wavy span {
  color: #000;
  font-size: 24px;
  display: inline-block;
  text-transform: uppercase; 
  animation: animate 1s ease-in-out infinite;
  animation-delay: calc(0.1s * var(--i)); 
}

@keyframes animate {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-20px);
  }
  40%, 100% {
    transform: translateY(0px);
  }
}
</style>