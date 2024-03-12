import { authedUserSelector } from "../reducers/authedUser";
import { useAppSelector } from "../store";

function Profile() {

  const { name: authedUserName } = useAppSelector(authedUserSelector);

  return (
    <div>
    {authedUserName &&
      <div>
        <h1>{authedUserName}</h1>
      </div>
    }
    </div>
    
  );
}

export default Profile;
