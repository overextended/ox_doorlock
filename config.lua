Config = {}

---Send a notification when the door is successfully locked/unlocked.
---@type boolean
Config.Notify = false

---Draw a persistent notification while in-range of a door, with a prompt to lock/unlock.
---@type boolean
Config.DrawTextUI = false

---Set the properties used by [DrawSprite](https://docs.fivem.net/natives/?_0xE7FFAE5EBF23D890).
---@type { [0]: table, [1]: table }
Config.DrawSprite = {
    -- Unlocked
    [0] = { 'mpsafecracking', 'lock_open', 0, 0, 0.018, 0.018, 0, 255, 255, 255, 100 },

    -- Locked
    [1] = { 'mpsafecracking', 'lock_closed', 0, 0, 0.018, 0.018, 0, 255, 255, 255, 100 },
}

---Allow the following ACL principal to use 'command.doorlock'.
---@type string
Config.CommandPrincipal = 'group.admin'

---Allow players with 'command.doorlock' permission to open any doors.
---@type boolean
Config.PlayerAceAuthorised = false

---Default skill check difficulty when no fields are defined in the Lockpick tab.
---@type SkillCheckDifficulity | SkillCheckDifficulity[]
Config.LockDifficulty = { 'easy', 'easy', 'medium' }

---Allow lockpicks to be used to lock an already unlocked door.
---@type boolean?
Config.CanPickUnlockedDoors = false

---Items that function as lockpicks. Needed for ox_target, and authorisation checks.
---@type string[]
Config.LockpickItems = {
    'lockpick'
}
