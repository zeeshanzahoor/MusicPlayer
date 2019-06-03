import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import MusicPlayerService, { Track, Events, RepeatModes } from 'react-native-music-player-service';

const _event = (event, track) => {
    console.log(event.toString() + ' has been raised with ' + track.toString());
}
const setNowPlayingConfig = {
    color: 0x2E2E2E,
    notificationIcon: 'my_custom_icon'
}
var musicPlayerService = new MusicPlayerService(true, setNowPlayingConfig);


musicPlayerService.addEventListener(Events.Play, track => _event(Events.Play, track));
musicPlayerService.addEventListener(Events.Pause, track => _event(Events.Pause, track));
musicPlayerService.addEventListener(Events.Next, track => _event(Events.Next, track));
musicPlayerService.addEventListener(Events.Previous, track => _event(Events.Previous, track));
musicPlayerService.addEventListener(Events.EndReached, track => _event(Events.EndReached, track));

/* Setting up the queue */
var songsInformation = [
    {
        id: "1",
        path: '//sample.mp3',
        title: "track_1",
        album: "some album",
        artist: "some artist",
        genre: "some genre",
        duration: 2260,
        artwork: require('../assets/icon.png')
    }
]
var tracks = songsInformation.map(s => {
    return new Track({ id: s.id, path: s.path, additionalInfo: s });
})

musicPlayerService.setQueue(tracks)
    .then(returnedQueue => {
        console.log('Queue has been set');
        return musicPlayerService.togglePlayPause();
    })
    .then(() => {
        console.log('Play or pause has been toggled');
    });

musicPlayerService.playNext();

export default class Sample extends React.Component {
    render() {
        return (
            <View />
        );
    }
}

const styles = StyleSheet.create({

});