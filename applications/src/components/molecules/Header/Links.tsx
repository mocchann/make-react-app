import { CounterLink } from "../../atoms/Header/Link/CounterLink";
import { HomeLink } from "../../atoms/Header/Link/HomeLink";
import { TodoListLink } from "../../atoms/Header/Link/TodoListLink";

export const Links = () => {
  return (
    <>
      <HomeLink />
      <CounterLink />
      <TodoListLink />
    </>
  );
};
