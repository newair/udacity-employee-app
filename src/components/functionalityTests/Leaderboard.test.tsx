import { render} from "@testing-library/react";
import { AnyAction, Store, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "../../server";
import { rootReducer } from "../../reducers";
import { pollApi } from "../../api/api";
import { Registry, AnyModels, AnyFactories } from "miragejs/-types";
import { Server } from "miragejs/server";
import LeaderBoard from "../LeaderBoard";

describe("Testing leaderboard", () => {
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

  it("test leaderBoard page", async () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <LeaderBoard />
        </BrowserRouter>
      </Provider>
    );

    const users = await view.findByText("Users", undefined, { timeout: 3000 });
    const label = await view.findByText("Profile", undefined, {
      timeout: 3000,
    });
    const answered = await view.findByText("Answered", undefined, {
      timeout: 3000,
    });
    const created = await view.findByText("Created", undefined, {
      timeout: 3000,
    });

    expect(users).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(answered).toBeInTheDocument();
    expect(created).toBeInTheDocument();
  });

  afterEach(() => {
    server.shutdown();
  });
});
