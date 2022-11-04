import { createTheme, responsiveFontSizes } from '@mui/material'

let theme = createTheme({
  typography: {
    fontFamily: [
      "'Work Sans'",
      'BlinkMacSystemFont',
      "'Segoe UI'",
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      "'Fira Sans'",
      "'Droid Sans'",
      "'Helvetica Neue'",
      'sans-serif',
    ].join(','),
  },
})

theme = responsiveFontSizes(theme)
export default theme
