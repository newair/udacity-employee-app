import { render, screen, fireEvent } from "@testing-library/react";
import { AnyAction, Store, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NewPoll from "../../components/NewPoll";
import { makeServer } from "../../server";
import { rootReducer } from "../../reducers";
import { pollApi } from "../../api/api";
import { Registry, AnyModels, AnyFactories } from "miragejs/-types";
import { Server } from "miragejs/server";

describe("Testing snapshots", () => {
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

  it("test new poll", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const label1 = screen.getByText("Would you rather");
    const label2 = screen.getByText("Create your own poll");

    expect(label1).toBeInTheDocument();
    expect(label2).toBeInTheDocument();

    const option1Input = screen.getByTestId("option1-text");
    const option2Input = screen.getByTestId("option2-text");

    expect(option1Input).toBeInTheDocument();
    expect(option2Input).toBeInTheDocument();

    fireEvent.change(option1Input, { target: { value: "option1 text" } });
    fireEvent.change(option2Input, { target: { value: "option2 text" } });

    const submitBtn = screen.getByTestId("submitBtn");

    fireEvent.click(submitBtn);

    const successMsg = await screen.findByTestId("successMsg");
    expect(successMsg).toBeInTheDocument();
  });

  afterEach(() => {
    server.shutdown();
  });
});
