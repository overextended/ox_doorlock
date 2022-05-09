# Ox Doorlock
Door management resource, with compatibility for ox_core, qb-core, and es_extended.  
Successor to nui_doorlock with less scuff and more stuff.


## Dependencies
### [oxmysql](https://github.com/overextended/oxmysql) or [mysql-async](https://github.com/brouznouf/fivem-mysql-async)

Doors are stored in a database for ease-of-use and to allow data to be easily cleared or shared.


### [ox_lib](https://github.com/overextended/ox_lib) (v2.3.0 or higher)

Used for some UI elements (i.e. notifications, progress circle, input), and cache.


### [qtarget](https://github.com/overextended/qtarget)

Used with lockpicks and the doorlock command.


## Usage
Use the doorlock command to open the UI and enter the settings for your new door.  
Once you confirm, you can use qtarget to select the entity (or entities) to use.


You can use edit as an argument for doorlock to add qtarget options to modify or delete an existing door.


More information and screenshots later..


### API
- Get data for door
```lua
local mrpd_locker_rooms = exports.ox_doorlock:getDoor(1)
local mrpd_locker_rooms = exports.ox_doorlock:getDoorFromName('mrpd locker rooms')
```

- Lock a door from the server
```lua
TriggerEvent('ox_doorlock:setState', mrpd_locker_rooms.id, 1)
```

- Listen for event when door is toggled
```lua
AddEventHandler('ox_doorlock:stateChanged', function(source, doorId, state, usedItem)
    if usedItem == 'trainticket' then
        local xPlayer = ESX.GetPlayerFromId(source)
        xPlayer.removeInventoryItem(usedItem, 1)
    end
end)
```
