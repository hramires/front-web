import Home from '@views/home/home.vue';
import SignIn from '@views/sign-in/sign-in.vue';
import PlaceForm from '@views/place/place-form.vue';
import PlaceList from '@views/place/place-list.vue';
import Category from '@views/category/category.vue';
import RoadMapForm from '@views/roadmap/roadmap-form.vue';

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
    component: PlaceForm,
  },
  {
    path: '/editar-local/:id',
    name: 'editar-local',
    meta: {
      titleKey: 'Editar Local',
    },
    component: PlaceForm,
  },
  {
    path: '/visualizar-local/:id',
    name: 'visualizar-local',
    meta: {
      titleKey: 'Visualizar Local',
    },
    component: PlaceForm,
  },
  {
    path: '/listar-local',
    name: 'listar-local',
    meta: {
      titleKey: 'Listar Locais',
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
  {
    path: '/cadastrar-roteiro',
    name: 'cadastrar-roteiro',
    meta: {
      titleKey: 'Cadastrar Roteiro',
    },
    component: RoadMapForm,
  },
];
