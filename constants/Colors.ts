const hsl = (brightness: number) => `hsl(0, 0%, ${brightness}%)`;

export const Colors = {
  primary: "#1471eb",
  text: hsl(90),
  placeholder: hsl(60),
  background: hsl(8),
  border: hsl(70),
  icon: hsl(85),
  disabledBg: hsl(15),
  disabledText: hsl(55),
  disabledBorder: hsl(60),
  tabBarTint: hsl(85),
};
