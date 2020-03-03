import 'react-native-gesture-handler';
import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as appTheme } from './src/styles/custom-theme.json';

import AppNavigator from './src/AppNavigator';

const theme = { ...lightTheme, ...appTheme }

const App = () => (
  <>
    <IconRegistry icons={ EvaIconsPack }/>
    <ApplicationProvider mapping={ mapping } theme={ theme }>
      <AppNavigator />
    </ApplicationProvider>
  </>
);

export default App;
