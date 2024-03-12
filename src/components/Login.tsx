import { useEffect, useMemo, useState } from "react";
import { useLoginMutation } from "../api/api";
import { setAuthedUser } from "../reducers/authedUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";

export default function Login() {
  const [inputValue, setInputValue] = useState<{
    userName?: string;
    password?: string;
  }>();
  const [login, { data, isSuccess, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthedUser({ id: undefined }));
  }, [dispatch]);

  const isLoggedIn = useMemo(() => {
    return isSuccess && !!data?.id;
  }, [data?.id]);

  const isLoggedInFailed = useMemo(() => {
    return isError || (isSuccess && !data?.id);
  }, [isError, data?.id, isSuccess]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setAuthedUser({ id: data?.id, name: data?.name}));
      const redirectTo = new URLSearchParams(location.search).get("redirectTo");
      navigate(!redirectTo ? "/" : redirectTo);
    }
  }, [data, dispatch, navigate, isSuccess, location.search]);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;

    if (name === "userName") {
      setInputValue({ ...inputValue, userName: value });
    } else if (name === "password") {
      setInputValue({ ...inputValue, password: value });
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue?.userName && inputValue?.password) {
      login({ userName: inputValue.userName, password: inputValue?.password });
    }
  };

  return (
    <div className="loginContainer">
      <div className="status">
        {isLoggedInFailed && <h3 className="error-msg">Login failed</h3>}
        {isLoggedIn && <h3 className="success-msg">Login success</h3>}
      </div>

      <form onSubmit={onSubmit} className="login">
        <input
          data-testid="usernameInput"
          className="usernameInput"
          name="userName"
          onChange={handleChange}
        ></input>
        <input
          data-testid="passwordInput"
          className="passwordInput"
          type="password"
          name="password"
          onChange={handleChange}
        ></input>
        <button data-testid="loginBtn" type="submit" className="submitBtn">
          Login
        </button>
      </form>
    </div>
  );
}
