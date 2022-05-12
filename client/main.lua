TriggerServerEvent('ox_doorlock:getDoors')

local function createDoor(door)
	local double = door.doors

	if double then
		for i = 1, 2 do
			AddDoorToSystem(double[i].hash, double[i].model, double[i].coords.x, double[i].coords.y, double[i].coords.z, false, false, false)
			DoorSystemSetDoorState(double[i].hash, 4, false, false)
			DoorSystemSetDoorState(double[i].hash, door.state, false, false)
		end
	else
		AddDoorToSystem(door.hash, door.model, door.coords.x, door.coords.y, door.coords.z, false, false, false)
		DoorSystemSetDoorState(door.hash, 4, false, false)
		DoorSystemSetDoorState(door.hash, door.state, false, false)
	end
end

local nearbyDoors = {}
local Entity = Entity

RegisterNetEvent('ox_doorlock:setDoors', function(data, sounds)
	doors = data

	SendNUIMessage({
		action = 'setSoundFiles',
		data = sounds
	})

	for _, door in pairs(data) do
		createDoor(door)
	end

	while true do
		table.wipe(nearbyDoors)
		local coords = GetEntityCoords(cache.ped)

		for _, door in pairs(doors) do
			local double = door.doors
			door.distance = #(coords - door.coords)

			if double then
				if door.distance < 80 then
					if not double[1].entity and IsModelValid(double[1].model) and IsModelValid(double[2].model) then
						for i = 1, 2 do
							local entity = GetClosestObjectOfType(double[i].coords.x, double[i].coords.y, double[i].coords.z, 1.0, double[i].model, false, false, false)

							if entity ~= 0 then
								double[i].entity = entity
								Entity(entity).state.doorId = door.id
							end
						end
					end

					nearbyDoors[#nearbyDoors + 1] = door
				elseif double[1].entity then
					for i = 1, 2 do
						double[i].entity = nil
					end
				end
			elseif door.distance < 80 then
				if not door.entity and IsModelValid(door.model) then
					local entity = GetClosestObjectOfType(door.coords.x, door.coords.y, door.coords.z, 1.0, door.model, false, false, false)

					if entity ~= 0 then
						local min, max = GetModelDimensions(door.model)
						local vecs = {
							GetOffsetFromEntityInWorldCoords(entity, min.x, min.y, min.z),
							GetOffsetFromEntityInWorldCoords(entity, min.x, min.y, max.z),
							GetOffsetFromEntityInWorldCoords(entity, min.x, max.y, max.z),
							GetOffsetFromEntityInWorldCoords(entity, min.x, max.y, min.z),
							GetOffsetFromEntityInWorldCoords(entity, max.x, min.y, min.z),
							GetOffsetFromEntityInWorldCoords(entity, max.x, min.y, max.z),
							GetOffsetFromEntityInWorldCoords(entity, max.x, max.y, max.z),
							GetOffsetFromEntityInWorldCoords(entity, max.x, max.y, min.z)
						}

						local centroid = vec(0,0,0)

						for i = 1, 8 do
							centroid += vecs[i]
						end

						door.coords = centroid / 8
						door.entity = entity
						Entity(entity).state.doorId = door.id
					end
				end

				nearbyDoors[#nearbyDoors + 1] = door
			elseif door.entity then
				door.entity = nil
			end
		end

		Wait(500)
	end
end)

RegisterNetEvent('ox_doorlock:setState', function(id, state, source, data)
	if data then
		doors[id] = data
		createDoor(data)
	end

	if source == cache.serverId then
		if state == 0 then
			lib.notify({
				type = 'success',
				icon = 'unlock',
				description = 'Unlocked door'
			})
		else
			lib.notify({
				type = 'success',
				icon = 'lock',
				description = 'Locked door'
			})
		end
	end

	local door = data or doors[id]
	local double = door.doors
	door.state = state

	if double then
		while not door.auto and door.state == 1 and double[1].entity do
			local doorOneHeading = double[1].heading
			local doorOneCurrentHeading = math.floor(GetEntityHeading(double[1].entity) + 0.5)

			if doorOneHeading == doorOneCurrentHeading then
				DoorSystemSetDoorState(double[1].hash, door.state, false, false)
			end

			local doorTwoHeading = double[2].heading
			local doorTwoCurrentHeading = math.floor(GetEntityHeading(double[2].entity) + 0.5)

			if doorTwoHeading == doorTwoCurrentHeading then
				DoorSystemSetDoorState(double[2].hash, door.state, false, false)
			end

			if doorOneHeading == doorOneCurrentHeading and doorTwoHeading == doorTwoCurrentHeading then break end
			Wait(0)
		end

		DoorSystemSetDoorState(double[1].hash, door.state, false, false)
		DoorSystemSetDoorState(double[2].hash, door.state, false, false)
	else
		while not door.auto and door.state == 1 and door.entity do
			local heading = math.floor(GetEntityHeading(door.entity) + 0.5)
			if heading == door.heading then break end
			Wait(0)
		end

		DoorSystemSetDoorState(door.hash, door.state, false, false)
	end

	if door.distance and door.distance < 20 then
		local volume = (0.01 * GetProfileSetting(300)) / (door.distance / 2)
		if volume > 1 then volume = 1 end
		local sound = state == 0 and door.unlockSound or door.lockSound or 'door-bolt-4'

		SendNUIMessage({
			action = 'playSound',
			data = {
				sound = sound,
				volume = volume
			}
		})
	end
end)

RegisterNetEvent('ox_doorlock:editDoorlock', function(id, data)
	local door = doors[id]

	if not data and door.entity then
		Entity(door.entity).state.doorId = nil
		local double = door.doors

		if double then
			DoorSystemSetDoorState(double[1].hash, 0, false, false)
			DoorSystemSetDoorState(double[2].hash, 0, false, false)
		else
			DoorSystemSetDoorState(door.hash, 0, false, false)
		end
	end

	doors[id] = data
end)

CreateThread(function()
	local lastTriggered = 0
	local lockDoor = '[E] Lock door'
	local unlockDoor = '[E] Unlock door'
	local closestDoor
	local showUI

	while true do
		local num = #nearbyDoors

		if num > 0 then
			for i = 1, num do
				local door = nearbyDoors[i]

				if door.distance < door.maxDistance then
					if door.distance < (closestDoor?.distance or 10) then
						closestDoor = door
					end

					SetDrawOrigin(door.coords.x, door.coords.y, door.coords.z)
					SetTextScale(0.35, 0.35)
					SetTextFont(4)
					SetTextEntry('STRING')
					SetTextCentre(1)
					local text = door.state == 0 and 'Unlocked' or 'Locked'
					AddTextComponentString(text)
					DrawText(0.0, 0.0)
					DrawRect(0.0, 0.0125, 0.02 + text:len() / 360, 0.03, 25, 25, 25, 140)
					ClearDrawOrigin()
				end
			end
		else closestDoor = nil end

		if closestDoor and closestDoor.distance < closestDoor.maxDistance then
			if closestDoor.state == 0 and showUI ~= 0 then
				lib.showTextUI(lockDoor)
				showUI = 0
			elseif closestDoor.state == 1 and showUI ~= 1 then
				lib.showTextUI(unlockDoor)
				showUI = 1
			end

			if IsDisabledControlJustReleased(0, 38) then
				if closestDoor.passcode then
					local input = lib.inputDialog('Door lock', {
						{ type = "input", label = "Passcode", password = true, icon = 'lock' },
					})

					if input then
						TriggerServerEvent('ox_doorlock:setState', closestDoor.id, closestDoor.state == 1 and 0 or 1, false, input[1])
					end
				else
					local gameTimer = GetGameTimer()

					if gameTimer - lastTriggered > 500 then
						lastTriggered = gameTimer
						TriggerServerEvent('ox_doorlock:setState', closestDoor.id, closestDoor.state == 1 and 0 or 1)
					end
				end
			end
		elseif showUI then
			lib.hideTextUI()
			showUI = nil
		end

		Wait(num > 0 and 0 or 500)
	end
end)
