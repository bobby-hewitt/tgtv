import React from 'react'
import Sound from 'react-native-sound'

// Enable playback in silence mode
Sound.setCategory('Playback');
let sounds = {};

export const loadSounds = () => {
  return new Promise((resolve, reject) => {
    sounds.background = new Sound('background.mp3', Sound.MAIN_BUNDLE, (success) => {
      sounds.background.setNumberOfLoops(-1);
      if (success){
      
      sounds.background.play()
      }
    })
    sounds.thud = new Sound('thud.wav', Sound.MAIN_BUNDLE)
    sounds.tada = new Sound('tada.wav', Sound.MAIN_BUNDLE)
    sounds.fail = new Sound('fail.wav', Sound.MAIN_BUNDLE)
    
  })
} 


const fadeIn = (sound) =>{
  console.log("FADING IN")
  let volume = 0
  let interval = setInterval(() => {
    volume += 0.05
    
    sound.setVolume(volume)
    if (volume >= 0.9){
      sound.setVolume(0.9)
      clearInterval(interval)
    }
  },50)
}


const fadeOut = (sound, callback) =>{
  
  let volume = 0.9
  let interval2 = setInterval(() => {
    volume -= 0.05
    sound.setVolume(volume)
    if (volume <= 0){
      clearInterval(interval2)
      callback()
    }
  },50)
}



export const clearRemoteSound = () =>{
  if (sounds.remoteSound) {
    sounds.remoteSound.stop()
    sounds.remoteSound.release();
  }
}


export const playRemoteSound =(url) => {
  
  if (sounds.remoteSound) {
    sounds.remoteSound.stop()
    sounds.remoteSound.release();
    console.log('stopping')
    playNextSound()
  } else {

    playNextSound()
  }
  function playNextSound(){
    sounds.remoteSound= new Sound(url, null, (e) => {
      sounds.remoteSound.setVolume(0)
      sounds.remoteSound.play()
      fadeIn(sounds.remoteSound)
    })
  }
}

export const stopRemoteSound =() => {
  if (sounds.remoteSound) {
    fadeOut(sounds.remoteSound, () => {
      // console.log('stopping in stop')
      // sounds.remoteSound.stop()
      // sounds.remoteSound.release();
    })
    
  }
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
