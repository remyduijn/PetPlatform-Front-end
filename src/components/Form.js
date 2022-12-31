import { UseState } from "react"

const Form = () => {
  const [userName, setUserName] = UseState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
      />
      <label>
        <input
          type="checkbox"
        />
        Remember me
      </label>
      <input type="submit" value="Submit"></input>
    </form>
  );
};

export default Form;