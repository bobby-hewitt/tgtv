export const GLOBAL_playerJoined = ({playerData, config, players, socket, playSound, setPlayers}) =>{
      
    function checkNameMatch(){
        var nameIndex = 1
        for (var i = 0; i < players.length; i++){
          if(players[i].name === playerData.name){
            if (nameIndex === 1){
              nameIndex += 1
              playerData.name = playerData.name +' ' +  nameIndex
            } else {
              nameIndex += 1
              playerData.name = playerData.name.substring(0, playerData.name.length - 1);
              playerData.name = playerData.name +' ' +  nameIndex 
            }
            
          }
        }
        if (nameIndex > 1){
          return nameIndex 
        }
        return false
    }


    if (players.length < config.maxPlayers){
      checkNameMatch()
      const newPlayers = Object.assign([], players)
      newPlayers.push(playerData)
      playSound('thud')
      if (newPlayers.length >= config.minPlayers){
        playerData.allowStartGame = true
      }
      setPlayers(newPlayers)
      socket.emit('success-joining', playerData)
    } else {
      socket.emit('room-full', playerData)
    }
  }