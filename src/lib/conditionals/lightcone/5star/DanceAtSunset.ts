import { ContentItem } from 'types/Conditionals'
import { Form } from 'types/Form'
import { SuperImpositionLevel } from 'types/LightCone'
import { LightConeConditional } from 'types/LightConeConditionals'
import { ComputedStatsObject, FUA_TYPE } from 'lib/conditionals/conditionalConstants'
import { buffAbilityDmg } from 'lib/optimizer/calculateBuffs'
import i18next from 'i18next'
import { TsUtils } from 'lib/TsUtils'

export default (s: SuperImpositionLevel, withoutContent: boolean): LightConeConditional => {
  const sValuesFuaDmg = [0.36, 0.42, 0.48, 0.54, 0.60]

  const content: ContentItem[] = (() => {
    if (withoutContent) return []
    const t = i18next.getFixedT(null, 'conditionals', 'Lightcones.DanceAtSunset.Content')
    return [
      {
        lc: true,
        id: 'fuaDmgStacks',
        name: 'fuaDmgStacks',
        formItem: 'slider',
        text: t('fuaDmgStacks.text'),
        title: t('fuaDmgStacks.title'),
        content: t('fuaDmgStacks.content', { DmgBoost: TsUtils.precisionRound(100 * sValuesFuaDmg[s]) }),
        min: 0,
        max: 2,
      },
    ]
  })()

  return {
    content: () => content,
    defaults: () => ({
      fuaDmgStacks: 2,
    }),
    precomputeEffects: (x: ComputedStatsObject, request: Form) => {
      const r = request.lightConeConditionals

      buffAbilityDmg(x, FUA_TYPE, r.fuaDmgStacks * sValuesFuaDmg[s])
    },
    finalizeCalculations: () => {
    },
  }
}
