import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import Navigation from './lib/Navigation';
import { defaultHeader, onNavigationStateChange } from './utils/navigation';
import {
	ROOT_LOADING, ROOT_OUTSIDE, ROOT_NEW_SERVER, ROOT_INSIDE, ROOT_SET_USERNAME, ROOT_BACKGROUND
} from './actions/app';

// Stacks
import AuthLoadingView from './views/AuthLoadingView';

// SetUsername Stack
import SetUsernameView from './views/SetUsernameView';

import OutsideStack from './stacks/OutsideStack';
import InsideStack from './stacks/InsideStack';

// SetUsernameStack
const SetUsername = createStackNavigator();
const SetUsernameStack = () => (
	<SetUsername.Navigator screenOptions={defaultHeader}>
		<SetUsername.Screen
			name='SetUsernameView'
			component={SetUsernameView}
		/>
	</SetUsername.Navigator>
);

// App
const Stack = createStackNavigator();
const App = React.memo(({ root }) => {
	if (!root || root === ROOT_BACKGROUND) {
		return null;
	}

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<NavigationContainer ref={Navigation.navigationRef} onNavigationStateChange={onNavigationStateChange}>
				<Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
					<>
						{root === ROOT_LOADING ? (
							<Stack.Screen
								name='AuthLoading'
								component={AuthLoadingView}
							/>
						) : null}
						{root === ROOT_OUTSIDE || root === ROOT_NEW_SERVER ? (
							<Stack.Screen
								name='OutsideStack'
								component={OutsideStack}
							/>
						) : null}
						{root === ROOT_INSIDE ? (
							<Stack.Screen
								name='InsideStack'
								component={InsideStack}
							/>
						) : null}
						{root === ROOT_SET_USERNAME ? (
							<Stack.Screen
								name='SetUsernameStack'
								component={SetUsernameStack}
							/>
						) : null}
					</>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
});
const mapStateToProps = state => ({
	root: state.app.root
});

App.propTypes = {
	root: PropTypes.string
};

const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;