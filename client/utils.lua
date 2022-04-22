local Entity = Entity

local function entityIsNotDoor(entity)
	return not Entity(entity).state?.doorId
end

local function entityIsDoor(entity)
	local state = Entity(entity).state
	local doorId = state.doorId

	if doorId and not doors[doorId] then
		state.doorId = nil
		return false
	end

	return doorId
end

local tempData = {}

RegisterNUICallback('createDoor', function(data, cb)
	cb(1)
	tempData = data
end)

RegisterNUICallback('exit', function(_, cb)
	cb(1)
	SetNuiFocus(false, false)
end)


local function removeDoorlock(entity)
	local door = doors[Entity(entity).state?.doorId]

	if door then
		return TriggerServerEvent('ox_doorlock:editDoorlock', door.id)
	end
end

local function addDoorlock(entity)
	tempData[#tempData + 1] = {
		model = GetEntityModel(entity),
		coords = GetEntityCoords(entity),
		heading = math.floor(GetEntityHeading(entity) + 0.5)
	}
end

local function parseTempData()
	local data = {
		name = tempData.doorName,
		passcode = tempData.passcode ~= '' and tonumber(tempData.passcode) or nil,
		autolock = tempData.autolockInterval ~= '' and tonumber(tempData.autolockInterval) or nil,
		maxDistance = tempData.interactDistance ~= '' and tonumber(tempData.interactDistance) or 2,
		auto = tempData.checkboxes.automatic or nil,
		state = tempData.checkboxes.locked and 1 or 0,
		lockpick = tempData.checkboxes.lockpick or nil,
		double = tempData.checkboxes.double and {} or nil,
		groups = #tempData.groupFields > 0 and {},
	}

	for i = 1, #tempData.groupFields do
		local group = tempData.groupFields[i]
		data.groups[group.name] = tonumber(group.grade)
	end

	return data
end

local function newDoorlock()
	SetNuiFocus(true, true)

	SendNUIMessage({
		action = 'setVisible',
		data = true
	})

	repeat Wait(50) until next(tempData)

	local data = parseTempData()

	SetNuiFocus(false, false)
	table.wipe(tempData)

	exports.qtarget:Object({
		options = {
			{
				label = 'Add doorlock',
				icon = 'fas fa-file-circle-plus',
				action = addDoorlock,
				canInteract = entityIsNotDoor
			}
		}
	})

	if data.double then
		repeat Wait(50) until tempData[2]
		data.doors = tempData
	else
		repeat Wait(50) until tempData[1]
		data.model = tempData[1].model
		data.coords = tempData[1].coords
		data.heading = tempData[1].heading
	end

	TriggerServerEvent('ox_doorlock:editDoorlock', false, data)
	exports.qtarget:RemoveObject('Add doorlock')
	table.wipe(tempData)
end

local function parseDoorData(door)
	local data = {
		doorName = door.name,
		passcode = door.passcode,
		autolockInterval = door.autolock,
		interactDistance = door.maxDistance,
		groupFields = {},
		checkboxes = {
			automatic = door.auto,
			locked = door.state == 1,
			lockpick = door.lockpick,
			double = door.double and true,
		}
	}
	local groupSize = 0

	for name, grade in pairs(door.groups) do
		groupSize += 1
		data.groupFields[groupSize] = {
			name = name,
			grade = grade
		}
	end

	return data
end

local function editDoorlock(entity)
	local door = doors[Entity(entity).state?.doorId]

	if door then
		SetNuiFocus(true, true)

		SendNUIMessage({
			action = 'setVisible',
			data = parseDoorData(door)
		})

		repeat Wait(50) until next(tempData)

		local data = parseTempData()
		data.coords = door.coords
		data.heading = door.heading
		data.model = door.model
		data.hash = door.hash
		data.id = door.id

		SetNuiFocus(false, false)
		table.wipe(tempData)
		TriggerServerEvent('ox_doorlock:editDoorlock', data.id, data)
	end
end

local function removeTarget(res)
	if not res or res == 'ox_doorlock' then
		exports.qtarget:RemoveObject({'Remove doorlock', 'Edit doorlock', 'Add doorlock'})
	end
end

local displayTarget

RegisterCommand('doorlock', function(_, args)
	if args[1] == 'edit' then
		displayTarget = not displayTarget

		if displayTarget then
			return exports.qtarget:Object({
				options = {
					{
						label = 'Edit doorlock',
						icon = 'fas fa-file-pen',
						action = editDoorlock,
						canInteract = entityIsDoor
					},
					{
						label = 'Remove doorlock',
						icon = 'fas fa-file-circle-minus',
						action = removeDoorlock,
						canInteract = entityIsDoor
					},
				}
			})
		end

		removeTarget()
	else
		newDoorlock()
	end
end)

AddEventHandler('onResourceStop', removeTarget)
