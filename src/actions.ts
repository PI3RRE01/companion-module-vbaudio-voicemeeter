import { CompanionActionEvent, SomeCompanionActionInputField } from '@companion-module/base'
import { BusProperties, RecorderProperties, StripProperties } from 'voicemeeter-connector'
import VoicemeeterInstance from './index'
import { BusMode, getOptions } from './utils'

export interface VoicemeeterActions {
  busEQ: VoicemeeterAction<BusEQCallback>
  busEQAB: VoicemeeterAction<BusEQABCallback>
  busGain: VoicemeeterAction<BusGainCallback>
  busMode: VoicemeeterAction<BusModeCallback>
  busMonitor: VoicemeeterAction<BusMonitorCallback>
  busMono: VoicemeeterAction<BusMonoCallback>
  busMute: VoicemeeterAction<BusMuteCallback>
  busReturns: VoicemeeterAction<BusReturnsCallback>
  busSel: VoicemeeterAction<BusSelCallback>
  recorderArm: VoicemeeterAction<RecorderArmCallback>
  recorderArmInputOutput: VoicemeeterAction<RecorderArmInputOutputCallback>
  recorderGain: VoicemeeterAction<RecorderGainCallback>
  recorderLoadTrack: VoicemeeterAction<RecorderLoadTrackCallback>
  recorderState: VoicemeeterAction<RecorderStateCallback>
  routeAudio: VoicemeeterAction<RouteAudioCallback>
  stripCompressor: VoicemeeterAction<StripCompressorCallback>
  stripDenoiser: VoicemeeterAction<StripDenoiserCallback>
  stripGain: VoicemeeterAction<StripGainCallback>
  stripGate: VoicemeeterAction<StripGateCallback>
  stripMono: VoicemeeterAction<StripMonoCallback>
  stripMute: VoicemeeterAction<StripMuteCallback>
  stripSolo: VoicemeeterAction<StripSoloCallback>
  utilSelectBus: VoicemeeterAction<UtilSelectBusCallback>
  utilSelectStrip: VoicemeeterAction<UtilSelectStripCallback>

  // Index signature
  [key: string]: VoicemeeterAction<any>
}

interface RouteAudioCallback {
  actionId: 'routeAudio'
  options: Readonly<{
    type: 'Toggle' | 'On' | 'Off'
    source: number
    destination: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'B1' | 'B2' | 'B3'
  }>
}

interface BusEQCallback {
  actionId: 'busEQ'
  options: Readonly<{
    type: 'Toggle' | 'On' | 'Off'
    bus: number
  }>
}

interface BusEQABCallback {
  actionId: 'busEQAB'
  options: Readonly<{
    mode: 'Toggle' | 'A' | 'B'
    bus: number
  }>
}

interface BusGainCallback {
  actionId: 'busGain'
  options: Readonly<{
    bus: number
    adjustment: 'Set' | 'Increase' | 'Decrease'
    fade: string
    value: string
  }>
}

interface BusModeCallback {
  actionId: 'busMode'
  options: Readonly<{
    mode:
      | 'normal'
      | 'Amix'
      | 'Bmix'
      | 'Repeat'
      | 'Composite'
      | 'TVMix'
      | 'UpMix21'
      | 'UpMix41'
      | 'UpMix61'
      | 'CenterOnly'
      | 'LFEOnly'
      | 'RearOnly'
      | 'next'
      | 'prev'
    bus: number
  }>
}

interface BusMonoCallback {
  actionId: 'busMono'
  options: Readonly<{
    type: 'Toggle' | 'On' | 'Off'
    bus: number
  }>
}

interface BusMuteCallback {
  actionId: 'busMute'
  options: Readonly<{
    type: 'Toggle' | 'On' | 'Off'
    bus: number
  }>
}

interface BusMonitorCallback {
  actionId: 'busMonitor'
  options: Readonly<{
    type: 'Toggle' | 'On' | 'Off'
    bus: number
  }>
}

interface BusReturnsCallback {
  actionId: 'busReturns'
  options: Readonly<{
    bus: number
    adjustment: 'Set' | 'Increase' | 'Decrease'
    returns: 'returnReverb' | 'returnDelay' | 'returnFx1' | 'returnFx2'
    value: string
  }>
}

interface BusSelCallback {
  actionId: 'busSel'
  options: Readonly<{
    bus: number
    type: 'Toggle' | 'On' | 'Off'
  }>
}

interface StripCompressorCallback {
  actionId: 'stripCompressor'
  options: Readonly<{
    setting:
      | 'comp'
      | 'compGainIn'
      | 'compRatio'
      | 'compThreshold'
      | 'compAttack'
      | 'compRelease'
      | 'compKnee'
      | 'compGainOut'
      | 'compMakeUp'
    strip: number
    adjustment: 'Set' | 'Increase' | 'Decrease'
    comp: string
    compGainIn: string
    compRatio: string
    compThreshold: string
    compAttack: string
    compRelease: string
    compKnee: string
    compGainOut: string
    compMakeUp: string
  }>
}

type StripCompressorSetting =
  | 'comp'
  | 'compGainIn'
  | 'compRatio'
  | 'compThreshold'
  | 'compAttack'
  | 'compRelease'
  | 'compKnee'
  | 'compGainOut'
  | 'compMakeUp'

interface StripDenoiserCallback {
  actionId: 'stripDenoiser'
  options: Readonly<{
    strip: number
    adjustment: 'Set' | 'Increase' | 'Decrease'
    value: string
  }>
}

interface StripGainCallback {
  actionId: 'stripGain'
  options: Readonly<{
    strip: number
    adjustment: 'Set' | 'Increase' | 'Decrease'
    fade: string
    value: string
  }>
}

interface StripGateCallback {
  actionId: 'stripGate'
  options: Readonly<{
    setting: 'gate' | 'gateThreshold' | 'gateDamping' | 'gateBPSidechain' | 'gateAttack' | 'gateHold' | 'gateRelease'
    strip: number
    adjustment: 'Set' | 'Increase' | 'Decrease'
    gate: string
    gateThreshold: string
    gateDamping: string
    gateBPSidechain: string
    gateAttack: string
    gateHold: string
    gateRelease: string
  }>
}

type StripGateSetting =
  | 'gate'
  | 'gateThreshold'
  | 'gateDamping'
  | 'gateBPSidechain'
  | 'gateAttack'
  | 'gateHold'
  | 'gateRelease'

interface StripMonoCallback {
  actionId: 'stripMute'
  options: Readonly<{
    type: 'Toggle' | 'On' | 'Off'
    strip: number
  }>
}

interface StripMuteCallback {
  actionId: 'stripMute'
  options: Readonly<{
    type: 'Toggle' | 'On' | 'Off'
    strip: number
  }>
}

interface StripSoloCallback {
  actionId: 'stripSolo'
  options: Readonly<{
    type: 'Toggle' | 'On' | 'Off'
    strip: number
  }>
}

interface RecorderArmCallback {
  actionId: 'recorderArm'
  options: Readonly<{
    type:
      | 'ArmBus0'
      | 'ArmBus2'
      | 'ArmBus3'
      | 'ArmBus4'
      | 'ArmBus5'
      | 'ArmBus6'
      | 'ArmBus7'
      | 'ArmStrip0'
      | 'ArmStrip2'
      | 'ArmStrip3'
      | 'ArmStrip4'
      | 'ArmStrip5'
      | 'ArmStrip6'
      | 'ArmStrip7'
  }>
}

interface RecorderArmInputOutputCallback {
  actionId: 'recorderArmInputOutput'
  options: Readonly<{
    type: 'strip' | 'bus'
  }>
}

interface RecorderGainCallback {
  actionId: 'recorderGain'
  options: Readonly<{
    adjustment: 'Set' | 'Increase' | 'Decrease'
    value: string
  }>
}

interface RecorderLoadTrackCallback {
  actionId: 'recorderLoadTrack'
  options: Readonly<{
    path: string
  }>
}

interface RecorderStateCallback {
  actionId: 'recorderState'
  options: Readonly<{
    type: 'Play' | 'Stop' | 'PlayStop' | 'Record' | 'Goto' | 'FastForward' | 'Loop' | 'PlayOnLoad'
  }>
}

interface UtilSelectBusCallback {
  actionId: 'utilSelectBus'
  options: Readonly<{
    bus: number
  }>
}

interface UtilSelectStripCallback {
  actionId: 'utilSelectStrip'
  options: Readonly<{
    strip: number
  }>
}

export type ActionCallbacks =
  | BusEQCallback
  | BusEQABCallback
  | BusGainCallback
  | BusModeCallback
  | BusMonoCallback
  | BusMuteCallback
  | BusMonitorCallback
  | BusReturnsCallback
  | BusSelCallback
  | RecorderArmCallback
  | RecorderArmInputOutputCallback
  | RecorderGainCallback
  | RecorderLoadTrackCallback
  | RecorderStateCallback
  | RouteAudioCallback
  | StripCompressorCallback
  | StripDenoiserCallback
  | StripGainCallback
  | StripGateCallback
  | StripMonoCallback
  | StripMuteCallback
  | StripSoloCallback
  | UtilSelectBusCallback
  | UtilSelectStripCallback

// Force options to have a default to prevent sending undefined values
type InputFieldWithDefault = Exclude<SomeCompanionActionInputField, 'default'> & {
  default: string | number | boolean | null
}

// Actions specific to vMix
export interface VoicemeeterAction<T> {
  name: string
  description?: string
  options: InputFieldWithDefault[]
  callback: (action: Readonly<Omit<CompanionActionEvent, 'options' | 'id'> & T>) => void
  subscribe?: (action: Readonly<Omit<CompanionActionEvent, 'options' | 'id'> & T>) => void
  unsubscribe?: (action: Readonly<Omit<CompanionActionEvent, 'options' | 'id'> & T>) => void
}

export function getActions(instance: VoicemeeterInstance): VoicemeeterActions {
  const utilOptions = getOptions(instance)

  return {
    busEQ: {
      name: 'Bus - EQ',
      description: 'Control EQ on a Bus',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Toggle',
          choices: ['Toggle', 'On', 'Off'].map((type) => ({ id: type, label: type })),
        },
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: -1,
          choices: [...utilOptions.busSelect.choices, { id: -1, label: 'Selected' }],
        },
      ],
      callback: (action) => {
        const bus = action.options.bus === -1 ? instance.selectedBus : action.options.bus
        if (!instance.bus[bus]) return

        let newValue = instance.bus[bus].eq ? 0 : 1
        if (action.options.type === 'On') newValue = 1
        if (action.options.type === 'Off') newValue = 0

        instance.connection?.setBusParameter(bus, BusProperties.EQ, newValue)
      },
    },

    busEQAB: {
      name: 'Bus - EQ A or B',
      description: 'Control EQ preset A or B on a Bus',
      options: [
        {
          type: 'dropdown',
          label: 'Mode',
          id: 'mode',
          default: 'Toggle',
          choices: [
            { id: 'Toggle', label: 'Toggle' },
            { id: 'A', label: 'A' },
            { id: 'B', label: 'B' },
          ],
        },

        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: -1,
          choices: [...utilOptions.busSelect.choices, { id: -1, label: 'Selected' }],
        },
      ],
      callback: (action) => {
        const bus = action.options.bus === -1 ? instance.selectedBus : action.options.bus
        if (!instance.bus[bus]) return

        let newValue = instance.bus[bus].eqAB ? 0 : 1
        if (action.options.mode === 'A') newValue = 0
        if (action.options.mode === 'B') newValue = 1

        instance.connection?.setBusParameter(bus, BusProperties.EQAB, newValue)
      },
    },

    busGain: {
      name: 'Bus - Gain',
      description: 'Control the Gain on a Bus',
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: -1,
          choices: [...utilOptions.busSelect.choices, { id: -1, label: 'Selected' }],
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Increase', label: 'Increase' },
            { id: 'Decrease', label: 'Decrease' },
          ],
        },
        {
          type: 'textinput',
          label: 'Fade time ms (0 for instant)',
          id: 'fade',
          default: '0',
        },
        {
          type: 'textinput',
          label: 'Gain -60 to +12 dB',
          id: 'value',
          default: '0',
        },
      ],
      callback: async (action) => {
        const bus = action.options.bus === -1 ? instance.selectedBus : action.options.bus
        if (!instance.bus[bus]) return

        let fade: string | number = await instance.parseVariablesInString(action.options.fade)
        let value: string | number = await instance.parseVariablesInString(action.options.value)

        fade = parseInt(fade, 10)
        value = parseFloat(value)
        if (isNaN(fade) || isNaN(value)) return

        const currentValue = instance.bus[bus].gain
        let newValue

        if (action.options.adjustment === 'Set') {
          newValue = value
        } else if (action.options.adjustment === 'Increase') {
          newValue = currentValue + value
        } else {
          newValue = currentValue - value
        }

        if (newValue < -60) newValue = -60
        if (newValue > 12) newValue = 12
        if (fade < 0) fade = 0

        if (newValue !== currentValue) {
          if (fade === 0) {
            instance.connection?.setBusParameter(bus, BusProperties.Gain, newValue)
          } else {
            instance.connection?.setBusParameter(bus, BusProperties.FadeTo, `(${newValue},${fade})`)
          }
        }
      },
    },

    busMode: {
      name: 'Bus - Mode',
      description: 'Sets the Mode on the specified Bus',
      options: [
        {
          type: 'dropdown',
          label: 'Mode',
          id: 'mode',
          default: 'normal',
          choices: [
            { id: 'normal', label: 'Normal Mode' },
            { id: 'Amix', label: 'Mix down A' },
            { id: 'Bmix', label: 'Mix down B' },
            { id: 'Repeat', label: 'Stereo Repeat' },
            { id: 'Composite', label: 'Composite' },
            { id: 'TVMix', label: 'Up Mix TV' },
            { id: 'UpMix21', label: 'Up Mix 2.1' },
            { id: 'UpMix41', label: 'Up Mix 4.1' },
            { id: 'UpMix61', label: 'Up Mix 6.1' },
            { id: 'CenterOnly', label: 'Center Only' },
            { id: 'LFEOnly', label: 'LFE Only' },
            { id: 'RearOnly', label: 'Rear Only' },
            { id: 'next', label: 'Next' },
            { id: 'prev', label: 'Previous' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: -1,
          choices: [...utilOptions.busSelect.choices, { id: -1, label: 'Selected' }],
        },
      ],
      callback: (action) => {
        const bus = action.options.bus === -1 ? instance.selectedBus : action.options.bus
        if (!instance.bus[bus]) return

        const modes: BusMode[] = [
          'normal',
          'Amix',
          'Bmix',
          'Repeat',
          'Composite',
          'TVMix',
          'UpMix21',
          'UpMix41',
          'UpMix61',
          'CenterOnly',
          'LFEOnly',
          'RearOnly',
        ]
        let newMode: BusMode
        const index = modes.indexOf(instance.bus[bus].mode)

        if (action.options.mode === 'next') {
          const newIndex = (index + 1) % modes.length
          newMode = modes[newIndex]
        } else if (action.options.mode === 'prev') {
          const newIndex = (index + modes.length - 1) % modes.length
          newMode = modes[newIndex]
        } else {
          newMode = action.options.mode
        }

        if (newMode === 'normal') instance.connection?.setBusParameter(bus, BusProperties.ModeNormal, 1)
        if (newMode === 'Amix') instance.connection?.setBusParameter(bus, BusProperties.ModeAmix, 1)
        if (newMode === 'Bmix') instance.connection?.setBusParameter(bus, BusProperties.ModeBmix, 1)
        if (newMode === 'Repeat') instance.connection?.setBusParameter(bus, BusProperties.ModeRepeat, 1)
        if (newMode === 'Composite') instance.connection?.setBusParameter(bus, BusProperties.ModeComposite, 1)
        if (newMode === 'TVMix') instance.connection?.setBusParameter(bus, BusProperties.ModeTVMix, 1)
        if (newMode === 'UpMix21') instance.connection?.setBusParameter(bus, BusProperties.ModeUpMix21, 1)
        if (newMode === 'UpMix41') instance.connection?.setBusParameter(bus, BusProperties.ModeUpMix41, 1)
        if (newMode === 'UpMix61') instance.connection?.setBusParameter(bus, BusProperties.ModeUpMix61, 1)
        if (newMode === 'CenterOnly') instance.connection?.setBusParameter(bus, BusProperties.ModeCenterOnly, 1)
        if (newMode === 'LFEOnly') instance.connection?.setBusParameter(bus, BusProperties.ModeLFEOnly, 1)
        if (newMode === 'RearOnly') instance.connection?.setBusParameter(bus, BusProperties.ModeRearOnly, 1)
      },
    },

    busMonitor: {
      name: 'Bus - Monitor',
      description: 'Target Bus selection for Monitor on SEL',
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: -1,
          choices: [...utilOptions.busSelect.choices, { id: -1, label: 'Selected' }],
        },
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Toggle',
          choices: ['Toggle', 'On', 'Off'].map((type) => ({ id: type, label: type })),
        },
      ],
      callback: (action) => {
        const bus = action.options.bus === -1 ? instance.selectedBus : action.options.bus
        if (!instance.bus[bus]) return

        let value = instance.bus[bus].monitor ? 0 : 1
        if (action.options.type === 'On') value = 1
        if (action.options.type === 'Off') value = 0

        if (instance.bus[bus].monitor !== value) {
          instance.connection?.setBusParameter(bus, BusProperties.Monitor, value)
        }
      },
    },

    busMono: {
      name: 'Bus - Mono',
      description: 'Sets Mono on the specified Bus',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Toggle',
          choices: ['Toggle', 'On', 'Off'].map((type) => ({ id: type, label: type })),
        },
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: -1,
          choices: [...utilOptions.busSelect.choices, { id: -1, label: 'Selected' }],
        },
      ],
      callback: (action) => {
        const bus = action.options.bus === -1 ? instance.selectedBus : action.options.bus
        if (!instance.bus[bus]) return

        let value = action.options.type === 'On' ? 1 : 0

        if (action.options.type === 'Toggle') {
          value = instance.bus[bus].mono ? 0 : 1
        }

        instance.connection?.setBusParameter(bus, BusProperties.Mono, value)
      },
    },

    busMute: {
      name: 'Bus - Mute',
      description: 'Mutes the specified Bus',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Toggle',
          choices: ['Toggle', 'Mute', 'Unmute'].map((type) => ({ id: type, label: type })),
        },
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: -1,
          choices: [...utilOptions.busSelect.choices, { id: -1, label: 'Selected' }],
        },
      ],
      callback: (action) => {
        const bus = action.options.bus === -1 ? instance.selectedBus : action.options.bus
        if (!instance.bus[bus]) return

        let value = action.options.type === 'On' ? 1 : 0

        if (action.options.type === 'Toggle') {
          value = instance.bus[bus].mute ? 0 : 1
        }

        instance.connection?.setBusParameter(bus, BusProperties.Mute, value)
      },
    },

    busReturns: {
      name: 'Bus - Returns',
      description: 'Bus Reverb, Delay, and FX Returns',
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: -1,
          choices: [...utilOptions.busSelect.choices, { id: -1, label: 'Selected' }],
        },
        {
          type: 'dropdown',
          label: 'Returns',
          id: 'returns',
          default: 'returnReverb',
          choices: [
            { id: 'returnReverb', label: 'Reverb Return' },
            { id: 'returnDelay', label: 'Delay Return' },
            { id: 'returnFx1', label: 'FX1 Return' },
            { id: 'returnFx2', label: 'FX2 Return' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Increase', label: 'Increase' },
            { id: 'Decrease', label: 'Decrease' },
          ],
        },
        {
          type: 'textinput',
          label: 'Value 0 to 10',
          id: 'value',
          default: '0',
        },
      ],
      callback: async (action) => {
        const bus = action.options.bus === -1 ? instance.selectedBus : action.options.bus
        if (!instance.bus[bus]) return

        const value = instance.bus[bus][action.options.returns]
        const change = parseFloat(await instance.parseVariablesInString(action.options.value))
        if (isNaN(change)) return

        let newValue

        if (action.options.adjustment === 'Set') {
          newValue = change
        } else if (action.options.adjustment === 'Increase') {
          newValue = value + change
        } else {
          newValue = value - change
        }

        if (newValue < 0) newValue = 0
        if (newValue > 10) newValue = 10

        if (action.options.returns === 'returnReverb')
          instance.connection?.setBusParameter(bus, BusProperties.ReturnReverb, newValue)
        if (action.options.returns === 'returnDelay')
          instance.connection?.setBusParameter(bus, BusProperties.ReturnDelay, newValue)
        if (action.options.returns === 'returnFx1')
          instance.connection?.setBusParameter(bus, BusProperties.ReturnFx1, newValue)
        if (action.options.returns === 'returnFx2')
          instance.connection?.setBusParameter(bus, BusProperties.ReturnFx2, newValue)
      },
    },

    busSel: {
      name: 'Bus - SEL',
      description: 'Control SEL on the specified Bus',
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: -1,
          choices: [...utilOptions.busSelect.choices, { id: -1, label: 'Selected' }],
        },
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Toggle',
          choices: ['Toggle', 'On', 'Off'].map((type) => ({ id: type, label: type })),
        },
      ],
      callback: (action) => {
        const bus = action.options.bus === -1 ? instance.selectedBus : action.options.bus
        if (!instance.bus[bus]) return

        let value = instance.bus[bus].sel ? 0 : 1
        if (action.options.type === 'On') value = 1
        if (action.options.type === 'Off') value = 0

        if ((instance.bus[bus].sel ? 1 : 0) !== value) {
          instance.connection?.setBusParameter(bus, BusProperties.Sel, value)
        }
      },
    },

    recorderArm: {
      name: 'Recorder - Arm Bus or Strip',
      description: 'Arms a specific Bus or Strip',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'ArmStrip0',
          choices: [
            ...instance.strip.map((strip, index) => ({
              id: `ArmStrip${index}`,
              label: strip.label ? `Strip ${index + 1}: ${strip.label}` : `${index + 1}`,
            })),
            { id: 'ArmBus0', label: 'A1' },
            { id: 'ArmBus1', label: 'A2' },
            { id: 'ArmBus2', label: 'A3' },
            { id: 'ArmBus3', label: 'A4' },
            { id: 'ArmBus4', label: 'A5' },
            { id: 'ArmBus5', label: 'B1' },
            { id: 'ArmBus6', label: 'B2' },
            { id: 'ArmBus7', label: 'B3' },
          ],
        },
      ],
      callback: (action) => {
        instance.connection?.setRecorderParameter(
          RecorderProperties[action.options.type],
          instance.recorder[action.options.type] === 0 ? 1 : 0
        )
      },
    },

    recorderArmInputOutput: {
      name: 'Recorder - Arm Inputs or Outputs',
      description: 'Arms the Recorder for the selected Pre-Fader inputs, or Post-Fader Outputs',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'strip',
          choices: [
            { id: 'strip', label: 'Pre-Fader Inputs' },
            { id: 'bus', label: 'Post-Fader Outputs' },
          ],
        },
      ],
      callback: (action) => {
        instance.connection?.setRecorderParameter(
          RecorderProperties.ModeRecBus,
          action.options.type === 'strip' ? 0 : 1
        )
      },
    },

    recorderGain: {
      name: 'Recorder - Gain',
      description: 'Adjust Recorder Gain',
      options: [
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Increase', label: 'Increase' },
            { id: 'Decrease', label: 'Decrease' },
          ],
        },
        {
          type: 'textinput',
          label: 'Volume',
          id: 'value',
          default: '1',
        },
      ],
      callback: async (action) => {
        let value: any = await instance.parseVariablesInString(action.options.value)
        value = parseFloat(value)

        if (isNaN(value)) return

        if (action.options.adjustment === 'Increase') {
          value = instance.recorder.gain + value
        } else if (action.options.adjustment === 'Decrease') {
          value = instance.recorder.gain - value
        }

        if (value < -60) value = -60
        if (value > 12) value = 12

        instance.connection?.setRecorderParameter(RecorderProperties.Gain, value)
      },
    },

    recorderLoadTrack: {
      name: 'Recorder - Load Track',
      description: 'Loads a file into the Recorder',
      options: [
        {
          type: 'textinput',
          label: 'Filepath',
          id: 'path',
          default: '',
        },
      ],
      callback: async (action) => {
        const path = await instance.parseVariablesInString(action.options.path)
        instance.connection?.setRecorderParameter(RecorderProperties.Load, '"' + path + '"')
      },
    },

    recorderState: {
      name: 'Recorder - Position Control',
      description: 'Control the playback and loading of the Recorder',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Play',
          choices: [
            { id: 'Play', label: 'Play' },
            { id: 'Stop', label: 'Stop' },
            { id: 'PlayStop', label: 'Toggle Play Stop' },
            { id: 'Record', label: 'Record' },
            { id: 'Goto', label: 'Restart' },
            { id: 'Rewind', label: 'Rewind' },
            { id: 'FastForward', label: 'FastForward' },
            { id: 'Loop', label: 'Toggle Loop' },
            { id: 'PlayOnLoad', label: 'Toggle Play-On-Load' },
          ],
        },
      ],
      callback: (action) => {
        if (action.options.type === 'Loop') {
          instance.connection?.setRecorderParameter(
            RecorderProperties.ModeLoop,
            instance.recorder.modeLoop === 0 ? 1 : 0
          )
        } else if (action.options.type === 'PlayOnLoad') {
          instance.connection?.setRecorderParameter(
            RecorderProperties.ModePlayOnLoad,
            instance.recorder.modePlayOnLoad === 0 ? 1 : 0
          )
        } else if (action.options.type === 'Goto') {
          instance.connection?.setRecorderParameter(RecorderProperties.GoTo, '00:00:00')
        } else if (action.options.type === 'PlayStop') {
          let actionType: 'Play' | 'Stop' = instance.recorder['play'] === 1 ? 'Stop' : 'Play'
          instance.connection?.setRecorderParameter(RecorderProperties[actionType], 1)
        } else {
          instance.connection?.setRecorderParameter(RecorderProperties[action.options.type], 1)
        }
      },
    },

    routeAudio: {
      name: 'Route Audio',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Toggle',
          choices: ['Toggle', 'On', 'Off'].map((type) => ({ id: type, label: type })),
        },
        {
          type: 'dropdown',
          label: 'Source',
          id: 'source',
          default: '0',
          choices: [
            { id: 0, label: 'Strip 1' },
            { id: 1, label: 'Strip 2' },
            { id: 2, label: 'Strip 3' },
            { id: 3, label: 'Strip 4' },
            { id: 4, label: 'Strip 5' },
            { id: 5, label: 'Aux 1' },
            { id: 6, label: 'Aux 2' },
            { id: 7, label: 'Aux 3' },
            { id: 8, label: 'Recorder' },
            { id: 9, label: 'Selected' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Destination',
          id: 'destination',
          default: 'A1',
          choices: ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3'].map((type) => ({ id: type, label: type })),
        },
      ],
      callback: (action) => {
        const source = action.options.source === 9 ? instance.selectedStrip : action.options.source
        if (source === -1) return

        if (source === 8) {
          let newValue = instance.recorder[action.options.destination] ? 0 : 1
          if (action.options.type === 'On') newValue = 1
          if (action.options.type === 'Off') newValue = 0

          instance.connection?.setRecorderParameter(
            RecorderProperties[action.options.destination],
            newValue
          )
        } else {
          let newValue = instance.strip[source][action.options.destination] ? 0 : 1
          if (action.options.type === 'On') newValue = 1
          if (action.options.type === 'Off') newValue = 0
          instance.connection?.setStripParameter(
            source,
            StripProperties[action.options.destination],
            newValue
          )
        }
      },
    },

    stripCompressor: {
      name: 'Strip - Compressor',
      description: 'Control the Compressor settings of a strip',
      options: [
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'setting',
          default: 'comp',
          choices: [
            { id: 'comp', label: 'Compressor' },
            { id: 'compGainIn', label: 'Input Gain' },
            { id: 'compRatio', label: 'Ratio' },
            { id: 'compThreshold', label: 'Threshold' },
            { id: 'compAttack', label: 'Attack Time' },
            { id: 'compRelease', label: 'Release Time' },
            { id: 'compKnee', label: 'Knee' },
            { id: 'compGainOut', label: 'Output Gain' },
            { id: 'compMakeUp', label: 'Make Up' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Strip',
          id: 'strip',
          default: -1,
          choices: [
            ...instance.strip
              .filter((strip) => strip.type === 'physical')
              .map((strip, index) => ({
                id: index,
                label: strip.label ? `Strip ${index + 1}: ${strip.label}` : `${index + 1}`,
              })),
            { id: -1, label: 'Selected' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Increase', label: 'Increase' },
            { id: 'Decrease', label: 'Decrease' },
          ],
        },
        {
          type: 'textinput',
          label: 'Compressor: 0 to 10',
          id: 'comp',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'comp'
          },
        },
        {
          type: 'textinput',
          label: 'Input Gain: -24 to +24',
          id: 'compGainIn',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'compGainIn'
          },
        },
        {
          type: 'textinput',
          label: 'Ratio: 1 to 8',
          id: 'compRatio',
          default: '1',
          isVisible: (options) => {
            return options.setting === 'compRatio'
          },
        },
        {
          type: 'textinput',
          label: 'Threshold: -40 to -3 dB',
          id: 'compThreshold',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'compThreshold'
          },
        },
        {
          type: 'textinput',
          label: 'Attack Time: 0 to 200 ms',
          id: 'compAttack',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'compAttack'
          },
        },
        {
          type: 'textinput',
          label: 'Release Time: 0 to 5000 ms',
          id: 'compRelease',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'compRelease'
          },
        },
        {
          type: 'textinput',
          label: 'Knee: 0 to 1',
          id: 'compKnee',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'compKnee'
          },
        },
        {
          type: 'textinput',
          label: 'Output Gain: -24 to +24',
          id: 'compGainOut',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'compGainOut'
          },
        },
        {
          type: 'textinput',
          label: 'Make Up: 0 or 1',
          id: 'compMakeUp',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'compMakeUp'
          },
        },
      ],
      callback: async (action) => {
        const stripId = action.options.strip === -1 ? instance.selectedStrip : action.options.strip
        const strip = instance.strip[stripId]

        if (!strip) return

        const updateCompressor = async (setting: StripCompressorSetting, min: number, max: number, property: any) => {
          let value: string | number = await instance.parseVariablesInString(action.options[setting])
          value = parseFloat(value)
          if (isNaN(value)) return

          if (setting === 'compMakeUp') {
            instance.connection?.setStripParameter(stripId, property, value)
            return
          }

          const currentValue = strip[setting] as number
          let newValue

          if (action.options.adjustment === 'Set') {
            newValue = value
          } else if (action.options.adjustment === 'Increase') {
            newValue = currentValue + value
          } else {
            newValue = currentValue - value
          }

          if (newValue < min) newValue = min
          if (newValue > max) newValue = max

          if (newValue !== currentValue) {
            instance.connection?.setStripParameter(stripId, property, newValue)
          }
        }

        if (action.options.setting === 'comp') {
          updateCompressor('comp', 0, 10, StripProperties.Comp)
        } else if (action.options.setting === 'compGainIn') {
          updateCompressor('compGainIn', -24, 24, StripProperties.CompGainIn)
        } else if (action.options.setting === 'compRatio') {
          updateCompressor('compRatio', 1, 8, StripProperties.CompRatio)
        } else if (action.options.setting === 'compThreshold') {
          updateCompressor('compThreshold', -40, -3, StripProperties.CompThreshold)
        } else if (action.options.setting === 'compAttack') {
          updateCompressor('compAttack', 0, 200, StripProperties.CompAttack)
        } else if (action.options.setting === 'compRelease') {
          updateCompressor('compRelease', 0, 5000, StripProperties.CompRelease)
        } else if (action.options.setting === 'compKnee') {
          updateCompressor('compKnee', 0, 1, StripProperties.CompKnee)
        } else if (action.options.setting === 'compGainOut') {
          updateCompressor('compGainOut', -24, 24, StripProperties.CompGainOut)
        } else if (action.options.setting === 'compMakeUp') {
          updateCompressor('compMakeUp', 0, 1, StripProperties.CompMakeUp)
        }
      },
    },

    stripDenoiser: {
      name: 'Strip - Denoiser',
      description: 'Control the Denoiser value of a strip',
      options: [
        {
          type: 'dropdown',
          label: 'Strip',
          id: 'strip',
          default: -1,
          choices: [
            ...instance.strip
              .filter((strip) => strip.type === 'physical')
              .map((strip, index) => ({
                id: index,
                label: strip.label ? `Strip ${index + 1}: ${strip.label}` : `${index + 1}`,
              })),
            { id: -1, label: 'Selected' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Increase', label: 'Increase' },
            { id: 'Decrease', label: 'Decrease' },
          ],
        },
        {
          type: 'textinput',
          label: 'Value: 0 to 10',
          id: 'value',
          default: '0',
        },
      ],
      callback: async (action) => {
        const stripId = action.options.strip === -1 ? instance.selectedStrip : action.options.strip
        const strip = instance.strip[stripId]

        if (!strip) return

        let value: string | number = await instance.parseVariablesInString(action.options.value)
        value = parseFloat(value)
        if (isNaN(value)) return

        const currentValue = strip.denoiser
        let newValue

        if (action.options.adjustment === 'Set') {
          newValue = value
        } else if (action.options.adjustment === 'Increase') {
          newValue = currentValue + value
        } else {
          newValue = currentValue - value
        }

        if (newValue < 0) newValue = 0
        if (newValue > 10) newValue = 10

        if (newValue !== currentValue) {
          instance.connection?.setStripParameter(stripId, StripProperties.Denoiser, newValue)
        }
      },
    },

    stripGain: {
      name: 'Strip - Gain',
      description: 'Control the Gain on a Strip',
      options: [
        {
          type: 'dropdown',
          label: 'Strip',
          id: 'strip',
          default: -1,
          choices: [
            ...instance.strip.map((strip, index) => ({
              id: index,
              label: strip.label ? `Strip ${index + 1}: ${strip.label}` : `${index + 1}`,
            })),
            { id: -1, label: 'Selected' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Increase', label: 'Increase' },
            { id: 'Decrease', label: 'Decrease' },
          ],
        },
        {
          type: 'textinput',
          label: 'Fade time ms (0 for instant)',
          id: 'fade',
          default: '0',
        },
        {
          type: 'textinput',
          label: 'Gain -60 to +12 dB',
          id: 'value',
          default: '0',
        },
      ],
      callback: async (action) => {
        const stripId = action.options.strip === -1 ? instance.selectedStrip : action.options.strip
        const strip = instance.strip[stripId]
        if (!strip) return

        let fade: string | number = await instance.parseVariablesInString(action.options.fade)
        let value: string | number = await instance.parseVariablesInString(action.options.value)

        fade = parseInt(fade, 10)
        value = parseFloat(value)
        if (isNaN(fade) || isNaN(value)) return

        const currentValue = strip.gain
        let newValue

        if (action.options.adjustment === 'Set') {
          newValue = value
        } else if (action.options.adjustment === 'Increase') {
          newValue = currentValue + value
        } else {
          newValue = currentValue - value
        }

        if (newValue < -60) newValue = -60
        if (newValue > 12) newValue = 12
        if (fade < 0) fade = 0

        if (newValue !== currentValue) {
          if (fade === 0) {
            instance.connection?.setStripParameter(stripId, StripProperties.Gain, newValue)
          } else {
            instance.connection?.setStripParameter(stripId, StripProperties.FadeTo, `(${newValue},${fade})`)
          }
        }
      },
    },

    stripGate: {
      name: 'Strip - Gate',
      description: 'Control the Gate settings of a strip',
      options: [
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'setting',
          default: 'gate',
          choices: [
            { id: 'gate', label: 'Gate' },
            { id: 'gateThreshold', label: 'Threshold' },
            { id: 'gateDamping', label: 'Damping Max' },
            { id: 'gateBPSidechain', label: 'BP Sidechain' },
            { id: 'gateAttack', label: 'Attack Time' },
            { id: 'gateHold', label: 'Hold Time' },
            { id: 'gateRelease', label: 'Release Time' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Strip',
          id: 'strip',
          default: -1,
          choices: [
            ...instance.strip
              .filter((strip) => strip.type === 'physical')
              .map((strip, index) => ({
                id: index,
                label: strip.label ? `Strip ${index + 1}: ${strip.label}` : `${index + 1}`,
              })),
            { id: -1, label: 'Selected' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Increase', label: 'Increase' },
            { id: 'Decrease', label: 'Decrease' },
          ],
        },
        {
          type: 'textinput',
          label: 'Gate: 0 to 10',
          id: 'gate',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'gate'
          },
        },
        {
          type: 'textinput',
          label: 'Threshold: -60 to -10 dB',
          id: 'gateThreshold',
          default: '-60',
          isVisible: (options) => {
            return options.setting === 'gateThreshold'
          },
        },
        {
          type: 'textinput',
          label: 'Damping: -60 to -10 dB',
          id: 'gateDamping',
          default: '-60',
          isVisible: (options) => {
            return options.setting === 'gateDamping'
          },
        },
        {
          type: 'textinput',
          label: 'BP Sidechain: 100 to 4000 Hz',
          id: 'gateBPSidechain',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'gateBPSidechain'
          },
        },
        {
          type: 'textinput',
          label: 'Attack Time: 0 to 1000 ms',
          id: 'gateAttack',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'gateAttack'
          },
        },
        {
          type: 'textinput',
          label: 'Hold Time: 0 to 5000 ms',
          id: 'gateHold',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'gateHold'
          },
        },
        {
          type: 'textinput',
          label: 'ReleaseTime: 0 to 5000 ms',
          id: 'gateRelease',
          default: '0',
          isVisible: (options) => {
            return options.setting === 'gateRelease'
          },
        },
      ],
      callback: async (action) => {
        const stripId = action.options.strip === -1 ? instance.selectedStrip : action.options.strip
        const strip = instance.strip[stripId]

        if (!strip) return

        const updateGate = async (setting: StripGateSetting, min: number, max: number, property: any) => {
          let value: string | number = await instance.parseVariablesInString(action.options[setting])
          value = parseFloat(value)
          if (isNaN(value)) return

          const currentValue = strip[setting]
          let newValue

          if (action.options.adjustment === 'Set') {
            newValue = value
          } else if (action.options.adjustment === 'Increase') {
            newValue = currentValue + value
          } else {
            newValue = currentValue - value
          }

          if (newValue < min) newValue = min
          if (newValue > max) newValue = max

          if (newValue !== currentValue) {
            instance.connection?.setStripParameter(stripId, property, newValue)
          }
        }
        if (action.options.setting === 'gate') {
          updateGate('gate', 0, 10, StripProperties.Gate)
        } else if (action.options.setting === 'gateThreshold') {
          updateGate('gateThreshold', -60, -10, StripProperties.GateThreshold)
        } else if (action.options.setting === 'gateDamping') {
          updateGate('gateDamping', -60, -10, StripProperties.GateDamping)
        } else if (action.options.setting === 'gateBPSidechain') {
          updateGate('gateBPSidechain', 100, 4000, StripProperties.GateBPSidechain)
        } else if (action.options.setting === 'gateAttack') {
          updateGate('gateAttack', 0, 1000, StripProperties.GateAttack)
        } else if (action.options.setting === 'gateHold') {
          updateGate('gateHold', 0, 5000, StripProperties.GateHold)
        } else if (action.options.setting === 'gateRelease') {
          updateGate('gateRelease', 0, 5000, StripProperties.GateRelease)
        }
      },
    },

    stripMono: {
      name: 'Strip - Mono',
      description: 'Sets Mono on the specified Strip',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Toggle',
          choices: ['Toggle', 'On', 'Off'].map((type) => ({ id: type, label: type })),
        },
        {
          type: 'dropdown',
          label: 'Strip',
          id: 'strip',
          default: -1,
          choices: [
            ...instance.strip.map((strip, index) => ({
              id: index,
              label: strip.label ? `Strip ${index + 1}: ${strip.label}` : `${index + 1}`,
            })),
            { id: 9, label: 'Recorder' },
            { id: -1, label: 'Selected' },
          ],
        },
      ],
      callback: (action) => {
        const strip = action.options.strip === -1 ? instance.selectedStrip : action.options.strip
        let value = action.options.type === 'On' ? 1 : 0

        if (action.options.type === 'Toggle') {
          value = instance.strip[strip].mono ? 0 : 1
        }

        instance.connection?.setStripParameter(strip, StripProperties.Mono, value)
      },
    },

    stripMute: {
      name: 'Strip - Mute',
      description: 'Mutes the specified Strip',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Toggle',
          choices: ['Toggle', 'On', 'Off'].map((type) => ({ id: type, label: type })),
        },
        {
          type: 'dropdown',
          label: 'Strip',
          id: 'strip',
          default: -1,
          choices: [
            ...instance.strip.map((strip, index) => ({
              id: index,
              label: strip.label ? `Strip ${index + 1}: ${strip.label}` : `${index + 1}`,
            })),
            { id: 9, label: 'Recorder' },
            { id: -1, label: 'Selected' },
          ],
        },
      ],
      callback: (action) => {
        const strip = action.options.strip === -1 ? instance.selectedStrip : action.options.strip
        let value = action.options.type === 'On' ? 1 : 0

        if (action.options.type === 'Toggle') {
          value = instance.strip[strip].mute ? 0 : 1
        }

        instance.connection?.setStripParameter(strip, StripProperties.Mute, value)
      },
    },

    stripSolo: {
      name: 'Strip - Solo',
      description: 'Sets Solo on the specified Strip',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Toggle',
          choices: ['Toggle', 'On', 'Off'].map((type) => ({ id: type, label: type })),
        },
        {
          type: 'dropdown',
          label: 'Strip',
          id: 'strip',
          default: -1,
          choices: [
            ...instance.strip.map((strip, index) => ({
              id: index,
              label: strip.label ? `Strip ${index + 1}: ${strip.label}` : `${index + 1}`,
            })),
            { id: 9, label: 'Recorder' },
            { id: -1, label: 'Selected' },
          ],
        },
      ],
      callback: (action) => {
        const strip = action.options.strip === -1 ? instance.selectedStrip : action.options.strip
        let value = action.options.type === 'On' ? 1 : 0

        if (action.options.type === 'Toggle') {
          value = instance.strip[strip].solo ? 0 : 1
        }

        instance.connection?.setStripParameter(strip, StripProperties.Solo, value)
      },
    },

    utilSelectBus: {
      name: 'Util - Select Bus',
      description: 'For use in Companion actions/feedback/variables, not Voicemeeter',
      options: [utilOptions.busSelect],
      callback: (action) => {
        instance.selectedBus = instance.selectedBus === action.options.bus ? -1 : action.options.bus
        instance.checkFeedbacks('utilSelectedBus')
        instance.variables?.updateVariables()
      },
    },

    utilSelectStrip: {
      name: 'Util - Select Strip',
      description: 'For use in Companion actions/feedback/variables, not Voicemeeter',
      options: [
        {
          type: 'dropdown',
          label: 'Strip',
          id: 'strip',
          default: 0,
          choices: [
            ...instance.strip.map((strip, index) => ({ id: index, label: strip.label || index + 1 + '' })),
            { id: 8, label: 'Recorder' },
          ],
        },
      ],
      callback: (action) => {
        instance.selectedStrip = instance.selectedStrip === action.options.strip ? -1 : action.options.strip
        instance.checkFeedbacks('utilSelectedStrip', 'routing')
        instance.variables?.updateVariables()
      },
    },
  }
}
