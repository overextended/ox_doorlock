local resourceName = 'ND_Core'

if not GetResourceState(resourceName):find('start') then return end

local NDCore = exports[resourceName]

function GetPlayer(src)
    return NDCore:getPlayer(src)
end

function GetCharacterId(player)
    return player.id
end

function IsPlayerInGroup(player, groups)
    local type = type(groups)

    if type == "string" then
        return player.getGroup(groups)
    end

    if table.type(groups) == "array" then
        for i=1, #groups do
            local groupName = groups[i]
            local groupInfo = player.getGroup(groupName)
            if groupInfo then
                return groupName, groupInfo.rank
            end
        end
        return
    end

    for groupName, grade in pairs(groups) do
        local groupInfo = player.getGroup(groupName)
        if groupInfo and grade and grade <= groupInfo.rank then
            return groupName, groupInfo.rank
        end
    end
end
