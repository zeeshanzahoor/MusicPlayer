/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Play from './src/Play';
import Sample from './src/Sample';

export default class App extends React.Component {
  render() {
    return (
       <Sample/>
    );
  }
}

const styles = StyleSheet.create({

});
