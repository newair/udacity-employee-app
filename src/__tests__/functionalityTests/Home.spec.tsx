import { render} from "@testing-library/react";
import { AnyAction, Store, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "../../server";
import { rootReducer } from "../../reducers";
import { pollApi } from "../../api/api";
import Home from "../../components/Home";
import { Registry, AnyModels, AnyFactories } from "miragejs/-types";
import { Server } from "miragejs/server";

describe("Testing Home", () => {
  let store: Store<unknown, AnyAction>;
  let server: Server<Registry<AnyModels, AnyFactories>>;
  beforeEach(() => {
    server = makeServer({ environment: "test" });
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        authedUser: {
          id: "sarahedo",
        },
      },
      middleware: (getDefaultMiddleware: () => any[]) =>
        getDefaultMiddleware().concat(pollApi.middleware),
    });
  });

  it("test home page", async () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const label1 = await view.findByText("New Questions", undefined, {
      timeout: 3000,
    });

    expect(label1).toBeInTheDocument();
  });

  afterEach(() => {
    server.shutdown();
  });
});
