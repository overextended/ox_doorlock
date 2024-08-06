local QBX = exports.qbx_core

function GetPlayer(playerId)
    local player = { source = playerId }
    return player
end

function GetCharacterId(player)
	return QBX:GetPlayer(player.source).PlayerData.citizenid
end

function IsPlayerInGroup(player, filter)
    return QBX:HasGroup(player.source, filter)
end
