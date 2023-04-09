import SignIn from '@views/sign-in/sign-in.vue';
import CreatePlace from '@views/place/create-place.vue';
import Place from '@views/place/place.vue';
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
    path: '/local/:id',
    name: 'local',
    meta: {
      titleKey: 'Local',
    },
    component: Place,
  },
  {
    path: '/cadastro-local',
    name: 'cadastro-local',
    meta: {
      titleKey: 'Cadastro Local',
    },
    component: CreatePlace,
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
