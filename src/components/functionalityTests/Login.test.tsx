import { fireEvent, render } from "@testing-library/react";
import Login from "../Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { pollApi } from "../../api/api";
import { rootReducer } from "../../reducers";
import { makeServer } from "../../server";
import { AnyAction, Store, configureStore } from "@reduxjs/toolkit";
import { Registry, AnyModels, AnyFactories } from "miragejs/-types";
import { Server } from "miragejs/server";

describe("Testing snapshots", () => {
  let store: Store<unknown, AnyAction>;
  let server: Server<Registry<AnyModels, AnyFactories>>;
  beforeEach(() => {
    server = makeServer({ environment: "test" });
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {},
      middleware: (getDefaultMiddleware: () => any[]) =>
        getDefaultMiddleware().concat(thunk).concat(pollApi.middleware),
    });
  });

  it("test login button success", async () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const usernameInput = view.getByTestId("usernameInput");
    const passwordInput = view.getByTestId("passwordInput");
    const loginButton = view.getByTestId("loginBtn");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: "sarahedo" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    const successMessage = await view.findByText("Login success", undefined, {
      timeout: 3000,
    });
    expect(successMessage).toBeInTheDocument();
  });

  it("test login button failed", async () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const usernameInput = view.getByTestId("usernameInput");
    const passwordInput = view.getByTestId("passwordInput");
    const loginButton = view.getByTestId("loginBtn");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: "sarahedo" } });
    fireEvent.change(passwordInput, { target: { value: "wrong" } });
    fireEvent.click(loginButton);

    const failedMessage = await view.findByText("Login failed", undefined, {
      timeout: 3000,
    });
    expect(failedMessage).toBeInTheDocument();
  });

  afterEach(() => {
    server.shutdown();
  });
});
