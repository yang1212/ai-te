/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#165DFF',
        secondary: '#36CFFB',
        // 添加更多自定义颜色
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        // 添加更多自定义字体
      },
    },
  },
  plugins: [],
}