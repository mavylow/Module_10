
import { makeAutoObservable } from "mobx";

export type ThemeType = "light" | "dark";
class Theme {
  value: ThemeType = "dark";
  constructor() {
    makeAutoObservable(this);
  }

  setTheme(theme: ThemeType) {
    this.value = theme
  }

  changeTheme() {
    this.value = this.value === "light" ? "dark" : "light";
  }

  resetTheme() {
    this.value = "dark";
  }
}
export default new Theme();
