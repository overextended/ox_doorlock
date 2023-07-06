local resourceName = 'ND_Core'

if not GetResourceState(resourceName):find('start') then return end

local ND = exports[resourceName]:GetCoreObject()

GetPlayer = ND.Functions.GetPlayer

function GetCharacterId(player)
    return player.id
end

function IsPlayerInGroup(player, filter)
    local type = type(filter)

    if type == 'string' then
        if player.job == filter then
            return player.job, player.data.groups[player.job].rank
        end
    else
        local tabletype = table.type(filter)

        if tabletype == 'hash' then
            local grade = filter[player.job]

            if grade and grade <= player.data.groups[player.job].rank then
                return player.job, player.data.groups[player.job].rank
            end
        elseif tabletype == 'array' then
            for i = 1, #filter do
                if player.job == filter[i] then
                    return player.job, player.data.groups[player.job].rank
                end
            end
        end
    end
end
