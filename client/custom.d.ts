declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
