import { useAuth } from "../utils/useAuth";

export const getGreeting = () => {
  const { user } = useAuth();
  const name = user?.first_name || "User";
  const hour = new Date().getHours();

  if (hour < 12) {
    return `Good morning, ${name}`;
  }
  if (hour < 18) {
    return `Good afternoon, ${name}`;
  }
  return `Good evening, ${name}`;
};

