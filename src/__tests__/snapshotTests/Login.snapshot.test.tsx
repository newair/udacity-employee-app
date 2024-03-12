import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import Login from "../../components/Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("Testing snapshots for Logn", () => {
  it("test login button", () => {
    const initialState = {
      authedUserId: "abc",
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});
