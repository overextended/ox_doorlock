if not LoadResourceFile(lib.name, 'web/build/index.html') then
	error('Unable to load UI. Build ox_doorlock or download the latest release.\n	^3https://github.com/overextended/ox_doorlock/releases/latest/download/ox_doorlock.zip^0')
end

do
	local success, msg = lib.checkDependency('ox_lib', '2.4.0')
	if not success then error(msg) end
end

lib.versionCheck('overextended/ox_doorlock')
lib.locale()

local doors = {}

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
		characters = door.characters,
		groups = door.groups,
		heading = door.heading,
		items = door.items,
		lockpick = door.lockpick,
		hideUi = door.hideUi,
		lockSound = door.lockSound,
		maxDistance = door.maxDistance,
		doorRate = door.doorRate,
		model = door.model,
		state = door.state,
		unlockSound = door.unlockSound,
		passcode = door.passcode
	})
end

local function getDoor(door)
	door = type(door) == 'table' and door or doors[door]

	return {
		id = door.id,
		name = door.name,
		state = door.state,
		coords = door.coords,
		characters = door.characters,
		groups = door.groups,
		items = door.items,
		maxDistance = door.maxDistance,
	}
end

exports('getDoor', getDoor)

exports('getDoorFromName', function(name)
	for _, door in pairs(doors) do
		if door.name == name then
			return getDoor(door)
		end
	end
end)

exports('editDoor', function(id, data)
	local door = doors[id]

	if door then
		for k, v in pairs(data) do
			if k ~= 'id' then
				local current = door[k]
				local t1 = type(current)
				local t2 = type(v)

				if t1 ~= nil and t1 ~= t2 then
					error(("Expected '%s' for door.%s, received %s (%s)"):format(t1, k, t2, v))
				end

				door[k] = v
			end
		end

		MySQL.update('UPDATE ox_doorlock SET name = ?, data = ? WHERE id = ?', { door.name, encodeData(door), id })
		TriggerClientEvent('ox_doorlock:editDoorlock', -1, id, door)
	end
end)

local sounds do
	local files = {}
	local system = os.getenv('OS')
	local command = system and system:match('Windows') and 'dir "' or 'ls "'
	local path = GetResourcePath(cache.resource)
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

		if not door.coords then
			door.coords = double[1].coords - ((double[1].coords - double[2].coords) / 2)
		end
	else
		door.hash = joaat(('ox_door_%s'):format(id))
	end

	door.coords = vector3(door.coords.x, door.coords.y, door.coords.z)

	if not door.state then
		door.state = 1
	end

	if type(door.items?[1]) == 'string' then
		local items = {}

		for i = 1, #door.items do
			items[i] = {
				name = door.items[i],
				remove = false,
			}
		end

		door.items = items
		MySQL.update('UPDATE ox_doorlock SET data = ? WHERE id = ?', { encodeData(door), id })
	end

	doors[id] = door
	return door
end

local isLoaded = false

MySQL.ready(function()
	while Config.DoorList do Wait(100) end

	local success, result = pcall(MySQL.query.await, 'SELECT id, name, data FROM ox_doorlock')

	if not success then
		-- because some people can't run sql files
		success, result = pcall(MySQL.query, [[CREATE TABLE `ox_doorlock` (
			`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
			`name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
			`data` LONGTEXT NOT NULL COLLATE 'utf8mb4_unicode_ci',
			PRIMARY KEY (`id`) USING BTREE
		) COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB; ]])

		if not success then
			return error(result)
		end

		print("Created table 'ox_doorlock' in MySQL database.")
	elseif result then
		for i = 1, #result do
			local door = result[i]
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

    lib.notify(source, { type = 'error', icon = 'lock', description = state == 0 and 'cannot_unlock' or 'cannot_lock' })
end)

RegisterNetEvent('ox_doorlock:getDoors', function()
	local source = source
	while not isLoaded do Wait(100) end
	TriggerClientEvent('ox_doorlock:setDoors', source, doors, sounds)
end)

RegisterNetEvent('ox_doorlock:editDoorlock', function(id, data)
	if IsPlayerAceAllowed(source, 'command.doorlock') then
		if data then
			if not data.coords then
				local double = data.doors
				data.coords = double[1].coords - ((double[1].coords - double[2].coords) / 2)
			end

			if not data.name then
				data.name = tostring(data.coords)
			end
		end

		if id then
			if data then
				MySQL.update('UPDATE ox_doorlock SET name = ?, data = ? WHERE id = ?', { data.name, encodeData(data), id })
			else
				MySQL.update('DELETE FROM ox_doorlock WHERE id = ?', { id })
			end

			doors[id] = data
			TriggerClientEvent('ox_doorlock:editDoorlock', -1, id, data)
		else
			local insertId = MySQL.insert.await('INSERT INTO ox_doorlock (name, data) VALUES (?, ?)', { data.name, encodeData(data) })
			local door = createDoor(insertId, data, data.name)

			TriggerClientEvent('ox_doorlock:setState', -1, door.id, door.state, false, door)
		end
	end
end)

lib.addCommand(Config.CommandPrincipal, 'doorlock', function(source, args)
	TriggerClientEvent('ox_doorlock:triggeredCommand', source, args.closest)
end, {'closest'}, locale('create_modify_lock'))
