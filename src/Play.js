
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions, PanResponder, ScrollView, Image, Slider } from 'react-native';
import Icon from 'react-native-ionicons'
const ScrrenHeight = Dimensions.get('window').height;
const ScrrenWidth = Dimensions.get('window').width;


export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentWillMount() {
        this.animated = new Animated.ValueXY({ x: 0, y: ScrrenHeight - 90 });
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (event, gestureState) => {
                this.animated.extractOffset();
            },
            onPanResponderMove: (event, gestureState) => {
                this.animated.setValue({ x: 0, y: gestureState.dy });
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dy < 0) {
                    Animated.spring(this.animated.y, {
                        toValue: -ScrrenHeight + 120,
                        tension: 1,
                    }).start();
                }
                else if (gestureState.dy > 0) {
                    Animated.spring(this.animated.y, {
                        toValue: ScrrenHeight - 120,
                        tension: 1,
                    }).start();
                }
            }
        })
    }
    render() {
        const AnimatedHeight = {
            transform: this.animated.getTranslateTransform()
        }
        const AnimatedImageHeight = this.animated.y.interpolate({
            inputRange: [0, ScrrenHeight - 90],
            outputRange: [200, 32],
            extrapolate: 'clamp'
        });
        const AnimatedImageMargin = this.animated.y.interpolate({
            inputRange: [0, ScrrenHeight - 90],
            outputRange: [ScrrenWidth / 2 - 100, 20],
            extrapolate: 'clamp'
        });
        const AnimatedTitleOpacity = this.animated.y.interpolate({
            inputRange: [0, ScrrenHeight - 500, ScrrenHeight - 90],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        });
        const AnimatedHeaderHeight = this.animated.y.interpolate({
            inputRange: [0, ScrrenHeight - 90],
            outputRange: [ScrrenHeight / 2, 90],
            extrapolate: 'clamp',
        });
        const animatedSongDetailOpacity = this.animated.y.interpolate({
            inputRange: [0, ScrrenHeight - 500, ScrrenHeight - 90],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        });
        return (
            <Animated.View style={styles.container} {...this.panResponder.panHandlers}>
                <Animated.View style={[AnimatedHeight, styles.containerInner]} >
                    <Animated.View style={[styles.containerInnerInner, { height: AnimatedHeaderHeight }]}>
                        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                            <Animated.View style={{ height: AnimatedImageHeight, width: AnimatedImageHeight, marginLeft: AnimatedImageMargin }}>
                                <Image style={{ flex: 1, width: null, height: null }} source={require('../assets/Hotelcalifornia.jpg')} />
                            </Animated.View>
                            <Animated.Text style={{ opacity: AnimatedTitleOpacity, fontSize: 18, paddingLeft: 10 }}>Hotel California(Live)</Animated.Text>
                        </View>
                        <Animated.View style={{ opacity: AnimatedTitleOpacity, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Icon name="md-pause" size={32} />
                            <Icon name="md-play" size={32} />
                        </Animated.View>
                    </Animated.View>


                <Animated.View style={{ height: AnimatedHeaderHeight, opacity: animatedSongDetailOpacity }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Hotel California (Live)</Text>
                        <Text style={{ fontSize: 18, color: 'white' }}>Eagles - Hell Freezes Over</Text>
                    </View>

                    <View style={{ height: 40, width: ScrrenWidth, alignItems: 'center' }}>
                        <Slider
                            style={{ width: 300 }}
                            step={1}
                            minimumValue={18}
                            maximumValue={71}
                            value={18}
                        />
                    </View>

                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Icon name="md-rewind" size={40} />
                        <Icon name="md-pause" size={50} />
                        <Icon name="md-fastforward" size={40} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                        <Icon name="md-add" size={32} style={{ color: 'white' }} />
                        <Icon name="md-more" size={32} style={{ color: 'white' }} />
                    </View>


                </Animated.View>

                </Animated.View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerInner: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: ScrrenHeight,
        backgroundColor: 'orange'
    },
    containerInnerInner: {
        height: 90, borderTopWidth: 1, borderTopColor: '#ebe5e5', flexDirection: 'row', alignItems: 'center'
    }
});
