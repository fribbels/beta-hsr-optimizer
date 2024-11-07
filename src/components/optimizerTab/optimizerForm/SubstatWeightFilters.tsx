import { Flex } from 'antd'
import { HeaderText } from 'components/HeaderText'
import { TooltipImage } from 'components/TooltipImage'
import { Hint } from 'lib/hint'
import { FormStatRollSliders, FormStatRollSliderTopPercent } from 'components/optimizerTab/optimizerForm/FormStatRollSlider'
import { useTranslation } from 'react-i18next'

export const SubstatWeightFilters = () => {
  const { t } = useTranslation('optimizerTab', { keyPrefix: 'WeightFilter' })
  return (
    <Flex vertical gap={4}>

      <Flex vertical gap={0}>
        <Flex justify='space-between' align='center'>
          <HeaderText>{t('WeightFilterHeader')/* Substat weight filter */}</HeaderText>
          <TooltipImage type={Hint.substatWeightFilter()}/>
        </Flex>

        <FormStatRollSliders/>
      </Flex>

      <Flex vertical gap={3}>
        <HeaderText>{t('RollFilterHeader')/* Weighted rolls per relic */}</HeaderText>
        <Flex vertical gap={5}>
          <FormStatRollSliderTopPercent index={0}/>
          <FormStatRollSliderTopPercent index={1}/>
          <FormStatRollSliderTopPercent index={2}/>
        </Flex>
      </Flex>
    </Flex>
  )
}
