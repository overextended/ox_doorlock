local resourceName = 'es_extended'

SetTimeout(0, function()
    local ESX = exports[resourceName]:getSharedObject()

    GetPlayer = ESX.GetPlayerFromId

    if not ESX.GetConfig().OxInventory then
        function RemoveItem(playerId, item)
            local player = GetPlayer(playerId)

            if player then player.removeInventoryItem(item, 1) end
        end

        ---@param player table
        ---@param items string[] | { name: string, remove?: boolean, metadata?: string }[]
        ---@param removeItem? boolean
        ---@return string?
        function DoesPlayerHaveItem(player, items, removeItem)
            for i = 1, #items do
                local item = items[i]
                local itemName = item.name or item
                local data = player.getInventoryItem(itemName)

                if data?.count > 0 then
                    if removeItem or item.remove then
                        player.removeInventoryItem(itemName, 1)
                    end

                    return itemName
                end
            end
        end
    end
end)

function GetCharacterId(player)
    return player.identifier
end

function IsPlayerInGroup(player, filter)
    local type = type(filter)

    if type == 'string' then
        if player.job.name == filter then
            return player.job.name, player.job.grade
        end
    else
        local tabletype = table.type(filter)

        if tabletype == 'hash' then
            local grade = filter[player.job.name]

            if grade and grade <= player.job.grade then
                return player.job.name, player.job.grade
            end
        elseif tabletype == 'array' then
            for i = 1, #filter do
                if player.job.name == filter[i] then
                    return player.job.name, player.job.grade
                end
            end
        end
    end
end
