let parkingAreas = [
  {
    title: 'Marker1',
    parkingAreaStatus: 'reserved',
    description: 'Description about spot1',
    coordinates: {
      latitude: 49.269966,
      longitude: -123.251043
    },
    slots: [{
      spot_id: 1,
      label: 'spot1',
      occupied: true,
      accessible: false,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'spot2',
      occupied: false,
      accessible: true,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'spot3',
      occupied: true,
      accessible: false,
      spot_information: 'this is spot 1'
    }]
  },
  {
    title: 'Marker2',
    description: 'Description about spot2',
    parkingAreaStatus: 'reserved',
    coordinates: {
      latitude: 49.264554,
      longitude: -123.255521
    },
    slots: [{
      spot_id: 1,
      label: 'alpha',
      occupied: true,
      accessible: true,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'bravo',
      occupied: true,
      accessible: false,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'charlie',
      occupied: true,
      accessible: false,
      spot_information: 'this is spot 1'
    }]
  },
  {
    title: 'Marker3',
    description: 'Description about spot3',
    parkingAreaStatus: 'reserved',
    coordinates: {
      latitude: 49.261811,
      longitude: -123.243056
    },
    slots: [{
      spot_id: 1,
      label: 'raspberry',
      occupied: true,
      accessible: false,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'kiwi',
      occupied: true,
      accessible: true,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'raspberry',
      occupied: true,
      accessible: false,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'kiwi',
      occupied: true,
      accessible: true,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'kiwi',
      occupied: true,
      accessible: true,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'raspberry',
      occupied: true,
      accessible: false,
      spot_information: 'this is spot 1'
    },
    {
      spot_id: 1,
      label: 'kiwi',
      occupied: true,
      accessible: true,
      spot_information: 'this is spot 1'
    }]
  }]

export default parkingAreas
