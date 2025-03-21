module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  importOrder: [
    '^(^react$|@react|react|^redux$)',
    '^@mui/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],

  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
