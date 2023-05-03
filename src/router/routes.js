import Home from '@views/home/home.vue';
import SignIn from '@views/sign-in/sign-in.vue';
import PlaceForm from '@views/place/place-form.vue';
import PlaceList from '@views/place/place-list.vue';
import Category from '@views/category/category.vue';
import EventForm from '@views/event/event-form.vue';
import EventList from '@views/event/event-list.vue';
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
    path: '/listar-local',
    name: 'listar-local',
    meta: {
      titleKey: 'Listar Locais',
    },
    component: PlaceList,
  },
  {
    path: '/cadastro-evento',
    name: 'cadastro-evento',
    meta: {
      titleKey: 'Cadastro Evento',
    },
    component: EventForm,
  },
  {
    path: '/editar-evento/:id',
    name: 'editar-eventp',
    meta: {
      titleKey: 'Editar Evento',
    },
    component: EventForm,
  },
  {
    path: '/listar-evento',
    name: 'listar-evento',
    meta: {
      titleKey: 'Listar Eventos',
    },
    component: EventList,
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
