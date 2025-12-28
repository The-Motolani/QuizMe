import {AuthProvider, UseAuth } from "./UseAuth";

export const getGreeting = () => {
  const { user } = UseAuth();
  const name = user?.username || "User";
  const hour = new Date().getHours();

  if (hour < 12) {
    return `Good morning, ${name}`;
  }
  if (hour < 18) {
    return `Good afternoon, ${name}`;
  }
  return `Good evening, ${name}`;
};

