lib.locale()
local Entity = Entity

local function getDoorFromEntity(entity)
	local state = Entity(entity).state
	local door = doors[state.doorId]

	if not door then
		state.doorId = nil
	end

	return door
end

local function entityIsNotDoor(entity)
	return not getDoorFromEntity(entity)
end

local pickingLock

local function canPickLock(entity)
	return not pickingLock and getDoorFromEntity(entity)?.lockpick
end

local function pickLock(entity)
	pickingLock = true
	local door = getDoorFromEntity(entity)
	local success
	TaskTurnPedToFaceCoord(cache.ped, door.coords.x, door.coords.y, door.coords.z, 4000)
	Wait(500)

	CreateThread(function()
		success = not cache.vehicle and lib.progressCircle({
			duration = 4000,
			canCancel = true,
			disable = {
				move = true,
				combat = true,
			},
			anim = {
				dict = 'mp_common_heist',
				clip = 'pick_door',
			}
		})
	end)

	while success == nil do
		Wait(50)
		if math.random(1, 500) == 1 then
			TriggerServerEvent('ox_doorlock:breakLockpick')
			lib.cancelProgress()
			lib.notify({ type = 'error', description = locale('lockpick_broke') })
		end
	end

	if math.random(1, 100) == 1 then
		TriggerServerEvent('ox_doorlock:breakLockpick')
		lib.notify({ type = 'error', description = locale('lockpick_broke') })
	end

	if success then
		TriggerServerEvent('ox_doorlock:setState', door.id, door.state == 1 and 0 or 1, true)
	end

	pickingLock = false
end

local target

do
	if GetResourceState('qb-target'):find('start') then
		target = exports['qb-target']
		rawset(target, 'name', 'qb-target')
	else
		target = exports.qtarget
		rawset(target, 'name', 'qtarget')
	end

	local options = {
		{
			label = locale('pick_lock'),
			icon = 'fas fa-user-lock',
			action = pickLock,
			canInteract = canPickLock,
			item = 'lockpick',
			distance = 1
		}
	}

	if target.name == 'qtarget' then
		target:Object({ options = options })
	else
		target:AddGlobalObject({ options = options })
	end
end

local tempData = {}

local function addDoorlock(entity)
	local model = GetEntityModel(entity)
	local coords = GetEntityCoords(entity)

	AddDoorToSystem(`temp`, model, coords.x, coords.y, coords.z, false, false, false)
	DoorSystemSetDoorState(`temp`, 4, false, false)

	coords = GetEntityCoords(entity)
	tempData[#tempData + 1] = {
		model = model,
		coords = coords,
		heading = math.floor(GetEntityHeading(entity) + 0.5)
	}

	RemoveDoorFromSystem(`temp`)
end

local isAddingDoorlock = false

RegisterNUICallback('notify', function(data, cb)
    cb(1)
    lib.notify({title = data})
end)

RegisterNUICallback('createDoor', function(data, cb)
	cb(1)
	SetNuiFocus(false, false)

	if data.items and not next(data.items) then
		data.items = nil
	end

	if data.groups and not next(data.groups) then
		data.groups = nil
	end

	if not data.id then
		isAddingDoorlock = true

		local options = {
			{
				label = locale('add_lock'),
				icon = 'fas fa-file-circle-plus',
				action = addDoorlock,
				canInteract = entityIsNotDoor,
				distance = 10
			},
		}

		if target.name == 'qtarget' then
			target:Object({ options = options })
		else
			target:AddGlobalObject({ options = options })
		end

		if data.doors then
			repeat Wait(50) until tempData[2]
			data.doors = tempData
		else
			repeat Wait(50) until tempData[1]
			data.model = tempData[1].model
			data.coords = tempData[1].coords
			data.heading = tempData[1].heading
		end
	else
		if data.doors then
			for i = 1, 2 do
				local coords = data.doors[i].coords
				data.doors[i].coords = vector3(coords.x, coords.y, coords.z)
				data.doors[i].entity = nil
			end
		else
			data.entity = nil
		end

		data.coords = vector3(data.coords.x, data.coords.y, data.coords.z)
		data.distance = nil
		data.zone = nil
	end

	if isAddingDoorlock then
		if target.name == 'qtarget' then
			target:RemoveObject(locale('add_lock'))
		else
			target:RemoveGlobalObject(locale('add_lock'))
		end

		isAddingDoorlock = false
	end

	TriggerServerEvent('ox_doorlock:editDoorlock', data.id or false, data)
end)

RegisterNUICallback('deleteDoor', function(id, cb)
	cb(1)
	TriggerServerEvent('ox_doorlock:editDoorlock', id)
end)

RegisterNUICallback('exit', function(_, cb)
	cb(1)
	SetNuiFocus(false, false)
end)

local function openUi()
	if source == '' or isAddingDoorlock then return end
	SetNuiFocus(true, true)
	SendNuiMessage(json.encode({
		action = 'setVisible',
		data = doors
	}, { with_hole = false }))
end

RegisterNetEvent('ox_doorlock:triggeredCommand', openUi)

local function removeTarget(res)
	if not res or res == 'ox_doorlock' then
		local options = { locale('remove_lock'), locale('edit_lock'), locale('add_lock'), locale('pick_lock') }

		if target.name == 'qtarget' then
			target:RemoveObject(options)
		else
			target:RemoveGlobalObject(options)
		end
	end
end

AddEventHandler('onResourceStop', removeTarget)
