local resourceName = 'qb-core'

if not GetResourceState(resourceName):find('start') then return end

SetTimeout(0, function()
    local QB = exports[resourceName]:GetCoreObject()

    GetPlayer = QB.Functions.GetPlayer

	if GetResourceState('ox_inventory') == 'missing' then
		function RemoveItem(playerId, item, slot)
            local player = GetPlayer(playerId)

            if player then player.Functions.RemoveItem(item, 1, slot) end
		end

		function DoesPlayerHaveItem(player, items)
			for i = 1, #items do
				local item = items[i]

				if item.metadata then
					local playerItems = player.Functions.GetItemsByName(item.name)

					for j = 1, #playerItems do
						local data = playerItems[j]

						if data.info.type == item.metadata then
							if item.remove then
								player.Functions.RemoveItem(item.name, 1, data.slot)
							end

							return item.name
						end
					end
				else
					local data = player.Functions.GetItemByName(item.name)

					if data then
						if item.remove then
							player.Functions.RemoveItem(item.name, 1, data.slot)
						end

						return item.name
					end
				end
			end
		end
    end
end)

function GetCharacterId(player)
	return player.PlayerData.citizenid
end

local groups = { 'job', 'gang' }

function IsPlayerInGroup(player, filter)
	local type = type(filter)

	if type == 'string' then
		for i = 1, #groups do
			local data = player.PlayerData[groups[i]]

			if data.name == filter then
				return data.name, data.grade.level
			end
		end
	else
		local tabletype = table.type(filter)

		if tabletype == 'hash' then
			for i = 1, #groups do
				local data = player.PlayerData[groups[i]]
				local grade = filter[data.name]

				if grade and grade <= data.grade.level then
					return data.name, data.grade.level
				end
			end
		elseif tabletype == 'array' then
			for i = 1, #filter do
				local group = filter[i]

				for j = 1, #groups do
					local data = player.PlayerData[groups[j]]

					if data.name == group then
						return data.name, data.grade.level
					end
				end
			end
		end
	end
end
