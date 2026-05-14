import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";
import { CollectionPage } from "./pages/CollectionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "collections/:category", Component: CollectionPage },
      { path: "products/:id", Component: ProductPage },
    ],
  },
]);
