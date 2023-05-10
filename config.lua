Config = {}

-- Send a notification when the door is successfully locked/unlocked.
Config.Notify = false

-- Draw a persistent notification while in-range of a door, with a prompt to lock/unlock.
Config.DrawTextUI = false

Config.DrawSprite = {
    -- Unlocked
    [0] = {'mpsafecracking', 'lock_open', 0, 0, 0.018, 0.018, 0, 255, 255, 255, 100},

    -- Locked
    [1] = {'mpsafecracking', 'lock_closed', 0, 0, 0.018, 0.018, 0, 255, 255, 255, 100},
}

-- Allow the following ACL principal to use 'command.doorlock'.
Config.CommandPrincipal = 'group.admin'

-- Allow players with 'command.doorlock' permission to open any doors.
Config.PlayerAceAuthorised = false

-- Default skill check difficulty when no fields are defined in the Lockpick tab.
Config.LockDifficulty = { 'easy', 'easy', 'medium' }

-- Allow lockpicks to be used to lock an already unlocked door.
Config.CanPickUnlockedDoors = false