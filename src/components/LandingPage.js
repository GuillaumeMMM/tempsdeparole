import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import ExpressionGraph2 from './ExpressionGraph2';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Header from './Header';
import AllGraphs from './AllGraphs';
import Footer from './Footer';

@inject("DataStore")
@observer
class LandingPage extends Component {

    render() {
        const { DataStore } = this.props;

        const { modifiedDataRadio, modifiedDataTv, medianTvForSelection, medianRadioForSelection, avaliableRadioChannels, avaliableTvChannels, handleCheckRadioChange, handleCheckTvChange, allRadioChannelsSelected, allTvChannelsSelected, noRadioChannelsSelected, noTvChannelsSelected, handleApplyRadioFilters, handleApplyTvFilters, mediaSepDataSet } = DataStore;

        console.log(modifiedDataRadio);

        return (
            <div className="landing-page-component">
                <Header></Header>
                <div className="landing-page-content">
                    <div className="graphs">
                        <ExpressionGraph2 data={modifiedDataRadio} id='1' title="RADIO" mediansRadio={medianRadioForSelection}></ExpressionGraph2>
                        <ExpressionGraph2 data={modifiedDataTv} id='2' title="TÉLÉVISION" mediansRadio={medianTvForSelection}></ExpressionGraph2>
                    </div>
                    <div className="filters">
                        <div className="legend-container">
                            <div className="legend-title">légende</div>
                            <div className="legend-content">
                                <div className="legend-item">
                                    <div className="circle-1"></div>
                                    <div className="name">moyenen médias publiques</div>
                                </div>
                                <div className="legend-item">
                                    <div className="circle-2"></div>
                                    <div className="name">moyenne médias privés</div>
                                </div>
                            </div>
                        </div>
                        <div className="radio-container">
                            <div className="radio-title">radio</div>
                            <div className="radio-content">
                                <div className="channel-checkbox-left">
                                <div className="channel-checkbox channel-checkbox-meta">
                                    <Checkbox
                                        checked={allRadioChannelsSelected}
                                        onChange={handleCheckRadioChange.bind(this, 'all')}
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 18 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                                    />
                                    Tout sélectionner
                                </div>
                                {avaliableRadioChannels.map((channel, i) => i % 2 ? null : (<div className="channel-checkbox" key={channel.name}>
                                    <Checkbox
                                        checked={channel.checked}
                                        onChange={handleCheckRadioChange.bind(this, channel.name)}
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 18 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                                    />
                                    {channel.name}
                                </div>))}
                                </div>
                                <div className="channel-checkbox-right">
                                <div className="channel-checkbox channel-checkbox-meta">
                                    <Checkbox
                                        checked={noRadioChannelsSelected}
                                        onChange={handleCheckRadioChange.bind(this, 'none')}
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 18 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                                    />
                                    Tout retirer
                                </div>
                                {avaliableRadioChannels.map((channel, i) => i % 2 ? (<div className="channel-checkbox" key={channel.name}>
                                    <Checkbox
                                        checked={channel.checked}
                                        onChange={handleCheckRadioChange.bind(this, channel.name)}
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 18 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                                    />
                                    {channel.name}
                                </div>) : null)}
                                </div>
                            </div>
                        </div>
                        <div className="radio-apply-button" onClick={handleApplyRadioFilters}>appliquer</div>

                        <div className="tv-container">
                            <div className="tv-title">télévision</div>
                            <div className="tv-content">
                                <div className="channel-checkbox-left">
                                <div className="channel-checkbox channel-checkbox-meta">
                                    <Checkbox
                                        checked={allTvChannelsSelected}
                                        onChange={handleCheckTvChange.bind(this, 'all')}
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 18 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                                    />
                                    Tout sélectionner
                                </div>
                                {avaliableTvChannels.map((channel, i) => i % 2 ? null : (<div className="channel-checkbox" key={channel.name}>
                                    <Checkbox
                                        checked={channel.checked}
                                        onChange={handleCheckTvChange.bind(this, channel.name)}
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 18 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                                    />
                                    {channel.name}
                                </div>))}
                                </div>
                                <div className="channel-checkbox-right">
                                <div className="channel-checkbox channel-checkbox-meta">
                                    <Checkbox
                                        checked={noTvChannelsSelected}
                                        onChange={handleCheckTvChange.bind(this, 'none')}
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 18 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                                    />
                                    Tout retirer
                                </div>
                                {avaliableTvChannels.map((channel, i) => i % 2 ? (<div className="channel-checkbox" key={channel.name}>
                                    <Checkbox
                                        checked={channel.checked}
                                        onChange={handleCheckTvChange.bind(this, channel.name)}
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 18 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                                    />
                                    {channel.name}
                                </div>) : null)}
                                </div>
                            </div>
                        </div>
                        <div className="tv-apply-button" onClick={handleApplyTvFilters}>appliquer</div>
                        {/* <button onClick={changeData}>Random data</button> */}
                    </div>
                </div>
                <AllGraphs mediaSepDataSet={mediaSepDataSet}></AllGraphs>
                <Footer></Footer>
            </div>
        );
    }
}

export default LandingPage;