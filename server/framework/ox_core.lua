if not lib.checkDependency('ox_core', '0.21.3', true) then return end

local Ox = require '@ox_core.lib.init' --[[@as OxServer]]

GetPlayer = Ox.GetPlayer

---@param player OxPlayerServer
function GetCharacterId(player)
	return player.charId
end

---@param player OxPlayerServer
---@param groups string | string[] | table<string, number>
function IsPlayerInGroup(player, groups)
	return player.getGroup(groups)
end
