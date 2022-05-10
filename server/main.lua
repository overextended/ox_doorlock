local doors = {}

local function getDoor(door)
	if type(door) == 'number' then
		door = doors[door]
	end

	return {
		id = door.id,
		name = door.name,
		state = door.state,
		coords = door.coords,
		groups = door.groups,
		items = door.items,
		maxDistance = door.maxDistance,
	}
end

exports('getDoor', getDoor)

exports('getDoorFromName', function(name)
	for _, door in pairs(doors) do
		if door.name == name then
			return getDoor
		end
	end
end)

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
			files[#files+1] = file
		end
		dir:close()
	end

	sounds = files
end

local function createDoor(id, door, name)
	local double = door.doors
	door.id = id
	door.name = name

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

	doors[id] = door
	return door
end

local isLoaded = false

MySQL.ready(function()
	local results = MySQL.Sync.fetchAll('SELECT id, name, data FROM ox_doorlock')

	if results then
		for i = 1, #results do
			local door = results[i]
			createDoor(door.id, json.decode(door.data), door.name)
		end
	end

	isLoaded = true
end)

RegisterNetEvent('ox_doorlock:setState', function(id, state, lockpick, passcode)
	local door = doors[id]

	if source == '' then
		source = nil
	end

	if door then
		local authorised = source == nil or isAuthorised(source, door, lockpick, passcode)

		if authorised then
			door.state = state
			TriggerClientEvent('ox_doorlock:setState', -1, id, state, source)

			if door.autolock and state == 0 then
				SetTimeout(door.autolock * 1000, function()
					if door.state ~= 1 then
						door.state = 1

						TriggerClientEvent('ox_doorlock:setState', -1, id, door.state)
						TriggerEvent('ox_doorlock:stateChanged', nil, door.id, door.state == 1)
					end
				end)
			end

			return TriggerEvent('ox_doorlock:stateChanged', source, door.id, state == 1, type(authorised) == 'string' and authorised)
		end
	end

	TriggerClientEvent('ox_lib:notify', source, {
		type = 'error',
		icon = 'lock',
		description = ('Unable to %s door'):format(state == 0 and 'unlock' or 'lock')
	})
end)

RegisterNetEvent('ox_doorlock:getDoors', function()
	local source = source
	while not isLoaded do Wait(100) end
	TriggerClientEvent('ox_doorlock:setDoors', source, doors, sounds)
end)

local function encodeData(door)
	local double = door.doors

	return json.encode({
		auto = door.auto,
		autolock = door.autolock,
		coords = door.coords,
		doors = double and {
			{
				coords = double[1].coords,
				heading = double[1].heading,
				model = double[1].model,
			},
			{
				coords = double[2].coords,
				heading = double[2].heading,
				model = double[2].model,
			},
		},
		groups = door.groups,
		heading = door.heading,
		items = door.items,
		lockpick = door.door,
		lockSound = door.lockSound,
		maxDistance = door.maxDistance,
		model = door.model,
		state = door.state,
		unlockSound = door.unlockSound,
		passcode = door.passcode
	})
end

RegisterNetEvent('ox_doorlock:editDoorlock', function(id, data)
	if IsPlayerAceAllowed(source, 'command.doorlock') then
		if id then
			if data then
				MySQL.Async.execute('UPDATE ox_doorlock SET name = ?, data = ? WHERE id = ?', { data.name, encodeData(data), id })
			else
				MySQL.Async.execute('DELETE FROM ox_doorlock WHERE id = ?', { id })
			end

			doors[id] = data
			TriggerClientEvent('ox_doorlock:editDoorlock', -1, id, data)
		else
			local insertId = MySQL.Sync.insert('INSERT INTO ox_doorlock (name, data) VALUES (?, ?)', { data.name, encodeData(data) })
			local door = createDoor(insertId, data, data.name)

			TriggerClientEvent('ox_doorlock:setState', -1, door.id, door.state, false, door)
		end
	end
end)
