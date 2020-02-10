import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import TaskScreen from './TaskScreen';
import ViewTasksScreen from './ViewTasksScreen';

const MainNavigator = createStackNavigator(
    {
        Home:      {screen: HomeScreen},
        About:     {screen: AboutScreen},
        Task:      {screen: TaskScreen},
        ViewTasks: {screen: ViewTasksScreen}
    },
    {
        initialRouteName: 'Home',
    });

export default MainNavigator;
