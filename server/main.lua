local doors = {}
local doorId = 0

local sounds do
	local files = {}
	local system = os.getenv('OS')
	local command = system and system:match('Windows') and 'dir "' or 'ls "'
	local path = GetResourcePath(GetCurrentResourceName())
	local types = path:gsub('//', '/') .. '/web/build/sounds'
	local suffix = command == 'dir "' and '/" /b' or '/"'
	local dir = io.popen(command .. types .. suffix)

	if dir then
		for line in dir:lines() do
			local file = line:gsub('%.ogg', '')
			print(file)
			files[#files+1] = file
		end
		dir:close()
	end

	sounds = files
end

local function createDoor(door)
	doorId += 1
	local double = door.doors

	if double then
		for i = 1, 2 do
			double[i].hash = joaat(('ox_door_%s_%s'):format(doorId, i))

			local coords = double[i].coords
			double[i].coords = vector3(coords.x, coords.y, coords.z)
		end

		door.coords = double[1].coords - ((double[1].coords - double[2].coords) / 2)
	else
		door.hash = joaat(('ox_door_%s'):format(doorId))
		door.coords = vector3(door.coords.x, door.coords.y, door.coords.z)
	end

	if not door.state then
		door.state = 1
	end

	door.id = doorId
	doors[doorId] = door
	return door
end

do
	local data = json.decode(LoadResourceFile('ox_doorlock', 'server/doors.json'))

	if data then
		for _, door in pairs(data) do
			createDoor(door)
		end
	end

	doorId = #doors
end

RegisterNetEvent('ox_doorlock:setState', function(id, state, lockpick)
	local door = doors[id]

	if door and isAuthorised(source, door, lockpick) then
		door.state = state
		TriggerClientEvent('ox_doorlock:setState', -1, id, state, source)

		if door.autolock and state == 0 then
			SetTimeout(door.autolock * 1000, function()
				if door.state ~= 1 then
					door.state = 1
					TriggerClientEvent('ox_doorlock:setState', -1, id, door.state)
				end
			end)
		end
	else
		TriggerClientEvent('ox_lib:notify', source, {
			type = 'error',
			icon = 'lock',
			description = ('Unable to %s door'):format(state == 0 and 'unlock' or 'lock')
		})
	end
end)

RegisterNetEvent('ox_doorlock:getDoors', function()
	TriggerClientEvent('ox_doorlock:setDoors', source, doors, sounds)
end)

RegisterNetEvent('ox_doorlock:editDoorlock', function(id, data)
	if IsPlayerAceAllowed(source, 'command.doorlock') then
		if id then
			doors[id] = data
			TriggerClientEvent('ox_doorlock:editDoorlock', -1, id, data)
		else
			local door = createDoor(data)

			TriggerClientEvent('ox_doorlock:setState', -1, door.id, door.state, false, door)
		end

		SaveResourceFile('ox_doorlock', 'server/doors.json', json.encode(doors, {indent=true}), -1)
	end
end)
