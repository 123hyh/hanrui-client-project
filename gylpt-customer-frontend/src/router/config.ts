import router from "./router";
const WHITE_LIST = ["login", "index"];
router.beforeEach((to, from, next) => {
  next();
});
export default router;
