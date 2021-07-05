import {createMuiTheme} from '@material-ui/core/styles';
const CustomTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1977d2', //blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057', //hotpink
      contrastText: '#fff',
    },
    regular: {
      main: '#73C2FB' //maya
    }
  }
})
export default CustomTheme;