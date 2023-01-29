# Ox Doorlock

Door management resource, with compatibility for ox_core, qb-core, and es_extended.  
Successor to nui_doorlock with less scuff and more stuff.

_The UI needs to be built - use the [latest release](https://github.com/overextended/ox_doorlock/releases/latest/download/ox_doorlock.zip) if you want to drag-n-drop._

## Dependencies

### [oxmysql](https://github.com/overextended/oxmysql)

Doors are stored in a database for ease-of-use and to allow data to be easily cleared or shared.

mysql-async is no longer supported.
  - does not support error-catching (pcall)
  - people use older versions which do not support parameters as arrays
  - it isn't maintained and has issues that will never be resolved

### [ox_lib](https://github.com/overextended/ox_lib) (v2.3.0 or higher)

Used for some UI elements (i.e. notifications, progress circle, input), and cache.

### [ox_target](https://github.com/overextended/ox_target) (preferred) or [qtarget](https://github.com/overextended/qtarget) (deprecated) or [qb-target](https://github.com/qbcore-framework/qb-target)

(Optional) Used for lockpicking.

## Usage

Use the `/doorlock` command to open the UI and enter the settings for your new door.  
Once you confirm the settings, activate your targeting resource (typically LALT) to select the entity (or entities) to use.

Adding any arguments after the command will open the closest door to you, to easily modify it.

## Conversion

Placing nui_doorlock config files into the `convert` folder will convert the data and insert it into the database.  
Success is _not_ guaranteed if using a fork on nui_doorlock, like the qb version.

## Client API

- Use the closest door. Still performs server-side checks, so may fail.

```lua
exports.ox_doorlock:useClosestDoor()
```

- Pick the lock of the closest door. Still performs server-side checks, so may fail.

```lua
exports.ox_doorlock:pickClosestDoor()
```

## Server API

- Get data for door

```lua
local mrpd_locker_rooms = exports.ox_doorlock:getDoor(1)
local mrpd_locker_rooms = exports.ox_doorlock:getDoorFromName('mrpd locker rooms')
```

- Set door state (0: unlocked, 1: locked)

```lua
TriggerEvent('ox_doorlock:setState', mrpd_locker_rooms.id, state)
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

## Door Settings

### General

- Door name
  - Used to easily identify the door.
- Passcode
  - Door can be unlocked by anybody by using the code or phrase.
- Autolock interval
  - Door will be locked after x seconds.
- Interact distance
  - Door can only be used when within x metres.
- Door rate
  - Door movement speed for sliding/garage/automatic doors, or swinging doors when locked.
- Locked
  - Sets the door as locked by default.
- Double
  - Door is a set of two doors, controlled together.
- Automatic
  - Sliding/garage/automatic door.
- Lockpick
  - Door can be lockpicked when interacting with a targeting resource.
- Hide UI
  - No indicators (i.e. icon, text) will display on the door.

### Characters

- Character Id
  - Character identifier used by a framework (i.e. player.charid, xPlayer.identifier, Player.CitizenId).

### Groups

- Group
  - Framework dependent, referring to jobs, gangs, etc.
- Grade
  - The minimum grade to allow access for the group (0 to allow all).

### Items

- Item
  - Name of the item.
- Metadata type
  - Requires metadata support (i.e. ox_inventory) to check slot.metadata.type

### Lockpick

- Difficulty
  - Sets the skillcheck difficulty (see [docs](https://overextended.github.io/docs/ox_lib/Interface/Client/skillcheck)).
- Area size
  - Custom difficulty area size.
- Speed multiplier
  - Custom difficulty idicator speed.
