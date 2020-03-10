import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import EditHome from './src/screens/EditHome';
import MyClasses from './src/screens/MyClasses';
import EditClasses from './src/screens/EditClasses';
//import Extra from './src/screens/Extra'

const Auth = createStackNavigator({
  Login: Login,
  Signup: Signup
}, {initialRouteName:"Login"})

const Landing = createStackNavigator({
    Home: Home,
    EditHome: EditHome,
  },{initialRouteName: 'Home'}
);

const CoursesHome = createStackNavigator({
  MyClasses: MyClasses,
  EditClasses: EditClasses,
},{initialRouteName: 'MyClasses'}
);

// const ExtraHome = createStackNavigator({
//   Extra: Extra,
//   // EditClasses: EditClasses,
// },{initialRouteName: 'MyClasses'}
// );

const profileNav = createStackNavigator({
  Profile: Profile,
  EditProfile: EditProfile,
  //DeleteAccount: DeleteAccount,
}, {initialRouteName:"Profile"})


const Main = createBottomTabNavigator({
  AboutMe: Landing,
  MyClasses: CoursesHome,
  //Extra: ExtraHome,
  Profile: profileNav,
})

const AppNavigator = createSwitchNavigator(
  {
    Auth: Auth,
    Main: Main,
  },{initialRouteName: "Auth"}
)

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {

  componentWillMount(){
    console.disableYellowBox = true;
  }
  // StackNavigator: Login and Signup
  // BottomTabNavigator for main page
  // SwitchNavigator to switch between the above two navigators
  render(){
    return <AppContainer />
  }
}
export default App;

// export default class App extends Component {
//   render() {
//     return <AppContainer />;
//   }
// }
