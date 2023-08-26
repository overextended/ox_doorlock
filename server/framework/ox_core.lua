local resourceName = 'ox_core'

if not GetResourceState(resourceName):find('start') then return end

do
	local file = ('imports/%s.lua'):format(lib.context)
	local import = LoadResourceFile(resourceName, file)

	if not import then return end

	local func, err = load(import, ('@@%s/%s'):format(resourceName, file))

	if not func or err then
		return error(err or ('unable to load %s'):format(resourceName))
	end

	func()
end

GetPlayer = Ox.GetPlayer

function GetCharacterId(player)
	return player.charId
end

function IsPlayerInGroup(player, groups)
	return player.hasGroup(groups)
end
