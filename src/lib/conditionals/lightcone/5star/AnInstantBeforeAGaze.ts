import { ContentItem } from 'types/Conditionals'
import { Form } from 'types/Form'
import { SuperImpositionLevel } from 'types/LightCone'
import { LightConeConditional } from 'types/LightConeConditionals'
import { buffAbilityDmg } from 'lib/optimizer/calculateBuffs'
import { ComputedStatsObject, ULT_TYPE } from 'lib/conditionals/conditionalConstants'
import i18next from 'i18next'
import { TsUtils } from 'lib/TsUtils'

export default (s: SuperImpositionLevel, withoutContent: boolean): LightConeConditional => {
  const sValues = [0.0036, 0.0042, 0.0048, 0.0054, 0.006]

  const content: ContentItem[] = (() => {
    if (withoutContent) return []
    const t = i18next.getFixedT(null, 'conditionals', 'Lightcones.AnInstantBeforeAGaze.Content')
    return [{
      lc: true,
      id: 'maxEnergyUltDmgStacks',
      name: 'maxEnergyUltDmgStacks',
      formItem: 'slider',
      text: t('maxEnergyUltDmgStacks.text'),
      title: t('maxEnergyUltDmgStacks.title'),
      content: t('maxEnergyUltDmgStacks.content', { DmgStep: TsUtils.precisionRound(100 * sValues[s]) }),
      min: 0,
      max: 180,
    }]
  })()

  return {
    content: () => content,
    defaults: () => ({
      maxEnergyUltDmgStacks: 180,
    }),
    precomputeEffects: (x: ComputedStatsObject, request: Form) => {
      const r = request.lightConeConditionals

      buffAbilityDmg(x, ULT_TYPE, r.maxEnergyUltDmgStacks * sValues[s])
    },
    finalizeCalculations: () => {
    },
  }
}
