local Core = lib.loadFramework()
local ox_inventory = exports.ox_inventory


local function getPlayer(source)
	return Player(source)
end

local function hasGroup(source, groups)
	if not groups then return end

	for k, v in pairs(groups) do
		if IsPlayerAceAllowed(source, ('group.%s:%s'):format(k, v)) then
			return true
		end
	end

	return false
end

local function hasItem(player, items)
	if #items > 1 then
		for _, count in pairs(ox_inventory:Search(player.source, 'count', items)) do
			if count > 0 then
				return true
			end

			return false
		end
	end

	return ox_inventory:GetItem(player.source, items[1], false, true) > 0
end

function isAuthorised(source, door)
	local player, authorised = getPlayer(source)
	if not player then return end

	if authorised ~= false and door.groups then
		authorised = hasGroup(player, door.groups)
	end

	if authorised ~= false and door.items then
		authorised = hasItem(player, door.items)
	end

	return authorised
end

if Core.resource == 'qb-core' then
	function getPlayer(source)
		return Core.Functions.GetPlayer(source)
	end

	function hasGroup(player, groups)
		local jobGrade = groups[player.PlayerData.job.name]

		if jobGrade and player.PlayerData.job.grade.level >= jobGrade then
			return true
		end

		local gangGrade = groups[player.PlayerData.gang.name]

		if gangGrade and player.PlayerData.gang.grade.level >= gangGrade then
			return true
		end

		return false
	end

	function hasItem(player, items)
		-- todo
	end
elseif Core.resource == 'es_extended' then
	function getPlayer(source)
		return Core.GetPlayerFromId(source)
	end

	function hasGroup(player, groups)
		local jobGrade = groups[player.job.name]

		if jobGrade and player.job.grade >= jobGrade then
			return true
		end

		return false
	end

	if not Core.GetConfig().OxInventory then
		function hasItem(player, items)
			for i = 1, #items do
				local item = player.getInventoryItem(items[i])

				if item?.count > 0 then
					return true
				end
			end

			return false
		end
	end
end
