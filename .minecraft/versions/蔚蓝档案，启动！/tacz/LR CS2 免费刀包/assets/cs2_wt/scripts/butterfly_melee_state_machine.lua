-- 这些栈顶指针在分配新的轨道行和轨道时起作用
-- 轨道行 栈顶指针
local track_line_top = {value = 0}
-- 主轨道行 的 轨道 栈顶指针
local static_track_top = {value = 0}

-- 混合轨道行 的 轨道 栈顶指针
local blending_track_top = {value = 0}

-- 栈顶指针自增函数，用于分配新的轨道行或者轨道
local function increment(obj)
    obj.value = obj.value + 1
    return obj.value - 1
end

-- 主轨道行
local STATIC_TRACK_LINE = increment(track_line_top)
local BASE_TRACK = increment(static_track_top)
local MAIN_TRACK = increment(static_track_top)

-- 混合轨道行
local BLENDING_TRACK_LINE = increment(track_line_top)
local MOVEMENT_TRACK = increment(blending_track_top)

-- 播放丢枪动画的方法
local function runPutAwayAnimation(context)
    local put_away_time = context:getPutAwayTime()
    -- 此处获取的轨道是位于主轨道行上的主轨道
    local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)
    -- 播放 put_away 动画,并且将其过渡时长设为从上下文里传入的 put_away_time * 0.75
    context:runAnimation("put_away", track, false, PLAY_ONCE_HOLD, put_away_time * 0.75)
    -- 设定动画进度为最后一帧
    context:setAnimationProgress(track, 1, true)
    -- 将动画进度向前拨动 {put_away_time}
    context:adjustAnimationProgress(track, -put_away_time, false)
end

local main_track_states = {
    -- 起始
    start = {},
    -- 闲置
    idle = {},
    -- 检视
    inspect = {},
    -- 最终态
    final = {},
    attack_index = 0
}

local base_track_state = {}
-- 进入基础状态,直接播放 static_idle
function base_track_state.entry(this, context)
    -- 在 主轨道行 的 基础轨道 上循环播放 static_idle
    context:runAnimation("static_idle", context:getTrack(STATIC_TRACK_LINE, BASE_TRACK), false, LOOP, 0)
end

function main_track_states.start.update(this, context)
    context:trigger(INPUT_DRAW)
end

function main_track_states.start.transition(this, context, input)
    if (input == INPUT_DRAW) then
        local i = math.random(0, 1)
        if (i > 0) then
            context:runAnimation("draw_" .. i, context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK), false, PLAY_ONCE_STOP, 0)
        else
            context:runAnimation("draw", context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK), false, PLAY_ONCE_STOP, 0)
        end
        return this.main_track_states.idle
    end
end

function main_track_states.idle.entry(this, context)
    --print("idle entry")
end

function main_track_states.idle.update(this, context)

end

function main_track_states.idle.transition(this, context, input)
    --print("idle entry - " .. input)
    if (input == INPUT_PUT_AWAY) then
        runPutAwayAnimation(context)
        -- 丢枪后转到最终态
        return this.main_track_states.final
    elseif (input == INPUT_INSPECT) then
        local i = math.random(0, 2)
        if (i > 0) then
            context:runAnimation("inspect_" .. i, context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK), false, PLAY_ONCE_STOP, 0)
        else
            context:runAnimation("inspect", context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK), false, PLAY_ONCE_STOP, 0)
        end
        return this.main_track_states.idle
    elseif input == "attack_left" then
        local counter = this.main_track_states.attack_index
        local animationName = "melee_" .. tostring(counter + 1)
        this.main_track_states.attack_index = (counter + 1) % 2
        context:runAnimation(animationName, context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK), false, PLAY_ONCE_STOP, 0.2)
        return this.main_track_states.idle
    elseif input == "attack_right" then
        local animationName = "melee_3"
        context:runAnimation(animationName, context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK), false, PLAY_ONCE_STOP, 0.2)
        return this.main_track_states.idle
    end
end

-- 移动轨道的状态
local movement_track_states = {
    -- 静止不动(或者在天上)
    idle = {},
    -- 奔跑, -1 是没有奔跑, 0 是在奔跑中
    run = {
        mode = -1,
        time = 0
    },
    -- 行走, -1 是没有行走, 0 是在空中, 1 是正在瞄准, 2 是在向前走, 3 是向后退, 4 是向侧面走
    walk = {
        mode = -1
    },
    -- 战术冲刺
    sprint = {
        mode = -1
    }
}

-- 更新静止态
function movement_track_states.idle.update(this, context)
    -- 此处获取的是混合轨道行的移动轨道
    local track = context:getTrack(BLENDING_TRACK_LINE, MOVEMENT_TRACK)
    -- 如果轨道空闲，则播放 idle 动画
    -- 注意此处没有写成是在 entry 播放 idle 动画是因为要实时检测轨道是否空闲
    if (context:isStopped(track) or context:isHolding(track)) then
        context:runAnimation("idle", track, true, LOOP, 0)
    end
end

-- 转出静止态
function movement_track_states.idle.transition(this, context, input)
    -- 如果玩家在奔跑则转去奔跑态
    if (input == INPUT_RUN) then
        if (context:isStopped(context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK))) then
            return this.movement_track_states.run
        else
            return this.movement_track_states.walk
        end
        -- 如果玩家在行走则转去行走态
    elseif (input == INPUT_WALK) then
        return this.movement_track_states.walk
    end
end

-- 进入奔跑态
function movement_track_states.run.entry(this, context)
    this.movement_track_states.run.mode = -1
    this.movement_track_states.run.time = context:getCurrentTimestamp()
    -- 此处播放的轨道是混合轨道行的移动轨道,播放的动画是奔跑的起手式,播放结束后是挂起动画而不是停止
    context:runAnimation("run_start", context:getTrack(BLENDING_TRACK_LINE, MOVEMENT_TRACK), true, PLAY_ONCE_HOLD, 0.2)
end

-- 退出奔跑态
function movement_track_states.run.exit(this, context)
    -- 此时播放的动画是奔跑结束回到 idle 的动画,同理播放完后挂起
    context:runAnimation("run_end", context:getTrack(BLENDING_TRACK_LINE, MOVEMENT_TRACK), true, PLAY_ONCE_HOLD, 0.3)
end

-- 更新奔跑态
function movement_track_states.run.update(this, context)
    local track = context:getTrack(BLENDING_TRACK_LINE, MOVEMENT_TRACK)
    local state = this.movement_track_states.run;
    -- 等待 run_start 结束,然后循环播放 run ,此处的判断准则是轨道是否挂起,也就是为什么 entry 里播放动画要选 PLAY_ONCE_HOLD 模式
    if (context:isHolding(track)) then
        context:runAnimation("run", track, true, LOOP, 0.2)
        -- 检测是否奔跑的标志位 0
        state.mode = 0
        context:anchorWalkDist() -- 打 walkDist 锚点，确保 run 动画的起点一致
    end
    if (state.mode ~= -1) then
        if (not context:isOnGround()) then
            -- 如果玩家在空中，则播放 run_hold 动画以稳定枪身
            if (state.mode ~= 1) then
                state.mode = 1
                context:runAnimation("run_hold", track, true, LOOP, 0.6)
            end
        else
            -- 如果玩家在地面，则切换回 run 动画
            if (state.mode ~= 0) then
                state.mode = 0
                context:runAnimation("run", track, true, LOOP, 0.2)
            end
            -- 根据 walkDist 设置 run 动画的进度
            context:setAnimationProgress(track, (context:getWalkDist() % 2.0) / 2.0, true)
        end
    end
end

-- 转出奔跑态
function movement_track_states.run.transition(this, context, input)
    -- 收到闲置输入则转去闲置态
    if (input == INPUT_IDLE) then
        return this.movement_track_states.idle
        -- 收到行走输入则转去行走态
    elseif (input == INPUT_WALK or not context:isStopped(context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK))) then
        return this.movement_track_states.walk
    end
end


-- 进入行走态
function movement_track_states.walk.entry(this, context)
    -- 此时给标志位置为 -1 相当于一个初始化
    this.movement_track_states.walk.mode = -1
end

-- 退出行走态
function movement_track_states.walk.exit(this, context)
    -- 手动播放一次 idle 动画以打断 walk 动画的循环
    context:runAnimation("idle", context:getTrack(BLENDING_TRACK_LINE, MOVEMENT_TRACK), true, PLAY_ONCE_HOLD, 0.4)
end

-- 更新行走态
function movement_track_states.walk.update(this, context)
    -- 此处获取的是混合轨道行的移动轨道
    local track = context:getTrack(BLENDING_TRACK_LINE, MOVEMENT_TRACK)
    -- 这里的 state 代指自身,相当于一个简化写法
    local state = this.movement_track_states.walk
    if (not context:isOnGround()) then
        -- 如果玩家在空中，则播放 idle 动画以稳定枪身
        if (state.mode ~= 0) then
            state.mode = 0
            context:runAnimation("idle", track, true, LOOP, 0.6)
        end
    elseif (context:isInputUp()) then
        -- 如果正在向前走，则需要播放 walk_forward 动画
        if (state.mode ~= 2) then
            state.mode = 2
            context:runAnimation("walk_forward", track, true, LOOP, 0.4)
            context:anchorWalkDist() -- 打 walkDist 锚点，确保行走动画的起点一致
        end
    elseif (context:isInputDown()) then
        -- 如果正在向后退，则需要播放 walk_backward 动画
        if (state.mode ~= 3) then
            state.mode = 3
            context:runAnimation("walk_backward", track, true, LOOP, 0.4)
            context:anchorWalkDist() -- 打 walkDist 锚点，确保行走动画的起点一致
        end
    elseif (context:isInputLeft() or context:isInputRight()) then
        -- 如果正在向侧面，则需要播放 walk_sideway 动画
        if (state.mode ~= 4) then
            state.mode = 4
            context:runAnimation("walk_sideway", track, true, LOOP, 0.4)
            context:anchorWalkDist() -- 打 walkDist 锚点，确保行走动画的起点一致
        end
    end
    -- 根据 walkDist 设置行走动画的进度
    if (state.mode >= 1 and state.mode <= 4) then
        context:setAnimationProgress(track, (context:getWalkDist() % 2.0) / 2.0, true)
    end
end

-- 转出行走态,这部分和转出奔跑态是一样的
function movement_track_states.walk.transition(this, context, input)
    -- 收到闲置信号则转到闲置态
    if (input == INPUT_IDLE) then
        return this.movement_track_states.idle
        -- 收到奔跑信号则转到奔跑态
    elseif (input == INPUT_RUN) then
        if (context:isStopped(context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK))) then
            return this.movement_track_states.run
        end
    end
end
-- 结束移动轨道的状态

local M = {
    track_line_top = track_line_top,
    STATIC_TRACK_LINE = STATIC_TRACK_LINE,

    base_track_state = base_track_state,
    main_track_states = main_track_states,
    movement_track_states = movement_track_states,
}

-- 状态机初始化函数，在切入物品的时候调用
function M:initialize(context)
    context:ensureTrackLineSize(track_line_top.value)
    context:ensureTracksAmount(STATIC_TRACK_LINE, static_track_top.value)
    context:ensureTracksAmount(BLENDING_TRACK_LINE, blending_track_top.value)
    self.movement_track_states.run.mode = -1
    self.movement_track_states.walk.mode = -1
end

-- 状态机退出函数，在切出物品的时候调用
function M:exit(context)

end

function M:states()
    return {
        self.base_track_state,
        self.main_track_states.start,
        self.movement_track_states.idle,
    }
end

return M