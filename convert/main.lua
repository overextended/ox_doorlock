---@type table?
Config.DoorList = {}

local function flattenTableToArray(tbl)
	if type(tbl) == 'table' then
		if table.type(tbl) == 'array' then return tbl end

		local array = {}

		for k in pairs(tbl) do
			array[#array + 1] = k
		end

		return array
	end
end

MySQL.ready(function()
	local files = {}
	local system = os.getenv('OS')
	local command = system and system:match('Windows') and 'dir "' or 'ls "'
	local path = GetResourcePath(cache.resource)
	local types = path:gsub('//', '/') .. '/convert'
	local suffix = command == 'dir "' and '/" /b' or '/"'
	local dir = io.popen(command .. types .. suffix)

	if dir then
		for line in dir:lines() do
			local file = line:gsub('%.lua', '')

			if file and file ~= 'main' then
				files[#files+1] = file
			end
		end
		dir:close()
	end

	if #files > 0 then
		for i = 1, #files do
			local fileName = files[i]
			local file = LoadResourceFile('ox_doorlock', ('convert/%s.lua'):format(fileName))

			if file then
				load(file)()

				if next(Config.DoorList) then
					local size = 0
					local query = 'INSERT INTO ox_doorlock (name, data) VALUES (?, ?)'
					local queries = {}

					for k, door in pairs(Config.DoorList) do
						size += 1
						local double = door.doors
						local qb = door.objName or (double and double[1].objName)

						if qb then
							if double then
								for j = 1, 2 do
									double[j].objHash = double[j].objName
									double[j].objHeading = double[j].objYaw or 0
								end
							else
								door.objHash = door.objName
								door.objHeading = door.objYaw or 0
							end

							local groups = door.authorizedJobs or {}

							if door.authorizedGangs then
								for gang, grade in pairs(door.authorizedGangs) do
									groups[gang] = grade
								end
							end

							door.authorizedJobs = next(groups) and groups
							door.lockpick = door.pickable
							door.showNUI = not door.hideLabel
							door.characters = flattenTableToArray(door.authorizedCitizenIDs)
						end

						local data = {
							auto = door.slides or door.garage or door.sliding or door.doublesliding,
							autolock = (door.autolock and door.autolock / 1000) or (door.autoLock and door.autoLock / 1000),
							coords = door.objCoords,
							heading = door.objHeading and math.floor(door.objHeading + 0.5),
							model = door.objHash,
							characters = door.characters,
							groups = door.authorizedJobs,
							items = door.items,
							lockpick = door.lockpick,
							hideUi = door.showNUI ~= nil and not door.showNUI or false,
							lockSound = door.audioLock?.file and door.audioLock.file:gsub('%.ogg', ''),
							unlockSound = door.audioUnlock?.file and door.audioUnlock.file:gsub('%.ogg', ''),
							maxDistance = door.maxDistance or door.distance,
							doorRate = door.doorRate and door.doorRate + 0.0 or nil,
							state = door.locked and 1 or 0,
							passcode = door.passcode,
							doors = double and {
								{
									coords = double[1].objCoords,
									heading = math.floor(double[1].objHeading + 0.5),
									model = double[1].objHash,
								},
								{
									coords = double[2].objCoords,
									heading = math.floor(double[2].objHeading + 0.5),
									model = double[2].objHash,
								},
							},
						}

						if data.auto and not data.lockSound then
							if door.audioRemote then
								data.lockSound = 'button-remote'
							end
						end

						if double and not data.coords then
							double = data.doors
							data.coords = double[1].coords - ((double[1].coords - double[2].coords) / 2)
						end

						queries[size] = {
							query = query, values = { ('%s %s'):format(fileName, k), json.encode(data) }
						}
					end

					table.wipe(Config.DoorList)

					if MySQL.transaction.await(queries) then
						print(('Converted %s doors from %s.lua'):format(size, fileName))
						SaveResourceFile('ox_doorlock', ('convert/%s.lua'):format(fileName), '', -1)
					end
				end
			end
		end
	end

	Config.DoorList = nil
end)
