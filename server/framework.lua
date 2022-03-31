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

		if type(group) == 'table' then
			for k, v in pairs(group) do
				if type(k) == 'string' then
					if IsPlayerAceAllowed(source, ('qbcore.%s:%s'):format(k, v)) then
						return true
					end
				else
					if IsPlayerAceAllowed(source, ('qbcore.%s'):format(v)) then
						return true
					end
				end
			end
		else
			return IsPlayerAceAllowed(source, ('qbcore.%s'):format(group))
		end
	end
end
