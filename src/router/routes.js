import Home from '@views/home/home.vue';
import SignIn from '@views/sign-in/sign-in.vue';
import PlaceForm from '@views/place/place-form.vue';
import PlaceList from '@views/place/place-list.vue';
import Category from '@views/category/category.vue';
import EventForm from '@views/event/event-form.vue';
import EventList from '@views/event/event-list.vue';
import RoadMapForm from '@views/roadmap/roadmap-form.vue';
import RoadMapList from '@views/roadmap/roadmap-list.vue';
import RegionForm from '@views/region/region-form.vue';
import RegionList from '@views/region/region-list.vue';

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
    path: '/categoria',
    name: 'categoria',
    meta: {
      titleKey: 'Categoria',
    },
    component: Category,
  },
  {
    path: '/cadastrar-local',
    name: 'cadastrar-local',
    meta: {
      titleKey: 'Cadastrar Local',
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
    path: '/cadastrar-regiao',
    name: 'cadastrar-regiao',
    meta: {
      titleKey: 'Cadastrar Regiões',
    },
    component: RegionForm,
  },
  {
    path: '/editar-regiao/:id',
    name: 'editar-regiao',
    meta: {
      titleKey: 'Editar Regiões',
    },
    component: RegionForm,
  },
  {
    path: '/visualizar-regiao/:id',
    name: 'visualizar-regiao',
    meta: {
      titleKey: 'Visualizar Regiões',
    },
    component: RegionForm,
  },
  {
    path: '/listar-regiao',
    name: 'listar-regiao',
    meta: {
      titleKey: 'Listar Regiões',
    },
    component: RegionList,
  },
  {
    path: '/cadastrar-evento',
    name: 'cadastrar-evento',
    meta: {
      titleKey: 'Cadastrar Evento',
    },
    component: EventForm,
  },
  {
    path: '/editar-evento/:id',
    name: 'editar-evento',
    meta: {
      titleKey: 'Editar Evento',
    },
    component: EventForm,
  },
  {
    path: '/visualizar-evento/:id',
    name: 'visualizar-evento',
    meta: {
      titleKey: 'Visualizar Evento',
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
    path: '/cadastrar-roteiro',
    name: 'cadastrar-roteiro',
    meta: {
      titleKey: 'Cadastrar Roteiro',
    },
    component: RoadMapForm,
  },
  {
    path: '/editar-roteiro/:id',
    name: 'editar-roteiro',
    meta: {
      titleKey: 'Editar Roteiro',
    },
    component: RoadMapForm,
  },
  {
    path: '/visualizar-roteiro/:id',
    name: 'visualizar-roteiro',
    meta: {
      titleKey: 'Visualizar Roteiro',
    },
    component: RoadMapForm,
  },
  {
    path: '/listar-roteiro',
    name: 'listar-roteiro',
    meta: {
      titleKey: 'Listar Roteiros',
    },
    component: RoadMapList,
  },
];
