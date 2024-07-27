export const setDarkTheme = (dark: boolean) => {
  document.documentElement.classList[dark ? "add" : "remove"]("dark");
};
