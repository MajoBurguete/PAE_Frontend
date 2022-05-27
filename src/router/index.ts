import { createRouter, createWebHistory } from "vue-router";
import LoginSignupView from "../views/LoginSignupView.vue";

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
      path: "/student-settings",
      name: "studentSettings",
      component: () => import('../views/StudentConfigView.vue')
    },
    {
      path: "/tutor-settings",
      name: "tutorSettings",
      component: () => import('../views/TutorConfigView.vue')
    },
    {
      path: "/admin-settings",
      name: "adminSettings",
      component: () => import('../views/AdminConfigView.vue')
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
    },
    {
      path: "/tutor-session-record",
      name: "TutorSessionRecord",
      component: () => import('../views/TutorSessionRecordView.vue')
    },
    {
      path: "/admin-home",
      name: "adminHome",
      component: () => import('../views/HomeAdminView.vue')
    },
    {
      path: "/pending-sessions",
      name: "pendingSessions",
      component: () => import('../views/PendingSessionsView.vue')
    },
    {
<<<<<<< HEAD
      path: "/pending-tutors",
      name: "pendingTutors",
      component: () => import('../views/PendingTutorsView.vue')
    },
=======
      path: "/edit-survey",
      name: "editSurvey",
      component: () => import('../views/EditSurveyView.vue')
    },
    {
      path: "/survey-record",
      name: "surveyRecord",
      component: () => import('../views/SurveyRecordView.vue')
    },
    
>>>>>>> 016a9443bd4eb34c50bc6a1af35fef263269af43
  ],
});

export default router;
