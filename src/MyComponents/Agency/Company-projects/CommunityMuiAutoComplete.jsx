import React, { useMemo } from 'react'
import CustomMuiAutoComplete from '../../Common/CustomMuiAutoComplete/CustomMuiAutoComplete';

const CommunityMuiAutoComplete = ({ communityOptions, setSelectedOption, selectedOption, setSearchText, searchText }) => {

    const matchStr = (searchVal, matchVal) =>
        searchVal.toLowerCase().match(new RegExp(matchVal.toLowerCase(), "g"));

    //To store memorized value of filtered(searched) data array, this helps when other then dependencies, state of this component changes will not filter again.
    const filteredData = useMemo(
        () =>
            communityOptions?.community
                ?.filter((communityItem) => matchStr(communityItem.name, searchText))
                ?.map((e) => {
                    return { value: e.id, label: `${e.id} - ${e.name}` };
                }) || [],
        [communityOptions, searchText]
    );

    return (
        <CustomMuiAutoComplete
            placeholder={"Select Community"}
            filterList={filteredData.slice(0, 20)}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            setSearchText={setSearchText}
            searchText={searchText}
            disableClearable
        />
    )
}

export default CommunityMuiAutoComplete
