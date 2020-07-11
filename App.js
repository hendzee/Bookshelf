import 'react-native-gesture-handler';
import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as appTheme } from './src/styles/custom-theme.json';

import AppNavigator from './src/AppNavigator';

const theme = { ...lightTheme, ...appTheme }

/** Redux pusposed */
import configure from './src/store/configure';
import { Provider } from 'react-redux';

const store = configure();

const App = () => (
  <Provider store={ store }>
    <IconRegistry icons={ EvaIconsPack }/>
    <ApplicationProvider mapping={ mapping } theme={ theme }>
      <AppNavigator />
    </ApplicationProvider>
  </Provider>
);

export default App;
