import NewsList, { loadNews } from "../components/app";

export default [
  {
    loadData: loadNews,
    path: "/",
    component: NewsList,
    routes: [
      {
        path: "/:page",
        component: NewsList,
      },
    ],
  },
];
