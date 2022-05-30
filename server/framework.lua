local Core = lib.getCore()
local ox_inventory = exports.ox_inventory

local function hasItem(player, items)
	if items[2] then
		for name, count in pairs(ox_inventory:Search(player, 'count', items)) do
			if count > 0 then
				return name
			end

			return false
		end
	end

	return ox_inventory:GetItem(player, items[1], false, true) > 0 and items[1]
end

local function removeItem(player, item)
	ox_inventory:RemoveItem(player, item, 1)
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

	if not authorised and door.items then
		authorised = hasItem(player, door.items)
	end

	return authorised
end

if Core.resource == 'qb-core' then
	function getPlayer(source)
		return Core.Functions.GetPlayer(source)
	end

	function hasItem(player, items)
		for i = 1, #items do
			local item = player.Functions.GetItemByName(items[i])

			if item?.count > 0 then
				return item.name
			end
		end

		return false
	end

	function removeItem(player, item)
		player.Functions.RemoveItem(item, 1)
	end
elseif Core.resource == 'es_extended' then
	function getPlayer(source)
		return Core.GetPlayerFromId(source)
	end

	if not Core.GetConfig().OxInventory then
		function hasItem(player, items)
			for i = 1, #items do
				local item = player.getInventoryItem(items[i])

				if item?.count > 0 then
					return item.name
				end
			end

			return false
		end

		function removeItem(player, item)
			Core:removeInventoryItem(player.source, item, 1)
		end
	end
end

RegisterNetEvent('ox_doorlock:breakLockpick', function()
	local player = getPlayer(source)
	if not player then return end

	removeItem(player, 'lockpick')
end)
