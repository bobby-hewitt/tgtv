import React from 'react'
import Sound from 'react-native-sound'

// Enable playback in silence mode
Sound.setCategory('Playback');
let sounds = {};

export const loadSounds = () => {
  return new Promise((resolve, reject) => {
    let err = false
    sounds.background = new Sound('background.mp3', Sound.MAIN_BUNDLE, (success) => {
      sounds.background.setNumberOfLoops(-1);
      // resolve()
    })
    sounds.thud = new Sound('thud.wav', Sound.MAIN_BUNDLE)
    sounds.tada = new Sound('tada.wav', Sound.MAIN_BUNDLE)
    sounds.fail = new Sound('fail.wav', Sound.MAIN_BUNDLE)
    
  })
} 


export const playRemoteSound =(url) => {
  if (sounds.remoteSound) {
    sounds.remoteSound.stop()
    sounds.remoteSound.release();
  }

  sounds.remoteSound= new Sound(url, null, (e) => {
    sounds.remoteSound.play()
  })
}

export const stopRemoteSound =(url) => {
  if (sounds.remoteSound) sounds.remoteSound.stop()
}

  // loaded successfully
  
 export const playThud = () => {
  thud.stop()
 thud.play((success) => {

    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
 }


export const playSound = (key) => {
  if (sounds[key]){
    sounds[key].stop()
    sounds[key].play()
  }
}

export const playBackgroundMusic = () => {
  sounds.background.play((success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });

  
}


export const stopBackgroundMusic = () => {
  sounds.background.stop();
}
