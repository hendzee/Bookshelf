import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';

const HeartIcon = (style) => (
  <Icon {...style} name='heart'/>
);

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider mapping={mapping} theme={theme}>
      
    </ApplicationProvider>
  </>
);

export default App;
