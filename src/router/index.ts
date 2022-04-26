import { createRouter, createWebHistory } from "vue-router";
import LoginSignupView from "@/views/SessionQuestionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginSignupView,
    },
  ],
});

export default router;
