// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      // Define aliases para tus importaciones. Ejemplo:
      '@styles': path.resolve(__dirname, '/public/styles'),
    },
    // Puedes agregar más configuraciones de webpack según necesites aquí
  },
  babel: {
    plugins: [
      // Este plugin permite usar la sintaxis de optional chaining de ES2020
      "@babel/plugin-proposal-optional-chaining",
      // Agrega más plugins de babel que necesites aquí
    ],
    // Puedes agregar más configuraciones de babel según necesites aquí
  },
  // Si estás usando Tailwind CSS con PostCSS, puedes incluir esta configuración:
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  // Agrega otras configuraciones específicas de craco según necesites
};
