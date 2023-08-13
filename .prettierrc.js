module.exports = {
  singleQuote: true,
  semi: true, // 不使用分号
  trailingComma: 'all',
  tabWidth: 2, //  水平缩进的空格数为2
  bracketSpacing: true, // 在对象,数组括号与文字之间加空格
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
};
