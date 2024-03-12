import { render } from "@testing-library/react";
import Profile from "../../components/Profile";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("Testing snapshots for Profile", () => {   

it("test Profile", () => {
    const initialState = {
        authedUser: {
            id: "sarahedo",
        },
        users: [{sarahedo: {
            id: 'sarahedo',
            password:'password123'
    }}],
      };
      const mockStore = configureStore();
      const store = mockStore(initialState);
    render(
    <Provider store={store}>
        <Profile /> 
    </Provider>
    );

});

});