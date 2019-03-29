import { observable, action, computed } from "mobx";

class DataStore {
  @observable data = [
    { year: '2000', womenRate: 25 },
    { year: '2001', womenRate: 35 },
    { year: '2002', womenRate: 45 },
    { year: '2003', womenRate: 55 },
    { year: '2004', womenRate: 35 },
  ];

  @observable yearDataRadio = [
      {year: '2010', medianPublic: 15, medianPrivate: 35},
      {year: '2011', medianPublic: 15, medianPrivate: 35},
      {year: '2012', medianPublic: 15, medianPrivate: 35},
      {year: '2013', medianPublic: 15, medianPrivate: 35},
      {year: '2014', medianPublic: 15, medianPrivate: 35},
  ]

  @observable modifiedData = [
    { year: '2000', womenRate: 25 },
    { year: '2001', womenRate: 35 },
    { year: '2002', womenRate: 45 },
    { year: '2003', womenRate: 55 },
    { year: '2004', womenRate: 35 },
  ];

  @observable filtersRadio = {
      year: {yearMin: 2012, yearMax: 2019},
      channel: ['Europe 1',	'France Bleu',	'France Culture',	'France Info',	'France Inter',	'France Musique',	'Fun Radio',	'MOUV',	'NRJ',	'Nostalgie',	'RFI',	'RFM',	'RMC',	'RTL',	'RTL 2',	'Radio Classique', 'Rire et Chansons',	'Skyrock',	'Sud Radio',	'Virgin Radio']
  }

  @observable filtersTv = {
    year: {yearMin: 2012, yearMax: 2019},
    channel: ['ARTE',	'Animaux', 'BFM TV', 'Canal+', 'Canal+ Sport', 'Chasse et pêche',	'Comédie+',		'Euronews',	'Eurosport France',	'France 2',	'France 24',	'France 3',	'France 5',	'France O',	'Histoire',	'I-Télé/CNews',	'L\'Equipe 21',	'LCI',	'LCP/Public Sénat',	'La chaîne Météo',	'M6',	'Monte Carlo TMC',	'NRJ 12',	'Paris Première',	'Planète+',	'TF1',	'TV Breizh',	'TV5 Monde',	'Toute l\'Histoire',	'W9']
}

@observable avaliableTvChannels = [
  {name: 'ARTE', checked: true},
  {name: 'Animaux', checked: true},
  {name: 'BFM TV', checked: true},
  {name: 'Canal+', checked: true},
  {name: 'Canal+ Sport', checked: true},
  {name: 'Chasse et pêche', checked: true},
  // {name: 'Chérie 25', checked: true},
  {name: 'Comédie+', checked: true},
  // {name: 'D8/C8', checked: true},
  {name: 'Euronews', checked: true},
  {name: 'Eurosport France', checked: true},
  {name: 'France 2', checked: true},
  {name: 'France 24', checked: true},
  {name: 'France 3', checked: true},
  {name: 'France 5', checked: true},
  {name: 'France O', checked: true},
  {name: 'Histoire', checked: true},
  {name: 'I-Télé/CNews', checked: true},
  {name: 'L\'Equipe 21', checked: true},
  {name: 'LCI', checked: true},
  {name: 'LCP/Public Sénat', checked: true},
  {name: 'La chaîne Météo', checked: true},
  {name: 'M6', checked: true},
  {name: 'Monte Carlo TMC', checked: true},
  {name: 'NRJ 12', checked: true},
  {name: 'Paris Première', checked: true},
  {name: 'Planète+', checked: true},
  {name: 'TF1', checked: true},
  {name: 'TV Breizh', checked: true},
  {name: 'TV5 Monde', checked: true},
  {name: 'Toute l\'Histoire', checked: true},
  // {name: 'Téva	Voyage', checked: true},
  {name: 'W9', checked: true},
]


  @observable avaliableRadioChannels = [
    {name: 'Europe 1', checked: true},
    {name: 'France Bleu', checked: true},
    {name: 'France Culture', checked: true},
    {name: 'France Info', checked: true},
    {name: 'France Inter', checked: true},
    {name: 'France Musique', checked: true},
    {name: 'Fun Radio', checked: true},
    {name: 'MOUV', checked: true},
    {name: 'NRJ', checked: true},
    {name: 'Nostalgie', checked: true},
    {name: 'RFI', checked: true},
    {name: 'RFM', checked: true},
    {name: 'RMC', checked: true},
    {name: 'RTL', checked: true},
    {name: 'RTL 2', checked: true},
    {name: 'Radio Classique', checked: true},
    {name: 'Rire et Chansons', checked: true},
    {name: 'Skyrock', checked: true},
    {name: 'Sud Radio', checked: true},
    {name: 'Virgin Radio', checked: true}
  ]

  @action changeData = () => {
    this.filtersRadio.channel.pop();
    // this.filtersRadio.year = {yearMin: 2012, yearMax: 2019}
  }

  @computed get radioData() {
    const filteredData = this.jsonData.filter(media => media.media_type === 'radio');
    return filteredData;
  }

  @computed get tvData() {
    const filteredData = this.jsonData.filter(media => media.media_type === 'tv');
    return filteredData;
  }

  @computed get mediaSepDataSet() {
    const filteredData = this.jsonData.filter(media => this.filtersTv.channel.indexOf(media.channel_name) !== -1 || this.filtersRadio.channel.indexOf(media.channel_name) !== -1);

    const mediaSepArray = [];
    const mediaSepArrayNames = [];

    filteredData.forEach(media => {
      if (media.year >= 2012 && media.year <= 2019) {
        if (mediaSepArrayNames.indexOf(media.channel_name) === -1) {
          mediaSepArrayNames.push(media.channel_name);
          mediaSepArray.push({
            channelName: media.channel_name,
            data: [{
              year: media.year,
              womenRate: media.women_expression_rate
            }]
          });
        } else {
          mediaSepArray[mediaSepArrayNames.indexOf(media.channel_name)].data.push({
            year: media.year,
              womenRate: media.women_expression_rate
          })
        }
      }
    });

    console.log('mediaSepArray', mediaSepArray)
    return mediaSepArray;
  }

  @action handleCheckRadioChange = (channel) => {
    this.avaliableRadioChannels.map(channelTmp => {
      if (channelTmp.name === channel) {
        channelTmp.checked = !channelTmp.checked;
      }
    });

    if (channel === 'all') {
      this.avaliableRadioChannels.map(channelTmp => channelTmp.checked = true);
    }

    if (channel === 'none') {
      this.avaliableRadioChannels.map(channelTmp => channelTmp.checked = false);
    }
  }

  @action handleCheckTvChange = (channel) => {
    this.avaliableTvChannels.map(channelTmp => {
      if (channelTmp.name === channel) {
        channelTmp.checked = !channelTmp.checked;
      }
    });

    if (channel === 'all') {
      this.avaliableTvChannels.map(channelTmp => channelTmp.checked = true);
    }

    if (channel === 'none') {
      this.avaliableTvChannels.map(channelTmp => channelTmp.checked = false);
    }
  }

  @action handleApplyRadioFilters = () => {
    const newChannels = [];
    this.avaliableRadioChannels.forEach(channel => {
      if (channel.checked) {
        newChannels.push(channel.name)
      }
    });
    if (newChannels.length > 0) {
      this.filtersRadio.channel = newChannels;
    }
  }

  @action handleApplyTvFilters = () => {
    const newChannels = [];
    this.avaliableTvChannels.forEach(channel => {
      if (channel.checked) {
        newChannels.push(channel.name)
      }
    });
    if (newChannels.length > 0) {
      this.filtersTv.channel = newChannels;
    }
  }

  @computed get allRadioChannelsSelected() {
    return this.avaliableRadioChannels.filter(channel => channel.checked).length === this.avaliableRadioChannels.length;
  }

  @computed get allTvChannelsSelected() {
    return this.avaliableTvChannels.filter(channel => channel.checked).length === this.avaliableTvChannels.length;
  }

  @computed get noRadioChannelsSelected() {
    return this.avaliableRadioChannels.filter(channel => channel.checked).length === 0;
  }

  @computed get noTvChannelsSelected() {
    return this.avaliableTvChannels.filter(channel => channel.checked).length === 0;
  }

  @computed get modifiedDataRadio() {
      const modifiedRadio = [];
      const modifiedRadioYears = [];
      this.radioData.forEach(media => {
          if (media.year >= this.filtersRadio.year.yearMin && media.year <= this.filtersRadio.year.yearMax) {
              if (this.filtersRadio.channel.indexOf(media.channel_name) !== -1) {
                if (modifiedRadioYears.indexOf(media.year) === -1) {
                    modifiedRadioYears.push(media.year);
                    modifiedRadio.push({
                        year: media.year,
                        womenRateSum: media.women_expression_rate,
                        sumCount: 1
                    });
                } else {
                    modifiedRadio[modifiedRadioYears.indexOf(media.year)].womenRateSum += media.women_expression_rate;
                    modifiedRadio[modifiedRadioYears.indexOf(media.year)].sumCount += 1;
                  }
              }
          }
      });

      modifiedRadio.map(media => {
          media.womenRate = media.womenRateSum / media.sumCount;
      });

      const sortedModifiedRadio = modifiedRadio.sort((a, b) => a.year >= b.year ? 1 : -1);
      return sortedModifiedRadio;
  }

  @computed get modifiedDataTv() {
    const modifiedTv = [];
    const modifiedTvYears = [];
    this.tvData.forEach(media => {
      if (media.year >= this.filtersTv.year.yearMin && media.year <= this.filtersTv.year.yearMax) {
        if (this.filtersTv.channel.indexOf(media.channel_name) !== -1) {
          if (modifiedTvYears.indexOf(media.year) === -1) {
            modifiedTvYears.push(media.year);
              modifiedTv.push({
                  year: media.year,
                  womenRateSum: media.women_expression_rate,
                  sumCount: 1
              });
          } else {
            modifiedTv[modifiedTvYears.indexOf(media.year)].womenRateSum += media.women_expression_rate;
            modifiedTv[modifiedTvYears.indexOf(media.year)].sumCount += 1;
            }
        }
      }
    });

    modifiedTv.map(media => {
        media.womenRate = media.womenRateSum / media.sumCount;
    });

    const sortedModifiedTv = modifiedTv.sort((a, b) => a.year >= b.year ? 1 : -1);
    console.log('modified data tv', sortedModifiedTv);
    return sortedModifiedTv;
}

  @computed get medianRadioForSelection() {
    let mediansRadio = [];
    const mediaRadioYears = [];
    this.radioData.forEach(media => {
      if (this.filtersRadio.channel.indexOf(media.channel_name) !== -1) {
        if (mediaRadioYears.indexOf(media.year) === -1) {
          mediaRadioYears.push(media.year);
          mediansRadio.push({
            year: media.year,
            medianPrivateSum: media.is_public_channel ? 0 : media.women_expression_rate,
            medianPrivateIndex: media.is_public_channel ? 0 : 1,
            medianPublicSum: !media.is_public_channel ? 0 : media.women_expression_rate,
            medianPublicIndex: !media.is_public_channel ? 0 : 1,
          });
        } else {
          mediansRadio[mediaRadioYears.indexOf(media.year)].medianPrivateSum += media.is_public_channel ? 0 : media.women_expression_rate;
          mediansRadio[mediaRadioYears.indexOf(media.year)].medianPrivateIndex += media.is_public_channel ? 0 : 1;
          mediansRadio[mediaRadioYears.indexOf(media.year)].medianPublicSum += !media.is_public_channel ? 0 : media.women_expression_rate;
          mediansRadio[mediaRadioYears.indexOf(media.year)].medianPublicIndex += !media.is_public_channel ? 0 : 1;
        }
      }
    });

    mediansRadio.map(media => {
      media.medianPrivate = media.medianPrivateIndex > 0 ? media.medianPrivateSum / media.medianPrivateIndex : null;
      media.medianPublic = media.medianPublicIndex > 0 ? media.medianPublicSum / media.medianPublicIndex : null;
    });
    return mediansRadio;
  }

  @computed get medianTvForSelection() {
    let mediansRadio = [];
    const mediaRadioYears = [];
    this.tvData.forEach(media => {
      if (this.filtersTv.channel.indexOf(media.channel_name) !== -1) {
        if (mediaRadioYears.indexOf(media.year) === -1) {
          mediaRadioYears.push(media.year);
          mediansRadio.push({
            year: media.year,
            medianPrivateSum: media.is_public_channel ? 0 : media.women_expression_rate,
            medianPrivateIndex: media.is_public_channel ? 0 : 1,
            medianPublicSum: !media.is_public_channel ? 0 : media.women_expression_rate,
            medianPublicIndex: !media.is_public_channel ? 0 : 1,
          });
        } else {
          mediansRadio[mediaRadioYears.indexOf(media.year)].medianPrivateSum += media.is_public_channel ? 0 : media.women_expression_rate;
          mediansRadio[mediaRadioYears.indexOf(media.year)].medianPrivateIndex += media.is_public_channel ? 0 : 1;
          mediansRadio[mediaRadioYears.indexOf(media.year)].medianPublicSum += !media.is_public_channel ? 0 : media.women_expression_rate;
          mediansRadio[mediaRadioYears.indexOf(media.year)].medianPublicIndex += !media.is_public_channel ? 0 : 1;
        }
      }
    });

    mediansRadio.map(media => {
      media.medianPrivate = media.medianPrivateIndex > 0 ? media.medianPrivateSum / media.medianPrivateIndex : null;
      media.medianPublic = media.medianPublicIndex > 0 ? media.medianPublicSum / media.medianPublicIndex : null;
    });
    console.log('median tv selection', mediansRadio);
    return mediansRadio;
  }

    @observable mediansRadio = [
        {
          "year": 2001,
          "medianPrivate": 24.778417387103396,
          "medianPublic": 25.49253930555242
        },
        {
          "year": 2002,
          "medianPrivate": 26.88132212021077,
          "medianPublic": 26.593992144858035
        },
        {
          "year": 2003,
          "medianPrivate": 27.0558587324233,
          "medianPublic": 25.75487367355191
        },
        {
          "year": 2004,
          "medianPrivate": 26.144163026359845,
          "medianPublic": 25.60319286211759
        },
        {
          "year": 2005,
          "medianPrivate": 25.023703759212772,
          "medianPublic": 26.197003671871666
        },
        {
          "year": 2006,
          "medianPrivate": 26.415707940595908,
          "medianPublic": 27.537810887599562
        },
        {
          "year": 2007,
          "medianPrivate": 26.00861783436179,
          "medianPublic": 28.212477356907677
        },
        {
          "year": 2008,
          "medianPrivate": 26.29679839844971,
          "medianPublic": 29.66743030548722
        },
        {
          "year": 2009,
          "medianPrivate": 25.85674590641931,
          "medianPublic": 28.925561358158376
        },
        {
          "year": 2010,
          "medianPrivate": 28.466356860414805,
          "medianPublic": 29.993973470770094
        },
        {
          "year": 2011,
          "medianPrivate": 28.042712181069323,
          "medianPublic": 30.206993209042245
        },
        {
          "year": 2012,
          "medianPrivate": 28.241974587573623,
          "medianPublic": 29.572952232148587
        },
        {
          "year": 2013,
          "medianPrivate": 29.568720396048317,
          "medianPublic": 29.366052358490414
        },
        {
          "year": 2014,
          "medianPrivate": 29.295284748904496,
          "medianPublic": 32.50758038805748
        },
        {
          "year": 2015,
          "medianPrivate": 28.902194111730097,
          "medianPublic": 33.84550392296675
        },
        {
          "year": 2016,
          "medianPrivate": 32.775067308059626,
          "medianPublic": 32.590165533209586
        },
        {
          "year": 2017,
          "medianPrivate": 33.45652229786941,
          "medianPublic": 34.0340717506062
        },
        {
          "year": 2018,
          "medianPrivate": 33.80672906493735,
          "medianPublic": 34.390612590538204
        },
        {
          "year": 2019,
          "medianPrivate": 33.54892900920649,
          "medianPublic": 34.34310229103097
        }
       ] 

  @observable jsonData = [
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2002,
      "women_expression_rate": 47.10994424236209
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 46.03444471353921
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 48.383607470997276
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 45.45162674591405
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 47.81930725989837
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 43.94302035045671
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 51.39922002110472
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 49.95436887273718
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 48.06286688394447
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 47.83215331479781
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 51.89108385882666
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 54.119721666465516
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 50.302610561492955
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 51.22796481514281
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 51.1705051341857
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 53.087648830928735
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 52.14109768273819
    },
    {
      "media_type": "radio",
      "channel_name": "Chérie FM",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 48.675315574656416
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2001,
      "women_expression_rate": 22.051852389558878
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2002,
      "women_expression_rate": 24.267006847306977
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 26.718574877676666
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 23.684981245625156
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 23.67489577214853
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 25.4322486717997
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 25.98819403652996
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 26.29679839844971
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 24.83838793071237
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 26.79700518053025
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 28.042712181069323
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 30.137980725229596
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 32.343932012018655
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 31.06819366431403
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 32.081066642915346
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 33.94685205564997
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 36.80892490440637
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 39.15215807188105
    },
    {
      "media_type": "radio",
      "channel_name": "Europe 1",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 40.379329997513004
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2000,
      "women_expression_rate": 38.311947336877175
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2001,
      "women_expression_rate": 34.63646580056023
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2002,
      "women_expression_rate": 32.046099174249214
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2003,
      "women_expression_rate": 34.28120288252227
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2004,
      "women_expression_rate": 37.53233189187671
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2005,
      "women_expression_rate": 37.85389362786568
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2006,
      "women_expression_rate": 43.837265045054224
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2007,
      "women_expression_rate": 42.53087071010711
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2008,
      "women_expression_rate": 39.82230812961607
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2009,
      "women_expression_rate": 41.65002752178754
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 38.13473376507523
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 37.97340246157834
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 36.4496427966828
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 35.32132791836533
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 33.41125517972196
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 34.78230197246604
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 38.11098556197102
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 39.01223452441084
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 36.64983585580104
    },
    {
      "media_type": "radio",
      "channel_name": "France Bleu",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 37.21475103477449
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 1995,
      "women_expression_rate": 26.493306730156824
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 1996,
      "women_expression_rate": 26.45951220838969
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 1997,
      "women_expression_rate": 26.717378727798852
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 1998,
      "women_expression_rate": 26.568255124270163
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 1999,
      "women_expression_rate": 27.04228562033844
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2000,
      "women_expression_rate": 26.54346912100846
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2001,
      "women_expression_rate": 24.517416671579248
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2002,
      "women_expression_rate": 24.647119439673606
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2003,
      "women_expression_rate": 25.289380757637225
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2004,
      "women_expression_rate": 24.789654757917123
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2005,
      "women_expression_rate": 23.798155390433095
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2006,
      "women_expression_rate": 25.009908921201486
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2007,
      "women_expression_rate": 26.608677607496002
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2008,
      "women_expression_rate": 27.194200109877787
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2009,
      "women_expression_rate": 26.558256618215754
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 28.185049562973713
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 29.61027366421729
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 29.346335830450386
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 29.366052358490414
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 31.190678445554816
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 31.12034338764448
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 32.590165533209586
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 35.058208610550764
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 34.708221714908724
    },
    {
      "media_type": "radio",
      "channel_name": "France Culture",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 34.789278609078
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 1995,
      "women_expression_rate": 21.084562721312615
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 1996,
      "women_expression_rate": 22.31983725539606
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 1997,
      "women_expression_rate": 21.428715132779423
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 1998,
      "women_expression_rate": 21.682073499555273
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 1999,
      "women_expression_rate": 23.0463198417795
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2000,
      "women_expression_rate": 25.447945975599907
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2001,
      "women_expression_rate": 25.182645346979683
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2002,
      "women_expression_rate": 26.18439259014434
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2003,
      "women_expression_rate": 25.012043327389293
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2004,
      "women_expression_rate": 25.05183989857242
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2005,
      "women_expression_rate": 26.515004828604393
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2006,
      "women_expression_rate": 28.191196548932005
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2007,
      "women_expression_rate": 28.120099895033125
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2008,
      "women_expression_rate": 29.552696515501854
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2009,
      "women_expression_rate": 28.819505025786412
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 29.42152760986765
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 28.794778409671974
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 29.572952232148587
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 29.316371389487827
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 30.77337628415755
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 30.217628159967596
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 30.154921556146363
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 29.602137950545988
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 30.231738086433435
    },
    {
      "media_type": "radio",
      "channel_name": "France Info",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 29.186492114868617
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 1995,
      "women_expression_rate": 23.154675107278536
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 1996,
      "women_expression_rate": 23.044628816126462
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 1997,
      "women_expression_rate": 24.209414408490556
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 1998,
      "women_expression_rate": 24.683776842462983
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 1999,
      "women_expression_rate": 26.89423034142486
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2000,
      "women_expression_rate": 25.435155384077795
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2001,
      "women_expression_rate": 25.802433264125153
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2002,
      "women_expression_rate": 27.00359169957173
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2003,
      "women_expression_rate": 26.220366589466593
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2004,
      "women_expression_rate": 26.154545825662762
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2005,
      "women_expression_rate": 25.87900251513894
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2006,
      "women_expression_rate": 26.884425226267123
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2007,
      "women_expression_rate": 28.304854818782232
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2008,
      "women_expression_rate": 29.782164095472584
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2009,
      "women_expression_rate": 29.031617690530343
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 30.566419331672535
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 33.140272270100255
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 31.96567659964457
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 31.25318742545518
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 32.50758038805748
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 34.48039058626382
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 33.70817473792074
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 32.89720348004199
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 34.390612590538204
    },
    {
      "media_type": "radio",
      "channel_name": "France Inter",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 34.34310229103097
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 1995,
      "women_expression_rate": 33.81679238499137
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 1996,
      "women_expression_rate": 32.18476890587846
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 1997,
      "women_expression_rate": 26.596747047566772
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 1998,
      "women_expression_rate": 24.671746079510598
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 1999,
      "women_expression_rate": 26.344210432561
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2000,
      "women_expression_rate": 27.1923856622358
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2001,
      "women_expression_rate": 18.82817609494691
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2002,
      "women_expression_rate": 16.842350781665907
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2003,
      "women_expression_rate": 18.306608058719366
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2004,
      "women_expression_rate": 15.829068977565377
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2005,
      "women_expression_rate": 20.660844146301514
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2006,
      "women_expression_rate": 21.957978366713423
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2007,
      "women_expression_rate": 21.99835763046493
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2008,
      "women_expression_rate": 17.375895239630225
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2009,
      "women_expression_rate": 17.938157216008218
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 21.560080312900443
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 24.402792134294916
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 21.582666887417947
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 28.54908529002147
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 28.8065047088233
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 26.74780732199707
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 32.15934239367761
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 35.98340748678462
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 36.15610117001081
    },
    {
      "media_type": "radio",
      "channel_name": "France Musique",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 37.9528529749255
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2001,
      "women_expression_rate": 24.834466263222133
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 22.530317885941948
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 21.01982244811963
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 18.847856946018005
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 32.00736273723482
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 28.665868349418723
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 26.688679801245808
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 28.96434349925046
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 28.466356860414805
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 28.114294352153664
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 29.34799933704885
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 27.454888854321286
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 25.18603753227528
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 28.036430465155338
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 34.72051823082182
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 35.99501203686068
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 35.15081695140639
    },
    {
      "media_type": "radio",
      "channel_name": "Fun Radio",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 35.1746139711973
    },
    {
      "media_type": "radio",
      "channel_name": "MOUV",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 26.41302687957854
    },
    {
      "media_type": "radio",
      "channel_name": "MOUV",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 27.585915391568633
    },
    {
      "media_type": "radio",
      "channel_name": "MOUV",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 35.19966908822155
    },
    {
      "media_type": "radio",
      "channel_name": "MOUV",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 35.46155208020755
    },
    {
      "media_type": "radio",
      "channel_name": "MOUV",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 32.15796509592144
    },
    {
      "media_type": "radio",
      "channel_name": "MOUV",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 26.287558878168856
    },
    {
      "media_type": "radio",
      "channel_name": "MOUV",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 22.750424509879043
    },
    {
      "media_type": "radio",
      "channel_name": "MOUV",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 22.448060471863585
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2002,
      "women_expression_rate": 19.871312881960137
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 20.749310680765447
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 21.291824144384123
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 21.009304528212656
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 22.169085680155604
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 20.842509905237712
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 23.84381167072717
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 22.876215523126383
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 27.82591050495905
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 27.141962841964123
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 25.91099779179889
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 27.72183252863248
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 26.239420371121312
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 27.28895979782732
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 27.146358893088845
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 26.216932006057824
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 25.610606912497385
    },
    {
      "media_type": "radio",
      "channel_name": "NRJ",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 23.599100323152644
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2001,
      "women_expression_rate": 27.59088150908976
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 30.691771681964
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 29.055527637008886
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 27.86991268134366
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 28.68837449831111
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 26.029041632193618
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 28.58466229370637
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 31.672880006482306
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 30.991078195360284
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 33.90542069700559
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 34.255108396813135
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 39.98061695978606
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 40.95483552534692
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 38.12403936532441
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 39.16218214885557
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 39.56458197240957
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 37.30006373071829
    },
    {
      "media_type": "radio",
      "channel_name": "Nostalgie",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 36.49080550498661
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2000,
      "women_expression_rate": 29.21668085924457
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2001,
      "women_expression_rate": 29.421712151422742
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2002,
      "women_expression_rate": 29.53184171569163
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2003,
      "women_expression_rate": 28.737272321352236
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2004,
      "women_expression_rate": 28.670031809983143
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2005,
      "women_expression_rate": 30.826719489397597
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2006,
      "women_expression_rate": 31.27587693748129
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2007,
      "women_expression_rate": 31.98765769161585
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2008,
      "women_expression_rate": 31.152299036925346
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2009,
      "women_expression_rate": 33.42017601031054
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 32.071815994678026
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 30.803712753867202
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 30.97245626385851
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 32.43066970758293
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 36.39913883391533
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 33.84550392296675
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 34.69744731301957
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 34.0340717506062
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 33.151779790071906
    },
    {
      "media_type": "radio",
      "channel_name": "RFI",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 32.11019626231199
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2002,
      "women_expression_rate": 33.46871278467056
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 34.19015928982982
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 33.526031698210076
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 36.905782639667265
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 26.918687880856947
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 26.969256688388267
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 27.52984881585331
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 31.656884838361886
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 31.45320696076809
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 34.82297592832659
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 31.335199201971292
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 34.23104908144976
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 33.241051828545096
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 32.392987001697946
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 33.64233990877295
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 35.26090746019392
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 34.81562871892078
    },
    {
      "media_type": "radio",
      "channel_name": "RFM",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 34.626478819031604
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2001,
      "women_expression_rate": 24.72236851098466
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2002,
      "women_expression_rate": 25.44385958029311
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 25.620971374595484
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 24.86227125954769
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 19.758080932435888
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 18.251236819664854
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 17.837473822658087
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 17.662374308921283
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 17.754179512733884
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 17.182985154584664
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 16.71187829423589
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 16.08334016873704
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 17.147354292588968
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 17.068201717335505
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 17.667537924451263
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 16.989229404903625
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 16.69744096469556
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 16.580603035192738
    },
    {
      "media_type": "radio",
      "channel_name": "RMC",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 17.332148549823128
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2001,
      "women_expression_rate": 26.436943538671997
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2002,
      "women_expression_rate": 28.318784660128426
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 27.393142587169933
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 27.426054793172
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 26.372511746277016
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 25.912728000334866
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 24.103048284718614
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 23.988117434339053
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 25.16340198107723
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 26.086052011491663
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 26.628004043875475
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 27.135949838098394
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 28.82729651150873
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 27.522375833494962
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 28.92310047991458
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 28.04277644971849
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 29.203447380372648
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 29.639974693526717
    },
    {
      "media_type": "radio",
      "channel_name": "RTL",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 31.431721709202954
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2002,
      "women_expression_rate": 31.176975476418605
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 31.045340884394967
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 33.33399871769509
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 33.10641279378454
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 31.207055875297403
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 38.28493128652301
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 43.20330209880645
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 43.33932234832236
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 43.911226990471334
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 47.79583293026206
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 47.7599003025203
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 46.27978046399612
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 44.310358777016006
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 44.71229154246779
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 41.79833778972801
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 43.2456506341513
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 44.261682307854024
    },
    {
      "media_type": "radio",
      "channel_name": "RTL 2",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 45.736669685076116
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 41.74347630235187
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 46.3716120620806
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 40.131429211004324
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 39.71212006083773
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 39.30199677250901
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 36.36833601875193
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 35.72504431639081
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 36.225667771886144
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 34.34968716836225
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 36.354800511484285
    },
    {
      "media_type": "radio",
      "channel_name": "Radio Classique",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 38.67254741335386
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 23.945081772126077
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 27.43692756303904
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 25.5693183492657
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 25.677300245509183
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 27.107276659962288
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 24.922992410929993
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 26.313595560040003
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 26.681387871725754
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 27.2503635034477
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 26.213523988005356
    },
    {
      "media_type": "radio",
      "channel_name": "Rire et Chansons",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 25.63334650039903
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2001,
      "women_expression_rate": 18.28415949068026
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2002,
      "women_expression_rate": 18.91632559094845
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2003,
      "women_expression_rate": 18.795643039554346
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2004,
      "women_expression_rate": 17.614834713633126
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2005,
      "women_expression_rate": 18.17789463257266
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2006,
      "women_expression_rate": 20.045392206395015
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2007,
      "women_expression_rate": 20.13689204828235
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 18.698902534280542
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 18.39069899698476
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 18.31114610163962
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 17.086314651842972
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 16.315819039724047
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 16.719204555265062
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 16.208562986752323
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 15.502532662385333
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 14.444457938519284
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 15.687847041730926
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 15.509622858657105
    },
    {
      "media_type": "radio",
      "channel_name": "Skyrock",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 14.9102143383857
    },
    {
      "media_type": "radio",
      "channel_name": "Sud Radio",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 21.956261661133013
    },
    {
      "media_type": "radio",
      "channel_name": "Sud Radio",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 25.723557197752733
    },
    {
      "media_type": "radio",
      "channel_name": "Sud Radio",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 27.30237876051602
    },
    {
      "media_type": "radio",
      "channel_name": "Sud Radio",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 28.881287743545613
    },
    {
      "media_type": "radio",
      "channel_name": "Sud Radio",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 31.907794707346298
    },
    {
      "media_type": "radio",
      "channel_name": "Sud Radio",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 32.56335742737658
    },
    {
      "media_type": "radio",
      "channel_name": "Sud Radio",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 32.79782941095392
    },
    {
      "media_type": "radio",
      "channel_name": "Sud Radio",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 32.47137919938138
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2008,
      "women_expression_rate": 22.387480697002324
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2009,
      "women_expression_rate": 25.85674590641931
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 30.115225793951485
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 26.630776941279393
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 25.111303298008785
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 30.310144280587902
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 31.475981512125795
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 27.82073568970922
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 26.623009002120757
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 24.99282731839586
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 24.19564278911209
    },
    {
      "media_type": "radio",
      "channel_name": "Virgin Radio",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 28.2381532541083
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 28.142902344571496
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 28.066214715552302
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 29.943391866982537
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 27.587263045168143
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 29.091073469905787
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 28.28387072896389
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 28.257920895630473
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 29.860240687554473
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 31.1489534647153
    },
    {
      "media_type": "tv",
      "channel_name": "ARTE",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 32.8164656046445
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 25.90757253463454
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 31.552512597041616
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 34.93134825046644
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 33.73874583861331
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 33.90868510423651
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 36.77573977300372
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 36.56472560881775
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 37.68176151651506
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 40.99981927314211
    },
    {
      "media_type": "tv",
      "channel_name": "Animaux",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 38.53242393030715
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 38.657280543057546
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 36.92473806835565
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 35.41850320222516
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 35.81155320704737
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 33.31911666090571
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 33.62418908900725
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 35.63226003561944
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 36.05572270094781
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 36.99559666529718
    },
    {
      "media_type": "tv",
      "channel_name": "BFM TV",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 34.23135499531699
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 21.51190904161979
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 22.158304388849643
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 22.350215675848027
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 23.414536181895937
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 22.12367299237239
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 21.536859698528914
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 22.0995672361379
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 22.01619694490687
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 22.485153691737544
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 22.70213656101075
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 5.9729542393806625
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 5.532296190431669
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 5.211815278454215
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 4.9443778442181845
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 5.095775628337789
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 4.912640341606156
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 4.838224987026434
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 4.813465984423973
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 5.137714741650995
    },
    {
      "media_type": "tv",
      "channel_name": "Canal+ Sport",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 5.136650864163029
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 7.191762448544618
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 8.144226877239982
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 7.018203540222437
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 10.09888375973494
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 10.310288596580266
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 9.1497518738192
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 7.2589125210980985
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 9.108982132264543
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 11.774427136755584
    },
    {
      "media_type": "tv",
      "channel_name": "Chasse et pêche",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 12.045818606364927
    },
    {
      "media_type": "tv",
      "channel_name": "Chérie 25",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 48.294389434096004
    },
    {
      "media_type": "tv",
      "channel_name": "Chérie 25",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 48.91754597219619
    },
    {
      "media_type": "tv",
      "channel_name": "Chérie 25",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 37.3290454135079
    },
    {
      "media_type": "tv",
      "channel_name": "Chérie 25",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 41.837747247004245
    },
    {
      "media_type": "tv",
      "channel_name": "Chérie 25",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 41.67980215473349
    },
    {
      "media_type": "tv",
      "channel_name": "Chérie 25",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 39.983769271327006
    },
    {
      "media_type": "tv",
      "channel_name": "Chérie 25",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 39.85225212210074
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 29.579478405274216
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 28.137377593981626
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 31.90628204885429
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 29.255711371437528
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 31.637882454413834
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 29.697663464910995
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 28.513473151209585
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 26.18616224704205
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 28.367153032273386
    },
    {
      "media_type": "tv",
      "channel_name": "Comédie+",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 33.66962522806119
    },
    {
      "media_type": "tv",
      "channel_name": "D8/C8",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 27.814514795834018
    },
    {
      "media_type": "tv",
      "channel_name": "D8/C8",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 31.14989815360672
    },
    {
      "media_type": "tv",
      "channel_name": "D8/C8",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 27.52428421354578
    },
    {
      "media_type": "tv",
      "channel_name": "D8/C8",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 26.154351375618916
    },
    {
      "media_type": "tv",
      "channel_name": "D8/C8",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 27.295338091357607
    },
    {
      "media_type": "tv",
      "channel_name": "D8/C8",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 28.3769902073018
    },
    {
      "media_type": "tv",
      "channel_name": "D8/C8",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 29.815084489420546
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 34.228341588704545
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 30.681695594316054
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 30.61316456008134
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 36.71865967351382
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 37.61037099669075
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 35.39343354962911
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 30.95794547236568
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 31.580819596300497
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 34.89162555702699
    },
    {
      "media_type": "tv",
      "channel_name": "Euronews",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 35.70667939178433
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 6.957224029147804
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 7.395577437648261
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 8.083346257603727
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 8.884800075111714
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 7.8610175491278325
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 7.801830722783509
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 8.012118788909232
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 5.595861852588684
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 5.617468543657603
    },
    {
      "media_type": "tv",
      "channel_name": "Eurosport France",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 9.858520804381008
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 28.456111604983025
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 30.60460090113992
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 33.44531070623485
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 34.886430445098306
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 35.0795758950855
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 36.21095447112758
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 33.92145412835245
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 36.41515787899744
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 37.24429925353736
    },
    {
      "media_type": "tv",
      "channel_name": "France 2",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 38.918406967043744
    },
    {
      "media_type": "tv",
      "channel_name": "France 24",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 43.79999051786408
    },
    {
      "media_type": "tv",
      "channel_name": "France 24",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 45.018032863354094
    },
    {
      "media_type": "tv",
      "channel_name": "France 24",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 43.82043031788675
    },
    {
      "media_type": "tv",
      "channel_name": "France 24",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 44.99147959145337
    },
    {
      "media_type": "tv",
      "channel_name": "France 24",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 44.448384793572934
    },
    {
      "media_type": "tv",
      "channel_name": "France 24",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 45.933815900407396
    },
    {
      "media_type": "tv",
      "channel_name": "France 24",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 44.64361657109559
    },
    {
      "media_type": "tv",
      "channel_name": "France 24",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 45.99064159398676
    },
    {
      "media_type": "tv",
      "channel_name": "France 24",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 47.917399538024654
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 29.843796534996375
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 30.01198827972812
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 30.32065046860196
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 30.750683911432112
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 30.012442701871766
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 30.12688868732587
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 32.63479635381367
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 34.991187386781206
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 35.37314449879114
    },
    {
      "media_type": "tv",
      "channel_name": "France 3",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 35.906998140221205
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 26.896620443528292
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 26.959951635780605
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 28.674699258314888
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 28.679668748087796
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 30.77828995796062
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 31.89270112964359
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 34.47426581462924
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 35.217927407596044
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 36.091543618761804
    },
    {
      "media_type": "tv",
      "channel_name": "France 5",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 37.281899051653475
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 31.723482974703813
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 34.22439897244679
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 35.9199672072171
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 37.5408661639612
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 34.015039447903014
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 31.641524826000722
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 31.02635734189154
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 33.297872610345976
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 35.106503585598
    },
    {
      "media_type": "tv",
      "channel_name": "France O",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 37.365873322750886
    },
    {
      "media_type": "tv",
      "channel_name": "Histoire",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 16.264416111241175
    },
    {
      "media_type": "tv",
      "channel_name": "Histoire",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 16.404075284475752
    },
    {
      "media_type": "tv",
      "channel_name": "Histoire",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 15.5173510767466
    },
    {
      "media_type": "tv",
      "channel_name": "Histoire",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 18.60096048263929
    },
    {
      "media_type": "tv",
      "channel_name": "Histoire",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 20.626347674650297
    },
    {
      "media_type": "tv",
      "channel_name": "Histoire",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 16.134625853349664
    },
    {
      "media_type": "tv",
      "channel_name": "Histoire",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 21.07237554127373
    },
    {
      "media_type": "tv",
      "channel_name": "Histoire",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 24.12733665367189
    },
    {
      "media_type": "tv",
      "channel_name": "Histoire",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 24.14199875586385
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 38.460709798007045
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 39.7197062542852
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 37.28203143524295
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 34.46458196847565
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 34.21705188654999
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 35.194313306282474
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 33.70378604050557
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 29.2409573794362
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 30.431046673671524
    },
    {
      "media_type": "tv",
      "channel_name": "I-Télé/CNews",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 31.261062181726796
    },
    {
      "media_type": "tv",
      "channel_name": "L'Equipe 21",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 22.961725368180716
    },
    {
      "media_type": "tv",
      "channel_name": "L'Equipe 21",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 22.609735991651515
    },
    {
      "media_type": "tv",
      "channel_name": "L'Equipe 21",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 14.67981642582165
    },
    {
      "media_type": "tv",
      "channel_name": "L'Equipe 21",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 9.891840224452645
    },
    {
      "media_type": "tv",
      "channel_name": "L'Equipe 21",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 12.813498000039145
    },
    {
      "media_type": "tv",
      "channel_name": "L'Equipe 21",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 12.936566161270946
    },
    {
      "media_type": "tv",
      "channel_name": "L'Equipe 21",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 14.277578618314168
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 32.62084196681204
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 33.67961593605219
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 32.638833689107344
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 33.47618627632621
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 33.232247732666316
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 36.860963104914745
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 34.94381262745534
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 32.2129981933496
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 31.679395716828807
    },
    {
      "media_type": "tv",
      "channel_name": "LCI",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 31.04590733176701
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 25.256254313885062
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 26.801477176707895
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 29.133673993270758
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 27.91827987378992
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 29.559332345130418
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 30.98031758269211
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 30.328369024613067
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 31.39197795186572
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 34.358285826816356
    },
    {
      "media_type": "tv",
      "channel_name": "LCP/Public Sénat",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 33.920288438753026
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 31.1698082315849
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 27.034462692571502
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 27.77140474415442
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 18.421602883706658
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 13.064368215145022
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 13.614501475083967
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 14.955341194795487
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 16.771740153016896
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 14.202462714074368
    },
    {
      "media_type": "tv",
      "channel_name": "La chaîne Météo",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 13.714682401351098
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 39.40278529924919
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 39.040332951107935
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 40.64356763937142
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 40.708158113804394
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 41.17379630893965
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 40.63813091743655
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 41.22403703972862
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 43.59281087936905
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 42.196399790751926
    },
    {
      "media_type": "tv",
      "channel_name": "M6",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 43.684264132999736
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 28.543801572469047
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 29.445112717342425
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 30.304361192436772
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 30.813337990042232
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 30.318944045221453
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 28.795451846352854
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 29.38568716205609
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 30.085632752149998
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 31.683620289082693
    },
    {
      "media_type": "tv",
      "channel_name": "Monte Carlo TMC",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 32.945299090403935
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 30.924828451550805
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 27.40061903474688
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 32.673525889586216
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 30.674707258653722
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 35.24455770860689
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 33.06013299617276
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 33.924960099185384
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 35.453065904643694
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 35.314814987129125
    },
    {
      "media_type": "tv",
      "channel_name": "NRJ 12",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 31.217332712983698
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 24.8360790899738
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 25.52125150358215
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 21.008999527687987
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 22.519630030542427
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 22.321417699181715
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 21.017236450710435
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 22.51810601170466
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 21.8045650397315
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 23.70618637668973
    },
    {
      "media_type": "tv",
      "channel_name": "Paris Première",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 25.80695850647196
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 17.715349611731984
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 15.799666373733299
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 16.061340550154195
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 15.655506944110723
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 17.28267881071151
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 15.888833962877921
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 16.8856145839924
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 16.269306054343215
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 19.090401266138926
    },
    {
      "media_type": "tv",
      "channel_name": "Planète+",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 20.50207190979987
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 32.37882301327677
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 34.654423904665926
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 35.93875193789674
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 36.484382354138724
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 36.73067839419855
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 35.346751840792244
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 37.39063527780904
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 38.11042499611489
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 38.20715691117824
    },
    {
      "media_type": "tv",
      "channel_name": "TF1",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 41.98504626761073
    },
    {
      "media_type": "tv",
      "channel_name": "TV Breizh",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 29.88416433895874
    },
    {
      "media_type": "tv",
      "channel_name": "TV Breizh",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 29.34718928002188
    },
    {
      "media_type": "tv",
      "channel_name": "TV Breizh",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 29.93932007974681
    },
    {
      "media_type": "tv",
      "channel_name": "TV Breizh",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 30.173381802565675
    },
    {
      "media_type": "tv",
      "channel_name": "TV Breizh",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 32.908707747674875
    },
    {
      "media_type": "tv",
      "channel_name": "TV Breizh",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 32.10454221634168
    },
    {
      "media_type": "tv",
      "channel_name": "TV Breizh",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 30.639224327268742
    },
    {
      "media_type": "tv",
      "channel_name": "TV Breizh",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 31.890735697679023
    },
    {
      "media_type": "tv",
      "channel_name": "TV Breizh",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 31.753470809772434
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2010,
      "women_expression_rate": 28.02868276237841
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2011,
      "women_expression_rate": 28.699712001358265
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2012,
      "women_expression_rate": 28.571515860816326
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2013,
      "women_expression_rate": 30.118738220183687
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2014,
      "women_expression_rate": 29.505054393289075
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2015,
      "women_expression_rate": 29.587629691667605
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2016,
      "women_expression_rate": 31.21215637964163
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2017,
      "women_expression_rate": 30.873578894303744
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2018,
      "women_expression_rate": 35.08081948299965
    },
    {
      "media_type": "tv",
      "channel_name": "TV5 Monde",
      "is_public_channel": true,
      "year": 2019,
      "women_expression_rate": 35.59168705994433
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 17.8601299587232
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 20.773158009032887
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 19.347722492415894
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 17.2191563576848
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 19.644503079324608
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 20.657402102193984
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 18.366167899366364
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 17.143527820296132
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 17.944907646051764
    },
    {
      "media_type": "tv",
      "channel_name": "Toute l'Histoire",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 18.575964750171334
    },
    {
      "media_type": "tv",
      "channel_name": "Téva",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 44.83728344018357
    },
    {
      "media_type": "tv",
      "channel_name": "Téva",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 43.83392316365572
    },
    {
      "media_type": "tv",
      "channel_name": "Téva",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 45.76238037783062
    },
    {
      "media_type": "tv",
      "channel_name": "Téva",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 46.72192249956213
    },
    {
      "media_type": "tv",
      "channel_name": "Téva",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 51.210879719316104
    },
    {
      "media_type": "tv",
      "channel_name": "Téva",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 53.3579300360731
    },
    {
      "media_type": "tv",
      "channel_name": "Téva",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 50.65505691204858
    },
    {
      "media_type": "tv",
      "channel_name": "Téva",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 47.54970857518087
    },
    {
      "media_type": "tv",
      "channel_name": "Téva",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 49.50717526992731
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 23.647660181844163
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 25.00898813273798
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 24.32763131151676
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 26.81814978862775
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 24.428790569555346
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 24.075768707530333
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 21.869992102071254
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 23.539410804262737
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 26.08080378570629
    },
    {
      "media_type": "tv",
      "channel_name": "Voyage",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 24.912812649488075
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2010,
      "women_expression_rate": 30.842987322969794
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2011,
      "women_expression_rate": 32.866200908080565
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2012,
      "women_expression_rate": 32.19063868387818
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2013,
      "women_expression_rate": 34.937837768784554
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2014,
      "women_expression_rate": 36.40868788075179
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2015,
      "women_expression_rate": 36.93924232991307
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2016,
      "women_expression_rate": 37.072227603164194
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2017,
      "women_expression_rate": 36.083906538309044
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2018,
      "women_expression_rate": 35.129244203003196
    },
    {
      "media_type": "tv",
      "channel_name": "W9",
      "is_public_channel": false,
      "year": 2019,
      "women_expression_rate": 35.75575523439771
    }
   ]
}

const singleton = new DataStore();
export default singleton;