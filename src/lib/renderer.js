import {Flex, Image, Tag,} from 'antd';

export const Renderer = {
  floor: (x) => {
    if (x == undefined || x.value == undefined) return '';
    return Math.floor(x.value)
  },

  x100Tenths: (x) => {
    if (x == undefined || x.value == undefined) return '';
    return (x.value * 100).toFixed(1)
  },

  relicSet: (x) => {
    if (x == undefined || x.value == undefined) return '';
    let i = x.value

    let count = Object.values(Constants.SetsRelics).length
    let setImages = []

    let s1 = i % count
    let s2 = ((i - s1) / count) % count
    let s3 = ((i - s2 * count - s1) / (count * count)) % count
    let s4 = ((i - s3 * count * count - s2 * count - s1) / (count * count * count)) % count

    let relicSets = [s1, s2, s3, s4]

    while (relicSets.length > 0) {
      let value = relicSets[0]
      if (relicSets.lastIndexOf(value)) {
        let setName = Object.entries(Constants.RelicSetToIndex).find(x => x[1] == value)[0]
        let assetValue = Assets.getSetImage(setName, Constants.Parts.Head)
        setImages.push(assetValue)

        let otherIndex = relicSets.indexOf(value)
        relicSets.splice(otherIndex, 1)
      }
      relicSets.splice(0, 1)
    }

    return (
      <Flex justify='center' style={{marginTop: -1}}>
        <SetDisplay asset={setImages[0]} />
        <SetDisplay asset={setImages[1]} />
      </Flex>
    )
  },

  ornamentSet: (x) => {
    if (x == undefined || x.value == undefined) return '';
    let i = x.value

    let ornamentSetCount = Object.values(Constants.SetsOrnaments).length
    let setImage

    let s1 = i % ornamentSetCount;
    let s2 = ((i - s1) / ornamentSetCount) % ornamentSetCount;

    if (s1 == s2) {
      let setName = Object.entries(Constants.OrnamentSetToIndex).find(x => x[1] == s1)[0]
      setImage = Assets.getSetImage(setName, Constants.Parts.PlanarSphere)
      return (
        <Flex justify='center' style={{marginTop: -1}}>
          <SetDisplay asset={setImage} />
        </Flex>
      )
    } else {
      return ''
    }
  },

  anySet: (x) => {
    if (x == undefined || x.value == undefined) return '';
    let part = x.data.part
  
    let src = Assets.getSetImage(x.data.set, part)
    return (
      <Flex justify='center' title={x.data.set} style={{marginTop: -1}}>
        <SetDisplay asset={src} />
      </Flex>
    )
  },

  characterIcon: (x) => {
    if (x == undefined || x.value == undefined) return '';
    let equippedBy = x.data.equippedBy
    if (!equippedBy) return ''

    let src = Assets.getCharacterAvatarById(equippedBy)
    return (
      <Flex justify='center' style={{ marginTop: -1 }}>
        <SetDisplay asset={src} />
      </Flex>
    )
  },

  readableStat: (x) => {
    if (x == undefined || x.value == undefined) return '';
    return Constants.StatsToReadable[x.value]
  },

  readablePart: (x) => {
    if (x == undefined || x.value == undefined) return '';
    return Constants.PartsToReadable[x.value]
  },

  hideZeroes: (x) => {
    return x.value == 0 ? "" : x.value
  },

  hideZeroesFloor: (x) => {
    return x.value == 0 ? "" : Math.floor(x.value)
  },

  hideZeroes10ths: (x) => {
    return x.value == 0 ? "" : Utils.precisionRound(Math.floor(x.value * 10) / 10)
  },

  mainValueRenderer: (x) => {
    let part = x.data.part
    if (part == Constants.Parts.Hands || part == Constants.Parts.Head) {
      return x.value == 0 ? "" : Math.floor(x.value)
    }
    return x.value == 0 ? "" : Utils.truncate10ths(x.value)
  },

  hideZeroesX100Tenths: (x) => {
    return x.value == 0 ? "" : Renderer.x100Tenths(x)
  },

  scoreRenderer: (x) => {
    return Math.round(x.value)
  },

  hideNaNAndRound: (x) => {
    return isNaN(x.value) ? '' :  Math.round(x.value)
  },
}

function SetDisplay(props) {
  if (props.asset) {
    return (
      <Image src={props.asset} width={32} preview={false}>
      </Image>
    )
  } else {
    return ''
  }
}

// For displaying stats from selectors, unused
function statTagRenderer(props) {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{display: 'flex', flexDirection: 'row', paddingInline: '3px', marginInlineEnd: '4px'}}
    >
      <Flex>
        <img src={Assets.getStatIcon(value)} style={{width: 22, height: 22}}></img>
      </Flex>
    </Tag>
  );
}