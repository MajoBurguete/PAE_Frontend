<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
    </div>
  </header>

  <RouterView />
</template>

<style>

@font-face {
  font-family: "Catamaran";
  src: url('src/assets/fonts/Catamaran-Bold.ttf');
  font-weight: bold;
}

@font-face {
  font-family: "Catamaran";
  src: url('src/assets/fonts/Catamaran-Medium.ttf');
  font-weight: medium;
}

@font-face {
  font-family: "Catamaran";
  src: url('src/assets/fonts/Catamaran-Regular.ttf');
  font-weight: normal;
}

@font-face {
  font-family: "Catamaran";
  src: url('src/assets/fonts/Catamaran-Light.ttf');
  font-weight: lighter;
}

@font-face {
  font-family: "Montserrat";
  src: url('src/assets/fonts/Montserrat-Bold.ttf');
  font-weight: bolder;
}

@font-face {
  font-family: "Montserrat";
  src: url('src/assets/fonts/Montserrat-SemiBold.ttf');
  font-weight: bold;
}

@font-face {
  font-family: "Montserrat";
  src: url('src/assets/fonts/Montserrat-Medium.ttf');
  font-weight: medium;
}

@font-face {
  font-family: "Montserrat";
  src: url('src/assets/fonts/Montserrat-Regular.ttf');
  font-weight: normal;
}

@font-face {
  font-family: "Ubuntu";
  src: url('src/assets/fonts/Ubuntu-Italic.ttf');
  font-weight: normal;
}

@font-face {
  font-family: "Ubuntu";
  src: url('src/assets/fonts/Ubuntu-LightItalic.ttf');
  font-weight: lighter;
}


body {
    display: inline-block;
    padding: 0;
    margin: 0;
}

html {
    display: inline-block;
    padding: 0;
    margin: 0; 
}

</style>
