import SignIn from '@views/sign-in/sign-in.vue';
import RegisterEnterprise from '@views/registries/register-enterprise.vue';
import Home from '@views/home/home.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: {
      titleKey: 'Sign In',
    },
    component: SignIn,
  },
  {
    path: '/cadastro-local',
    name: 'cadastro-local',
    meta: {
      titleKey: 'Cadastro Local',
    },
    component: RegisterEnterprise,
  },
];
