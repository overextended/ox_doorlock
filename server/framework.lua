local Core = lib.loadFramework(GetConvar('framework', 'ox_core'))

if Core.resource == 'ox_core' then
	function playerGroup(source, group)
		if not group then return true end

		if type(group) == 'table' then
			for k, v in pairs(group) do
				if type(k) == 'string' then
					if IsPlayerAceAllowed(source, ('group.%s:%s'):format(k, v)) then
						return true
					end
				else
					if IsPlayerAceAllowed(source, ('group.%s'):format(v)) then
						return true
					end
				end
			end
		else
			return IsPlayerAceAllowed(source, ('group.%s'):format(group))
		end
	end
elseif Core.resource == 'qb-core' then
	function playerGroup(source, group)
		if not group then return true end

		local player = Core.Functions.GetPlayer(source)
		if not player then return false end

		if type(group) == 'table' then
			local jobGrade = group[player.PlayerData.job.name]
			if jobGrade and player.PlayerData.job.grade.level >= jobGrade then
				return true
			end

			local gangGrade = group[player.PlayerData.gang.name]
			if gangGrade and player.PlayerData.gang.grade.level >= gangGrade then
				return true
			end
		else
			return player.PlayerData.job.name == group or player.PlayerData.gang.name == group
		end
	end
elseif Core.resource == 'es_extended' then
	function playerGroup(source, group)
		if not group then return true end

		local player = Core.GetPlayerFromId(source)
		if not player then return false end

		if type(group) == 'table' then
			local jobGrade = group[player.PlayerData.job.name]
			if jobGrade and player.PlayerData.job.grade.level >= jobGrade then
				return true
			end
		else
			return player.PlayerData.job.name == group
		end
	end
end
