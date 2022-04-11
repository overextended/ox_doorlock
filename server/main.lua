local doors = {}
local doorId

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
	return door
end

do
	local data = json.decode(LoadResourceFile('ox_doorlock', 'server/doors.json'))

	if data then
		for i = 1, #data do
			createDoor(i, data[i])
		end
	end

	doorId = #doors
end

RegisterNetEvent('ox_doorlock:setState', function(id, state)
	local door = doors[id]

	if door and playerGroup(source, door.groups) then
		door.state = state
		TriggerClientEvent('ox_doorlock:setState', -1, id, state, source)
	else
		TriggerClientEvent('ox_lib:notify', source, {
			type = 'error',
			icon = 'lock',
			description = ('Unable to %s door'):format(state == 0 and 'unlock' or 'lock')
		})
	end
end)

RegisterNetEvent('ox_doorlock:getDoors', function()
	TriggerClientEvent('ox_doorlock:setDoors', source, doors)
end)

RegisterNetEvent('ox_doorlock:removeDoorlock', function(id)
	if IsPlayerAceAllowed(source, 'command.doorlock') then
		doors[id] = nil

		TriggerClientEvent('ox_doorlock:removeDoorlock', -1, id)
		SaveResourceFile('ox_doorlock', 'server/doors.json', json.encode(doors, {indent=true}), -1)
	end
end)

RegisterNetEvent('ox_doorlock:addDoorlock', function(data)
	if IsPlayerAceAllowed(source, 'command.doorlock') then
		doorId += 1
		local door = createDoor(doorId, data)

		TriggerClientEvent('ox_doorlock:setState', -1, door.id, door.state, false, door)
		SaveResourceFile('ox_doorlock', 'server/doors.json', json.encode(doors, {indent=true}), -1)
	end
end)
