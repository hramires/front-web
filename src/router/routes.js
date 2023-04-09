import SignIn from '@views/sign-in/sign-in.vue';
import Home from '@views/home/home.vue';
import PlaceList from '@views/places/place-list.vue';
import Category from '@views/category/category.vue';

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
    path: '/listar-local',
    name: 'listar-local',
    meta: {
      titleKey: 'Listar Local',
    },
    component: PlaceList,
  },
  {
    path: '/categoria',
    name: 'categoria',
    meta: {
      titleKey: 'Categoria',
    },
    component: Category,
  },
];
