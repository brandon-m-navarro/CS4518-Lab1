import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';

const MainNavigator = createStackNavigator(
    {
        Home: {screen: HomeScreen},
        About: {screen: AboutScreen},
    },
    {
        initialRouteName: 'Home',
    });

export default MainNavigator;
