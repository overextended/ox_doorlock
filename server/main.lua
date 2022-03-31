local doors = {}

-- sample data
do
	local data = {
		{
			model = 1557126584,
			coords = vector3(450.1042, -985.7384, 30.83931),
			heading = 90,
			maxDistance = 2,
			groups = {
				police = 1,
			}
		},
		{
			model = -1320876379,
			coords = vector3(446.5728, -980.0106, 30.83931),
			heading = 180,
			maxDistance = 2,
			groups = {
				police = 1,
			}
		},
		{
			doors = {
				{
					model = -1215222675,
					heading = 270,
					coords = vector3(434.7479, -980.6184, 30.83927),
				},
				{
					model = 320433149,
					heading = 270,
					coords = vector3(434.7479, -983.2151, 30.83927),
				}
			},
			maxDistance = 3,
			state = 0,
			groups = {
				police = 1,
			}
		},
	}

	for i = 1, #data do
		local door = setmetatable(data[i], CDoor)
		local double = door.doors

		if double then
			double[1].hash = joaat(('ox_door_%s_1'):format(i))
			double[2].hash = joaat(('ox_door_%s_2'):format(i))
			door.coords = double[1].coords - ((double[1].coords - double[2].coords) / 2)
		end

		if not door.state then
			door.state = 1
		end

		door.hash = joaat(('ox_door_%s'):format(i))
		doors[door.hash] = door
	end
end

RegisterNetEvent('ox_doorlock:setState', function(hash, state)
	local door = doors[hash]

	if door and playerGroup(source, door.groups) then
		door.state = state
		TriggerClientEvent('ox_doorlock:setState', -1, hash, state)
	end
end)

RegisterNetEvent('ox_doorlock:getDoors', function()
	TriggerClientEvent('ox_doorlock:setDoors', source, doors)
end)

