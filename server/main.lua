local doors = {}

local function createDoor(id, door)
	local double = door.doors

	if double then
		for i = 1, 2 do
			double[i].hash = joaat(('ox_door_%s_%s'):format(id, i))

			local coords = double[i].coords
			double[i].coords = vector3(coords.x, coords.y, coords.z)
		end

		door.coords = double[1].coords - ((double[1].coords - double[2].coords) / 2)
	else
		door.hash = joaat(('ox_door_%s'):format(id))
		door.coords = vector3(door.coords.x, door.coords.y, door.coords.z)
	end

	if not door.state then
		door.state = 1
	end

	door.id = id
	doors[id] = door
end

do
	local data = json.decode(LoadResourceFile('ox_doorlock', 'server/doors.json'))

	if data then
		for i = 1, #data do
			createDoor(i, data[i])
		end
	end
end

RegisterNetEvent('ox_doorlock:setState', function(id, state)
	local door = doors[id]

	if door and playerGroup(source, door.groups) then
		door.state = state
		TriggerClientEvent('ox_doorlock:setState', -1, id, state)
	end
end)

RegisterNetEvent('ox_doorlock:getDoors', function()
	TriggerClientEvent('ox_doorlock:setDoors', source, doors)
end)
