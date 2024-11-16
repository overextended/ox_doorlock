local QBCore = exports['qb-core']:GetCoreObject()

function GetPlayer(src)
    return QBCore.Functions.GetPlayer(src)
end

function GetCharacterId(player)
    return player.PlayerData.citizenid
end

function IsPlayerInGroup(player, filter)
    local type = type(filter)

    if type == 'string' then
        if player.PlayerData.job.name == filter then
            return player.PlayerData.job.name, player.PlayerData.job.grade.level
        elseif player.PlayerData.gang.name == filter then
            return player.PlayerData.gang.name, player.PlayerData.gang.grade.level
        end
    else
        local tabletype = table.type(filter)

        if tabletype == 'hash' then
            local jobGrade = filter[player.PlayerData.job.name]

            if jobGrade and jobGrade <= player.PlayerData.job.grade.level then
                return player.PlayerData.job.name, player.PlayerData.job.grade.level
            end

            local gangGrade = filter[player.PlayerData.gang.name]

            if gangGrade and gangGrade <= player.PlayerData.gang.grade.level then
                return player.PlayerData.gang.name, player.PlayerData.gang.grade.level
            end
        elseif tabletype == 'array' then
            for i = 1, #filter do
                if player.PlayerData.job.name == filter[i] then
                    return player.PlayerData.job.name, player.PlayerData.job.grade.level
                elseif player.PlayerData.gang.name == filter[i] then
                    return player.PlayerData.gang.name, player.PlayerData.gang.grade.level
                end
            end
        end
    end
end
