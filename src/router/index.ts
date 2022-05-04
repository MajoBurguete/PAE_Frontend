import { createRouter, createWebHistory } from "vue-router";
import LoginSignupView from "@/views/LoginSignupView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginSignupView,
    },
    {
      path: "/tutor-signup",
      name: "tutorSignup",
      component: () => import('../views/SignupTutorView.vue')
    },
    {
      path: "/student-signup",
      name: "studentSignup",
      component: () => import('../views/SignupStudentView.vue')
    },
    {
      path: "/home",
      name: "home",
      component: () => import('../views/HomeStudentTutor.vue')
    },
    {
      path: "/date-and-class",
      name: "dateAndClass",
      component: () => import('../views/SessionConfigDateAndClass.vue')
    },
    {
      path: "/question",
      name: "sessionQuestion",
      component: () => import('../views/SessionQuestionView.vue')
    },
    {
      path: "/feedback-survey",
      name: "feedbackSurvey",
      component: () => import('../views/FeedbackSurvey.vue')
    }
  ],
});

export default router;
