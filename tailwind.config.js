module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          accent: '#06b6d4',
          neutral: '#374151',
          'base-100': '#ffffff',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
          dangerRed: '#ef4444',
          lightViolet: '#f8fafc',
        },
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          light: {
            "primary": "#6366f1",
            "secondary": "#8b5cf6", 
            "accent": "#06b6d4",
            "neutral": "#374151",
            "base-100": "#ffffff",
            "info": "#3abff8",
            "success": "#36d399",
            "warning": "#fbbd23",
            "error": "#f87272",
          },
        },
      ],
    },
  }