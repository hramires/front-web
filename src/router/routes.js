import SignIn from '@views/sign-in/sign-in.vue';
import Home from '@views/home/home.vue';
import PlaceCategory from '@views/place-category/place-category.vue'
export default [
  {
    path: '/',
    name: 'place-category',
    component: PlaceCategory,
  },
  // {
  //   path: '/sign-in',
  //   name: 'sign-in',
  //   meta: {
  //     titleKey: 'Sign In',
  //   },
  //   component: SignIn,
  // },
  {
    path: '/place-category',
    name: 'place-category',
    meta: {
      titleKey: 'Place Category',
    },
    component: PlaceCategory,
  },
];
