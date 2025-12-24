var eventHandlers = {
    polymorph: {
        execute: function(eventData, gameState) {
            const { picks, currentRound } = eventData;
            
            if (!picks || picks.length < 2) return;
            
            const originalPlayer = picks[0];
            const newForm = picks[1];
            
            if (!gameState.polymorphedPlayers) {
                gameState.polymorphedPlayers = new Map();
            }
            
            gameState.polymorphedPlayers.set(originalPlayer.username, {
                originalName: originalPlayer.username,
                newForm: newForm.username,
                round: currentRound
            });
        },
        
        getDisplayName: function(username, gameState) {
            if (!gameState.polymorphedPlayers) return username;
            
            const polymorph = gameState.polymorphedPlayers.get(username);
            if (!polymorph) return username;
            
            return `${polymorph.newForm} (formerly ${polymorph.originalName})`;
        },
        
        getWinnerMessage: function(username, gameState) {
            if (!gameState.polymorphedPlayers) return null;
            
            const polymorph = gameState.polymorphedPlayers.get(username);
            if (!polymorph) return null;
            
            return `${polymorph.newForm} won the Noita Games! wait.. thats not right.. ${polymorph.originalName} won? what?`;
        },
        
        clearRound: function(gameState) {
            if (gameState.polymorphedPlayers) {
                gameState.polymorphedPlayers.clear();
            }
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = eventHandlers;
}

if (typeof window !== 'undefined') {
    window.eventHandlers = eventHandlers;
}
