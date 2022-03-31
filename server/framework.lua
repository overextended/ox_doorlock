local Core = lib.loadFramework(GetConvar('framework', 'ox_core'))

if Core.resource == 'ox_core' then
	function playerGroup(source, group)
		if not group then return true end

		for k, v in pairs(group) do
			if IsPlayerAceAllowed(source, ('group.%s:%s'):format(k, v)) then
				return true
			end
		end
	end
end
