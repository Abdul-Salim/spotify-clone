import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});

export const tokenState = atom({
  key: "token",
  default: "",
});

export const discoverWeeklyState = atom({
  key: "",
  default: null,
});
