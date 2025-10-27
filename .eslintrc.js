module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Disable unused variables warning (or set to 'warn' if you prefer warnings)
    '@typescript-eslint/no-unused-vars': 'off',
    
    // Disable explicit any warning
    '@typescript-eslint/no-explicit-any': 'off',
    
    // Disable require imports warning
    '@typescript-eslint/no-require-imports': 'off',
    
    // Disable img element warning (allows <img> instead of Next.js <Image>)
    '@next/next/no-img-element': 'off',
    
    // Disable unescaped entities error (allows apostrophes in JSX)
    'react/no-unescaped-entities': 'off',
    
    // Disable HTML link warning (allows <a> tags for internal navigation)
    '@next/next/no-html-link-for-pages': 'off',
    
    // Disable exhaustive deps warning for useEffect
    'react-hooks/exhaustive-deps': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'dist/',
    'build/',
  ],
};