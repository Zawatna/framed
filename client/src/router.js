import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard} from "@bcwdev/auth0provider-client";

function loadPage(page) {
  return () => import(`./pages/${page}.vue`);
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: loadPage("HomePage"),
  },
  {
    path: "/about",
    name: "About",
    component: loadPage("AboutPage"),
  },
  {
    path: "/account",
    name: "Account",
    component: loadPage("AccountPage"),
    beforeEnter: authGuard,
  },
  {
    path: "/profiles/:profileId",
    name: "Profile",
    component: loadPage("ProfilePage"),
  },
  {
    path: "/search",
    name: "Search",
    component: loadPage("SearchPage"),
  },
  {
    path: "/photos/:photoId",
    name: "Photo Details",
    component: loadPage("PhotoDetailsPage")
  },
  {
    path: "/album/:albumId",
    name: "AlbumDetailsPage",
    component: loadPage("AlbumDetailsPage"),
  },
];

export const router = createRouter({
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  history: createWebHashHistory(),
  routes,
});
