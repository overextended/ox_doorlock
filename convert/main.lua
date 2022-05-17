Config = {
	DoorList = {}
}

CreateThread(function()
	local files = {}
	local system = os.getenv('OS')
	local command = system and system:match('Windows') and 'dir "' or 'ls "'
	local path = GetResourcePath(GetCurrentResourceName())
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

				if #Config.DoorList > 0 then
					local query = 'INSERT INTO ox_doorlock (name, data) VALUES (?, ?)'
					local queries = {}

					for j = 1, #Config.DoorList do
						local door = Config.DoorList[j]
						local double = door.doors

						local data = {
							auto = door.slides or door.garage,
							autolock = door.autolock and door.autolock / 1000,
							coords = door.objCoords,
							heading = door.objHeading and math.floor(door.objHeading + 0.5),
							model = door.objHash,
							groups = door.authorizedJobs,
							items = door.items,
							lockpick = door.lockpick,
							lockSound = door.audioLock?.file and door.audioLock.file:gsub('%.ogg', ''),
							unlockSound = door.audioUnlock?.file and door.audioUnlock.file:gsub('%.ogg', ''),
							maxDistance = door.maxDistance,
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

						queries[j] = {
							query = query, values = { ('%s %s'):format(fileName, j), json.encode(data) }
						}
					end

					table.wipe(Config.DoorList)

					if MySQL.Sync.transaction(queries) then
						SaveResourceFile('ox_doorlock', ('convert/%s.lua'):format(fileName), '', -1)
					end
				end
			end
		end
	end
end)
