local doors = {}
local CDoor = {}
CDoor.__index = CDoor

function CDoor:setState(state, forceShut)
	self.state = state
	local double = self.doors

	if forceShut then
		self:setState(4)
	end

	if double then
		DoorSystemSetDoorState(double[1].hash, state)
		DoorSystemSetDoorState(double[2].hash, state)
	else
		DoorSystemSetDoorState(self.hash, state)
	end
end

local lastTriggered = 0

function CDoor:toggle()
	local gameTimer = GetGameTimer()

	if gameTimer - lastTriggered > 500 then
		lastTriggered = gameTimer
		TriggerServerEvent('ox_doorlock:setState', self.hash, self.state == 1 and 0 or 1)
	end
end

function CDoor:draw()
	SetDrawOrigin(self.coords.x, self.coords.y, self.coords.z)
	SetTextScale(0.35, 0.35)
	SetTextFont(4)
	SetTextEntry('STRING')
	SetTextCentre(1)
	local text = self.state == 0 and 'Unlocked' or 'Locked'
	AddTextComponentString(text)
	DrawText(0.0, 0.0)
	DrawRect(0.0, 0.0125, 0.02 + text:len() / 360, 0.03, 25, 25, 25, 140)
	ClearDrawOrigin()
end

local nearbyDoors = {}

RegisterNetEvent('ox_doorlock:setDoors', function(data)
	doors = data

	for hash, door in pairs(data) do
		setmetatable(door, CDoor)
		local double = door.doors

		if double then
			AddDoorToSystem(double[1].hash, double[1].model, double[1].coords.x, double[1].coords.y, double[1].coords.z, false, false, false)
			AddDoorToSystem(double[2].hash, double[2].model, double[2].coords.x, double[2].coords.y, double[2].coords.z, false, false, false)
		else
			AddDoorToSystem(hash, door.model, door.coords.x, door.coords.y, door.coords.z, false, false, false)
		end
	end

	while true do
		table.wipe(nearbyDoors)
		local coords = GetEntityCoords(cache.ped)

		for hash, door in pairs(doors) do
			door.distance = #(coords - door.coords)

			if door.distance < 50 then
				local double = door.doors
				local doorState = DoorSystemGetDoorState(double and double[1].hash or hash)

				if doorState ~= door.state then door:setState(door.state, true) end

				if not door.entity then
					if double then
						double[1].entity = GetClosestObjectOfType(double[1].coords.x, double[1].coords.y, double[1].coords.z, 0.5, double[1].model, false, false, false)
						double[2].entity = GetClosestObjectOfType(double[2].coords.x, double[2].coords.y, double[2].coords.z, 0.5, double[2].model, false, false, false)
					else
						local entity = GetClosestObjectOfType(door.coords.x, door.coords.y, door.coords.z, 0.5, door.model, false, false, false)
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

						door.entity = entity
						door.coords = centroid / 8
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

RegisterNetEvent('ox_doorlock:setState', function(hash, state)
	doors[hash]:setState(state)
end)

CreateThread(function()
	while true do
		local num = #nearbyDoors

		if num > 0 then
			for i = 1, num do
				local door = nearbyDoors[i]

				if door.distance < door.maxDistance then
					if IsDisabledControlJustReleased(0, 38) then
						door:toggle()
					end

					door:draw()
				end
			end
		end

		Wait(num > 0 and 0 or 500)
	end
end)

TriggerServerEvent('ox_doorlock:getDoors')
