local Core = lib.getCore()
local ox_inventory = exports.ox_inventory

if Ox then
	lib.getPlayer = Ox.GetPlayer
end

local function removeItem(player, item, slot)
	ox_inventory:RemoveItem(player.source, item, 1, nil, slot)
end

local function hasItem(player, items)
	for i = 1, #items do
		local item = items[i]
		local data = ox_inventory:Search(player.source, 1, item.name, item.metadata)[1]

		if data and data.count > 0 then
			if item.remove then
				removeItem(player, item.name, data.slot)
			end

			return true
		end
	end
end

local function getCharacterId(player)
	return player.charid
end

function isAuthorised(source, door, lockpick, passcode)
	local player, authorised = lib.getPlayer(source)
	if not player then return end

	if lockpick and door.lockpick then
		return 'lockpick'
	end

	if passcode and passcode == door.passcode then
		return true
	end

	if door.groups then
		authorised = player.hasGroup(door.groups)
	end

	if not authorised and door.characters then
		authorised = lib.table.contains(door.characters, getCharacterId(player))
	end

	if not authorised and door.items then
		authorised = hasItem(player, door.items)
	end

	if not authorised and Config.PlayerAceAuthorised then
		authorised = IsPlayerAceAllowed(source, 'command.doorlock')
	end

	return authorised
end

if Core.resource == 'qb-core' then
	function getCharacterId(player)
		return player.PlayerData.citizenid
	end

	function hasItem(player, items)
		for i = 1, #items do
			local item = items[i]

			if item.metadata then
				local playerItems = player.Functions.GetItemsByName(item.name)

				for j = 1, #playerItems do
					local data = playerItems[j]

					if data.info.type == item.metadata then
						if item.remove then
							removeItem(player, item.name, data.slot)
						end

						return true
					end
				end
			else
				local data = player.Functions.GetItemByName(item.name)

				if data then
					if item.remove then
						removeItem(player, item.name, data.slot)
					end

					return true
				end
			end
		end
	end

	function removeItem(player, item, slot)
		player.Functions.RemoveItem(item, 1, slot)
	end
elseif Core.resource == 'es_extended' then
	function getCharacterId(player)
		return player.identifier
	end

	if not Core.GetConfig().OxInventory then
		function hasItem(player, items)
			for i = 1, #items do
				local item = items[i]
				local data = player.getInventoryItem(item.name)

				if data?.count > 0 then
					if item.remove then
						removeItem(player, item.name)
					end

					return item.name
				end
			end

			return false
		end

		function removeItem(player, item)
			player.removeInventoryItem(item, 1)
		end
	end
end

RegisterNetEvent('ox_doorlock:breakLockpick', function()
	local player = lib.getPlayer(source)
	if not player then return end

	removeItem(player, 'lockpick')
end)
